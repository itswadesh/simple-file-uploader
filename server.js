var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var done       =       false;


var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);


app.post('/savedata', upload.single('file'), function(req,res,next){
    console.log('Here', req.file, req.body);
    var currentTime = Date.now();
    /*fs.writeFile('./json/'+currentTime+'.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        else res.send();
    }); */
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
