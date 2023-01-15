import * as dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);
const database = client.db("moviesbox");
const moviesCollection = database.collection("movies");

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

      const movies = await moviesCollection
        .find()
        .sort(getSortObject())
        .toArray();

      res.status(200).send(movies);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getMovie(req, res) {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const movie = await moviesCollection.findOne({
          _id: ObjectId(req.params.id),
        });

        res.status(200).send(movie);
      } else {
        res.status(500).send({ errorMessage: "Invalid id" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const movie = await moviesCollection.deleteOne({
          _id: ObjectId(req.params.id),
        });

        res.status(200).send(movie);
      } else {
        res.status(500).send({ errorMessage: "Invalid id" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async addMovie(req, res) {
    try {
      const newMovie = await moviesCollection.insertOne(req.body);

      res.status(201).send(newMovie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateMovie(req, res) {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const updatedMovie = await moviesCollection.updateOne(
          {
            _id: ObjectId(req.params.id),
          },
          { $set: req.body }
        );

        res.status(200).send(updatedMovie);
      } else {
        res.status(500).send({ errorMessage: "Invalid id" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export default new MovieController();
