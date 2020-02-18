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
  
  updateHistogram("HistogramFitness",layoutMaxFitness,
  'Max Fitness',dataMaxFitness,yFitness,maxFitness);

  updateHistogram("HistogramDeaths",layoutDeaths,
  'Deaths',dataDeaths,yDeaths,numberOfDeaths);

  updateHistogram("HistogramFoods",layoutFoods,
  'Foods',dataFoods,yFoods,numberOfFoodsEaten);

  updateHistogram("HistogramPoisons",layoutPoisons,
  'Poisons',dataPoisons,yPoisons,numberOfPoisonsEaten);
}

function updateHistogram(id, layout, layoutTitle, data, y, value) {
  document.getElementById(id).style.display = 'inherit'; //visible hidden
  layout.title = genTitle;
  layout.yaxis.title = layoutTitle;
  data.y = y;
  y.push(value);
  Plotly.newPlot(id, [data], layout);
}

function resetHistograms() {
  document.getElementById("HistogramFitness").style.display = 'none'; //visible hidden
  document.getElementById("HistogramDeaths").style.display = 'none'; //visible hidden
  document.getElementById("HistogramFoods").style.display = 'none'; //visible hidden
  document.getElementById("HistogramPoisons").style.display = 'none'; //visible hidden
}