/**
 * Please see chapter2/GeneticAlgorithm for additional comments.
 * 
 * This GeneticAlgorithm class is designed to solve the
 * "Robot Controller in a Maze" problem, and is necessarily a little different
 * from the chapter2/GeneticAlgorithm class.
 * 
 * This class introduces the concepts of tournament selection and single-point
 * crossover. Additionally, the calcFitness method is vastly different from the
 * AllOnesGA fitness method; in this case we actually have to evaluate how good
 * the robot is at navigating a maze!
 *
 */

"use strict";

class GeneticAlgorithm {
    constructor(populationSize, mutationRate, crossoverRate, 
        elitismCount, tournamentSize) {
            this.populationSize = populationSize;
            this.mutationRate = mutationRate;
            this.crossoverRate = crossoverRate;
            this.elitismCount = elitismCount;
            this.tournamentSize = tournamentSize;
    }
}

module.exports = GeneticAlgorithm;