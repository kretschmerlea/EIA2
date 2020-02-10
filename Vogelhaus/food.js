var Vogelhaus;
(function (Vogelhaus) {
    class Food extends Vogelhaus.Moveable {
        constructor(_x, _y) {
            super();
            this.zeroX = 0;
            this.zeroY = 0;
            this.foodX = [];
            this.foodY = [];
            this.position = new Vogelhaus.Vector(_x, _y);
        }
        draw() {
            let radiusFood = 10;
            let food = new Path2D();
            if (this.timer >= 0) {
                //console.log(">=0");
                Vogelhaus.crc2.fillStyle = "#B45F04";
                Vogelhaus.crc2.strokeStyle = "#B45F04";
                Vogelhaus.crc2.lineWidth = 1;
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(this.x, this.y);
                //crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x + this.x * 0.01, (this.y - (this.timer * 3) + this.y - (this.timer * 3) * 0.01), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x + this.x * 0.01, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x, (this.y - (this.timer * 3) + this.y - (this.timer * 3) * 0.01), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                let nFood = 5; //Anzahl einzelne Futterkreise 
                food.arc(0, 0, this.timer * radiusFood / 5, 0, 2 * Math.PI); //Radius einzelner Futterbälle, wird kleiner je kleiner Timer
                Vogelhaus.crc2.save();
                Vogelhaus.crc2.translate(this.x, this.y);
                let size = new Vogelhaus.Vector(15, 15);
                let x = []; //x und y Koordinate der Futterbälle wird zwischengespeichert
                let y = [];
                for (let drawn = 0; drawn < nFood; drawn++) { //bei Klick werden 5 Futterbälle gezeichnet, die Futter bilden
                    Vogelhaus.crc2.save();
                    x.push(Math.random() * (size.x + this.timer)); //random x und y Position
                    y.push((Math.random() * (size.y + this.timer)));
                    Vogelhaus.crc2.translate(x[drawn], y[drawn]);
                    Vogelhaus.crc2.fill(food);
                    Vogelhaus.crc2.restore();
                }
                Vogelhaus.crc2.restore();
                this.x = this.position.x;
                this.y = this.position.y;
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fill();
                Vogelhaus.crc2.stroke();
                this.timer--;
                if (this.timer == 0) {
                    this.foodX = x;
                    this.foodY = y;
                }
            }
            else { //Futter wenn es liegen bleibt
                Vogelhaus.crc2.fillStyle = "#B45F04";
                Vogelhaus.crc2.strokeStyle = "#B45F04";
                Vogelhaus.crc2.lineWidth = 1;
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(this.x, this.y);
                food.arc(0, 0, radiusFood / 5, 0, 2 * Math.PI);
                Vogelhaus.crc2.save();
                Vogelhaus.crc2.translate(this.x, this.y);
                for (let drawn = 0; drawn < this.foodX.length; drawn++) {
                    Vogelhaus.crc2.save();
                    Vogelhaus.crc2.translate(this.foodX[drawn], this.foodY[drawn]);
                    Vogelhaus.crc2.fill(food);
                    Vogelhaus.crc2.restore();
                }
                Vogelhaus.crc2.restore();
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fill();
                Vogelhaus.crc2.stroke();
            }
            this.lifetime--;
        }
    }
    Vogelhaus.Food = Food;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Food.js.map