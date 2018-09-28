/**
 * An "Individual" represents a single candidate solution. The core piece of
 * information about an individual is its "chromosome", which is an encoding of
 * a possible solution to the problem at hand. A chromosome can be a string, an
 * array, a list, etc -- in this class, the chromosome is an integer array. 
 * 
 * An individual position in the chromosome is called a gene, and these are the
 * atomic pieces of the solution that can be manipulated or mutated. When the
 * chromosome is a string, as in this case, each character or set of characters
 * can be a gene.
 * 
 * An individual also has a "fitness" score; this is a number that represents
 * how good a solution to the problem this individual is. The meaning of the
 * fitness score will vary based on the problem at hand.
 */



"use strict";

/**
 * @param {Array} chromosome
 */

var Individual = function(chromosome) {

    if(chromosome) this.chromosome = chromosome;
    else this.chromosome = []; 
    this.fitness = -1;

    /**
	 * Initializes random individual.
	 * 
	 * This method assumes that the chromosome is made entirely of 0s and
	 * 1s, which may not always be the case, so make sure to modify as
	 * necessary. This method also assumes that a "random" chromosome means
	 * simply picking random zeroes and ones, which also may not be the case
	 * (for instance, in a traveling salesman problem, this would be an invalid
	 * solution).
	 * 
	 * @param {Number} chromosomeLength
	 *            The length of the individuals chromosome
	 */
    this.init = function(chromosomeLength) {
        this.chromosome = [];
        
        for(let offset = 0; offset < chromosomeLength; offset++) {
            if(0.5 < Math.random()) {
                this.setGene(offset, 1);
            } else {
                this.setGene(offset, 0);
            }
        }
    }

    this.getChromosome = function() {
        return this.chromosome;
    }

    this.getChromosomeLength = function() {
        return this.chromosome.length;
    }

    /**
	 * Set gene at offset
	 * 
	 * @param gene
	 * @param offset
	 */
    this.setGene = function(offset, gene) {
        this.chromosome[offset] = gene;
    }

    /**
	 * Get gene at offset
	 * 
	 * @param offset
	 * @return gene
	 */
    this.getGene = function(offset) {
        return this.chromosome[offset];
    }

    this.setFitness = function(fitness) {
        this.fitness = fitness;
    }

    this.getFitness = function() {
        return this.fitness;
    }

    /**
	 * Display the chromosome as a string.
	 * 
	 * @return string representation of the chromosome
	 */
    this._toString = function() {
        var _output = "";

        for(let i = 0; i < this.chromosome.length; i++) {
            _output += this.chromosome[i];
        }
        return _output;
    }
}

module.exports = Individual;