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
				return response.json();
			})
			.then((data) => {
				onDelete(videoId);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return <button onClick={handleDelete}>Remove Video</button>;
};

export default DeleteVideoRecommendation;
