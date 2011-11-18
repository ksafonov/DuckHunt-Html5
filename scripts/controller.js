function Controller(visibleAreaProvider, pg) {
    /*
     * game frame rate in ms
     */
    var ADVANCE_DELAY = 100;

    /*
     * next duck appearance delay
     */
    var NEW_DUCK_DELAY = 1500;

    /*
     * play time in ms
     */
    const PLAY_TIME = 60 * 1000;

    var SVG_NS = "http://www.w3.org/2000/svg";
    var XLINK_NS = "http://www.w3.org/1999/xlink";

    var startTime;

    var advanceTimer;

    var newDuckTimer;

    var playground = pg;

    function scheduleAdvance(model) {
        advanceTimer = setTimeout(function() {
            if (getTimeLeft() <= 0) {
                gameOver();

            }
            model.advanceAllDucks();
            scheduleAdvance(model);
//            updateStatistics();
        }, ADVANCE_DELAY);
    }

    this.startGame = function() {
        var model = new PlayModel(visibleAreaProvider);

        model.bind("duckCreated", function(duck) {
            var shapeElement = document.createElementNS(SVG_NS, "svg");
            var imageElement = document.createElementNS(SVG_NS, "image");
            shapeElement.appendChild(imageElement);

            if (duck.fliesToTheRight()) {
                var transform = "matrix(-1 0 0 1 " + duck.getImageSize().getWidth() + " 0) ";
                imageElement.setAttribute("transform", transform);
            }
            playground.appendChild(shapeElement);

            duck.bind("duckChanged", function(hit) {
                updateDuckImage(duck, shapeElement);
            });
            updateDuckImage(duck, shapeElement);
        });

        scheduleAdvance(model);

        newDuckTimer = setInterval(function() {
            model.createNewDuck();
        }, NEW_DUCK_DELAY);

        startTime = new Date().getTime();
    };

    function getTimeLeft() {
        var currentTime = new Date().getTime();
        return (startTime + PLAY_TIME - currentTime) / 1000;
    }

    function gameOver() {
        clearInterval(newDuckTimer);
    }

    function updateDuckImage(duck, shapeElement) {
        var imageElement = shapeElement.childNodes[0];
        imageElement.setAttributeNS(XLINK_NS, "xlink:href", duck.getImagePath());
        var location = duck.getLocation();
        shapeElement.setAttribute("x", location.getX());
        shapeElement.setAttribute("y", location.getY());

        var imageSize = duck.getImageSize();
        imageElement.setAttribute("width", imageSize.getWidth());
        imageElement.setAttribute("height", imageSize.getHeight());
//        shapeElement.setAttribute("width", imageSize.getWidth());
//        shapeElement.setAttribute("height", imageSize.getHeight());
    }
}

