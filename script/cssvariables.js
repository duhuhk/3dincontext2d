function setCSSVar(k, v){
   try{
      document.documentElement.style.setProperty(k, v);
   }catch(e){
      log(e);
      console.log(e);
   }
}