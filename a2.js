const QUIZSOURCE = [
    {quiz:"What is the Answer for 5x5?", 
    answer:[
        {shown:"25", result: true},
        {shown:"55", result: false},
        {shown:"35", result: false},
        {shown:"none", result: false}
    ]  },
    {quiz:"Which one is float value?",
    answer:[
        {shown:"2.5", result: true},
        {shown:"123", result: false},
        {shown:"-210", result: false},
        {shown:"float", result: false}
    ]  },
    {quiz:"What is the correct age to get license?", 
    answer:[
        {shown:"18", result: true},
        {shown:"15", result: false},
        {shown:"21", result: false},
        {shown:"55", result: false}
    ]  },
    {quiz:"Which one is java keyword?",
    answer:[
        {shown:"super", result: true},
        {shown:"use_key", result: false},
        {shown:"press_key", result: false},
        {shown:"javaLrst", result: false}
    ] },
    {quiz:"What will store in js variable if you're not declared?",
    answer:[
        {shown:"undefined", result: true},
        {shown:"value", result: false},
        {shown:"error", result: false},
        {shown:"none", result: false}
    ]  }
    ];
    
    
    // used variables :-
    let noContent = 5;
    const quizCount = noContent;
    let score, choices, user, Answer, noOfQuizOver;
    let shuffledData = [];
    
    // starting the game :-
    function startGame(){
        _("audioStart").play();
        opacity("intro", 0);
        setTimeout(display, 100, "intro", "none");
        setTimeout(display, 10, "workspace","flex");
        setTimeout(opacity, 20, "workspace", 1);
        shuffledData = shuffle(QUIZSOURCE);
        noOfQuizOver = 1;
        score = 0;
        setQuiz();
        //console.log("Next Round ..!")
    }
    
    // new Quiz :-
    function newGame(){
        // console.log("New Game..!");
        _("audioNewGame").play();
        setTimeout(function(){location.reload(true);}, 1000);
    }
    
    // set new Quiz :-
    function setQuiz(){
        user = "User";
        Answer = "Answer";
        if (noOfQuizOver>5){
            if (noOfQuizOver>11){completeQuiz();}
        }
        else{
            _("attendQuiz").innerText = noOfQuizOver;
            _("noOfQuizes").innerText = noContent;
            choices = shuffle(shuffledData[noOfQuizOver-1].answer);
            _("question").innerText = shuffledData[noOfQuizOver-1].quiz;
            insertChoices();
        }
        noOfQuizOver++;
    }
    
    // set choices :-
    function insertChoices(){
        _("options").innerHTML = "";
        for (let i = 1; i <= 4; i++){
            if (choices[i-1].result==true){Answer = choices[i-1].shown}
            _("options").innerHTML += '<button class="boxes" onclick="selected(this)">'+i+') '+choices[i-1].shown+'</button>';
        }
    }
    
    // if answered (submitted the answer for each quiz)
    function answered(){
        _("audioSubmit").play();
        if (user == Answer){score += 1;}
        setQuiz();
        /*console.log("submitted!");
        console.log(Answer);*/
    }
    
    // if enter key pressed :-
    function enter(e){
     let key=e.keyCode || e.which;
     if (noOfQuizOver!=undefined && noOfQuizOver<=12){
         if (key==13){answered();}
     }
    }
    
    // if a choice selected :-
    function selected(ele){
        user = (ele.innerText).slice(3);
    }
    
    // completing the quiz :-
    function completeQuiz(){
        _("audioNewGame").play();
        if (score<4){
            _("congrats").innerText = "Nice try! ";
        }
        else if (score>7){
            _("congrats").innerText = "Awesome! ";
        }
        _("scores").innerText = score+" / "+noContent;
        opacity("workspace", 0);
        display("workspace", "none");
        display("restartGame", "flex");
        setTimeout(opacity,50,"restartGame",1);
        setTimeout(function(){
            _("keep").innerText = "Click to new Quiz... ";
        }, 2000);
    }
    
    // shuffle :-
    function shuffle(data){
      let shuffled = []; let temp = []; 
      let l = (data.length)-1; let i = 0;
      while (shuffled.length<=l){
        let n = rand(l);
        if (!temp.includes(n)){shuffled[i] = data[n]; i++}
        temp.push(n);
      }
      if (shuffled==data) {shuffle(data)}
      return shuffled;
    }
    
    // helper functions
    function display(ele, value){_(ele).style.display = value;}
    function opacity(ele, n){_(ele).style.opacity = n;}
    function _(name){return document.getElementById(name);}
    function rand(range){return Math.round(Math.random() * range)}
