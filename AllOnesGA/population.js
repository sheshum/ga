/**
 * A population is an abstraction of a collection of individuals. The population
 * class is generally used to perform group-level operations on its individuals,
 * such as finding the strongest individuals, collecting stats on the population
 * as a whole, and selecting individuals to mutate or crossover.
 *
 */
"use strict";

var Individual = require('./individual.js');

var Population = function() {
    this._individuals = [];
    this.populationFitness = -1;

    this.init = function(populationSize, chromosomeLength) {
        for(let count = 0; count < populationSize; count++) {
            var individual = new Individual();
            individual.init(chromosomeLength);
            this._individuals.push(individual);
        }
    }

    this.getIndividuals = function() {
        return this._individuals;
    }

    this.getSize = function() {
        return this._individuals.length;
    }

    this.setIndividual = function(offset, individual) {
        this._individuals[offset] = individual;
    }

    this.setPopulationFitness =  function(populationFitness) {
        this.populationFitness = populationFitness;
    }

    this.getPopulationFitness = function() {
        return this.populationFitness;
    }

    /**
	 * Find an individual in the population by its fitness
	 * 
	 * This method lets you select an individual in order of its fitness. This
	 * can be used to find the single strongest individual (eg, if you're
	 * testing for a solution), but it can also be used to find weak individuals
	 * (if you're looking to cull the population) or some of the strongest
	 * individuals (if you're using "elitism").
	 * 
	 * @param offset
	 *            The offset of the individual you want, sorted by fitness. 0 is
	 *            the strongest, population.length - 1 is the weakest.
	 * @return individual Individual at offset
	 */
    this.getFittest = function(offset) {
        this._individuals.sort((o1, o2) => {
            if(o1.getFitness() > o2.getFitness()) {
                return -1;
            } else if (o1.getFitness() < o2.getFitness()) {
                return 1;
            }
            return 0;
        });

        return this._individuals[offset];
    }
}

module.exports = Population;