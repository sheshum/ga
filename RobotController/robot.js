/**
 * A robot abstraction. Give it a maze and an instruction set, and it will
 * attempt to navigate to the finish.
 *
 */

"use strict";

class Robot {

    /**
     * Initialize a robot with controller
     * 
     * @param sensorActions The string to map the sensor value to actions
     * @param maze The maze the robot will use
     * @param maxMoves The maximum number of moves the robot can take
     */
    constructor(sensorActions, maze, maxMoves) {
        this.DIRECTION = { NORTH: 'north', SOUTH: 'south', EAST: 'east', WEST: 'west'};
        this.sensorActions = this.calcSensorActions(sensorActions);
        this.maze = maze;
        let startPos = this.maze.getStartingPosition();
        this.xPosition = startPos.x; // column
        this.yPosition = startPos.y; // row

        this.sensorVal = -1;
        this.heading = this.DIRECTION.EAST;
        this.maxMoves = maxMoves;
        this.moves = 0;
        this.route = [];
        this.drawingRoute = [];
        this.route.push({x: startPos.x, y: startPos.y});
        this.drawingRoute.push({ move: { x: startPos.x, y: startPos.y } });
    }

    run() {
        while(true) {
            this.moves++;

            // Break if the robot stops moving
            if(this.getNextAction() == 0) {
                return;
            }

            // Break if we reach the goal
            if(this.maze.getPositionValue(this.xPosition, this.yPosition) == 4) {
                return;
            }

            // Break if we reach a maximum number of moves
            if(this.moves > this.maxMoves) {
                return;
            }

            // Run action
            this.makeNextAction();
        }
    }

    /**
     * Map robot's data to actions from binary string
     * 
     * @param {String} sensorActionsStr 
     * @returns int Array an array to map sensor value to an action
     */
    calcSensorActions(sensorActionsStr) {
        let numActions = sensorActionsStr.length / 2;
        let _sensorActions = [];

        // Loop through actions
        for (let i = 0; i < numActions; i++) {
            // Get sensor action
            let _action = 0;
            if(sensorActionsStr[i * 2] == 1) {
                _action += 2;
            }
            if(sensorActionsStr[(i * 2) + 1] == 1) {
                _action += 1;
            }

            _sensorActions[i] = _action;
        }

        return _sensorActions;
    }

    /**
     * Runs the next action
     */
    makeNextAction() {

        var _nextAction = this.getNextAction();
        // If move forward
        if(_nextAction == 1) {
            let currentX = this.xPosition;
            let currentY = this.yPosition;

            // Move depending on current direction
            if (this.DIRECTION.NORTH == this.heading) {
                this.yPosition--;
                if(this.yPosition < 0) {
                    this.yPosition = 0;
                }
            }
            else if (this.DIRECTION.EAST == this.heading) {
                this.xPosition++;
                if(this.xPosition > this.maze.getMaxX()) {
                    this.xPosition = this.maze.getMaxX();
                }
            }
            else if (this.DIRECTION.SOUTH == this.heading) {
                this.yPosition++;
                if(this.yPosition > this.maze.getMaxY()) {
                    this.yPosition = this.maze.getMaxY();
                }
            }
            else if (this.DIRECTION.WEST == this.heading) {
                this.xPosition--;
                if(this.xPosition < 0) {
                    this.xPosition = 0;
                }
            }

            // We can't move here
            if (this.maze.isWall(this.xPosition, this.yPosition) == true) {
                this.xPosition = currentX;
                this.yPosition = currentY;
            }
            else {
                if(currentX !== this.xPosition || currentY !== this.yPosition) {
                    var pos = this.getPosition();
                    this.route.push({ x: pos.x, y: pos.y});
                    this.drawingRoute.push({ move: { x: pos.x, y: pos.y } });
                }
            }
        }
        // Move clockwise
        else if (_nextAction == 2) {
            if(this.DIRECTION.NORTH == this.heading) {
                this.heading = this.DIRECTION.EAST;
            }
            else if(this.DIRECTION.EAST == this.heading) {
                this.heading = this.DIRECTION.SOUTH;
            }
            else if(this.DIRECTION.SOUTH == this.heading) {
                this.heading = this.DIRECTION.WEST;
            }
            else if(this.DIRECTION.WEST == this.heading) {
                this.heading = this.DIRECTION.NORTH;
            }
            this.drawingRoute.push( { turn: { clockwise: true } } );
        }
        // Move anti-ckockwise
        else if (_nextAction == 3) {
            if(this.DIRECTION.NORTH == this.heading) {
                this.heading = this.DIRECTION.WEST;
            }
            else if(this.DIRECTION.EAST == this.heading) {
                this.heading = this.DIRECTION.NORTH;
            }
            else if(this.DIRECTION.SOUTH == this.heading) {
                this.heading = this.DIRECTION.EAST;
            }
            else if(this.DIRECTION.WEST == this.heading) {
                this.heading = this.DIRECTION.SOUTH;
            }
            this.drawingRoute.push( { turn: { clockwise: false } } );
        }

        // Reset sensor value
        this.sensorVal = -1;
    }

    /**
     * Get next action depending on sensor mapping
     * 
     * @returns int Next action
     */
    getNextAction() {
        return this.sensorActions[this.getSensorValue()];
    }


    /**
     * Get sensor value
     * 
     * @returns int Next sensor value
     */
    getSensorValue() {
        // If sensor value has already been calculated
        if(this.sensorVal > -1) {
            return this.sensorVal;
        }

        let frontSensor, frontLeftSensor, frontRightSensor,
            leftSensor, rightSensor, backSensor;

        frontSensor = frontLeftSensor = frontRightSensor = leftSensor =
            rightSensor = backSensor = false;

        // Find which sensor have been activated
        if(this.getHeading() == this.DIRECTION.NORTH) {
            frontSensor = this.maze.isWall(this.xPosition, this.yPosition - 1);
            frontLeftSensor = this.maze.isWall(this.xPosition - 1, this.yPosition - 1);
            frontRightSensor = this.maze.isWall(this.xPosition + 1, this.yPosition - 1);
            leftSensor = this.maze.isWall(this.xPosition - 1, this.yPosition);
            rightSensor = this.maze.isWall(this.xPosition + 1, this.yPosition);
            backSensor = this.maze.isWall(this.xPosition, this.yPosition + 1);
        }
        else if(this.getHeading() == this.DIRECTION.EAST) {
            frontSensor = this.maze.isWall(this.xPosition + 1, this.yPosition);
            frontLeftSensor = this.maze.isWall(this.xPosition + 1, this.yPosition - 1);
            frontRightSensor = this.maze.isWall(this.xPosition + 1, this.yPosition + 1);
            leftSensor = this.maze.isWall(this.xPosition, this.yPosition - 1);
            rightSensor = this.maze.isWall(this.xPosition, this.yPosition + 1);
            backSensor = this.maze.isWall(this.xPosition - 1, this.yPosition);
        }
        else if(this.getHeading() == this.DIRECTION.SOUTH) {
            frontSensor = this.maze.isWall(this.xPosition, this.yPosition + 1);
            frontLeftSensor = this.maze.isWall(this.xPosition + 1, this.yPosition - 1);
            frontRightSensor = this.maze.isWall(this.xPosition - 1, this.yPosition + 1);
            leftSensor = this.maze.isWall(this.xPosition + 1, this.yPosition);
            rightSensor = this.maze.isWall(this.xPosition - 1, this.yPosition);
            backSensor = this.maze.isWall(this.xPosition, this.yPosition - 1);
        }
        else if(this.getHeading() == this.DIRECTION.WEST) {
            frontSensor = this.maze.isWall(this.xPosition - 1, this.yPosition);
            frontLeftSensor = this.maze.isWall(this.xPosition - 1, this.yPosition + 1);
            frontRightSensor = this.maze.isWall(this.xPosition - 1, this.yPosition - 1);
            leftSensor = this.maze.isWall(this.xPosition, this.yPosition + 1);
            rightSensor = this.maze.isWall(this.xPosition, this.yPosition - 1);
            backSensor = this.maze.isWall(this.xPosition + 1, this.yPosition);
        }
       

        // Calculate sensor value
        let sensorVal = 0;

        if (frontSensor == true) {
            sensorVal += 1;
        }
        if (frontLeftSensor == true) {
            sensorVal += 2;
        }
        if (frontRightSensor == true) {
            sensorVal += 4;
        }
        if (leftSensor == true) {
            sensorVal += 8;
        }
        if (rightSensor == true) {
            sensorVal += 16;
        }
        if (backSensor == true) {
            sensorVal += 32;
        }

        this.sensorVal = sensorVal;

        return sensorVal;
    }


    getPosition() {
        return { x: this.xPosition, y: this.yPosition};
    }

    getHeading() {
        return this.heading;
    }

    getRoute() {
        return this.route;
    }

    getDrawingRoute() {
        return this.drawingRoute;
    }

    printRoute() {
        let routeString = "";
        this.route.forEach(function(step) {
            routeString += `{ ${step[0]}, ${step[1]}}`;
        });

        return routeString;
    }
}

module.exports = Robot;

