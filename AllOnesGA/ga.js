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

    /**
	 * Evaluate the whole population
	 * 
	 * Essentially, loop over the individuals in the population, calculate the
	 * fitness for each, and then calculate the entire population's fitness. The
	 * population's fitness may or may not be important, but what is important
	 * here is making sure that each individual gets evaluated.
	 * 
	 * @param population
	 *            the population to evaluate
	 */
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

    /**
	 * Check if population has met termination condition
	 * 
	 * For this simple problem, we know what a perfect solution looks like, so
	 * we can simply stop evolving once we've reached a fitness of one.
	 * 
	 * @param population
	 * @return boolean True if termination condition met, otherwise, false
	 */
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

    /**
	 * Apply crossover to population
	 * 
	 * Crossover, more colloquially considered "mating", takes the population
	 * and blends individuals to create new offspring. It is hoped that when two
	 * individuals crossover that their offspring will have the strongest
	 * qualities of each of the parents. Of course, it's possible that an
	 * offspring will end up with the weakest qualities of each parent.
	 * 
	 * This method considers both the GeneticAlgorithm instance's crossoverRate
	 * and the elitismCount.
	 * 
	 * The type of crossover we perform depends on the problem domain. We don't
	 * want to create invalid solutions with crossover, so this method will need
	 * to be changed for different types of problems.
	 * 
	 * This particular crossover method selects random genes from each parent.
	 * 
	 * @param population
	 *            The population to apply crossover to
	 * @return The new population
	 */
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

    /**
	 * Apply mutation to population
	 * 
	 * Mutation affects individuals rather than the population. We look at each
	 * individual in the population, and if they're lucky enough (or unlucky, as
	 * it were), apply some randomness to their chromosome. Like crossover, the
	 * type of mutation applied depends on the specific problem we're solving.
	 * In this case, we simply randomly flip 0s to 1s and vice versa.
	 * 
	 * This method will consider the GeneticAlgorithm instance's mutationRate
	 * and elitismCount
	 * 
	 * @param population
	 *            The population to apply mutation to
	 * @return The mutated population
	 */
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


}



/**
 * Calculate fitness for an individual.
 * 
 * In this case, the fitness score is very simple: it's the number of ones
 * in the chromosome. Don't forget that this method, and this whole
 * GeneticAlgorithm class, is meant to solve the problem in the "AllOnesGA"
 * class and example. For different problems, you'll need to create a
 * different version of this method to appropriately calculate the fitness
 * of an individual.
 * 
 * @param individual
 *            the individual to evaluate
 * @return double The fitness value for individual
 */
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

/**
 * Select parent for crossover
 * 
 * @param population
 *            The population to select parent from
 * @return The individual selected as a parent
 */
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