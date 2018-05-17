module Threets {

   export class AnimationMixer extends EventDispatcher {
      public stats: any;//: { actions: { readonly total: number; readonly inUse: number; }; bindings: { readonly total: number; readonly inUse: number; }; controlInterpolants: { readonly total: number; readonly inUse: number; }; };
      public _nActiveControlInterpolants: number;
      public _controlInterpolants: any[];
      public _nActiveBindings: number;
      public _bindings: any[];
      public _nActiveActions: number;
      public _actions: any[];
      public _root: any;
      public _accuIndex: number;
      public time: number;
      public timeScale: number;
      public _controlInterpolantsResultBuffer: Float32Array = new Float32Array(1);
      public _actionsByClip: any;
      public _bindingsByRootAndName: any;
      constructor(root) {
         super();
         this._root = root;
         this._initMemoryManager();
         this._accuIndex = 0;
         this.time = 0;
         this.timeScale = 1.0;
      }
      // AnimationMixer.prototype = Object.assign(Object.create(EventDispatcher.prototype), {
      //constructor: AnimationMixer,
      public _bindAction(action, prototypeAction) {
         var root = action._localRoot || this._root,
            tracks = action._clip.tracks,
            nTracks = tracks.length,
            bindings = action._propertyBindings,
            interpolants = action._interpolants,
            rootUuid = root.uuid,
            bindingsByRoot = this._bindingsByRootAndName,
            bindingsByName = bindingsByRoot[rootUuid];
         if (bindingsByName === undefined) {
            bindingsByName = {};
            bindingsByRoot[rootUuid] = bindingsByName;
         }
         for (var i = 0; i !== nTracks; ++i) {
            var track = tracks[i],
               trackName = track.name,
               binding = bindingsByName[trackName];
            if (binding !== undefined) {
               bindings[i] = binding;
            } else {
               binding = bindings[i];
               if (binding !== undefined) {
                  // existing binding, make sure the cache knows
                  if (binding._cacheIndex === null) {
                     ++binding.referenceCount;
                     this._addInactiveBinding(binding, rootUuid, trackName);
                  }
                  continue;
               }
               var path = prototypeAction && prototypeAction.
                  _propertyBindings[i].binding.parsedPath;
               binding = new PropertyMixer(
                  PropertyBinding.create(root, trackName, path),
                  track.ValueTypeName, track.getValueSize());
               ++binding.referenceCount;
               this._addInactiveBinding(binding, rootUuid, trackName);
               bindings[i] = binding;
            }
            interpolants[i].resultBuffer = binding.buffer;
         }
      }
      public _activateAction(action) {
         if (!this._isActiveAction(action)) {
            if (action._cacheIndex === null) {
               // this action has been forgotten by the cache, but the user
               // appears to be still using it -> rebind
               var rootUuid = (action._localRoot || this._root).uuid,
                  clipUuid = action._clip.uuid,
                  actionsForClip = this._actionsByClip[clipUuid];
               this._bindAction(action,
                  actionsForClip && actionsForClip.knownActions[0]);
               this._addInactiveAction(action, clipUuid, rootUuid);
            }
            var bindings = action._propertyBindings;
            // increment reference counts / sort out state
            for (var i = 0, n = bindings.length; i !== n; ++i) {
               var binding = bindings[i];
               if (binding.useCount++ === 0) {
                  this._lendBinding(binding);
                  binding.saveOriginalState();
               }
            }
            this._lendAction(action);
         }
      }
      public _deactivateAction(action) {
         if (this._isActiveAction(action)) {
            var bindings = action._propertyBindings;
            // decrement reference counts / sort out state
            for (var i = 0, n = bindings.length; i !== n; ++i) {
               var binding = bindings[i];
               if (--binding.useCount === 0) {
                  binding.restoreOriginalState();
                  this._takeBackBinding(binding);
               }
            }
            this._takeBackAction(action);
         }
      }
      // Memory manager
      public _initMemoryManager() {
         this._actions = []; // 'nActiveActions' followed by inactive ones
         this._nActiveActions = 0;
         this._actionsByClip = {};
         // inside:
         // {
         // 		knownActions: Array< AnimationAction >	- used as prototypes
         // 		actionByRoot: AnimationAction			- lookup
         // }

         this._bindings = []; // 'nActiveBindings' followed by inactive ones
         this._nActiveBindings = 0;
         this._bindingsByRootAndName = {}; // inside: Map< name, PropertyMixer >

         this._controlInterpolants = []; // same game as above
         this._nActiveControlInterpolants = 0;
         var scope = this;
         this.stats = {
            actions: {
               get total() {
                  return scope._actions.length;
               },
               get inUse() {
                  return scope._nActiveActions;
               }
            },
            bindings: {
               get total() {
                  return scope._bindings.length;
               },
               get inUse() {
                  return scope._nActiveBindings;
               }
            },
            controlInterpolants: {
               get total() {
                  return scope._controlInterpolants.length;
               },
               get inUse() {
                  return scope._nActiveControlInterpolants;
               }
            }
         };
      }
      // Memory management for AnimationAction objects
      public _isActiveAction(action) {
         var index = action._cacheIndex;
         return index !== null && index < this._nActiveActions;
      }
      public _addInactiveAction(action, clipUuid, rootUuid) {
         var actions = this._actions,
            actionsByClip = this._actionsByClip,
            actionsForClip = actionsByClip[clipUuid];
         if (actionsForClip === undefined) {
            actionsForClip = {
               knownActions: [action],
               actionByRoot: {}
            };
            action._byClipCacheIndex = 0;
            actionsByClip[clipUuid] = actionsForClip;
         } else {
            var knownActions = actionsForClip.knownActions;
            action._byClipCacheIndex = knownActions.length;
            knownActions.push(action);
         }
         action._cacheIndex = actions.length;
         actions.push(action);
         actionsForClip.actionByRoot[rootUuid] = action;
      }
      public _removeInactiveAction(action) {
         var actions = this._actions,
            lastInactiveAction = actions[actions.length - 1],
            cacheIndex = action._cacheIndex;
         lastInactiveAction._cacheIndex = cacheIndex;
         actions[cacheIndex] = lastInactiveAction;
         actions.pop();
         action._cacheIndex = null;

         var clipUuid = action._clip.uuid,
            actionsByClip = this._actionsByClip,
            actionsForClip = actionsByClip[clipUuid],
            knownActionsForClip = actionsForClip.knownActions,
            lastKnownAction =
               knownActionsForClip[knownActionsForClip.length - 1],
            byClipCacheIndex = action._byClipCacheIndex;
         lastKnownAction._byClipCacheIndex = byClipCacheIndex;
         knownActionsForClip[byClipCacheIndex] = lastKnownAction;
         knownActionsForClip.pop();
         action._byClipCacheIndex = null;

         var actionByRoot = actionsForClip.actionByRoot,
            rootUuid = (action._localRoot || this._root).uuid;
         delete actionByRoot[rootUuid];
         if (knownActionsForClip.length === 0) {
            delete actionsByClip[clipUuid];
         }
         this._removeInactiveBindingsForAction(action);
      }
      public _removeInactiveBindingsForAction(action) {
         var bindings = action._propertyBindings;
         for (var i = 0, n = bindings.length; i !== n; ++i) {
            var binding = bindings[i];
            if (--binding.referenceCount === 0) {
               this._removeInactiveBinding(binding);
            }
         }
      }
      public _lendAction(action) {
         // [ active actions |  inactive actions  ]
         // [  active actions >| inactive actions ]
         //                 s        a
         //                  <-swap->
         //                 a        s
         var actions = this._actions,
            prevIndex = action._cacheIndex,
            lastActiveIndex = this._nActiveActions++,
            firstInactiveAction = actions[lastActiveIndex];
         action._cacheIndex = lastActiveIndex;
         actions[lastActiveIndex] = action;
         firstInactiveAction._cacheIndex = prevIndex;
         actions[prevIndex] = firstInactiveAction;
      }
      public _takeBackAction(action) {
         // [  active actions  | inactive actions ]
         // [ active actions |< inactive actions  ]
         //        a        s
         //         <-swap->
         //        s        a
         var actions = this._actions,
            prevIndex = action._cacheIndex,
            firstInactiveIndex = --this._nActiveActions,
            lastActiveAction = actions[firstInactiveIndex];
         action._cacheIndex = firstInactiveIndex;
         actions[firstInactiveIndex] = action;
         lastActiveAction._cacheIndex = prevIndex;
         actions[prevIndex] = lastActiveAction;
      }
      // Memory management for PropertyMixer objects
      public _addInactiveBinding(binding, rootUuid, trackName) {
         var bindingsByRoot = this._bindingsByRootAndName,
            bindingByName = bindingsByRoot[rootUuid],
            bindings = this._bindings;
         if (bindingByName === undefined) {
            bindingByName = {};
            bindingsByRoot[rootUuid] = bindingByName;
         }
         bindingByName[trackName] = binding;
         binding._cacheIndex = bindings.length;
         bindings.push(binding);
      }
      public _removeInactiveBinding(binding) {
         var bindings = this._bindings,
            propBinding = binding.binding,
            rootUuid = propBinding.rootNode.uuid,
            trackName = propBinding.path,
            bindingsByRoot = this._bindingsByRootAndName,
            bindingByName = bindingsByRoot[rootUuid],
            lastInactiveBinding = bindings[bindings.length - 1],
            cacheIndex = binding._cacheIndex;
         lastInactiveBinding._cacheIndex = cacheIndex;
         bindings[cacheIndex] = lastInactiveBinding;
         bindings.pop();
         delete bindingByName[trackName];
         remove_empty_map: {
            for (var _ in bindingByName) break remove_empty_map; // eslint-disable-line no-unused-vars
            delete bindingsByRoot[rootUuid];
         }
      }
      public _lendBinding(binding) {
         var bindings = this._bindings,
            prevIndex = binding._cacheIndex,
            lastActiveIndex = this._nActiveBindings++,
            firstInactiveBinding = bindings[lastActiveIndex];
         binding._cacheIndex = lastActiveIndex;
         bindings[lastActiveIndex] = binding;
         firstInactiveBinding._cacheIndex = prevIndex;
         bindings[prevIndex] = firstInactiveBinding;
      }
      public _takeBackBinding(binding) {
         var bindings = this._bindings,
            prevIndex = binding._cacheIndex,
            firstInactiveIndex = --this._nActiveBindings,
            lastActiveBinding = bindings[firstInactiveIndex];
         binding._cacheIndex = firstInactiveIndex;
         bindings[firstInactiveIndex] = binding;
         lastActiveBinding._cacheIndex = prevIndex;
         bindings[prevIndex] = lastActiveBinding;
      }

      // Memory management of Interpolants for weight and time scale
      public _lendControlInterpolant() {
         var interpolants = this._controlInterpolants,
            lastActiveIndex = this._nActiveControlInterpolants++,
            interpolant = interpolants[lastActiveIndex];
         if (interpolant === undefined) {
            interpolant = new LinearInterpolant(
               new Float32Array(2), new Float32Array(2),
               1, this._controlInterpolantsResultBuffer);
            interpolant.__cacheIndex = lastActiveIndex;
            interpolants[lastActiveIndex] = interpolant;
         }
         return interpolant;
      }
      public _takeBackControlInterpolant(interpolant) {
         var interpolants = this._controlInterpolants,
            prevIndex = interpolant.__cacheIndex,
            firstInactiveIndex = --this._nActiveControlInterpolants,
            lastActiveInterpolant = interpolants[firstInactiveIndex];
         interpolant.__cacheIndex = firstInactiveIndex;
         interpolants[firstInactiveIndex] = interpolant;
         lastActiveInterpolant.__cacheIndex = prevIndex;
         interpolants[prevIndex] = lastActiveInterpolant;
      }


      // return an action for a clip optionally using a custom root target
      // object (this method allocates a lot of dynamic memory in case a
      // previously unknown clip/root combination is specified)
      public clipAction(clip, optionalRoot) {
         var root = optionalRoot || this._root,
            rootUuid = root.uuid,
            clipObject = typeof clip === 'string' ?
               AnimationClip.findByName(root, clip) : clip,
            clipUuid = clipObject !== null ? clipObject.uuid : clip,
            actionsForClip = this._actionsByClip[clipUuid],
            prototypeAction = null;
         if (actionsForClip !== undefined) {
            var existingAction =
               actionsForClip.actionByRoot[rootUuid];
            if (existingAction !== undefined) {
               return existingAction;
            }
            // we know the clip, so we don't have to parse all
            // the bindings again but can just copy
            prototypeAction = actionsForClip.knownActions[0];
            // also, take the clip from the prototype action
            if (clipObject === null)
               clipObject = prototypeAction._clip;
         }
         // clip must be known when specified via string
         if (clipObject === null) return null;
         // allocate all resources required to run it
         var newAction = new AnimationAction(this, clipObject, optionalRoot);
         this._bindAction(newAction, prototypeAction);
         // and make the action known to the memory manager
         this._addInactiveAction(newAction, clipUuid, rootUuid);
         return newAction;
      }
      // get an existing action
      public existingAction(clip, optionalRoot) {
         var root = optionalRoot || this._root,
            rootUuid = root.uuid,
            clipObject = typeof clip === 'string' ?
               AnimationClip.findByName(root, clip) : clip,
            clipUuid = clipObject ? clipObject.uuid : clip,
            actionsForClip = this._actionsByClip[clipUuid];
         if (actionsForClip !== undefined) {
            return actionsForClip.actionByRoot[rootUuid] || null;
         }
         return null;
      }
      // deactivates all previously scheduled actions
      public stopAllAction() {
         var actions = this._actions,
            nActions = this._nActiveActions,
            bindings = this._bindings,
            nBindings = this._nActiveBindings;
         this._nActiveActions = 0;
         this._nActiveBindings = 0;
         for (var i = 0; i !== nActions; ++i) {
            actions[i].reset();
         }
         for (var i = 0; i !== nBindings; ++i) {
            bindings[i].useCount = 0;
         }
         return this;
      }
      // advance the time and update apply the animation
      public update(deltaTime) {
         deltaTime *= this.timeScale;
         var actions = this._actions,
            nActions = this._nActiveActions,
            time = this.time += deltaTime,
            timeDirection = Math.sign(deltaTime),
            accuIndex = this._accuIndex ^= 1;
         // run active actions
         for (var i = 0; i !== nActions; ++i) {
            var action = actions[i];
            action._update(time, deltaTime, timeDirection, accuIndex);
         }
         // update scene graph
         var bindings = this._bindings,
            nBindings = this._nActiveBindings;
         for (var i = 0; i !== nBindings; ++i) {
            bindings[i].apply(accuIndex);
         }
         return this;
      }
      // return this mixer's root target object
      public getRoot() {
         return this._root;
      }
      // free all resources specific to a particular clip
      public uncacheClip(clip) {
         var actions = this._actions,
            clipUuid = clip.uuid,
            actionsByClip = this._actionsByClip,
            actionsForClip = actionsByClip[clipUuid];
         if (actionsForClip !== undefined) {
            // note: just calling _removeInactiveAction would mess up the
            // iteration state and also require updating the state we can
            // just throw away
            var actionsToRemove = actionsForClip.knownActions;
            for (var i = 0, n = actionsToRemove.length; i !== n; ++i) {
               var action = actionsToRemove[i];
               this._deactivateAction(action);
               var cacheIndex = action._cacheIndex,
                  lastInactiveAction = actions[actions.length - 1];
               action._cacheIndex = null;
               action._byClipCacheIndex = null;
               lastInactiveAction._cacheIndex = cacheIndex;
               actions[cacheIndex] = lastInactiveAction;
               actions.pop();
               this._removeInactiveBindingsForAction(action);
            }
            delete actionsByClip[clipUuid];
         }
      }
      // free all resources specific to a particular root target object
      public uncacheRoot(root) {
         var rootUuid = root.uuid,
            actionsByClip = this._actionsByClip;
         for (var clipUuid in actionsByClip) {
            var actionByRoot = actionsByClip[clipUuid].actionByRoot,
               action = actionByRoot[rootUuid];
            if (action !== undefined) {
               this._deactivateAction(action);
               this._removeInactiveAction(action);
            }
         }
         var bindingsByRoot = this._bindingsByRootAndName,
            bindingByName = bindingsByRoot[rootUuid];
         if (bindingByName !== undefined) {
            for (var trackName in bindingByName) {
               var binding = bindingByName[trackName];
               binding.restoreOriginalState();
               this._removeInactiveBinding(binding);
            }
         }
      }
      // remove a targeted clip from the cache
      public uncacheAction(clip, optionalRoot) {
         var action = this.existingAction(clip, optionalRoot);
         if (action !== null) {
            this._deactivateAction(action);
            this._removeInactiveAction(action);
         }
      }
   }
}
