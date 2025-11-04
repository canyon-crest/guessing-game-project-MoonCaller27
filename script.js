// add javascript here
let level, answer, score, fullname;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", giveUpFn);
let timers = setInterval(time, 1000);
const dates = document.getElementById("dates");
time();
nameBtn.addEventListener("click", names);
function names(){
    let name = document.getElementById("name").value;
    firstlast = name.split(" ");
    firstlast[0] = firstlast[0].toLowerCase();
    firstlast[1] = firstlast[1].toLowerCase();
    firstlast[0] = firstlast[0].charAt(0).toUpperCase() + firstlast[0].slice(1);
    firstlast[1] = firstlast[1].charAt(0).toUpperCase() + firstlast[1].slice(1);
    fullname = firstlast.join(" ");
    document.getElementById("welcome").textContent = "Welcome "+fullname+"!";
}
function giveUpFn(){
    msg.textContent = "Why did you give up? bruh";
    score=level;
    updateScore();
    reset();
}
function play(){
    score=0;
    playBtn.disabled=true;
    guessBtn.disabled=false;
    guess.disabled=false;
    giveUp.disabled=false;
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled=true;
    }
    msg.textContent = "Guess a number from 1-"+level;
    answer = Math.floor(Math.random()*level)+1;
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)){
          msg.textContent = "Enter a VALID #1-"+level;
          return;
    }
    score++;
    if(userGuess>answer){
        msg.textContent = "Too high, try again";
    }
    else if(userGuess<answer){
        msg.textContent = "Too low, try again";
    }
    else{
        if(score<4){
            msg.textContent = fullname+", you got it! It took you "+score+" tries. Excellent score! Press play to play again";
        }
        else if(score<9){
            msg.textContent = fullname+", you got it! It took you "+score+" tries. Pretty decent, eh? Press play to play again";
        }
        else{
            msg.textContent = fullname+", you got it! It took you "+score+" tries. Quite bad, do better next time. Press play to play again";
        }
        updateScore();
        reset();
    }
}
function reset(){
    guessBtn.disabled = true;
    guess.disabled=true;
    guess.value="";
    guess.placeholder="";
    playBtn.disabled=false;
    giveUp.disabled=true;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled=false;
    }    
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: "+scoreArr.length;
    let sum=0;
    for(let i=0; i<scoreArr.length; i++){
        sum+=scoreArr[i];
        if(i<lb.length){
            if(fullname!=null){
                lb[i].textContent = fullname+" - "+scoreArr[i];
            }
            else{
                lb[i].textContent = scoreArr[i];
            }
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: "+avg.toFixed(2);
}
function time(){
    let d = new Date();
    dates.textContent = d;
}

