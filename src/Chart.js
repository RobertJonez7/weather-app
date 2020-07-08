import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const state = {
        labels: ['12AM', '3AM', '6AM',
                 '9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [
          {
            fill: true,
            responsive: true,
            lineTension: 0.5,
            backgroundColor: 'teal',
            borderColor: 'teal',
            pointBackgroundColor: 'teal',
            pointBorderColor: 'black',
            borderWidth: 4,
            data: data,
            legend: false,
          }
        ]
    }

    const option = { 
      maintainAspectRatio: false,       
        legend: {
          display: false,
        }
    }

    return(
        <div className="line-container">
            <Line
                data={state}
                width={80} 
                height={12}
                options={option}
            />
        </div>
    )
}

export default Chart;