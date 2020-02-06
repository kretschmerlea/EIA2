var Vogelhaus;
(function (Vogelhaus) {
    class Moveable {
        move() {
            this.position.add(this.velocity);
            if (this.position.x < 0)
                this.position.x += Vogelhaus.crc2.canvas.width;
            if (this.position.x > 800)
                this.position.x -= Vogelhaus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Vogelhaus.crc2.canvas.height;
            if (this.position.y > 600)
                this.position.y -= Vogelhaus.crc2.canvas.height;
        }
    }
    Vogelhaus.Moveable = Moveable;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Moveable.js.map