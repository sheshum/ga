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
 *
 */

 "use strict";

 class Individual {
    chromosome = [];
    fitness = -1;
    constructor(chromosomeLength) {
        initializeChromosome(chromosomeLength);
    }

    getChromosome = function() {
        return this.chromosome;
    }

    getChromosomeLength = function() {
        return this.chromosome.length;
    }

    setGene(offset, gene) {
        this.chromosome[offset] = gene;
    }
    getGene(offset) {
        return this.chromosome[offset];
    }

    setFitness = function(fitness) {
        this.fitness = fitness;
    }

    getFitness = function() {
        return this.fitness;
    }

    /**
	 * Display the chromosome as a string.
	 * 
	 * @return string representation of the chromosome
	 */
    _toString = function() {
        var _output = "";

        for(let i = 0; i < this.chromosome.length; i++) {
            _output += this.chromosome[i];
        }
        return _output;
    }
 }

/**
 * Initializes random individual.
 * 
 * This constructor assumes that the chromosome is made entirely of 0s and
 * 1s, which may not always be the case, so make sure to modify as
 * necessary. This constructor also assumes that a "random" chromosome means
 * simply picking random zeroes and ones, which also may not be the case
 * (for instance, in a traveling salesman problem, this would be an invalid
 * solution).
 * 
 * @param chromosomeLength
 *            The length of the individuals chromosome
 */
 function initializeChromosome(chromosomeLength) {
    for( let geneIndex = 0; geneIndex < chromosomeLength; 
        geneIndex++) {
            if ( 0.5 < Math.random() ) {
                this.setGene(geneIndex, 1);
            } else {
                this.setGene(geneIndex, 0);
            }
    }
 }

 module.exports = Individual;