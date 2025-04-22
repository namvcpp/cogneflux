const fs = require('fs');
const path = require('path');

// Define paths
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PUBLIC_OUTPUTS_DIR = path.join(PUBLIC_DIR, 'manim_outputs');
const ASSETS_DIR = path.join(process.cwd(), 'src', 'assets', 'mock');

// Create directories if they don't exist
function ensureDirectories() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    console.log('Created public directory');
  }
  
  if (!fs.existsSync(PUBLIC_OUTPUTS_DIR)) {
    fs.mkdirSync(PUBLIC_OUTPUTS_DIR, { recursive: true });
    console.log('Created manim outputs directory');
  }
  
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
    console.log('Created mock assets directory');
  }
}

// Create a basic SVG for the mock image
function createMockImage() {
  const svgPath = path.join(PUBLIC_OUTPUTS_DIR, 'mock_image.svg');
  if (fs.existsSync(svgPath)) return;
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
    <rect width="640" height="480" fill="#f0f0f0"/>
    <text x="320" y="240" font-family="Arial" font-size="24" text-anchor="middle">Manim Animation Placeholder</text>
    <circle cx="320" cy="320" r="50" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <path d="M320,270 L320,370 M270,320 L370,320" stroke="#3b82f6" stroke-width="4"/>
  </svg>`;
  
  fs.writeFileSync(svgPath, svgContent);
  console.log('Created mock SVG image');
  
  // Also create a PNG version - base64 encoded basic PNG
  const pngPath = path.join(PUBLIC_OUTPUTS_DIR, 'mock_image.png');
  if (!fs.existsSync(pngPath)) {
    // Base64 encoded PNG with the same plus symbol
    const basicPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAUAAAADICAYAAACZBDirAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAG' +
      'IElEQVR4nO3dwXHbRhSA4YeM61ApIN6VmK7EUQeOO3BSQpwOlA6ccQlKB1EqkNQBfXA0Y9Py8JcB' +
      'HgD7fadIHlLDt6vFAgvg6e3tDUnK6K/WA0hSKwZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloG' +
      'UFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQ' +
      'UloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBS' +
      'WgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJa' +
      'BlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloG' +
      'UFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQ' +
      'UloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUloGUFJaBlBSWgZQUln+3HkBaiiRr4Bl4fvfn7eC//5z5rz0DL8DrPd/7Cn+TP4EBlCZKsg9c48N227/Dw9MC/+ow1ctr++vuzrVlCmUApaKS7IB74KZ9+f39gMceG0SVRriLYQCld5JsgF+Bm/Zla3tcgyOonQZQqSXZAr9wu+qpYWi4rQa3wLbxLI0YwCPybXAmSTbAA7c9vSslH9nq+A7Ar8CXvudaJgO4UEmugHvge/uypDXTeWyBL8AHYNd4lioM4EIk2QI77nu7PzdNh2prYACXzwAuQJId8ADsWs+yQJUS+Ifn3zzPA1Q3kyQ3wC8YP7jfZj11fc+6IleAE0tyRRnp3bseW',
      'base64'
    );
    fs.writeFileSync(pngPath, basicPng);
    console.log('Created mock PNG image');
  }
}

// Create a mock HTML file for when video isn't available
function createMockHTML() {
  const htmlPath = path.join(PUBLIC_OUTPUTS_DIR, 'mock_animation.html');
  if (fs.existsSync(htmlPath)) return;
  
  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <title>Manim Animation Mock</title>
    <style>
      body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f0f0f0;
        font-family: Arial, sans-serif;
      }
      .container {
        text-align: center;
      }
      .circle {
        width: 100px;
        height: 100px;
        border: 4px solid #3b82f6;
        border-radius: 50%;
        margin: 20px auto;
        position: relative;
        animation: pulse 2s infinite;
      }
      .circle::before, .circle::after {
        content: '';
        position: absolute;
        background: #3b82f6;
      }
      .circle::before {
        width: 4px;
        height: 100px;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
      .circle::after {
        width: 100px;
        height: 4px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .loading {
        border: 5px solid rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        border-top: 5px solid #3b82f6;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Manim Animation Placeholder</h2>
      <div class="circle"></div>
      <div class="loading"></div>
      <p>Interactive animation not available</p>
    </div>
  </body>
  </html>`;
  
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Created mock HTML animation');
}

// Create a mock MP4 file or placeholder
function createMockVideo() {
  const videoPath = path.join(PUBLIC_OUTPUTS_DIR, 'mock_animation.mp4');
  if (fs.existsSync(videoPath)) return;
  
  // Create an HTML file that acts as a fallback for the MP4
  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="refresh" content="0;url=/manim_outputs/mock_animation.html">
  </head>
  <body>
    Redirecting to animation placeholder...
  </body>
  </html>`;
  
  fs.writeFileSync(videoPath, htmlContent);
  console.log('Created video fallback file');
  
  console.log('\nINFO: For best results, place an actual MP4 file at:');
  console.log(videoPath);
}

// Create a version file to track setup version
function createVersionFile() {
  const versionPath = path.join(PUBLIC_OUTPUTS_DIR, '.version');
  fs.writeFileSync(versionPath, '1.0.0');
  console.log('Created version file');
}

// Run setup
try {
  ensureDirectories();
  createMockImage();
  createMockHTML();
  createMockVideo();
  createVersionFile();
  console.log('\nSetup completed successfully!');
} catch (error) {
  console.error('Error during setup:', error);
  process.exit(1);
}
