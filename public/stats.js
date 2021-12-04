function calculateTotalWeight(data) {
  const totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      }
      return total;
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}
//function for total distance
function calculateTotalDistance(data) {
  const totalD = [];

  data.forEach((workout) => {
    const workoutTotalD = workout.exercises.reduce((total, { type, distance }) => {
      if (type === 'cardio') {
        return total + distance;
      }
      return total;
    }, 0);

    totalD.push(workoutTotalD);
  });

  return totalD;
}
//function to label workouts
function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}

function populateChart(data) {
  const durations = data.map(({ totalDuration }) => totalDuration);
  const pounds = calculateTotalWeight(data);
  const distance = calculateTotalDistance(data);
  let workouts = workoutNames(data);


  const line = document.querySelector('#canvas').getContext('2d');
  const bar = document.querySelector('#canvas2').getContext('2d');
  const pie = document.querySelector('#canvas3').getContext('2d');
  const bar2 = document.querySelector('#canvas4').getContext('2d');

  const labels = data.map(({ day }) => {
    const date = new Date(day);

    // Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {display: true,
        title: {
          display: true,
          text: 'Time Spent Working Out',
          font: {
          size: 20,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: {top: 5, left: 0, right: 0, bottom: 20}
        },
      },
      },
    },
  });

  

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: [        'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: .9,
          data: durations,
          
        },
      ],
    },
    options: {
      plugins: {
        title: {
            display: true,
            text: 'Exercise Time',
            postion: 'bottom',

        },
      },
      
  }});


  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        YAxes: 
          {
            ticks: {
              beginAtZero: true,
            },
          },
          XAxes: 
          {display: true,
            title: {
              display: true,
              text: 'Total Workout Weight Lifted',
              font: {
              size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {top: 5, left: 0, right: 0, bottom: 60}
            },
            ticks: {
              beginAtZero: true,
            },
          },
      },
    },
  });


  let barChart2 = new Chart(bar2, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Miles',
          data: distance,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Distance Traveled',
      },
      scales: {
        XAxes: 
          {display: true,
            title: {
              display: true,
              text: 'Distance Traveled',
              font: {
              size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {top: 5, left: 0, right: 0, bottom: 20}
            },
            ticks: {
              beginAtZero: true,
            },
          },

        yAxes: 
          {
            ticks: {
              beginAtZero: true,
            },
          },
      },
    },
  });
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
