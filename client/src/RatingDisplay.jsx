import React, { useState } from "react";

const RatingDisplay = ({ videoId, rating, onUpdate }) => {
	const handleThumbsUp = () => {
		fetch(`/api/videos/${videoId}/rating`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				rating: rating + 1,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to update the video rating");
				}
				return response.json();
			})
			.then((data) => {
				onUpdate(videoId, data.data.rating);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<div>{rating}</div>
			<div>
				<button onClick={handleThumbsUp}>
					Thumbs-up! <i className="fa fa-thumbs-up"></i>
				</button>
				<button>
					Thumbs-down! <i className="fa fa-thumbs-down"></i>
				</button>
			</div>
		</div>
	);
};

export default RatingDisplay;
