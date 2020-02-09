namespace Vogelhaus {
    export abstract class Moveable {
        position: Vector;
        velocity: Vector;


        move(): void {
            this.position.add(this.velocity);

            if (this.position.x < -50)
                this.position.x += crc2.canvas.width + 50;

            if (this.position.x > 850)
                this.position.x -= crc2.canvas.width  + 50; 

            if (this.position.y < -50)
                this.position.y += crc2.canvas.height + 50;

            if (this.position.y > 650)
               this.position.y -= crc2.canvas.height + 70;


        }

        abstract draw(): void;
    }
}
