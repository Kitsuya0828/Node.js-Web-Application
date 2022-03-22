const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Ak_alvin0828',
//   database: 'todo_app'
// });

/* GET home page. */
router.get('/', function(req, res, next) {

  // const isAuth = Boolean(userId);
  const isAuth = req.isAuthenticated();
  // console.log(`isAuth: ${isAuth}`);

  if (isAuth) {
    const userId = req.user.id;
    knex('tasks')
    .select('*')
    .where({user_id: userId})
    .then(function (results) {
      // console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Todo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });

  } else {
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }

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
  const userId = req.user.id;
  // const isAuth = Boolean(userId);
  const isAuth = req.isAuthenticated();;
  const todo = req.body.add;

  knex('tasks')
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
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

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));


module.exports = router;
