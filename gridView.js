/**
 * Creates a GridView object.
 * @param gridDOM - The DOM element to build the GridView object in.
 * @returns {GridView} - The GridView object, in the DOM element specified.
 */
var GridView = function(gridDOM){
    // GridView object to be returned.
    var that = Object.create(GridView.prototype);

    // The div that will contain the game grid cells.
    var gridDivs = gridDOM.children().last();

    const DEAD = 0;
    const ALIVE = 1;

    /**
     * Sets the functionality on Start button click.
     * @param start - The function to set to the Start button.
     */
    that.setStartButtonFunction = function(start){
        that.startButtonFunction = start;
    };

    /**
     * Sets the functionality on Pause button click.
     * @param pause - The function to set to the Pause button.
     */
    that.setPauseButtonFunction = function(pause){
        that.pauseButtonFunction = pause;
    };

    /**
     * Sets the functionality on Randomize button click.
     * @param randomize - The function to set to the Randomize button.
     */
    that.setRandomizeButtonFunction = function(randomize){
        that.randomizeButtonFunction = randomize;
    };

    /**
     * Sets the functionality on Rorschach button click.
     * @param preset - The functionality on Rorschach button click.
     */
    that.setRorschachButtonFunction = function(preset){
        that.rorschachButtonFunction = preset;
    };

    /**
     * Sets the functionality on Bomber button click.
     * @param preset - The functionality on Bomber button click.
     */
    that.setBomberButtonFunction = function(preset){
        that.bomberButtonFunction = preset;
    };

    /**
     * Sets the functionality on Diamond button click.
     * @param preset - The functionality on Diamond button click.
     */
    that.setPinwheelButtonFunction = function(preset){
        that.pinwheelButtonFunction = preset;
    };

    /**
     * Sets the functionality on Square Dance button click.
     * @param preset - The functionality on Square Dance button click.
     */
    that.setStarryNightButtonFunction = function(preset){
        that.starryNightButtonFunction = preset;
    };

    /**
     * Sets the functionality on Square Dance button click.
     * @param preset - The functionality on Square Dance button click.
     */
    that.setSquareDanceButtonFunction = function(preset){
        that.squareDanceButtonFunction = preset;
    };

    /**
     * Sets the functionality on grid cell clicks.
     * @param cellClick - The functionality on grid cell clicks.
     */
    that.setCellClickFunction = function(cellClick){
        that.cellClickFunction = cellClick;
    };

    // Build pause button HTML and set click functionality.
    gridDOM.append('<button id="randomizeButton">Randomize</button>').children().last().on('click', function (){
        that.randomizeButtonFunction();
    });

    // Build rorschach button HTML and set click functionality.
    gridDOM.append('<button id="rorschachButton">Rorschach</button>').children().last().on('click', function (){
        that.rorschachButtonFunction();
    });

    // Build bomber button HTML and set click functionality.
    gridDOM.append('<button id="bomberButton">Bomber</button>').children().last().on('click', function (){
        that.bomberButtonFunction();
    });

    // Build pinwheel button HTML and set click functionality.
    gridDOM.append('<button id="pinwheelButton">Pinwheel</button>').children().last().on('click', function (){
        that.pinwheelButtonFunction();
    });

    // Build pinwheel button HTML and set click functionality.
    gridDOM.append('<button id="starryNightButton">Starry Night</button>').children().last().on('click', function (){
        that.starryNightButtonFunction();
    });

    // Build square dance button HTML and set click functionality.
    gridDOM.append('<button id="squareDanceButton">Square Dance</button>').children().last().on('click', function (){
        that.squareDanceButtonFunction();
    });

    gridDOM.append('<button id="startButton">Start</button>').children().last().on('click', function (){
        that.startButtonFunction();
    });

    // Build pause button HTML and set click functionality.
    gridDOM.append('<button id="pauseButton">Pause</button>').children().last().on('click', function (){
        that.pauseButtonFunction();
    });

    /**
     * Updates the HTML for the grid.
     * @param grid - The HTML grid to be updated.
     */
    that.updateGridView = function(grid){
        // Delete current grid.
        gridDivs.empty();
        // Redraw new grid.
        grid.forEach(function(gridCell){
            if (gridCell === 0){
                gridDivs.append('<div class="deadCell"></div>');
            } else {
                gridDivs.append('<div class="aliveCell"></div>');
            }
            gridDivs.children().last().on("click", function(){
                // Send index of cell HTML element to cellClickFunction.
                var cellIndex = $(this).index();
                that.cellClickFunction(cellIndex);
            });
        });
    };

    // Don't freeze so controller can modify some attributes.
    // Object.freeze(that);
    return that;
};

