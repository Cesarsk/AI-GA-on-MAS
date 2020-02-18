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
var dataFoods = Object.assign({}, data); 
var dataPoisons = Object.assign({}, data); 
var layoutMaxFitness = Object.assign({}, layout); 
var layoutDeaths = Object.assign({}, layout);
var layoutFoods = Object.assign({}, layout);
var layoutPoisons = Object.assign({}, layout);

var x = new Array();
var yFitness = new Array();
var yDeaths = new Array();
var yFoods = new Array();
var yPoisons = new Array();

var genTitle = "";

function updateHistograms() {
  genTitle = "P: "+populationSize+"; FR: "+randomFoodGeneration+"; E: "+elitism+'; MR: '+mutationRate+"; D: "+deathEnabled+";";
  x.push(generation);
  updateHistMaxFitness();
  updateHistDeaths();
  updateHistFoods();
  updateHistPoisons();
}

function updateHistMaxFitness() {
  document.getElementById("HistogramFitness").style.display = 'inherit'; //visible hidden
  layoutMaxFitness.title = genTitle;
  layoutMaxFitness.yaxis.title = 'Max Fitness';
  dataMaxFitness.y = yFitness;
  yFitness.push(maxFitness);
  Plotly.newPlot('HistogramFitness', [dataMaxFitness], layoutMaxFitness);
}

function updateHistDeaths() {
  document.getElementById("HistogramDeaths").style.display = 'inherit'; //visible hidden
  layoutDeaths.title = genTitle;
  layoutDeaths.yaxis.title = 'Deaths';
  dataDeaths.y = yDeaths;
  yDeaths.push(numberOfDead);
  Plotly.newPlot('HistogramDeaths', [dataDeaths], layoutDeaths);
}

function updateHistFoods() {
  document.getElementById("HistogramFoods").style.display = 'inherit'; //visible hidden
  layoutFoods.title = genTitle;
  layoutFoods.yaxis.title = 'Foods';
  dataFoods.y = yFoods;
  yFoods.push(numberOfFoodEaten);
  Plotly.newPlot('HistogramFoods', [dataFoods], layoutFoods);
}

function updateHistPoisons() {
  document.getElementById("HistogramPoisons").style.display = 'inherit'; //visible hidden
  layoutPoisons.title = genTitle;
  layoutPoisons.yaxis.title = 'Poisons';
  dataPoisons.y = yPoisons;
  yPoisons.push(numberOfPoisonEaten);
  Plotly.newPlot('HistogramPoisons', [dataPoisons], layoutPoisons);
}

function resetHistograms() {
  document.getElementById("HistogramFitness").style.display = 'none'; //visible hidden
  document.getElementById("HistogramDeaths").style.display = 'none'; //visible hidden
  document.getElementById("HistogramFoods").style.display = 'none'; //visible hidden
  document.getElementById("HistogramPoisons").style.display = 'none'; //visible hidden
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