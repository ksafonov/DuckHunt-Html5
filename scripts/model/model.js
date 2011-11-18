function PlayModel(visibleAreaProvider) {
    var ducks = new Array();
    var score = 0;
    var areaProvider = visibleAreaProvider;

    _.extend(this, Backbone.Events);

    this.advanceAllDucks = function() {
        for (var i = 0; i < ducks.length; i++) {
            var duck = ducks[i];
            duck.advance();
        }
    };

    this.createNewDuck = function() {
        var fliesToTheRight = Math.random() >= 0.5;
        var duck = new Duck(fliesToTheRight);
        ducks.push(duck);

        var duckImageSize = duck.getImageSize();
        var visibleArea = areaProvider();
        var area = new Rectangle(visibleArea.getLeft() - duckImageSize.getWidth() + 1, visibleArea.getTop(), visibleArea.getRight() - 1 + duckImageSize.getWidth(), visibleArea.getHeight());
        duck.setLocation(new Point(duck.fliesToTheRight() ? area.getLeft() : area.getRight(), area.getTop() + Math.random() * area.getHeight()));
        this.trigger("duckCreated", duck);
    };
}