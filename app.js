const { MongoClient } = require('mongodb');

var express = require('express');

const app = express();
const port= 8000;

app.use(express.json());

let pages=[{
    id:1,
    title:'card',
    snapshoot:'img',
    code:'25',
    description:"heeee"
},
{
    id:2,
    title:'paragraph',
    snapshoot:"img",
    code:'100',
    description:'hhhh'
},]  


app.get('/api/pages', (req,res)=>{
    res.send(pages)
})


app.get('/api/pages/:id',(req,res)=>{
    res.send(pages.find((val)=>{
       return val.id === parseInt(req.params.id)
    }))
})

app.post('/api/page/added',(req,res)=>{
   (pages.push({
        id:pages.length + 1,
        title : req.body.title,
        snapshoot : req.body.snapshoot,
        code:req.body.code,
        description:req.body.description
    }))
    res.send(pages)
})


app.delete('/api/pages/delete/:id',(req,res)=>{
    res.send(pages.filter((val)=>{
      return  val.id !== parseInt(req.params.id)
    }))
})


// Connection URL
const url = 'mongodb+srv://vinayakdb:Welcome%402022@cluster0.jrot8wk.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');


const insertResult = await collection.insertMany(pages);
console.log('Inserted documents =>', insertResult); 

  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  app.listen(port);