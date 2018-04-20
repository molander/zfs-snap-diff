angular.module('zsdSnapshots', []).
  directive('zsdSnapshots', ['$location', '$anchorScroll', '$rootScope', '$scope', 'Backend', function ($location, $anchorScroll, $rootScope, $scope, Backend) {
    return {
      restrict: 'E',
      templateUrl: 'template-snapshots.html',
      scope: {
        snapshots: '=',
        title: '@',
        onSnapshotSelected: '&'
      },
      link: function (scope, element, attrs) {

        scope.snapshotSelected = function (snap) {
          //scope.hideSnapshots = true;

          scope.curSnap = snap;
          scope.onSnapshotSelected({ snap: snap });

        };


        // restore the file from the selected snapshot
        scope.restoreSnapshot = function ($event, snap) {
          $event.preventDefault();


          var r = confirm("Are you sure you'd like to rollback?  Push OK to proceed.");
          if (r == true) {
            Backend.restoreSnapshot($scope.curSnap.Name).then(function (res) {
              $rootScope.$broadcast('zsd:success', res);
              $scope.lastAction()
            }).catch((err) => {
              var string = JSON.stringify(err);
              alert("Error occured: " + string);
            });
  ;
          }

        }

        scope.toggleHideSnapshots = function () {
          scope.hideSnapshots = !scope.hideSnapshots;
        };

        scope.showNewerSnapDisabled = function () {
          return snapUninitialized() || scope.snapshots.indexOf(scope.curSnap) === 0
        };

        scope.showOlderSnapDisabled = function () {
          return snapUninitialized() || scope.snapshots.indexOf(scope.curSnap) === scope.snapshots.length - 1;
        };

        scope.showOlderSnap = function () {
          var idx = scope.snapshots.indexOf(scope.curSnap);
          scope.snapshotSelected(scope.snapshots[idx + 1]);
        };

        scope.showNewerSnap = function () {
          var idx = scope.snapshots.indexOf(scope.curSnap);
          scope.snapshotSelected(scope.snapshots[idx - 1]);
        };

        scope.$watch('snapshots', function () {
          // new file selected
          scope.hideSnapshots = false;
        });

        function snapUninitialized() {
          return typeof scope.curSnap === 'undefined' || typeof scope.snapshots === 'undefined';
        }
      }
    };
  }]);
