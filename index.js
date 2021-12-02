const container = d3.select(".container");

const svg = container
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);

let digits = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
];

let squareData = {
  height: 45,
  width: 45,
  x: 0,
  y: 0,
  color: "blue",
  margin: 5,
};

let makeDigit = (d) => {
  let digitData = [];
  // i -> Rows
  // j -> Coloumns
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      // 21 digits
      let currSquare = { ...squareData };

      if (j == 1 && i > 0 && i < 6) currSquare.color = "white";

      currSquare.x = j * (currSquare.width + currSquare.margin) + d;

      currSquare.y = i * (currSquare.width + currSquare.margin);

      digitData.push(currSquare);
    }
  }

  return digitData;
};

let clockData = [];
let gap = 0;
for (let i = 0; i < 6; i++) {
  let d = i * (3 * (squareData.width + squareData.margin) + 10);
  if (i == 2) {
    gap += squareData.width;
  } else if (i == 4) {
    gap += squareData.width;
  }
  clockData.push(makeDigit(d + gap));
}

console.log(clockData);

let virtualObjects = [];
for (let i = 0; i < 6; i++) {
  virtualObjects.push(svg.selectAll("rect").data(clockData[i]));
}

console.log(virtualObjects);

// Renders 6 digits
let render = () => {
  for (let i = 0; i < 6; i++) {
    virtualObjects[i]
      .enter()
      .append("rect")
      .data(clockData[i])
      .attr("height", (d) => d.height)
      .attr("width", (d) => d.width)
      .attr("fill", (d) => d.color)
      .attr("stroke", (d) => d.color)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("margin", (d) => d.margin);
  }
};

// Updates single digit
let updateDigit = (digitData, s) => {
  for (let i = 0; i < digitData.length; i++) {
    // sqaure object => color
    let r = Math.floor(i / 3);
    let c = i % 3;

    if (digits[s][r][c] === 1) {
      digitData[i].color = "#75D5FD"; // colored -> show
    } else {
      digitData[i].color = "black"; // bg match -> hidden
    }
  }
};

// Updates all 6 digits
let updateAllDigits = (h, m, s) => {
  updateDigit(clockData[0], Math.floor(h / 10));
  updateDigit(clockData[1], h % 10);
  updateDigit(clockData[2], Math.floor(m / 10));
  updateDigit(clockData[3], m % 10);
  updateDigit(clockData[4], Math.floor(s / 10));
  updateDigit(clockData[5], s % 10);
};

setInterval(() => {
  // extract time
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();

  updateAllDigits(h % 12, m, s);
  render();
}, 1000);
