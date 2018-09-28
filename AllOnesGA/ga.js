/**
 * The GeneticAlgorithm class is our main abstraction for managing the
 * operations of the genetic algorithm. This class is meant to be
 * problem-specific, meaning that (for instance) the "calcFitness" method may
 * need to change from problem to problem.
 * 
 * This class concerns itself mostly with population-level operations, but also
 * problem-specific operations such as calculating fitness, testing for
 * termination criteria, and managing mutation and crossover operations (which
 * generally need to be problem-specific as well).
 * 
 * Generally, GeneticAlgorithm might be better suited as an abstract class or an
 * interface, rather than a concrete class as below. A GeneticAlgorithm
 * interface would require implementation of methods such as
 * "isTerminationConditionMet", "calcFitness", "mutatePopulation", etc, and a
 * concrete class would be defined to solve a particular problem domain. For
 * instance, the concrete class "TravelingSalesmanGeneticAlgorithm" would
 * implement the "GeneticAlgorithm" interface. This is not the approach we've
 * chosen, however, so that we can keep each chapter's examples as simple and
 * concrete as possible.
 * 
 */


"use strict";

var Population = require('./population.js');
var Individual = require('./individual.js');

/**
 * Mutation rate is the fractional probability than an individual gene will
 * mutate randomly in a given generation. The range is 0.0-1.0, but is
 * generally small (on the order of 0.1 or less).
 * @param mutationRate
 */

/**
 * Crossover rate is the fractional probability that two individuals will
 * "mate" with each other, sharing genetic information, and creating
 * offspring with traits of each of the parents. Like mutation rate the
 * rance is 0.0-1.0 but small.
 * @param crossoverRate
 */

/**
 * Elitism is the concept that the strongest members of the population
 * should be preserved from generation to generation. If an individual is
 * one of the elite, it will not be mutated or crossover.
 * @param elitismCount
 */
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
            for(let geneIndex = 0; geneIndex < _individuals.length;
            geneIndex++) {
                if(_individuals[geneIndex].getFitness() == 1) {
                    return true;
                }
            }

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
                //offspring.init(parent1.getChromosomeLength());

                // Find second parent
                var parent2 = selectParent(population);

                // Loop over genome
                for(let geneIndex = 0; geneIndex < parent1.getChromosomeLength(); geneIndex++) {
                    // Use half og parent1's genes and half of 
                    // parent2's genes
                    if(0.5 > Math.random()) {
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

    this.mutatePopulation = function(population) {
        var _newPopulation = new Population();

        // Loop over current population by fitness
        for(let populationIndex = 0; populationIndex < population.getSize(); 
        populationIndex++) {
            var _individual = population.getFittest(populationIndex);

            // Loop over individual's genes
            for(let geneIndex = 0; geneIndex < _individual.getChromosomeLength(); 
            geneIndex++) {
                // Skip mutation if this is an elite individual
                if(populationIndex >= elitismCount) {
                    // Does this gene need mutation?
                    if (this.mutationRate > Math.random()) {
                        // Get new gene
                        var _newGene = 1;
                        if(_individual.getGene(geneIndex) == 1) {
                            _newGene = 0;
                        }

                        // Mutate gene
                        _individual.setGene(geneIndex, _newGene);
                    }
                }
            }

            // Add individual to population
            _newPopulation.setIndividual(populationIndex, _individual);
        }

        // Return mutated population
        return _newPopulation;
    }


} // CLASS END

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
    for (let i = 0; i < _individuals.length; i++) {
        spinWheel += _individuals[i].getFitness();
        if(spinWheel >= rouletteWheelPosition) {
            return _individuals[i];
        }
    }

    return _individuals[population.getSize() - 1];
}

module.exports = GeneticAlgorithm;