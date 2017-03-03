import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {term: ''}
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

	onSubmit(event) {
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
