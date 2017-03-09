import React from 'react'
import VideoDetail from './video_detail'

const VideoList = (props) => {
	if (props.movies) {
		const videoItems = props.movies.map((movie, index) => {
			console.log("videoList:", movie)
			return <VideoDetail movie={movie} key={index}/>
		})
	return (
		<div className="row">
			<div className="col-md-12">
				<ul>
					{videoItems}
				</ul>
			</div>
		</div>
	)
	}
}
export default VideoList
