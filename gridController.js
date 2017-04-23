/**
 * Creates a GridController object.
 * @param GridView - The view being controlled by this controller.
 * @returns {GridController} - The controller object.
 */
var GridController = function(GridView){
    // gridController to be returned.
    var that = Object.create(GridController.prototype);

    const DEAD = 0;
    const ALIVE = 1;
    // Set variables.
    var startGrid = buildStartGrid();
    that.grid = startGrid.slice();
    // Citing http://www.w3schools.com/js/js_timing.asp
    that.intervalID = 0; // Determines game interval. Starts paused.

    // Set the functions necessary for the view to update based on the model.
    GridView.setCellClickFunction(function(index){
        that.toggleCell(index);
    });

    GridView.setStartButtonFunction(function(){
        that.start();
    });

    GridView.setPauseButtonFunction(function(){
        that.pause();
    });

    GridView.setRandomizeButtonFunction(function(){
        that.pause();
        const percentAlive = 0.25;
        that.grid = buildRandomGrid(percentAlive);
        GridView.updateGridView(that.grid);
    });

    GridView.setRorschachButtonFunction(function(){
        that.pause();
        that.grid = rorschach;
        GridView.updateGridView(that.grid);
    });

    GridView.setBomberButtonFunction(function(){
        that.pause();
        that.grid = bomber;
        GridView.updateGridView(that.grid);
    });

    GridView.setPinwheelButtonFunction(function(){
        that.pause();
        that.grid = pinwheel;
        GridView.updateGridView(that.grid);
    });

    GridView.setStarryNightButtonFunction(function(){
        that.pause();
        that.grid = starryNight;
        GridView.updateGridView(that.grid);
    });

    GridView.setSquareDanceButtonFunction(function(){
        that.pause();
        that.grid = squareDance;
        GridView.updateGridView(that.grid);
    });

    GridView.updateGridView(that.grid);

    /**
     * Pauses the game.
     */
    that.pause = function(){
        // Stops "timer" of the game and pauses it.
        clearInterval(that.intervalID);
        that.intervalID = 0;
    };

    /**
     * Starts the game if it has not already been started.
     */
    that.start = function(){
        // Checks if the game is paused when the start button is clicked.
        if(that.intervalID === 0){
            // Updates interval as well as the grid seen by the controller and the view.
            that.intervalID = setInterval(function(){
                // Grid seen by controller.
                that.grid = updateGrid(that.grid);
                // Grid seen by view.
                GridView.updateGridView(that.grid);
            }, 150);
        }
    };

    /**
     * Kills the cell if it is ALIVE, and revives the cell if it is DEAD.
     * @param cellIndex - The index of the cell in the grid that is being toggled.
     */
    that.toggleCell = function(cellIndex){
        // If alive, kill the cell, and vice versa.
        if (that.grid[cellIndex] === ALIVE){
            that.grid[cellIndex] = DEAD;
        } else if(that.grid[cellIndex] === DEAD){
            that.grid[cellIndex] = ALIVE;
        }
        // Update the view to reflect changes made by controller.
        GridView.updateGridView(that.grid);
    };

    // Don't freeze so controller can modify some attributes.
    // Object.freeze(that);
    return that;
};

























