import React, { Component } from 'react';
import SearchButton from './search_button'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {term: ''}

		this.onClick = this.onClick.bind(this)
		this.onInputChange = this.onInputChange.bind(this)
	}

	render() {
		return (
			<div className="search-bar">
				<h1>Enter your postal code to find movies playing near you</h1>
				<input type="text" value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
				<div>
					<SearchButton searchForTrailers={postalCode => this.onClick()} />
				</div>
			</div>
		)
	}

	onClick() {
		this.props.getTrailers(this.state.term)
	}

	onInputChange(term) {
		this.setState({term})
	}
}

export default SearchBar
