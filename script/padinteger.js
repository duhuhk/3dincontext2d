function padInt(i, l, b = 10){
   // l: length (10^l), i: integer, b: base
   let out = i.toString(b);
   while(out.length < l){
      out = '0' + out;
   }
   return out;
}

function padStr(s, l, p = '0'){
   // l: length (10^l), s: string, p: padding
   if(typeof p != 'string') p = String(p);
   while(s.length < l){
      s = p + s;
   }
   return s;
}