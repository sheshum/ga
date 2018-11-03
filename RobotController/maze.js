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
        this.startingPosition = { x: -1, y: -1};
    }

    /**
	 * Get start position of maze
	 * 
	 * @return integer Array x,y start position of maze
	 */
    getStartingPosition() {
        if (this.startingPosition.x != -1 && this.startingPosition.y != -1) {
            return this.startingPosition;
        }

        // Default return value
        let _startPos = { x: 8, y: 0};

        // Loop over rows
        for( let row = 0; row < this.maze.length; row++) {
            // Loop over columns
            for(let col = 0; col < this.maze[row].length; col++) {
                // 2 is the type for start position
                if(this.maze[row][col] == 2) {
                    this.startingPosition = { x: col, y: row };
                    return { x: col, y: row };
                }
            }
        }

        return _startPos;
    }

    getPositionValue(x, y) {
        let retVal = null;
        if (x < 0 || y < 0 || x >= this.maze.length ||
            y >= this.maze.length) {
                return 1;
        }
        try {
            retVal = this.maze[y][x];
        } catch (error) {
            console.log(error);
        }
        return retVal;
    }

    isWall(x, y) {
        return (this.getPositionValue(x, y) == 1)
    }

    getMaxX() {
        return this.maze[0].length - 1;
    }
    getMaxY() {
        return this.maze.length - 1;
    }

    /**
     * 
     * @param {Array} route 
     */
    scoreRoute(route) {
        var score = 0;
        var visited = Array.from(Array(9), () => new Array(9).fill(false));
        var cond = route.length;
        // Loop over and score each move
        route.forEach(function(routeStep) {
            var step = routeStep;

            if(this.maze[step.y][step.x] == 3 && 
                visited[step.y][step.x] == false) {
                
                // Increase score for correct move
                score++;

                // Remove reward
                visited[step.y][step.x] = true;
            }
        }, this);

        return score;
    }
}

module.exports = Maze;
