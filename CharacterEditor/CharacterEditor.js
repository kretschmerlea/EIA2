var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L05_CharacterEditor;
(function (L05_CharacterEditor) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Init");
            let response = yield fetch("./CharacterEditor.json");
            let editor = yield response.text();
            let data = JSON.parse(editor);
            L05_CharacterEditor.generateContent(data);
            let form = document.querySelector("form");
            let submit = document.querySelector("button[type=button]");
            console.log(submit);
            submit.addEventListener("click", submitCharacter);
            form.addEventListener("change", handleChange);
            displayCharacter();
        });
    }
    function submitCharacter(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("SubmitCharacter");
            // _event.preventDefault();
            let formData = new FormData(document.querySelector("form"));
            let query = new URLSearchParams(formData);
            yield fetch("index.html?" + query.toString());
            alert("Your character has been submitted!");
        });
    }
    function handleChange(_event) {
        displayCharacter();
    }
    function displayCharacter() {
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let character = document.querySelector("div#character");
        character.innerHTML = "";
        let formData = new FormData(document.querySelector("form"));
        let name = document.querySelector("input#name");
        character.innerHTML += "Name: " + name.value + "<br>";
        let genders = document.querySelectorAll("input[name=Gender]");
        for (let i = 0; i < genders.length; i++) {
            console.log(genders[i]);
            if (genders[i].checked)
                character.innerHTML += "Gender: " + genders[i].value + "<br>";
        }
        let creature = document.querySelector("input#creature");
        character.innerHTML += "Type of Creature: " + creature.value + "<br>";
        let klasse = document.querySelector("input#class");
        character.innerHTML += "Type of Class: " + name.value + "<br>";
    }
    let singlehanded = {
        type: "checkbox", elements: [
            { name: "Gun", weight: 2 },
            { name: "Sword", weight: 3 },
            { name: "Knife", weight: 1 },
            { name: "Frying Pan", weight: 3 }
        ]
    };
    let doublehanded = {
        type: "radio", elements: [
            { name: "bow&arrow", weight: 3 },
            { name: "nunchakus", weight: 1.5 },
            { name: "crossbow", weight: 2.5 },
            { name: "lance", weight: 5 }
        ]
    };
    let hat = {
        type: "radio", elements: [
            { name: "cowboy hat", weight: 0.8 },
            { name: "bowler hat", weight: 0.7 },
            { name: "beanie", weight: 0.3 },
            { name: "trucker cap", weight: 0.8 }
        ]
    };
    let belt = {
        type: "radio", elements: [
            { name: "cowboy belt", weight: 1 },
            { name: "plain brown belt", weight: 0.8 },
            { name: "striped belt", weight: 0.5 },
            { name: "clear plastic belt", weight: 0.5 }
        ]
    };
    let data = {
        "Weapon": [
            { type: "radio", subcategories: singlehanded },
            { type: "radio", subcategories: doublehanded }
        ],
        "Accessories": [
            { type: "radio", subcategories: hat },
            { type: "radio", subcategories: belt }
        ]
    };
})(L05_CharacterEditor || (L05_CharacterEditor = {}));
//# sourceMappingURL=CharacterEditor.js.map