const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const router = require('./routes/Api')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Database connection
// mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true })
.then(()=>{
 console.log('Database connection OK');
})
.catch((e)=>{
    console.log(e);
});


app.use(express.static('public'));




//body-parser
app.use(bodyParser.json())

//error handling middleware
// app.use((error, req,res, next)=>{
//   res.status(404).send({error: error.message});
// });


// Initializing our route
app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port} !`)
})


