const User = require('../Models/User');
const Reservation = require('../Models/Reservation');
const Flight = require('../Models/Flight');

const reserveSelectedSeats = async function(depID,returnID,assignedDepartureSeats,assignedReturnSeats,cabinclass) {

    updateReservationSeats(depID,cabinclass,assignedDepartureSeats);

    updateReservationSeats(returnID,cabinclass,assignedReturnSeats);

}

exports.getUserById = async function(req,res) {

  let ID = req.params.id;

  await User.findById(ID)
  .then( (user) => {
      res.status(200)
      res.json(user)
  })
  .catch( (err) => {
      res.send({statusCode : err.status, message : err.message})
      console.log(err.status)})
}

exports.updateUserById = async function(req,res) {

  let ID = req.params.id;

  await User.findByIdAndUpdate(ID, req.body.user, {new: true, runValidators: true})
      .then( (user) => {
          res.status(200)
          res.json(user)
      })
      .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

exports.getAllReservedSeats = async function(req,res) {


  Reservation.find()
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})

}

exports.getReservedFlightById = async function(req,res) {


  let ID = req.params.getID

  Reservation.findById(ID)
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})
}


// Create
exports.createReservedFlight = async function(req,res) {


  let newReservation = new Reservation(req.body.reservation)

  newReservation.save()
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          if (err.name === "ValidationError") {
              let errors = {}
        
              Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message
              })
        
              //return res.status(400).send(errors)
              return res.send(errors)
            }
          
          if (err.name === "MongoServerError") {
              //return res.status(400).send("duplicate key error")
              return res.send("duplicate key error")
          }

          //res.status(500).send(err.name)
          res.send(err.name)
          console.log(err.message)})

    // update FLIGHTS ARRAY!!!!
    reserveSelectedSeats(newReservation.reservedFlightIDs[0],newReservation.reservedFlightIDs[1],
                        newReservation.assignedDepartureSeats,newReservation.assignedReturnSeats,
                        newReservation.cabinClass);
}

exports.getAllreservedFlights = async function(req,res) {

  let ID = req.params.id;

  await Reservation.find({reservedUserID : ID + ''})
          .then( (reservation) => {
              res.send(reservation)
          })
          .catch( (err) => {
              res.send({statusCode : err.status, message : err.message})
              console.log(err.status)})

  // then send it to FE.
}

exports.deleteReservedFlightById = async function(req,res) {

  let ID = req.params.deleteID

  Reservation.findByIdAndDelete(ID)
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})
}


const updateFlight = async function(ID,reservedSeats){

    await Flight.findByIdAndUpdate(ID, reservedSeats, {new: true, runValidators: true})
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


const updateReservationSeats = async function(ID,cabinclass,assignedSeats){

    let oldFlight = null; 
    
    await Flight.findById(ID).then(result => oldFlight = result);

    console.log('oldDepFlight ',oldFlight);

    // new vars to be set in the object above for updating departure flight.
    let newDepSeats = [];
    let newAvailableSeats = 0;

    if(cabinclass === 'Economy'){

        for (let i = 0; i < oldFlight.reservedEconomySeats.length; i++) {
            if(reservedEconomySeats[i] !== assignedSeats[i])
                newDepSeats[i] = assignedSeats[i];
            newDepSeats[i] = reservedEconomySeats[i];
        }
        
        newAvailableSeats = availableeconomySeats - assignedSeats.length;

        oldFlight.reservedEconomySeats = newDepSeats;
        oldFlight.availableeconomySeats = newAvailableSeats;

    }else {

        for (let i = 0; i < oldFlight.reservedBusinessSeats.length; i++) {
            if(reservedBusinessSeats[i] !== assignedSeats[i])
                newDepSeats[i] = assignedSeats[i];
            newDepSeats[i] = reservedBusinessSeats[i];
        }

        newAvailableSeats = availableBusinessSeats - assignedSeats.length;

        oldFlight.reservedBusinessSeats = newDepSeats;
        oldFlight.availableBusinessSeats = newAvailableSeats;
    }


    updateFlight(ID,oldFlight);
}