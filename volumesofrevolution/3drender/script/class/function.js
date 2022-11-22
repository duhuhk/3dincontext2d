class FunctionModel extends Model{
   constructor(x,y,z,p,q,r,fn){
      super(x,y,z,p,q,r);
      this.fn = fn;
      this.compileFn(this.fn);
   }
   compileFn(fn){
      // let xpos = [-16, -14, -12, -10, -8, -6, -4, -2, 0.0000001, 2, 4, 6, 8, 10, 12, 14, 16];
      let xpos = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0.000000000001,1,2,3,4,5,6,7,8,9,10];
      let zpos = [-5, 0, 5];
      let tStep = Math.PI / 6;
      let tCnt = 0;
      let rotatedFaces = [];
      let noms = [];
      // let tpos = [2 * Math.PI, 1.5 * Math.PI, Math.PI, 0.5 * Math.PI];
      for(let i = 0; i < 2 * Math.PI; i += tStep){
         rotatedFaces.push([]);
         noms.push([]);
         tCnt++;
      }
      
      for(let x = 0; x < xpos.length; x++){
         for(let t = 0; t < rotatedFaces.length; t++){
            let nom = x + '#' + performance.now().toFixed(16) + t;
            noms[t].push(nom);
            rotatedFaces[t].push(this.createVertex(nom, xpos[x], this.fn(xpos[x]), 0));
         }
      }
      
      for(let i = 0; i < noms.length; i++){
         noms[i].forEach(v => this.vtx[v].r += (i * tStep));
      }
      
      for(let i = 0; i < rotatedFaces[0].length - 1; i++){
         for(let t = 0; t < rotatedFaces.length; t++){
            if(t < rotatedFaces.length - 1){
               this.createFace([noms[t][i], noms[t][i + 1], noms[t + 1][i + 1], noms[t + 1][i]], '#ffff00');
            }else{
               this.createFace([noms[t][i], noms[t][i + 1], noms[0][i + 1], noms[0][i]], '#ffff00');
            }
         }
      }
   }
}

class DataModel extends Model{
   constructor(x,y,z,p,q,r,lowB, highB, step, rstep, fnom, fn, color){
      super(x,y,z,p,q,r);
      
      this.pnt = {
         x: [],
         y: []
      };
      
      this.lowB = lowB;
      this.highB = highB;
      this.step = step;
      this.rStep = rstep;
      this.nom = fnom;
      this.fn = fn;
      this.color = color;
      // this.compileFn(xset,yset);
   }
   parseFn(fn){
      try{
         let xLowerBound = this.lowB;
         let xUpperBound = this.highB;
         let stepIndex = this.step;
         nerdamer.setFunction(this.nom, ['x'], this.fn + ' ');
         let xIncomplete = true;
         for(let i = xLowerBound; i < xUpperBound; i += stepIndex){
            let j = i;
            j = i == 0 ? 0.00001 : i;
            this.pnt.x.push(j);
            let y = nerdamer(this.nom + '(' + j + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            this.pnt.y.push(Number(y));
            if(i == xUpperBound) xIncomplete = false;
         }
         if(xIncomplete){
            let y = nerdamer(this.nom + '(' + xUpperBound + ')').evaluate().text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            this.pnt.x.push(xUpperBound);
            this.pnt.y.push(Number(y));
         }
      }catch(err){
         alert(err);
         plog(err);
      }
   }
   compileFn(){
      let xset = this.pnt.x;
      let yset = this.pnt.y;
      let tStep = this.rStep;
      let tCnt = 0;
      let rotatedFaces = [];
      let noms = [];
      // let tpos = [2 * Math.PI, 1.5 * Math.PI, Math.PI, 0.5 * Math.PI];
      for(let i = 0; i < 2 * Math.PI; i += tStep){
         rotatedFaces.push([]);
         noms.push([]);
         tCnt++;
      }
      
      for(let x = 0; x < xset.length; x++){
         for(let t = 0; t < rotatedFaces.length; t++){
            let nom = x + '#' + performance.now().toFixed(16) + t;
            noms[t].push(nom);
            rotatedFaces[t].push(this.createVertex(nom, xset[x], yset[x], 0));
         }
      }
      
      for(let i = 0; i < noms.length; i++){
         noms[i].forEach(v => this.vtx[v].r += (i * tStep));
      }
      
      for(let i = 0; i < rotatedFaces[0].length - 1; i++){
         for(let t = 0; t < rotatedFaces.length; t++){
            if(t < rotatedFaces.length - 1){
               this.createFace([noms[t][i], noms[t][i + 1], noms[t + 1][i + 1], noms[t + 1][i]], this.color);
            }else{
               this.createFace([noms[t][i], noms[t][i + 1], noms[0][i + 1], noms[0][i]], this.color);
            }
         }
      }
   }
}