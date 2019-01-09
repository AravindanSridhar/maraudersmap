const exp = require('express');
const path = require('path');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

//Firebase Middleware
var serviceAccount = require(path.join(__dirname,'maraudersmapp-98082-firebase-adminsdk-4yrah-5c36b64da9.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maraudersmapp-98082.firebaseio.com"
});
var db = admin.firestore();

//Server Variable Init
const app = exp();

//ENV Variables
//var port = 3000;

//Deployment Port Specification
const PORT = process.env.PORT || 5000;


//EJS Middleware Setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    var query = db.collection('users').doc('firstrecord');
    var fetch = query.get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
            console.log(doc.data());
          res.render('home' , {object : doc.data()} );
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      } );
});

app.listen(PORT,function(){
    console.log('Marauders Map server started at port 300 at ' + Date());
});