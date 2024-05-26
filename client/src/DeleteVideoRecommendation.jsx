import React from "react";

const DeleteVideoRecommendation = ({ videoId, onDelete }) => {
	const handleDelete = () => {
		fetch(`/api/videos/${videoId}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to delete the video");
				}
				onDelete(videoId);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<button className="submit-button" onClick={handleDelete}>
			Remove Video
		</button>
	);
};

export default DeleteVideoRecommendation;
