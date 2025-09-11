var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    function paddle(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speedModifier = 0;
      this.hasCollidedWith = function(ball) {
        var paddleLeftWall = this.x;
        var paddleRightWall = this.x + this.width;
        var paddleTopWall = this.y;
        var paddleBottomWall = this.y + this.height;
        if(ball.x > paddleLeftWall 
          && ball.x < paddleRightWall
          && ball.y > paddleTopWall
          && ball.y < paddleBottomWall) {
          return true;
        }
        return false;
      };
      this.move = function(keyCode) {
        var nextY = this.y;
        if(keyCode == 40) {
          nextY += 5;
          this.speedModifer = 1.5;
        } else if(keyCode == 38) {
          nextY += -5;
          this.speedModifier = 1.5;
        } else {
          this.speedModifier = 0;
        }
        nextY = nextY < 0 ? 0 : nextY;
        nextY = nextY + this.height > 480 ? 480 - this.height : nextY;
        this.y = nextY;
      };
    }
    var player = new paddle (5, 200, 25, 100);
    var ai = new paddle (610, 200, 25, 100);
    var ball = { x: 320, y: 240, radius: 7, xSpeed: 2, ySpeed: 0,
      reverseX: function() {
        this.xSpeed *= -1;
      },
      reverseY: function() {
        this.ySpeed *= -1;
      },
      reset: function () {
        this.x = 320;
        this.y = 240;
        this.xSpeed = 2;
        this.ySpeed = 0;
      },
      isBouncing: function() {
        return ball.ySpeed != 0;
      },
      modifyXSpeedBy: function(modification) {
        modification = this.xSpeed < 0 ? modification * -1 : modification;
        var nextValue = this.xSpeed + modification;
        nextValue = Math.abs(nextValue) > 9 ? 9 : nextValue;
        this.xSpeed = nextValue;
      },
      modifyYSpeedBy: function(modification) {
        modification = this.ySpeed < 0 ? modification * -1 : modification;
        this.ySpeed += modification;
      }
    };
    function tick() {
      updateGame();
      draw2()
      window.setTimeout("tick()", 1000/60);
    }
    function updateGame() {
      ball.x += ball.xSpeed;
      ball.y += ball.ySpeed;
      if(ball.x < 0 || ball.x > 640) {
        ball.reset();
      }
      if(ball.y <= 0 || ball.y >= 480) {
        ball.reverseY();
      }
      var collidedWithPlayer = player.hasCollidedWith(ball);
      var collidedWithAi = ai.hasCollidedWith(ball);
      if(collidedWithPlayer || collidedWithAi) {
        ball.reverseX();
        ball.modifyXSpeedBy(0.25);
        var speedUpValue = collidedWithPlayer ? player.speedModifier : ai.speedModifier;
        ball.modifyYSpeedBy(speedUpValue);
      }
      for(var keyCode in heldDown) {
        player.move(keyCode);
      }
      var aiMiddle = ai.y + (ai.height / 2);
      if(aiMiddle < ball.y) {
        ai.move(40);
      }
      if(aiMiddle > ball.y) {
        ai.move(38);
      }

    }
    function draw2() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 640, 480);
      renderPaddle(player);
      renderPaddle(ai);
      renderBall(ball);
    }
    function renderPaddle(paddle) {
      ctx.fillStyle = "blue";
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }
    function renderBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "pink";
      ctx.fill();
    }
    var heldDown = {};
    window.addEventListener("keydown", function(keyInfo) { heldDown[event.keyCode] = true; }, false);
    window.addEventListener("keyup", function(keyInfo) { delete heldDown[event.keyCode]; }, false);
    tick();

//
//p5
//

//   function setup() {
//   createCanvas(400, 400);
//   colorMode(HSB);

//   // Set angle mode so that atan2() returns angles in degrees
//   angleMode(DEGREES);

//   describe('Two eyes that follow the cursor.');
// }

// function draw2() {
//   background(0);

//   // draw2 left eye

//   let leftX = 150;
//   let leftY = 200;

//   // Calculate angle between left eye and mouse
//   let leftAngle = atan2(mouseY - leftY, mouseX - leftX);

//   push();
//   translate(leftX, leftY);
//   fill(255);
//   ellipse(0, 0, 50, 50);
//   rotate(leftAngle);
//   fill(0);
//   ellipse(12.5, 0, 25, 25);
//   pop();

//   // draw2 right eye

//   let rightX = 250;
//   let rightY = 200;

//   // Calculate angle between right eye and angle
//   let rightAngle = atan2(mouseY - rightY, mouseX - rightX);

//   push();
//   translate(rightX, rightY);
//   fill(255);
//   ellipse(0, 0, 50, 50);
//   rotate(rightAngle);
//   fill(0);
//   ellipse(12.5, 0, 25, 25);
//   pop();
// }