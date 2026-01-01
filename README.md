# Prabhat Sharma - Portfolio Website

A modern, highly interactive personal portfolio website designed to showcase professional experience, technical skills, and academic projects. The site features a dynamic shader background, custom cursor interactions, and a polished dark/light mode experience.

## 🚀 Features

- **Interactive Shader Background**: A fluid, color-adaptive background powered by WebGL/Three.js that responds to theme changes.
- **Custom Cursor**: A custom-designed cursor that reacts to interactive elements (links, buttons) with smooth animations and hiding logic for text selection.
- **Dark/Light Mode**: Fully supported theme switching with persistence using LocalStorage.
- **Responsive Design**: Optimized for all device sizes, from mobile phones to large desktop screens.
- **Smooth Animations**: Reveal-on-scroll animations and hover effects for a premium user experience.
- **SEO Optimized**: Semantic HTML and accessibility considerations.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+ Modules).
- **Graphics**: WebGL / Custom Shaders (Fragment Shaders) for the background effects.
- **Icons**: SVG Icons for crisp rendering on high-DPI displays.
- **No External Frameworks**: Built with pure vanilla technologies for maximum performance and control.

## 📂 Project Structure

```bash
├── css/
│   ├── main.css        # Main stylesheet
│   ├── reset.css       # CSS reset
│   └── variables.css   # CSS variables (colors, fonts, etc.)
├── icons/              # SVG icons for tech stack and UI
├── js/
│   ├── cursor.js       # Custom cursor logic
│   ├── main.js         # Main application logic
│   ├── shaderBg.js     # Background shader implementation
│   └── canvas.js       # Additional canvas effects
├── index.html          # Main entry point
└── README.md           # Project documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

Since this project uses **ES6 Modules** (e.g., `<script type="module">`), you cannot simply open `index.html` directly from the file system due to browser CORS security policies. You need a local development server.

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrImaginatory/portfolio.git
   cd portfolio
   ```

2. **Run with a Local Server**
   
   - **Using VS Code Live Server Extension:**
     - Open the folder in VS Code.
     - Right-click `index.html` and select "Open with Live Server".

## 🎨 Customization

- **Themes**: Edit `css/variables.css` to modify the color palettes for dark and light modes.
- **Content**: Update `index.html` to change the professional summary, experience, and projects.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
© 2026 Prabhat Sharma. Built with Vanilla JS & Motion.
