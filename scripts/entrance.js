let allPlayers=JSON.parse(localStorage.getItem("allPlayers"));

function log_in(event){
    event.preventDefault();
    let new_name1=document.getElementById("player#1").value;
    let new_name2=document.getElementById("player#2").value;
    let new_password=document.getElementById("password").value;
    if(allPlayers){
        let users=allPlayers.find(element=>(element.name1===new_name1 && element.name2===new_name2) || (element.name1===new_name2 && element.name2===new_name1));
        if(users){
            if(new_password!=users.password){
                alert("incorrect password please reenter your correct password or sign up again");
                document.getElementById("password").value=null;
                return;
            }
            startGame(new_name1,new_name2);
            return;
        }
    }
    alert("you are not an existing user please sign up");
}


function sign_up(event){
    event.preventDefault()
    let new_name1=document.getElementById("new_player#1").value;
    let new_name2=document.getElementById("new_player#2").value;
    let new_password=document.getElementById("new_password").value;
    let new_password_verification=document.getElementById("password_verification").value;
    if(allPlayers==null){
        allPlayers=new Array();
    }
    if(allPlayers.find(element=>(element.name1===new_name1 && element.name2===new_name2) || (element.name1===new_name2 && element.name2===new_name1))){
        alert("you are an existing user please log in");
        return;
    }
    if(!new_name1.localeCompare(new_name2)){
        alert("can not have two players with the same name!");
        return;
    }
    if(new_password!==new_password_verification){
        alert("please reenter your correct password!");
        document.getElementById("new_password").value=null;
        document.getElementById("password_verification").value=null;
        return;
    }
    let newPlayers = new Players(new_name1, new_name2,new_password);
    allPlayers.push(newPlayers);
    localStorage.setItem("allPlayers",JSON.stringify(allPlayers));
    startGame(new_name1,new_name2);
}


function startGame(blackPlayer,whitePlayer){
    localStorage.setItem("currentBlackPlayer",JSON.stringify(blackPlayer));
    localStorage.setItem("currentWhitePlayer",JSON.stringify(whitePlayer));
    self.location="games.html";
}


//displaying signup & login
function logIn_signUp(){
    let log_in=document.getElementById('logIn');
    let sign_up=document.getElementById('signUp');
    if(log_in.style.display=='block'){
        log_in.style.display='none';
        sign_up.style.display='block';
    }
    else{
        log_in.style.display='block';
        sign_up.style.display='none';
    }
}
logIn_signUp();