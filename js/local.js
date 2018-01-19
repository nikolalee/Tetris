var Local = function(){
    var game;
    var timer = null;
    var Interval = 200;
    var time= 0;
    var timeCount= 0;
    var scoreCount = 0;
    var bindKeyEvent = function()
    {
      document.onkeydown = function(e){
          if(e.keyCode === 37){
              //left
              game.left();
          }else if(e.keyCode === 38){
              //up
              game.rotate();
          }else if(e.keyCode === 39){
              //right
              game.right();
          }else if(e.keyCode === 40){
              //down
              game.down();
          }else if(e.keyCode === 32){
              //space
              game.fall();
          }
      }
    };
    var move = function(){
        toSetTime();
        var clearFlag = 0;
        if(!game.down()){
            game.fixed();
            if(!game.stop()) {
                clearFlag=game.clearRow();
                if(clearFlag){
                    toSetScore(clearFlag);
                }
                game.showNext(randomIndex(), randomDir());
            }else{
                clearInterval(timer);
                timer = null;
                bindKeyEvent = null;
                game.overMessage();
            }
        }
    };
    var toSetTime = function(){
        timeCount++;
        if(timeCount === 5){
            timeCount = 0;
            time++;
            game.setTime(time);
        }
    };
    var toSetScore = function(clearFlag){
        var s = 0;
        switch(clearFlag){
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s =60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        scoreCount = scoreCount + s;
        game.setScore(scoreCount);
    };
    var randomIndex = function(){
        return Math.floor(Math.random()*7+1);
    };
    var randomDir = function(){
        return Math.floor(Math.random()*4);
    };
    var start = function(){
        var doms = {
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next'),
            timeDiv:document.getElementById('time'),
            scoreDiv:document.getElementById('score'),
            messageDiv:document.getElementById('overMessage')
        };
        game = new Game();
        game.init(doms,randomIndex(),randomDir());
        game.showNext(randomIndex(),randomDir());
        bindKeyEvent();
        timer = setInterval(move,Interval);
    };
    this.start = start;
};