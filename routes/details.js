var express = require('express');
var Detail = require('../schemas/detail');
var router = express.Router();

/* GET users listing. */

router.get('/:name', function (req, res, next) {
  // decodeURI를 쓰는 이유 : 주소를 통해 한글을 송수신하기 위해
  Detail.find({ name: decodeURI(req.params.name) })
    .then((goodsInfo) => {
      if (goodsInfo.length === 0) {
        res.status(400);
        res.json(`상품 검색에 실패했습니다.`);
      }
      else {
        res.status(200);
        res.json(goodsInfo);
        console.log(`${goodsInfo.length}개의 상품 정보가 검색되었습니다.`);
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 리뷰 삭제
router.post('/comments/delete', function (req, res, next) {
  Detail.find({ name: req.body.goodsname })
    .then((detail) => {
      if (detail.length === 0) {
        res.status(400);
        res.json(`상품을 찾을 수 없습니다`);
      }
      else if (detail.length === 1) {
        console.log(detail[0]);
        let comments = detail[0].comments;
        comments = comments.filter((info) =>
          !(info.username === req.body.username &&
            info.size === req.body.size &&
            info.date === req.body.date &&
            info.indexKey === req.body.indexKey)
        );
        if (comments.length !== detail[0].comments.length)
          console.log("1개의 리뷰가 제거되었습니다.");
        Detail.update({ name: decodeURI(req.body.goodsname) }, { $set: { comments: comments } })
          .then((result) => {
            console.log(result, "리뷰를 삭제했습니다.");
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err, "리뷰 삭제에 실패했습니다.");
            next(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 리뷰 등록
router.post('/comments/push', function (req, res, next) {
  Detail.find({ name: req.body.goodsname })
    .then((detail) => {
      if (detail.length === 0) {
        res.status(400);
        res.json(`상품을 찾을 수 없습니다`);
      }
      else if (detail.length === 1) {
        console.log(detail[0]);
        const comments = detail[0].comments;
        comments.unshift(
          {
            username: req.body.username,
            size: req.body.size,
            ment: req.body.ment,
            like: req.body.like,
            indexKey: req.body.indexKey,
            date: req.body.date,
            likeMembers: [],
          }
        );
        Detail.update({ name: decodeURI(req.body.goodsname) }, { $set: { comments: comments } })
          .then((result) => {
            console.log(result, "리뷰가 업데이트 되었습니다.");
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err, "리뷰 업데이트에 실패했습니다.");
            next(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 좋아요 변경
router.post('/comments/like', function (req, res, next) {
  Detail.find({ name: req.body.goodsname })
    .then((detail) => {
      if (detail.length === 0) {
        res.status(400);
        res.json(`상품을 찾을 수 없습니다`);
      }
      else if (detail.length === 1) {
        let comments = detail[0].comments;
        comments.map((info) => {
          if (info.username === req.body.username &&
            info.size === req.body.size &&
            info.date === req.body.date &&
            info.indexKey === req.body.indexKey) {
            if (info.likeMembers === undefined) {
              info.likeMembers = [req.body.loginname];
              info.like += 1;
            }
            else {
              if (info.likeMembers.includes(req.body.loginname)) {
                console.log(`writer : ${req.body.username}, login : ${req.body.loginname}`);
                info.likeMembers = info.likeMembers.filter((el) => el !== req.body.loginname);
                info.like -= 1;
              }
              else {
                info.likeMembers.push(req.body.loginname);
                info.like += 1;
              }
            }
          }
        }
        );
        Detail.update({ name: decodeURI(req.body.goodsname) }, { $set: { comments: comments } })
          .then((result) => {
            console.log(result, "좋아요가 변경되었습니다");
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err, "좋아요 수정에 실패했습니다.");
            next(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;