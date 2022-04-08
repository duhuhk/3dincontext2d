function initializeRender(){   
   try{
      // let dummyblock0 = new Block(0, 0, -450, 50, 50, 50, Math.PI / 2, 0);
      // dummyblock0.initialize();
      
      // let dummyTooth = new Tooth(0, 0, -450, 50, 50, 50, Math.PI / 2, 0);
      // dummyTooth.initialize();
      
      // let dummycolorblock0 = new ColorBlock(0, 0, -450, 50, 50, 50, 0, 0);
      // dummycolorblock0.initialize();
      
      let dummyball0 = new Ball(0, 0, -450, 15, 0, 0);
      dummyball0.initialize();
      
      // let dummyball1 = new Ball(50, 0, -450, 15, 0, 0);
      // dummyball1.initialize();
      // let dummyball2 = new Ball(-50, 0, -450, 15, 0, 0);
      // dummyball2.initialize();
   }catch(e){
      log(e);
      alert(e);
   }
}

initializeRender();