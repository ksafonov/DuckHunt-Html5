function BaseDuck(toTheRight) {

    var fliesToTheRight = toTheRight;
    var hit = false;
    var dismissed = false;
    var location;
    var counter = 0;

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
        return "";
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
        return new Point();
    }

    function moveBySinusoid(leftToRight, frameCount) {
        var verticalOffset = AMPLITUDE * (Math.cos(frameCount * PERIOD / 2 / Math.PI));
        return new Point(leftToRight ? FLY_SPEED : -FLY_SPEED, verticalOffset);
    }

}
