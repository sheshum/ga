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

    }

    run() {}
    calcSensorActions(sensorActionsStr) {}
    makeNextAction() {}
    getNextAction() {}
    getSensorValue() {}
    getPosition() {}
    getHeading() {}
    getRoute() {}
    printRoute() {}
}

module.exports = Robot;

