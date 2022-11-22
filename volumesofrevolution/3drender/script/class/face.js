class Face{
   constructor(vertices, center, color){
      this.vtx = vertices;
      this.color = color;
      this.c = center;
      
      center.faces.push(this);
      
      // this.initialize();
   }
   get clr(){ return this.color; }
   set clr(c) { this.color = c; return this.color; }
   shade(sources){      // Calculate shading from light sources
      // sources = [{color: ~~~, position: [~~~], ...]
      
   }
   render(shade){ if(shade == null) shade = 0;
      let ind = this.c.faces.indexOf(this);
      
      this.vtx.forEach(v => v.posit());
                 
      if(this.renderBias < 0 || this.renderBias == NaN) return false;
      
      ctx.beginPath();
      let vtx0 = this.vtx[0];
      ctx.moveTo(vtx0.x * vtx0.d, vtx0.y * vtx0.d);
      this.vtx.forEach(v => {
         ctx.lineTo(v.x * v.d, v.y * v.d);
         v.lockPosit = false;
      });
      ctx.closePath();
      ctx.lineWidth = 0.05
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,' + ((2.5 * shade ** 2) + (0.005 * (D / this.renderBias))) + ')'
      ctx.strokeStyle = 'rgba(0,0,0,' + ((5 * shade ** 2) + (0.005 * (D / this.renderBias))) + ')';
      ctx.fill();
      ctx.stroke();
   }
   legacyRender(shade){      
      if(shade == null) shade = 0;
      // ctx.clearRect(-0.5 * cvs.width, -0.5 * cvs.height, cvs.width, cvs.height);
      let ind = this.c.faces.indexOf(this);
      // log('Face_' + ind + ' clr:' + this.color + ' bias:' + this.renderBias.toFixed(2));
      
      this.vtx.forEach(v => v.posit());
      // this.vtx.forEach(v => log((v.c.p).toFixed(2) + ', ' + (v.c.q).toFixed(2) + ', ' + (v.c.r).toFixed(2)));
      
      // if(this.renderBias > __cameraThreshold || this.renderBias < 0){
      // if(this.renderBias / (0.5 * D) >= 0.5 || this.renderBias < 0){
      // if(this.renderBias < 0 || this.renderBias >= (D - __cameraThreshold) || this.renderBias == NaN) return false;
      if(this.renderBias < 0 || this.renderBias == NaN) return false;
      // if(this.renderBias > 100) log(this.renderBias);
      
      ctx.beginPath();
      let vtx0 = this.vtx[0];
      // vtx0.posit();
      ctx.moveTo(vtx0.x * vtx0.d, vtx0.y * vtx0.d);
      this.vtx.forEach(v => {
         // v.posit();
         ctx.lineTo(v.x * v.d, v.y * v.d);
         v.lockPosit = false;
      });
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      // ctx.strokeStyle = 'black';
      // ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      // ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      // let shade = this.c.faces.indexOf(this) / this.c.faces.length;
      // ctx.fillStyle = 'rgba(0,0,0,' + (1.5 * shade) + ')';
      ctx.fillStyle = 'rgba(0,0,0,' + ((1.5 * shade) + (0.005 * (D / this.renderBias))) + ')';
      // ctx.strokeStyle = 'rgba(0,0,0,' + (1.5 * shade) + ')';
      ctx.strokeStyle = 'rgba(0,0,0,' + ((1.5 * shade) + (0.005 * (D / this.renderBias))) + ')';
      ctx.fill();
      ctx.stroke();
   }
   get renderBias(){
      let bias = this.vtx.reduce((b, v) => {
         if(typeof v.d != 'number') log(v.x + ' | ' + v.d);
         return b + v.d
      }, 0) / this.vtx.length;
      if(!this.vtx.every(v => v.d > 0)) return -1;
      // if(bias == NaN){ return 0; }
      // log(bias);
      return bias
   }
   initialize(){
      // Yeah kinda useless right now
      // May be useful for other stuff in future,
      // that's the only reason it's here
      __renderObjects.push(this);
   }
}
