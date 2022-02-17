import React from 'react';
import { Pie } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Card, CardContent, Typography } from '@mui/material';
import { defaults } from 'chart.js';

defaults.font.family = 'Roboto';

function getPieData(data) {
  const arr = [0, 0, 0];

  data.scores.forEach((score) => {
    if (score.score === 'positive') {
      ++arr[0];
    } else if (score.score === 'negative') {
      ++arr[1];
    } else if (score.score === 'neutral') {
      ++arr[2];
    }
  });

  return arr;
}

export default function PieChart(props) {
  const data = {
    labels: ['POSITIVE', 'NEGATIVE', 'NEUTRAL'],
    datasets: [
      {
        data: getPieData(props.data),
        backgroundColor: ['green', 'red', 'blue'],
        borderColor: 'grey',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 1 }}>
      <CardContent>
        <Typography variant='h3' component='h2'>
          Pie Chart
        </Typography>
        <Pie options={options} data={data} />
      </CardContent>
    </Card>
  );
}
