var gameObj = {
    points: {
        score: 0,
        history: [],
        status: 1
    },
    stage: [],
    intiStage: function () {
        for (var cell = 0; cell < 4; cell++) {
            this.stage[cell] = [];
            for (var row = 0; row < 4; row++) {
                this.stage[cell][row] = {
                    boxObj: null,
                    position: [cell, row]
                };
            }
        }

    },
    
        empty: function () {
        var emptyList = [];
        for (var row = 0; row < 4; row++) {
            for (var cell = 0; cell < 4; cell++) {
                if (this.stage[cell][row].boxObj == null) {
                    emptyList.push(this.stage[cell][row]);
                }
            }
        }
        return emptyList;
    },
    newBox: function () {
        var _this = this;
        
        
        var box = function (obj) {
            var num = Math.random() > 0.9 ? 4 : 2;
            this.value = num;
            this.parent = obj;
            this.domObj = function () {
                var domBox = document.createElement('span');
                domBox.innerText = num;
                domBox.textContent = num;
                domBox.className = 'row' + obj.position[0] + ' ' + 'cell' + obj.position[1] + ' ' + 'num' + num;
                var root = document.getElementById('stage');
                root.appendChild(domBox);
                return  domBox;
            }();
            obj.boxObj = this;
        }
        var emptyList = this.empty();
        if (emptyList.length) {
            var randomIndex = Math.floor(Math.random() * emptyList.length);
            new box(emptyList[randomIndex]);
            return true;
        }
    },
    isEnd:function(){
        var emptyList = this.empty();
        if (!emptyList.length) {
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    var obj=this.stage[i][j];
                    var objLeft=(j==0)?{boxObj:{value:0}}:this.stage[i][j-1];
                    var objRight=(j==3)?{boxObj:{value:0}}:this.stage[i][j+1];
                    var objUp=(i==0)?{boxObj:{value:0}}:this.stage[i-1][j];
                    var objDown=(i==3)?{boxObj:{value:0}}:this.stage[i+1][j];
                    if(obj.boxObj.value==objLeft.boxObj.value
                        ||obj.boxObj.value==objDown.boxObj.value
                        ||obj.boxObj.value==objRight.boxObj.value
                        ||obj.boxObj.value==objUp.boxObj.value){
                        return false
                    }
                }
            }
            return true;
        }
        return false;
    },
    gameOver:function(){
        alert('GAVE OVER!');
    },
    moveTo :function (obj1, obj2) {
            obj2.boxObj = obj1.boxObj;
            obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
//            obj1.boxObj.domObj.parentNode.removeChild(obj1.boxObj.domObj);
            obj1.boxObj = null;
        },
    addTo : function (obj1, obj2) {
            obj2.boxObj.domObj.parentNode.removeChild(obj2.boxObj.domObj);
            obj2.boxObj = obj1.boxObj;
            obj1.boxObj = null;
            obj2.boxObj.value = obj2.boxObj.value * 2;
            obj2.boxObj.domObj.className = 'row' + obj2.position[0] + ' ' + 'cell' + obj2.position[1] + ' ' + 'num' + obj2.boxObj.value;
            obj2.boxObj.domObj.innerText = obj2.boxObj.value;
            obj2.boxObj.domObj.textContent = obj2.boxObj.value;
            this.points.score+=obj2.boxObj.value;
        var scoreBar= document.getElementById('score');
        scoreBar.innerText=this.points.score;
        scoreBar.textContent=this.points.score;
        return obj2.boxObj.value;


    },
    clear:function(x,y){
        var can=0;
      for(var i=0;i<4;i++){
          var fst=null;
          var fstEmpty=null;
          for(var j=0;j<4;j++){
              var objInThisWay=null;
              switch (""+x+y){
                  case '00': objInThisWay=this.stage[i][j];break;
                  case '10':objInThisWay=this.stage[j][i];break;
                  case '11':objInThisWay=this.stage[3-j][i];break;
                  case '01':objInThisWay=this.stage[i][3-j];break;
              }
              if(objInThisWay.boxObj!=null){
                 if(fstEmpty){
                   this.moveTo(objInThisWay,fstEmpty)
                    fstEmpty=null;
                    j=0;
                     can=1;
                 }
              }else if(!fstEmpty){
                   fstEmpty=objInThisWay;
              }
          }
      }
        return can;
    },
    