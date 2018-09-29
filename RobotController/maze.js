/**
 * This class abstracts a maze through which a robot will have to navigate. The
 * maze is represented as a 2d array of integers, with different environment
 * types represented by integers as follows:
 * 
 * 0 = Empty 
 * 1 = Wall 
 * 2 = Starting position 
 * 3 = Route 
 * 4 = Goal position
 * 
 * The most significant method in this class is `scoreRoute`, which will return
 * a fitness score for a path; it is this score that the genetic algorithm will
 * optimize.
 *
 */

"use strict";

class Maze {
    constructor(maze) {
        this.maze = maze;
        this.startingPosition = [-1, -1];
    }

    /**
	 * Get start position of maze
	 * 
	 * @return integer Array x,y start position of maze
	 */
    getStartingPosition() {}
    getPositionValue() {}
    isWall() {}
    getMaxX() {}
    getMaxY() {}
    scoreRoute(route) {}
}

module.exports = Maze;
