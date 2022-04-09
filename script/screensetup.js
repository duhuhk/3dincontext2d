const defaultFontSize = 16;
// Technically default is 16px, but log uses 1.25em

function screenSetup(){
   // Get ratio multiplier
   let w = Math.floor(window.innerWidth / 480);
   let h = Math.floor(window.innerHeight / 270);
   let dimMult = Math.max(w < h ? w : h, 1);

   // Add ratio multiplier to CSS
   setCSSVar('--canvas-dimension-mult', dimMult);

   // cameraProximityThreshold = 20 / (cvs.width / 480);
   // ^ Probably set as a const in ./render.js, 
   //   may be needed here in future byt likely not

   setCSSVar('--log-font-size', String(defaultFontSize * dimMult) + 'px');

   console.log('Resized screen (multiplier: ' + dimMult + ')');
}

screenSetup();
window.onresize = screenSetup;