// add javascript here
let level, answer, score, fullname;
let gametime;
let besttime = 1e9;
let start;
let timerinterval;
let totaltime=0;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", giveUpFn);
guess.addEventListener('keydown', function(event) {
  if (event.key == 'Enter') {
    event.preventDefault(); 
    makeGuess(); 
  }
});
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
    clearInterval(timerinterval);
    totaltime+=gametime;
    updateStatsTime();
    score=level;
    updateScore();
    reset();
}
function updateStatsTime(){
    if(gametime<besttime){
        document.getElementById("besttime").textContent = "Best Time: "+gametime.toFixed(3)+"s";
        besttime=gametime;
    }
    document.getElementById("totaltime").textContent = "Total Time: "+totaltime.toFixed(3)+"s";
    wins = scoreArr.length;
    document.getElementById("avgtime").textContent = "Average Time: "+(totaltime/wins).toFixed(3)+"s";
}

function play(){
    if(fullname==null){
        msg.textContent = "Please set your name (first and last)";
        return;
    }
    start = new Date().getTime();
    score=0;
    clearInterval(timerinterval);
    timerinterval = setInterval(updateTimer, 10);
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
function updateTimer(){
    gametime = (new Date().getTime() - start)/1000;
    document.getElementById("timer").textContent = "Time: "+gametime.toFixed(3)+"s";
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)){
          msg.textContent = "Enter a VALID #1-"+level;
          return;
    }
    score++;
    if(userGuess>answer){
        if(Math.abs(userGuess-answer)<=3){
           msg.textContent = "Too high, try again (you're hot)";
        }
        else if(Math.abs(userGuess-answer)<=8){
           msg.textContent = "Too high, try again (you're warm)";
        }
        else if(Math.abs(userguess-answer<=20)){
            msg.textContent = "Too high, try again (you're cold)";
        }
        else{
        msg.textContent = "Too high, try again (you're ice cold!)";
        } 
    }
    else if(userGuess<answer){
        if(Math.abs(userGuess-answer)<=3){
           msg.textContent = "Too low, try again (you're hot)";
        }
        else if(Math.abs(userGuess-answer)<=8){
           msg.textContent = "Too low, try again (you're warm)";
        }
        else if(Math.abs(userguess-answer<=20)){
            msg.textContent = "Too low, try again (you're cold)";
        }
        else{
        msg.textContent = "Too low, try again (you're ice cold!)";
        } 
    }
    else{
        clearInterval(timerinterval);
        totaltime+=gametime;
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
        updateStatsTime();
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
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = months[d.getMonth()];
    let dayofweek = days[d.getDay()];
    let day = d.getDate();
    let year = d.getFullYear();
    let time = d.toLocaleTimeString();
    let suf;
    if(day==1 || day==21 || day==31){
         suf = "st";
    }
    else if(day==2 || day == 22){
        suf = "nd";
    }
    else if(day == 3 || day == 23){
        suf = "rd";
    }
    else{
        suf="th";
    }
    dates.textContent = dayofweek+", "+month+" "+day+suf+" "+year+", "+time;
}

