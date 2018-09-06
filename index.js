var express = require('express'),
app = express();
var router = express.Router();
port = process.env.PORT || 3000;
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

// Home page route.

router.get('/', function (req, res,next) {
    console.log("/" + req.method);
    next();
})

// About page route.
router.get('/catalog/IFService', function (req, res,next) {
    console.log('I m in root service');
    next();
})

// About page route.
router.get('/catalog/Item', function (req, res,next) {
    console.log('I m in root item');
    next();
})
module.exports = router;

app.use(router);
app.use('/catalog', catalogRouter);  // Add catalog 

app.listen(port);

console.log('api running');
