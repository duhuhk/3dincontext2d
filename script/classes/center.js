class Center{
   constructor(x, y, z, h, v){
      this.x = x;
      this.y = y;
      this.z = z;
      this.CORE_VALUES = {
         h: h,
         v: v
      };
   }
   get dAvg(){
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
   }
   get h(){
      return this.CORE_VALUES.h;
   }
   get v(){
      return this.CORE_VALUES.v;
   }
   set h(newh){
      this.CORE_VALUES.h = newh % (2 * Math.PI);
      while(this.CORE_VALUES.h < 0){
         this.CORE_VALUES.h += (2 * Math.PI);
      }
   }
   set v(newv){
      this.CORE_VALUES.v = newv % (2 * Math.PI);
      while(this.CORE_VALUES.v < 0){
         this.CORE_VALUES.v += (2 * Math.PI);
      }
   }
}