class Vertex{
   constructor(center, radius, horizontalAngle, verticalAngle){
      this.c = center;
      this.r = radius;
      /*
      this.x = center.x;
      this.y = center.y;
      this.z = center.z;
      */
      this.CORE_VALUES = {
         x: 0,
         y: 0,
         z: 0
      };
      this.h = horizontalAngle;
      this.v = verticalAngle;
      
      this.dAvg = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
      
      // this.x = this.r * Math.cos(this.v) * Math.cos(this.h - this.c.h);
      // this.y = this.r * Math.sin(this.v);
      // this.z = this.r * Math.cos(this.v) * Math.sin(this.h - this.c.h);
   }
   get x(){
      this.CORE_VALUES.x = this.r * Math.cos(this.v - this.c.v) * Math.cos(this.h - this.c.h);
      return this.CORE_VALUES.x + this.c.x;
      // this.CORE_VALUES.x = (this.r + this.c.x) * Math.cos(this.v - this.c.v) * Math.cos(this.h - this.c.h);
      // return this.CORE_VALUES.x;
   }
   get y(){
      // if(Math.random() < 0.1 && Math.random() < 0.5) log(this.CORE_VALUES.y + this.c.y - this.CORE_VALUES.z);
      this.CORE_VALUES.y = this.r * Math.sin(this.v - this.c.v);
      // return this.CORE_VALUES.y + this.c.y - (this.CORE_VALUES.z * Math.sin(this.v - this.c.v));
      return this.CORE_VALUES.y + this.c.y;
      // return this.CORE_VALUES.y + this.c.y;
      // this.CORE_VALUES.y = (this.r + this.c.y) * Math.sin(this.v - this.c.v);
      // return this.CORE_VALUES.y - (this.CORE_VALUES.z * Math.sin(this.v - this.c.v));
   }
   get z(){
      this.CORE_VALUES.z = (this.r * Math.cos(this.v - this.c.v) * Math.sin(this.h - this.c.h));
      // return this.CORE_VALUES.z + this.c.z - (this.CORE_VALUES.y * Math.cos(this.v - this.c.v));
      return this.CORE_VALUES.z + this.c.z;
      // return this.CORE_VALUES.z + this.c.z;
      // this.CORE_VALUES.z = ((this.r + this.c.z) * Math.cos(this.v - this.c.v) * Math.sin(this.h - this.c.h));
      // return this.CORE_VALUES.z - (this.CORE_VALUES.y * Math.cos(this.v - this.c.v));
   }
   set x(newx){
      this.CORE_VALUES.x = newx;
   }
   set y(newy){
      this.CORE_VALUES.y = newy;
   }
   set z(newz){
      this.CORE_VALUES.z = newz;
   }
   makeFace(){
      [...arguments].forEach(arr => arr.vtx.push(this));
   }
}