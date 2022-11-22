const logElement = document.querySelector('#log');
const permanentLogs = [];
function getLogById(id){
   let ind = permanentLogs.map(s => s.id).indexOf(id);
   return { index: ind, string: permanentLogs[ind].toString(), id: id };
}
class PermanentLogString{
   constructor(str, id){
      this.str = '#P# > ' + str;
      this.id = id;
   }
   toString(){
      return this.str;
   }
}
function log(str, permanent = false, error = false){
   if(typeof str != 'string') str = str.toString();
   let logType = "temporary-log";
   if(permanent) logType = "permanent-log";
   if(error) logType = "error-log";
   logElement.innerHTML += '<br /><span class='+ logType +'>' + str + '</span>';
   /*
   let logLn = document.createElement('p').appendChild(document.createTextNode(str));
   logLn.className = 'temporary-log';
   logElement.innerHTML += '<br />';
   logElement.appendChild(logLn);
   */
   if(permanent){
      let id0 = padStr(hexify(permanentLogs.length % 255), 2);
      let idA = performance.now().toFixed(5).split('.');
      idA[0] = padStr(hexify(Number(idA[0]) % 16777215), 6);
      idA[1] = padStr(hexify(Number(idA[1]) % 65535), 4);
      // let id1 = idA[0];
      // let id2 = idA[1];
      let idB = [id0, idA[0], idA[1]];
      let id =  idB.join('.');
      let perm = new PermanentLogString(str, id);
      permanentLogs.push(perm);
      return perm.id;
   }
}
function plog(str){
   return log(str, true);
}

function setLogSize(){
   setCSSVariable('--log-height', 'calc(' + window.innerHeight + 'px - 1.15em - 1.5em + 0.1em)');
}
window.addEventListener('resize', setLogSize);
setLogSize();