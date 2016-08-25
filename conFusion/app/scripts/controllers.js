'use strict';
angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';

  $scope.showDetails = false;

  

  $scope.dishes = menuFactory.getDishes();

  $scope.select = function (setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    }
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function () {
    $scope.showDetails = !$scope.showDetails;
  };

}])

  .controller('ContactController', ['$scope', function ($scope) {
    $scope.feedback = {
      mychannel: "",
      firstName: "",
      lastName: "",
      agree: false,
      email: ""
    };
    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', function ($scope) {
    $scope.sendFeedback = function () {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      } else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    }
  }])

  .controller('dishDetailController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    var filter = '';
    
    var dish = menuFactory.getDish(3);

    var rating = {
      name: "",
      rating: 5,
      comment: "",
      date: new Date()
    };  

    var sendRating = function(){

      var newRating = {
        rating: rating.rating,
        comment: rating.comment,
        author: rating.name,
        date: rating.date
      }

      rating.name = "";
      rating.rating = 5;
      rating.comment = "";
      rating.date = new Date();

      //set the pristines
      $scope.ratingForm.$setPristine();

      dish.comments.push(newRating);
    }

    $scope.sendRating = sendRating;
    $scope.rating = rating;
    $scope.dish = dish;
    $scope.filter = filter;
  }]);