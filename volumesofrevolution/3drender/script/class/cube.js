class Cube extends Model{
   constructor(x, y, z, p, q, r){
      super(x, y, z, p, q, r);
   }
   build(){
      this.createVertex('dv00', 50, 50, 50);
      this.createVertex('dv01', 50, -50, 50);
      this.createVertex('dv02', -50, -50, 50);
      this.createVertex('dv03', -50, 50, 50);
      this.createVertex('dv04', 50, 50, -50);
      this.createVertex('dv05', 50, -50, -50);
      this.createVertex('dv06', -50, -50, -50);
      this.createVertex('dv07', -50, 50, -50);
      this.createVertex('dv08', 50, 50, 50);
      this.createVertex('dv09', 50, 50, -50);
      this.createVertex('dv10', 50, -50, -50);
      this.createVertex('dv11', 50, -50, 50);
      this.createVertex('dv12', -50, 50, 50);
      this.createVertex('dv13', -50, 50, -50);
      this.createVertex('dv14', -50, -50, -50);
      this.createVertex('dv15', -50, -50, 50);
      
      this.createFace(['dv00', 'dv01', 'dv02', 'dv03'], '#ff1818');
      this.createFace(['dv04', 'dv05', 'dv06', 'dv07'], '#ff0000');
      this.createFace(['dv08', 'dv09', 'dv10', 'dv11'], '#0000ff');
      this.createFace(['dv12', 'dv13', 'dv14', 'dv15'], '#0a4cff');
      this.createFace(['dv00', 'dv04', 'dv07', 'dv03'], '#00ff00');
      this.createFace(['dv01', 'dv10', 'dv14', 'dv02'], '#18ff18');
   }
}