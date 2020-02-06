var Vogelhaus;
(function (Vogelhaus) {
    let State;
    (function (State) {
        State[State["DEAD"] = 0] = "DEAD";
        State[State["ALIVE"] = 1] = "ALIVE";
        State[State["HIT"] = 2] = "HIT";
    })(State = Vogelhaus.State || (Vogelhaus.State = {}));
    class Birds extends Vogelhaus.Moveable {
        constructor(_size) {
            super();
            this.colorBird = ["pink", "red", "yellow"];
            this.bird = new Path2D();
            this.state = State.ALIVE;
            this.bird = new Path2D();
            this.bird.arc(0, 0, 20, 0, 2 * Math.PI);
            this.bird.arc(15, 15, 25, 0, 1.5 * Math.PI);
            /*crc2.beginPath();
            crc2.moveTo(this.x + 30, this.y - 40);
            crc2.lineTo(this.x + 45, this.y - 40);
            crc2.lineTo(this.x + 25, this.y - 65);
            crc2.fill();*/
            this.position = new Vogelhaus.Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vogelhaus.Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
            this.x = this.position.x;
            this.y = this.position.y;
            this.birdColor = -0.4 + Math.random() * 2.8;
            this.birdColor = Number(this.birdColor.toFixed(0));
            console.log(this.birdColor);
            this.draw();
        }
        draw() {
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(this.position.x, this.position.y);
            this.x = this.position.x;
            this.y = this.position.y;
            Vogelhaus.crc2.fillStyle = this.colorBird[this.birdColor];
            Vogelhaus.crc2.fill(this.bird);
            Vogelhaus.crc2.restore();
        }
    }
    Vogelhaus.Birds = Birds;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Birds.js.map