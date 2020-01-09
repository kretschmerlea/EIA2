var Vogelhaus;
(function (Vogelhaus) {
    class Birds extends Vogelhaus.Moveable {
        constructor(_size) {
            super();
            this.colorBird = ["pink", "red", "yellow"];
            this.bird = new Path2D();
            this.bird = new Path2D();
            this.bird.arc(0, 0, 20, 0, 2 * Math.PI);
            this.bird.arc(15, 15, 25, 0, 1.5 * Math.PI);
            this.position = new Vogelhaus.Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vogelhaus.Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
            this.birdColor = -0.4 + Math.random() * 2.8;
            this.birdColor = Number(this.birdColor.toFixed(0));
            console.log(this.birdColor);
            this.draw();
        }
        draw() {
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(this.position.x, this.position.y);
            Vogelhaus.crc2.fillStyle = this.colorBird[this.birdColor];
            Vogelhaus.crc2.fill(this.bird);
            Vogelhaus.crc2.restore();
        }
    }
    Vogelhaus.Birds = Birds;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Birds.js.map