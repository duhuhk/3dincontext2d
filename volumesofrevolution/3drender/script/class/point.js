const __deadPoint = {x:0,y:0,z:0,p:0,q:0,r:0,position:[[0,0,0],[0,0,0]],vertices:[],faces:[],autospin:false};

class Point{
   constructor(x = 0, y = 0, z = 0, p = 0, q = 0, r = 0, i = 1, j = 1, k = 1){
      this.position = [
         [x, y, z],
         [p, q, r],
         [i, j, k],
         [1, 1, 1],
      ];
      if(z === 0) this.position[0][2] = 0.00000000001;
      /*
      p: rotation around z (radians)
      q: rotation around y (radians)
      r: rotation around x (radians)
      i: x rotational scalar
      j: y rotational scalar
      k: z rotational scalar
      */
      this.renderBias = 0;
   }
   
   // Get-/setters for positional data
   get x(){
      return this.position[0][0];
   }
   set x(n){
      this.position[0][0] = n;
      return this.x;
   }
   get y(){
      return this.position[0][1];
   }
   set y(n){
      this.position[0][1] = n;
      return this.y;
   }
   get z(){
      return this.position[0][2];
   }
   set z(n){
      this.position[0][2] = n;
      return this.z;
   }
   get p(){
      return this.position[1][0];
   }
   set p(n){
      this.position[1][0] = n % (2 * Math.PI);
      while(this.position[1][0] < 0){
         this.position[1][0] += 2 * Math.PI;
      }
      return this.p;
   }
   get q(){
      return this.position[1][1];
   }
   set q(n){
      this.position[1][1] = n % (2 * Math.PI);
      while(this.position[1][1] < 0){
         this.position[1][1] += 2 * Math.PI;
      }
      return this.q;
   }
   get r(){
      return this.position[1][2];
   }
   set r(n){
      this.position[1][2] = n % (2 * Math.PI);
      while(this.position[1][2] < 0){
         this.position[1][2] += 2 * Math.PI;
      }
      return this.r;
   }
   get i(){
      return this.position[2][0];
   }
   set i(n){
      this.position[2][0] = n;
      return this.i;
   }
   get j(){
      return this.position[2][1];
   }
   set j(n){
      this.position[2][1] = n;
      return this.j;
   }
   get k(){
      return this.position[2][2];
   }
   set k(n){
      this.position[2][2] = n;
      return this.k;
   }
   
   // Movement functions
   translate(shift){
      this.position[0][0] += shift[0];
      this.position[0][1] += shift[1];
      this.position[0][2] += shift[2];
   }
   rotate(shift){
      this.position[1][0] += shift[0];
      this.position[1][1] += shift[1];
      this.position[1][2] += shift[2];
   }
   transform(shift){
      this.position[0][0] += shift[0][0];
      this.position[0][1] += shift[0][1];
      this.position[0][2] += shift[0][2];
      this.position[1][0] += shift[1][0];
      this.position[1][1] += shift[1][1];
      this.position[1][2] += shift[1][2];
      this.position[2][0] += shift[2][0];
      this.position[2][1] += shift[2][1];
      this.position[2][2] += shift[2][2];
   }
   
   // Depth multiplier (for converting 3D to 2D)
   get d(){
      // if(this.z === 0) return D / (D - 0.001);
      let out = D / (D - this.z);
      // if(out >= __cameraThreshold) return NaN;
      if(out == NaN) out = 1;
      return out;
   }
   set d(n){
      /*
      n = D / (D + this.z);
      (this.z + D)n = D
      this.z + D = D / n
      this.z = (D / n) - D
      */
      this.z = (D / n) - D;
      return this.z;
   }
   // Show matrix
   render(){
      let ln0 = '.--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--.';
      let ln1 = '| &nbsp' + padStr(padStr(this.x.toFixed(2), 6), 7, '&nbsp;') + '&nbsp; ' + padStr(padStr(this.y.toFixed(2), 6), 7, '&nbsp;') + '&nbsp; ' + padStr(padStr(this.z.toFixed(2), 6), 7, '&nbsp;') + '&nbsp |';
      let ln2 = '| &nbsp' + padStr(padStr((this.p / Math.PI).toFixed(2), 5), 6, '&nbsp;') + 'π&nbsp; ' + padStr(padStr((this.q / Math.PI).toFixed(2), 5), 6, '&nbsp;') + 'π&nbsp; ' + padStr(padStr((this.r / Math.PI).toFixed(2), 5), 6, '&nbsp;') + 'π&nbsp |';
      let ln3 = '| &nbsp ' + padStr(padStr(this.i.toFixed(2), 5), 6, '&nbsp;') + ' &nbsp; ' + padStr(padStr(this.j.toFixed(2), 5), 6, '&nbsp;') + ' &nbsp; ' + padStr(padStr(this.k.toFixed(2), 5), 6, '&nbsp;') + '&nbsp |';
      let ln4 = '\'--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--\'';
      log(ln0);
      log(ln1);
      log(ln2);
      log(ln3);
      log(ln4);
   }
}