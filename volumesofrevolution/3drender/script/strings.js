// Fitting text
function padStr(s, l, p = '0'){
   // l: length (10^l), s: string, p: padding
   if(typeof p != 'string') p = String(p);
   while(s.length < l){
      s = p + s;
   }
   return s;
}

// Conversions
function hexify(n){
   if(typeof n != 'number') n = Number(n);
   return n.toString(16);
}

function decify(n, base = 16){
   if(typeof n != 'string') n = String(n);
   return parseInt(n, base);
}