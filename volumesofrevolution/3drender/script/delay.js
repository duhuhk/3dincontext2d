async function pause(t){
   return new Promise(resolve => {
      window.setTimeout(() => {
         resolve('Waited ' + t + 'ms');
      }, t);
   });
}