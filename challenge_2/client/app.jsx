import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class HistoryChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      values: []
    }
  }

  componentDidMount() {
    fetch('/historicaldata')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('data:', JSON.stringify(data));
      const returnedDates = [];
      const returnedValues = [];

      for (var key in data.bpi) {
        returnedDates.push(key);
        returnedValues.push(data.bpi[key]);
      }

      this.setState({
        dates: returnedDates,
        values: returnedValues
      },
        () => {
          const myChart = new Chart(document.getElementById('myChart'), {
            type: 'line',
            data: {
              labels: this.state.dates,
              datasets: [{
                label: 'Closing Price (USD $)',
                data: this.state.values,
                fill: false,
                borderColor: 'rgba(248, 173, 22, 1)',
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Bitcoin Price Index',
                fontSize: 15
              },
              elements: {
                line: {
                  tension: 0
                }
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    displayFormats: {
                      quarter: 'll'
                    }
                  }
                }]
              }
            }
          });
        }
      );
    });
  }

  render() {
    return(
      <div>
        <canvas id="myChart" width="150" height="50"></canvas>
        <br />
        Powered by <a href="https://www.coindesk.com/price/bitcoin" target="_blank">Coin Desk</a>
      </div>
    )
  }
}

ReactDOM.render(<HistoryChart />, document.getElementById('app'));

