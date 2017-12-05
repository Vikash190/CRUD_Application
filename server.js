const express =require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

//body parser to be added before all the functions
//to ensure the use of input boxes getting input from user
//urlencoded ensures bodyparser to extract data from the form
//./node_modules/.bin/nodemon server.js for opening  server single time
app.use(bodyParser.urlencoded({extended:true}))
//using this middleware to tell express to make public folder accessible
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine','ejs')
var db

MongoClient.connect('mongodb://vikash:vikash123@ds036079.mlab.com:36079/vikashdb', function(err, database)  {
    // ... start the server
    if(err)return console.log(err)
    db=database
//operation yet to provide
    app.listen(3000, function () {
        console.log('listening on 3000');
    })
})

app.post('/quotes', function(req, res)  {
    db.collection('quotes').save(req.body, function(err, result)  {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})
//getting the records from the mongodb

app.get('/', function(request, response)  {
  //  response.sendFile('C:\\Users\\admin\\Documents\\web1' + '/index1.html');
    //var cursor =db.collection('quotes').find();
    db.collection('quotes').find().toArray(function(err, result){
        if (err) return console.log(err)
        // renders index.ejs
        response.render('index.ejs', {quotes: result})
})
})
app.put('/quotes', function(req, res)  {
    // Handle put request
    db.collection('quotes')
        .findOneAndUpdate({name: 'Abraham Maslow'}, {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
            sort: {_id: -1},
            upsert: true
        }, function(err, result) {
        if (err) return res.send(err)
        res.send(result)
})
})
app.delete('/quotes', function(req, res)  {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    function(err, result)  {
    if (err) return res.send(500, err)
    res.send({message: ' Baltasar Gracian quote got deleted'})
})
})
