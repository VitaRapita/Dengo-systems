var gameBox = document.getElementById('myGame');
for (var i=0; i<9; i++){
var input = document.createElement('input');
input.setAttribute('type', 'button');
input.setAttribute('id', 'btn');
input.onclick = onClick;
gameBox.appendChild(input);
}


var resetBtn = document.createElement('input');
resetBtn.setAttribute('type', 'button');
resetBtn.setAttribute('id', 'resetButton');
resetBtn.setAttribute('value', 'New Game');
resetBtn.onclick = reset;
document.body.insertBefore(resetBtn, gameBox);


var playerIndex = 1, 
players = ['O', 'X'], 
resultValues = [],
winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function isWinning(value)
{
  var combination, i, j;

  for (i = 0; i < winningCombinations.length; i++)
  {
    combination = winningCombinations[i];

    for (j = 0; j < combination.length; j++)
    {
      if (resultValues[combination[j]] != value) break;
    }

    if (j == 3) return true;
  }

  return false;
}

function reset()
{
  var i, 
  inputs = gameBox.getElementsByTagName('input');

  // Reset game cells
  for (i = 0; i < inputs.length; i++)
  {
    inputs[i].disabled = inputs[i].value = '';
  }

  playerIndex = 1;
  resultValues = [];
}

function resetIfWinnerFound()
{
  var i, 
  inputs = gameBox.getElementsByTagName('input');

  // Map cell values       
  for (i = 0; i < inputs.length; i++)
  {
    resultValues[i] = inputs[i].value;
  }

  // Check players
  for (i = 0; i < players.length; i++)
  {
    if (isWinning(players[i]))
    {
      alert('The winner is ' + players[i] + '!');
      reset();
      return;
    }
  }
}


function onClick()
{
  this.disabled = "disabled";
  this.value = players[playerIndex];

  playerIndex == 1 ? playerIndex-- : playerIndex++;

  resetIfWinnerFound();
};