
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

console.log('I am in app.js');
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.