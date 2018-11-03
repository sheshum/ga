/**
 * The main executive module for the Robot Controller problem in chapter 3.
 * 
 * We'll create a maze by hand, and feed it to the GeneticAlgorithm's
 * `evalPopulation` method, which is then responsible for scoring an abstract
 * robot with sensors against the maze.
 *
 */

"use strict";

const Maze = require('./maze');
const GeneticAlgorithm = require('./ga');


/**
 * 
 * Initialize a maze. We'll write this by hand, because, y'know, this
 * book isn't called "maze generation algorithms".
 * 
 * The 3s represent the correct route through the maze. 1s are walls
 * that can't be navigated through, and 0s are valid positions, but not
 * the correct route. You can follow the 3s visually to find the correct
 * path through the maze.
 * 
 * If you've read the docblock for
 * GeneticAlgorithm::isTerminationConditionMet, I mention that we don't
 * know what a perfect solution looks like, so the only constraint we
 * can give the algorithm is the number of generations. That's both true
 * and untrue. In this case, because we made the maze by hand, we
 * actually DO know the winning fitness: it's 29, or the number of 3s
 * below! However, we can't use that as a termination condition; if this
 * maze were procedurally generated we would not necessarily know that
 * the magic number is 29.
 * 
 * As a reminder: 
 * 0 = Empty 
 * 1 = Wall 
 * 2 = Starting position 
 * 3 = Route 
 * 4 = Goal position
 * 
 */
var maze = new Maze([
    [ 0, 0, 0, 0, 1, 0, 1, 3, 2 ],
    [ 1, 0, 1, 1, 1, 0, 1, 3, 1 ],
    [ 1, 0, 0, 1, 3, 3, 3, 3, 1 ],
    [ 3, 3, 3, 1, 3, 1, 1, 0, 1 ],
    [ 3, 1, 3, 3, 3, 1, 1, 0, 0 ],
    [ 3, 3, 1, 1, 1, 1, 0, 1, 1 ],
    [ 1, 3, 0, 1, 3, 3, 3, 3, 3 ],
    [ 0, 3, 1, 1, 3, 1, 0, 1, 3 ],
    [ 1, 3, 3, 3, 3, 1, 1, 1, 4 ]
]);

/**
 * Upper bound for the number of generations to run for. 200 generations is
 * sufficient to find the path about 50% of the time, but for demonstration
 * purposes we've set this high by default.
 */
var maxGenerations = 1000;


let ga = new GeneticAlgorithm( 200, 0.05, 0.9, 2, 10 );

// Initialize population
let population = ga.initPopulation( 128 );

// Evaluate population
ga.evalPopulation( population, maze );

let generation = 1;

// Start evolution loop
while(ga.isTerminationConditionMet(generation, maxGenerations) == false) {
    // Print fittest individual from population
    var fittest = population.getFittest(0);
    console.log(`Gen ${generation}, Best solution F(${fittest.getFitness()}): [ ${fittest._toString()} ]` );

    // Apply crossover
    population = ga.crossoverPopulation(population);

    // Apply mutation
    population = ga.mutatePopulation(population);

    // Evaluate population
    ga.evalPopulation( population, maze );

    // Increment the current generation
    generation++;
}

// Print results
console.log(`Stopped after ${generation - 1} generations.`);
var fittest = population.getFittest(0);
console.log(`Best solution F(${fittest.getFitness()}): [ ${fittest._toString()} ]`);



