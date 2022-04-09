const cvs = document.querySelector('#display-element');
const ctx = cvs.getContext('2d');
ctx.imageSmoothingEnabled = false;

const cameraProximityThreshold = 20 / (cvs.width / 480);

var d = 500;

var renderLoopEntities = [];
var renderLoopEntityFaces = [];

function renderLoop(){
   let tStart = performance.now();
   ctx.lineWidth = 1;
   logEl.innerHTML = '[ ' + padInt(fps.now, 2) + ' FPS &nbsp;:|:&nbsp; ' + renderLoopEntities.reduce((a, b) => a + b.faces.length, 0) + ' Polys ]';
   
   ctx.clearRect(0,0,cvs.width,cvs.height);
   let drawHorizon = function(ground, sky){
      ctx.fillStyle = ground;
      ctx.fillRect(0, (cvs.height * 0.5), cvs.width, (cvs.height * 0.5));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, cvs.width, (cvs.height * 0.5));
   }
   // drawHorizon('rgb(167, 88, 15)', 'rgb(115, 175, 200)');
   ctx.translate(cvs.width / 2, cvs.height / 2);
   
   renderLoopEntityFaces = [];
   
   try{
      
      renderLoopEntities.forEach(n => {
         // if(Math.abs(n.faces.sort((a, b) => (b.dAvg) - (a.dAvg))[0].zAvg) < d) n.render();
         n.render();
      });
      
      
      /*
      renderLoopEntities.forEach(n => n.queueRender());
      renderLoopEntityFaces.sort((a, b) => (a.renderBias) - (b.renderBias));
      renderLoopEntityFaces.forEach(n => n.render());
      */
      
   }catch(err){
      log(err);
   }
   
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   fps.add(performance.now());
   window.requestAnimationFrame(renderLoop);
}

window.requestAnimationFrame(renderLoop);

// ctx.fillRect(10,10,10,10);