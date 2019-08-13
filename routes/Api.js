const express = require('express')
const router = express.Router()
const Ninja = require('../models/database')




// Get data from database

router.get('/ninjas', (req, res) => {
    Ninja.aggregate([{
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            distanceField: "dist.calculated",
            maxDistance: 100000,
            spherical: true
        }
    }])
    .then( (ninjas) => {
        res.send(ninjas);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json('Error : ' + err)
    });
});

// Post into our database
router.post('/ninjas', (req, res) => {
    
Ninja.create(req.body).then((ninja)=>{
 
    res.send(ninja);
    console.log("data saved to db");
})
.catch((err)=>{
    console.log(err.message);
    res.status(400).json('Error : ' + err)
});

   
})


// Update database
router.put('/ninjas/:id', (req, res) => {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(()=>{
        Ninja.findOne({_id:req.params.id})
   
    .then((ninja)=>{
       res.send(ninja);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(400).json('Error : ' + err)
    });
    });
});

// delect from database

router.delete('/ninjas/:id', (req, res) => {
     
    Ninja.findByIdAndRemove({_id: req.params.id})
    .then((ninja)=>{
        res.send(ninja);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(400).json('Error : ' + err)
    });
   
})

module.exports = router;