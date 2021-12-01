const Flight = require('../Models/Flight');

exports.searchFlight = async function(req,res) {

    let flight = {};

    let query = req.body;

    console.log(query);

    if(query.flightNumber){
        flight.flightNumber = query.flightNumber; 
    }
    if(query.departureTime){
        flight.departureTime = query.departureTime;
    }
    if(query.arrivalTime){
        flight.arrivalTime = query.arrivalTime ;

        console.log(query.arrivalTime);
    }
    if(query.departureDate){
        flight.departureDate = query.departureDate ;
    }
    if(query.arrivalDate){
        flight.arrivalDate = query.arrivalDate ;
    }
    
    if(query.from){
        flight.from = new RegExp(query.from , 'i') ;

    }
    if(query.to){
        flight.to = new RegExp(query.to , 'i') ;
    }

    
     await Flight.find(flight)
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})
}

exports.searchFlightuser = async function(req,res) {

   

    let query = req.body.flight;
    let seatsres = req.body.selected
    let numberseats = parseInt(seatsres.numofseats )

    let bflight = {availableBusinessSeats: { $gte : numberseats}};
    let eflight = {availableBusinessSeats: { $gte : numberseats}};

    console.log(seatsres);

    if(query.flightNumber){
        bflight.flightNumber = query.flightNumber; 
        eflight.flightNumber = query.flightNumber; 
    }
    if(query.departureTime){
        bflight.departureTime = query.departureTime;
        eflight.departureTime = query.departureTime; 
    }
    if(query.arrivalTime){
        bflight.arrivalTime = query.arrivalTime ;
        eflight.arrivalTime = query.arrivalTime ;

        console.log(query.arrivalTime);
    }
    if(query.departureDate){
        bflight.departureDate = query.departureDate ;
        eflight.departureDate = query.departureDate ;
    }
    if(query.arrivalDate){
        bflight.arrivalDate = query.arrivalDate ;
        eflight.arrivalDate = query.arrivalDate ;
    }
    
    if(query.from){
        bflight.from = new RegExp(query.from , 'i') ;
        eflight.from = new RegExp(query.from , 'i') ;

    }
    if(query.to){
        bflight.to = new RegExp(query.to , 'i') ;
        eflight.to = new RegExp(query.to , 'i') ;
    }

    if(seatsres.select === "business"){
     await Flight.find(bflight)
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})}
    else if (seatsres.select === "economy"){
        await Flight.find(eflight)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
    }
}

exports.getAllFlights = async function(req,res) {

    await Flight.find({})
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})

    // then send it to FE.
}

exports.getFlightById = async function(req,res) {

    let ID = req.params.getID

    await Flight.findById(ID)
    .then( (flights) => {
        res.status(200)
        res.json(flights)
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

// router.get("/:getID", (req, res) =>

// Create FLight
exports.newFlight = async function(req,res) {

    let newFlight = new Flight(req.body.flight);
    await newFlight.save()
        .then( (flight) => {
            res.status(200)
            res.json(flight)
        })
        .catch( (err) => {
            // if(err.name === "ValidationError") {
            //     let errors = {};
          
            //     Object.keys(err.errors).forEach((key) => {
            //       errors[key] = err.errors[key].message;
            //     });
          
            //     return res.status(400).send(errors);
            //   }
            if (err.name === "MongoServerError"){
                return res.status(400).send({statusCode : 400, message : "duplicate key error"})
            }else{
            res.status(400).send({statusCode : 400, message : err.message})
            console.log(err.message)
            }
        })
}


// router.post("/", (req, res) => {


// Update Flight
exports.updateFlightById = async function(req,res) {

    let ID = req.params.updateID;

    await Flight.findByIdAndUpdate(ID, req.body.flight, {new: true, runValidators: true})
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            if (err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
          
                return res.status(400).send(errors);
              }
              if (err.name === "MongoServerError"){
                return res.send({statusCode : err.status, message : "duplicate key error"})
            }

            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}

// router.put("/:updateID", (req, res) => {

// Delete Flight
exports.deleteFlightById = async function(req,res) {

    let ID = req.params.deleteID;

    await Flight.findByIdAndDelete(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}


// router.delete("/:deleteID", (req, res) => {
