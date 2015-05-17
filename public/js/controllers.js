/* TODO: Remove person/location/shift/role data from rota_mapper, if they are deleted from respective table */
/* TODO: Confimartion popup before deletion */
/* TODO: Edit/ Delete All feature */
/* TODO: Restrict Update call if no change has been made */

var app = angular.module('murphy', []);

app.controller('PersonController', function ($http, $rootScope) {

  var self = this;
  this.personDetail = {};
  this.persons = [];

  /* TODO: Make angular service for data calls */
  this.get = function () {
    $http.get('api/person/all')
      .success(function (response) {
        self.persons = response.data;

        /* TODO: Dont use rootscope for data storage */
        $rootScope.rotaAutofill.persons = self.persons;
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

  this.update = function (person_index) {

    $http.post('api/person/update', this.persons[person_index])
      .success(function (response) {
        self.persons[person_index].editmode = false;
      })
      .error(function (error) {});
  };

  this.delete = function (person_index) {

    $http.post('api/person/delete', {
        'person_id': self.persons[person_index].person_id
      })
      .success(function (response) {
        self.persons.splice(person_index, 1);
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.personDetail = {};
  };

  /* TODO: Make data fetching event based */
  this.get();
});

app.controller('RoleController', function ($http, $rootScope) {

  var self = this;
  this.roleDetail = {};
  this.roles = [];

  this.get = function () {
    $http.get('api/role/all')
      .success(function (response) {
        self.roles = response.data;
        $rootScope.rotaAutofill.roles = self.roles;
      });
  };

  this.add = function () {

    if (this.roleDetail.role_name === undefined) return;

    $http.post('api/role/add', this.roleDetail)
      .success(function (response) {
        self.get();
        self.reset();
      })
      .error(function (error) {});
  };

  this.update = function (role_index) {

    $http.post('api/role/update', this.roles[role_index])
      .success(function (response) {
        self.roles[role_index].editmode = false;
      })
      .error(function (error) {});
  };

  this.delete = function (role_index) {

    $http.post('api/role/delete', {
        'role_id': self.roles[role_index].role_id
      })
      .success(function (response) {
        self.roles.splice(role_index, 1);
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.roleDetail = {};
  };

  this.get();

});

app.controller('ShiftController', function ($http, $rootScope) {

  var self = this;
  this.shiftDetail = {};
  this.shifts = [];

  this.get = function () {
    $http.get('api/shift/all')
      .success(function (response) {
        self.shifts = response.data;
        $rootScope.rotaAutofill.shifts = self.shifts;
      });
  };

  this.add = function () {

    if (this.shiftDetail.shift_name === undefined) return;

    $http.post('api/shift/add', this.shiftDetail)
      .success(function (response) {
        self.get();
        self.reset();
      })
      .error(function (error) {});
  };

  this.update = function (shift_index) {

    $http.post('api/shift/update', this.shifts[shift_index])
      .success(function (response) {
        self.shifts[shift_index].editmode = false;
      })
      .error(function (error) {});
  };

  this.delete = function (shift_index) {

    $http.post('api/shift/delete', {
        'shift_id': self.shifts[shift_index].shift_id
      })
      .success(function (response) {
        self.shifts.splice(shift_index, 1);
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.shiftDetail = {};
  };

  this.get();

});

app.controller('LocationController', function ($http, $rootScope) {

  var self = this;
  this.locationDetail = {};
  this.locations = [];

  this.get = function () {
    $http.get('api/location/all')
      .success(function (response) {
        self.locations = response.data;
        $rootScope.rotaAutofill.locations = self.locations;
      });
  };

  this.add = function () {

    if (this.locationDetail.location_name === undefined) return;

    $http.post('api/location/add', this.locationDetail)
      .success(function (response) {
        self.get();
        self.reset();
      })
      .error(function (error) {});
  };

  this.update = function (location_index) {

    $http.post('api/location/update', this.locations[location_index])
      .success(function (response) {
        self.locations[location_index].editmode = false;
      })
      .error(function (error) {});
  };

  this.delete = function (location_index) {

    $http.post('api/location/delete', {
        'location_id': self.locations[location_index].location_id
      })
      .success(function (response) {
        self.locations.splice(location_index, 1);
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.locationDetail = {};
  };

  this.get();

});

/* TODO: Make simpler logic for ROTA actions */
/* TODO: Lessen the number of http calls and db connections*/
app.controller('RotaController', function ($http, $rootScope) {

  $rootScope.rotaAutofill = {};
  var self = this;
  this.rotaDetail = {
    "rows": [{
      "person_id": '',
      "role_id": '',
      "location_id": '',
      "shift_id": ''
    }]
  };
  this.rotas = [];

  /* TODO: Dont use rootscope for data storage */
  /* LO : Use of $rootScope.$watchCollection */
  $rootScope.$watchCollection('rotaDetail', function () {
    self.rotaAutofill = $rootScope.rotaAutofill;
    console.log("self.rotaAutofill", self.rotaAutofill);
  });

  this.get = function () {
    $http.get('api/rota/all')
      .success(function (response) {
        self.rotas = response.data;
      });
  };

  this.add = function () {

    if (this.rotaDetail.rota_name === undefined) return;

    $http.post('api/rota/add', this.rotaDetail)
      .success(function (response) {
        self.get();
        self.reset();
      })
      .error(function (error) {});
  };

  this.edit = function (rota_index) {
    this.editmode = true;
    this.rotaDetail.rota_id = this.rotas[rota_index].rota_id;
    this.rotaDetail.rota_name = this.rotas[rota_index].rota_name;
    this.rotaDetail.rota_desc = this.rotas[rota_index].rota_desc;

    $http.get('api/rota/all/' + this.rotas[rota_index].rota_id)
      .success(function (response) {
        self.rotaDetail.rows = response.data;
        self.rotas[rota_index].rows = response.data;
      })
      .error(function (error) {});
  };

  this.update = function (rota_id) {

    $http.post('api/rota/update', self.rotaDetail)
      .success(function (response) {
        self.reset();
        self.get();
      })
      .error(function (error) {});
  };

  this.delete = function (rota_index) {

    $http.post('api/rota/delete', {
        'rota_id': self.rotas[rota_index].rota_id
      })
      .success(function (response) {
        self.rotas.splice(rota_index, 1);
      })
      .error(function (error) {});
  };

  this.reset = function () {
    this.editmode = false;
    this.rotaDetail = {
      "rows": [{
        "person_id": "",
        "role_id": "",
        "location_id": "",
        "shift_id": ""
      }]
    };
  };

  this.addRow = function () {
    this.rotaDetail.rows.push({
      "person_id": "",
      "role_id": "",
      "location_id": "",
      "shift_id": ""
    });
  };

  this.getRotaDetails = function () {
    $http.get('api/rota/all-detailed')
      .success(function (response) {
        self.rotas = response.data;
      });
  };

  this.initialize = function (page) {
    console.log("this.page", page);
    if (page === 'dashboard') {
      this.get();
    } else {
      this.getRotaDetails();
    }
  }
});