class Vertex extends Point{
   constructor(x, y, z, c){
      super(x, y, z, 0, 0, 0);
      
      this.c = c;
      c.vertices.push(this);
      
      // this.p = Math.atan2(y, x);
      // this.q = Math.atan2(z, x);
      // this.r = Math.atan2(y, z);
      
      this.lockPosit = false;    // Used to prevent double-positing the first vertex on face render
   }
   posit(){
      if(this.lockPosit) return false;
      let out = {
         x: 0, x_: 0, x__: 0, x___: 0,
         y: 0, y_: 0, y__: 0, y___: 0,
         z: 0, z_: 0, z__: 0, z___: 0,
         p: 0, p_: 0, p__: 0, p___: 0,
         q: 0, q_: 0, q__: 0, q___: 0,
         r: 0, r_: 0, r__: 0, r___: 0,
      };
      out.x = this.position[0][0];
      out.y = this.position[0][1];
      out.z = this.position[0][2];
      
      out.p = this.c.p + this.position[1][0];
      out.q = this.c.q + this.position[1][1];
      out.r = this.c.r + this.position[1][2];
      
      let p = this.position[1][0];
      let q = this.position[1][1];
      let r = this.position[1][2];
      
      /*
      roll: x r
      pitch: y q
      yaw: z p
      */
      
      let ps = Math.sin(this.c.p + p);
      let pc = Math.cos(this.c.p + p);
      let qs = Math.sin(this.c.q + q);
      let qc = Math.cos(this.c.q + q);
      let rs = Math.sin(this.c.r + r);
      let rc = Math.cos(this.c.r + r);
      
      let cosa = pc;
      let sina = ps;
      let cosb = qc;
      let sinb = qs;
      let cosc = rc;
      let sinc = rs;
      
      var Axx = cosa*cosb;
      var Axy = cosa*sinb*sinc - sina*cosc;
      var Axz = cosa*sinb*cosc + sina*sinc;
   
      var Ayx = sina*cosb;
      var Ayy = sina*sinb*sinc + cosa*cosc;
      var Ayz = sina*sinb*cosc - cosa*sinc;
   
      var Azx = -sinb;
      var Azy = cosb*sinc;
      var Azz = cosb*cosc;
      
      let px = this.position[0][0];
      let py = this.position[0][1];
      let pz = this.position[0][2];
      
      this.position[2][0] = (Axx*px + Axy*py + Axz*pz) / this.position[0][0];
      this.position[2][1] = (Ayx*px + Ayy*py + Ayz*pz) / this.position[0][1];
      this.position[2][2] = (Azx*px + Azy*py + Azz*pz) / this.position[0][2];
      
      /*
      // Rotate about Z
      out.x_ = (out.x * Math.cos(this.c.p + p)) - (out.y * Math.sin(this.c.p + p));
      out.y_ = (out.x * Math.sin(this.c.p + p)) + (out.y * Math.cos(this.c.p + p));
      out.z_ = out.z;
      
      // Rotate about Y
      out.x__ = (out.z_ * Math.sin(this.c.q + q)) + (out.x_ * Math.cos(this.c.q + q));
      out.y__ = out.y_;
      out.z__ = (out.z_ * Math.cos(this.c.q + q)) - (out.x_ * Math.sin(this.c.q + q));
      
      // Rotate about X
      out.x___ = out.x__;
      out.y___ = (out.y__ * Math.cos(this.c.r + r)) - (out.z__ * Math.sin(this.c.r + r));
      out.z___ = (out.y__ * Math.sin(this.c.r + r)) + (out.z__ * Math.cos(this.c.r + r));
      
      // Add to position matrix
      this.position[2][0] = out.x___ / this.position[0][0];
      this.position[2][1] = out.y___ / this.position[0][1];
      this.position[2][2] = out.z___ / this.position[0][2];
      */
      
      // Lock posit
      this.lockPosit = true;
      // log('VTX ' + this.c.vertices.indexOf(this) + ' | ' + this.d.toFixed(2));
   }
   get x(){
      let x = this.position[0][0];
      let i = this.position[2][0];
      
      let out = (x * i) + this.c.x;
      return out;
   }
   get y(){
      let y = this.position[0][1];
      let j = this.position[2][1];
      
      let out = (y * j * this.position[3][1]) + this.c.y;
      return out;
   }
   get z(){
      let z = this.position[0][2];
      let k = this.position[2][2];
      
      let out = (z * k * this.position[3][2]) + this.c.z;
      return out;
   }
}