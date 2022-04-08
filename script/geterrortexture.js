var errTextureInd = 1;
const errTextureValues = [[255,0,255], [0,0,0]];
const errTxrL = errTextureValues.length;

function getErrTexture(){
   errTextureInd++;
   log(errTextureInd);
   // return errTextureInd % 2 == 0 ? [255, 0, 255] : [0, 0, 0];
   return errTextureValues[errTextureInd % errTxrL];
}

function textureErrFn(){
   let out = [255,0,255];
   if(Math.random() > 0.5) out = [0,0,0];
   return Math.random() > 0.5 ? [255,0,255] : [0,0,0];
   // return Math.random() > 0.5 ? [255,0,255] : [0,0,0];
}