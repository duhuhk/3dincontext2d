class Face{
   constructor(vertices, center, color, shadow){
      this.vtx = [...vertices];
      this.c = center;
      this.clr = typeof color == 'string' ? color[0] == '#' ? hexToRGB(color) : strToRGB(color) : Array.isArray(color) ? color : getErrTexture();
      this.shadow = shadow;
      
      this.update();
   }
   processColorArgument(color){
      // Maybe use this to replace the this.clr definer in constructor. But maybe not.
   }
   get renderable(){
      return (d + this.zAvg > cameraProximityThreshold);
   }
   updatePositionAbsolute(){
      this.xAvg = this.vtx.reduce((s, v) => s + v.x, 0) / this.vtx.length;
      this.yAvg = this.vtx.reduce((s, v) => s + v.y, 0) / this.vtx.length;
      this.zAvg = this.vtx.reduce((s, v) => s + v.z, 0) / this.vtx.length;
      this.dAvg = Math.sqrt(Math.pow(this.xAvg, 2) + Math.pow(this.yAvg, 2) + Math.pow(this.zAvg, 2));
      this.hAvg = this.vtx.reduce((s, v) => s + v.h, 0) / this.vtx.length;
      this.vAvg = this.vtx.reduce((s, v) => s + v.v, 0) / this.vtx.length;
      this.lightLengthAvg = this.vtx.reduce((s, v) => s + (d / (d + v.z))) / this.vtx.length;
      let cdz = Math.pow(this.c.z - this.zAvg, 2);
      let cdx = Math.pow(this.c.x - this.xAvg, 2);
      let cdy = Math.pow(this.c.y - this.yAvg, 2);
      this.cdAvg = Math.sqrt(cdx + cdy + cdz);
      this.zFactor = (d / (d + this.zAvg));
      this.renderBias = this.zFactor;
   }
   update(){
      this.updatePositionAbsolute();
   }
   blendShaders(){
      let clr = [...arguments];
      // R = ((1 - a) * bg.r) + (a * shade.r)
      let out = [clr[0][0],clr[0][1],clr[0][2]];
      for(let i = 1; i < clr.length; i++){
         out[0] = ((1 - clr[i][3]) * out[0]) + (clr[i][3] * clr[i][0]);
         out[1] = ((1 - clr[i][3]) * out[1]) + (clr[i][3] * clr[i][1]);
         out[2] = ((1 - clr[i][3]) * out[2]) + (clr[i][3] * clr[i][2]);
      }
      return out;
   }
   render(){
      
      // Experimental -- for testing shading
      let clr = this.blendShaders(this.clr, [30,30,30,0.5]);
      ctx.fillStyle = `rgb(${clr[0]},${clr[1]},${clr[2]})`;
      ctx.fillRect(0,0,50,50);
      ctx.fillStyle = `rgb(${this.clr[0]},${this.clr[1]},${this.clr[2]})`;
      ctx.fillRect(50,0,50,50);
      ctx.fillStyle = 'rgba(30,30,30,0.5)';
      ctx.fillRect(50,0,50,50);
      ctx.fillStyle = `rgb(${this.clr[0]},${this.clr[1]},${this.clr[2]})`;
      ctx.fillRect(100,0,50,50);
      
      
      this.updatePositionAbsolute();
      
   }
}


let testface = new Face([new Vertex({x: 0, y: 0, z: 100, v: 0, h: 0}, 50, 0, 0), new Vertex({x: 0, y: 0, z: 100, v: 0, h: 0}, 50, Math.PI / 2, 0), new Vertex({x: 0, y: 0, z: 100, v: 0, h: 0}, 50, 5 * Math.PI / 3, Math.PI / 3)], {x: 0, y: 0, z: 100, v: 0, h: 0}, 'hello');
ctx.translate(240, 135);
testface.render();
ctx.setTransform(1, 0, 0, 1, 0, 0);


// ====================================================================

class LegacyFace{
   constructor(vertices, center, color, shadow){
      this.vtx = [...vertices];
      this.c = center;
      this.clr = color;
      this.shadow = shadow;
      
      this.updatePositionAbsolute();
      
      this.isRenderable = (d + this.zAvg > cameraProximityThreshold);
   }
   render(border, shade, depthShade = false){
      
      // ONLY FILL ONCE, COMPILE SHADERS ON USING LAYERED ALPHAS
      
      this.updatePositionAbsolute();
      
      this.isRenderable = (d + this.zAvg > cameraProximityThreshold);
      
      let renderBorder = true;
      let borderColor = null;
      switch(border){
         case 0b00:
            renderBorder = false;
            break;
         case 0b01:
            borderColor = 'black';
            break;
         case 0b10:
            borderColor = 'rgba(0,0,0,0.005)';
            break;
         case 0b11:
            borderColor = this.clr;
            break;
      }
      let selfShadow = this.shadow ? true : false;
      let renderShade = shade ? true : false;
      let shadeColor = renderShade ? shade !== true ? [...shade] : selfShadow ? this.shadow : [30,30,30] : null;
      
      // Draw to core
      /*
      if(this.isRenderable){
         ctx.strokeStyle = 'rgb(255,255,0)';
         // for(let v = 0; v < this.vtx.length; v++){
         //    ctx.beginPath();
         //    // ctx.moveTo(this.vtx[0].x * (d / this.vtx[0].z), this.vtx[0].y * (d / this.vtx[0].z));
         //    ctx.moveTo(this.c.x * (d / (d + this.c.z)), this.c.y * (d / (d + this.c.z)));
         //    // ctx.lineTo(this.vtx[v].x * (d / this.vtx[v].z), this.vtx[v].y * (d / this.vtx[v].z));
         //    ctx.lineTo(this.vtx[v].x * (d / (d + this.vtx[v].z)), this.vtx[v].y * (d / (d + this.vtx[v].z)));
         //    ctx.closePath();
         //    ctx.stroke();
         // }
         ctx.strokeStyle = 'rgb(0,255,255)';
         ctx.beginPath();
         // ctx.moveTo(this.vtx[0].x * (d / this.vtx[0].z), this.vtx[0].y * (d / this.vtx[0].z));
         ctx.moveTo(this.c.x * (d / (d + this.c.z)), this.c.y * (d / (d + this.c.z)));
         // ctx.lineTo(this.vtx[v].x * (d / this.vtx[v].z), this.vtx[v].y * (d / this.vtx[v].z));
         ctx.lineTo(this.xAvg * (d / (d + this.zAvg)), this.yAvg * (d / (d + this.zAvg)));
         ctx.closePath();
         ctx.stroke();
      }
      */
      
      // Draw faces
      ctx.beginPath();
      ctx.moveTo(this.vtx[0].x * (d / (d + this.vtx[0].z)), this.vtx[0].y * (d / (d + this.vtx[0].z)));
      for(let v = 0; v < this.vtx.length; v++){
         ctx.lineTo(this.vtx[v].x * (d / (d + this.vtx[v].z)), this.vtx[v].y * (d / (d + this.vtx[v].z)));
      }
      ctx.closePath();
      ctx.fillStyle = this.clr;
      if(allowSeamlessFaces){
         ctx.shadowColor = this.clr;
         ctx.shadowBlur = 0.5;
      }
      if(this.isRenderable) ctx.fill();
      if(renderBorder && this.isRenderable && !allowSeamlessFaces){
         ctx.strokeStyle = borderColor;
         ctx.stroke();
      }
      
      // Apply shadows
      if(renderShade){
         let shadeStrength = ((d + this.vtx[0].z) / d) / ((cameraProximityThreshold) / 25) / 2;
         shadeStrength += 0.05;
         let shadeLayer = `rgba(${shadeColor[0]},${shadeColor[1]},${shadeColor[2]},${shadeStrength})`;
         ctx.beginPath();
         ctx.moveTo(this.vtx[0].x * (d / (d + this.vtx[0].z)), this.vtx[0].y * (d / (d + this.vtx[0].z)));
         for(let v = 1; v < this.vtx.length; v++){
            ctx.lineTo(this.vtx[v].x * (d / (d + this.vtx[v].z)), this.vtx[v].y * (d / (d + this.vtx[v].z)));
         }
         ctx.closePath();
         ctx.strokeStyle = shadeLayer;
         ctx.fillStyle = shadeLayer;
         /*
         ctx.shadowColor = shadeLayer;
         ctx.shadowBlur = 5;
         */
         if(this.isRenderable && allowSeamlessFaces) ctx.shadowColor = shadeLayer;
         if(this.isRenderable) ctx.fill();
         ctx.lineWidth = 0.5;
         // ^ UNCOMMENT LINEWIDTH LINE
         if(this.isRenderable && !allowSeamlessFaces) ctx.stroke();
         // Experimental other shade blurring,
         // not as high performance and roughly same results
         /*
         if(this.isRenderable){
            if(allowSeamlessFaces){
               // ctx.lineWidth = 0;
               ctx.shadowColor = shadeLayer;
               ctx.shadowBlur = 0.5;
               ctx.strokeStyle = 'rgba(0,0,0,0)';
            }else{
               ctx.lineWidth = 0.5;
               ctx.shadowColor = 'rgba(0,0,0,0)';
               ctx.shadowBlur = 0;
               ctx.strokeStyle = shadeLayer;
            }
            ctx.stroke();
         }
         */
      }
      if(this.isRenderable && depthShade !== false){
         let depthShadeValue = `rgba(0,0,0,${depthShade / 15})`;
         ctx.fillStyle = depthShadeValue;
         ctx.strokeStyle = depthShadeValue;
         if(allowSeamlessFaces) ctx.shadowColor = depthShadeValue;
         ctx.fill();
         if(!allowSeamlessFaces) ctx.stroke();
         // Experimental other shade blurring,
         // not as high performance and roughly same results
         /*
         if(allowSeamlessFaces){
            ctx.shadowColor = depthShadeValue;
            ctx.shadowBlur = 0.5;
            ctx.strokeStyle = 'rgba(0,0,0,0)';
         }else{
            ctx.lineWidth = 0.5;
            ctx.shadowColor = 'rgba(0,0,0,0)';
            ctx.shadowBlur = 0;
            ctx.strokeStyle = depthShadeValue;
         }
         ctx.stroke();
         */
      }
      
      /* ctx.lineWidth = 0;
      ctx.shadowColor = 'rgb(0,0,0)';
      ctx.shadowBlur = 5;
      ctx.stroke();
      */
   }
   updatePositionAbsolute(){
      this.xAvg = this.vtx.reduce((s, v) => s + v.x, 0) / this.vtx.length;
      this.yAvg = this.vtx.reduce((s, v) => s + v.y, 0) / this.vtx.length;
      this.zAvg = this.vtx.reduce((s, v) => s + v.z, 0) / this.vtx.length;
      this.dAvg = Math.sqrt(Math.pow(this.xAvg, 2) + Math.pow(this.yAvg, 2) + Math.pow(this.zAvg, 2));
      this.hAvg = this.vtx.reduce((s, v) => s + v.h, 0) / this.vtx.length;
      this.vAvg = this.vtx.reduce((s, v) => s + v.v, 0) / this.vtx.length;
      this.lightLengthAvg = this.vtx.reduce((s, v) => s + (d / (d + v.z))) / this.vtx.length;
      // let cdz = Math.pow(this.c.z - this.zAvg, 2) * Math.cos(this.c.v);
      let cdz = Math.pow(this.c.z - this.zAvg, 2);
      // log(Math.cos(this.c.v));
      let cdx = Math.pow(this.c.x - this.xAvg, 2);
      // let cdx = Math.pow((this.c.x - this.xAvg) * (d / (d + cdz)), 2);
      // log(Math.cos(this.c.v));
      let cdy = Math.pow(this.c.y - this.yAvg, 2);
      // let cdy = Math.pow((this.c.y - this.yAvg) * (d / (d + cdz)), 2);
      // log(Math.sin(this.c.v));
      // this.cdAvg = Math.sqrt(cdx + cdy + cdz);
      this.cdAvg = Math.sqrt(cdx + cdy + cdz);
      this.zFactor = (d / (d + this.zAvg));
      this.renderBias = this.zFactor;
   }
   updatePositionRelative(){
      
   }
   updatePositionHorizontal(){
      this.hdAvg = Math.sqrt(Math.pow(this.xAvg, 2) + Math.pow(this.zAvg, 2));
   }
   updatePositionVertical(){
      this.vdAvg = Math.sqrt(Math.pow(this.xAvg, 2) + Math.pow(this.yAvg, 2));
   }
   updatePositionZ(){
      this.zdAvg = this.zAvg * d / (this.zAvg + d);
   }
   updatePositionParallel(){
      this.pdAvg = Math.sqrt(Math.pow(this.xAvg * (d / (d + this.zAvg)), 2) + Math.pow(this.zAvg * (d / (d + this.zAvg)), 2));
   }
}