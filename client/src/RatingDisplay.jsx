const RatingDisplay = ({ videoId, rating, onUpdate }) => {
	const handleRating = (updatedRating) => {
		fetch(`/api/videos/${videoId}/rating`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				rating: updatedRating,
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
			<div>{rating == null ? "Not Rated Yet!" : rating}</div>
			<div>
				<button onClick={() => handleRating(rating + 1)}>
					Thumbs-up! <i className="fa fa-thumbs-up"></i>
				</button>
				<button onClick={() => handleRating(rating - 1)}>
					Thumbs-down! <i className="fa fa-thumbs-down"></i>
				</button>
			</div>
		</div>
	);
};

export default RatingDisplay;
