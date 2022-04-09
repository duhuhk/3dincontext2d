// document.querySelector('#display-element').getContext('2d').fillRect(10, 50, 10, 70);

// var log = document.querySelector('#halflog');

// var dummy = new Block(75, 75, 0, 50, 50, 50, 0, 0);
// var pnt = new Point(240, 135, 0, 0, 0, 0);

var hshift = 3 * Math.PI / 6;
var vshift = 0;
var xshift = 0;
var yshift = 0;
var dshift = 0;

function dummyRenderLoop(){
   ctx.clearRect(0,0,480,270);
   // log.innerHTML = JSON.stringify(__activeKeys);
   try{
      test2();
   }catch(e){
      alert(e);
   }
   
   window.requestAnimationFrame(dummyRenderLoop);
}

window.requestAnimationFrame(dummyRenderLoop);

function test2(){
   ctx.translate(240, 135);
   
   function ctr(x, y, z, h, v){
      return {x: x, y: y, z: z, v: v, h: h};
   }
   
   function cpt(c, r, h, v){
      return {c: c, r: r, v: v, h: h};
   }
   
   function pnt(x, y, z){
      return {x: x, y: y, z: z};
   };
   
   if(getInput('ArrowUp')) yshift -= 1;
   if(getInput('ArrowDown')) yshift += 1;
   if(getInput('ArrowLeft')) xshift -= 1;
   if(getInput('ArrowRight')) xshift += 1;
   if(getInput('Comma')) hshift += 1 / 15;
   if(getInput('Period')) hshift -= 1 / 15;
   if(getInput('KeyW')) dshift -= 1;
   if(getInput('KeyS')) dshift += 1;
   
   hshift += 1 / 60;
   
   vshift %= 2 * Math.PI;
   vshift < 0 ? vshift += 2 * Math.PI : null;
   hshift %= 2 * Math.PI;
   hshift < 0 ? hshift += 2 * Math.PI : null;
   
   let d = 200 + dshift;
   
   let c = new ctr(xshift, yshift, 100, hshift, vshift);
   
   let A = new cpt(c, 40, 0, -1 * Math.PI / 2);
   /*let B = new cpt(c, 40, 2 * Math.PI / 3, -5 * Math.PI / 6);
   let C = new cpt(c, 40, 4 * Math.PI / 3, -5 * Math.PI / 6);
   let D = new cpt(c, 40, 6 * Math.PI / 3, -5 * Math.PI / 6);*/
   let B = new cpt(c, 40, 2 * Math.PI / 3, 0);
   let C = new cpt(c, 40, 4 * Math.PI / 3, 0);
   let D = new cpt(c, 40, 6 * Math.PI / 3, 0);
   let E = new cpt(c, 40, 0, Math.PI / 2);
   
   let pa = new pnt(c.x, c.y, c.z);
   pa.x += A.r * Math.cos(A.v) * Math.cos(A.h - c.h);
   pa.y += A.r * Math.sin(A.v);
   pa.z += A.r * Math.cos(A.v) * Math.sin(A.h - c.h);
   let pb = new pnt(c.x, c.y, c.z);
   pb.x += B.r * Math.cos(B.v) * Math.cos(B.h - c.h);
   pb.y += B.r * Math.sin(B.v);
   pb.z += B.r * Math.cos(B.v) * Math.sin(B.h - c.h);
   let pc = new pnt(c.x, c.y, c.z);
   pc.x += C.r * Math.cos(C.v) * Math.cos(C.h - c.h);
   pc.y += C.r * Math.sin(C.v);
   pc.z += C.r * Math.cos(C.v) * Math.sin(C.h - c.h);
   let pd = new pnt(c.x, c.y, c.z);
   pd.x += D.r * Math.cos(D.v) * Math.cos(D.h - c.h);
   pd.y += D.r * Math.sin(D.v);
   pd.z += D.r * Math.cos(D.v) * Math.sin(D.h - c.h);
   let pe = new pnt(c.x, c.y, c.z);
   pe.x += E.r * Math.cos(E.v) * Math.cos(E.h - c.h);
   pe.y += E.r * Math.sin(E.v);
   pe.z += E.r * Math.cos(E.v) * Math.sin(E.h - c.h);
   
   function face(vertices, clr){
      let retVal = {vtx: [...vertices], clr: clr, xAvg: null, yAvg: null, zAvg: null, dAvg: null, draw: null};
      retVal.xAvg = vertices.reduce((s, v) => s + v.x, 0) / vertices.length;
      retVal.yAvg = vertices.reduce((s, v) => s + v.y, 0) / vertices.length;
      retVal.zAvg = vertices.reduce((s, v) => s + v.z, 0) / vertices.length;
      retVal.dAvg = Math.sqrt(Math.pow(retVal.xAvg, 2) + Math.pow(retVal.yAvg, 2) + Math.pow(retVal.zAvg, 2));
      retVal.draw = function(){
         // ctx.strokeStyle = 'black';
         ctx.strokeStyle = 'rgba(0,0,0,0.005)';
         // ctx.strokeStyle = retVal.clr;
         ctx.fillStyle = retVal.clr;
         ctx.beginPath();
         ctx.moveTo(retVal.vtx[0].x * d / (retVal.vtx[0].z), retVal.vtx[0].y * d / (retVal.vtx[0].z));
         for(let v = 1; v < retVal.vtx.length; v++){
            ctx.lineTo(retVal.vtx[v].x * d / (retVal.vtx[v].z), retVal.vtx[v].y * d / (retVal.vtx[v].z));
         }
         ctx.closePath();
         ctx.fill();
         ctx.stroke();
         // Shadows
         let shadeLayer = 'rgba(0,0,0,' + (((Math.pow(retVal.dAvg, 2) / Math.pow(c.z, 2)) / 3) - 0.2) + ')';
         // let shadeLayer = 'rgba(0,0,0,' + ((Math.abs(retVal.zAvg - c.z) / (d / 2))) + ')';
         // ctx.strokeStyle = 'rgba(0,0,0,' + (((retVal.dAvg / c.z) / 3) - 0.15) + ')';
         ctx.strokeStyle = shadeLayer;
         // ctx.fillStyle = 'rgba(0,0,0,' + (((retVal.dAvg / c.z) / 3) - 0.15) + ')';
         ctx.fillStyle = shadeLayer;
         ctx.beginPath();
         ctx.moveTo(retVal.vtx[0].x * d / (retVal.vtx[0].z), retVal.vtx[0].y * d / (retVal.vtx[0].z));
         for(let v = 1; v < retVal.vtx.length; v++){
            ctx.lineTo(retVal.vtx[v].x * d / (retVal.vtx[v].z), retVal.vtx[v].y * d / (retVal.vtx[v].z));
         }
         ctx.closePath();
         ctx.fill();
         // ctx.stroke();
      };
      return retVal;
   };
   
   let faces = [];
   
   let faceColor = 'white';
   let dummyFace0 = new face([pa, pb, pc], faceColor);
   let dummyFace1 = new face([pa, pc, pd], faceColor);
   let dummyFace2 = new face([pa, pb, pd], faceColor);
   // let dummyFace3 = new face([pb, pc, pd], 'rgb(150,150,150)');
   let dummyFace3 = new face([pe, pb, pc], faceColor);
   let dummyFace4 = new face([pe, pc, pd], faceColor);
   let dummyFace5 = new face([pe, pb, pd], faceColor);
   /*let dummyFace0 = new face([pa, pb, pc], 'red');
   let dummyFace1 = new face([pa, pc, pd], 'green');
   let dummyFace2 = new face([pa, pb, pd], 'blue');
   let dummyFace3 = new face([pb, pc, pd], 'purple');*/
   
   faces.push(dummyFace0);
   faces.push(dummyFace1);
   faces.push(dummyFace2);
   faces.push(dummyFace3);
   faces.push(dummyFace4);
   faces.push(dummyFace5);
   faces.sort((a, b) => b.dAvg - a.dAvg);
   
   faces.forEach(f => f != null ? f.draw() : null);
   
   /*ctx.strokeStyle = 'black';
   ctx.beginPath();
   // ctx.moveTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.moveTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.lineTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.lineTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.moveTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.moveTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.lineTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.lineTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   // ctx.moveTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.moveTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.lineTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.lineTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   // ctx.moveTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.moveTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.lineTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.lineTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.moveTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.moveTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.lineTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.lineTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   // ctx.moveTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.moveTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.lineTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.lineTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   // ctx.moveTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.moveTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   // ctx.lineTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.lineTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.moveTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.moveTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   // ctx.lineTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.lineTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.moveTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.moveTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   // ctx.lineTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.lineTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   // ctx.moveTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.moveTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   // ctx.lineTo(pa.x + (c.x * d / (c.z)), pa.y + (c.y * d / (c.z)));
   ctx.lineTo(pa.x * d / (pa.z), pa.y * d / (pa.z));
   // ctx.moveTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.moveTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   // ctx.lineTo(pb.x + (c.x * d / (c.z)), pb.y + (c.y * d / (c.z)));
   ctx.lineTo(pb.x * d / (pb.z), pb.y * d / (pb.z));
   // ctx.moveTo(pd.x + (c.x * d / (c.z)), pd.y + (c.y * d / (c.z)));
   ctx.moveTo(pd.x * d / (pd.z), pd.y * d / (pd.z));
   // ctx.lineTo(pc.x + (c.x * d / (c.z)), pc.y + (c.y * d / (c.z)));
   ctx.lineTo(pc.x * d / (pc.z), pc.y * d / (pc.z));
   ctx.closePath();
   ctx.stroke();
   */
   // Draw core
   /*
   ctx.beginPath();
   ctx.moveTo(c.x * d / c.z, c.y * d / c.z);
   ctx.lineTo(pa.x * d / pa.z, pa.y * d / pa.z);
   ctx.closePath();
   ctx.strokeStyle = 'red';
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(c.x * d / c.z, c.y * d / c.z);
   ctx.lineTo(pb.x * d / pb.z, pb.y * d / pb.z);
   ctx.closePath();
   ctx.strokeStyle = 'green';
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(c.x * d / c.z, c.y * d / c.z);
   ctx.lineTo(pc.x * d / pc.z, pc.y * d / pc.z);
   ctx.closePath();
   ctx.strokeStyle = 'blue';
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(c.x * d / c.z, c.y * d / c.z);
   ctx.lineTo(pd.x * d / pd.z, pd.y * d / pd.z);
   ctx.closePath();
   ctx.strokeStyle = 'purple';
   ctx.stroke();
   
   ctx.fillStyle = 'yellow';
   ctx.fillRect((c.x * d / c.z) - 2, (c.y * d / c.z) - 2, 4, 4);
   */
   
   /*
   ctx.beginPath();
   ctx.moveTo(A.x * d / A.z, A.y * d / A.z);
   ctx.lineTo(B.x * d / B.z, B.y * d / B.z);
   ctx.moveTo(A.x * d / A.z, A.y * d / A.z);
   ctx.lineTo(C.x * d / C.z, C.y * d / C.z);
   ctx.moveTo(A.x * d / A.z, A.y * d / A.z);
   ctx.lineTo(D.x * d / D.z, D.y * d / D.z);
   ctx.closePath();
   ctx.stroke();
   
   ctx.beginPath();
   ctx.moveTo(B.x * d / B.z, B.y * d / B.z);
   ctx.lineTo(A.x * d / A.z, A.y * d / A.z);
   ctx.moveTo(B.x * d / B.z, B.y * d / B.z);
   ctx.lineTo(C.x * d / C.z, C.y * d / C.z);
   ctx.moveTo(B.x * d / B.z, B.y * d / B.z);
   ctx.lineTo(D.x * d / D.z, D.y * d / D.z);
   ctx.closePath();
   ctx.stroke();
   
   ctx.beginPath();
   ctx.moveTo(C.x * d / C.z, C.y * d / C.z);
   ctx.lineTo(A.x * d / A.z, A.y * d / A.z);
   ctx.moveTo(C.x * d / C.z, C.y * d / C.z);
   ctx.lineTo(B.x * d / B.z, B.y * d / B.z);
   ctx.moveTo(C.x * d / C.z, C.y * d / C.z);
   ctx.lineTo(D.x * d / D.z, D.y * d / D.z);
   ctx.closePath();
   ctx.stroke();
   
   ctx.beginPath();
   ctx.moveTo(D.x * d / D.z, D.y * d / D.z);
   ctx.lineTo(A.x * d / A.z, A.y * d / A.z);
   ctx.moveTo(D.x * d / D.z, D.y * d / D.z);
   ctx.lineTo(B.x * d / B.z, B.y * d / B.z);
   ctx.moveTo(D.x * d / D.z, D.y * d / D.z);
   ctx.lineTo(C.x * d / C.z, C.y * d / C.z);
   ctx.closePath();
   ctx.stroke();
   */
   
   ctx.setTransform(1, 0, 0, 1, 0, 0);
};

function test1(){
   if(getInput('ArrowLeft')) pnt.theta.xz += 1 / (10 * Math.PI);
   if(getInput('ArrowRight')) pnt.theta.xz -= 1 / (10 * Math.PI);
   if(getInput('ArrowUp')) pnt.theta.yz += 1 / (10 * Math.PI);
   if(getInput('ArrowDown')) pnt.theta.yz -= 1 / (10 * Math.PI);
   if(getInput('Comma')) pnt.theta.xy += 1 / (10 * Math.PI);
   if(getInput('Period')) pnt.theta.xy -= 1 / (10 * Math.PI);
   
   ctx.beginPath();
   ctx.moveTo(15,15);
   ctx.arc(15, 15, 12, 0, pnt.theta.xy);
   ctx.closePath();
   ctx.strokeStyle = 'rgb(255,0,0)';
   ctx.fillStyle = 'rgba(255,0,0,0.4)';
   ctx.fill();
   ctx.stroke();
   ctx.beginPath();
   ctx.arc(15, 15, 12, 0, 2*Math.PI);
   ctx.closePath();
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText((pnt.theta.xy * 180 / Math.PI).toFixed(2), 30, 19);
   
   ctx.beginPath();
   ctx.moveTo(15,45);
   ctx.arc(15, 45, 12, 0, pnt.theta.yz);
   ctx.closePath();
   ctx.strokeStyle = 'rgb(0,255,0)';
   ctx.fillStyle = 'rgba(0,255,0,0.4)';
   ctx.fill();
   ctx.stroke();
   ctx.beginPath();
   ctx.arc(15, 45, 12, 0, 2*Math.PI);
   ctx.closePath();
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText((pnt.theta.yz * 180 / Math.PI).toFixed(2), 30, 49);
   
   ctx.beginPath();
   ctx.moveTo(15,75);
   ctx.arc(15, 75, 12, 0, pnt.theta.xz);
   ctx.closePath();
   ctx.strokeStyle = 'rgb(0,0,255)';
   ctx.fillStyle = 'rgba(0,0,255,0.4)';
   ctx.fill();
   ctx.stroke();
   ctx.beginPath();
   ctx.arc(15, 75, 12, 0, 2*Math.PI);
   ctx.closePath();
   ctx.strokeStyle = 'black';
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText((pnt.theta.xz * 180 / Math.PI).toFixed(2), 30, 79);
   
   function drawAxis(axis){
      ctx.lineWidth = 2;
      
      if(axis == '+x'){
         ctx.strokeStyle = 'red';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         // ctx.lineTo(pnt.x + (50 * (Math.cos(pnt.theta.xz) - Math.sin(pnt.theta.xy))), pnt.y + (50 * (Math.sin(pnt.theta.xy) + Math.sin(pnt.theta.yz))));
         let x = 50 * ((Math.cos(pnt.theta.xy) * (Math.cos(pnt.theta.xz)) * (Math.cos(pnt.theta.yz) - Math.sin(pnt.theta.xz))));
         let y = 50 * ((Math.sin(pnt.theta.xy) * (Math.cos(pnt.theta.yz)) * (Math.sin(pnt.theta.yz) + Math.sin(pnt.theta.xy))));
         ctx.lineTo(pnt.x + x, pnt.y - y);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '+y'){
         ctx.strokeStyle = 'green';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         // ctx.lineTo(pnt.x, pnt.y - (50 * (Math.sin(pnt.theta.xy) + Math.sin(pnt.theta.yz))));
         ctx.lineTo(pnt.x + (50 * (Math.sin(pnt.theta.xy) * Math.sin(pnt.theta.yz))), pnt.y - (50 * (Math.cos(pnt.theta.xy) * Math.cos(pnt.theta.yz))));
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '+z'){
         ctx.strokeStyle = 'blue';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         // ctx.lineTo(pnt.x + (50 * (Math.sin(pnt.theta.xz) - Math.sin(pnt.theta.yz))), pnt.y - (50 * (Math.sin(pnt.theta.xy) + Math.sin(pnt.theta.yz))));
         d = Math.sqrt(Math.pow(50 * Math.sin(pnt.theta.xz), 2) + Math.pow(50 * Math.sin(pnt.theta.yz), 2) + Math.pow(50 * Math.sin(pnt.theta.xy), 2));
         log.innerHTML = d;
         let x = 50 * Math.cos(pnt.theta.yz) * Math.sin(pnt.theta.xz);
         let y = 50 * Math.sin(pnt.theta.yz) * Math.cos(pnt.theta.xy);
         ctx.lineTo(pnt.x + x, pnt.y - y);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-x'){
         ctx.strokeStyle = 'pink';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         ctx.lineTo(pnt.x - (50 * Math.cos(pnt.theta.xz) * Math.cos(pnt.theta.xy)), pnt.y + (50 * (Math.cos(pnt.theta.yz) * Math.sin(pnt.theta.xy))));
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-y'){
         ctx.strokeStyle = 'lime';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         ctx.lineTo(pnt.x, pnt.y + 50);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-z'){
         ctx.strokeStyle = 'skyblue';
         ctx.beginPath();
         ctx.moveTo(pnt.x, pnt.y);
         ctx.lineTo(pnt.x + (50 * Math.sin(pnt.theta.xz) * Math.cos(pnt.theta.yz)), pnt.y + (50 * (Math.cos(pnt.theta.xy) * Math.sin(pnt.theta.yz))));
         ctx.closePath();
         ctx.stroke();
      }
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
   }
   
   // let distance = [];
   /*drawAxis('+x');
   drawAxis('+y');
   drawAxis('+z');
   drawAxis('-x');
   drawAxis('-y');
   drawAxis('-z');*/
   
   /*
   // drawAxis('-y');
   drawAxis('+y');
   // drawAxis('-x');
   drawAxis('+x');
   // drawAxis('-z');
   drawAxis('+z');
   */
   
   // Draw graphs ///////////////////////////////////////////////////////
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(80, 10, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText('X / Y', 80, 80);
   // ctx.fillText('x ' + xxoffxy.toFixed(1) + ', ' + xyoffxy.toFixed(1), 80, 90);
   // ctx.fillText('y ' + yxoffxy.toFixed(1) + ', ' + yyoffxy.toFixed(1), 80, 100);
   ctx.strokeStyle = 'red';
   ctx.beginPath();
   ctx.moveTo(110, 40);
   ctx.lineTo(110 + (30 * Math.cos(pnt.t.xy)), 40 - (30 * Math.sin(pnt.t.xy)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'green';
   ctx.beginPath();
   ctx.moveTo(110, 40);
   ctx.lineTo(110 + (30 * Math.cos(pnt.t.xy + (Math.PI / 2))), 40 - (30 * Math.sin(pnt.t.xy + (Math.PI / 2))));
   ctx.closePath();
   ctx.stroke();
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(80, 130, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.strokeStyle = 'red';
   ctx.beginPath();
   ctx.moveTo(110, 160);
   ctx.lineTo(110 + (30 * Math.cos(pnt.t.xy) * Math.cos(pnt.t.xz)), 160 - (30 * Math.sin(pnt.t.xy) * Math.cos(pnt.t.xz)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'green';
   ctx.beginPath();
   ctx.moveTo(110, 160);
   // ctx.lineTo(110 + ((30 * Math.cos(pnt.t.xy + (Math.PI / 2))) * Math.sin(pnt.t.yz + (Math.PI / 2))), 160 - (30 * (Math.sin(pnt.t.xy + (Math.PI / 2))) * Math.sin(pnt.t.yz + (Math.PI / 2))));
   ctx.lineTo(110 + ((30 * Math.cos(pnt.t.xy + (Math.PI / 2))) * Math.cos(pnt.t.yz)), 160 - (30 * (Math.cos(pnt.t.xy)) * Math.cos(pnt.t.yz))); 
   ctx.closePath();
   ctx.stroke();
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(150, 10, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText('X / Z', 150, 80);
   // ctx.fillText('x ' + xxoffxz.toFixed(1) + ', ' + xyoffxz.toFixed(1), 150, 90);
   // ctx.fillText('z ' + zxoffxz.toFixed(1) + ', ' + zyoffxz.toFixed(1), 150, 100);
   ctx.strokeStyle = 'red';
   ctx.beginPath();
   ctx.moveTo(180, 40);
   ctx.lineTo(180 + (30 * Math.cos(pnt.t.xz)), 40 + (30 * Math.sin(pnt.t.xz)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'blue';
   ctx.beginPath();
   ctx.moveTo(180, 40);
   ctx.lineTo(180 + (30 * Math.cos(pnt.t.xz + (Math.PI / 2))), 40 + (30 * Math.sin(pnt.t.xz + (Math.PI / 2))));
   ctx.closePath();
   ctx.stroke();
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(150, 130, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.strokeStyle = 'red';
   ctx.beginPath();
   ctx.moveTo(180, 160);
   ctx.lineTo(180 + (30 * Math.cos(pnt.t.xz) * Math.cos(pnt.t.xy)), 160 + (30 * Math.sin(pnt.t.xz) * Math.cos(pnt.t.xy)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'blue';
   ctx.beginPath();
   ctx.moveTo(180, 160);
   ctx.lineTo(180 + (30 * Math.cos(pnt.t.xz + (Math.PI / 2)) * Math.cos(pnt.t.yz)), 160 + (30 * Math.sin(pnt.t.xz + (Math.PI / 2)) * Math.cos(pnt.t.yz)));
   ctx.closePath();
   ctx.stroke();
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(220, 10, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.fillText('Y / Z', 220, 80);
   // ctx.fillText('y ' + yxoffyz.toFixed(1) + ', ' + yyoffyz.toFixed(1), 220, 90);
   // ctx.fillText('z ' + zxoffyz.toFixed(1) + ', ' + zyoffyz.toFixed(1), 220, 100);
   ctx.strokeStyle = 'blue';
   ctx.beginPath();
   ctx.moveTo(250, 40);
   ctx.lineTo(250 + (30 * Math.cos(pnt.t.yz)), 40 - (30 * Math.sin(pnt.t.yz)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'green';
   ctx.beginPath();
   ctx.moveTo(250, 40);
   ctx.lineTo(250 + (30 * Math.cos(pnt.t.yz + (Math.PI / 2))), 40 - (30 * Math.sin(pnt.t.yz + (Math.PI / 2))));
   ctx.closePath();
   ctx.stroke();
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.rect(220, 130, 60, 60);
   ctx.closePath();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.strokeStyle = 'blue';
   ctx.beginPath();
   ctx.moveTo(250, 160);
   ctx.lineTo(250 + (30 * Math.cos(pnt.t.yz) * Math.cos(pnt.t.xz)), 160 - (30 * Math.sin(pnt.t.yz) * Math.cos(pnt.t.xz)));
   ctx.closePath();
   ctx.stroke();
   ctx.strokeStyle = 'green';
   ctx.beginPath();
   ctx.moveTo(250, 160);
   ctx.lineTo(250 + (30 * Math.cos(pnt.t.yz + (Math.PI / 2)) * Math.cos(pnt.t.xy)), 160 - (30 * Math.sin(pnt.t.yz + (Math.PI / 2)) * Math.cos(pnt.t.xy)));
   ctx.closePath();
   ctx.stroke();
   
   // Make points ///////////////////////////////////////////////////////
   
   let x = {
      x: 0,
      y: 0, 
      z: 0,
      draw: {
         x: 50,
         y: 0,
      },
   };
   // x y off from xz mult by sin x y off from xy?
   let y = {
      x: 0,
      y: 0, 
      z: 0,
      draw: {
         x: 0,
         y: -50,
      },
   };
   
   let z = {
      x: 0,
      y: 0, 
      z: 0,
      draw: {
         x: 0,
         y: 0,
      },
   };
   
   x.x += 50 * Math.cos(pnt.t.xz);
   x.y += 50 * Math.cos(pnt.t.xy + (Math.PI / 2));
   x.z += 50 * Math.sin(pnt.t.xy);
   
   y.x += 50 * Math.cos(pnt.t.xy - (Math.PI / 2));
   y.y += 50 * Math.sin(pnt.t.xy + (Math.PI / 2));
   y.z += 50 * Math.cos(pnt.t.yz + (Math.PI / 2));
   
   z.x += 50 * Math.sin(pnt.t.xz);
   z.y += 50 * Math.sin(pnt.t.yz);
   
   // Draw points ///////////////////////////////////////////////////////
   
   ctx.fillText('X: (' + x.x.toFixed(2) + ', ' + x.y.toFixed(2) + ', ' + x.z.toFixed(2) + ')', 330, 35);
   ctx.fillText('Y: (' + y.x.toFixed(2) + ', ' + y.y.toFixed(2) + ', ' + y.z.toFixed(2) + ')', 330, 50);
   ctx.fillText('Z: (' + z.x.toFixed(2) + ', ' + z.y.toFixed(2) + ', ' + z.z.toFixed(2) + ')', 330, 65);
   
   function dxp(){
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + x.draw.x, 190 + x.draw.y);
      ctx.lineTo(360 + (x.x * 100 / x.z), 190 + (x.y * 100 / x.z));
      ctx.closePath();
      ctx.stroke();
   }
   function dxn(){
      ctx.strokeStyle = 'pink';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + x.draw.x, 190 + x.draw.y);
      ctx.lineTo(360 - (x.x * 100 / x.z), 190 - (x.y * 100 / x.z));
      ctx.closePath();
      ctx.stroke();
   }
   function dyp(){
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + y.draw.x, 190 + y.draw.y);
      ctx.lineTo(360 + (y.x * 100 / y.z), 190 + (y.y * 100 / y.z));
      ctx.closePath();
      ctx.stroke();
   }
   function dyn(){
      ctx.strokeStyle = 'lime';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + y.draw.x, 190 + y.draw.y);
      ctx.lineTo(360 - (y.x * 100 / y.z), 190 - (y.y * 100 / y.z));
      ctx.closePath();
      ctx.stroke();
   }
   function dzp(){
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + z.draw.x, 190 + z.draw.y);
      ctx.lineTo(360 + (z.x * 100 / z.z), 190 + (z.y * 100 / z.z));
      ctx.closePath();
      ctx.stroke();
   }
   function dzn(){
      ctx.strokeStyle = 'skyblue';
      ctx.beginPath();
      ctx.moveTo(360, 190);
      // ctx.lineTo(240 + z.draw.x, 190 + z.draw.y);
      ctx.lineTo(360 - (z.x * 100 / z.z), 190 - (z.y * 100 / z.z));
      ctx.closePath();
      ctx.stroke();
   }
   
   let drawOrder = [];
   drawOrder.splice(20 + 10 * Number(x.z.toFixed(1)), 0, dxp);
   drawOrder.splice(20 - 10 * Number(x.z.toFixed(1)), 0, dxn);
   drawOrder.splice(20 + 10 * Number(z.z.toFixed(1)), 0, dzp);
   drawOrder.splice(20 - 10 * Number(z.z.toFixed(1)), 0, dzn);
   drawOrder.splice(20 + 10 * Number(y.z.toFixed(1)), 0, dyp);
   drawOrder.splice(20 - 10 * Number(y.z.toFixed(1)), 0, dyn);
   let trueDrawOrder = [];
   drawOrder.forEach(ind => ind != null ? ind() : null);
   // log.innerHTML += JSON.stringify(drawOrder);
   
   ctx.strokeStyle = 'black';
   ctx.beginPath();
   ctx.moveTo(360 + x.x, 190 + x.y);
   ctx.lineTo(360 + y.x, 190 + y.y);
   ctx.lineTo(360 - x.x, 190 - x.y);
   ctx.lineTo(360 - y.x, 190 - y.y);
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(360 + x.x, 190 + x.y);
   ctx.lineTo(360 + z.x, 190 + z.y);
   ctx.lineTo(360 - x.x, 190 - x.y);
   ctx.lineTo(360 - z.x, 190 - z.y);
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(360 + y.x, 190 + y.y);
   ctx.lineTo(360 + z.x, 190 + z.y);
   ctx.lineTo(360 - y.x, 190 - y.y);
   ctx.lineTo(360 - z.x, 190 - z.y);
   ctx.closePath();
   ctx.stroke();
}

function test0(){
   function drawAxis(axis){
      ctx.lineWidth = 2;
      if(axis == '+x'){
         ctx.strokeStyle = 'red';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240 + (25 * Math.cos(dummy.t.h)) , 135);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '+y'){
         ctx.strokeStyle = 'green';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240, 135 + (25 * Math.sin(dummy.t.v)));
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '+z'){
         ctx.strokeStyle = 'blue';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240 + (25 * Math.cos(dummy.t.h + (Math.PI / 2))) , 135);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-x'){
         ctx.strokeStyle = 'pink';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240 - (25 * Math.cos(dummy.t.h)) , 135);
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-y'){
         ctx.strokeStyle = 'lightgreen';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240, 135 - (25 * Math.sin(dummy.t.v)));
         ctx.closePath();
         ctx.stroke();
      }
      if(axis == '-z'){
         ctx.strokeStyle = 'skyblue';
         ctx.beginPath();
         ctx.moveTo(240, 135);
         ctx.lineTo(240 - (25 * Math.cos(dummy.t.h + (Math.PI / 2))) , 135);
         ctx.closePath();
         ctx.stroke();
      }
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
   }
   
   drawAxis('+y');
   drawAxis('-y');
   if(dummy.t.h > 0 && dummy.t.h < Math.PI / 2){
      drawAxis('-x');
      drawAxis('-z');
      drawAxis('+z');
      drawAxis('+x');
      log.innerHTML = '0-0.5pi';
   }else if(dummy.t.h > Math.PI / 2 && dummy.t.h < Math.PI){
      drawAxis('+z');
      drawAxis('-x');
      drawAxis('+x');
      drawAxis('-z');
      log.innerHTML = '0.5pi-pi';
   }else if(dummy.t.h > Math.PI && dummy.t.h < 3 * Math.PI / 2){
      drawAxis('+z');
      drawAxis('+x');
      drawAxis('-x');
      drawAxis('-z');
      log.innerHTML = 'pi-1.5pi';
   }else if(dummy.t.h > 3 * Math.PI / 2 && dummy.t.h < 2 * Math.PI){
      drawAxis('+x');
      drawAxis('-z');
      drawAxis('+z');
      drawAxis('-x');
      log.innerHTML = '1.5pi-2pi';
   }
   
   for(let i = 0; i < dummy.vertex.length; i++){
      ctx.beginPath();
      ctx.moveTo(dummy.vertex[i].x, dummy.vertex[i].y);
      ctx.lineTo(dummy.vertex[i].x + (Math.cos(dummy.vertex[i].th) * 15), dummy.vertex[i].y + (Math.sin(dummy.vertex[i].tv) * 15));
      ctx.closePath();
      ctx.stroke();
   }
   
   ctx.beginPath();
   ctx.moveTo(dummy.vertex[0].x, dummy.vertex[0].y);
   for(let i = 0; i < dummy.vertex.length; i++){
      ctx.lineTo(dummy.vertex[i].x, dummy.vertex[i].y);
   }
   ctx.closePath();
   ctx.stroke();
   
   dummy.t.h += 1 / (10 * Math.PI);
   dummy.t.v += 1 / (10 * Math.PI);
}