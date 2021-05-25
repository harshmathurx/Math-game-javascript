var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    if(playing == true){
        location.reload();
    }
    else{
        playing = true; 
        score = 0;
        document.getElementById('scorevalue').innerHTML=score;
        show('timeremaining');
        document.getElementById('startreset').innerHTML = "Reset Game";
        hide('gameover');
        //start countdown
        timeremaining = 60;
        startCountdown();
        generateQnA();
    }
}

for(i=1;i<5;i++){
    document.getElementById('box' + i ).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById('scorevalue').innerHTML = score;
                hide('wrong');
                show('correct');
                setTimeout(function(){
                    hide('correct');
                },1000);
    
                generateQnA();
            }
    
            else{
                hide('correct');
                show('wrong');
                setTimeout(function(){
                        hide('wong');
                    },1000);
            }
        }
    };
}

function startCountdown(){
    action = setInterval(function(){
        timeremaining  -= 1;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;

        if(timeremaining == 0){
            console.log("game over");
            stopCountdown();
            show('gameover');
            document.getElementById('gameover').innerHTML = "<p>Game Over</p> <p>Your score is " + score +".</p>";
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            document.getElementById('startreset').innerHTML="Start Game";
            playing = false;
        }
    },1000);
}

function stopCountdown(){
    clearInterval(action);

}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQnA(){
    var x = 1 + Math.round(Math.random() * 9);
    var y = 1 + Math.round(Math.random() * 9);
    correctAnswer = x*y;
    document.getElementById('question').innerHTML = x + "X" + y;

    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById('box' + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    for(i=1; i<5;i++){
        if(i != correctPosition){
            var wrongAnswer ;
            do{
                wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
            }while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById('box' + i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
        }
    }
}   

