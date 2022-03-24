
var backgroundImg;
var marioImg;
var marioSprite;
var gameState = "play";
var coinImg;
var ob1;
var ob2;
var ob3;
var groundSprite;
var score = 0;
var coinGroup;
var obGroup;

function preload(){
    backgroundImg = loadImage('backg.jpg');
    marioImg = loadAnimation('Capture1.png', 'Capture3.png', 'Capture4.png');
    coinImg = loadImage('coin.png');
    ob1 = loadImage('obstacle1.png');
    ob2 = loadImage('obstacle2.png');
    ob3 = loadImage('obstacle3.png');
}

function setup()
{
  createCanvas(600, 200);
  marioSprite = createSprite(80, 130);
  marioSprite.addAnimation('marioAnim', marioImg);
  marioSprite.scale = 0.5;

  groundSprite = createSprite(300, 170, 600, 10);
  groundSprite.visible = false;

  coinGroup = createGroup();
  obGroup = createGroup();
}

function draw()
{
    background(backgroundImg);
    
    textSize(20);
    stroke('black');
    text('Score:' + score, 10, 20);

    if (gameState == "play"){
        generateCoins();
        generateObstacles();

        if (keyDown('space') && marioSprite.y > 100){
            marioSprite.velocityY = -8;
        }

        marioSprite.velocityY += 1;
        marioSprite.collide(groundSprite);

        if (marioSprite.isTouching(coinGroup)){
            score += 1;
            coinGroup.destroyEach();
        }

        if (marioSprite.isTouching(obGroup)){
            gameState = 'end';
        }
    }

    if (gameState == "end"){

        obGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);

    }

    drawSprites();
}

function generateCoins(){

    if (frameCount%60 == 0){
        var coin = createSprite(580, 60);
        coin.addImage('CoinImg', coinImg);
        coin.scale = 0.2;
        coin.velocityX = -3;
        coinGroup.add(coin);
    }
}

function generateObstacles(){

    if (frameCount % 60 == 0){
        var ob = createSprite(580, 150);
        ob.velocityX = -2.5;
        ob.scale = 0.2;
        
        var number = Math.round(random(1,3));
        switch(number){
            case 1:
                ob.addImage('ob1', ob1);
                break
            case 2:
                ob.addImage('ob2', ob2);
                break
            case 3:
                ob.addImage('ob3', ob3);
                break
        }

        obGroup.add(ob);
    }


}