namespace Vogelhaus {
    // interface Vector {
    //     x: number;
    //     y: number;
    // }
    let url: string = "https://birdiess.herokuapp.com/";

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;
    let arrayBirds: Birds[] = [];
    let arraySnowflakes: Snowflakes[] = [];
    let snowballs: Snowball[] = [];
    let arrayFood: Food[] = [];
    let saveBackground: ImageData;
    let timer: number = 60;
    let vogelhausPlattform: Path2D = new Path2D();
    let vogelhausHaus: Path2D = new Path2D();
    let zeroPointVogelhaus: Vector;

    let score: number = 0;
    let snowballCount: number = 0;
    let foodCount: number = 0;

    
    function handleLoad(_event: Event): void {
        timer = 60;
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height * golden;

        drawBackground();
        drawSun(new Vector(150, 170));
        drawCloud(new Vector(350, 125), new Vector(200, 75));
        drawCloudSmall(new Vector(550, 150), new Vector(100, 50));
        drawMountains(new Vector(0, horizon), 75, 200, "grey", "white");
        drawMountains(new Vector(0, horizon), 50, 150, "grey", "lightgrey");
        drawSnowman(new Vector(100, 625));
        zeroPointVogelhaus = new Vogelhaus.Vector(400, 450);
        drawBirdhouse(zeroPointVogelhaus);
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
        gradient.addColorStop(golden, "#FF8000");
        gradient.addColorStop(golden, "white");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    }
    function drawSun(_postion: Vector): void {
        console.log("Sun", _postion);
        //Radius innerer und aeußerer Kreis für Gradient Color Stop
        let r1: number = 25;
        let r2: number = 75;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "#FF8000");
        gradient.addColorStop(1, "HSLA(50, 100%, 50%, 0)");
        //Sonne zeichnen
        crc2.save();
        crc2.translate(_postion.x, _postion.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();


    }
    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);
        //Anzahl und Radius der einzelnen Wolkenpartikel
        let nParticles: number = 30;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        //einzelnen Partikel zeichnen
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        //for-Schleife, damit nur nParticles gezeichnet werden
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
        let stepMin: number = 50;  //maximaler und minimaler Abstand zwischen Bergen
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        //random Abstand wird ermittelt und Berge gezeichnet
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = - _min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);

        }
        while (x < crc2.canvas.width);      //solange x sich auf Canvas befindet

        crc2.lineTo(x, 0);
        crc2.closePath();
        //Farbverlauf der Berge
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
        let color: string = "#A9A9F5";
        //Untester Kreis
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.arc(0, 0, r3, 0, 2 * Math.PI);
        crc2.closePath();
        //crc2.stroke();
        crc2.fill();
        //mittlerer Kreis
        crc2.beginPath();
        crc2.arc(0, -110, r2, 0, 2 * Math.PI);
        crc2.closePath();
        //crc2.stroke();
        crc2.fill();
        //Kopf
        crc2.beginPath();
        crc2.arc(0, -182, r1, 0, 2 * Math.PI);
        crc2.closePath();
        //crc2.stroke();
        crc2.fill();


        crc2.restore();

    }

    function drawBirdhouse(_position: Vector): void {
        console.log("Birdhouse", _position);

        let r1: number = 25;    //Radius für Loch
        let colorHouse: string = "#3B170B";
        let colorPlatform: string = "#61210B";
        let colorHole: string = "black";
        //Pflock
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = colorHouse;
        crc2.fillRect(-25, 0, 50, 175);
        //Plattform 
        vogelhausPlattform.moveTo(-175, 25);
        vogelhausPlattform.lineTo(-125, -50);
        vogelhausPlattform.lineTo(125, -50);
        vogelhausPlattform.lineTo(175, 25);
        vogelhausPlattform.closePath();
        crc2.fillStyle = colorPlatform;
        crc2.fill(vogelhausPlattform);

        //Vogelhaus
        vogelhausHaus.moveTo(-100, 0);
        vogelhausHaus.lineTo(-100, -150);
        vogelhausHaus.lineTo(0, -225);
        vogelhausHaus.lineTo(100, -150);
        vogelhausHaus.lineTo(100, 0);
        vogelhausHaus.closePath();
        crc2.fillStyle = colorHouse;
        crc2.fill(vogelhausHaus);

        //Loch
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
        let colorCrown: string = "#0B3B0B";


        crc2.save();
        crc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < nTrees; drawn++) { //Bäume werden gezeichnet solange sie nicht > nTrees
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            let scale: number = Math.abs(Math.sin(-30 / y) * 2); // scale of trees
            //Baumstumpf
            crc2.fillStyle = colorTrunk;
            crc2.fillRect(x, y, 20 * scale, 30 * scale);
            //Baumkrone
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
    function moveBirds(): void {
        for (let i: number = 0; i < arrayBirds.length; i++) { //Durchlauf des Vogelarrays 
            for (let i2: number = 0; i2 < arrayFood.length; i2++) { //Durchlauf des Futterarrays
                if (arrayBirds[i].foodnearby(arrayFood[i2])) {  //solange diese Arrays durchlaufen werden, werden diese Methoden aufgerufen
                    arrayBirds[i].changePath(arrayFood[i2]);    
                    //arrayBirds[i].state = State.FEEDING;
                }
          
            }
            arrayBirds[i].move(); //solange i kleiner ist als das Vogelarray werden die move und draw Methode der Vögel ausgeführt
            arrayBirds[i].draw();
        }
    }

    function moveSnowflakes(): void {
        for (let i: number = 0; i < arraySnowflakes.length; i++) { //solange i kleiner als SchneeflockenArray 
            arraySnowflakes[i].move(); //move und draw Methode wird ausgeführt
            arraySnowflakes[i].draw();
        }
    }
    function calculateFoodAction(): void {
        for (let i: number = 0; i < arrayFood.length; i++) { //solange i < Foodarray
            //arrayFood[i].move();
            let food: Food = arrayFood[i];
            
            if ((food.timer == 0 && food.y < 400) || food.lifetime == 0) { //Futter kann nur unterhalb von y=400 landen
                if (food.lifetime == 0) { //wenn Futter liegt
                    for (let birdCount: number = 0; birdCount < arrayBirds.length; ++birdCount) {
                        if (arrayBirds[birdCount].state == State.FEEDING || arrayBirds[birdCount].state == State.PICKING) { //Status Vögel: gefüttert und picken
                            arrayBirds[birdCount].resetVelocity(); //Weiterfliegen
                            arrayBirds[birdCount].state = State.ALIVE; //Status: Vogel lebt
                        }
                    }
                }
                arrayFood.splice(i, 1); //jedes Mal wenn das Futter geworfen wurde wird ein Futterelement aus dem Array gelöscht
            } 
            else {
                food.draw(); //Futter wird weiter gezeichnet, sprich ist noch nicht gelandet
            }
        }
    }
    function calculateSnowballAction(): void {
        for (let i: number = 0; i < snowballs.length; i++) {
            if (snowballs[i].timer > 0) { //solange timer > 0 "fliegt" Schneeball
                snowballs[i].draw();
            }
        
            else {
                if (snowballs[i].timer == 0) { //wenn Schneeball einschlägt
                    snowballs[i].draw();
                    let hit: boolean = false;
                    for (let birdNumber: number = 0; birdNumber < arrayBirds.length; birdNumber++) {
                        //console.log(snowballs.length + arrayBirds.length);
                        let bird: Birds = arrayBirds[birdNumber];
                        //console.log("x: " + bird.x + "y: " + bird.y);
                        if (snowballs[i].ifHit(bird)) { //Vogel getroffen
                            hit = true;
                            bird.state = State.DEAD; //Vogel tot
                            score += 10; //Score erhöht sich um 10
                            console.log("score:" + score);
                            arrayBirds.splice(birdNumber, 1); //Anzahl getroffener Vögel
                        }
                    }

                    // wenn kein Vogel getroffen ein Punkt abzug
                    if (!hit) {
                        score--; 
                    }

                    snowballs.splice(i, 1); //Beim Durchlaufen der Schleife wird jedes Mal ein Schneeball aus dem Array gelöscht 
                    snowballCount ++; //Anzahl geworfener Schneebälle erhöht sich
                }
            }
        }
    }
    function updateCanvas(): void {
        if (snowballCount < 20 && arrayBirds.length > 0) { //solange nicht 20 Schneebälle geworfen wurden und noch mind. 1 Vogel lebt
            setTimeout(updateCanvas, 1000 / 20); //nach 33,3333ms wird die Funktion updateCanvasaufgerufen
            crc2.clearRect(0, 0, 800, 600); //Komplette Canvas wird entfernt
            crc2.putImageData(saveBackground, 0, 0); //gespeichertes Canvas Background worauf dann alle Moveables gezeichnet werden können
            moveBirds();
            moveSnowflakes();
            calculateFoodAction();
            calculateSnowballAction();

            crc2.fillStyle = "#0f0f0f";     //Scorefeld 
            crc2.fillRect(650, 0, 150, 60);
            crc2.font = "20px Arial";
            crc2.fillStyle = "white";
            crc2.fillText("Score: ", 660, 25);

            crc2.fillText("" + score, 720, 25);  //Anzahl wie viel Futter noch verfügbar -> höchstens 3
            crc2.font = "20px Arial";
            if (foodCount < 3) {
                crc2.fillStyle = "white";
            } else {
                crc2.fillStyle = "red";
            }

            crc2.fillText("Food left: ", 660, 50);

            crc2.fillText("" + Math.abs(foodCount - 3), 760, 50);

        } else {    //wenn 20 Schneebälle geworfen wurden/alle Vögel tot 
            if (score >= 0) { //Score ist nicht negativ
                endScreen(true);
                
            }
            else {
                endScreen(false);
            
            }
        }
    }
    let username: string = prompt("Enter your name here!");
    function endScreen(winner: boolean): void { //Endscreen wenn Spieler "gewonnen" hat, sprich score >= 0
        if (winner) {
           
            crc2.fillStyle = "#4C0B5F";
            crc2.fillRect(250, 225, 300, 150);
            crc2.font = "25px Impact, Charcoal, sans-serif";
            crc2.fillStyle = "white";
            crc2.fillText("Game over!", 350, 250);
            crc2.font = "30px Impact, Charcoal, sans-serif";
            crc2.fillText("Username:" + " " + username, 260, 300); 
            crc2.font = "30px Impact, Charcoal, sans-serif";
            crc2.fillText("Your Final Score:" + " " + score, 260, 350);
            sendScore();
            
            //reportScore();  
            
        }
        else {
            crc2.fillStyle = "#4C0B5F"; //Endscreen Spieler hat verloren, sprich score < 0
            crc2.fillRect(250, 225, 300, 150);
            crc2.font = "25px Impact, Charcoal, sans-serif";
            crc2.fillStyle = "white";
            crc2.fillText("Game over!", 350, 250);
            crc2.font = "50px Impact, Charcoal, sans-serif";
            crc2.fillText("You lose!", 300, 320);
        }
        window.open("https://kretschmerlea.github.io/EIA2/Vogelhaus/Vogelhaus_Startseite.html", "_self");
    }
    function drawBirds(_size: Vector): void {
        console.log("Birds");

        let nBirds: number = 15; //anfangs werden 15 Vögel gezeichnet

        //let radiusBird: number = 20;
        //let bird: Path2D = new Path2D();
        //let colorBird: string[] = ["pink", "red", "yellow"];


        // bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);
        // bird.arc(15, 15, 25, 0, 1.5 * Math.PI);

        // crc2.fill();

        crc2.save();


        for (let drawn: number = 0; drawn < nBirds; drawn++) { //es werden 15 Vögel gezeichnet
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


        for (let drawn: number = 0; drawn < nSnowflakes; drawn++) { //es werden 100 Vögel gezeichnet
            let draw: Snowflakes = new Snowflakes(_size);

            arraySnowflakes.push(draw);

        }
        crc2.restore();
    }

    function throwSnowball(_event: MouseEvent): void { //bei Linksklick wird Schneeball geworden
        console.log();
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let ball: Snowball = new Snowball(x, y);
        ball.x = x;
        ball.y = y;
        ball.timer = 25;
        snowballs.push(ball);
    }

    function throwFood(_event: MouseEvent): void { //bei Rechts/Mittelklick wird Futter geworfen
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let food: Food = new Food(x, y);
       
        if (foodCount < 3  && _event.clientY > 400) { //höchstens 3 Futterladungen könnnen geworfen werden
            let x: number = _event.clientX;
            let y: number = _event.clientY;
            
            food.x = x;
            food.y = y;
            food.timer = 25;
            food.lifetime = 250;
            arrayFood.push(food);
            foodCount++;
        }

    }
    async function sendScore(): Promise<void> {
        let query: string = "name=" + username + "&score=" + score;
        console.log(query);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        // await fetch("index.html?" + query.toString());
        // alert("Order sent ");
        alert(responseText);
        console.log(responseText);
    }
    
    /*async function reportScore(): Promise<void> {
        //console.log("");
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();

        //let result: ScoreResult[] = JSON.parse(responseText);

        //for (let i: number = 0; i < result.length; i++) {
            
        //}

        alert(responseText);
        let orders: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        //orders.innerText = responseText;
    }*/
}
 