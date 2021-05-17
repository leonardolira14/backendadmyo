const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({apiVersion: '2012-10-17'});


const cargar = (filename,filepatha,id) => {
    return new Promise((resolve,reject)=>{
        var myBucket = 'logoempresaadmyo';
        var myKey = filename;
        fs.readFile(filepatha, function (err, data) {
            if (err) { 
                data={
                    ok:false,
                    error:err
                }
                reject(data);
            }
       
               params = {Bucket: myBucket, Key: myKey, Body: data, ACL:'public-read' };
       
               s3.putObject(params, function(err, data) {
       
                   if (err) {
                    data={
                        ok:false,
                        error:err
                    }
                    reject(data);
       
                   } else {
                    data={
                        ok:true
                    }
                      resolve(data)
       
                   }
       
                });
       
       });
    })
}
module.exports = {
    cargar
}