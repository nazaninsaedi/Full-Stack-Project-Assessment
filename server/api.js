import { Router } from "express";
import db from "./db.js";

const router = Router();

router.get("/videos", async (_, res) => {
	try {
		const result = await db.query("SELECT * FROM videos");
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Could not connect to the database" });
	}
});

router.post("/videos", async (req, res) => {
	const { title, src, rating } = req.body;

	if (!title) {
		return res.status(422).json({ message: "Title field is required" });
	}
	if (!src) {
		return res.status(422).json({ message: "src field is required" });
	}

	try {
		const result = await db.query(
			"INSERT INTO videos (title, src, rating) VALUES ($1, $2, $3) RETURNING id",
			[title, src, rating]
		);

		const newVideoId = result.rows[0].id;
		res.status(200).json({ success: true, data: { id: newVideoId } });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Failed to insert video into database" });
	}
});

router.delete("/videos/:id", async (req, res) => {
	const videoId = req.params.id;

	try {
		const checkQuery = await db.query("SELECT * FROM videos WHERE id = $1", [
			videoId,
		]);
		if (checkQuery.rows.length === 0) {
			return res.status(404).json({ message: "Video not found" });
		}

		await db.query("DELETE FROM videos WHERE id = $1", [videoId]);
		return res.status(204).end();
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while deleting the video" });
	}
});

export default router;
