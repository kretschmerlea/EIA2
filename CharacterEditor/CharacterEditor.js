{
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
}
//# sourceMappingURL=CharacterEditor.js.map