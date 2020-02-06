var Vogelhaus;
(function (Vogelhaus) {
    class Snowball extends Vogelhaus.Moveable {
        constructor(_x, _y) {
            super();
            this.position = new Vogelhaus.Vector(_x, _y);
        }
        draw() {
            if (this.timer >= 0) {
                //console.log(">=0");
                Vogelhaus.crc2.fillStyle = "#D8D8D8";
                Vogelhaus.crc2.strokeStyle = "#D8D8D8";
                Vogelhaus.crc2.lineWidth = 1;
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(this.x, this.y);
                Vogelhaus.crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer * this.timer) / 3) + 15, 0, 2 * Math.PI);
                this.x = this.position.x;
                this.y = this.position.y;
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fill();
                Vogelhaus.crc2.stroke();
                this.timer--;
            }
        }
        checkIfHit(bird) {
            //if (this.timer == 0) {
            Vogelhaus.crc2.lineWidth = 50;
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(bird.x, bird.y);
            Vogelhaus.crc2.arc(bird.x, bird.y, 60, 0, 2 * Math.PI);
            Vogelhaus.crc2.closePath();
            //console.log(this.x + " " + this.y);
            //console.log("x: " + bird.x + "y: " + bird.y);
            if (Vogelhaus.crc2.isPointInPath(this.x, this.y)) {
                return true;
            }
            else {
                return false;
            }
            //} 
            //return false;
        }
    }
    Vogelhaus.Snowball = Snowball;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Snowball.js.map