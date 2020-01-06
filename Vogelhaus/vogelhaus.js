var Vogelhaus;
(function (Vogelhaus) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        let horizon = crc2.canvas.height * golden;
        drawBackground();
        drawSun({ x: 150, y: 100 });
        drawCloud({ x: 350, y: 125 }, { x: 200, y: 75 });
        drawCloudKlein({ x: 550, y: 150 }, { x: 100, y: 50 });
        drawMountains({ x: 0, y: horizon }, 75, 200, "grey", "white");
        drawMountains({ x: 0, y: horizon }, 50, 150, "grey", "lightgrey");
        drawSnowman({ x: 100, y: 625 });
        drawBirdhouse({ x: 400, y: 450 });
        drawTrees({ x: 700, y: 600 }, { x: 200, y: 250 });
        drawBirds({ x: 800, y: 400 });
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(golden, "#E6E6E6");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_postion) {
        console.log("Sun", _postion);
        let r1 = 25;
        let r2 = 75;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "HSLA(50, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_postion.x, _postion.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 30;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawCloudKlein(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 40;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawSnowman(_position) {
        console.log("Snowman", _position);
        let r1 = 25;
        let r2 = 50;
        let r3 = 75;
        let color = "white";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.arc(0, 0, r3, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        crc2.fill();
        crc2.beginPath();
        crc2.arc(0, -125, r2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        crc2.fill();
        crc2.beginPath();
        crc2.arc(0, -200, r1, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        crc2.fill();
        crc2.restore();
    }
    function drawBirdhouse(_position) {
        console.log("Birdhouse", _position);
        let r1 = 25;
        let colorHouse = "#3B170B";
        let colorPlatform = "#61210B";
        let colorHole = "black";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = colorHouse;
        crc2.fillRect(-25, 0, 50, 175);
        crc2.beginPath();
        crc2.moveTo(-175, 25);
        crc2.lineTo(-125, -50);
        crc2.lineTo(125, -50);
        crc2.lineTo(175, 25);
        crc2.closePath();
        crc2.fillStyle = colorPlatform;
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(-100, 0);
        crc2.lineTo(-100, -150);
        crc2.lineTo(0, -225);
        crc2.lineTo(100, -150);
        crc2.lineTo(100, 0);
        crc2.closePath();
        crc2.fillStyle = colorHouse;
        crc2.fill();
        crc2.beginPath();
        crc2.arc(0, -75, r1, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        crc2.fillStyle = colorHole;
        crc2.fill();
        crc2.restore();
    }
    function drawTrees(_position, _size) {
        console.log("Trees", _position, _size);
        let nTrees = 4;
        let colorTrunk = "#61210B";
        let colorCrown = "green";
        let scale;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nTrees; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.fillStyle = colorTrunk;
            crc2.fillRect(x, y, 20, 30);
            crc2.fillStyle = colorCrown;
            crc2.beginPath();
            crc2.moveTo(x + 40, y);
            crc2.lineTo(x - 20, y);
            crc2.lineTo(x + 10, y - 60);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
        crc2.restore();
    }
    function drawBirds(_size) {
        console.log("Birds");
        let nBirds = 15;
        let radiusBird = 20;
        let bird = new Path2D();
        let colorBird = "pink";
        bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);
        bird.arc(15, 15, 25, 0, 1.5 * Math.PI);
        crc2.save();
        crc2.fillStyle = colorBird;
        for (let drawn = 0; drawn < nBirds; drawn++) {
            crc2.save();
            let x = (Math.random() * _size.x);
            let y = (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(bird);
            crc2.restore();
        }
        crc2.restore();
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=vogelhaus.js.map