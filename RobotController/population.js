/**
 * A population is an abstraction of a collection of individuals. The population
 * class is generally used to perform group-level operations on its individuals,
 * such as finding the strongest individuals, collecting stats on the population
 * as a whole, and selecting individuals to mutate or crossover.
 *
 */
"use strict";

const Individual = require('./individual');

class Population {
    

    constructor(populationSize, chromosomeLength) {
        this._individuals = [];
        this.populationFitness = -1;
        createPopulation.call(this, populationSize, chromosomeLength)
    }

    init(populationSize, chromosomeLength) {
        for(let count = 0; count < populationSize; count++) {
            var individual = new Individual(chromosomeLength);
            this._individuals.push(individual);
        }
    }

    getIndividuals() {
        return this._individuals;
    }

    getSize() {
        return this._individuals.length;
    }
    getIndividual(offset) {
        return this._individuals[offset];
    }

    setIndividual(offset, individual) {
        this._individuals[offset] = individual;
    }

    setPopulationFitness(populationFitness) {
        this.populationFitness = populationFitness;
    }

    getPopulationFitness() {
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
    getFittest(offset) {
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

     /**
	 * Shuffles the population in-place
	 * 
	 * @param void
	 * @return void
	 */
    shuffle() {
       
        for (let i = 0; i < this._individuals.length; i++) {
            let index = getRandomInt( i + 1 );
            let a = this._individuals[index];
            this._individuals[index] = this._individuals[i];
            this._individuals[i] = a;
        }
    }
};

function createPopulation(populationSize, chromosomeLength) {
    for(let count = 0; count < populationSize; count++) {
        var individual = new Individual(chromosomeLength);
        this._individuals.push(individual);
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Population;