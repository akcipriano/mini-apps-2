import React from 'react';
import ReactDOM from 'react-dom';

class Bowling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //state: something
    }
  }

  render() {
    return(
      <div>
        React
      </div>
    )
  }
}

ReactDOM.render(<Bowling />, document.getElementById('app'));

