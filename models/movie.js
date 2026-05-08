const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genres: [String],
  poster: String,
  plot: String,
  runtime: Number,
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');

module.exports = Movie;