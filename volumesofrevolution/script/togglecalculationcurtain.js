const curtain = document.querySelector('#calculation-curtain');

async function hideCalcCurtain(){
   curtain.style.visibility = 'hidden';
   // console.log('hide');
   return new Promise(resolve => resolve('Hid calculation curtain'));
}

async function showCalcCurtain(){
   curtain.style.visibility = 'visible';
   // console.log('show');
   return new Promise(resolve => resolve('Showed calculation curtain'));
}

async function toggleCalcCurtain(){
   if(curtain.style.visibility == 'hidden'){
      await showCalcCurtain();
      return new Promise(resolve => resolve('Showed calculation curtain'));;
   }
   await hideCalcCurtain();
   return new Promise(resolve => resolve('Hid calculation curtain'));;
}

hideCalcCurtain();