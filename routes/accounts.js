var express = require('express');
var Account = require('../schemas/account');

var router = express.Router();

// 로그인 시도
router.post('/login', function(req, res, next) {
    Account.find({id: req.body.id, password: req.body.password})
      .then((accounts) => {
        if (accounts.length !== 1){
          res.status(400);
          res.json(`로그인에 실패했습니다.`);
        }
        else
          res.json(`${req.body.id}님이 로그인하셨습니다.`);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  
  });

  // 회원 가입
  router.post('/signup', function(req, res, next) {
    Account.find({$or : [{id: req.body.id}, {email: req.body.email}]})
      .then((accounts) => {
        if (accounts.length !== 0){
          res.status(400);
          res.json(`중복된 아이디 또는 이메일이 존재합니다.`);
        }
        else{

          const account = new Account({
            id: req.body.id,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
          });

          account.save()
            .then((result) => {
              console.log(result, "계정 정보가 생성되었습니다.");
              res.status(201).json(result);
            })
            .catch((err) => {
              console.log(err, "생성에 실패했습니다.");
              next(err);
            })
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  
  });

  // id 중복체크
  router.post('/dupIdCheck', function(req, res, next) {
    Account.find({id: req.body.id})
      .then((accounts) => {
        if (accounts.length !== 0){ // 중복이 존재
          res.status(201).json(false);
        }
        else{ // 중복이 없음
          res.status(201).json(true);
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });

  // email 중복체크
  router.post('/dupEmailCheck', function(req, res, next) {
    Account.find({email: req.body.email})
      .then((accounts) => {
        if (accounts.length !== 0){ // 중복이 존재
          res.status(201).json(false);
        }
        else{ // 중복이 없음
          res.status(201).json(true);
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });

module.exports = router;