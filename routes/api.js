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

module.exports = router;