import React from 'react';
import ReactDOM from 'react-dom';
import BowlingPin from './components/bowling-pin.jsx';
import NumberOfPinsSelection from './components/number-of-pins.jsx'

class BowlingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //state: something
    }
  }

  render() {
    return(
      <div>
        Finger Bowling
        <br /><br />
        <div>
          <NumberOfPinsSelection />
        </div>
        <br/>
        <div className="set">
          <BowlingPin /><BowlingPin /><BowlingPin /><BowlingPin />
          <div>
          <BowlingPin /><BowlingPin /><BowlingPin />
          </div>
          <BowlingPin /><BowlingPin />
          <div>
          <BowlingPin />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BowlingBoard />, document.getElementById('app'));

