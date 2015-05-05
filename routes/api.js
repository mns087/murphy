var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/**
 *  Database Connectivity
 */
var db;
connectDB();

function connectDB() {
  db = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '',
    database: 'murphy'
  });
  //mysql -u admineajrzyG -pduXjWWy5GKh7 -h 127.5.120.130 murphy 
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

  db.query("INSERT INTO rota (rota_name, rota_desc) VALUES ('" + req.body.rota_name + "', '" + (req.body.rota_desc || "") + "')", function (err, rows, fields) {
    if (err) {
      throw err;
      res.send('{"status": "error"}');
    } else {
      var values = [];
      for (var i=0; i<req.body.rows.length; i++) {
        values[i] = [rows.insertId, req.body.rows[i].person_id, req.body.rows[i].role_id, req.body.rows[i].location_id, req.body.rows[i].shift_id];
      }
      
      db.query("INSERT INTO rota_mapper (rota_id, person_id, role_id, location_id, shift_id) VALUES ?", [values], function(err) {
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

router.get('/rota/all/:id', function (req, res, next) {

  db.query("SELECT * FROM rota_mapper WHERE rota_id = '"+ req.params.id +"'", function (err, rows, fields) {
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
  db.query("UPDATE rota SET rota_name='" + req.body.rota_name + "', rota_desc='" + req.body.rota_desc + "' WHERE rota_id = '" + req.body.rota_id + "'", function () {
    db.query("DELETE FROM rota_mapper WHERE rota_id = '" + req.body.rows[0].rota_id + "'", function (err, rows, fields) {
      var values = [];
      for (var i=0; i<req.body.rows.length; i++) {
        values[i] = [req.body.rota_id, req.body.rows[i].person_id, req.body.rows[i].role_id, req.body.rows[i].location_id, req.body.rows[i].shift_id];
      }
      
      db.query("INSERT INTO rota_mapper (rota_id, person_id, role_id, location_id, shift_id) VALUES ?", [values], function(err) {
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