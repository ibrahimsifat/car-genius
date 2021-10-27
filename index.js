const express=require('express')
const app=express()
const port=process.env.PORT|| 5000;
require('dotenv').config()
const cors=require('cors')
const ObjectId=require('mongodb').ObjectId
//my-db-1
// cxRiv9sRMqNARJZA


// middleware

app.use(cors())
app.use(express.json())

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1clhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);
async function run(){
    await client.connect();
    const database = client.db("Genius-Car");
    const serviceCollection = database.collection("services");
// GET Single services
app.get('/services/:id',async(req,res)=>{
    const id=req.params.id
    console.log('hitidn ',id);
    const query={_id:ObjectId(id)}
    const result=await serviceCollection.findOne(query)
    res.send(result)
    
})

// GET API
app.get('/services',async(req,res)=>{
    const cursor=serviceCollection.find({})
    const services=await cursor.toArray()
    res.send(services)
})

// Delete api
app.delete('/services/:id',async(req,res)=>{
    const id=req.params.id
    const query={_id:ObjectId(id)}
    const result=await serviceCollection.deleteOne(query)
    res.send(result)
})


// POST Api

app.post('/services', async(req,res)=>{
    const services=req.body
    console.log('hit the database',services);
    const result=await serviceCollection.insertOne(services)
    console.log(result);
    res.json(result)
})



}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('running d sdfsdg ')
})











app.listen(port,(req,res)=>{
    console.log('running prot',port);
})