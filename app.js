let express = require('express');
let app = express();
/// for reading value form .env 
let dotenv = require('dotenv');
dotenv.config()
// for logging purposes
let morgan = require('morgan');
let fs = require('fs');
let port = process.env.PORT || 9800;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoLive;
let bodyParser = require('body-parser')
let db;


// middleware
app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('This is From Nike')
})

app.get('/products',(req,res) => {
    db.collection('products').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})



app.get('/topstrip',(req,res) => {
    db.collection('topstrip').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

// connection with mongo

MongoClient.connect(mongoUrl,(err,client)=>{ 
    if(err) console.log('error while connecting');
    db = client.db('nike_ecommerce')


app.listen(port, () => {
    console.log(`listing to port ${port}`)
})
})
 
