namespace Vogelhaus {
    export enum State {
        DEAD,
        ALIVE,
        HIT,
        FEEDING,
        PICKING
    }

    export class Birds extends Moveable {
        
        colorBird: string[] = ["pink", "red", "yellow"];
        bird: Path2D = new Path2D();
        birdColor: number;
        x: number ;
        y: number ;
        state: State = State.ALIVE;
        vectorLanding: Vector;
        pickingTimer: number = 0;

        constructor(_size: Vector) {
            
            super();
            
            this.bird = new Path2D();
            this.bird.arc(0, 0, 20, 0, 2 * Math.PI);
            this.bird.arc(15, 15, 25, 0, 1.5 * Math.PI);
            
            /*crc2.beginPath();
            crc2.moveTo(this.x + 30, this.y - 40);
            crc2.lineTo(this.x + 45, this.y - 40);
            crc2.lineTo(this.x + 25, this.y - 65);
            crc2.fill();*/

            this.position = new Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
            this.x = this.position.x;
            this.y = this.position.y;
            this.birdColor = -0.4 + Math.random() * 2.8;
            this.birdColor = Number(this.birdColor.toFixed(0));
            console.log(this.birdColor);

            this.draw();
        }
        
        foodnearby(food: Food): boolean {
            let a: number = this.x - food.x;
            let b: number = this.y - food.y;
            if ((Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) < 100) && food.timer <= 0) {
                return true;
            }
            else {
                return false;
            }
        }

        changePath(food: Food): void {
            if (this.vectorLanding == null) {
                this.vectorLanding = new Vector((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
            }
            let a: number = this.x - food.x;
            let b: number = this.y - food.y;
            this.velocity = new Vector((-a * 0.1 + this.vectorLanding.x), (-b * 0.1 + this.vectorLanding.y));
            if (this.velocity.x < 5 && this.velocity.y < 5) {
                this.state = State.PICKING;
            }
        }

        resetVelocity(): void {
            this.vectorLanding = null;
            this.velocity = new Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
        }

        draw(): void {
            crc2.save();
            
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y);
            this.x = this.position.x;
            this.y = this.position.y;
            crc2.fillStyle = this.colorBird[this.birdColor];

            console.log("timer: " + this.pickingTimer + " " + this.state);
            if (this.state == State.PICKING && this.pickingTimer < 30) {
                crc2.arc(0, 10, 18, 0, 2 * Math.PI);
                crc2.arc(15, 15, 25, 0, 1.3 * Math.PI);
                crc2.fill();
                
            } else {
                crc2.fill(this.bird);
                if (this.pickingTimer > 50) {
                    this.pickingTimer = 0;
                }
            }
            
            if (this.state == State.PICKING)
                this.pickingTimer++;
            else {
                this.pickingTimer = 0;
            }
            
            crc2.closePath();
            crc2.restore();
        }
    }

}