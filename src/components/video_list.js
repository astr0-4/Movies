import React from 'react'
import VideoDetail from './video_detail'

const VideoList = (props) => {
	if (props.trailers) {
		const videoItems = props.trailers.map((trailer) => {
			return <VideoDetail 
			video={trailer} />
		})
	return (
		<div>    
			<ul class="list-container">
				{videoItems}
			</ul>
		</div>
	)
	}
}

export default VideoList
