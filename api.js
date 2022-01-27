require("dotenv").config()

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken")
var ObjectId = require('mongodb').ObjectID;
const cloudinary = require('cloudinary').v2;

const uri = "mongodb+srv://lanceljr:DkI5YRqNLCZLLrHz@wad2-group40.lsulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db('WAD2-Group40');
    console.log("Baby, you're connectedddddddddd")
});

cloudinary.config({ 
    cloud_name: 'dyoneqz3z', 
    api_key: '627825391324611', 
    api_secret: 'N1f_F6JhtWt8kR7J3Xp2OuZ9jdc' 
});
  

router.get('/account', function (req, res) {
    db.collection('Account').find().toArray((err, results) => {
        res.send(results)
    });
});

router.get('/checkLogin', authToken, function (req, res) {
    res.sendStatus(200)
});

router.get('/getActivities', function (req, res) {
    db.collection('Activities').find().toArray((err, results) => {
        res.send(results)
    });
});

router.get('/getActivityTags', function (req, res) {
    db.collection('ActivityTags').find().toArray((err, results) => {
        // console.log(results[0].Tags)
        res.send(results)
    });
});

router.get('/getCategories', function (req, res) {
    db.collection('Categories').find().toArray((err, results) => {
        res.send(results)
    });
});

router.get('/getUserDetails', authToken, function (req, res) {
    var lowerCaseEmail = req.user.email.toLowerCase()
    db.collection('Account').findOne({ "email": lowerCaseEmail }, function (err, result) {
        res.send(result)
    })
});

router.post('/login', function (req, res) {
    var email = req.body.email
    var pw = req.body.pw
    var lowerCaseEmail = email.toLowerCase()
    
    db.collection('Account').findOne({ "email": lowerCaseEmail }, { password: 1, _id: 0 }, function (err, result) {
        if (result == null) {
            res.send({ "auth": false, "errorMessage": "Email does not exist" });
        }
        else {
            bcrypt.compare(pw, result.password, function (err, res2) {
                if (res2) {
                    // console.log(result)
                    var userObj = { email: lowerCaseEmail, username: result.username }
                    var accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET)

                    res.send({ "auth": true, "accessToken": accessToken });
                } else {
                    res.send({ "auth": false, "errorMessage": "Incorrect Email/Password" });
                }
            });
        }
    });
})

router.post('/register', (req, res) => {

    var email = req.body.email
    var pw = req.body.pw
    // var interests = req.body.interests
    var username = req.body.username
    var lowerCaseEmail = email.toLowerCase()
    var userObj = { email : email, username : username }

    emailExists = db.collection('Account').findOne({ "email": lowerCaseEmail }, function (err, result) {

        if (result == null) {
            bcrypt.hash(pw, saltRounds, function (err, hash) {
                db.collection('Account').insertOne({ "email": lowerCaseEmail, "password": hash, "interests": [], "username": username }, (err1, result1) => {
                    var accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET)
                    var resultObj = {
                        error: false,
                        message: "",
                        accessToken: accessToken
                    }
                    res.send(resultObj)
                });
            });
        }
        else {
            var resultObj = {
                error: true,
                message: "This email has already been registered."
            }
            res.send(resultObj)
        }
    })
});

router.post('/setInterests', authToken, (req, res) => {
    var interest_arr = req.body.interests
    // console.log(req.body)
    var userObj = req.user
    var userEmail = userObj.email

    db.collection('Account').updateOne({ "email": userEmail }, { $set: { "interests": interest_arr } }, (err, result) => {
        obj = result
        // console.log(result)
        if (result.modifiedCount == 1) {
            res.send(true)
        }
        else if (result.modifiedCount == 0) {
            res.send(false)
        }
    });
})

router.get("/getActivity/:activityId", (req, res) => {
    var id = req.params.activityId

    try {
        var objectId = ObjectId(id)
    } catch (error) {

        res.send({ success: false })
        return
    }
    db.collection('Activities').findOne(objectId, function (err, result) {
        var data = {
            success: true,
            data: result
        }
        res.send(data)
    })
})

router.post("/joinActivity/:activityId", authToken, async (req,res)=>{
    var id = req.params.activityId
    var username = req.user.username
    var email = req.user.email
    // console.log("join activity")
    var userObj = {
        username: username,
        email : email,
        img: "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
    }

    try {
        var objectId = ObjectId(id)
        var activityObj = await db.collection("Activities").findOne({_id:objectId})
        var leave = activityObj.Participants.some(item => item.email == email )
        // console.log(leave)

        if(leave){
            db.collection('Activities').updateOne({_id:objectId}, { $pull: {Participants : userObj} }).then((results) =>{
                res.send(true)
            })
        }
        else if(activityObj.Request){
            db.collection('Activities').updateOne({_id:objectId}, { $push: {Participant_Requests : userObj} }).then((results) =>{
                res.send(true)
            })
        }else{
            db.collection('Activities').updateOne({_id:objectId}, { $push: {Participants : userObj} }).then((results) =>{
                res.send(true)
            })
        }
    } catch (error) {
        res.send(false)
    }

})

router.post("/acceptRequest/:accept/:activityId", authToken, async (req,res)=>{
    var id = req.params.activityId
    var accept = req.params.accept
    var userObj = req.body.userObj
    try {
        var objectId = ObjectId(id)
        if(accept == "true"){
            db.collection('Activities').updateOne({_id:objectId}, { $push: {Participants : userObj}, $pull : {Participant_Requests: { "email" : userObj.email}}}).then((results) =>{
                res.send(true)
            })
        }
        else{
            db.collection('Activities').updateOne({_id:objectId}, { $pull : {Participant_Requests: { "email" : userObj.email}}}).then((results) =>{
                res.send(true)
            })
        }
    } catch (error) {
        res.send(false)
    }


})

router.post("/leaveActivity/:activityId", authToken, async (req,res)=>{
    var id = req.params.activityId
    var userObj = req.body.userObj
    try {
        var objectId = ObjectId(id)

        db.collection('Activities').updateOne({_id:objectId}, { $pull : {Participant_Requests: { "email" : userObj.email}}}).then((results) =>{
            res.send(true)
        })
        
    } catch (error) {
        res.send(false)
    }


})


const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("4455575deb181731753a7fe1938a2db95b0833917beaa1f7adddd1ef592ae306");

router.get('/getImages/:query', (req, res) => {
    var query = req.params.query
    // console.log(query)
    const params = {
        engine: "google",
        q: query,
        tbm: "isch",
        ijn: "0"
    };

    const callback = function (data) {
        // console.log(data);
        res.send(data)
    };

    search.json(params, callback)
})

router.post("/createActivity",authToken, async (req,res)=>{
    var activityObj = req.body.activityObj
    var email = req.user.email
    var username = req.user.username
    // console.log(req.user)
    
    var cover_image = activityObj.Image
    var custom_images = activityObj.Custom_Images
    var custom_images_submit = []

    if(cover_image.includes("data:image")){
        activityObj.Image = await uploadToCloudinary(cover_image);
    }

    await asyncForEach(custom_images, async (base64img) => {
        // console.log(base64img)
        if(base64img.includes("data:image")){
            var imgLink = await uploadToCloudinary(base64img);
            custom_images_submit.push(imgLink);
        }else{
            custom_images_submit.push(base64img);
        }
    })

    // console.log(custom_images_submit)
    activityObj.Custom_Images = custom_images_submit
    activityObj.Email = email
    activityObj.Username = username
    activityObj.Participants.push({
        username: username,
        email: email,
        img: "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
    })
    
    // console.log(activityObj)
    db.collection('Activities').insertOne(activityObj, (err, result) =>{
        // console.log(result)
        res.send({status:true, id:result.insertedId});
    })
})

router.get("/getActivitiesByTag/:tags", (req, res) => {
    var interest_arr = req.body.tags
})


router.get("/searchAcvtivities/:search", (req, res) => {
    var search_str = req.body.search
})

// {Participant_Requests: { "email" : userObj.email}}
// for profile page based on user
router.get('/myActivities', authToken ,function (req, res) {
    var lowerCaseEmail = req.user.email
    db.collection('Activities').find( 
        {
            "Participants.email" : lowerCaseEmail 
        }
    ).toArray((err, results) => {
        res.send(results)
    });
});

function authToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    // Bearer TOKEN
    // console.log(req)
    // console.log(req.body)
    // console.log(token)
    if (token == null) {
        res.sendStatus(401)
        return
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
            return
        }
        // console.log(user)
        req.user = user
        next()
    })

}


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

async function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, {width: 800, crop: "scale", format:'jpg'},(err, result) => {
        if (err) return reject(err);
        // console.log(result)
        return resolve(result.secure_url);
      })
    });
  }


module.exports = router;
