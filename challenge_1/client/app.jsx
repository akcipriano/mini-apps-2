import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import HistoricalEvents from './components/historicalEvents.jsx';

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedWord: '',
      numberOfEvents: 0,
      currentUrl: '',
      historicalEvents: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleChange(event) {
    this.setState({searchedWord: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({currentUrl: `http://localhost:3000/events?q=${this.state.searchedWord}`},
      () => {
        //this will get the number of related events found
        fetch(this.state.currentUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({numberOfEvents: data.length});
        })
        .catch(error => console.error('Error', error))

        //this will get the first 10 objects/matches to show on UI
        fetch(`${this.state.currentUrl}&_page=1&_limit=10`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({historicalEvents: data});
          this.setState({searchedWord: ''});
        })
        .catch(error => console.error('Error', error))
      }
    )
  }

  handlePageClick(number) {
    const pageNumber = number.selected + 1;

    fetch(`${this.state.currentUrl}&_page=${pageNumber}&_limit=10`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({historicalEvents: data});
    })
    .catch(error => console.error('Error', error))
  }

  render() {
    if (this.state.historicalEvents.length > 0) {
      return (
        <div>
          Historical Events Finder
          <br />
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.searchedWord} placeholder="Keyword" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <br />
          <br />
          Related event(s) found:
          <br />
          <br />
            <HistoricalEvents events={this.state.historicalEvents}/>
            <ReactPaginate
              pageCount={Math.ceil(this.state.numberOfEvents/10)}
              marginPagesDisplayed={5}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
            />
        </div>
      )
    } else {
      return (
        <div>
          Historical Events Finder
          <br />
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.searchedWord} placeholder="Keyword" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Search" />
          </form>
        </div>
      )
    }
  }
}

ReactDOM.render(<Finder />, document.getElementById('app'));

