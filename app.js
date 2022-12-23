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
app.get('/listing',(req,res) => {
    db.collection('listing').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/register',(req,res) => {
    var hashedpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        role:req.body.role?req.body.role:'User'
    },(err,user) => {
        if(err) return res.status(500).send("Error in register");
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
        res.status(200).send("Registration successful");
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
 
