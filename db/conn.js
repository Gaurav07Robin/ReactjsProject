const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("connecton success");
  // perform actions on the collection object
    client.close();
});

/* const mongoose = require('mongoose')

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    
    console.log(`connection successful`);
}).catch((err) => console.log(`connection error`));
*/