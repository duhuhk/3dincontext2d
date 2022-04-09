class Ball{
   constructor(x, y, z, r, h, v){
      this.x = x;
      this.y = y;
      this.z = z;
      this.r = r;
      this.t = {
         h: h,
         v: v
      };
      
      this.c = new Center(x, y, z, h, v);
      
      this.faces = [];
   }
   initialize(){
      let pi = Math.PI;
      let tHal = 1 / 2;
      let tThi = 1 / 3;
      let tFou = 1 / 4;
      let tSix = 1 / 6;
      
      let faceColor = 'rgb(180, 130, 100)';
      // faceColor = errTxrStr;
      let faceShade = [20, 20, 20];
      
      let AAA = new Vertex(this.c, this.r, 0, tHal * pi * -1);
      let AAB = new Vertex(this.c, this.r, 0, tHal * pi);
      
      let topRow = [];
      let botRow = [];
      
      let hRowInt192 = [   // For 192 polys
         0,tSix*pi,tFou*pi,tThi*pi,tHal*pi,tThi*pi*2,tFou*pi*3,tSix*pi*5,pi,
         tSix*pi*5*-1,tFou*pi*3*-1,tThi*pi*2*-1,tHal*pi*-1,tThi*pi*-1,tFou*pi*-1,tSix*pi*-1
      ];
      let hRowInt288 = [   // For 288 polys
         0,tSix*pi*0.5,tSix*pi,tFou*pi,tThi*pi,tSix*pi*(5/2),tHal*pi,tSix*pi*(7/2),tThi*pi*2,tFou*pi*3,tSix*pi*5,tSix*pi*(11/2),pi,
         tSix*pi*(-11/2),tSix*pi*-5,tFou*pi*-3,tThi*pi*-2,tSix*pi*(-7/2),tHal*pi*-1,tSix*pi*(-5/2),tThi*pi*-1,tFou*pi*-1,tSix*pi*-1,tSix*pi*-0.5
      ];
      
      let hRowInt = hRowInt288;
      
      let vRowInt = [tSix*pi*(-5/2),tThi*pi*-1,tFou*pi*-1,tSix*pi*-1,tSix*pi*-0.5,0,tSix*pi*0.5,tSix*pi,tFou*pi,tThi*pi,tSix*pi*(5/2)];
      
      let vertices = [];
      
      for(let i = 0; i < hRowInt.length; i++){
         topRow.push(new Vertex(this.c, this.r, hRowInt[i], tSix * pi * -5 / 2));
      }
      
      vertices.push(topRow);
      
      for(let i = 1; i < vRowInt.length - 1; i++){
         let thisRow = [];
         for(let j = 0; j < hRowInt.length; j++){
            thisRow.push(new Vertex(this.c, this.r, hRowInt[j], vRowInt[i]));
         }
         vertices.push(thisRow);
      }
      
      for(let i = 0; i < hRowInt.length; i++){
         botRow.push(new Vertex(this.c, this.r, hRowInt[i], tSix * pi * 5 / 2));
      }
      
      vertices.push(botRow);
      
      for(let i = 0; i < topRow.length; i++){
         let j = i + 1 == topRow.length ? 0 : i + 1;
         this.faces.push(new LegacyFace([AAA, topRow[i], topRow[j]], this.c, faceColor, faceShade));
      }
      getErrTexture();
      
      for(let i = 0; i < vertices.length - 1; i++){
         for(let j = 0; j < vertices[i].length; j++){
            let ya = (i + 1) % vertices.length;
            let xa = j;
            let yb = i;
            let xb = (j + 1) % vertices[yb].length;
            let yc = (i + 1) % vertices.length;
            let xc = (j - 1 + vertices[yc].length) % vertices[yc].length;
            
            // More faces, horrible performance, same result
            // just looks ever so slightly cooler
            // this.faces.push(new LegacyFace([vertices[i][j], vertices[ya][xa], vertices[yb][xb]], this.c, faceColor, faceShade));
            // this.faces.push(new LegacyFace([vertices[i][j], vertices[ya][xa], vertices[yc][xc]], this.c, faceColor, faceShade));
            
            this.faces.push(new LegacyFace([vertices[i][j], vertices[ya][xa], vertices[ya][xb], vertices[yb][xb]], this.c, faceColor, faceShade));
            // hecto-enneaconta-di-hedron myeeeh myeeeh
         }
         getErrTexture();
      }
      
      for(let i = 0; i < botRow.length; i++){
         let j = i + 1 == botRow.length ? 0 : i + 1;
         this.faces.push(new LegacyFace([AAB, botRow[i], botRow[j]], this.c, faceColor, faceShade));
      }
      
      /*
      let A = new Vertex(this.c, r, -3 * Math.PI / 4, -1 * Math.PI / 5);
      this.faces.push(new LegacyFace([A, B, D, C], this.c, 'rgb(255,0,0)', faceShade));
      */
      
      renderLoopEntities.push(this);
   }
   handleInput(){
      if(getInput('ArrowLeft')){
         this.x -= 1 * fps.dt;
         this.c.x -= 1 * fps.dt;
      }
      if(getInput('ArrowRight')){
         this.x += 1 * fps.dt;
         this.c.x += 1 * fps.dt;
      }
      if(getInput('ArrowUp')){
         this.y -= 1 * fps.dt;
         this.c.y -= 1 * fps.dt;
      }
      if(getInput('ArrowDown')){
         this.y += 1 * fps.dt;
         this.c.y += 1 * fps.dt;
      }
      if(getInput('Period')){
         this.t.h += 1 * fps.dt / (10 * Math.PI);
         this.t.h %= 2 * Math.PI;
         this.t.h < 0 ? this.t.h += 2 * Math.PI : null;
         this.c.h = this.t.h;
      }
      if(getInput('Comma')){
         this.t.h -= 1 * fps.dt / (10 * Math.PI);
         this.t.h %= 2 * Math.PI;
         this.t.h < 0 ? this.t.h += 2 * Math.PI : null;
         this.c.h = this.t.h;
      }
      if(getInput('KeyS')){
         this.z += 1 * fps.dt;
         this.c.z += 1 * fps.dt;
      }
      if(getInput('KeyW')){
         this.z -= 1 * fps.dt;
         this.c.z -= 1 * fps.dt;
      }
      if(getInput('KeyA')){
         this.t.h -= 1 * fps.dt / (5 * Math.PI);
         this.t.h %= 2 * Math.PI;
         this.t.h < 0 ? this.t.h += 2 * Math.PI : null;
         this.c.h = this.t.h;
         this.x -= 1 * fps.dt;
         this.c.x -= 1 * fps.dt;
      }
      if(getInput('KeyD')){
         this.t.h += 1 / (5 * Math.PI);
         this.t.h %= 2 * Math.PI;
         this.t.h < 0 ? this.t.h += 2 * Math.PI : null;
         this.c.h = this.t.h;
         this.x += 1 * fps.dt;
         this.c.x += 1 * fps.dt;
      }
      
      if(getInput('BracketLeft')){
         this.c.v -= 1 * fps.dt / (Math.PI * 20);
      }
      if(getInput('BracketRight')){
         this.c.v += 1 * fps.dt / (Math.PI * 20);
      }
   }
   queueRender(){
      this.handleInput();
      
      this.faces.forEach(f => renderLoopEntityFaces.push(f));
   }
   render(){
      this.handleInput();
      
      this.faces.sort((a, b) => (b.renderBias) - (a.renderBias));
      // this.faces.sort((a, b) => (b.renderBias) - (a.renderBias));
      this.faces.forEach(f => f != null ? f.render(0b00, true, (this.faces.length - this.faces.indexOf(f)) / this.faces.length * 20) : null);
      log((this.c.v / Math.PI).toFixed(2) + 'π');
   }
}