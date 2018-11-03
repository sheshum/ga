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


const Population = require('./population');
const Individual = require('./individual');
const Robot = require('./robot');

class GeneticAlgorithm {
    constructor(populationSize, mutationRate, crossoverRate, 
        elitismCount, tournamentSize) {
            this.populationSize = populationSize;
            this.mutationRate = mutationRate;
            this.crossoverRate = crossoverRate;
            this.elitismCount = elitismCount;
            this.tournamentSize = tournamentSize;
    }

    initPopulation (chromosomeLength) {
        let population = new Population(this.populationSize, chromosomeLength);
        //population.init(this.populationSize, chromosomeLength);
        return population;
    }

    evalPopulation(population, maze) {
        let populationFitness = 0;
        let _individuals = population.getIndividuals();

        for (let count = 0; count < _individuals.length; 
            count++) {
                populationFitness += calcFitness( _individuals[ count ], maze );
        }

        population.setPopulationFitness( populationFitness );
    }

    isTerminationConditionMet(generationsCount, maxGenerations) {
        return (generationsCount > maxGenerations);
    }


    crossoverPopulation(population) {
        // Create new population
        let newPopulation = new Population(population.getSize());

        // Loop over current population by fitness
        for (let i = 0; i < population.getSize(); i++) {
            let parent1 = population.getFittest(i);

            // Apply crossover to this individual?
            if (this.crossoverRate > Math.random() && i >= this.elitismCount) {
                // Initialize offspring
                let offspring = new Individual(parent1.getChromosomeLength());

                // Find second parent
                let parent2 = selectParent(population, this.tournamentSize);

                // Get random swap point
                let swapPoint = Math.floor(Math.random() * (parent1.getChromosomeLength() + 1));
                
                // Loop over genom
                for (let geneIndex = 0; geneIndex < parent1.getChromosomeLength(); geneIndex++) {
                    // Use half parent1's genes and half of parent2's genes
                    if(geneIndex < swapPoint) {
                        offspring.setGene(geneIndex, parent1.getGene(geneIndex));
                    } else {
                        offspring.setGene(geneIndex, parent2.getGene(geneIndex));
                    }
                }

                // Add offspring to new population
                newPopulation.setIndividual(i, offspring);
            } else {
                // Add individual to new population without applying crossover
                newPopulation.setIndividual(i, parent1);
            }
        }

        return newPopulation;
    };

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
	 * @param {Population} population
	 *            The population to apply mutation to
	 * @return The mutated population
	 */
    mutatePopulation(population) {
        var _newPopulation = new Population();

        // Loop over current population by fitness
        for(let populationIndex = 0; populationIndex < population.getSize(); 
        populationIndex++) {
            var _individual = population.getFittest(populationIndex);

             // Skip mutation if this is an elite individual
             if(populationIndex >= this.elitismCount) {
                  // Loop over individual's genes
                for(let geneIndex = 0; geneIndex < _individual.getChromosomeLength(); 
                    geneIndex++) {
               
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
};

function calcFitness(individual, maze) {
    let chromosome = individual.getChromosome();
    let robot  = new Robot(chromosome, maze, 100);
    robot.run();
    var fitness = maze.scoreRoute(robot.getRoute());
    individual.setFitness(fitness);
    return fitness;
}

function selectParent(population, tournamentSize) {
    // Create tournament
    var tournament = new Population(tournamentSize);

    // Add random individuals to the tournamnent
    population.shuffle();
    for (let i = 0; i < tournamentSize; i++) {
        let tournamentIndividual = population.getIndividual(i);
        tournament.setIndividual(i, tournamentIndividual);
    }

    // Return the best
    return tournament.getFittest(0);
}

module.exports = GeneticAlgorithm;