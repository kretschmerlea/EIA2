var Vogelhaus;
(function (Vogelhaus) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    Vogelhaus.Vector = Vector;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Vector.js.map