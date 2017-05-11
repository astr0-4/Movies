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
			<div>
			<div className="search-bar row">
			<h1>Enter your postal code to find movies playing near you</h1>
			</div>
			<div className="row">
				<div className="col-md-6">
					<input type="text" value={this.state.term}
						onChange={event => this.onInputChange(event.target.value)} />
				</div>
				<div className="col-md-6">
					<SearchButton searchForTrailers={postalCode => this.onClick()} />
				</div>
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
