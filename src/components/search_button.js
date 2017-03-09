import React, { Component } from 'react';

class SearchButton extends Component {
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
	}
	render() {
		return (
			<button className="search-button" onClick={event => this.onClick()}>Find Trailers!</button>
		)
	}

	onClick() {
		this.props.searchForTrailers()
	}
}

export default SearchButton