let mazeCenter = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];
let mazeTop = [
  ["#", "#", "#", "#", "#", "0", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["#", "+", "#", "+", "+", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
];

let mazeRight = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "+", "+", "#", "+", "0"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];
let mazeLeft = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["0", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "+", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

let mazeBottom = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "+", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "0", "#", "#", "#", "#", "#", "#"],
];
let mazeRandom = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "+", "+", "#", "0", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];


function start(arr, num) {
  let start = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(num) >= 0) {
      start.y = i;
      start.x = arr[i].indexOf(num);
      break;
    }
  }
  return start;
}

function neighbor(arr, start) {
  let { x, y } = start;

  let neighbors = [];

  if (arr[x + 1] !== undefined && arr[y][x + 1] == "+") {
    neighbors.push({ y: y, x: x + 1 });
  }
  if (arr[x - 1] !== undefined && arr[y][x - 1] == "+") {
    neighbors.push({ y: y, x: x - 1 });
  }
  if (arr[y + 1] !== undefined && arr[y + 1][x] == "+") {
    neighbors.push({ y: y + 1, x: x });
  }
  if (arr[y - 1] !== undefined && arr[y - 1][x] == "+") {
    neighbors.push({ y: y - 1, x: x });
  }
    return neighbors;
}

let rez = [];

function comparePath(arr, start) {
    arr[start.y][start.x] = 0;
    let neighborsArr = neighbor(arr, start);
    if(neighborsArr.length > 0) {
        for (let i = 0; i < neighborsArr.length; i++) {
            let point = neighborsArr[i];
            let end =
                point.x == 0
                || point.x == arr[0].length-1
                || point.y == 0
                || point.y == arr.length-1;
            let visited = arr[point.y][point.x] == 0;
            if(end || (!visited && comparePath(arr, point))){
                arr[point.y][point.x] = 0
                rez.push({y: point.y, x: point.x})
                return true;
            };
        }
    }
    return false;
}

function arrow(arr, startPoint) {
    arr.push(startPoint);
    let arrow = [];
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i].x < arr[i+1].x) { 
            arrow.push('left');
        }
        if(arr[i].x > arr[i+1].x) {
            arrow.push('right');
        }
        if(arr[i].y < arr[i+1].y) {
            arrow.push('top');
        }
        if(arr[i].y > arr[i+1].y) {
            arrow.push('bottom');
        }
        
    }
    return arrow.reverse();
}

function finish(arr) {
    let startPoint = start(arr, "0");
    console.log(startPoint, ' - startPoint');
    comparePath(arr, startPoint);

    console.table(arr);
    console.log(arrow(rez, startPoint).toString());
    return rez = [];
}
finish(mazeCenter);
console.log('---------------------------------------------------');
finish(mazeTop);
console.log('---------------------------------------------------');
finish(mazeRight);
console.log('---------------------------------------------------');
finish(mazeLeft);
console.log('---------------------------------------------------');
finish(mazeBottom);
console.log('---------------------------------------------------');
finish(mazeRandom);

