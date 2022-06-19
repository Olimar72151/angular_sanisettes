var express = require('express');
var hostname = 'localhost'; 
var port = 30000; 
var mongoose = require('mongoose'); 
var urlmongo = "mongodb://localhost:27017/sanisettesparis"; 
mongoose.connect(urlmongo);
const cors = require('cors');
var db = mongoose.connection; 
var app = express(); 
var bodyParser = require("body-parser"); 

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT"
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World!')
})
app.post('/getposition', cors(corsOptions), (req, res) => {
  res.send('PositionOK')
})

app.get('/toilet', cors(corsOptions), (req, res) => {
  
  // var ToiletSchema = new mongoose.Schema({
  //   id_:  String, // String is shorthand for {type: String}
  //   datasetid: String,
  //   recordid:   String,
  //   fields: Object,
  //   geometry: Object,
  //   record_timestramp: String
  // });
  
  // var Toilet = mongoose.model('Toilet', ToiletSchema);
  //   Toilet.find(function(err, toilets){
  //         if (err){
  //             res.send(err); 
  //         }
  //         res.json(toilets);  
  //     });
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017";

  const client = new MongoClient(url);
  async function run() {
    try {
      await client.connect();
      const database = client.db('sanisettesparis');
      const sanisettes = database.collection('sanisettesparis');
      
      const query = { datasetid: 'sanisettesparis' };
      const sani = await sanisettes.find(query).toArray();
      res.json(sani);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})