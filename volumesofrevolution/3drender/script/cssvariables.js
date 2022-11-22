function setCSSVariable(v, val){
   document.documentElement.style.setProperty(v, val);
}

function getCSSVariable(v){
   return getComputedStyle(document.documentElement).getPropertyValue(v);
}