var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/**
 *  Database Connectivity
 */
var db;
connectDB();

/* LO: Connect to MySql DB with NodeJS using nodejs-mysql driver plugin (https://github.com/felixge/node-mysql)*/
/* LO : Using the openshift api variables as mysql db values. */
function connectDB() {
  db = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '',
    database: 'murphy'
  });

  /* LO: Connect to openshift remote mysql db on localhost, though port forwarding */
  //mysql -u admineajrzyG -pduXjWWy5GKh7 -h 127.5.120.130 murphy 

  /* LO: Start mysql on OS X Yosemite */
  //For local mysql, Start mysql from system preferenece on mac.
  //export PATH=${PATH}:/usr/local/mysql/bin

  db.connect(function (err) {
    if (err) {
      throw err;
    } else {
      console.log('Connected');
    }
  });
}

/* ADD person listing. */
router.post('/person/add', function (req, res, next) {
  /* TODO: Use clean Insert query provided by nodejs-mysql module */
  db.query("INSERT INTO person (first_name, last_name, email, mobile) VALUES ('" + req.body.first_name + "', '" + (req.body.last_name || "") + "', '" + (req.body.email || "") + "', '" + (req.body.phone || "") + "')", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.get('/person/all', function (req, res, next) {

  db.query("SELECT * FROM person WHERE 1 ORDER BY person_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});

router.post('/person/delete', function (req, res, next) {

  db.query("DELETE FROM person WHERE person_id = '" + req.body.person_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.post('/person/update', function (req, res, next) {
  /* TODO: Use clean Update query provided by nodejs-mysql module */
  db.query("UPDATE person SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "', email='" + req.body.email + "', mobile='" + req.body.mobile + "' WHERE person_id = '" + req.body.person_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});


/* ADD role listing. */
router.post('/role/add', function (req, res, next) {

  /* TODO: Use clean Insert query provided by nodejs-mysql module */
  db.query("INSERT INTO role (role_name, role_desc) VALUES ('" + req.body.role_name + "', '" + (req.body.role_desc || "") + "')", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.get('/role/all', function (req, res, next) {

  db.query("SELECT * FROM role WHERE 1 ORDER BY role_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});

router.post('/role/delete', function (req, res, next) {

  db.query("DELETE FROM role WHERE role_id = '" + req.body.role_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.post('/role/update', function (req, res, next) {

  /* TODO: Use clean Update query provided by nodejs-mysql module */
  db.query("UPDATE role SET role_name='" + req.body.role_name + "', role_desc='" + req.body.role_desc + "' WHERE role_id = '" + req.body.role_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});


/* ADD shift listing. */
router.post('/shift/add', function (req, res, next) {

  /* TODO: Use clean Insert query provided by nodejs-mysql module */
  db.query("INSERT INTO shift (shift_name, shift_desc) VALUES ('" + req.body.shift_name + "', '" + (req.body.shift_desc || "") + "')", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.get('/shift/all', function (req, res, next) {

  db.query("SELECT * FROM shift WHERE 1 ORDER BY shift_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});

router.post('/shift/delete', function (req, res, next) {

  db.query("DELETE FROM shift WHERE shift_id = '" + req.body.shift_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.post('/shift/update', function (req, res, next) {

  /* TODO: Use clean Update query provided by nodejs-mysql module */
  db.query("UPDATE shift SET shift_name='" + req.body.shift_name + "', shift_desc='" + req.body.shift_desc + "' WHERE shift_id = '" + req.body.shift_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});


/* ADD location listing. */
router.post('/location/add', function (req, res, next) {

  /* TODO: Use clean Insert query provided by nodejs-mysql module */
  db.query("INSERT INTO location (location_name, location_desc) VALUES ('" + req.body.location_name + "', '" + (req.body.location_desc || "") + "')", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.get('/location/all', function (req, res, next) {

  db.query("SELECT * FROM location WHERE 1 ORDER BY location_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});

router.post('/location/delete', function (req, res, next) {

  db.query("DELETE FROM location WHERE location_id = '" + req.body.location_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});

router.post('/location/update', function (req, res, next) {

  /* TODO: Use clean Update query provided by nodejs-mysql module */
  db.query("UPDATE location SET location_name='" + req.body.location_name + "', location_desc='" + req.body.location_desc + "' WHERE location_id = '" + req.body.location_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success"}');
    }
  });
});


/* ADD rota listing. */
router.post('/rota/add', function (req, res, next) {

  /* TODO: Use clean Insert query provided by nodejs-mysql module */
  db.query("INSERT INTO rota (rota_name, rota_desc, rota_start, rota_end) VALUES ('" + req.body.rota_name + "', '" + (req.body.rota_desc || "") + "', '" + (req.body.rota_start) + "', '" + (req.body.rota_end) + "')" , function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      var values = [];
      for (var i = 0; i < req.body.rows.length; i++) {
        values[i] = [rows.insertId, req.body.rows[i].person_id, req.body.rows[i].role_id, req.body.rows[i].location_id, req.body.rows[i].shift_id, req.body.rows[i].rota_mapper_start, req.body.rows[i].rota_mapper_end];
      }
      /* LO: Multiple insert query */
      db.query("INSERT INTO rota_mapper (rota_id, person_id, role_id, location_id, shift_id, rota_mapper_start, rota_mapper_end) VALUES ?", [values], function (err) {
        if (err) {
          res.send('{"status": "error"}');
        } else {
          res.send('{"status": "success"}');
        }
      });
    }
  });
});

router.get('/rota/all', function (req, res, next) {

  db.query("SELECT * FROM rota WHERE 1 ORDER BY rota_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});

router.get('/rota/all-detailed', function (req, res, next) {

  db.query("SELECT * FROM rota WHERE 1 ORDER BY rota_id DESC", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {

      var response = rows;
      response.forEach(function (each_response, i) {
        db.query("SELECT * FROM rota_mapper WHERE rota_id = " + response[i].rota_id + " ORDER BY rota_mapper_id ASC", function (err, rows, fields) {
          response[i].rows = rows;
          response[i].rows.forEach(function (each_row, j) {
            db.query("SELECT first_name, last_name FROM person WHERE person_id = " + each_row.person_id, function (err, rows, fields) {
              response[i].rows[j].person_name = rows[0].first_name + ' ' + rows[0].last_name;

              db.query("SELECT location_name FROM location WHERE location_id = " + each_row.location_id, function (err, rows, fields) {
                response[i].rows[j].location_name = rows[0].location_name;

                db.query("SELECT role_name FROM role WHERE role_id = " + each_row.role_id, function (err, rows, fields) {
                  response[i].rows[j].role_name = rows[0].role_name;

                  db.query("SELECT shift_name FROM shift WHERE shift_id = " + each_row.shift_id, function (err, rows, fields) {
                    response[i].rows[j].shift_name = rows[0].shift_name;

                    if (i === (response.length - 1) && j === (response[i].rows.length - 1)) {
                      res.send('{"status": "success", "data" : ' + JSON.stringify(response) + '}');
                    }
                  });
                });
              });
            });
          });
        });
      });
    }
  });
});


/* LO: ExpressJS, routing with param */
router.get('/rota/all/:id', function (req, res, next) {

  db.query("SELECT * FROM rota_mapper WHERE rota_id = '" + req.params.id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      res.send('{"status": "success", "data" : ' + JSON.stringify(rows) + '}');
    }
  });
});


router.post('/rota/delete', function (req, res, next) {

  db.query("DELETE FROM rota WHERE rota_id = '" + req.body.rota_id + "'", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      db.query("DELETE FROM rota_mapper WHERE rota_id = '" + req.body.rota_id + "'", function (err, rows, fields) {
        if (err) {
          throw err;
          res.send('{"status": "error"}');
        } else {
          res.send('{"status": "success"}');
        }
      });
    }
  });
});


router.post('/rota/update', function (req, res, next) {
  /*
  var sql = "UPDATE rota SET rota_name='" + req.body.rota_name + "', rota_desc='" + req.body.rota_desc + "' WHERE rota_id = '" + req.body.rota_id + "';";
  for (var i=0; i<req.body.rows.length; i++) {
    sql = sql + db.format("UPDATE rota_mapper SET ? WHERE rota_mapper_id = ?;", [req.body.rows[i], req.body.rows[i].rota_mapper_id]);
      //sql = sql + "UPDATE rota_mapper SET rota_id = "+req.body.rows[i].rota_id+", person_id = "+req.body.rows[i].person_id+", shift_id = "+req.body.rows[i].shift_id+", location_id = "+req.body.rows[i].location_id+",  WHERE rota_mapper_id = "+req.body.rows[i].shift_id+";"
  }
  */

  /* TODO: Get away with nested queries */
  db.query("UPDATE rota SET rota_name='" + req.body.rota_name + "', rota_desc='" + req.body.rota_desc + "', rota_start='" + req.body.rota_start + "', rota_end='" + req.body.rota_end + "' WHERE rota_id = '" + req.body.rota_id + "'", function () {
    db.query("DELETE FROM rota_mapper WHERE rota_id = '" + req.body.rows[0].rota_id + "'", function (err, rows, fields) {
      var values = [];
      for (var i = 0; i < req.body.rows.length; i++) {
        values[i] = [req.body.rota_id, req.body.rows[i].person_id, req.body.rows[i].role_id, req.body.rows[i].location_id, req.body.rows[i].shift_id, req.body.rows[i].rota_mapper_start, req.body.rows[i].rota_mapper_end];
      }

      db.query("INSERT INTO rota_mapper (rota_id, person_id, role_id, location_id, shift_id, rota_mapper_start, rota_mapper_end) VALUES ?", [values], function (err) {
        if (err) {
          res.send('{"status": "error"}');
        } else {
          res.send('{"status": "success"}');
        }
      });
    });
  });
});



module.exports = router;