class Model{
   constructor(x, y, z, p, q, r){
      this.c = new Center(x, y, z, p, q, r);
      
      this.faces = [];
      this.vtx = {};
      
      this.build();
      this.initialize();
   }
   get vertices(){ return this.vtx; }
   set vertices(v) { this.vtx = v; return this.vtx; }
   build(){
      // This will be defined in the prototype declaration for 
      // unique model bases extending off of this class
      return true;
   }
   initialize(){
      __renderObjects.push(this);
   }
   queueRender(){
      this.input();
      
      __renderFaces.push(...this.faces);
   }
   render(){
      this.input();
      
      this.faces.sort((a, b) => (a.renderBias) - (b.renderBias));
      this.faces.forEach(f => f.render((this.faces.length - this.faces.indexOf(f)) / (3 * this.faces.length)));
   }
   input(){
      if(keyActive('KeyQ')){ this.c.autospin = false; this.c.x -= (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyW')){ this.c.autospin = false; this.c.x += (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyA')){ this.c.autospin = false; this.c.q -= (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyS')){ this.c.autospin = false; this.c.q += (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyZ')){ this.c.autospin = false; this.c.p -= (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyX')){ this.c.autospin = false; this.c.p += (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyE')){ this.c.autospin = false; this.c.z -= (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyD')){ this.c.autospin = false; this.c.z += (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyR')){ this.c.autospin = false; this.c.y += (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyF')){ this.c.autospin = false; this.c.y -= (1) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyT')){ this.c.autospin = false; this.c.r -= (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('KeyG')){ this.c.autospin = false; this.c.r += (Math.PI / 333) * (60 / fps) * (movementScalar); }
      if(keyActive('Space')) this.c.autospin = false;
      if(keyActive('KeyC') && keyActive('KeyV')) this.c.autospin = true;
      
      if(this.c.autospin){
         // this.c.x += (0.0025 * Math.sin(__frame / 40)) * (60 / fps) * (movementScalar);
         // this.c.y -= (0.0025 * Math.sin(performance.now() / (60000 * 40))) * (60 / fps) * (movementScalar);
         // this.c.z += (0.005 * Math.cos(__frame / 40)) * (60 / fps) * (movementScalar);
         this.c.p += (Math.PI / 1000) * (60 / fps) * (movementScalar);
         this.c.q += (Math.PI / 1000) * (60 / fps) * (movementScalar);
         this.c.r += (Math.PI / 1000) * (60 / fps) * (movementScalar);
      }
   }
   createVertex(name, x, y, z, c = this.c){
      let out = new Vertex(x, y, z, c);
      out.assignedName = name;
      this.assignVertex(out, name);
      return out;
   }
   assignVertex(v, n){
      this.vtx[n] = v;
      return v;
   }
   createFace(v, color, c = this.c){
      let vFlush = Array.from(v, name => this.vtx[name]);
      let out = new Face(vFlush, c, color)
      this.faces.push(out);
      return out;
   }
}