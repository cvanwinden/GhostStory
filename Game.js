//Ghost Story Game
module.exports=class GhostStory{
    //construct the elements you need to run the game.
    constructor(){
        this.sChoice="start";
        this.sCostume="";
        this.nCandy=0;
        this.nRandom=Math.ceil(Math.random()*20);
        this.nBully=0;
        this.nCountGuesses=1;
        this.aCostume=["Mummy","Pumpkin","Ghost","Werewolf"];
        this.aRiddleAnswer=["santa claus","santa","funny bone","shadow","the web is the trick and you are the treat"];
        this.bNumberChosen=false;
    }
    choice(sUserInput){
        let sReply="";
        //switch the replies based on the user choice
        switch(this.sChoice){
            case "start":
                sReply="Welcome to Choose Your Own Adventure - Halloween Edition. Choose whether you want a TRICK OR TREAT"
                this.sChoice="trick/treat";
                break;
            
            case "trick/treat":
                if(sUserInput.toLowerCase().match("trick")){
                    sReply="Nothing scares you so you decide to go into the creepy abandoned house. You enter. Which way do you go? A) 2nd Floor B)Basement C) Backyard";
                    this.sChoice="direction";
                }else if(sUserInput.toLowerCase().match("treat")){
                    sReply="Pick a costume to go trick or treating in. A) Mummy B) Werewolf C) Ghost";
                    this.sChoice="costume";
                }
                break;

            case "costume":
                if(sUserInput.toLowerCase().match("a")||sUserInput.toLowerCase().match("mummy")){
                    this.sCostume="Mummy";
                    sReply="How many houses are you going to trick or treat? Pick a number between 1 and 100";
                } else if (sUserInput.toLowerCase().match("b")||sUserInput.toLowerCase().match("werewolf")){
                    this.sCostume="Werewolf";
                    sReply="How many houses are you going to trick or treat? Pick a number between 1 and 100";
                } else if (sUserInput.toLowerCase().match("c")||sUserInput.toLowerCase().match("ghost")){
                    this.sCostume="Ghost";
                    sReply="How many houses are you going to trick or treat? Pick a number between 1 and 100";
                } else{
                    this.sCostume="Pumpkin";
                    sReply="You didn't pick from the options. You're stuck being a Pumpkin. How many houses are you going to trick or treat? Pick a number between 1 and 100";
                }
                this.sChoice="candy";
                break;

            case "candy":
                this.nCandy=this.houseNum(sUserInput);
                if(isNaN(this.nCandy)){
                    sReply=this.nCandy;
                } else{
                    sReply="You start heading home with your "+ this.nCandy+" pieces of Candy. A bully appears what do you do? A) Ignore them B) Run";
                    this.sChoice="bully";
                }
                break;

            case "bully":
                if(sUserInput.toLowerCase().match("a")||sUserInput.toLowerCase().match("ignore")){
                    sReply="You can't ignore me! Guess a number between 1 and 20 to pass through";
                    this.sChoice="num";
                } else{
                    this.sChoice="direction";
                    sReply="You run to the creepy abandoned house and enter. Which way do you go? A) 2nd Floor B)Basement C) Backyard";
                }
                break;

            case "num":
                if(!this.bNumberChosen){
                    this.nBully=this.nRandom;
                    console.log(this.nBully);
                    this.bNumberChosen=true;
                }
                if(sUserInput<0||sUserInput>20){
                    sReply=this.loseCandy();
                }
                else if(sUserInput==this.nBully){
                    sReply="You're lucky. Go home";
                    this.sChoice="end";
                } else if (this.nCountGuesses<3){
                    sReply="Wrong. Try again";
                }
                else{
                    sReply=this.loseCandy();
                    this.sChoice="end";
                }
                this.nCountGuesses+=1;
                break;

            case "direction":
                if(sUserInput.toLowerCase().match("a")||sUserInput.toLowerCase().match("2nd floor")){
                    sReply="You head upstairs and get scared by a creepy noise. A ladder drops down from the attic. You climb up it and find skeleton sitting on the windowsill. You're not sure if it's real. What do you do? A) Touch it B) Talk to it.";
                    this.sChoice="2nd floor";
                } else if(sUserInput.toLowerCase().match("b")||sUserInput.toLowerCase().match("basement")){
                    sReply="You go down to the dark basement and hear a loud thundering storm outside. Suddenly you hear a voice saying 'What did the spider say to the fly on Halloween?";
                    this.sChoice="witch";
                } else {
                    sReply="You go out in the backyard and see a big graveyard. Do you A) walk around in the graveyard or B) decide to go trick or treating instead?"
                    this.sChoice="backyard";
                }
                break;

            case "2nd floor":
                if(sUserInput.toLowerCase().match("a")||sUserInput.toLowerCase().match("touch it")||sUserInput.toLowerCase().match("touch")){
                    sReply="Luckily the skeleton was just a fake Halloween decoration. You see some writing on the wall saying 'Each morning I appear to lie at your feet. All day I will follow no matter how fast you run, yet I nearly perish in the midday sun. What am I";
                } else{
                    sReply="You hear a voice say 'Hello, here's a riddle for you. What do you call a skeleton that makes you laugh and giggle?";
                }
                this.sChoice="witch";
                break;
            
            case "backyard":
                if(sUserInput.toLowerCase().match("a")||sUserInput.toLowerCase().match("walk")){
                    sReply="You walk around the graveyard and hear a voice coming from one of the tombs saying 'Who is old, has a white beard and is forgotten on Halloween?";
                    this.sChoice="witch";
                }else{
                    sReply="You get ready to go trick or treating but first you need to pick a costume. Are you going as a A) Mummy B) Werewolf C) Ghost?";
                    this.sChoice="costume";
                }
                break;

            //end the game 
            case "witch":
                if(this.aRiddleAnswer.includes(sUserInput.toLowerCase())){
                    sReply="Congratulations. You got the riddle answer right. You are free to go home.";
                }
                else {
                    if(this.aCostume.includes(this.sCostume)){
                        sReply="You hear a loud cackle as a witch flies around you. 'Wrong answer'. She puts a spell on you and you're stuck haunting the house as a "+this.sCostume+" with her forever. Game Over";
                    }else{
                        sReply="You hear a loud cackle as a witch flies around you. 'Wrong answer'. She puts a spell on you and you're stuck haunting the house with her forever. Game Over";
                    }
                }
                break;

            default:
                break;
        }
        return([sReply]);
    }
    houseNum(houses){
        //see if the user picked a number and give them a random amount of candy based on the number they chose
        let nRange=0;
        if(isNaN(houses)){
            return("Please pick a number");
        } else if(houses<0||houses>100){
            return("Please pick a number between 1 an 100");
        }
        else if(houses<=20){
            nRange=30;
        } else if (houses<=40){
            nRange=50;
        } else if (houses<=60){
            nRange=75;
        } else if (houses<=80){
            nRange=100;
        } else{
            nRange=150;
        }
        let numCandy=Math.ceil(Math.random()*nRange);
        return (numCandy);
    }
    loseCandy(){
        //calculate how much candy the user will lose
        let nCurrentCandy=this.nCandy;
        let nCandyLost=Math.ceil(Math.random()*nCurrentCandy);
        this.nCandy=this.nCandy-nCandyLost;
        return ("You lost " + nCandyLost+" pieces of candy.You head home with "+this.nCandy +" candies. Game over");
    }
}