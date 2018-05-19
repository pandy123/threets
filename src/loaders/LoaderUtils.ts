module THREE {
   declare var TextDecoder: any;
   declare var escape: any;
   export class LoaderUtils {

      public static decodeText(array) {
         if (typeof TextDecoder !== 'undefined') {
            return new TextDecoder().decode(array);
         }
         // Avoid the String.fromCharCode.apply(null, array) shortcut, which
         // throws a "maximum call stack size exceeded" error for large arrays.
         var s = '';
         for (var i = 0, il = array.length; i < il; i++) {
            // Implicitly assumes little-endian.
            s += String.fromCharCode(array[i]);
         }
         // Merges multi-byte utf-8 characters.
         return decodeURIComponent(escape(s));
      }
      public static extractUrlBase(url) {
         var index = url.lastIndexOf('/');
         if (index === - 1) return './';
         return url.substr(0, index + 1);
      }
   }
}
