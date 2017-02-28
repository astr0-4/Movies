import React from 'react'
import VideoDetail from './video_detail'

const VideoList = (props) => {
	if (props.trailers) {
		const videoItems = props.trailers.map((trailer, index) => {
			return <VideoDetail video={trailer} key={index}/>
		})
	return (
		<div className="container">    
			<ul>
				{videoItems}
			</ul>
		</div>
	)
	}
}

export default VideoList
