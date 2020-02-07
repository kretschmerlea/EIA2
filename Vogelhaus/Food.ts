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
                let nFood: number = 5;
                
                
                food.arc(0, 0, this.timer * radiusFood / 5, 0, 2 * Math.PI);

                crc2.save();
                crc2.translate(this.x, this.y);
        
                let size: Vector = new Vector(15, 15);
                let x: number[] = [];
                let y: number[] = [];
                for (let drawn: number = 0; drawn < nFood; drawn++) {
                    crc2.save();
                    x.push(Math.random() * (size.x + this.timer));
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
            else {
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

        onPlattform(pathPlattform: Path2D, pathBarrier: Path2D = null): boolean {
            if (crc2.isPointInPath(pathPlattform, this.x, this.y)) {
                if (pathBarrier == null) {
                    return true;
                }
                else {
                    if (crc2.isPointInPath(pathBarrier, this.x, this.y)) {
                        return false;
                    }
                }
            }
            return false;
        }

        setZeroPoint(zeroPoint: Vector): void {
            this.zeroX += zeroPoint.x;
            this.zeroY += zeroPoint.y;
        }

        /*checkIfHit(bird: Birds): boolean {
            //if (this.timer == 0) {
                crc2.lineWidth = 50;
                crc2.beginPath();
                crc2.moveTo(bird.x, bird.y);
                crc2.arc(bird.x, bird.y, 60, 0, 2 * Math.PI);
                crc2.closePath();
                //console.log(this.x + " " + this.y);
                //console.log("x: " + bird.x + "y: " + bird.y);
                if (crc2.isPointInPath(this.x, this.y)) {
                    return true;
                }
                else {
                    return false;
                }
            //} 
            
            //return false;
        }*/

    }
}
