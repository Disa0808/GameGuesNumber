/*JS game logic*/

var modesActions = {
  '1':showRandomEl,
  '2':showRandomEl,
  '3':showEl
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
                          scores++;
                          scoresLabel.innerHTML = `У вас ${scores} очков.`;  
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
var scores = 0;
var scoresLabel = document.getElementById('scores');
var recycle = [];



fieldGame.style.display = 'none';
tableLogCurrentGame.style.display = 'none';
document.body.appendChild(tableLogCurrentGame);
roundLabel.innerText = `Раунд ${numberGame} `;
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
  startActions[curMode]();

}

 
var startActions ={
  '1': function(){
    document.getElementById('giftMode1').style.display = '';
    document.getElementById('giftMode2').style.display = 'none';
    document.getElementById('giftMode3').style.display = 'none';     
  },
  '2':function(){
    document.getElementById('giftMode1').style.display = 'none';
    document.getElementById('giftMode2').style.display = '';
    document.getElementById('giftMode3').style.display = 'none';     
    scoresLabel.innerHTML = `У вас ${scores} очк${getEndWord(scores)}.`;
    scoresLabel.style.display = 'block';
  },
  '3':function(){
    document.getElementById('giftMode1').style.display = 'none';
    document.getElementById('giftMode2').style.display = 'none';
    document.getElementById('giftMode3').style.display = '';  
    scoresLabel.innerHTML = `У вас ${scores} очк${getEndWord(scores)}.`;
    scoresLabel.style.display = 'block';    

    var squaresMode3 = document.querySelectorAll('div.mode3 .fill3'); 
    for (var i = 0; i < squaresMode3.length; i++){
      squaresMode3[i].innerHTML = squaresMode3[i].getAttribute('price') + ' очк'+ getEndWord(+squaresMode3[i].getAttribute('price'));
    }  

  }
}

function giftLogic(gift){
  var price = +gift.getAttribute('price');
  if (scores >= price) {
    scores-=price;
    scoresLabel.innerHTML = `У вас ${scores} очк${getEndWord(scores)}.`;  
    recycle.push(gift);
    swal({
    title: 'Поздравляем!',
    text: `Вы получаете  ${dictionaryGifts[gift.getAttribute('id')]}`,
    imageUrl: gift.getAttribute('lnk'),
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    animation: false
})}else{ 
  swal(
      'Ууупс...',
      'У вас не хватает очков!',
      'error'
    );
}
}

function showEl(el){
  if (el) {
  var price = el.getAttribute('price');
  if (scores >= price) {
    if (el.classList.contains('fill3')){
      scores-=price;
      scoresLabel.innerHTML = `У вас ${scores} очк${getEndWord(scores)}.`; 
      el.classList.remove('fill3');
      el.innerHTML = '';
    }
}else{ 
  swal(
        'Ууупс...',
        'У вас не хватает очков!',
        'error'
      );
}
}
}


function getEndWord(num){
  if(num == 1){
    return 'о';
  }else if(num == 0){
    return 'ов';
  }
  return 'а';
}

var dictionaryGifts = {
  'iphone3': 'Iphone3gs',
  'nokia3310': 'стенобитное орудие',
  'ticket': 'билет в прекрасное далёко',
  'beer': 'немного удовольствия',
  'vodka': 'много удовольствия',
  'samsung': 'Samsung galaxy S8+',
  'iphonex': 'Iphone X',
  'astonmartin': 'новенький Aston Martin DB11',
  'ladaxray': 'чуто на колесах'
};

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