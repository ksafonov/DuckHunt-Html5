function Point(px, py) {
    var x = px;
    var y = py;

    this.getX = function () {
        return x;
    };

    this.getY = function () {
        return y;
    };

    this.setX = function (value) {
        x = value;
    };

    this.setY = function (value) {
        y = value;
    };

    this.offset = function (delta) {
        x += delta.getX();
        y += delta.getY();
    }
}

function Rectangle(px, py, pw, ph) {
    var x = px;
    var y = py;
    var width = pw;
    var height = ph;

    this.getX = function () {
        return x;
    };

    this.getLeft = function () {
        return this.getX();
    };

    this.getY = function () {
        return y;
    };

    this.getTop = function () {
        return this.getY();
    };

    this.getWidth = function () {
        return width;
    };

    this.getRight = function () {
        return this.getLeft() + this.getWidth();
    };

    this.getHeight = function () {
        return height;
    };

    this.getBottom = function () {
        return this.getTop() + this.getHeight();
    };

}

function getImgSize(imgSrc) {
    var newImg = new Image();
    newImg.src = imgSrc;
    var height = newImg.height;
    var width = newImg.width;
    return new Rectangle(0, 0, width, height);
}
