    document.getElementById('alertSuccsess').style.display = 'none';
    document.getElementById('alertWarning').style.display = 'none';    
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
      this.gameChain =[];
    }

    var gameData = new GameData(numberGame);

    var gameHistory = [];

    var tableLogCurrentGame = createTableResults()
    document.body.appendChild(tableLogCurrentGame);


    function checkNumber(){
      var userNumber = +document.forms.game.userNumber.value;
      var alertSuccsess = document.getElementById('alertSuccsess');
      var alertWarning = document.getElementById('alertWarning');      
      var error = false;
      var message;
      if (gameData.lostCount > 0){
        if (userNumber == gameData.computerNumber){
          gameData.lostCount--;
          gameData.win = true;
          message = `Поздравляем, вы угадали. Было загадано число ${gameData.computerNumber}.`;
          writeLogCurrentGame(gameData.numGame,gameData.counter,message);
          gameHistory.push({
                            gameNumber: gameData.numGame,
                            gameResult: gameData.win
                          });  
        }else if(userNumber > gameData.computerNumber){
          gameData.lostCount--;
          error = true;
          message = `Число ${userNumber} больше загаданного. Осталось ${gameData.lostCount} попыток.`;
          writeLogCurrentGame(gameData.numGame,gameData.counter,message);
        }else{
          gameData.lostCount--;
          error = true;
          message = `Число ${userNumber} меньше загаданного. Осталось ${gameData.lostCount} попыток.`;
          writeLogCurrentGame(gameData.numGame,gameData.counter,message);
        }

        if(!error){
          alertSuccsess.innerText = message;
          alertSuccsess.style.display = 'block';
          alertWarning.style.display = 'none';          
          if(alertSuccsess.style.display = 'block'){
            confirm('Вы угадали, хотите продолжить?');
            gameData = new GameData(numberGame);
          }
        }else{
          alertWarning.innerText = message;
          alertWarning.style.display = 'block';
          alertSuccsess.style.display = 'none';          
        }
        gameData.counter++;
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