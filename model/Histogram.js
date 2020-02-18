var layout = {
  title: {
    text:'',
    font: {
      family: 'Courier New, monospace',
      size: 18
    },
    xref: 'paper',
    x: 0.05,
  },

  xaxis: {
    title: {
      text: 'Generations',
    },
    'tickformat': ',d',
  },
  yaxis: {
    title: {
      text: 'Value',
    },
    side: 'left'
  }
}

var data = {
  x: x,
  y: [],
  type: 'bar',
};

var dataMaxFitness = Object.assign({}, data); 
var dataDeaths = Object.assign({}, data); 
var layoutMaxFitness = Object.assign({}, layout); 
var layoutDeaths = Object.assign({}, layout);

var x = new Array();
var yFitness = new Array();
var yDeaths = new Array();

var genTitle = "";

function updateHistograms() {
  genTitle = "Population: "+populationSize+"; Food Rate: "+randomFoodGeneration+"; Elitism: "+elitism+'; Mutation Rate: '+mutationRate+"; Death: "+deathEnabled+";";
  x.push(generation);
  updateHistMaxFitness();
  updateHistDeaths();
}

function updateHistMaxFitness() {
  layoutMaxFitness.title = genTitle;
  layoutMaxFitness.yaxis.title = 'Max Fitness';
  dataMaxFitness.y = yFitness;
  yFitness.push(maxFitness);
  Plotly.newPlot('HistogramFitness', [dataMaxFitness], layoutMaxFitness);
}

function updateHistDeaths() {
  layoutDeaths.title = genTitle;
  layoutDeaths.yaxis.title = 'Deaths';
  dataDeaths.y = yDeaths;
  yDeaths.push(numberOfDead);
  Plotly.newPlot('HistogramDeaths', [dataDeaths], layoutDeaths);
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
    xaxis: {
      'tickformat': ',d'
    },
    yaxis: {
      side: 'left'
    }
  }

  Plotly.newPlot('Histogram', data, layout);
}