const prevs = document.querySelector('#preview-2d');
const pretx = prevs.getContext('2d');

var points = {
   f: {
      x: [],
      y: [],
   },
   g: {
      x: [],
      y: [],
   },
};

pretx.fillRect(0,0,50,50);

function pythagoras(x, y){
   return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function changeXBounds(x, y, event){
   switch(event.button){
      case 0:     // Left
         input_xUp.value = x.toString(10);
         handleUpDoInput();
         if(!event.shiftKey){
            input_yUp.value = y.toString(10);
            handleUpRaInput();
         }
         break;
      case 1:     // Middle
         if(x > 0){
            input_xUp.value = x.toString(10);
            input_xLo.value = '0';
            handleUpDoInput();
            handleLoDoInput();
            if(!event.shiftKey){
               input_yUp.value = y.toString(10);
               input_yLo.value = '0';
               handleUpRaInput();
               handleLoRaInput();
            }
         }else{
            input_xLo.value = x.toString(10);
            input_xUp.value = '0';
            handleUpDoInput();
            handleLoDoInput();
            if(!event.shiftKey){
               input_yLo.value = y.toString(10);
               input_yUp.value = '0';
               handleUpRaInput();
               handleLoRaInput();
            }
         }
         break;
      case 2:
         input_xLo.value = x.toString(10);
         handleLoDoInput();
         if(!event.shiftKey){
            input_yLo.value = y.toString(10);
            handleLoRaInput();
         }
         break;
   }
   renderPreview();
}

async function calculatePreviewPoints(stepIndex){
   points = {f: {x: [], y: []}, g: {x: [], y: []}};


}

async function renderPreview(stepIndex = step){

   let hidingCurtain = false;
   if(stepIndex == step){
      await showCalcCurtain();
      hidingCurtain = true;
   }
   // await showCalcCurtain();

   await pause(1);
   // For some reason without this line in this exact spot
   // the script shows curtain -> hides curtain -> renders
   
   // Get scaling of canvas
   pretx.clearRect(0,0,prevs.width,prevs.height);
   let xScale = (prevs.width - 2) / (xUpperBound - xLowerBound);
   let xShift = -1 * xScale * xLowerBound;
   let yScale = -1 * (prevs.height - 2) / (yUpperBound - yLowerBound);
   let yShift = (-1 * yScale * yLowerBound) + prevs.height - 1;
   pretx.setTransform(1, 0, 0, 1, xShift + 1, yShift);

   pretx.strokeStyle = 'black';
   pretx.lineWidth = 2;
   // x-axis
   pretx.beginPath();
   pretx.moveTo(xLowerBound * xScale, 0);
   pretx.lineTo(xUpperBound * xScale, 0);
   pretx.closePath();
   pretx.stroke();
   // y-axis
   pretx.beginPath();
   pretx.moveTo(0, yLowerBound * yScale);
   pretx.lineTo(0, yUpperBound * yScale);
   pretx.closePath();
   pretx.stroke();

   pretx.lineWidth = 1;
   
   // Draw f(x) and g(x) previews
   try{
      if(fIsSet){
         pretx.strokeStyle = color_f.value;
         pretx.fillStyle = color_f.value + '55';
         pretx.beginPath();
         pretx.moveTo(xLowerBound * xScale, Number(nerdamer('f(' + (xLowerBound == 0 ? 0.00001 : xLowerBound) + ')').evaluate().text('decimal')) * yScale);
         let xIncomplete = true;
         for(let i = xLowerBound; i < xUpperBound; i += stepIndex){
            let k = i == 0 ? 0.00001 : i;
            let y = nerdamer('f(' + k + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(k * xScale, Number(y) * yScale);
            if(i == xUpperBound) xIncomplete = false;
         }
         if(xIncomplete){
            let y = nerdamer('f(' + xUpperBound + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(xUpperBound * xScale, Number(y) * yScale);
         }
         pretx.stroke();
         pretx.closePath();
      }
      if(gIsSet){
         pretx.strokeStyle = color_g.value;
         pretx.fillStyle = color_g.value + '55';
         pretx.beginPath();
         pretx.moveTo(xLowerBound * xScale, Number(nerdamer('g(' + xLowerBound + ')').evaluate().text('decimal')) * yScale);
         let xIncomplete = true;
         for(let j = xLowerBound; j < xUpperBound; j += stepIndex){
            let k = j == 0 ? 0.00001 : j;
            let y = nerdamer('g(' + k + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(k * xScale, Number(y) * yScale);
            if(j == xUpperBound) xIncomplete = false;
         }
         if(xIncomplete){
            let y = nerdamer('g(' + xUpperBound + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(xUpperBound * xScale, Number(y) * yScale);
         }
         pretx.stroke();
         pretx.closePath();
      }
   }catch(err){
      errorLog.general.push(err);
      console.log(err);
   }

   try{
      xIsG.innerHTML = 'undefined';
      if(fIsSet && gIsSet){
         let fg = nerdamer('solve(f(x)=g(x),x)').evaluate().text('decimal').split(/[\[\]]/g).join('').split(',');
         // console.log(fg);
         for(let i = 0; i < fg.length; i++){
            if(fg[i].substring(0,2) == '0-') fg[i] = fg[i].substring(1);
            fg[i] = Number(fg[i]);
         }
         fg = JSON.stringify(fg).split(/[\[\]]/g).join('').split(',');
         for(let i = 0; i < fg.length; i++){
            let y = nerdamer('f(' + fg[i] + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            let dispFG = Number(fg[i]);
            if(fg[i].toString(10).length >= 6) dispFG = dispFG.toFixed(4) + '...';
            let dispY = Number(y).toString(10);
            if(dispY.length >= 6) dispY = Number(y).toFixed(4) + '...';
            let title='(' + dispFG + ', ' + dispY + ')';
            fg[i] = '<u style="color: skyblue" oncontextmenu="return false" data-x-value="' + fg[i] + '" onmousedown="(function a(event){changeXBounds(' + fg[i] + ',' + Number(y).toString(10) + ',event);})(event)" title="' + title + '">' + dispFG + '</u>';
         }
         fg = [... new Set(fg)].join(', ');
         xIsG.innerHTML = fg;
      }
   }catch(e){
      xIsG.innerHTML = '<span style="text-shadow: 0 0 5px red;">[ <i>f</i> never equals <i>g</i> ]</span>';
      console.log(e);
      //alert(e);
   }

   pretx.setTransform(1, 0, 0, 1, 0, 0);

   pretx.strokeStyle = 'black';
   pretx.lineWidth = 2;
   // y-axis
   if(yLowerBound != -1 * yUpperBound){
      pretx.beginPath();
      pretx.moveTo(1,0);
      pretx.lineTo(1,prevs.height);
      pretx.moveTo(1,prevs.height / 2);
      pretx.lineTo(10,prevs.height / 2);
      pretx.closePath();
      pretx.stroke();
   }
   // x-axis
   if(xLowerBound != -1 * xUpperBound){
      pretx.beginPath();
      pretx.moveTo(0, prevs.height - 1);
      pretx.lineTo(prevs.width, prevs.height - 1);
      pretx.moveTo(prevs.width / 2, prevs.height - 1);
      pretx.lineTo(prevs.width / 2, prevs.height - 1 - 10);
      pretx.closePath();
      pretx.stroke();
   }

   if(hidingCurtain == true) await hideCalcCurtain();
   // await hideCalcCurtain();

   // In case something needs to await this
   return new Promise(resolve => resolve('Rendered preview'));
   
   // window.requestAnimationFrame(renderPreview);
}

// window.requestAnimationFrame(renderPreview);
renderPreview(step * 100);
window.setTimeout(renderPreview, 1);

var _prev = {
   f: input_f.value,
   g: input_g.value,
   s: input_s.value,
   yLo: input_yLo.value,
   yUp: input_yUp.value,
   xLo: input_xLo.value,
   xUp: input_xUp.value,
};

input_f.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_f.addEventListener('blur', e => {
   if(_prev.f != input_f.value){
      renderPreview();
   }
   _prev.f = input_f.value;
});

input_g.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_g.addEventListener('blur', e => {
   if(_prev.g != input_g.value){
      renderPreview();
   }
   _prev.g = input_g.value;
});

input_s.addEventListener('blur', e => {
   if(_prev.s != input_s.value){
      renderPreview();
   }
   _prev.s = input_s.value;
});

input_yLo.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_yLo.addEventListener('blur', e => {
   if(_prev.yLo != input_yLo.value){
      renderPreview();
   }
   _prev.yLo = input_yLo.value;
});

input_yUp.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_yUp.addEventListener('blur', e => {
   if(_prev.yUp != input_yUp.value){
      renderPreview();
   }
   _prev.yUp = input_yUp.value;
});

input_xLo.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_xLo.addEventListener('blur', e => {
   if(_prev.xLo != input_xLo.value){
      renderPreview();
   }
   _prev.xLo = input_xLo.value;
});

input_xUp.addEventListener('keyup', e => {
   renderPreview((xUpperBound - xLowerBound) / 100);
   // renderPreview();
});
input_xUp.addEventListener('blur', e => {
   if(_prev.xUp != input_xUp.value){
      renderPreview();
   }
   _prev.xUp = input_xUp.value;
});
