namespace Vogelhaus {
    window.addEventListener("load", handleLoad);

    let url: string = "https://birdiess.herokuapp.com/";

    function handleLoad(_event: Event): void {
        document.getElementById("Highscore").addEventListener("click", handleRetrieve);

    }

    async function handleRetrieve(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();
        let finalResponse: ScoreResult[] = [];
        let rawJSON: any[] = JSON.parse(responseText);
        
        for (let i: number = 0; i < rawJSON.length; ++i) {
            finalResponse.push(rawJSON[i]);
            console.log(finalResponse[i]);
        }

        finalResponse = finalResponse.sort((a, b) => a.score - b.score);
        //console.log(finalResponse);


        let scores: HTMLDivElement = <HTMLDivElement>document.querySelector("div#scores");
        let html: string = "";
        html += "<table id='highscorelist'>";
        html += "<thead id='headline'><tr><th>Name</th><th>Score<th></tr><thead><tbody>";
        for (let i: number = finalResponse.length - 1; i >= 0; i--) {
            let scoreResult: ScoreResult = finalResponse[i];
            if (scoreResult.name != null && scoreResult.score != null) {
                html += "<tr id='place" + i + "' class='highscore-row'><td>";
                html += scoreResult.name;
                html += "</td><td>";
                html += scoreResult.score.toString();
                html += "</td></tr>";
            }
        }

        html += "</tbody></table>";
        scores.innerHTML = html;
        
    }
}