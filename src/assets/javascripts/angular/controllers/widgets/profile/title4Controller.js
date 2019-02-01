'use strict';

var _ = require('lodash');

angular.module('calcentral.controllers').controller('Title4Controller', function($location, title4Factory, $rootScope, $scope) {
  $scope.title4 = {
    isLoading: true,
    showMessage: false,
    viaProfile: false
  };

  // var sendEvent = function() {
  //   // $rootScope.$broadcast('calcentral.custom.api.finaid.approvals');
  //   $rootScope.$broadcast('bingo');
  // };

  $scope.sendResponseT4 = function(response) {
    $scope.title4.isLoading = true;
    $scope.title4.showMessage = false;
    title4Factory.postT4Response(response).then(function() {
      getTitle4({
        refreshCache: true
      });
    })
    // .then(sendEvent);
  };

  var getTitle4 = function(options) {
    return title4Factory.getTitle4(options).then(
      function successCallback({ data }) {
        $scope.title4 = data.title4;
        $scope.title4.isLoading = false;
        $scope.title4.viaProfile = $location.path() === '/profile/title4' ? true : false;
      }
    );
  };

  getTitle4();

  // // $scope.$on('calcentral.custom.api.finaid.approvals', function() {
  // $scope.$on('bingo', function() {
  //   getTitle4({
  //     refreshCache: true
  //   });
  // });
});
