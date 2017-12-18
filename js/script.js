/*JS game logic*/
var numberGame = 1;

function GameData(numGame){
  this.numGame = numGame;
  this.min = 0;
  this.max = 1000;
  this.count = 5;
  this.lostCount = 5;
  this.counter = 1;
  this.computerNumber = Math.round(Math.random()*1000);
  this.win = false;
  this.less = function(userNumber){
                          this.lostCount--;
                          message = `Число ${userNumber} меньше загаданного. Осталось ${this.lostCount} попыток.`;
                          writeLogCurrentGame(this.numGame,this.counter,message);
                          return message;
                        };
  this.more = function (userNumber) {
                          this.lostCount--;                         
                          message = `Число ${userNumber} больше загаданного. Осталось ${this.lostCount} попыток.`;
                          writeLogCurrentGame(this.numGame,this.counter,message);
                          return message;
                      }
  this.equal = function(){
                          this.lostCount--;
                          this.win = true;
                          message = `Поздравляем, вы угадали. Было загадано число ${this.computerNumber}.`;
                          writeLogCurrentGame(this.numGame,this.counter,message);
                          gameHistory.push({
                                            gameNumber: this.numGame,
                                            gameResult: this.win
                                          });      
                          return message;
                          };                      
  this.gameChain =[];
}
/*contain history of all games*/
var gameData = new GameData(numberGame);
var gameHistory = [];

var tableLogCurrentGame = createTableResults()
document.body.appendChild(tableLogCurrentGame);
var alertSuccsess = document.getElementById('alertSuccsess');
var alertWarning = document.getElementById('alertWarning');  


function checkNumber(){
  var userNumber = +document.forms.game.userNumber.value;    
  var error = false;
  var message;
  if (gameData.lostCount > 0){
    if (userNumber == gameData.computerNumber){
      message = gameData.equal();
    }else if(userNumber > gameData.computerNumber){
      message = gameData.more(userNumber);
      error = true;
    }else{
      message = gameData.less(userNumber);
      error = true;
    }
    if(!error){
      alertSuccsess.innerText = message;
      alertSuccsess.style.display = 'block';
      alertWarning.style.display = 'none';          
      numberGame++;
      confirm('Вы угадали, хотите продолжить?');
      gameData = new GameData(numberGame);
    }else{
      alertWarning.innerText = message;
      alertWarning.style.display = 'block';
      alertSuccsess.style.display = 'none';  
      gameData.counter++;        
    }
  }else{
    gameHistory.push({
                        gameNumber: gameData.numGame,
                        gameResult: gameData.win
                      });  
    numberGame++;
    if(confirm('Хотите продолжить?')){
      gameData = new GameData(numberGame);
    }
  }
}

function writeLogCurrentGame(gameNumber,n,text){
  var tr = document.createElement('tr');
  var tdgameNumber = document.createElement('td');
  tdgameNumber.innerHTML = gameNumber;
  var tdn = document.createElement('td');
  tdn.innerHTML = n;
  var tdMessage = document.createElement('td');      
  tdMessage.innerHTML = text;
  tr.appendChild(tdgameNumber);      
  tr.appendChild(tdn);
  tr.appendChild(tdMessage);
  tableLogCurrentGame.appendChild(tr);  
}


function createTableResults(){
  var tableRes =document.createElement('table');
  tableRes.setAttribute('border',1);
  tableRes.style.marginTop = '20px';
  var trHead =  document.createElement('tr');
  var thgameNumber = document.createElement('th');
  thgameNumber.innerHTML = 'Игра №';      
  var thn = document.createElement('th');
  thn.innerHTML = 'Попытка №';
  var thInfo = document.createElement('th');
  thInfo.innerHTML = 'Было введено число';
  trHead.appendChild(thgameNumber);
  trHead.appendChild(thn);
  trHead.appendChild(thInfo);
  tableRes.appendChild(trHead);
  return tableRes;
}