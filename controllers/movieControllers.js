const asyncHandler  = require('express-async-handler');
const ShowTime = require('../models/showTime');
const mongoose = require('mongoose');

const getMoviesInCity = asyncHandler(async(req,res)=>{
    const {cityName} = req.body;

    const movies = await ShowTime.find({city:cityName},{movie:1,_id:0});

    let movieSet = new Set();

    for(let i=0;i<movies.length;i++){
        movieSet.add(movies[i].movie);
    }

    res.status(200).json(Array.from(movieSet));

})


const getShowTimesInCity = asyncHandler(async(req,res)=>{
    const {cityName,movieName} = req.body;


    const showTimes = await ShowTime.find({city:cityName,movie:movieName});
    const cinemaShows = {};
    for(let i=0;i<showTimes.length;i++){
        if(cinemaShows[showTimes[i].cinema]===undefined){
            cinemaShows[showTimes[i].cinema] = [showTimes[i].time];
        }else{
            cinemaShows[showTimes[i].cinema].push(showTimes[i].time);
        }
    }

    res.status(200).json(cinemaShows);
})

const seatsInShowTime = asyncHandler(async(req,res)=>{
    const {showTimeId} = req.body;
    const showTime = await ShowTime.findOne({_id:showTimeId},{_id:0,seats:1});
    res.status(200).json(showTime)
})

const bookSeat = asyncHandler(async(req,res)=>{
    const {seatNumber,showTimeId} = req.body;
    const showTime = await ShowTime.findOne({_id:mongoose.Types.ObjectId(showTimeId)},{seats:1,_id:0});
    if(showTime.seats[seatNumber].filled===true){
        throw new Error("This seat is already Booked!");
    }
    showTime.seats[seatNumber].filled=true;

    await ShowTime.updateOne({_id:mongoose.Types.ObjectId(showTimeId)},{'$set':{seats:showTime.seats}})
    res.status(200).json(showTime);
})



module.exports = {getMoviesInCity,getShowTimesInCity,seatsInShowTime,bookSeat}