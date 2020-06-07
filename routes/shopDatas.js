var express = require('express');
var fs = require('fs');
var ShopData = require('../schemas/shopData');
var router = express.Router();


/* GET users listing. */

router.get('/search/word/:name', function (req, res, next) {
  ShopData.find({ name: { $regex: decodeURI(req.params.name === 'allgoods' ? '' : req.params.name) } })
    .then((goods) => {
      if (goods.length === 0) {
        res.status(400);
        res.json(`상품 검색에 실패했습니다.`);
      }
      else {
        res.status(200);
        res.json(goods);
        console.log(`${goods.length}개의 상품 정보가 검색되었습니다.`);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/search/etc/:kind1/:kind2/:saleMore/:saleLess', function (req, res, next) {

  let searchWord = {};
  console.log(`kind1 : ${req.params.kind1}, kind2 : ${req.params.kind2}, saleMore : ${req.params.saleMore}, saleLess : ${req.params.saleLess}`);
  if (req.params.kind1 !== "all") searchWord = { ...searchWord, kind1: req.params.kind1 };
  if (req.params.kind2 !== "all") searchWord = { ...searchWord, kind2: req.params.kind2 };
  if (req.params.saleMore !== "0" && req.params.saleLess !== "0")
    searchWord = { ...searchWord, sale: { $gte: req.params.saleMore, $lte: req.params.saleLess } };
  else{
    if (req.params.saleMore !== "0") searchWord = { ...searchWord, sale: { $gte: parseInt(req.params.saleMore) } };
    if (req.params.saleLess !== "0") searchWord = { ...searchWord, sale: { $lte: parseInt(req.params.saleLess) } };
  };

  ShopData.find(searchWord).sort({ createdAt: -1 })
    .then((goods) => {
      if (goods.length === 0) {
        res.status(400);
        res.json(`상품 검색에 실패했습니다.`);
      }
      else {
        res.status(200);
        res.json(goods);
        console.log(`${goods.length}개의 상품 정보가 검색되었습니다.`);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/:kind1', function (req, res, next) {
  ShopData.find({ kind1: req.params.kind1 }).sort({ createdAt: -1 })
    .then((goods) => {
      if (goods.length === 0) {
        res.status(400);
        res.json(`상품 검색에 실패했습니다.`);
      }
      else {
        res.status(200);
        res.json(goods);
        console.log(`${goods.length}개의 상품 정보가 검색되었습니다.`);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/:kind1/:kind2', function (req, res, next) {
  ShopData.find({ kind1: req.params.kind1, kind2: req.params.kind2 }).sort({ createdAt: -1 })
    .then((goods) => {
      if (goods.length === 0) {
        res.status(400);
        res.json(`상품 검색에 실패했습니다.`);
      }
      else {
        res.status(200);
        res.json(goods);
        console.log(`${goods.length}개의 상품 정보가 검색되었습니다.`);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


/*
router.get('/images/:id', function(req, res, next) {
    fs.readFile(`./public/images/${req.params.id}`,              //파일 읽기
        function (err, data)
        {
            res.writeHead(200, { "Context-Type": "image/jpg" });//보낼 헤더를 만듬
            res.write(data);   //본문을 만들고
            res.end();  //클라이언트에게 응답을 전송한다
            
            console.log(req.params.id);
        }
    );
});
*/
module.exports = router;