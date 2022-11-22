// Canvas
const cvs = document.querySelector('#render-element');
const ctx = cvs.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Camera
const D = 1000;
const __cameraThreshold = 200;

// Movement scaling
var movementScalar = 1;

// Render lists
var __renderObjects = [];
var __renderFaces = [];

// FPS
var __time = performance.now();
var __frame = 0;
var fps = 0;

// Error
window.onerror = e => log(e);