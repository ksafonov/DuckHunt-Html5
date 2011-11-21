function LazyDuck(toTheRight) {

    var FLY_SPEED = 10; // pixels per frame

    var PERIOD = 50; // frames

    var AMPLITUDE = 10; // pixels

    var FALL_SPEED = 30; // pixels per frame

    var fliesToTheRight = toTheRight;
    var hit = false;
    var dismissed = false;
    var location;
    var counter = 0;

    var images = ["images/lazyDuck/alive1.png", "images/lazyDuck/alive2.png", "images/lazyDuck/alive3.png"];

    _.extend(this, Backbone.Events);

    this.fliesToTheRight = function() {
        return fliesToTheRight;
    };

    this.setLocation = function(loc) {
        location = loc;
    };

    this.getLocation = function() {
        return location;
    };

    this.getImageSize = function() {
        return getImgSize(this.getImagePath());
    };

    this.getImagePath = function() {
        return images[counter % images.length];
    };

    this.advance = function() {
        if (dismissed) {
            return;
        }

        var offset = move();
        location.offset(offset);
//        if (_hit) {
//            _aliveFrames.advance();
//        } else {
//            _hitFrames.advance();
//        }
        this.trigger("duckChanged", false);
        counter++;
    };

    function move() {
        if (hit) {
            return new Point(0, FALL_SPEED);
        } else {
            return moveBySinusoid(fliesToTheRight, counter);
        }
    }

    function moveBySinusoid(leftToRight, frameCount) {
        var verticalOffset = AMPLITUDE * (Math.cos(frameCount * PERIOD / 2 / Math.PI));
        return new Point(leftToRight ? FLY_SPEED : -FLY_SPEED, verticalOffset);
    }

}

LazyDuck.prototype = BaseDuck;
