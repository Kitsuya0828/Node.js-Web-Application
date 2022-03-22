const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ak_alvin0828',
  database: 'todo_app'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('tasks')
    .select('*')
    .then(function (results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Todo App',
      });
    });

  // connection.query(
  //   `select * from tasks;`,
  //   (error, results) => {
  //     console.log(error);
  //     console.log(results);
  //     res.render('index', {
  //       title: 'ToDo App',
  //       todos: results,
  //     });
  //   }
  // );
});

router.post('/', function(req, res, next) {
  const todo = req.body.add;
  knex('tasks')
    .insert({user_id: 1, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
      });
    });

  // connection.connect((err) => {
  //   if (err) {
  //     console.log('error connecting: ' + err.stack);
  //     return
  //   }
  //   console.log('success');
  // });
  // const todo = req.body.add;
  // connection.query(
  //   `insert into tasks (user_id, content) values (1, '${todo}');`,
  //   (error, results) => {
  //     console.log(error);
  //     res.redirect('/');
  //   }
  // );
});

module.exports = router;
