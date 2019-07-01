<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=10.0">
    <meta http-equiv="X-UA-Compatiable" content="ie=edge">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <title>CO2 Counter Dashboard</title>
  </head>
  <body>
    <div class="container">
      <canvas id="myChart"></canvas>
    </div>

    <script>
      let myChart = document.getElementById('myChart').getContext('2d');

      Chart.defaults.global.defaultFontFamily = 'lato';
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = '#777';

      let co2Chart =  new Chart(myChart, {
        type: 'pie',
        data:{
          labels:['Marcin', 'Jonny', 'Darren'],
          datasets:[{
            label:'CO2 score',
            data:[
              125,
              224,
              328
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ],
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 4,
            hoverBorderColor:'#000'
          }]
        },
        options:{
          title:{
            display:true,
            text:'CO2 Scores',
            fontSize: 25
          },
          legend:{
            display: true;
            position:'right',
            labels:{
              foncColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }
      });
    </script>
  </body>
</html>
