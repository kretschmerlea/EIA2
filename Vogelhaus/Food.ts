namespace Vogelhaus {
    export class Food extends Moveable {
        x: number;
        y: number;
        zeroX: number = 0;
        zeroY: number = 0;
        color: string;
        timer: number;
        lifetime: number;
        foodX: number[] = [];
        foodY: number[] = [];

        constructor(_x: number, _y: number) {
            super();
            this.position = new Vector(_x, _y);
        }
        draw(): void {
            let radiusFood: number = 10;
            let food: Path2D = new Path2D();
            if (this.timer >= 0) {
                //console.log(">=0");
                crc2.fillStyle = "#B45F04";
                crc2.strokeStyle = "#B45F04";
                crc2.lineWidth = 1;
                
                crc2.beginPath();
                crc2.moveTo(this.x, this.y);
                //crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x + this.x * 0.01, (this.y - (this.timer * 3) + this.y - (this.timer * 3) * 0.01), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x + this.x * 0.01, (this.y - (this.timer * 3)), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                //crc2.arc(this.x, (this.y - (this.timer * 3) + this.y - (this.timer * 3) * 0.01), ((this.timer) / 3) + 15, 0, 2 * Math.PI);
                let nFood: number = 5; //Anzahl einzelne Futterkreise 
                
                
                food.arc(0, 0, this.timer * radiusFood / 5, 0, 2 * Math.PI); //Radius einzelner Futterbälle, wird kleiner je kleiner Timer

                crc2.save();
                crc2.translate(this.x, this.y);
        
                let size: Vector = new Vector(15, 15);
                let x: number[] = []; //x und y Koordinate der Futterbälle wird zwischengespeichert
                let y: number[] = [];
                for (let drawn: number = 0; drawn < nFood; drawn++) { //bei Klick werden 5 Futterbälle gezeichnet, die Futter bilden
                    crc2.save();
                    x.push(Math.random() * (size.x + this.timer)); //random x und y Position
                    y.push((Math.random() * (size.y + this.timer)));
                    crc2.translate(x[drawn], y[drawn]);
                    crc2.fill(food);
                    crc2.restore();
                }
                crc2.restore();

                this.x = this.position.x;
                this.y = this.position.y;
                crc2.closePath();
                crc2.fill();
                crc2.stroke();
                this.timer--;
                
                
                if (this.timer == 0) {
                    this.foodX = x;
                    this.foodY = y;
                }
            }
            else { //Futter wenn es liegen bleibt
                crc2.fillStyle = "#B45F04";
                crc2.strokeStyle = "#B45F04";
                crc2.lineWidth = 1;
                crc2.beginPath();
                crc2.moveTo(this.x, this.y);
                food.arc(0, 0, radiusFood / 5, 0, 2 * Math.PI);
                crc2.save();
                crc2.translate(this.x, this.y);
                for (let drawn: number = 0; drawn < this.foodX.length; drawn++) {
                    crc2.save();
                    crc2.translate(this.foodX[drawn], this.foodY[drawn]);
                    crc2.fill(food);
                    crc2.restore();
                }
                crc2.restore();

                crc2.closePath();
                crc2.fill();
                crc2.stroke();
            }
            this.lifetime--;
        }
    }
}
