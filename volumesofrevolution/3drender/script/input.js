var activeKeys = [];

function keyActive(key){
   return activeKeys.includes(key);
}

window.addEventListener('keydown', e => {
   if(!activeKeys.includes(e.code)) activeKeys.push(e.code);
});

window.addEventListener('keyup', e => {
   if(activeKeys.includes(e.code)) activeKeys.splice(activeKeys.indexOf(e.code), 1);
});

const input_Q = document.querySelector('#Q');
const input_W = document.querySelector('#W');
const input_E = document.querySelector('#E');
const input_R = document.querySelector('#R');
const input_T = document.querySelector('#T');
const input_A = document.querySelector('#A');
const input_S = document.querySelector('#S');
const input_D = document.querySelector('#D');
const input_F = document.querySelector('#F');
const input_G = document.querySelector('#G');
const input_Z = document.querySelector('#Z');
const input_X = document.querySelector('#X');
const input_CV = document.querySelector('#CV');
const input_SPACE = document.querySelector('#SPACE');

input_Q.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyQ')) activeKeys.push('KeyQ');
});
input_Q.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyQ')) activeKeys.splice(activeKeys.indexOf('KeyQ'), 1);
});
input_W.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyW')) activeKeys.push('KeyW');
});
input_W.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyW')) activeKeys.splice(activeKeys.indexOf('KeyW'), 1);
});
input_E.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyE')) activeKeys.push('KeyE');
});
input_E.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyE')) activeKeys.splice(activeKeys.indexOf('KeyE'), 1);
});
input_R.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyR')) activeKeys.push('KeyR');
});
input_R.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyR')) activeKeys.splice(activeKeys.indexOf('KeyR'), 1);
});
input_T.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyT')) activeKeys.push('KeyT');
});
input_T.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyT')) activeKeys.splice(activeKeys.indexOf('KeyT'), 1);
});
input_A.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyA')) activeKeys.push('KeyA');
});
input_A.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyA')) activeKeys.splice(activeKeys.indexOf('KeyA'), 1);
});
input_S.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyS')) activeKeys.push('KeyS');
});
input_S.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyS')) activeKeys.splice(activeKeys.indexOf('KeyS'), 1);
});
input_D.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyD')) activeKeys.push('KeyD');
});
input_D.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyD')) activeKeys.splice(activeKeys.indexOf('KeyD'), 1);
});
input_F.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyF')) activeKeys.push('KeyF');
});
input_F.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyF')) activeKeys.splice(activeKeys.indexOf('KeyF'), 1);
});
input_G.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyG')) activeKeys.push('KeyG');
});
input_G.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyG')) activeKeys.splice(activeKeys.indexOf('KeyG'), 1);
});
input_Z.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyZ')) activeKeys.push('KeyZ');
});
input_Z.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyZ')) activeKeys.splice(activeKeys.indexOf('KeyZ'), 1);
});
input_X.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyX')) activeKeys.push('KeyX');
});
input_X.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyX')) activeKeys.splice(activeKeys.indexOf('KeyX'), 1);
});
input_CV.addEventListener('mousedown', e => {
   if(!activeKeys.includes('KeyC')) activeKeys.push('KeyC');
   if(!activeKeys.includes('KeyV')) activeKeys.push('KeyV');
});
input_CV.addEventListener('mouseup', e => {
   if(activeKeys.includes('KeyC')) activeKeys.splice(activeKeys.indexOf('KeyC'), 1);
   if(activeKeys.includes('KeyV')) activeKeys.splice(activeKeys.indexOf('KeyV'), 1);
});
input_SPACE.addEventListener('mousedown', e => {
   if(!activeKeys.includes('Space')) activeKeys.push('Space');
});
input_SPACE.addEventListener('mouseup', e => {
   if(activeKeys.includes('Space')) activeKeys.splice(activeKeys.indexOf('Space'), 1);
});