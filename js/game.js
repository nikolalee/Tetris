var Game = function(){
    var nextDiv;
    var gameDiv;
    var timeDiv;
    var scoreDiv;
    var messageDiv;
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    var nextDivs=[];
    var gameDivs = [];
    var cur;
    var next;
    var check = function(pos,x,y){
        if(pos.x+x<0||pos.x+x>=gameData.length){
            return false;
        }else if(pos.y+y<0||pos.y+y>=gameData[0].length){
            return false;
        } else if(gameData[pos.x+x][pos.y+y]===2){
            return false;
        } else{
            return true;
        }
    };
    var isValid = function(pos,data){
        for(var i= 0;i<data.length;i++){
            for(var j = 0;j<data[0].length;j++){
                if(data[i][j]===1) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    var setData = function(){
        for(var i = 0;i<cur.data.length;i++){
            for(var j = 0;j<cur.data[0].length;j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    };
    var clearData = function(){
        for(var i = 0;i<cur.data.length;i++){
            for(var j = 0;j<cur.data[0].length;j++) {
                if(check(cur.origin,i,j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    };
    var rotate = function(){
        if(cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    var down = function(){
        if(cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        }else {
            return false;
        }
    };
    var left = function(){
        if(cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    var right = function(){
        if(cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    var fixed = function(){
        for(var i = 0;i<cur.data.length;i++){
            for(var j = 0;j < cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    if(cur.data[i][j]===1){
                        cur.data[i][j] = 2;
                    }
                }
            }
        }
        setData();
        refreshDiv(gameData,gameDivs);
    };
    var showNext = function(index,dir){
        cur = next;
		console.log(cur);
        next = squareFactory.prototype.make(index,dir);
        console.log(next);
		setData();
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs);
    };
    var stop = function(){
        for(var i = 0;i < gameData[0].length;i++){
            if(gameData[1][i]===2){
                return true;
            }
        }
        return false;
    };
    var clearRow = function(){
        var cleared = 0;
        for(var i = 0;i < gameData.length;i++){
            var toClear = true;
            for(var j = 0;j < gameData[i].length;j++){
                if(gameData[i][j]===0){
                    toClear = false;
                }
            }
            if(toClear){
                cleared++;
                for(var t =i;t >0;t--){
                    for( j = 0;j<gameData.length;j++){
                        gameData[t][j] = gameData[t-1][j];
                    }
                }
                for(j = 0;j < gameData[0].length;j++){
                    gameData[0][j] = 0;
                }
            }
        }
        return cleared;
    };
    var setTime = function(time){
        timeDiv.innerHTML = time;
    };
    var setScore = function(score){
        scoreDiv.innerHTML = score;
    };
    var overMessage = function(){
        messageDiv.style.visibility = 'visible';
    };


    var initDiv=function(container,data,divs){
        for(var i = 0;i<data.length;i++){
            var div = [];
            for(var j = 0;j<data[0].length;j++){
                var block = document.createElement('div');
                block.className = 'none';
                block.style.left = j * 20   + 'px';
                block.style.top = i * 20  + 'px';
                container.appendChild(block);
                div.push(block);
            }
            divs.push(div);
        }
    };
    var refreshDiv = function(data,divs){
        for(var i =0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j]===0){
                    divs[i][j].className = 'none';
                }else if(data[i][j]===1){
                    divs[i][j].className='done';
                }else if(data[i][j]===2){
                    divs[i][j].className='current';
                }
            }
        }
    };
    var init = function(doms,index,dir){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        messageDiv = doms.messageDiv;
        next = new squareFactory.prototype.make(index,dir);
		console.log(next);
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        refreshDiv(next.data,nextDivs);
    };
    this.init = init;
    this.down = down;
    this.right = right;
    this.left = left;
    this.rotate = rotate;
    this.fall = function(){
        while(down()){}
    };
    this.fixed = fixed;
    this.showNext = showNext;
    this.stop = stop;
    this.clearRow = clearRow;
    this.setTime = setTime;
    this.setScore = setScore;
    this.overMessage = overMessage;
};