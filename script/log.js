const logEl = document.querySelector('#halflog');
function log(str){
   if(typeof str != 'string') str = String(str);
   logEl.innerHTML += '<br />' + str;
}

// Handling FPS data
var fps = {
   frames: [0],
   get now(){
      // return 1000 / ((fps.frames.reduce((a, b) => a + b) / fps.frames.length));
      return Math.floor(1000 / ((fps.frames[fps.frames.length - 1] - fps.frames[0]) / fps.frames.length));
   },
   add: function(t){
      if(fps.frames.length > 59) fps.frames.splice(0, fps.frames.length - 59);
      fps.frames.push(t);
   }
};

// Make the seamless faces toggler
var allowSeamlessFaces = true;
var asftDiv = document.createElement('span');
var asftElement = document.createElement('input');
var asftLabel = document.createElement('label');
   // asft: allowSeamlessFacesToggle
asftLabel.for = 'seamless';
asftElement.type = 'checkbox';
asftElement.id = 'seamless';
asftElement.checked = true;
asftElement.style.pointerEvents = 'none';
asftLabel.innerHTML = 'Allow seamless face rendering';
document.body.appendChild(asftDiv);
asftDiv.className = 'log-element';
asftDiv.style.position = 'absolute';
asftDiv.style.right = '0';
// asftDiv.style.marginRight = '5px';
asftDiv.style.top = '0';
// asftDiv.style.marginTop = '5px';
asftDiv.appendChild(asftElement);
asftDiv.appendChild(asftLabel);
asftDiv.addEventListener('click', e => {
   if(asftElement.checked){
      asftElement.checked = false;
      allowSeamlessFaces = false;
   }else{
      asftElement.checked = true;
      allowSeamlessFaces = true;
   }
});