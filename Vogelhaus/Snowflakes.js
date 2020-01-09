var Vogelhaus;
(function (Vogelhaus) {
    class Snowflakes extends Vogelhaus.Moveable {
        constructor(_size) {
            super();
            this.snowflake = new Path2D();
            this.snowflake = new Path2D();
            this.snowflake.arc(0, 0, 5, 0, 2 * Math.PI);
            this.gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, 5);
            this.position = new Vogelhaus.Vector((Math.random() * _size.x), (Math.random() * _size.y));
            this.velocity = new Vogelhaus.Vector((Math.random() * 10), (Math.random() * -5 + 2.5));
            this.draw();
        }
        draw() {
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(this.position.x, this.position.y);
            this.gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            this.gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            Vogelhaus.crc2.fillStyle = this.gradient;
            Vogelhaus.crc2.fill(this.snowflake);
            Vogelhaus.crc2.restore();
        }
    }
    Vogelhaus.Snowflakes = Snowflakes;
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Snowflakes.js.map