import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import FeedParser from 'feedParser'
import Header from './components/header'

const REQUEST_URL = 'http://localhost:5000/api'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			videos: [],
			selectedVideo: null,
			responseData: {},
		}

		// this.videoSearch('surfboards')
	}

	componentDidMount() {
		this.getMovieTitles()
	}

	getMovieTitles() {
    	fetch(REQUEST_URL)
        .then(response => response.json() )
        .then(responseData => {
			var movieTitles = responseData.map((movie) => {
				return movie.title
			})

			this.setState({ movieTitles })
        })
        .catch(error => {
            console.log('Error: ', error)
        })
  }

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos : videos,
				selectedVideo: videos[0]
			})
		})
	}

	render() {
		// const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300)
		return (
			<div>
				{JSON.stringify(this.state.movieTitles)}
				<SearchBar onSearchTermChanged={term => this.videoSearch(term)} />
				<VideoList 
					videos={this.state.videos} /> 
			</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
