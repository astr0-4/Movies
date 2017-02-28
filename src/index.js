import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import FeedParser from 'feedParser'
import Header from './components/header'

const REQUEST_URL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${formatDate()}&zip=M5V+3M6&api_key=g9rwkqkcx8u5t5b978as7723`
const API_KEY = 'AIzaSyCj_uVTyjcKDV29wb0dQ_R_SfEC7UUUhSM'

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			trailers: []
		}
	}

	getTrailers() {
		// this.youTubeObjects(["Manchester by the sea", "Moonlight", "La la land", "moana"])
		// return 
    	fetch(REQUEST_URL)
			.then(response => response.json() )
			.then(responseData => {
				var titles = responseData.map((movie) => {
					return movie.title
				})
				return titles
			})
			.then(movies => {
				var movieTrailers = movies.map((movie) => {
					return movie + " Trailer"
				})
				var theMovies = this.youTubeObjects(movieTrailers)
				this.setState({trailers: theMovies})
			})
			.catch(error => {
				console.log('Error: ', error)
			})
  }

	youTubeObjects(titles) {
		const promises = titles.map(title => {
			return fetch(`https://www.googleapis.com/youtube/v3/search/?part=snippet&key=${API_KEY}&q=${title}&type=video`)
				.then(response => response.json())
				.then(data => data.items[0])
		})
		Promise.all(promises).then(items => this.setState({trailers: items}))
	}

	componentDidMount() {
		this.getTrailers()
	}

	render() {
		if (this.state.trailers) {
			return (
				<div>
					<SearchBar onSearchTermChanged={term => this.videoSearch(term)} />
					<VideoList trailers={this.state.trailers} />
				</div>
				)
			} else {
				return (
					<div>Loading...</div>
				)
			}
		}
}

ReactDOM.render(<App />, document.querySelector('.container'))
