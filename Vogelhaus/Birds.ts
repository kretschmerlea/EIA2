namespace Vogelhaus {
    export enum State {
        DEAD,
        ALIVE,
        HIT,
        FEEDING
    }

    export class Birds extends Moveable {
        
        colorBird: string[] = ["pink", "red", "yellow"];
        bird: Path2D = new Path2D();
        birdColor: number;
        x: number ;
        y: number ;
        state: State = State.ALIVE;

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
            if ((Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) < 200) && food.timer <= 0) {
                return true;
            }
            else {
                return false;
            }
        }

        changePath(food: Food): void {
            let a: number = this.x - food.x;
            let b: number = this.y - food.y;
            this.velocity = new Vector((-a * 0.1), (-b * 0.1));
        }

        resetVelocity(): void {
            this.velocity = new Vector((Math.random() * -5), (Math.random() * -5 + 2.5));
        }

        draw(): void {
            crc2.save();
            
            crc2.translate(this.position.x, this.position.y);
            this.x = this.position.x;
            this.y = this.position.y;
            crc2.fillStyle = this.colorBird[this.birdColor];

            crc2.fill(this.bird);
            crc2.restore();
        }
    }

}