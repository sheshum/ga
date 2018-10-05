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
        this.DIRECTION = { N: 'north', S: 'south', E: 'east', W: 'west'};
        this.sensorActions = this.calcSensorActions(sensorActions);
        this.maze = maze;
        let startPos = this.maze.getStartPosition();
        this.xPosition = startPosition[0];
        this.yPosition = startPosition[1];

        this.sensorVal = -1;
        this.heading = this.DIRECTION.N;
        this.maxMoves = maxMoves;
        this.moves = 0;
        this.route = [];
        this.route.push(startPos);
    }

    run() {
        while(true) {
            this.moves++;

            return;
        }
    }
    calcSensorActions(sensorActionsStr) {}
    makeNextAction() {}
    getNextAction() {}


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
        if(this.getHeading() == this.DIRECTION.N) {

        }
        else if(this.getHeading() == this.DIRECTION.E) {
            
        }
        else if(this.getHeading() == this.DIRECTION.S) {
            
        }
        else if(this.getHeading() == this.DIRECTION.W) {
            
        }
        else {

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
    }


    getPosition() {
        return [this.xPosition, this.yPosition];
    }

    getHeading() {
        return this.heading;
    }

    getRoute() {
        return this.route;
    }

    printRoute() {}
}

module.exports = Robot;

