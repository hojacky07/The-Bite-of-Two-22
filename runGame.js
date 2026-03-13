let player;

function setup() {
  new Canvas(1920, 1080);
  player = new Player(0,0)
}

function draw() {
  background(0);
  player.Move();
}
