'use strict';

var _ = require('lodash');

angular.module('calcentral.controllers').controller('FinaidProfileController', function(finaidProfileFactory, $scope, $routeParams, $rootScope, $route) {
  $scope.finaidProfile = {
    isLoading: true
  };

  var getFinaidProfile = function(options) {
    return finaidProfileFactory.getFinaidProfile(options).then(
      function successCallback(response) {
        console.log('This is Major Tom to Ground Control ', response);
        var finaidProfile = _.get(response, 'data.finaidProfile');
        $scope.finaidProfile = finaidProfile;
        if ($scope.finaidProfile.categories[0]) {
          _.set($scope.finaidProfile.categories[0], 'show', true);
        }
        $scope.finaidProfile.isLoading = false;
      }
    );
  };

  getFinaidProfile({finaidYear: $routeParams.finaidYearId});

  // $rootScope.$on('calcentral.custom.api.finaid.approvals', function() {
  //   console.log("Ground Control to Major Tom");
  //   getFinaidProfile({
  //     finaidYear: $routeParams.finaidYearId,
  //     refreshCache: true
  //   });
  // });

  var doBingo = function() {
    console.log('bingo');
    getFinaidProfile({
      finaidYear: $routeParams.finaidYearId,
      refreshCache: true
    });
    // $route.reload();
  };
  $rootScope.$on('bingo', doBingo);
});
