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
            let finalResponse = JSON.parse(responseText);
            console.log(finalResponse);
            let Scores = document.querySelector("div#Scores");
            Scores.innerText = finalResponse;
            console.log(finalResponse);
        });
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=Highscore.js.map