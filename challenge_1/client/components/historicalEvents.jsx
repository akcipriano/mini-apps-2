import React from 'react';

const historicalEvents = (props) => {

  let counter = 0;
  return props.events.map(event => {
      counter++;
      return (
        <div key={counter}>
          {event.description} <br />
          Date/Year: {event.date} <br /><br />
        </div>
      )
  });
}

export default historicalEvents;