function getPassedFunctionData(){
   // return location.href.split('?')[1].split('&');
   
   let params = location.href.split('?')[1].split('&');
   let data = {};
   for(let i in params){
      data[params[i].split('=')[0]] = params[i].split('=')[1];
   }
   return data;
}

function __initializationSequence(){
   try{   
      // attemptBuildShapeFromModel();
      // let dc = new Cube(0,0,666,0,0,0);
      
      // let fnData = getPassedFunctionData();
      let fnDataRaw = getPassedFunctionData();
      fnDataRaw.fnData = fnDataRaw.fnData.split('%22').join('\"');
      let fnData = JSON.parse(fnDataRaw.fnData);
      
      function f(x){
         return 0.0075 * (Math.pow(x, 3));
      }
      
      // let dfn = new FunctionModel(0,0,925,0,0,0,f);
      // dfn.compileFn(f);
      
      if(fnData.f != false){
         let ddfn = new DataModel(0,0,925,0,0,0,Number(fnData.l), Number(fnData.u), Number(fnData.s), fnData.r, 'f', fnData.f, fnData.F);
         ddfn.parseFn(fnData.f.n);
         ddfn.compileFn();
         ddfn.queueRender();
      }
      
      if(fnData.g != false){
         let ddgn = new DataModel(0,0,925,0,0,0,Number(fnData.l), Number(fnData.u), Number(fnData.s), fnData.r, 'g', fnData.g, fnData.G);
         ddgn.parseFn(fnData.g.n);
         ddgn.compileFn();
         ddgn.queueRender();
      }
      
      // alert(JSON.stringify(ddfn.pnt.y));
   }catch(e){
      log(e, true);
      alert(e);
   }
}

function attemptBuildShapeFromModel(){
   let dm = new Model(0,0,666,0,0,0);
   dm.createVertex('dv00', 50, 50, 50);
   dm.createVertex('dv01', 50, -50, 50);
   dm.createVertex('dv02', -50, -50, 50);
   dm.createVertex('dv03', -50, 50, 50);
   dm.createVertex('dv04', 50, 50, -50);
   dm.createVertex('dv05', 50, -50, -50);
   dm.createVertex('dv06', -50, -50, -50);
   dm.createVertex('dv07', -50, 50, -50);
   dm.createVertex('dv08', 50, 50, 50);
   dm.createVertex('dv09', 50, 50, -50);
   dm.createVertex('dv10', 50, -50, -50);
   dm.createVertex('dv11', 50, -50, 50);
   dm.createVertex('dv12', -50, 50, 50);
   dm.createVertex('dv13', -50, 50, -50);
   dm.createVertex('dv14', -50, -50, -50);
   dm.createVertex('dv15', -50, -50, 50);
   
   dm.createFace(['dv00', 'dv01', 'dv02', 'dv03'], '#ff1818');
   dm.createFace(['dv04', 'dv05', 'dv06', 'dv07'], '#ff0000');
   dm.createFace(['dv08', 'dv09', 'dv10', 'dv11'], '#0000ff');
   dm.createFace(['dv12', 'dv13', 'dv14', 'dv15'], '#0a4cff');
   dm.createFace(['dv00', 'dv04', 'dv07', 'dv03'], '#00ff00');
   dm.createFace(['dv01', 'dv10', 'dv14', 'dv02'], '#18ff18');
}

window.addEventListener('load', __initializationSequence);

/*
try{
   // alert(plog('a'));
   let temploga = log('aloha', true);
   log(getLogById(temploga), true);
   log(temploga, true);
   (async function testidgen(){
      await pause(5000);
      let templogb = log('delayed aloha', true);
      log(getLogById(templogb), true);
      log(templogb, true);
   })();
}catch(e){alert(e)}
*/