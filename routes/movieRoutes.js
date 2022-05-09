const express = require("express");
const { getMoviesInCity, getShowTimesInCity, seatsInShowTime, bookSeat } = require("../controllers/movieControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/cityMovies').get(protect,getMoviesInCity);
router.route('/cinemaShows').get(protect,getShowTimesInCity);
router.route('/seats').get(protect,seatsInShowTime);
router.route('/bookSeat').post(protect,bookSeat)


module.exports = router;