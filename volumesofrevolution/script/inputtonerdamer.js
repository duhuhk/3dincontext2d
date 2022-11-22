const input_f = document.querySelector('#f-of-x');
const input_g = document.querySelector('#g-of-x');
const color_f = document.querySelector('#f-color');
const color_g = document.querySelector('#g-color');
const input_s = document.querySelector('#step');
const input_yLo = document.querySelector('#range-lower');
const input_yUp = document.querySelector('#range-upper');
const input_xLo = document.querySelector('#domain-lower');
const input_xUp = document.querySelector('#domain-upper');
const input_rS = document.querySelector('#r-step');

const xIsG = document.querySelector('#f-equals-g');

const _mCvs = document.createElement('canvas');
const _mCtx = _mCvs.getContext('2d');
const _mFont = window.getComputedStyle(input_f);
const _mDefaultFont = 'bold ' + _mFont.getPropertyValue('font-size') + ' ' + _mFont.getPropertyValue('font-family');
function measureStr(str, font = _mDefaultFont){
   _mCtx.font = font;
   return _mCtx.measureText(str + 'Mi').width;
}

const errorLog = {
   nerdamer: [],
   general: [],
};

// var raw_f = null;
var dummy_f = null;
var fIsSet = false;
var dummy_g = null;
var gIsSet = false;
var dummy_s = null;
var dummy_rS = null;

// Add changing support for these
var step = 0.1;
var rotStep = (1 / 6) * Math.PI;
var xLowerBound = -1;
var xUpperBound = 1;
var yLowerBound = -1;
var yUpperBound = 1;

function sizingFunctionInputF(e){
   input_f.style.width = measureStr(input_f.value + 'M') + 'px';
}
function handleFunctionInputF(e){
   fIsSet = false;
   input_f.style.width = measureStr(input_f.value) + 'px';
   try{
      nerdamer.setFunction('f', ['x'], String(input_f.value).split(' ').join('') + ' ');
      dummy_f = Number(nerdamer('f(0.00001)').toString());
      document.documentElement.style.setProperty('--motif-f', 'white');
      fIsSet = true;
   }catch(err){
      document.documentElement.style.setProperty('--motif-f', 'yellow');
      errorLog.nerdamer.push(err);
      // console.log(String(input_f.value));
      // console.log(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_f.blur();
         input_g.focus();
         input_g.select();
      }
   }
}

function sizingFunctionInputG(e){
   input_g.style.width = measureStr(input_g.value + 'M') + 'px';
}
function handleFunctionInputG(e){
   gIsSet = false;
   input_g.style.width = measureStr(input_g.value) + 'px';
   try{
      nerdamer.setFunction('g', ['x'], String(input_g.value).split(' ').join('') + ' ');
      dummy_g = Number(nerdamer('g(0.00001)').toString());
      document.documentElement.style.setProperty('--motif-g', 'white');
      gIsSet = true;
   }catch(err){
      document.documentElement.style.setProperty('--motif-g', 'yellow');
      errorLog.nerdamer.push(err);
      // console.log(String(input_g.value));
      // console.log(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_g.blur();
         input_s.focus();
         input_s.select();
      }
   }
}

function sizingStepInput(e){
   input_s.style.width = measureStr(input_s.value + 'M') + 'px';
}
function handleStepInput(e){
   input_s.style.width = measureStr(input_s.value) + 'px';
   try{
      dummy_s = Number(nerdamer(input_s.value).evaluate().text('decimal'));
      if(typeof dummy_s != 'number' || dummy_s / dummy_s != 1) throw 'Not real number!'
      document.documentElement.style.setProperty('--motif-step', 'white');
      step = Number(input_s.value);
   }catch(err){
      document.documentElement.style.setProperty('--motif-step', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_s.blur();
         input_yLo.focus();
         input_yLo.select();
      }
   }
}

function sizingRotStepInput(e){
   input_rS.style.width = measureStr(input_rS.value + 'M') + 'px';
}
function handleRotStepInput(e){
   input_rS.style.width = measureStr(input_rS.value) + 'px';
   try{
      dummy_rS = Number(nerdamer(input_rS.value).evaluate().text('decimal'));
      if(typeof dummy_rS != 'number' || dummy_rS / dummy_rS != 1) throw 'Not real number!';
      document.documentElement.style.setProperty('--motif-r-step', 'white');
      rotStep = Number(nerdamer(input_rS.value).evaluate().text('decimal')) * Math.PI;
   }catch(err){
      document.documentElement.style.setProperty('--motif-r-step', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_s.blur();
         input_yLo.focus();
         input_yLo.select();
      }
   }
}

function sizingLoRaInput(e){
   input_yLo.style.width = measureStr(input_yLo.value + 'M') + 'px';
}
function handleLoRaInput(e){
   input_yLo.style.width = measureStr(input_yLo.value) + 'px';
   try{
      dummy_s = Number(input_yLo.value);
      if(typeof dummy_s != 'number') throw 'Not real number!'
      document.documentElement.style.setProperty('--motif-y-lower', 'white');
      yLowerBound = Number(input_yLo.value) == 0 ? 0.00001 : Number(input_yLo.value);
   }catch(err){
      document.documentElement.style.setProperty('--motif-y-lower', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_yLo.blur();
         input_yUp.focus();
         input_yUp.select();
      }
   }
}

function sizingUpRaInput(e){
   input_yUp.style.width = measureStr(input_yUp.value + 'M') + 'px';
}
function handleUpRaInput(e){
   input_yUp.style.width = measureStr(input_yUp.value) + 'px';
   try{
      dummy_s = Number(input_yUp.value);
      if(typeof dummy_s != 'number') throw 'Not real number!'
      document.documentElement.style.setProperty('--motif-y-upper', 'white');
      yUpperBound = Number(input_yUp.value) == 0 ? 0.00001 : Number(input_yUp.value);
   }catch(err){
      document.documentElement.style.setProperty('--motif-y-upper', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_yUp.blur();
         input_xLo.focus();
         input_xLo.select();
      }
   }
}

function sizingLoDoInput(e){
   input_xLo.style.width = measureStr(input_xLo.value + 'M') + 'px';
}
function handleLoDoInput(e){
   input_xLo.style.width = measureStr(input_xLo.value) + 'px';
   try{
      dummy_s = Number(input_xLo.value);
      if(typeof dummy_s != 'number') throw 'Not real number!'
      document.documentElement.style.setProperty('--motif-x-lower', 'white');
      xLowerBound = Number(input_xLo.value) == 0 ? 0.00001 : Number(input_xLo.value);
   }catch(err){
      document.documentElement.style.setProperty('--motif-x-lower', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_xLo.blur();
         input_xUp.focus();
         input_xUp.select();
      }
   }
}

function sizingUpDoInput(e){
   input_xUp.style.width = measureStr(input_xUp.value + 'M') + 'px';
}
function handleUpDoInput(e){
   input_xUp.style.width = measureStr(input_xUp.value) + 'px';
   try{
      dummy_s = Number(input_xUp.value);
      if(typeof dummy_s != 'number') throw 'Not real number!'
      document.documentElement.style.setProperty('--motif-x-upper', 'white');
      xUpperBound = Number(input_xUp.value) == 0 ? 0.00001 : Number(input_xUp.value);
   }catch(err){
      document.documentElement.style.setProperty('--motif-x-upper', 'yellow');
      errorLog.nerdamer.push(err);
   }

   if(e != null){
      if(e.key == 'Enter'){
         input_xUp.blur();
      }
   }
}

input_f.addEventListener('keypress', sizingFunctionInputF);
input_f.addEventListener('keyup', handleFunctionInputF);
input_g.addEventListener('keypress', sizingFunctionInputG);
input_g.addEventListener('keyup', handleFunctionInputG);
input_s.addEventListener('keypress', sizingStepInput);
input_s.addEventListener('keyup', handleStepInput);
input_rS.addEventListener('keypress', sizingRotStepInput);
input_rS.addEventListener('keyup', handleRotStepInput);
input_yLo.addEventListener('keypress', sizingLoRaInput);
input_yLo.addEventListener('keyup', handleLoRaInput);
input_yUp.addEventListener('keypress', sizingUpRaInput);
input_yUp.addEventListener('keyup', handleUpRaInput);
input_xLo.addEventListener('keypress', sizingLoDoInput);
input_xLo.addEventListener('keyup', handleLoDoInput);
input_xUp.addEventListener('keypress', sizingUpDoInput);
input_xUp.addEventListener('keyup', handleUpDoInput);

function initialGetFunction(){
   handleFunctionInputF();
   handleFunctionInputG();
   handleStepInput();
   handleRotStepInput();
   handleLoRaInput();
   handleUpRaInput();
   handleLoDoInput();
   handleUpDoInput();
}
initialGetFunction();