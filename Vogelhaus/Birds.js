var Vogelhaus;
(function (Vogelhaus) {
    let State;
    (function (State) {
        State[State["DEAD"] = 0] = "DEAD";
        State[State["ALIVE"] = 1] = "ALIVE";
        State[State["HIT"] = 2] = "HIT";
        State[State["FEEDING"] = 3] = "FEEDING";
        State[State["PICKING"] = 4] = "PICKING";
    })(State = Vogelhaus.State || (Vogelhaus.State = {}));
    class Birds extends Vogelhaus.Moveable {
        constructor(_size) {
            super();
            this.colorBird = ["#FA8258", "#585858", "#2EFE9A"];
            this.bird = new Path2D();
            this.state = State.ALIVE;
            this.pickingTimer = 0;
            this.bird = new Path2D();
            this.bird.arc(0, 0, 20, 0, 2 * Math.PI); //Kopf
            this.bird.arc(15, 15, 25, 0, 1.5 * Math.PI); //Körper
            //Schnabel
            this.bird.moveTo(-20, -5);
            this.bird.lineTo(-25, 0);
            this.bird.lineTo(-20, 5);
            this.bird.closePath();
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
        foodnearby(food) {
            let a = this.x - food.x;
            let b = this.y - food.y;
            if ((Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) < 100) && food.timer <= 0) { //Satz des Pythagoras
                return true; //Vogel befindet sich in Futterradius
            }
            else {
                return false;
            }
        }
        changePath(food) {
            if (this.vectorLanding == null) {
                this.vectorLanding = new Vogelhaus.Vector((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
            }
            let a = this.x - food.x;
            let b = this.y - food.y;
            this.velocity = new Vogelhaus.Vector((-a * 0.1 + this.vectorLanding.x), (-b * 0.1 + this.vectorLanding.y));
            if (this.velocity.x < 2 && this.velocity.y < 2) {
                this.state = State.PICKING;
            }
        }
        resetVelocity() {
            this.vectorLanding = null;
            this.velocity = new Vogelhaus.Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
        }
        draw() {
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.translate(this.position.x, this.position.y);
            this.x = this.position.x;
            this.y = this.position.y;
            Vogelhaus.crc2.fillStyle = this.colorBird[this.birdColor];
            if (this.state == State.PICKING && this.pickingTimer < 30) {
                Vogelhaus.crc2.arc(0, 10, 18, 0, 2 * Math.PI); //Vögel werden neu gezeichnet wenn sie picken
                Vogelhaus.crc2.arc(15, 15, 25, 0, 1.3 * Math.PI);
                Vogelhaus.crc2.moveTo(-18, 5);
                Vogelhaus.crc2.lineTo(-23, 10);
                Vogelhaus.crc2.lineTo(-18, 15);
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fill();
            }
            else {
                Vogelhaus.crc2.fill(this.bird);
                if (this.pickingTimer > 50) {
                    this.pickingTimer = 0;
                }
            }
            if (this.state == State.PICKING)
                this.pickingTimer++;
            else {
                this.pickingTimer = 0;
            }
            Vogelhaus.crc2.closePath();
            Vogelhaus.crc2.restore();
        }
    }
    Vogelhaus.Birds = Birds;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Birds.js.map