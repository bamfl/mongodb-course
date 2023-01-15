import { Router } from "express";
import movieController from "../controllers/movie-controller.js";

const router = new Router();

router.get("/api/movies", movieController.getMovies);
router.get("/api/movie/:id", movieController.getMovie);
router.delete("/api/movie/:id", movieController.deleteMovie);
router.post("/api/movie", movieController.addMovie);
router.put("/api/movie/:id", movieController.updateMovie);

export default router;
