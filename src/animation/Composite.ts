module Threets {
   var RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
   export class Composite {
      public _targetGroup: any;
      public _bindings: any;

      constructor(targetGroup, path, optionalParsedPath) {
         var parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);

         this._targetGroup = targetGroup;
         this._bindings = targetGroup.subscribe_(path, parsedPath);

      }

      public getValue(array, offset) {

         this.bind(); // bind all binding

         var firstValidIndex = this._targetGroup.nCachedObjects_,
            binding = this._bindings[firstValidIndex];

         // and only call .getValue on the first
         if (binding !== undefined) binding.getValue(array, offset);

      }

      public setValue(array, offset) {

         var bindings = this._bindings;

         for (var i = this._targetGroup.nCachedObjects_,
            n = bindings.length; i !== n; ++i) {

            bindings[i].setValue(array, offset);

         }

      }

      public bind() {

         var bindings = this._bindings;

         for (var i = this._targetGroup.nCachedObjects_,
            n = bindings.length; i !== n; ++i) {

            bindings[i].bind();

         }

      }

      public unbind() {

         var bindings = this._bindings;

         for (var i = this._targetGroup.nCachedObjects_,
            n = bindings.length; i !== n; ++i) {

            bindings[i].unbind();

         }

      }

   }
}