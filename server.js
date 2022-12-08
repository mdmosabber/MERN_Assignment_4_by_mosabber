const express = require('express');
const {readdirSync} = require('fs')

require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

readdirSync('./routes').map((routeFile)=> app.use('/api/assignment', require(`./routes/${routeFile}`)));

// const routeFiles = readdirSync('./routes');
// for(routeFile of routeFiles){
//     app.use('/api/assignment', require('./routes/'+routeFile))
// }

// app.use('/api/assignment', require('./routes/assignment.route'))


// 404 error handle
app.use((req, res, next)=> {
    res.status(404).json({message: '4🧡4 Not Found'});
})

// server error
app.use((err, req, res, next)=> {
    if(err.message){
        res.status(500).json({message: err.message})
    }else{
        res.status(500).json({message: 'Internal Server Error'})  
    }
})

module.exports = app;