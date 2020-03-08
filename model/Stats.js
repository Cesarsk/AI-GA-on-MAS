var layout = {
  title: {
    text: '',
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

var dataBar = {
  x: x,
  y: [],
  name: '',
  type: 'bar',
};

var dataAvg = {
  x: x,
  y: [],
  name: '',
  type: 'scatter',
};

var dataDev = {
  x: x,
  y: [],
  name: '',
  type: 'scatter',
};

// Layout
var layoutMaxFitness = Object.assign({}, layout);
var layoutDeaths = Object.assign({}, layout);
var layoutFoods = Object.assign({}, layout);
var layoutPoisons = Object.assign({}, layout);

// Bars
var dataBarMaxFitness = Object.assign({}, dataBar);
var dataBarDeaths = Object.assign({}, dataBar);
var dataBarFoods = Object.assign({}, dataBar);
var dataBarPoisons = Object.assign({}, dataBar);

// Avgs
var dataAvgMaxFitness = Object.assign({}, dataAvg);
var dataAvgDeaths = Object.assign({}, dataAvg);
var dataAvgFoods = Object.assign({}, dataAvg);
var dataAvgPoisons = Object.assign({}, dataAvg);

// Std. Dev
var dataDevMaxFitness = Object.assign({}, dataDev);
var dataDevDeaths = Object.assign({}, dataDev);
var dataDevFoods = Object.assign({}, dataDev);
var dataDevPoisons = Object.assign({}, dataDev);

// Generic Chart title
var genTitle = "";

// Generations
var x = new Array();

//values
var yFitness = new Array();
var yDeaths = new Array();
var yFoods = new Array();
var yPoisons = new Array();

//avgs
var yAverageFitness = new Array();
var yAverageDeaths = new Array();
var yAverageFoods = new Array();
var yAveragePoisons = new Array();

//std.deviation
var yStdDeviationFitness = new Array();
var yStdDeviationDeaths = new Array();
var yStdDeviationFoods = new Array();
var yStdDeviationPoisons = new Array();



function updateHistograms() {
  genTitle = "P: " + populationSize + "; FR: " + randomFoodGeneration + "; PR: " + randomPoisonGeneration + "; E: " + elitism + "; MR: " + mutationRate + "; D: " + deathEnabled + ";";
  x.push(generation);

  updateDataTest("Fitness", maxFitness, null);
  updateDataTest("Deaths", numberOfDeaths, populationSize);

  updateData("Food", layoutFoods,
    'Ingested Food', dataBarFoods, yFoods, numberOfFoodsEaten);

  updateData("Poison", layoutPoisons,
    'Ingested Poison', dataBarPoisons, yPoisons, numberOfPoisonsEaten);
}

function updateDataTest(id, data, data2) {
  document.getElementById(id).style.display = 'inherit'; //visible hidden

  switch (id) {
    case "Fitness":
      dataBarMaxFitness.y = yFitness;
      dataAvgMaxFitness.y = yAverageFitness;
      dataDevMaxFitness.y = yStdDeviationFitness;
      yFitness.push(data);
      yAverageFitness.push(calculateWeightedMean(yFitness, 1));
      yStdDeviationFitness.push(calculateStdDeviation(yFitness, yAverageFitness[yAverageFitness.length - 1]));

      // Set Title
      layout.title = genTitle;
      layout.yaxis.title = "Max Fitness";
      dataBarMaxFitness.name = 'Fitness';
      dataAvgMaxFitness.name = 'Average Fitness';
      dataDevMaxFitness.name = 'Std. Deviation Fitness';

      // Refresh Chart
      Plotly.newPlot(id, [dataBarMaxFitness, dataAvgMaxFitness, dataDevMaxFitness], layout);
      break;

    case "Deaths":
      dataBarDeaths.y = yDeaths;
      dataAvgDeaths.y = yAverageDeaths;
      dataDevDeaths.y = yStdDeviationDeaths;
      yDeaths.push(data);
      yAverageDeaths.push(calculateWeightedMean(yDeaths, data2));
      yStdDeviationDeaths.push(calculateStdDeviation(yDeaths, yAverageDeaths[yAverageDeaths.length - 1]));

      // Set Title
      layout.title = genTitle;
      layout.yaxis.title = "Dead Organisms";
      dataBarDeaths.name = 'Deaths';
      dataAvgDeaths.name = 'Average Deaths';
      dataDevDeaths.name = 'Std. Deviation Deaths';

      // Refresh Chart
      Plotly.newPlot(id, [dataBarDeaths, dataAvgDeaths, dataDevDeaths], layout);

      break;

    case "Food":
      
      break;

    case "Poison":
      break;

    default:
      alert("Error")
  }
}

function updateData(id, layout, layoutTitle, dataBar, y, value) {
  document.getElementById(id).style.display = 'inherit'; //visible hidden

  dataBar.y = y;
  y.push(value);

  // Set Title
  layout.title = genTitle;
  layout.yaxis.title = layoutTitle;

  // Refresh Chart
  Plotly.newPlot(id, [dataBar], layout);
}

function resetHistograms() {
  document.getElementById("Fitness").style.display = 'none'; //visible hidden
  document.getElementById("Deaths").style.display = 'none'; //visible hidden
  document.getElementById("Food").style.display = 'none'; //visible hidden
  document.getElementById("Poison").style.display = 'none'; //visible hidden
}

function calculateWeightedMean(x, w) {
  //x, w arrays
  var totalW = 0;
  var totalXW = 0;
  for (var i = 0; i < x.length; i++) {
    if (Array.isArray(w)) {
      totalXW += x[i] * w[i];
      totalW += w[i];
    }
    else {
      totalXW += x[i];
      totalW += 1;
    }
  }
  return totalXW / totalW;
}

function calculateStdDeviation(x, avg) {
  console.log("" + x + "," + avg);
  //x array, avg real value
  var acc = 0;
  var variance = 0;

  for (var i = 0; i < x.length; i++) {
    acc += Math.pow(x[i] - avg, 2);
  }

  variance = acc / x.length;
  var result = Math.sqrt(variance);
  return result;
}