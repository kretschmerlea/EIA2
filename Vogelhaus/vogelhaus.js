var Vogelhaus;
(function (Vogelhaus) {
    // interface Vector {
    //     x: number;
    //     y: number;
    // }
    let url = "https://birdiess.herokuapp.com/";
    window.addEventListener("load", handleLoad);
    let golden = 0.62;
    let arrayBirds = [];
    let arraySnowflakes = [];
    let snowballs = [];
    let arrayFood = [];
    let saveBackground;
    let timer = 60;
    let vogelhausPlattform = new Path2D();
    let vogelhausHaus = new Path2D();
    let zeroPointVogelhaus;
    let score = 0;
    let snowballCount = 0;
    let foodCount = 0;
    function handleLoad(_event) {
        timer = 60;
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Vogelhaus.crc2 = canvas.getContext("2d");
        let horizon = Vogelhaus.crc2.canvas.height * golden;
        drawBackground();
        drawSun(new Vogelhaus.Vector(150, 100));
        drawCloud(new Vogelhaus.Vector(350, 125), new Vogelhaus.Vector(200, 75));
        drawCloudSmall(new Vogelhaus.Vector(550, 150), new Vogelhaus.Vector(100, 50));
        drawMountains(new Vogelhaus.Vector(0, horizon), 75, 200, "grey", "white");
        drawMountains(new Vogelhaus.Vector(0, horizon), 50, 150, "grey", "lightgrey");
        drawSnowman(new Vogelhaus.Vector(100, 625));
        zeroPointVogelhaus = new Vogelhaus.Vector(400, 450);
        drawBirdhouse(zeroPointVogelhaus);
        drawTrees(new Vogelhaus.Vector(700, 600), new Vogelhaus.Vector(200, 200));
        saveBackground = Vogelhaus.crc2.getImageData(0, 0, 800, 600);
        drawBirds(new Vogelhaus.Vector(800, 400));
        drawSnowflakes(new Vogelhaus.Vector(800, 600));
        updateCanvas();
        canvas.addEventListener("click", throwSnowball);
        canvas.addEventListener("auxclick", throwFood);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = Vogelhaus.crc2.createLinearGradient(0, 0, 0, Vogelhaus.crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(golden, "#E6E6E6");
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.fillRect(0, 0, Vogelhaus.crc2.canvas.width, Vogelhaus.crc2.canvas.height);
    }
    function drawSun(_postion) {
        console.log("Sun", _postion);
        let r1 = 25;
        let r2 = 75;
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "HSLA(50, 100%, 50%, 0)");
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_postion.x, _postion.y);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 30;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Vogelhaus.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Vogelhaus.crc2.translate(x, y);
            Vogelhaus.crc2.fill(particle);
            Vogelhaus.crc2.restore();
        }
        Vogelhaus.crc2.restore();
    }
    function drawCloudSmall(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 40;
        let particle = new Path2D();
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Vogelhaus.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Vogelhaus.crc2.translate(x, y);
            Vogelhaus.crc2.fill(particle);
            Vogelhaus.crc2.restore();
        }
        Vogelhaus.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(0, 0);
        Vogelhaus.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            Vogelhaus.crc2.lineTo(x, y);
        } while (x < Vogelhaus.crc2.canvas.width);
        Vogelhaus.crc2.lineTo(x, 0);
        Vogelhaus.crc2.closePath();
        let gradient = Vogelhaus.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawSnowman(_position) {
        console.log("Snowman", _position);
        let r1 = 25;
        let r2 = 50;
        let r3 = 75;
        let color = "white";
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = color;
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(0, 0, r3, 0, 2 * Math.PI);
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(0, -125, r2, 0, 2 * Math.PI);
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(0, -200, r1, 0, 2 * Math.PI);
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawBirdhouse(_position) {
        console.log("Birdhouse", _position);
        let r1 = 25;
        let colorHouse = "#3B170B";
        let colorPlatform = "#61210B";
        let colorHole = "black";
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = colorHouse;
        Vogelhaus.crc2.fillRect(-25, 0, 50, 175);
        vogelhausPlattform.moveTo(-175, 25);
        vogelhausPlattform.lineTo(-125, -50);
        vogelhausPlattform.lineTo(125, -50);
        vogelhausPlattform.lineTo(175, 25);
        vogelhausPlattform.closePath();
        Vogelhaus.crc2.fillStyle = colorPlatform;
        Vogelhaus.crc2.fill(vogelhausPlattform);
        vogelhausHaus.moveTo(-100, 0);
        vogelhausHaus.lineTo(-100, -150);
        vogelhausHaus.lineTo(0, -225);
        vogelhausHaus.lineTo(100, -150);
        vogelhausHaus.lineTo(100, 0);
        vogelhausHaus.closePath();
        Vogelhaus.crc2.fillStyle = colorHouse;
        Vogelhaus.crc2.fill(vogelhausHaus);
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.arc(0, -75, r1, 0, 2 * Math.PI);
        Vogelhaus.crc2.closePath();
        Vogelhaus.crc2.stroke();
        Vogelhaus.crc2.fillStyle = colorHole;
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawTrees(_position, _size) {
        console.log("Trees", _position, _size);
        let nTrees = 4;
        let colorTrunk = "#61210B";
        let colorCrown = "green";
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nTrees; drawn++) {
            Vogelhaus.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            let scale = Math.abs(Math.sin(-30 / y) * 2); // scale of trees
            Vogelhaus.crc2.fillStyle = colorTrunk;
            Vogelhaus.crc2.fillRect(x, y, 20 * scale, 30 * scale);
            Vogelhaus.crc2.fillStyle = colorCrown;
            Vogelhaus.crc2.beginPath();
            Vogelhaus.crc2.moveTo(x + 40 * scale, y);
            Vogelhaus.crc2.lineTo(x - 20 * scale, y);
            Vogelhaus.crc2.lineTo(x + 10 * scale, y - 60 * scale);
            Vogelhaus.crc2.closePath();
            Vogelhaus.crc2.fill();
            Vogelhaus.crc2.restore();
        }
        Vogelhaus.crc2.restore();
    }
    function updateCanvas() {
        if (snowballCount < 20 && arrayBirds.length > 0) {
            setTimeout(updateCanvas, 1000 / 30);
            Vogelhaus.crc2.clearRect(0, 0, 800, 600);
            Vogelhaus.crc2.putImageData(saveBackground, 0, 0);
            for (let i = 0; i < arrayBirds.length; i++) {
                for (let i2 = 0; i2 < arrayFood.length; i2++) {
                    if (arrayBirds[i].foodnearby(arrayFood[i2])) {
                        arrayBirds[i].changePath(arrayFood[i2]);
                        //arrayBirds[i].state = State.FEEDING;
                    }
                }
                arrayBirds[i].move();
                arrayBirds[i].draw();
            }
            for (let i = 0; i < arraySnowflakes.length; i++) {
                arraySnowflakes[i].move();
                arraySnowflakes[i].draw();
            }
            for (let i = 0; i < arrayFood.length; i++) {
                //arrayFood[i].move();
                let food = arrayFood[i];
                food.setZeroPoint(zeroPointVogelhaus);
                if ((food.timer == 0 && food.y < 400) || food.lifetime == 0) {
                    if (food.lifetime == 0) {
                        for (let birdCount = 0; birdCount < arrayBirds.length; ++birdCount) {
                            if (arrayBirds[birdCount].state == Vogelhaus.State.FEEDING || arrayBirds[birdCount].state == Vogelhaus.State.PICKING) {
                                arrayBirds[birdCount].resetVelocity();
                                arrayBirds[birdCount].state = Vogelhaus.State.ALIVE;
                            }
                        }
                    }
                    arrayFood.splice(i, 1);
                }
                else {
                    food.draw();
                }
            }
            for (let i = 0; i < snowballs.length; i++) {
                if (snowballs[i].timer > 0) {
                    snowballs[i].draw();
                }
                else {
                    if (snowballs[i].timer == 0) {
                        snowballs[i].draw();
                        let hit = false;
                        for (let birdNumber = 0; birdNumber < arrayBirds.length; birdNumber++) {
                            //console.log(snowballs.length + arrayBirds.length);
                            let bird = arrayBirds[birdNumber];
                            //console.log("x: " + bird.x + "y: " + bird.y);
                            if (snowballs[i].ifHit(bird)) {
                                hit = true;
                                bird.state = Vogelhaus.State.DEAD;
                                score += 10;
                                console.log("score:" + score);
                                arrayBirds.splice(birdNumber, 1);
                            }
                        }
                        // wenn kein Vogel getroffen ein Punkt abzug
                        if (!hit) {
                            score--;
                        }
                        snowballs.splice(i, 1);
                        snowballCount++;
                    }
                }
            }
            Vogelhaus.crc2.fillStyle = "#0f0f0f";
            Vogelhaus.crc2.fillRect(650, 0, 150, 60);
            Vogelhaus.crc2.font = "20px Arial";
            Vogelhaus.crc2.fillStyle = "white";
            Vogelhaus.crc2.fillText("Score: ", 660, 25);
            Vogelhaus.crc2.fillText("" + score, 720, 25);
            Vogelhaus.crc2.font = "20px Arial";
            if (foodCount < 3) {
                Vogelhaus.crc2.fillStyle = "white";
            }
            else {
                Vogelhaus.crc2.fillStyle = "red";
            }
            Vogelhaus.crc2.fillText("Food left: ", 660, 50);
            Vogelhaus.crc2.fillText("" + Math.abs(foodCount - 3), 760, 50);
        }
        else {
            if (score >= 0) {
                endScreen(true);
            }
            else {
                endScreen(false);
            }
        }
    }
    function endScreen(winner) {
        if (winner) {
            Vogelhaus.crc2.fillStyle = "#4C0B5F";
            Vogelhaus.crc2.fillRect(250, 225, 300, 150);
            Vogelhaus.crc2.font = "20px Arial";
            Vogelhaus.crc2.fillStyle = "white";
            Vogelhaus.crc2.fillText("Game over", 350, 250);
            Vogelhaus.crc2.font = "30px Arial";
            Vogelhaus.crc2.fillText("Your Final Score:" + " " + score, 265, 300);
        }
        else {
            Vogelhaus.crc2.fillStyle = "#4C0B5F";
            Vogelhaus.crc2.fillRect(250, 225, 300, 150);
            Vogelhaus.crc2.font = "20px Arial";
            Vogelhaus.crc2.fillStyle = "white";
            Vogelhaus.crc2.fillText("Game over", 350, 250);
            Vogelhaus.crc2.font = "30px Arial";
            Vogelhaus.crc2.fillText("You lose!", 340, 300);
        }
    }
    function drawBirds(_size) {
        console.log("Birds");
        let nBirds = 15;
        //let radiusBird: number = 20;
        //let bird: Path2D = new Path2D();
        //let colorBird: string[] = ["pink", "red", "yellow"];
        // bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);
        // bird.arc(15, 15, 25, 0, 1.5 * Math.PI);
        // crc2.fill();
        Vogelhaus.crc2.save();
        for (let drawn = 0; drawn < nBirds; drawn++) {
            let draw = new Vogelhaus.Birds(_size);
            arrayBirds.push(draw);
            /*crc2.save();
            let x: number = (Math.random() * _size.x);
            let y: number = (Math.random() * _size.y);
            crc2.translate(x, y);
            let birdColor: number = -0.4 + Math.random() * 2.8;
            birdColor = Number(birdColor.toFixed(0));
            console.log(birdColor);
            // crc2.fillStyle = colorBird[1];
            crc2.fillStyle = colorBird[birdColor];
            crc2.fill(bird);
            crc2.restore();*/
        }
        Vogelhaus.crc2.restore();
    }
    function drawSnowflakes(_size) {
        console.log("Snowflakes");
        let nSnowflakes = 100;
        Vogelhaus.crc2.save();
        for (let drawn = 0; drawn < nSnowflakes; drawn++) {
            let draw = new Vogelhaus.Snowflakes(_size);
            arraySnowflakes.push(draw);
        }
        Vogelhaus.crc2.restore();
    }
    function throwSnowball(_event) {
        console.log();
        let x = _event.clientX;
        let y = _event.clientY;
        let ball = new Vogelhaus.Snowball(x, y);
        ball.x = x;
        ball.y = y;
        ball.timer = 25;
        snowballs.push(ball);
    }
    function throwFood(_event) {
        if (foodCount < 3) {
            let x = _event.clientX;
            let y = _event.clientY;
            let food = new Vogelhaus.Food(x, y);
            food.x = x;
            food.y = y;
            food.timer = 25;
            food.lifetime = 250;
            arrayFood.push(food);
            foodCount++;
        }
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=vogelhaus.js.map