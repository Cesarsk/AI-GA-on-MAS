var layout = {
    xaxis:{
       'tickformat': ',d'
    },
    yaxis:{
      side:'left'
    }
}

var x = new Array();
var y = new Array();

function updateHistograms() {
    x.push(generation);
    y.push(maxFitness);
    var data = [{
        type: 'bar',
        x: x,
        y: y,
      }];
    Plotly.newPlot('Histogram', data, layout);
}

function resetHistograms() {
    //Plotly.newPlot('Histogram', []); 
}

function testHistogram() {
    var data = [{
        type: 'bar',
        x: x,
        y: y,
      }];
      
      var layout = {
          xaxis:{
             'tickformat': ',d'
          },
          yaxis:{
            side:'left'
          }
      }
      
      Plotly.newPlot('Histogram', data, layout);
}