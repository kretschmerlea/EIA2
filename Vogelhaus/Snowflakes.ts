namespace Vogelhaus {
    export class Snowflakes extends Moveable {

        snowflake: Path2D = new Path2D();
        snowflakeColor: number;
        gradient: CanvasGradient;


        constructor(_size: Vector) {
            super();
            this.snowflake = new Path2D();
            this.snowflake.arc(0, 0, 5, 0, 2 * Math.PI);
            this.gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 5);

            this.position = new Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vector((Math.random() * 10), (Math.random() * -5 + 2.5));

            this.draw();
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            
            this.gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            this.gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            crc2.fillStyle = this.gradient;

            crc2.fill(this.snowflake);
            crc2.restore();
        }
    }

}