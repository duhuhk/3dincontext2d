class Center extends Point{
   constructor(x, y, z, p, q, r){
      super(x, y, z, p, q, r);
      
      this.vertices = [];
      this.faces = [];
      
      this.autospin = false;
   }
}