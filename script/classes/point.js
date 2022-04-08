class Point{
   constructor(x, y, z, xy, xz, yz){
      this.x = x;
      this.y = y;
      this.z = z;
      this.theta = {
         get xy(){
            return this.CORE_VAL.xy;
         },
         set xy(newxy){
            this.CORE_VAL.xy = newxy % (2 * Math.PI);
            if(this.CORE_VAL.xy < 0){
               while(this.CORE_VAL.xy < 0){
                  this.CORE_VAL.xy += 2 * Math.PI;
               }
            }
         },
         get xz(){
            return this.CORE_VAL.xz;
         },
         set xz(newxz){
            this.CORE_VAL.xz = newxz % (2 * Math.PI);
            if(this.CORE_VAL.xz < 0){
               while(this.CORE_VAL.xz < 0){
                  this.CORE_VAL.xz += 2 * Math.PI;
               }
            }
         },
         get yz(){
            return this.CORE_VAL.yz;
         },
         set yz(newyz){
            this.CORE_VAL.yz = newyz % (2 * Math.PI);
            if(this.CORE_VAL.yz < 0){
               while(this.CORE_VAL.yz < 0){
                  this.CORE_VAL.yz += 2 * Math.PI;
               }
            }
         },
         
         CORE_VAL: {
            xy: xy,
            xz: xz,
            yz: yz,
         },
      };
      this.t = this.theta;
   }
}