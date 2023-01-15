import Movie from "../models/movie-model.js";

class MovieController {
  async getMovies(req, res) {
    try {
      const getSortObject = () => {
        const sortObj = {};

        if (req.query.sort && req.query.desc) {
          const sortField = req.query.sort;
          const descValue = req.query.desc === "true" ? -1 : 1;

          sortObj[sortField] = descValue;
        }

        return sortObj;
      };

      const movies = await Movie.find().sort(getSortObject());

      res.status(200).send(movies);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getMovie(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);

      if (!movie) {
        res.status(500).send({ errorMessage: "Movie not found" });
        return;
      }

      res.status(200).send(movie);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);

      if (!movie) {
        res.status(500).send({ errorMessage: "Movie not found" });
        return;
      }

      res.status(200).send(movie);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async addMovie(req, res) {
    try {
      const newMovie = await Movie.create(req.body);

      res.status(201).send(newMovie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateMovie(req, res) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send(updatedMovie);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export default new MovieController();
