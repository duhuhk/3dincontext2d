class Block{
   constructor(x, y, z, w, h, l, hori, vert){
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      this.h = h;
      this.l = l;
      this.t = {
         /*CORE_VALUE:{
            horizontal: hori,
            vertical: vert
         },*/
         h: hori,
         v: vert
      };
      
      this.c = new Center(x, y, z, hori, vert);
      
      this.faces = [];
   }
   initialize(){
      let r = Math.pow(Math.pow(this.w / 2, 2) + Math.pow(this.h / 2, 2) + Math.pow(this.l / 2, 2), 1 / 3);
      
      let FTL = new Vertex(this.c, r, -3 * Math.PI / 4, -1 * Math.PI / 5);    // A
      let A = FTL;
      let FTR = new Vertex(this.c, r, -1 * Math.PI / 4, -1 * Math.PI / 5);    // B
      let B = FTR;
      let FML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), -3 * Math.PI / 4, 0);
      let FMM = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), -1 * Math.PI / 2, 0);
      let FMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), -1 * Math.PI / 4, 0);
      let FBL = new Vertex(this.c, r, -3 * Math.PI / 4, Math.PI / 5);         // C
      let C = FBL;
      let FBR = new Vertex(this.c, r, -1 * Math.PI / 4, Math.PI / 5);         // D
      let D = FBR;
      let MML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), 0, 0);
      let MMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI, 0);
      let BTL = new Vertex(this.c, r, 3 * Math.PI / 4, -1 * Math.PI / 5);     // E
      let E = BTL;
      let BTR = new Vertex(this.c, r, 1 * Math.PI / 4, -1 * Math.PI / 5);     // F
      let F = BTR;
      let BML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), 3 * Math.PI / 4, 0);
      let BMM = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI / 2, 0);
      let BMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI / 4, 0);
      let BBL = new Vertex(this.c, r, 3 * Math.PI / 4, Math.PI / 5);          // G
      let G = BBL;
      let BBR = new Vertex(this.c, r, 1 * Math.PI / 4, Math.PI / 5);          // H
      let H = BBR;
      
      let I = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), 0, 0);
      let J = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI / 2, 0);
      let K = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), -Math.PI / 2, 0);
      
      // let ltm = new Vertex(this.c, r * Math.cos(-0.8 * Math.PI / 4), Math.PI, -1.025 * Math.PI / 4);
      let lmm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI, 0);
      let lrm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), -3 * Math.PI / 4, 0);
      let llm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), 3 * Math.PI / 4, 0);
      
      /*// LEFT
      this.faces.push(new LegacyFace([FTL, FMM, FML], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([FTL, FMM, FML], this.c, 'rgb(215,215,215)'));*/
      
      // front
      this.faces.push(new LegacyFace([A, B, C], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([B, C, D], this.c, 'rgb(215,215,215)'));
      // top
      this.faces.push(new LegacyFace([A, B, E], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([B, E, F], this.c, 'rgb(215,215,215)'));
      // left
      this.faces.push(new LegacyFace([A, C, E], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([E, C, G], this.c, 'rgb(215,215,215)'));
      // bottom
      this.faces.push(new LegacyFace([C, D, G], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([D, G, H], this.c, 'rgb(215,215,215)'));
      // right
      this.faces.push(new LegacyFace([B, D, F], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([D, F, H], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([B, F, I], this.c, 'rgb(215,215,215)'));
      // back
      this.faces.push(new LegacyFace([E, F, G], this.c, 'rgb(215,215,215)'));
      this.faces.push(new LegacyFace([F, G, H], this.c, 'rgb(215,215,215)'));
      
      
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
         this.t.h += 1 * fps.dt / (5 * Math.PI);
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
      
      this.faces.sort((a, b) => (a.renderBias) - (b.renderBias));
      // this.faces.sort((a, b) => (b.renderBias) - (a.renderBias));
      this.faces.forEach(f => f != null ? f.render(0b11, true, (this.faces.length - this.faces.indexOf(f)) / this.faces.length) : null);
   }
}

class Tooth extends Block{
   constructor(x, y, z, w, h, l, hori, vert){
      super(x, y, z, w, h, l, hori, vert);
   }
   initialize(){
      let r = Math.pow(Math.pow(this.w / 2, 2) + Math.pow(this.h / 2, 2) + Math.pow(this.l / 2, 2), 1 / 3);
      
      let FTL = new Vertex(this.c, r, -3 * Math.PI / 4, -1 * Math.PI / 5);    // A
      let FTR = new Vertex(this.c, r, -1 * Math.PI / 4, -1 * Math.PI / 5);    // B
      let FML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), -3 * Math.PI / 4, 0);
      let FMM = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), -1 * Math.PI / 2, 0);
      let FMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), -1 * Math.PI / 4, 0);
      let FBL = new Vertex(this.c, r, -3 * Math.PI / 4, Math.PI / 5);         // C
      let FBR = new Vertex(this.c, r, -1 * Math.PI / 4, Math.PI / 5);         // D
      let MTM = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), 0, -Math.PI / 2);
      let MML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI, 0);
      let MMM = new Vertex(this.c, 0, 0, 0);
      let MMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), 0, 0);
      let BTL = new Vertex(this.c, r, 3 * Math.PI / 4, -1 * Math.PI / 5);     // E
      let BTR = new Vertex(this.c, r, 1 * Math.PI / 4, -1 * Math.PI / 5);     // F
      let BML = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), 3 * Math.PI / 4, 0);
      let BMM = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI / 2, 0);
      let BMR = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), Math.PI / 4, 0);
      let BBL = new Vertex(this.c, r, 3 * Math.PI / 4, Math.PI / 5);          // G
      let BBR = new Vertex(this.c, r, 1 * Math.PI / 4, Math.PI / 5);          // H
      
      // let ltm = new Vertex(this.c, r * Math.cos(-0.8 * Math.PI / 4), Math.PI, -1.025 * Math.PI / 4);
      let lmm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5) * Math.cos(-1 * Math.PI / 4), Math.PI, 0);
      let lrm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), -3 * Math.PI / 4, 0);
      let llm = new Vertex(this.c, r * Math.cos(-1 * Math.PI / 5), 3 * Math.PI / 4, 0);
      
      let faceColor = 'rgb(255,255,255)';
      let faceShade = [115,175,200];
      
      // FRONT
      this.faces.push(new LegacyFace([FTL, MML, FML], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([BTL, MML, BML], this.c, faceColor, faceShade));
      
      // RIGHT
      this.faces.push(new LegacyFace([FTR, MMR, FMR], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([BTR, MMR, BMR], this.c, faceColor, faceShade));
      
      // LEFT
      this.faces.push(new LegacyFace([FTL, FMM, FML], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([FTR, FMM, FMR], this.c, faceColor, faceShade));
      
      // RIGHT
      this.faces.push(new LegacyFace([BTL, BMM, BML], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([BTR, BMM, BMR], this.c, faceColor, faceShade));
      
      // TOP
      this.faces.push(new LegacyFace([FTL, MML, FMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([MTM, MML, FMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([BTL, MML, BMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([MTM, MML, BMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([FTR, MMR, FMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([MTM, MMR, FMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([BTR, MMR, BMM], this.c, faceColor, faceShade));
      this.faces.push(new LegacyFace([MTM, MMR, BMM], this.c, faceColor, faceShade));
      
      renderLoopEntities.push(this);
   }
}

class ColorBlock extends Block{
   constructor(x, y, z, w, h, l, hori, vert){
      super(x, y, z, w, h, l, hori, vert);
   }
   initialize(){
      let r = Math.pow(Math.pow(this.w / 2, 2) + Math.pow(this.h / 2, 2) + Math.pow(this.l / 2, 2), 1 / 3);
      
      let A = new Vertex(this.c, r, -3 * Math.PI / 4, -1 * Math.PI / 5);
      let B = new Vertex(this.c, r, -1 * Math.PI / 4, -1 * Math.PI / 5);
      let C = new Vertex(this.c, r, -3 * Math.PI / 4, Math.PI / 5);
      let D = new Vertex(this.c, r, -1 * Math.PI / 4, Math.PI / 5);
      let E = new Vertex(this.c, r, 3 * Math.PI / 4, -1 * Math.PI / 5);
      let F = new Vertex(this.c, r, 1 * Math.PI / 4, -1 * Math.PI / 5);
      let G = new Vertex(this.c, r, 3 * Math.PI / 4, Math.PI / 5);
      let H = new Vertex(this.c, r, 1 * Math.PI / 4, Math.PI / 5);
      
      let faceShade = [150,150,150];
      
      // front
      this.faces.push(new LegacyFace([A, B, D, C], this.c, 'rgb(255,0,0)', faceShade));
      // top
      this.faces.push(new LegacyFace([A, B, F, E], this.c, 'rgb(0,0,255)', faceShade));
      // left
      this.faces.push(new LegacyFace([A, C, G, E], this.c, 'rgb(0,255,0)', faceShade));
      // bottom
      this.faces.push(new LegacyFace([C, D, H, G], this.c, 'rgb(0,0,255)', faceShade));
      // right
      this.faces.push(new LegacyFace([B, D, H, F], this.c, 'rgb(0,255,0)', faceShade));
      // back
      this.faces.push(new LegacyFace([E, F, H, G], this.c, 'rgb(255,0,0)', faceShade));
      
      renderLoopEntities.push(this);
   }
}