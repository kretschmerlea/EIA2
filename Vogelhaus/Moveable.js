var Vogelhaus;
(function (Vogelhaus) {
    class Moveable {
        move() {
            this.position.add(this.velocity);
            if (this.position.x < -50)
                this.position.x += Vogelhaus.crc2.canvas.width + 50;
            if (this.position.x > 850)
                this.position.x -= Vogelhaus.crc2.canvas.width + 50;
            if (this.position.y < -50)
                this.position.y += Vogelhaus.crc2.canvas.height + 50;
            if (this.position.y > 650)
                this.position.y -= Vogelhaus.crc2.canvas.height + 70;
        }
    }
    Vogelhaus.Moveable = Moveable;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Moveable.js.map