var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  var fs = require("fs");
  const http = require('http');
  var Request=require('request');
  var _=require("underscore");

app.get('/getItemMetadata', function (req, res) {
   fs.readFile( __dirname + "/" + "item.json", 'utf8', function (err, data) {
      // console.log( data );
       res.end( data );
   });
})
app.get('/getItems', function (req, res) {
    Request.get("http://192.168.9.63:8080/Items", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var objItems=JSON.parse(body);
    var objConfig=new Object();
    var resJSON=[];
    var objMapper;
    var newItem;
    if(body!=null)
       {
           //Mapper Logic
           
           fs.readFile( __dirname + "/" + "mapper.json", 'utf8', function (err, data,) {

            objMapper = JSON.parse(data);
           _.map( objItems, function(content,key) {
         //   console.log(key) ;
            if(key=='value')
            {
                
               _.map(content,function(subcontent,key){
                newItem=null;   
                newItem=JSON.parse(JSON.stringify(objMapper));
                    console.log(newItem);
                    getElement(subcontent,newItem)
                    console.log('relJson');
                    resJSON.push(newItem);
                   // resJSON+=","
                    console.log(resJSON);
                  })
                }
             })
             //console.log('abc');
             res.send(resJSON);
         });
       }
      // res.end(objMapper);
    //item=JSON.parse(body);
});
});
function getElement(subcontent,objMapper)
{
    _.map(subcontent,function(subcontentValue,subcontentKey){
      //  console.log('key:'+subcontentKey);
      //console.log('key: '+subcontentKey +'value: '+subcontentValue);
      if(subcontentValue!=null)
      {
      if(_.isString(subcontentValue)) {
       // console.log('string'+subcontentValue);
       // console.log('mapper');
       // console.log(objMapper);
        _.map(objMapper,function(subMapperContent){
            _.each(subMapperContent,function(element,index,list)
            {
            //   console.log("value: " + element + " index: " + index + " list: " + list)
               if(index=='SourcePropertyName' && element==subcontentKey)
               {
                   list['PropertyValue']=subcontentValue;
               }
               //console.log(list[index]);
           })
        })
      }
        else
        {
          //  console.log('Recursive call')
            getElement(subcontentValue,objMapper);
        }
    }

     

})

};
console.log('api running');

app.listen(port);