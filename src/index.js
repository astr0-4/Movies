import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import { formatDate } from './helpers'

const BASE_REQUEST_URL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${formatDate()}`
const ST_API_KEY = `api_key=g9rwkqkcx8u5t5b978as7723`
const YT_API_KEY = 'AIzaSyCj_uVTyjcKDV29wb0dQ_R_SfEC7UUUhSM'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			movies: []
		}

		this.getTrailers = this.getTrailers.bind(this)
		this.youTubeObjects = this.youTubeObjects.bind(this)
	}

	getTrailers(postalCode) {
		// this.youTubeObjects(["Manchester by the sea", "Moonlight", "La la land", "moana"])
		// return
		let url = BASE_REQUEST_URL + "&zip=" + postalCode + "&" + ST_API_KEY
		console.log(url)
    	fetch(url)
			.then(response => response.json() )
			.then(responseData => {
				console.log(responseData)
				var movies = responseData.map((movieItem) => {
					var movie = {
						title: movieItem.title,
						theatre: movieItem.theatre,
						description: movieItem.shortDescription,
						youTubeVideo: null
					}
					return movie
				})
				return movies
			})
				
			.then(movies => {
				this.youTubeObjects(movies)
			})
			.catch(error => {
				console.log('Error: ', error)
			})
  }

	youTubeObjects(movies) {
		const promises = movies.map((movie) => {
			return fetch(`https://www.googleapis.com/youtube/v3/search/?part=snippet&key=${YT_API_KEY}&q=${movie.title + "Trailer"}&type=video`)
				.then(response => response.json())
				.then(data => {
					movie.youTubeVideo = data.items[0]
				})
				.catch(error => {
					console.log('Error: ', error)
				})
		})
		Promise.all(promises).then(items => this.setState({movies: movies}))
	}

	componentDidMount() {
		this.getTrailers("V2B+4A6")
	}

	render() {
		if (this.state.movies) {
			return (
				<div>
					<SearchBar getTrailers={postalCode => this.getTrailers(postalCode)} />
					<VideoList movies={this.state.movies}/>
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
