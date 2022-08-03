// copied from clarinet
const BASIC = [
    {
    },
    {
        "image": [
            { "shape": "rect", "fill": "#333", "stroke": "#999", "x": 0.5, "y": 0.5, "width": 47, "height": 47 }
        ],
        "jumpable": 3,
        "solid": {
            "1": [2, 4],
            "2": [],
            "3": [2, 6],
            "4": [],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": true, "7": true, "9": true }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#248", "stroke": "#48f", "points": [[0.5, 47.5], [47.5, 47.5], [47.5, 0.5]] }
        ],
        "solid": {
            "1": [2, 4],
            "2": [1],
            "3": [2],
            "4": [],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": true, "7": false, "9": true }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#248", "stroke": "#48f", "points": [[0.5, 0.5], [47.5, 47.5], [0.5, 47.5]] }
        ],
        "solid": {
            "1": [2],
            "2": [3],
            "3": [2, 6],
            "4": [],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": true, "7": true, "9": false }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#333", "stroke": "#999", "points": [[0.5, 0.5], [47.5, 47.5], [47.5, 0.5]] }
        ],
        "jumpable": 3,
        "solid": {
            "1": [2, 4],
            "2": [],
            "3": [2, 6],
            "4": [],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [3],
            "7": [4, 8],
            "8": [7],
            "9": [6, 8]
        },
        "corners": { "1": false, "3": true, "7": true, "9": true }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#333", "stroke": "#999", "points": [[0.5, 0.5], [0.5, 47.5], [47.5, 0.5]] }
        ],
        "jumpable": 3,
        "solid": {
            "1": [2, 4],
            "2": [],
            "3": [2, 6],
            "4": [1],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [],
            "7": [4, 8],
            "8": [9],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": false, "7": true, "9": true }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#482", "stroke": "#8f4", "points": [[0.5, 47.5], [0.5, 23.5], [24.5, 23.5], [24.5, 0.5], [47.5, 0.5], [47.5, 47.5]] }
        ],
        "jumpable": 3,
        "solid": {
            "1": [2, 4],
            "2": [],
            "3": [6, 2],
            "4": [],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [9],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": true, "7": false, "9": true }
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#482", "stroke": "#8f4", "points": [[0.5, 0.5], [23.5, 0.5], [23.5, 24.5], [47.5, 24.5], [47.5, 47.5], [0.5, 47.5]] }
        ],
        "jumpable": 3,
        "solid": {
            "1": [4, 2],
            "2": [],
            "3": [2, 6],
            "4": [7],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": true, "3": true, "7": true, "9": false }
    },
    {
        "image": [
            { "shape": "circle", "fill": "#ff0", "stroke": "#ff8", "cx": 24, "cy": 24, "r": 18 }
        ],
        "item": true
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#842", "stroke": "#f84", "points": [[4.5, 0.5], [14.5, 0.5], [14.5, 17.5], [34, 17.5], [33.5, 0.5], [43.5, 0.5], [43.5, 47.5], [33.5, 47.5], [33.5, 30.5], [14.5, 30.5], [14.5, 47.5], [4.5, 47.5]] }
        ],
        "jumpable": 3
    },
    {
        "image": [
            { "shape": "polygon", "fill": "#333", "stroke": "#999", "points": [[0.5, 0.5], [47.5, 0.5], [24, 47.5]] }
        ],
        "jumpable": 3,
        "solid": {
            "1": [2, 4],
            "2": [],
            "3": [2, 6],
            "4": [1],
            "5": [2, 8, 1, 3, 7, 9, 4, 6],
            "6": [3],
            "7": [4, 8],
            "8": [],
            "9": [6, 8]
        },
        "corners": { "1": false, "3": false, "7": true, "9": true }
    },
    {
        "image": [
            { "shape": "rect", "fill": "#114acb", "x": 0.5, "y": 0.5, "width": 47, "height": 47 },
            { "shape": "polygon", "fill": "rgba(255,255,255,0.30)", "points": [[0.5, 0.5], [47.5, 0.5], [40, 8], [8, 8], [8, 40], [0.5, 47.5]] },
            { "shape": "polygon", "fill": "rgba(0,0,0,0.30)", "points": [[47.5, 0.5], [48, 48], [0.5, 47.5], [8, 40], [40, 40], [40, 8]] },
            { "shape": "polygon", "fill": "rgb(255,255,0)", "stroke": "rgba(255,255,0,0.5)", "points": [[24, 9], [35, 20], [26, 29], [26, 33], [22, 33], [22, 27], [29, 20], [24, 15], [16, 23], [13, 20]] },
            { "shape": "rect", "fill": "rgb(255,255,0)", "stroke": "rgba(255,255,0,0.5)", "x": 22, "y": 35, "width": 4, "height": 4 }
        ],
        "item": true
    },
    {
        "image": [
            { "shape": "circle", "fill": "#80f", "stroke": "#88f", "cx": 24, "cy": 24, "r": 18 }
        ],
        "item": true
    },
    {
        "image": [
            { "shape": "circle", "fill": "#4f4", "stroke": "#8f8", "cx": 24, "cy": 24, "r": 18 }
        ],
        "item": true
    }
];

module.exports = BASIC;
