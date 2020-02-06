namespace Vogelhaus {
    export class Snowball extends Moveable {
        x: number;
        y: number;
        color: string;
        timer: number;

        constructor(_x: number, _y: number) {
            super();
            this.position = new Vector(_x, _y);
        }
        
        draw(): void {
          

            if (this.timer >= 0) {
                console.log(">=0");
                crc2.fillStyle = "#D8D8D8";
                crc2.strokeStyle = "#D8D8D8";
                crc2.lineWidth = 1;

                crc2.beginPath();
                crc2.moveTo(this.x, this.y);
                crc2.arc(this.x, this.y, ((this.timer * this.timer) / 3) + 15, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();
                crc2.stroke();
                this.timer--;

            }
        }
        checkIfHit(_x: number, _y: number): boolean {

            crc2.lineWidth = 50;
            crc2.beginPath();
            crc2.moveTo(_x - 20, _y);
            crc2.arc(_x + 30, _y - 100, 60, 0, 10 * Math.PI);
            crc2.closePath();


            if (crc2.isPointInPath(this.x, this.y)) {
                return true;
            }
            else {
                return false;
            }
        }

    }
}
