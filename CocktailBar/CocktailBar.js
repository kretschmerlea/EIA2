var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L05_CocktailBar;
(function (L05_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Init");
            let response = yield fetch("Data.json");
            let offer = yield response.text();
            let data = JSON.parse(offer);
            L05_CocktailBar.generateContent(data);
            let form = document.querySelector("form");
            let slider = document.querySelector("input#amount");
            let submit = document.querySelector("button[type=button]");
            console.log(submit);
            submit.addEventListener("click", sendOrder);
            form.addEventListener("change", handleChange);
            slider.addEventListener("input", displayAmount);
            displayOrder();
        });
    }
    function sendOrder(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("SendOrder");
            // _event.preventDefault();
            let formData = new FormData(document.querySelector("form"));
            let query = new URLSearchParams(formData);
            yield fetch("index.html?" + query.toString());
            alert("Order sent!");
        });
    }
    function handleChange(_event) {
        displayOrder();
    }
    function displayOrder() {
        // let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        // console.log(inputs);
        let price = 0;
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let formData = new FormData(document.querySelector("form"));
        // console.group("Order");
        for (let entry of formData) {
            // console.log(entry);
            let selector = "[value='" + entry[1] + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']";
            let item = document.querySelector(selector);
            let itemPrice = Number(item.getAttribute("price"));
            switch (entry[0]) {
                case "Amount":
                    break;
                case "Drink":
                    let amount = Number(formData.get("Amount"));
                    itemPrice = amount * itemPrice;
                    order.innerHTML += amount + " L " + item.value + ": €" + itemPrice + "<br>";
                    break;
                default:
                    order.innerHTML += item.value + ": €" + itemPrice.toFixed(2) + "<br>";
            }
            // console.log(item);
            price += itemPrice;
        }
        // console.groupEnd();
        order.innerHTML += "<p><strong>Total: €" + price.toFixed(2);
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(L05_CocktailBar || (L05_CocktailBar = {}));
//# sourceMappingURL=CocktailBar.js.map