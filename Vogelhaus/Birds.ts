namespace Vogelhaus {
    export class Birds extends Moveable {

        colorBird: string[] = ["pink", "red", "yellow"];
        bird: Path2D = new Path2D();
        birdColor: number;

        constructor(_size: Vector) {
            
            super();
            
            this.bird = new Path2D();
            this.bird.arc(0, 0, 20, 0, 2 * Math.PI);
            this.bird.arc(15, 15, 25, 0, 1.5 * Math.PI);

            this.position = new Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vector((Math.random() * -5), (Math.random() * -5 + 2.5));

            this.birdColor = -0.4 + Math.random() * 2.8;
            this.birdColor = Number(this.birdColor.toFixed(0));
            console.log(this.birdColor);

            this.draw();
        }

        draw(): void {
            crc2.save();
            
            crc2.translate(this.position.x, this.position.y);

            crc2.fillStyle = this.colorBird[this.birdColor];

            crc2.fill(this.bird);
            crc2.restore();
        }
    }

}