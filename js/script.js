/*JS game logic*/

var modesActions = {
  '1':showRandomEl,
  '2':showRandomEl,
  '3':showRandomEl
};

function GameData(numGame){
  this.numGame = numGame;
  this.min = 0;
  this.max = 1000;
  this.count = 5;
  this.counter = 1;
  this.computerNumber = Math.round(Math.random()*1000);
  this.win = false;
  this.lowOrHi = function(userNumber){
                          if (!guessField.value){
                            message = 'Поле не должно быть пустым!!! Но пыпытку засчитываем :)';
                          }else if (userNumber < this.computerNumber){
                            message = `Число ${userNumber} меньше загаданного. Осталось ${this.count - this.counter} попыток.`;
                          }else{
                            message = `Число ${userNumber} больше загаданного. Осталось ${this.count - this.counter} попыток.`;
                          }
                          writeLogCurrentGame(this.numGame,this.counter,message);
                          return message;
                        };
  this.equal = function(){
                          this.win = true;
                          message = `Поздравляем, вы угадали. Было загадано число ${this.computerNumber}.`;
                          writeLogCurrentGame(this.numGame,this.counter,message);
                          modesActions[curMode]();  
                          return message;
                          };                      
  this.gameChain =[];
}
var numberGame = 1;
var gameData = new GameData(numberGame);
var curMode;
console.log(gameData.computerNumber);

/*contain history of all games*/
var gameHistory = [];
var fieldGame = document.getElementById('f1');
var tableLogCurrentGame = createTableResults()
var alert = document.getElementById('alert');
var guesses = document.getElementById('guesses');
var checkButton = document.getElementById('check');
var continueBtn = document.getElementById('continueBtn');
var guessField = document.getElementById('userNumberField');
var roundLabel = document.getElementById('round');
var mainMenu = document.getElementById('mainMenu');


fieldGame.style.display = 'none';
tableLogCurrentGame.style.display = 'none';
document.body.appendChild(tableLogCurrentGame);
roundLabel.innerText = `Раунд ${numberGame}`;
roundLabel.style.display = 'block';

function checkNumber(){
  var userNumber = +document.forms.game.userNumber.value;    
  var message;
  if (gameData.counter === 1) {
        guesses.innerHTML = 'Предыдущие значения: ';
      } 

  guesses.textContent += userNumber + ' ';

    if (userNumber == gameData.computerNumber){
      alert.innerHTML = gameData.equal();
      alert.classList.remove('alert-danger');
      alert.classList.add('alert-success');
      alert.style.display = 'block';
      setGameOver();     
    }else if( gameData.counter === gameData.count ){
      alert.classList.remove('alert-success');
      alert.classList.add('alert-danger');
      alert.innerHTML = 'Вы проиграли, попытки закончились!';
      alert.style.display = 'block';      
      setGameOver(); 
    }else{
      alert.innerHTML = gameData.lowOrHi(userNumber);
      alert.classList.remove('alert-success');
      alert.classList.add('alert-danger');
      alert.style.display = 'block';           

    }
    gameData.counter++;
    guessField.value = '';
}

function startNextGame(){
  checkButton.classList.remove('disabled');
  continueBtn.style.display = 'none';
  alert.style.display = 'none';
  numberGame++;
  roundLabel.innerText = `Раунд ${numberGame}`;
  gameData = new GameData(numberGame);

};

function setGameOver(){
  checkButton.classList.add('disabled');
  continueBtn.style.display = 'block';
  if (gameData.counter !== gameData.count) {
    alert.style.display = 'none';
  }
  guesses.textContent ='';
  gameHistory.push({
                  gameNumber: gameData.numGame,
                  gameResult: gameData.win,
                  cntTries  : gameData.counter 
                });    
};

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

function showRandomEl(){
  var elements = [].slice.call(document.getElementsByClassName('square'));
  var visibleDivs = elements.filter(function(item) {  
                                                      if (item.classList.contains('fill')){
                                                        return item;
                                                      }                                                      
                                                    }  
                                                  );
  if (visibleDivs.length > 1){
    visibleDivs[Math.round(Math.random()*(visibleDivs.length - 1))].classList.remove('fill');
    return true;
  }else{
    visibleDivs[Math.round(Math.random()*(visibleDivs.length - 1))].classList.remove('fill');
    swal({
        title: 'Поздравляем, вы победили! Наслаждайтесь котиком :)',
        text: 'Окно автоматически закроется через 5 секунд.',
        timer: 5000,
        onOpen: () => {
          swal.showLoading()
          }
        });
  }
}
  
function start(mode){
  mainMenu.style.display = 'none';
  tableLogCurrentGame.style.display = '';
  fieldGame.style.display = '';
  curMode = mode;
  mainMenu.classList.remove('btn-group-vertical');

}


function createTableResults(){
  var tableRes =document.createElement('table');
  tableRes.setAttribute('border',1);
  tableRes.style.margin = '20';
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