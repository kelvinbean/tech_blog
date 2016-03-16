var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var multipart = require('connect-multiparty');

var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/techblog';

mongoose.connect(dbUrl);


app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));//格式化表单里的数据  设置为true就可以
app.use(cookieParser());
app.use(multipart());
app.use(morgan());
app.use(session({
    secret:'techblog',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));
// app.use(bodyParser.urlencoded({ extended: true, uploadDir:'./public/images'}));

require('./config/routes')(app);

app.listen(port);
app.locals.moment = require('moment');
app.use(serveStatic(path.join(__dirname, 'public')));

console.log('project started on port'+port);