function initializeRender(){
   try{
      /*
      // Initial block used in testing; not very good using updated scripts
      let dummyblock0 = new Block(0, 0, 450, 50, 50, 50, Math.PI / 2, 0);
      dummyblock0.initialize();
      */
      
      /*
      // Was going to be a tooth, now just a crown thing
      let dummyTooth = new Tooth(0, 0, 450, 50, 50, 50, Math.PI / 2, 0);
      dummyTooth.initialize();
      */

      /*
      // Makes a big, buggy wall
      let dummycolorblock00 = new ColorBlock(0, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock00.initialize();
      let dummycolorblock01 = new ColorBlock(-14, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock01.initialize();
      let dummycolorblock02 = new ColorBlock(-28, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock02.initialize();
      let dummycolorblock03 = new ColorBlock(-42, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock03.initialize();
      let dummycolorblock04 = new ColorBlock(14, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock04.initialize();
      let dummycolorblock05 = new ColorBlock(28, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock05.initialize();
      let dummycolorblock06 = new ColorBlock(42, 0, 450, 50, 50, 50, 0, 0);
      dummycolorblock06.initialize();
      let dummycolorblock07 = new ColorBlock(0, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock07.initialize();
      let dummycolorblock08 = new ColorBlock(-14, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock08.initialize();
      let dummycolorblock09 = new ColorBlock(-28, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock09.initialize();
      let dummycolorblock10 = new ColorBlock(-42, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock10.initialize();
      let dummycolorblock11 = new ColorBlock(14, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock11.initialize();
      let dummycolorblock12 = new ColorBlock(28, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock12.initialize();
      let dummycolorblock13 = new ColorBlock(42, 14, 450, 50, 50, 50, 0, 0);
      dummycolorblock13.initialize();
      let dummycolorblock14 = new ColorBlock(0, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock14.initialize();
      let dummycolorblock15 = new ColorBlock(-14, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock15.initialize();
      let dummycolorblock16 = new ColorBlock(-28, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock16.initialize();
      let dummycolorblock17 = new ColorBlock(-42, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock17.initialize();
      let dummycolorblock18 = new ColorBlock(14, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock18.initialize();
      let dummycolorblock19 = new ColorBlock(28, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock19.initialize();
      let dummycolorblock20 = new ColorBlock(42, -14, 450, 50, 50, 50, 0, 0);
      dummycolorblock20.initialize();
      */
      
      // D'ya like my balls?
      let dummyball0 = new Ball(0, 0, 450, 15, 0, 0);
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