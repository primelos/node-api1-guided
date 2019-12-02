//use below instead of import
//node.js we'll import files using this syntax
const express = require('express');

const db = require('./data/hubs-model.js') // #1 import database file

const server = express();

server.use(express.json()); // THIS IS NEEDED TO PARSE JSON FROM THE body

server.get('/', (req, res) => {
    res.send({api: 'up and running...'})
})

//list of hubs  /  #2 implement endpoint
server.get('/hubs', (req, res) => {
    //get the list of hubs from the database
    db.find()
    .then(hubs => {
        res
            .status(200).json(hubs)

        })
    .catch(error => {
        console.log('error on GET /hubs', error)
        res
            .status(500)
            .json({ errorMessage: 'error getting list of hubs from database' })
    })
})

//add a hub
server.post('/hubs', (req, res) => {
    //get the db and add the hub
    const hubData = req.body // express does not know how to parse JSON
    console.log(hubData)
    //call the db anf add the hub
    db.add(hubData)
        
        .then(hub => {
            res.status(201).json(hub)
        })
        .catch(error => {
            console.log('error on POST /hubs', error);
            res
            .status(500)
            .json({ errorMessage: 'error adding the hub' })

        })
        
})
//remove a hub by its id
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(removed => {
            if(removed){
                res.status(200).json({ message: 'hubs removed successfully', removed });
            } else {
                res.status(404).json({ message: 'hub not found'})
            }
         })
        .catch(error => {
            console.log('error on DELET /hubs/:id', error);
            res.status(500).json({ errorMessage: 'error removing the hub' })
        })
})

//update a hub

const port = 4000

server.listen(port, () =>
 console.log(`\n API running on port ${port} **\n`)
);


