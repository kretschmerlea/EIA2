namespace L05_CharacterEditor {
    window.addEventListener("load", handleLoad);
    
    async function handleLoad(_event: Event): Promise<void> {
        console.log("Init");
        
        let response: Response = await fetch("Data.json");
        let editor: string = await response.text();
        let data = JSON.parse(editor);
        
        generateContent(data);

        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        
        console.log(submit);
        submit.addEventListener("click", submitCharacter);
        form.addEventListener("change", handleChange);
        
        displayCharacter();
    }
    async function submitCharacter(_event: MouseEvent): Promise<void> {
        console.log("SubmitCharacter");
        // _event.preventDefault();
        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("index.html?" + query.toString());
        alert("Your character has been submitted!");
    }

    function handleChange(_event: Event): void {
        displayCharacter();
    }

    function displayCharacter(): void {
        // let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        // console.log(inputs);
        let price: number = 0;
        let character: HTMLDivElement = <HTMLDivElement>document.querySelector("div#character");
        character.innerHTML = "";

        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        // console.group("Order");
        for (let entry of formData) {
            // console.log(entry);
            let selector: string = "[value='" + entry[1] + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']";
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
            let itemPrice: number = Number(item.getAttribute("price"));
            switch (entry[0]) {
                case "Amount":
                    break;
                case "Drink":
                    let amount: number = Number(formData.get("Amount"));
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
    interface Data {
        [category: string]: Category[];
    }
    interface Category {
        subcategories: Subcategory;
        type: string;
    }
    interface Subcategory {
        elements: Elements[];
        type: string;
    }
    interface Elements {
        name: string;
        weight: number;
    }
    
    let singlehanded: Subcategory = {
        type: "checkbox", elements:
            [
                { name: "Gun", weight: 2 },
                { name: "Sword", weight: 3 },
                { name: "Knife", weight: 1 },
                { name: "Frying Pan", weight: 3 }
            ]
    };
    let doublehanded: Subcategory = {
        type: "radio", elements:
            [
                { name: "bow&arrow", weight: 3 },
                { name: "nunchakus", weight: 1.5 },
                { name: "crossbow", weight: 2.5 },
                { name: "lance", weight: 5 }
            ]
    };
    let hat: Subcategory = {
        type: "radio", elements:
            [
                { name: "cowboy hat", weight: 0.8 },
                { name: "bowler hat", weight: 0.7 },
                { name: "beanie", weight: 0.3 },
                { name: "trucker cap", weight: 0.8 }
            ]
    };
    let belt: Subcategory = {
        type: "radio", elements:
            [
                { name: "cowboy belt", weight: 1 },
                { name: "plain brown belt", weight: 0.8 },
                { name: "striped belt", weight: 0.5 },
                { name: "clear plastic belt", weight: 0.5 }
            ]
    };

    let data: Data = {
        "Weapon":
            [
                { type: "radio", subcategories: singlehanded },
                { type: "radio", subcategories: doublehanded }
            ],
        "Accessories":
            [
                { type: "radio", subcategories: hat },
                { type: "radio", subcategories: belt }
            ]
    };
}



