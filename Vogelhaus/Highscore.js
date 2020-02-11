var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Vogelhaus;
(function (Vogelhaus) {
    window.addEventListener("load", handleLoad);
    let url = "https://birdiess.herokuapp.com/";
    function handleLoad(_event) {
        document.getElementById("Highscore").addEventListener("click", handleRetrieve);
    }
    function handleRetrieve(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "command=retrieve";
            let response = yield fetch(url + "?" + query);
            let responseText = yield response.text();
            let finalResponse = [];
            let rawJSON = JSON.parse(responseText);
            for (let i = 0; i < rawJSON.length; ++i) {
                finalResponse.push(rawJSON[i]);
                console.log(finalResponse[i]);
            }
            finalResponse = finalResponse.sort((a, b) => a.score - b.score);
            //console.log(finalResponse);
            let scores = document.querySelector("div#scores");
            let html = "";
            html += "<table id='highscorelist'>";
            html += "<thead id='headline'><tr><th>Name</th><th>Score<th></tr><thead><tbody>";
            for (let i = finalResponse.length - 1; i >= 0; i--) {
                let scoreResult = finalResponse[i];
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
        });
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Highscore.js.map