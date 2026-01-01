import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initShaderBg() {
    const container = document.getElementById('hero_bg');
    if (!container) return;

    const vertexShader = `void main() {
      gl_Position = vec4(position, 1.0);
    }
    `;

    const fragmentShader = `
    uniform vec3 uPixelColor;
    uniform vec2 uResolution;
    uniform vec4 uMouse;
    uniform float uTime;
    
    // Shader Inputs
    uniform vec2 uClickPos[10];
    uniform float uClickTimes[10];

    // Constants
    const int MAX_CLICKS = 10;
    const float PIXEL_SIZE = 4.0; 

    // Bayer matrix helpers
    float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2. + a.y * a.y * .75);
    }
    #define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
    #define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

    out vec4 fragColor;

    void main() {
        vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
        float aspectRatio = uResolution.x / uResolution.y;

        float pixelSize = PIXEL_SIZE;
        float cellPixelSize = 8.0 * pixelSize;
        
        // Calculate Feed (Ripples)
        float feed = 0.;
        const float speed = 0.30;
        const float thickness = 0.10;
        const float dampT = 1.0;
        const float dampR = 1.0;

        // Current UV for distance calc
        vec2 cellId = floor(fragCoord / cellPixelSize); 
        vec2 cellCoord = cellId * cellPixelSize;
        vec2 uv = ((cellCoord / uResolution)) * vec2(aspectRatio, 1.0);

        for (int i = 0; i < MAX_CLICKS; ++i) {
            vec2 pos = uClickPos[i];
            if(pos.x < 0.0) continue; 
            
            vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / uResolution)) * vec2(aspectRatio, 1.0);
            float t = max(uTime - uClickTimes[i], 0.0);
            float r = distance(uv, cuv);
            
            float waveR = speed * t;
            float ring = exp(-pow((r - waveR) / thickness, 2.0));
            float atten = exp(-dampT * t) * exp(-dampR * r);
            
            feed = max(feed, ring * atten); 
        }

        // Dithering
        float bayerValue = Bayer8(fragCoord / pixelSize) - .5;
        float bw = step(0.5, feed + bayerValue);

        // Output Color
        if (bw < 0.1) discard; // Transparent background
        fragColor = vec4(uPixelColor, 1.0); // Use the accent color
    }
    `;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2'); 
    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(canvas);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const MAX_CLICKS = 10;

    const uniforms = {
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1., -1.)) },
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },
        uTime: { value: 0 },
        uPixelColor: { value: new THREE.Color('#000000') } // Default black, will update
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        glslVersion: THREE.GLSL3,
        transparent: true
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let clickIndex = 0;
    
    // Interaction
    window.addEventListener('pointerdown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const cssX = e.clientX - rect.left;
        const cssY = e.clientY - rect.top;
        uniforms.uClickPos.value[clickIndex].set(cssX * canvas.width / rect.width, (rect.height - cssY) * canvas.height / rect.height);
        uniforms.uClickTimes.value[clickIndex] = uniforms.uTime.value;
        clickIndex = (clickIndex + 1) % MAX_CLICKS;
    });

    // Color Update Logic
    function updateColors() {
        const style = getComputedStyle(document.body);
        const accent = style.getPropertyValue('--accent').trim(); // Use Accent color for ripples
        // Or interact with text-primary if preferred, but accent is safer for visibility on both backgrounds
        uniforms.uPixelColor.value.set(accent); 
    }
    
    // Initial Color Update
    updateColors();

    // Observe Theme Changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Resize
    function resize() {
        const width  = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
    }
    window.addEventListener('resize', resize);
    resize();

    // Loop
    const clock = new THREE.Clock();
    function render() {
        uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();
}
