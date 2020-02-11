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
        let finalResponse: any = JSON.parse(responseText);
        console.log(finalResponse);

        let highscorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        highscorelists.innerText = finalResponse;
        console.log(finalResponse);
        
    }
}