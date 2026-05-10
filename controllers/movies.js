const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

router.get("/genres/all", async (req, res) => {
  try {
    const genres = await Movie.distinct('genres')
    res.json(genres.sort())
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET /movies?page=1&limit=20&genre=Western
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 20
    const skip = (page - 1) * limit

    const query = {}
    if (req.query.genre) {
      query.genres = req.query.genre
    }

    const [movies, total] = await Promise.all([
      Movie.find(query).skip(skip).limit(limit).sort({ year: -1 }),
      Movie.countDocuments(query)
    ]);

    res.json({ 
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    })
    
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
})

// GET /movies/:id
router.get("/:movieId", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
    if (!movie) return res.status(404).json({ err: "Movie not found." })
    res.json(movie)
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
})

module.exports = router;