namespace Vogelhaus {
    // interface Vector {
    //     x: number;
    //     y: number;
    // }

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;
    let arrayBirds: Birds[] = [];
    let arraySnowflakes: Snowflakes[] = [];
    let snowballs: Snowball[] = [];
    let arrayFood: Food[] = [];
    let saveBackground: ImageData;
    let timer: number = 60;

    let score: number = 0;
    let snowballCount: number = 0;

    function handleLoad(_event: Event): void {
        timer = 60;
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height * golden;

        drawBackground();
        drawSun(new Vector(150, 100));
        drawCloud(new Vector(350, 125), new Vector(200, 75));
        drawCloudSmall(new Vector(550, 150), new Vector(100, 50));
        drawMountains(new Vector(0, horizon), 75, 200, "grey", "white");
        drawMountains(new Vector(0, horizon), 50, 150, "grey", "lightgrey");
        drawSnowman(new Vector(100, 625));
        drawBirdhouse(new Vector(400, 450));
        drawTrees(new Vector(700, 600), new Vector(200, 200));
        saveBackground = crc2.getImageData(0, 0, 800, 600);
        drawBirds(new Vector(800, 400));
        drawSnowflakes(new Vector(800, 600));
        updateCanvas();
        canvas.addEventListener("click", throwSnowball);
        canvas.addEventListener("auxclick", throwFood);

    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(golden, "#E6E6E6");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    }
    function drawSun(_postion: Vector): void {
        console.log("Sun", _postion);

        let r1: number = 25;
        let r2: number = 75;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "HSLA(50, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_postion.x, _postion.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();


    }
    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 30;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawCloudSmall(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 20;
        let radiusParticle: number = 40;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains");
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = - _min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);

        }
        while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawSnowman(_position: Vector): void {
        console.log("Snowman", _position);

        let r1: number = 25;
        let r2: number = 50;
        let r3: number = 75;
        let color: string = "white";

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

    function drawBirdhouse(_position: Vector): void {
        console.log("Birdhouse", _position);

        let r1: number = 25;
        let colorHouse: string = "#3B170B";
        let colorPlatform: string = "#61210B";
        let colorHole: string = "black";

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

    function drawTrees(_position: Vector, _size: Vector): void {
        console.log("Trees", _position, _size);

        let nTrees: number = 4;
        let colorTrunk: string = "#61210B";
        let colorCrown: string = "green";


        crc2.save();
        crc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < nTrees; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            let scale: number = Math.abs(Math.sin(-30 / y) * 2); // scale of trees

            crc2.fillStyle = colorTrunk;
            crc2.fillRect(x, y, 20 * scale, 30 * scale);

            crc2.fillStyle = colorCrown;
            crc2.beginPath();
            crc2.moveTo(x + 40 * scale, y);
            crc2.lineTo(x - 20 * scale, y);
            crc2.lineTo(x + 10 * scale, y - 60 * scale);
            crc2.closePath();

            crc2.fill();

            crc2.restore();

        }
        crc2.restore();
    }

    function updateCanvas(): void {
        if (snowballCount < 20) {
            setTimeout(updateCanvas, 1000 / 30);
            crc2.clearRect(0, 0, 800, 600);
            crc2.putImageData(saveBackground, 0, 0);
            for (let i: number = 0; i < arrayBirds.length; i++) {
                arrayBirds[i].move();
                arrayBirds[i].draw();
            }
            for (let i: number = 0; i < arraySnowflakes.length; i++) {
                arraySnowflakes[i].move();
                arraySnowflakes[i].draw();
            }
            for (let i: number = 0; i < arrayFood.length; i++) {
                //arrayFood[i].move();
                arrayFood[i].draw();
            }
            for (let i: number = 0; i < snowballs.length; i++) {
                if (snowballs[i].timer > 0) {
                    snowballs[i].draw();
                }
            
                else {
                    if (snowballs[i].timer == 0) {
                        snowballs[i].draw();
                        let hit: boolean = false;
                        for (let birdNumber: number = 0; birdNumber < arrayBirds.length; birdNumber++) {
                            //console.log(snowballs.length + arrayBirds.length);
                            let bird: Birds = arrayBirds[birdNumber];
                            //console.log("x: " + bird.x + "y: " + bird.y);
                            if (snowballs[i].ifHit(bird)) {
                                hit = true;
                                bird.state = State.DEAD;
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
                        snowballCount ++;
                    }
                }
            }

            crc2.fillStyle = "#0f0f0f";
            crc2.fillRect(690, 0, 110, 35);
            crc2.font = "20px Arial";
            crc2.fillStyle = "white";
            crc2.fillText("Score: ", 700, 25);

            crc2.fillText("" + score, 760, 25);

        } else {
            if (score >= 0) {
                endScreen(true);
                
            }
            else {
                endScreen(false);
            }
        }
    }
    
    function endScreen(winner: boolean): void {
        if (winner) {
            crc2.fillStyle = "#4C0B5F";
            crc2.fillRect(250, 225, 300, 150);
            crc2.font = "20px Arial";
            crc2.fillStyle = "white";
            crc2.fillText("Game over", 350, 250);
            crc2.font = "30px Arial";
            crc2.fillText("Your Final Score:" + " " + score, 270, 300);
        }
        else {
            crc2.fillStyle = "#4C0B5F";
            crc2.fillRect(250, 225, 300, 150);
            crc2.font = "20px Arial";
            crc2.fillStyle = "white";
            crc2.fillText("Game over", 350, 250);
            crc2.font = "30px Arial";
            crc2.fillText("You lose!", 340, 300);
        }
    }
    function drawBirds(_size: Vector): void {
        console.log("Birds");

        let nBirds: number = 15;

        //let radiusBird: number = 20;
        //let bird: Path2D = new Path2D();
        //let colorBird: string[] = ["pink", "red", "yellow"];


        // bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);
        // bird.arc(15, 15, 25, 0, 1.5 * Math.PI);

        // crc2.fill();

        crc2.save();


        for (let drawn: number = 0; drawn < nBirds; drawn++) {
            let draw: Birds = new Birds(_size);
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
        crc2.restore();
    }

    function drawSnowflakes(_size: Vector): void {
        console.log("Snowflakes");

        let nSnowflakes: number = 100;
        crc2.save();


        for (let drawn: number = 0; drawn < nSnowflakes; drawn++) {
            let draw: Snowflakes = new Snowflakes(_size);

            arraySnowflakes.push(draw);

        }
        crc2.restore();
    }

    function throwSnowball(_event: MouseEvent): void {
        console.log();
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let ball: Snowball = new Snowball(x, y);
        ball.x = x;
        ball.y = y;
        ball.timer = 25;
        snowballs.push(ball);
    }

    function throwFood(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let food: Food = new Food(x, y);
        food.x = x;
        food.y = y;
        food.timer = 25;
        arrayFood.push(food);

    }

}
