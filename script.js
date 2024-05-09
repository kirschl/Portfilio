// create Phaser.Game object assigned to global variable named game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'my-game', { preload: preload, create: create, update: update });

// declare other global variables (for sprites, etc.)
var logo;
var hello1, hello2, hello3;   //an emoji
var spacebar;
var GameOver=false;
var spinSound, match2Sound, match3Sound;
var scoreText, matchText, highScoreText;
var score = 100;
var highScore= 0;

// preload game assets - runs one time when webpage first loads
function preload() {
    game.load.image('phaser-logo', 'assets/phaser.png');
    //game load spritesheet(name of it, file of it, size of each sprite)
    game.load.spritesheet('hello', 'assets/hello-sprite.png', 64, 64);
    game.load.audio('spin', 'assets/spinner.mp3');
    game.load.audio('coin', 'assets/coin.wav');      //2 matches
    game.load.audio('pu', 'assets/power-up.wav');    //3 matches
}

// create game world - runs one time after preload finishes
function create() {
    // logo = game.add.image(400, 300, 'phaser-logo');
    // logo.anchor.setTo(0.5, 0.5);    
    game.stage.backgroundColor = '#6699ff'
    hello1 = game.add.sprite(game.world.centerX, game.world.centerY, 'hello');
    hello1.anchor.setTo(0.5, 0.5);
    hello2 = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'hello');
    hello2.anchor.setTo(0.5, 0.5);
    hello3 = game.add.sprite(game.world.centerX + 100, game.world.centerY, 'hello');
    hello3.anchor.setTo(0.5, 0.5);

    //keybindings
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    //variable = game add the audio (name, volume)
    spinSound = game.add.audio('spin', 0.3);
    spinSound.loop = true;
    match2Sound = game.add.audio('coin', 0.5);  
    match3Sound = game.add.audio('pu', 0.75);

    scoreText = game.add.text(game.world.centerX, game.world.centerY + 80, 'Use Spacebar to Spin',{ font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    scoreText.setShadow(1, 1, '#000000', 2);
    matchText = game.add.text(game.world.centerX + 50, game.world.centerY + 80,'',{ font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    matchText.setShadow(1, 1, '#000000', 2);
    highScoreText = game.add.text(game.world.centerX, game.world.centerY - 80, 'High Score: 100',{ font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    highScoreText.setShadow(1, 1, '#000000', 2);
}

// update game - runs repeatedly in loop after create finishes
function update() {
  if (GameOver==false){
    if (spacebar.justDown) {
      spinSound.play();
    }
    else if (spacebar.isDown) {
      //sprite's frame is set to a random integer
      hello1.frame = Math.floor(Math.random() * 6);
      hello2.frame = Math.floor(Math.random() * 6);
      hello3.frame = Math.floor(Math.random() * 6);
    }
    else if (spacebar.justUp) {
      spinSound.stop();
      checkForMatch()
      //game.stage.backgroundColor = Phaser.Color.getRandomColor();
    }
  }
}

// add custom functions (for collisions, etc.) - only run when called
function checkForMatch() {
  if (hello1.frame == hello2.frame && hello2.frame == hello3.frame) {
    // all 3 match
    score = score + 100;
    match3Sound.play();
    matchText.fill = "#0000FF";
    matchText.text = "Match Three +$100";
    game.stage.backgroundColor = '#f0c000';
  }
  else if (hello1.frame == hello2.frame || hello2.frame == hello3.frame|| hello1.frame == hello3.frame) {
    // any 2 match
    score = score + 20;
    match2Sound.play();
    matchText.fill = "#00FF00";
    matchText.text = "Match Two +$20";
    game.stage.backgroundColor = '#6060ff';
  }
  else {
    // none match
    score = score - 10;
    matchText.fill = "#FF0000"
    matchText.text = "None matched -$10"
    game.stage.backgroundColor = '#f00000';
  }
  if(score>highScore){
    highScore=score;
    highScoreText.text="High Score: "+highScore;
    game.stage.backgroundColor = "#0fFF00";
  }
  scoreText.text = "$"+score;//this is where we update the user
  if(score==0){
    gameOver();
  }   
}

function gameOver(){
  matchText.text = "Better luck next time, you are out of money. Go home, gambling is bad for your bank account.";
  GameOver=true;
}