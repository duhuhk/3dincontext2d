var __activeKeys = [];

function handleKeyDown(e){
   if(!__activeKeys.includes(e.code)) __activeKeys.push(e.code);
}
function handleKeyUp(e){
   if(__activeKeys.includes(e.code)) __activeKeys.splice(__activeKeys.indexOf(e.code), 1);
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
window.addEventListener('focus', e => __activeKeys = []);
window.addEventListener('blur', e => __activeKeys = []);

function getInput(key){
   return __activeKeys.includes(key);
}