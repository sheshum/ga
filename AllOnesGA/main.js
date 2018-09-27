"use strict";

var GeneticAlgorithm = require('./ga.js');

var ga = new GeneticAlgorithm(5, 0.01, 0.95, 0);
var population = ga.initPopulation(10);

ga.evalPopulation(population);

// Keep track of current generation
var generation  = 1;

while ( ga.isTerminationConditionMet(population) == false && generation < 5 ) {
    console.log(`Generation: ${generation}, Best solution: ${JSON.stringify(population.getFittest(0))}`);

    // Apply crossover
    population = ga.crossoverPopulation(population);


    // Apply mutation
    // TODO!


    // Evaluate population
    ga.evalPopulation(population);

    // Increment the current generation
    generation++;   
}

console.log(`Found solution in ${generation} generations.`);
console.log(`Best solution: ${JSON.stringify(population.getFittest(0))}`);