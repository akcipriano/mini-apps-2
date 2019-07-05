import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import parse from 'parse-link-header';
import HistoricalEvents from './components/historicalEvents.jsx'

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
    this.setState({searchedWord: event.target.value},
      console.log('searchedWord:', this.state.searchedWord));
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
          console.log('Number of results:', data.length);
          this.setState({numberOfEvents: data.length});
        })
        .catch(error => console.error('Error', error))

        //this will get the first 10 objects/matches to show on UI
        fetch(`${this.state.currentUrl}&_page=1&_limit=10`)
        .then(response => {
          console.log('response header', parse(response.headers.get('link')));
          return response.json();
        })
        .then(data => {
          this.setState({historicalEvents: data});
          console.log('Returned data from fetch:', data);
          this.setState({searchedWord: ''});
        })
        .catch(error => console.error('Error', error))
      }
    )
  }

  handlePageClick(data) {
    console.log('PAGE NUMBER', data.selected);
    const pageNumber = data.selected + 1;

    fetch(`${this.state.currentUrl}&_page=${pageNumber}&_limit=10`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({historicalEvents: data});
      console.log('Returned data from fetch:', data);
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
          <div>
            <HistoricalEvents events={this.state.historicalEvents}/>
            <ReactPaginate
              // previousLabel={'prev'}
              // nextLabel={'next'}
              // breakLabel={'...'}
              // breakClassName={'break-me'}
              // pageCount={Math.ceil(this.state.numberOfEvents/10)}
              pageCount={this.state.numberOfEvents/10}
              marginPagesDisplayed={5}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              // containerClassName={'pagination'}
              // subContainerClassName={'pages pagination'}
              // activeClassName={'active'}
            />
          </div>
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

