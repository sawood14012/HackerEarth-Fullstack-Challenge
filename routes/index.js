const e = require('express');
var express = require('express');
const admin = require('firebase-admin');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./serviceaccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
/* GET home page. */
router.get('/', async function(req, res, next) {
  const docRef = db.collection('ImagesDB');
  const snapshot = await docRef.get();
  
  if (snapshot.empty) {
    res.status(404).send('No matching documents.!');
    return;
  }
  var data = []
  snapshot.forEach(doc => {
    data.push(doc.data());
  });
  console.log(data);
  res.render('index', { doc: data });
});

router.post('/', async function(req, res, next){

  var imgName = req.body.ImgName;
  var imgUrL = req.body.ImgURL;
  var imgD = req.body.ImgDetails;
  var uuid = uuidv4();
  console.log(req.body)
  if(!req.body.hasOwnProperty('ImgName') || !req.body.hasOwnProperty('ImgURL') || !req.body.hasOwnProperty('ImgDetails')){
    res.status(400).send("There is no body present");
  }
  if(imgName == "" || imgD == "" || imgUrL == ""){
    res.status(400).send("Invalid Values! please enter proper values!")
  }
  else{
    var data = {
      ID: uuid,
      ImgName: imgName,
      ImgURL: imgUrL,
      ImgDetails: imgD
    }
    try{
      await db.collection("ImagesDB").doc(uuid).set(data);
    }
    catch(error){
      res.render("error", error)
    }
  }
  res.render('success');
 
});

router.get("/new", function(req, res, next){
  res.render('add');
});

router.get('/show/:id', async function(req, res, next){
  var ImageID = req.params.id;
  const docRef = db.collection('ImagesDB').doc(ImageID);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send('No such document!');
  } else {
    console.log('Document data:', doc.data());
    res.render('show',{data: doc.data()});
  }
})

router.get('/:id/edit', async function(req, res, next){
  var ImageID = req.params.id;
  const docRef = db.collection('ImagesDB').doc(ImageID);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send('No such document!');
  } else {
    var data = doc.data();
    res.render('edit',{data: data});
  }
})

router.put('/:id/edit', async function(req, res, next){
  var ImageID = req.params.id;
  var imgName = req.body.ImgName;
  var imgUrL = req.body.ImgURL;
  var imgD = req.body.ImgDetails;
  if(!req.body.hasOwnProperty('ImgName') || !req.body.hasOwnProperty('ImgURL') || !req.body.hasOwnProperty('ImgDetails')){
    res.status(400).send("There is no body present");
  }
  if(imgName == "" || imgD == "" || imgUrL == ""){
    res.status(400).send("Invalid Values! please enter proper values!")
  }
  else{
    var data = {
      ID: ImageID,
      ImgName: imgName,
      ImgURL: imgUrL,
      ImgDetails: imgD
    }
    try{
      await db.collection("ImagesDB").doc(ImageID).update(data);
    }
    catch(error){
      res.render("error", error)
    }
  }
  res.render('success');
});

router.delete('/delete/:id', async function(req, res, next){
  var ImageID = req.params.id;
  const docRef = db.collection('ImagesDB').doc(ImageID);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send('No such document!');
  }
  try{
    var result = await db.collection("ImagesDB").doc(ImageID).delete();
    // console.log(result);
  }
  catch(error){
    // no id found for deletion
    res.status(404).render('error', error)
  }
  res.status(200).render('success');
});

module.exports = router;
