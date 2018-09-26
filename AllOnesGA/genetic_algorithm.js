
// var populationSize, 
//     mutationRate, 
//     crossoverRate, 
//     elitismCount;

var Individual = require('./individual.js');

var individual1 = new Individual([1,1,1]);
var individual2 = new Individual([0,0,0,]);

var Population = [];
Population.push(individual1);
Population.push(individual2);

Population.forEach(function(val) {
    console.log(val);
})



var GeneticAlgorithm = function(populationSize, mutationRate, crossoverRate, elitismCount) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.elitismCount = elitismCount;
}