function render(){
   /*
   if(__frame % 4 != 0){
      __frame++;
      window.requestAnimationFrame(render);
      return false;
   }
   */
   fps = 1000 / (performance.now() - __time);
   
   movementScalar = 1;
   if(keyActive('ShiftLeft') || keyActive('ShiftRight')) movementScalar = 0.1;
   
   ctx.clearRect(0, 0, cvs.width, cvs.height);
   ctx.setTransform(1, 0, 0, -1, cvs.width / 2, cvs.height / 2);
   
   logElement.innerHTML = '<span>(' + fps.toFixed(0) + ' FPS)</span>';
   __time = performance.now();
   permanentLogs.forEach(l => log(l, false));
   
   try{      
      // __renderObjects.sort((a, b) => (a.renderBias) - (b.renderBias));
      /*
      __renderObjects.forEach(obj => {
         // if(obj.renderBias < __cameraThreshold && obj.renderBias > 0){ obj.render(); }
         obj.queueRender();
      });
      */
      __renderObjects.forEach(obj => obj.input());
      __renderFaces.sort((a, b) => (a.renderBias) - (b.renderBias));
      __renderFaces.forEach(f => {
         f.render( (__renderFaces.length - __renderFaces.indexOf(f)) / (3 * __renderFaces.length) );
         // if(__renderFaces.indexOf(f) == __renderFaces.length - 1) log(f.renderBias);
      });
   }catch(e){
      log(e);
   }
   
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   
   __frame++;
   window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);