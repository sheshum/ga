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
    this.chromosome = chromosome;
    this.fitness = -1;

    function getChromosome() {
        return this.chromosome;
    }

    function getChromosomeLength() {
        return this.chromosome.length;
    }

    /**
	 * Set gene at offset
	 * 
	 * @param gene
	 * @param offset
	 * @return gene
	 */
    function setGene(offset, gene) {
        this.chromosome[offset] = gene;
    }

    /**
	 * Get gene at offset
	 * 
	 * @param offset
	 * @return gene
	 */
    function getGene(offset) {
        return this.chromosome[offset];
    }

    function setFitness(fitness) {
        this.fitness = fitness;
    }

    function getFitness() {
        return this.fitness;
    }

    function _toString() {
        var _output = "";

        for(let i = 0; i < this.chromosome.length; i++) {
            _output += this.chromosome[i];
        }
        return _output;
    }
}

module.exports = Individual;