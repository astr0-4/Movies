import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import FeedParser from 'feedParser'
import Header from './components/header'

const API_KEY = 'AIzaSyCj_uVTyjcKDV29wb0dQ_R_SfEC7UUUhSM'
const REQUEST_URL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-02-24&zip=M5V+3M6&api_key=g9rwkqkcx8u5t5b978as7723'


class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			videos: [],
			selectedVideo: null
		}

		this.videoSearch('surfboards')
	}

	moviesQuery() {
		var xhr = new XMLHttpRequest()
		xhr.open("GET", REQUEST_URL, false)
		xhr.send()
		console.log(JSON.parse(xhr.responseText))
		return JSON.parse(xhr.responseText)
	}

	termsFromMoviesObjects() {
		var movies = this.moviesQuery()
		var movieTitles = movies.map((movie) => {
			console.log(movie.title)
			// return movie.title
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
		this.termsFromMoviesObjects()
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300)
		return (
			<div>
				<SearchBar onSearchTermChanged={term => this.videoSearch(term)} />
				<VideoList 
					videos={this.state.videos} /> 
			</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
