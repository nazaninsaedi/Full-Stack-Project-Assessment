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
	if (!req.body.title) {
		return res.status(422).json({ message: "Title field is required" });
	}
	if (!req.body.src) {
		return res.status(422).json({ message: "src field is required" });
	}
	const result = await db.query(
		`INSERT INTO videos (title,src) VALUES ('${req.body.title}','${req.body.src}') RETURNING id`
	);
	const newVideoId = result.rows[0].id;
	res.status(200).json({ success: true, data: { id: newVideoId } });
});

router.delete("/videos/:id", async (req, res) => {
	const videoId = req.params.id;

	try {
		const checkQuery = await db.query("SELECT * FROM videos WHERE id = $1", [
			`${videoId}`,
		]);
		if (checkQuery.rows.length === 0) {
			return res.status(404).json({
				message: "Video not found",
			});
		}

		const deleteQuery = await db.query("DELETE FROM videos WHERE id = $1", [
			videoId,
		]);

		return res.status(204).end();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal server error", error: this.error });
	}
});

export default router;
