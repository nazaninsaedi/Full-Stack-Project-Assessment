import React, { useState } from "react";
import "./NewVideoForm.css";

const NewVideoForm = () => {
	const [title, setTitle] = useState("");
	const [src, setSrc] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("/api/videos", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, src }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="form-container">
			<h2 className="form-header">Add New Video</h2>
			<form className="form-body" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="title">Video Title: </label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="src">Video URL: </label>
					<input
						type="url"
						id="src"
						value={src}
						onChange={(e) => setSrc(e.target.value)}
						required
					/>
				</div>
				<button className="submit-button" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default NewVideoForm;
