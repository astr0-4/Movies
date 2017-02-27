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
const API_KEY = 'AIzaSyCj_uVTyjcKDV29wb0dQ_R_SfEC7UUUhSM'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			trailers: []
		}
	}

	trailers() {
		this.youTubeObjects(["Manchester by the sea", "Moonlight", "La la land", "moana"])
		
		return 

    	fetch(REQUEST_URL)
        .then(response => response.json() )
        .then(responseData => {
			console.log(responseData)
			var titles = responseData.map((movie) => {
				return movie.title
			})
			return titles
        })
		.then(movies => {
			console.log(movies)
			var theMovies = this.ts(movies)
			console.log(theMovies)
			this.setState(theMovies)
			return theMovies 
		})
        .catch(error => {
            console.log('Error: ', error)
        })
  }

	videoSearch(term) {
		var vid;
	 	YTSearch({key: API_KEY, term: term}, (videos) => {
			 vid = videos[0]
			 console.log("vid:" + JSON.stringify(vid))
		})
		return vid
	}

	youTubeObjects(titles) {
		var stuff = []
		titles.map((title) => {
			
			YTSearch({key: API_KEY, term: title}, (videos) => {
				console.log(videos[0])
				stuff.push(videos[0])
				this.setState({trailers: stuff})		
			})
			return stuff
		})
		
	}

	componentDidMount() {
		this.youTubeObjects(
			["Manchester by the sea", "Moonlight", "La la land", "moana"])
	}

	render() {
	if(this.state.trailers) {
		console.log("render:" + this.state.trailers)
		return (
				<div>
				{/*{JSON.stringify(this.movieTitles())}*/}
				{/*<SearchBar onSearchTermChanged={term => this.videoSearch(term)} />*/}
				<VideoList 
					trailers={this.state.trailers} />
			</div>
		)
			}
			else {
				return (
					<div>Loading...</div>
				)
			}
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
