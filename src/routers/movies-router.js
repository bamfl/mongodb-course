import { Router } from "express";
import moviesController from "../controllers/movies-controller.js";

const router = new Router();

router.get("/api/movies", moviesController.getMovies);
router.get("/api/movie/:id", moviesController.getMovie);
router.delete("/api/movie/:id", moviesController.deleteMovie);
router.post("/api/movie", moviesController.addMovie);
router.put("/api/movie/:id", moviesController.updateMovie);

export default router;
