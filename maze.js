let maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

function start(arr, num) {
  let start = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(num) > 0) {
      start.y = i;
      start.x = arr[i].indexOf(num);
      break;
    }
  }
  return start;
}

let startPoint = start(maze, "0");
// console.log(startPoint, " - startPoint");

function neighbor(arr, start) {
  let { x, y } = start;
//   console.log(x, y);

  let neighbors = [];

  if (arr[y][x + 1] == "+") {
    neighbors.push({ y: y, x: x + 1 });
  }
  if (arr[y][x - 1] == "+") {
    neighbors.push({ y: y, x: x - 1 });
  }
  if (arr[y + 1][x] == "+") {
    neighbors.push({ y: y + 1, x: x });
  }
  if (arr[y - 1][x] == "+") {
    neighbors.push({ y: y - 1, x: x });
  }

    return neighbors;
}

let rez = [];

function comparePath(arr, start) {
    maze[start.y][start.x] = 0;
    let neigborsArr = neighbor(arr, start);
    if(neigborsArr.length > 0) {
        for (let i = 0; i < neigborsArr.length; i++) {
            let point = neigborsArr[i];
                // console.log(point, ' - point');
            let end = point.x == 0 
                || point.x == neigborsArr.length - 1 
                || point.y == 0 
                || point.y == neigborsArr.length - 1;
                // console.log(end,' - end');
            let visited = maze[point.y][point.x] == 0;
                // console.log(visited, ' - visited');
            if(end || (!visited && comparePath(arr, point))){
                maze[point.y][point.x] = 0
                rez.push({y: point.y, x: point.x})
                return true;
            };
        }
    }
    return false;
}

comparePath(maze, startPoint)
console.table(maze)

function arrow(arr) {
    arr.push(startPoint);
    console.log(arr, ' - arr');
    let arrow = [];
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i].x < arr[i+1].x) { 
            // console.log('left');
            arrow.push('left');
        }
        if(arr[i].x > arr[i+1].x) {
            // console.log('right');
            arrow.push('right');
        }
        if(arr[i].y < arr[i+1].y) {
            // console.log('top');
            arrow.push('top');
        }
        if(arr[i].y > arr[i+1].y) {
            // console.log('bottom');
            arrow.push('bottom');
        }
        
    }
    return arrow.reverse();
}
console.log(arrow(rez).toString())