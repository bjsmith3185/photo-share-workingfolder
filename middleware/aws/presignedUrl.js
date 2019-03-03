const uuid = require('uuid/v1');
const getUrl = require('./bucketAccess')




module.exports = {
    requestUrl: function (id, data) {
        return new Promise((resolve, reject) => {
            console.log("inside presignedURL.js middleware")
            console.log(id)
            console.log(data.type)
            let type = data.type;
            let key = `${id}/${uuid()}.jpeg`;

            getUrl.signedUrl(type, key)
            // aws.signedUrl(req.body.type, key)
            .then(url => {
              console.log("this is the url awsRouter line 15")
              console.log(url)

                // send back the key and the url


              resolve({ key, url });
            //   res.send({ key, url })
            })
            .catch(err => res.status(422).json(err))


            
        })

    }

}






