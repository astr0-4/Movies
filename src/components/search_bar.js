import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {term: ''}

		this.onSubmit = this.onSubmit.bind(this)
		this.onInputChange = this.onInputChange.bind(this)
	}

	render() {
		return (
			<form onSubmit={e => this.onSubmit(e)}>
				<h4>Enter your postal code to find movies playing near you</h4>
					<div className="search-bar">
						<input type="text" value={this.state.term}
						onChange={event => this.onInputChange(event.target.value)} />
						<button type="submit">Find Trailers</button>
					</div>
			</form>
		)
	}

	onSubmit(e) {
		// We have to call this to stop the default behaviour -- that is, a full page refresh 😒
		e.preventDefault()
		console.log("term " + this.state.term)
		console.log("event:" + event)
		this.props.onSubmit(this.state.term)
	}

	onInputChange(term) {
		console.log(term)
		this.setState({term})
	}
}

export default SearchBar
