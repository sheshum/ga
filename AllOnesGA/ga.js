"use strict";

var Population = require('./population.js');
var Individual = require('./individual.js');

var GeneticAlgorithm = function(populationSize, mutationRate, crossoverRate, elitismCount) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.elitismCount = elitismCount;

    this.initPopulation = function(chromosomeLength) {
        var population = new Population();
        population.init(this.populationSize, chromosomeLength);
        return population; 
    }

    this.evalPopulation = function(population) {
        if(population.__proto__.constructor.name !== 'Population') {
            throw Error("Expected argument: object of type [\'Population\']");
        } else {
            var populationFitness = 0;
            population._individuals.forEach((individual) => {
                populationFitness += calcFitness(individual);
            });
            
            population.setPopulationFitness(populationFitness);        
        }   
    }

    this.isTerminationConditionMet = function(population) {
        if(population.__proto__.constructor.name !== 'Population') {
            throw Error("Expected argument: object of type [\'Population\']");
        } else {
            var _individuals = population.getIndividuals();
            _individuals.forEach(member => {
                if(member.getFitness() == 1) {
                    return true;
                }
            });

            return false;
        }
    }

    

    this.crossoverPopulation = function(population) {

        // Create new population
        var _newPopulation = new Population();

        // Loop over current population by fitness
        for(let populationIndex = 0; populationIndex < population.getSize(); 
        populationIndex++) {
            var parent1 = population.getFittest(populationIndex);

            // Apply crossover to this individual?
            if(this.crossoverRate > Math.random() && populationIndex > this.elitismCount) {
                // Initialize offspring
                var offspring = new Individual();
                offspring.init(parent1.getChromosomeLength());

                // Find second parent
                var parent2 = selectParent(population);

                // Loop over genome
                for(let geneIndex = 0; geneIndex < parent1.getChromosomeLength(); geneIndex++) {
                    // Use half og parent1's genes and half of 
                    // parent2's genes
                    if(Math.random() < 0.5) {
                        offspring.setGene(geneIndex, parent1.getGene(geneIndex));
                    } else {
                        offspring.setGene(geneIndex, parent2.getGene(geneIndex));
                    }
                }

                // Add offspring to new population
                _newPopulation.setIndividual(populationIndex, offspring);
            } else {
                // Add individual to new population without
                // applying crossover
                _newPopulation.setIndividual(populationIndex, parent1);
            }
        }

        return _newPopulation;
    }


}

function calcFitness(individual) {
    var correctGenes = 0;
    for(let geneIndex = 0; geneIndex < individual.getChromosomeLength(); 
        geneIndex++) {
            if(individual.getGene(geneIndex) == 1) {
                correctGenes++;
            }
    }
    var fitness = correctGenes / individual.getChromosomeLength();
    individual.setFitness(fitness);
    return fitness;
}

function selectParent(population) {

    // Get individuals
    var _individuals = population.getIndividuals();

    // Spin roulette wheel
    var populationFitness = population.getPopulationFitness();
    var rouletteWheelPosition = Math.random() * populationFitness;

    // Find parent
    var spinWheel = 0;
    _individuals.forEach(individual => {
        spinWheel += individual.getFitness();
        if(spinWheel >= rouletteWheelPosition) {
            return individual;
        }
    });

    return _individuals[population.getSize() - 1];
}

module.exports = GeneticAlgorithm;