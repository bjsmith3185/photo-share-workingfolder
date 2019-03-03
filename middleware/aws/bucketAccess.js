const AWS = require('aws-sdk');


require('dotenv').load();


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })


module.exports = {

    signedUrl: function (type, key) {
        // console.log("inside signedURL line 16")
        // console.log(type + "   key " + key)
        return new Promise((resolve, reject) => {

            s3.getSignedUrl('putObject', {
                Bucket: 'photoshare-practice',
                ContentType: type,
                // ContentType: 'jpeg',
                Key: key,
              },
                (err, url) => {
                  // console.log(url)
                  resolve(url);
                }
              );
        });
    },

    deleteAWSpicture: function (awsKey) {
        console.log("in the deleteAWSpicture")
        console.log(awsKey)

        s3.deleteObject({
            Bucket: 'photoshare-practice',
            Key: awsKey,
        },
        (err, data) => {
            if(err) console.log(err);
            else console.log("delete", data)
        })

    },

    emptyBucket: function () {

      let bucketName = 'photoshare-practice';
      // function emptyBucket(bucketName,callback){
        var params = {
          Bucket: bucketName,
          // Prefix: 'folder/'
        };
      
        s3.listObjects(params, function(err, data) {
          if (err) console.log(err);
      
          if (data.Contents.length == 0) return;
      
          params = {Bucket: bucketName};
          params.Delete = {Objects:[]};
      
          data.Contents.forEach(function(content) {
            params.Delete.Objects.push({Key: content.Key});
          });
      
          s3.deleteObjects(params, function(err, data) {
            if (err) console.log(err);
            // if(data.Contents.length == 1000)emptyBucket(bucketName,callback);
            // else callback();
          });
        });
      // }



    }



}

  




