angular.module('zsdSnapshots', []).
  directive('zsdSnapshots', ['$location', '$anchorScroll', function($location, $anchorScroll){
    return {
      restrict: 'E',
      templateUrl: 'template-snapshots.html',
      scope: {
        snapshots: '=',
        title: '@',
        onSnapshotSelected: '&'
      },
      link: function(scope, element, attrs){
        scope.restoreFullSnapshot = function($event, snap) {
          $event.preventDefault();
          alert("howdy:" + snap.Name );
        };

        scope.snapshotSelected = function(snap){
          //scope.hideSnapshots = true;

          snap = undefined;
          scope.curSnap = snap;
          scope.onSnapshotSelected({snap: snap});
          
        };
        
        scope.toggleHideSnapshots = function(){
          scope.hideSnapshots = ! scope.hideSnapshots;
        };

        scope.showNewerSnapDisabled = function(){
          return snapUninitialized() || scope.snapshots.indexOf(scope.curSnap) === 0
        };
        
        scope.showOlderSnapDisabled = function(){
          return snapUninitialized() || scope.snapshots.indexOf(scope.curSnap) === scope.snapshots.length - 1;
        };
        
        scope.showOlderSnap = function(){
          var idx = scope.snapshots.indexOf(scope.curSnap);
          scope.snapshotSelected(scope.snapshots[idx + 1]);
        };

        scope.showNewerSnap = function(){
          var idx = scope.snapshots.indexOf(scope.curSnap);
          scope.snapshotSelected(scope.snapshots[idx - 1]);
        };

        scope.$watch('snapshots', function(){
          // new file selected
          scope.hideSnapshots = false;
        });

        function snapUninitialized(){
          return typeof scope.curSnap === 'undefined' || typeof scope.snapshots === 'undefined';
        }
      }
    };
  }]);
