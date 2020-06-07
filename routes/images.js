var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET users listing. */

router.get('/:id', function(req, res, next) {
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
module.exports = router;