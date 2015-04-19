var app = angular.module('murphy', []);

app.controller('CreatePerson', function ($http) {

  var self = this;
  this.personDetail = {};
  this.persons = [];


  this.get = function () {
    $http.get('api/person/all')
      .success(function (response) {
        self.persons = response.data;
      });
  };

  this.add = function () {

    if (this.personDetail.first_name === undefined) return;

    $http.post('api/person/add', this.personDetail)
      .success(function (response) {
        self.get();
        self.reset();
      })
      .error(function (error) {});
  };

  this.update = function () {

    $http.post('api/person/add', this.personDetail)
      .success(function (response) {
        self.get();
      })
      .error(function (error) {});
  };

  this.delete = function (person_id) {

    $http.post('api/person/delete', {
        'person_id': person_id
      })
      .success(function (response) {
        self.get();
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.personDetail = {};
  };

  this.get();
});