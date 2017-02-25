import React from 'react'
// import VideoListItem from './video_list_item'
import VideoDetail from './video_detail'

const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return <VideoDetail 
		video={video} />
	})
	return (
		<div className="col-lg-11 col-centered">    
			<ul>
				{videoItems}
			</ul>
		</div>
	)
}

export default VideoList
