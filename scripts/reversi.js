let currentColorPlayer;
const board = [];
for (let i = 1; i <= 8; i++)
  board[i] = [];
let score_white=2;
let score_black=2;
let legal_move;

function drawBoard() {
  let boardBody = document.getElementById("board");
  let tbl = document.createElement("table");
  tbl.id="table";
  for (let i = 1; i <= 8; i++) {
    let row = document.createElement("tr");
    for (let j = 1; j <= 8; j++) { 
      board[i][j]= document.createElement("td");
      board[i][j].dataset.i = i;
      board[i][j].dataset.j = j;
      board[i][j].value=0;
      board[i][j].addEventListener("click",doGameMove);
      row.appendChild(board[i][j]);
    }
    tbl.appendChild(row);
  }
  boardBody.appendChild(tbl);
  setBeginningSoldier();
  document.getElementById("namePlayer1").innerHTML=JSON.parse(localStorage.getItem("currentBlackPlayer"));
  document.getElementById("namePlayer2").innerHTML=JSON.parse(localStorage.getItem("currentWhitePlayer"));
  showScore();
}
drawBoard();

function setBeginningSoldier(){
  //set two white soldiers
  currentColorPlayer = true;
  setSoldier(board[4][5]);
  setSoldier(board[5][4]);
  //set two black soldiers
  currentColorPlayer = false;
  setSoldier(board[4][4]);
  setSoldier(board[5][5]);
  //first player is always the black
  switchPlayersDisplay();

}

function doGameMove(event){
  let cell=event.target;
  legal_move=false;
  if(cell.value===0){
    setSoldier(cell);
    checkAllDirections(cell);
    if (legal_move)
      upScore();
    else
      removeSoldier(cell);
    showScore();
    if(score_white+score_black==64)
      winner();
  }
}

function setSoldier(cell){
  let soldier=document.createElement("div");
  soldier.id="soldier";
  if(currentColorPlayer)
  {
    cell.value=true;
    soldier.style.backgroundColor="white";
  }
  else
  {
    cell.value=false;
    soldier.style.backgroundColor="black";
  }
  cell.appendChild(soldier);
}

//did not a leagal move 
function removeSoldier(cell){
  cell.removeChild(cell.lastElementChild);
  cell.value=0;
}

//have no leagal move so switch to other player
function switchToNextPlayer(){
  currentColorPlayer=!currentColorPlayer;
  switchPlayersDisplay();
}

function upScore(){
  if(currentColorPlayer)
    score_white++;
  else
    score_black++;
  currentColorPlayer=!currentColorPlayer;
  switchPlayersDisplay();
}

function switchPlayersDisplay(){
  if(currentColorPlayer){
    document.getElementById("whitePlayer").style.borderColor="green";
    document.getElementById("blackPlayer").style.borderColor="black";
  }
  else{
    document.getElementById("whitePlayer").style.borderColor="white";
    document.getElementById("blackPlayer").style.borderColor="green";
  }
}

function checkAllDirections(cell){
  let rowNum = Number(cell.dataset.i);
  let colNum = Number(cell.dataset.j);
  let val = cell.value;
  up(rowNum, colNum, val);
  down(rowNum, colNum, val);
  right(rowNum, colNum, val);
  left(rowNum, colNum, val);
  diagonal_right_down(rowNum, colNum, val);
  diagonal_left_up(rowNum, colNum, val);
  diagonal_left_down(rowNum, colNum, val);
  diagonal_right_up(rowNum, colNum, val);
}

function left(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for(j++; j < 9 && board[i][j].value!== 0; j++){
    if(board[i][j].value===val){
        for(let m=j-1;m>colNum;m--)
          turnOver(i,m);
        return;
     }
  }
}
  

function up(rowNum, colNum, val){   
  let i=rowNum;
  let j=colNum;
  for(i++; i < 9 && board[i][j].value!==0; i++){
    if(board[i][j].value===val){
      for(let m=i-1; m>rowNum; m--)
          turnOver(m,j);
        return;
      }
}
}

  function down(rowNum, colNum, val){
    let i=rowNum;
    let j=colNum;
    for(i--; i > 0 && board[i][j].value!==0; i--){
      if(board[i][j].value===val){
        for(let m=i+1; m<rowNum; m++)
            turnOver(m,j);
          return;
        }
  }
}

function right(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for(j--;j > 0 && board[i][j].value!==0; j--){
    if(board[i][j].value===val){
      for(let m=j+1; m<colNum; m++)
        turnOver(i,m);
      return;
      }
  }
}

function diagonal_right_down(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for( i--,j--; j>0 && i>0 && board[i][j].value!==0; i--,j--){
    if(board[i][j].value===val){
      for(let m=i+1,n=j+1; m<rowNum; m++,n++)
          turnOver(m,n);
      return;
    }
  }
}

function diagonal_left_up(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for(i++,j++; j < 9 && i < 9 && board[i][j].value!==0; i++,j++){
    if(board[i][j].value===val){
      for(let m=i-1,n=j-1; m>rowNum; m--,n--)
        turnOver(m,n);
      return;
    }
  }
}

function diagonal_left_down(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for( i++,j--; j>0 && i<9 && board[i][j].value!==0; i++,j--){
    if(board[i][j].value===val){
      for(let m=i-1,n=j+1; m>rowNum; m--,n++)
        turnOver(m,n);
      return;
    }
  }
}

function diagonal_right_up(rowNum, colNum, val){
  let i=rowNum;
  let j=colNum;
  for(i--,j++; j < 9 && i > 0 && board[i][j].value!==0; i--,j++){
    if(board[i][j].value===val){
      for(let m=i+1,n=j-1; m<rowNum; m++,n--)
        turnOver(m,n);
      return;
    }
  }
}

function turnOver(i,j){
  legal_move=true;
  const soldier = board[i][j].children[0];
  board[i][j].value=!board[i][j].value;
  if(board[i][j].value){
    soldier.style.backgroundColor="white";
    score_white++;
    score_black--;
  }
  else{
    soldier.style.backgroundColor="black";
    score_black++;
    score_white--;
  }
}

function showScore(){
  document.getElementById("pointPlayer1").innerHTML=score_black;
  document.getElementById("pointPlayer2").innerHTML=score_white;
}

function winner(){
  let claping= document.getElementById("myAudio"); 
  claping.play(); 
  document.getElementById("winner").style.display="block";
  if(score_black>score_white){
    document.getElementById("winnerName").innerHTML=JSON.parse(localStorage.getItem("currentBlackPlayer"))+" you won!!!";
    return
  }
  if(score_black<score_white){
    document.getElementById("winnerName").innerHTML=JSON.parse(localStorage.getItem("currentWhitePlayer"))+" you won!!!";
    return
  }
  document.getElementById("winnerName").innerHTML="you both won!!!";
}


function newGame(){
  location.reload();
}

function goHomePage(){
  self.location="games.html";
}

function logOut(){
  self.location="entrance.html";
  window.localStorage.removeItem("currentBlackPlayer");
  window.localStorage.removeItem("currentWhitePlayer");
}