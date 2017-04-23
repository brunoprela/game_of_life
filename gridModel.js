/**
 * Creates a starting 20x20 grid of 0s.
 * @returns {Array} - A 20x20 grid of 0s.
 */
var buildStartGrid = function(){
    // Using underscore-min.js for easier and more varied functionals.
    const DEAD = 0;
    return _.range(400).map(function(){
        return DEAD;
    });
};

/**
 * Turns (x,y) cardinal coordinates into an index for use in the game of life grid array.
 * @param xCoord - The would-be x cardinal coordinate.
 * @param yCoord - The would-be y cardinal coordinate.
 * @param sideLength - The length of the side of the grid (in cells).
 * @returns {int} - The index corresponding to the (xCoord, yCoord) cardinal coordinates.
 */
var coordinatesToSingleIndex = function(xCoord, yCoord, sideLength){
    return sideLength*((xCoord + sideLength) % sideLength) + ((yCoord + sideLength) % sideLength);
};

/**
 * Creates a random 20x20 grid of 0s or 1s.
 * @param percentAlive - Variable determining how likely a cell is to be populated as ALIVE.
 * @returns {Array} - The 20x20 grid of random values.
 */
var buildRandomGrid = function(percentAlive){
    const DEAD = 0;
    const ALIVE = 1;
    return _.range(400).map(function(){
        if (Math.random() <= percentAlive){
            return ALIVE;
        } else {
            return DEAD;
        }

    });
};

/**
 * Updates a given grid by the rules of Conway's Game of Life for one iteration.
 *
 *  Rules for Conway's Game of Life
 *      - If a dead cell has exactly 3 living neighbors, it comes to life.
 *      - If a live cell has < 2 living neighbors, it dies.
 *      - If a live cell has > 3 living neighbors, it dies.
 *      - If a live cell has 2 or 3 living neighbors, it continues living.
 *
 * @param grid {Array} - The grid to be updated.
 * @returns {Array} - The updated grid.
 */
var updateGrid = function(grid){
    const DEAD = 0;
    const ALIVE = 1;
    const sideLength = 20;
    // Shallow copy update grid to return so dimensions with grid are the same.
    var updatedGrid = grid.slice();

    // Looping through cells in grid.
    _.range(sideLength).forEach(function(xCoord){
        _.range(sideLength).forEach(function(yCoord){
            // List of neighbors.
            var neighborsList = [];
            var currentIndex = coordinatesToSingleIndex(xCoord,yCoord, sideLength);

            neighborsList.push(coordinatesToSingleIndex(xCoord+1, yCoord, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord-1, yCoord, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord, yCoord-1, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord, yCoord+1, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord+1, yCoord-1, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord-1, yCoord-1, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord+1, yCoord+1, sideLength));
            neighborsList.push(coordinatesToSingleIndex(xCoord-1, yCoord+1, sideLength));

            // // Getting coordinates of neighbors (8 in total). // Tried other method that I couldn't figure out but left for reference
            // var neighborCoordinateList = [[xCoord, yCoord+1],
            //                             [xCoord, yCoord-1],
            //                             [xCoord+1, yCoord],
            //                             [xCoord-1, yCoord],
            //                             [xCoord-1, yCoord+1],
            //                             [xCoord+1, yCoord-1],
            //                             [xCoord-1, yCoord-1],
            //                             [xCoord+1, yCoord+1]];
            //
            // // Adding cell neighbors to list.
            // neighborsList = neighborCoordinateList.map(function(coord){
            //     // console.log(a,b);
            //     console.log(coordinatesToSingleIndex(coord));
            //     // neighborsList.push(coordinatesToSingleIndex(a,b));
            //
            //     return (coordinatesToSingleIndex(coord));
            //     // console.log(coordinatesToSingleIndex(coord));
            //     // neighborsList.push(coordinatesToSingleIndex(coord));
            // });

            // Count number of living neighbors.
            var numLivingNeighbors = 0;
            neighborsList.forEach(function(neighbor){
                if (grid[neighbor] === ALIVE){
                    numLivingNeighbors ++;
                }
            });

            // Use rules of Conway's Game of Life to determine how to update cell.
            if (grid[currentIndex] === DEAD ){ // Cell is dead.
                if (numLivingNeighbors === 3) {
                    updatedGrid[currentIndex] = ALIVE;
                }
            } else { // Cell is alive.
                if (numLivingNeighbors > 3){ // "Overpopulation"
                    updatedGrid[currentIndex] = DEAD;
                } else if (numLivingNeighbors < 2){ // "Underpopulation"
                    updatedGrid[currentIndex] = DEAD;
                }else if (numLivingNeighbors === 2 || numLivingNeighbors === 3){ // "Reproduction"
                    updatedGrid[currentIndex] = ALIVE;
                }
            }
        });
    });
    return updatedGrid;
};

/*
    The grid preset options.
 */

var rorschach=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,
            0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,
            0,0,0,1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,0,0,
            0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var bomber=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
            0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,
            0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,
            0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var squareDance=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,
                0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var pinwheel=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,1,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,1,1,0,1,1,0,0,0,0,
            0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,1,0,0,0,0,
            0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


var starryNight=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,
                0,0,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,
                0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
                0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,
                0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,
                0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,1,1,1,0,0,1,1,0,0,0,1,0,0,0,1,1,1,0,
                0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
