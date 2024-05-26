import React, { useState, useEffect } from "react";
import "./VideoRecommendations.css";
import DeleteVideoRecommendation from "./DeleteVideoRecommendation";
import NewVideoForm from "./NewVideoForm.jsx";
import RatingDisplay from "./RatingDisplay.jsx";
const VideoList = () => {
	const [videos, setVideos] = useState([]);

	function fetchVideos() {
		fetch("/api/videos", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setVideos(data.sort((a, b) => a.id - b.id));
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	const handleDelete = (videoId) => {
		setVideos(videos.filter((video) => video.id !== videoId));
	};

	const handleRatingUpdate = (videoId, rating) => {
		const updatedVideos = videos.map((video) =>
			video.id === videoId ? { ...video, rating: rating } : video
		);
		setVideos(updatedVideos);
	};

	function changeYTLinkToEmbed(watchLink) {
		const embedLink = watchLink.replace("watch?v=", "embed/");
		return embedLink;
	}

	return (
		<div className="video-list-container">
			<div className="video-list">
				{videos.map((videoData, i) => {
					const embededLink = changeYTLinkToEmbed(videoData.src);
					return (
						<div className="video-item" data-testid="video" key={i}>
							<div className="video-title">
								<a href={videoData.src}>{videoData.title}</a>
							</div>
							<div>
								<iframe
									title={videoData.title}
									width="560"
									height="315"
									src={embededLink}
									frameBorder="0"
									allowFullScreen
								></iframe>
							</div>
							<DeleteVideoRecommendation
								videoId={videoData.id}
								onDelete={handleDelete}
							/>
							<RatingDisplay
								videoId={videoData.id}
								rating={videoData.rating}
								onUpdate={handleRatingUpdate}
							/>
						</div>
					);
				})}
			</div>
			<NewVideoForm onSubmit={fetchVideos} />
		</div>
	);
};

export default VideoList;
