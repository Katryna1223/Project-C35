var balloonImg, balloon, balloonPos, city, database, position, ground;
function preload(){
  balloonImg = loadImage('pro-C35 images/Hot Air Ballon-02.png');
  city = loadImage('pro-C35 images/Hot Air Ballon-01.png');
}
function setup() {
  createCanvas(1500,1500);
  database = firebase.database();
  balloon = createSprite(400, 1000, 50, 50);
  ground = createSprite(width/2, 1470, width, 30);
  ground.visible = false;
  balloon.addImage('balloon', balloonImg);
  balloon.scale = 0.5;
  balloonPos = database.ref('Balloon/position');
  balloonPos.on("value", readPosition, showError);
}

function draw() {
    background(city);
    if(position != undefined){
      if(balloon.y < 1370){
        if(keyDown(RIGHT_ARROW)){
          writePosition(5,0);
        } 
        else if(keyDown(LEFT_ARROW)){
          writePosition(-5,0);
        } 
        else if(keyDown(UP_ARROW)){
          writePosition(0,-5);
          balloon.scale += .006;
        } 
        else if(keyDown(DOWN_ARROW)){
          writePosition(0,5);
          if(balloon.scale >0.5){
            balloon.scale -=0.006;
          }
      }
  }
}
  balloon.collide(ground);
  drawSprites();

  textSize(20);
  stroke(230,234,12);
  text("Use the arrow keys to move Kanchan and her cousin!", 30, 20);
}

function writePosition(x, y){
  balloonPos.set({
    x: position.x + x,
    y: position.y + y
  });
}
function readPosition(data){
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("values");
}