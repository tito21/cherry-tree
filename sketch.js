
const WIDTH = 400;
const HEIGHT = 400;

const NUM_BRANCHES = 10;
const NUM_FLOWERS = 10;

let base = {};
let seed = Math.floor(Math.random() * 1e9);

const seasons = {
  spring: {
    ornaments: drawFlower,
    background: '#75AABF'
  },
  winter: {
    ornaments: (start) => { },
    background: '#E0F7FA'
  },
  summer: {
    ornaments: (start) => drawLeaf(start, '#4CAF50'),
    background: '#039edc'
  },
  autumn: {
    ornaments: (start) => drawLeaf(start, '#FF5722'),
    background: '#a6d9f4'
  },
};


const STORAGE_KEY = 'cherry_seed';

function createUserSeed() {
  seed_local = Math.floor(Math.random() * 1e9).toString(16);
  localStorage.setItem(STORAGE_KEY, seed_local);
}


function setup() {
  // put setup code here

  createCanvas(WIDTH, HEIGHT);
  base = createVector(WIDTH / 2, 3 * HEIGHT / 4);
  randomSeed(seed);
  noLoop();

}

function draw() {
  // put drawing code here

  let season = random(Object.keys(seasons));
  console.log('Season:', season);
  background(seasons[season].background);

  let tree_height = random(100, 200);
  let top = createVector(base.x, base.y - tree_height);


  stroke('#CB6F2C');
  strokeWeight(4);
  line(base.x, base.y, top.x, top.y);

  for (let i = 0; i < NUM_BRANCHES; i++) {
    drawBranch(p5.Vector.sub(top, base).mult(random(0.2, 0.8)).add(base), seasons[season].ornaments);
  }

}

function drawBranch(start, ornamentFunction) {
  let branch_angle = random(-5 * PI / 4, PI / 4);
  let branch_length = random(50, 100);

  let branch_x = start.x + branch_length * cos(branch_angle);
  let branch_y = start.y + branch_length * sin(branch_angle);

  line(start.x, start.y, branch_x, branch_y);

  for (let i = 0; i < NUM_FLOWERS; i++) {
    let pos = p5.Vector.sub(createVector(branch_x, branch_y), start);
    pos = p5.Vector.mult(pos, (i + 1) / NUM_FLOWERS);
    pos.add(start);
    pos.add(p5.Vector.fromAngle(random(0, 2 * PI)).mult(random(-12, 12)));
    ornamentFunction(pos);
  }
}


function drawFlower(start) {
  push();
  fill('#E3B09F');
  noStroke();
  ellipse(start.x, start.y, 10, 10);
  pop();
}


function drawLeaf(start, color) {
  push();
  translate(start.x, start.y);
  rotate(random(-PI / 4, PI / 4));
  fill(color);
  noStroke();
  ellipse(0, 0, 10, 5);
  pop();
}


function consentGiven() {
  createUserSeed();
  document.getElementById('consent').style.display = 'none';
  window.location.reload();
}


document.getElementById('consent-button').addEventListener('click', consentGiven);
if (localStorage.getItem(STORAGE_KEY)) {
  seed = parseInt(localStorage.getItem(STORAGE_KEY), 16);
  console.log('Seed:', seed);
  document.getElementById('consent').style.display = 'none';
}