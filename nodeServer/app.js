let express=require('express');
let bodyParser=require('body-parser')

let app=express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
        /*让options请求快速返回*/
    } else {
        next();
    }
});

let router=require('./router')
app.use(router);


app.listen(4848,function(){
	console.log('server is running...');
})