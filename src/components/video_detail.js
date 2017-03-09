import React from 'react'

const VideoDetail = ({movie}) => {
	console.log(movie)
	if (!movie) {
		return <div>Loading...</div>
	}
	const videoId = movie.youTubeVideo.id.videoId
	const url = `https://www.youtube.com/embed/${videoId}`
	return (
		<div className="row">
		<div className="col-md-8">
		<div className="video-detail">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe className="embed-responsive-item" src={url}></iframe>
			</div>
		</div>
		</div>
		<div className="col-md-4">
			<div className="details">
				<h6>{movie.title}</h6>
			</div>
			</div>
		</div>
	)
}

export default VideoDetail
