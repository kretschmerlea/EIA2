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
                //console.log(">=0");
                crc2.fillStyle = "#CEE3F6";
                crc2.strokeStyle = "#CEE3F6";
                crc2.lineWidth = 1;

                crc2.beginPath();
                crc2.moveTo(this.x, this.y);
                crc2.arc(this.x, (this.y - (this.timer * 3)), ((this.timer * this.timer) / 3) + 15, 0, 2 * Math.PI); //beinhält auch Flugbahn des Schneeballs, dieser wird kleiner je kleiner Timer
                this.x = this.position.x;
                this.y = this.position.y;
                crc2.closePath();
                crc2.fill();
                crc2.stroke();
                this.timer--;

            }
        }
        ifHit(bird: Birds): boolean { //Vogel getroffen
            //if (this.timer == 0) {
                
                crc2.beginPath();
                crc2.moveTo(bird.x, bird.y);
                crc2.arc(bird.x, bird.y, 50, 0, 2 * Math.PI);
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
        }

    }
}
