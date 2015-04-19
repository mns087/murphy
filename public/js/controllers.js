var app = angular.module('murphy', []);

app.controller('CreatePerson', function ($http) {

  var self = this;
  this.personDetail = {};

  this.persons = [{
    'first_name': 'Person 1'
  }, {
    'first_name': 'Person 2'
  }, {
    'first_name': 'Person 3'
  }, {
    'first_name': 'Person 4'
  }];


  this.get = function () {
    $http.get('api/person/all')
      .success(function (response) {
        self.persons = response.data;
      });
  };

  this.add = function () {

    $http.post('api/person/add', this.personDetail)
      .success(function (response) {
        self.get();
      })
      .error(function (error) {});
  };

  this.get();
});