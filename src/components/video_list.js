import React from 'react'
import VideoDetail from './video_detail'

const VideoList = (props) => {
	if (props.trailers) {
		const videoItems = props.trailers.map((trailer, index) => {
			return <VideoDetail video={trailer} key={index}/>
		})
			// <div className="col-md-12">
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
