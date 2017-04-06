$(document).ready(function(){



var myArray = ['Snake', 'Tunnel Snake', 'Chaos Snake', 'Solid Snake', 'Punished Snake', 'Old Snake',
               'Trouser Snake','Sneaky Snake','Naked Snake', 'Solidus Snake', 'Lesser Snake', 'Greater Snake',
               'Sea Snake', 'Scary Snake','Ghost Snake','Gentleman Snake','Barbados Snake','Cosmic Snake'];   

function MonsterM(name, hp, damage){
    this.name = myArray[Math.floor(Math.random()*myArray.length)];
    this.hp = Math.floor(Math.random()*11)+10;
    this.damage = Math.floor(Math.random()*6)+3;
}


var na = myArray[Math.floor(Math.random()*myArray.length)];
var hi = Math.floor(Math.random()*11)+5;
var da = Math.floor(Math.random()*6)+3;

var nMonster = new MonsterM(na,hi,da);


var Player = {
    dead : false,
    hp   : 70,
  damage : Math.floor(Math.random()*6)+5,
  prizes : 0,
  px : 1,
  py : 1,
  victory: false
};

var Hydra = {
    name   : "Hydra",
    hp     : 40,
    damage : Math.floor(Math.random()*3)+2
};

function PDealDamage(Damage,hp){
    
    document.getElementById("event").innerHTML += "Player deals " + Player.damage +" Damage to " + nMonster.name + "<br/>"; 
    nMonster.hp = nMonster.hp-Player.damage;
}

function PDealBossDamage(Damage,hp){
    
    document.write("Player deals " + Player.damage +" Damage to " + Hydra.name); 
    Hydra.hp = Hydra.hp-Player.damage;
    document.write("<br/>");
    document.write(Hydra.name+" has " + Hydra.hp + " HP left.");
    document.write("<br/>");
}

function HydraDamage(Damage,hp){

    document.write(Hydra.name + " deals " + Hydra.damage + " damage to player");
    Player.hp=Player.hp-Hydra.damage;
    document.write("<br/>");
    document.write("You have " + Player.hp + " hp left");
    document.write("<br/>");

}

function MDealDamage(Damage,hp){
    
    document.getElementById("event").innerHTML += nMonster.name+ " deals " + nMonster.damage + " damage to player<br/>";
    Player.hp=Player.hp-nMonster.damage;
}

function EmptyRoom(){
     document.getElementById("room").innerHTML = "You find and empty room and continue on your way <br/><br/>";
}

function PrizeRoom(){
    document.getElementById("room").innerHTML = "You find a room with a snake treasure in it and take it";  
    Player.prizes++;
    displaystatus();
}

function StartRoom(){
     document.getElementById("room").innerHTML = "You enter the Serpent King Dungeon, you must collect 2 prizes and <br/>defeat the Hydra to claim the lost treasures of the Serpent King! <br/><br/>"
}

function wall(){
    document.getElementById("room").innerHTML = "The entrance to the next room is blocked<br/>";
   
}

function BossRoom(){
    if(Player.prizes >= 2){
        document.getElementById("room").innerHTML = "You enter the final room and the Hydra is waiting for you";
        BossFight();
    }
    else{
        document.getElementById("room").innerHTML ="You don't have enough prizes and decide to leave";
    }
}

function BattleRite(){ 



while(Player.hp>0 && nMonster.hp>0){

    Player.damage   = Math.floor(Math.random()*6)+5;
    nMonster.damage = Math.floor(Math.random()*6)+3;


    PDealDamage(Player.damage,nMonster.hp);
    MDealDamage(nMonster.damage,Player.hp);

        if(Player.hp<=0){
            
            document.getElementById("event").innerHTML = "You died";
            Player.dead=false;
            deadchecker();
            break;
        }

        if(nMonster.hp<=0){
            var retry = confirm("Do you want to fight it again?");

            if (retry == true) {

                nMonster.hp     = Math.floor(Math.random()*11)+5;
                nMonster.damage = Math.floor(Math.random()*6)+3;
                nMonster.Name   = myArray[Math.floor(Math.random()*myArray.length)];

                Player.hp += Math.floor(Math.random()*6)+10;
             
                document.getElementById("event").innerHTML +="You eat the "+ nMonster.name + " and gain some health <br/> Another "+nMonster.name+" appears before you <br/><br/>" 

                BattleRite();

            }
                else {
                
                
                Player.hp += Math.floor(Math.random()*6)+10;
                 document.getElementById("event").innerHTML += "You eat the "+ nMonster.name + " and gain some health<br/> You take the treasure the snake was gaurding as a prize <br/>" ;

                Player.prizes++;
                displaystatus();
                break;
            }
            
        }

    

    }


}

function BossFight(){

    var heads = 1


    while(Player.hp>0 && Hydra.hp>0){



        Player.damage = Math.floor(Math.random()*6)+5;
        PDealBossDamage(Player.damage,Hydra.hp);

        if(Hydra.hp<=0){
            alert("You have defeated the Hydra and won the game!!");
            Player.victory=true;
            break;
        }



        for(i = 0; i < heads; i++){
            Hydra.damage = Math.floor(Math.random()*3)+2;
            HydraDamage(Hydra.damage,Player.hp);
        }

        
        heads++



        if(Player.hp<=0){
            Player.dead=true;
            deadchecker();
            break;
        }


    }
}


function eventHandler(event){

    event.toLowerCase();

    if(event=="battle"){
        var challenge = confirm("You run into " + nMonster.name + "! Do you want to fight it?");

        if(challenge == true){

        BattleRite();
        }
        else{
        document.getElementById("event").innerHTML += "You decide that fighting that snake was not a good idea";
        }
    }
    else if(event=="prize"){
        PrizeRoom();
    }
    else if(event=="start"){
        StartRoom();
    }
    else if(event=="boss"){
        BossRoom();
    }
    else{
        EmptyRoom();
    }

}


function movement(move){

    //var move = prompt("You decide to move ( w-north, a-west, s-south, d-right)")
    switch (move.toLowerCase()) {
    case 'w'://move up
          Player.px++;
        if(Player.px <= 7){
         var roomcheck=dungeon[Player.px][Player.py];

        document.getElementById("event").innerHTML = "You decide move North <br/><br/>";


            if(roomcheck=="wall"){
                wall();
                Player.px--;
            }

        locator();

         eventHandler(roomcheck);
        }
        else{
            wall();
            Player.px--;
           locator();
        }
        break;
    case 'a'://move left
        Player.py--;
        console.log(Player.py);
        if(Player.py>=0){  

        document.getElementById("event").innerHTML = "You decide move west <br/><br/>"


        var roomcheck=dungeon[Player.px][Player.py];
            
            if(roomcheck=="wall"){
                wall();
                Player.py++;
               locator();
            }

          eventHandler(roomcheck);
            locator();
        }
        else{
            document.getElementById("event").innerHTML = "You decide not to move <br/><br/>"
            Player.py++
            locator();
        }

       locator();


        break;
    case 's'://move down
        Player.px++;
        if(Player.px >=0){
         var roomcheck=dungeon[Player.px][Player.py];

        document.getElementById("event").innerHTML = "You decide move south <br/><br/>" ;

            if(roomcheck=="wall"){
                wall();
                Player.px--;
            }

       locator();

         eventHandler(roomcheck);
        }
        else{
            wall();
            Player.px--;
            locator();
        }
        break;
    case 'd'://move right
        Player.py++;
        if(Player.py <= 7){
         

        document.getElementById("event").innerHTML = "You decide move east <br/><br/>" ;

        var roomcheck=dungeon[Player.px][Player.py];
        console.log(roomcheck);

            if(roomcheck=="wall"){
                wall();
                console.log(wall());
                Player.py--;
            }

        locator();

         eventHandler(roomcheck);
        }
        else{
            wall();
            locator();
        }
        break;
    } 
}

function locator(){
    document.getElementById("locate").innerHTML = "Player Location: ["+Player.px+"]"+" ["+Player.py+"]";
}


function displaystatus(){
         document.getElementById("hp").innerHTML = "Player HP: " + Player.hp;
         document.getElementById("prize").innerHTML = "Prize: " + Player.prizes;
}

function deadchecker(){
    if(Player.dead== false){
        $("body").html("<p> You are dead G A M E O V E R </p>")  ;
    }
}

var dungeon=[["wall","battle","battle","empty","empty","wall","empty","wall"],
             ["wall","start","battle","empty","prize","wall","empty","empty"],
             ["wall","empty","empty","empty","empty","empty","empty","empty"],
             ["wall","empty","empty","empty","empty","empty","battle","empty"],
             ["wall","empty","empty","battle","empty","empty","empty","empty"],
             ["wall","empty","prize","empty","battle","empty","empty","empty"],
             ["wall","empty","empty","empty","empty","empty","boss","empty"],
             ["wall","battle","empty","empty","battle","empty","empty","wall"]];


function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function GameStart(){
    var test=dungeon[1][0];
    createTable(dungeon);

    displaystatus();
    locator();
    eventHandler(test);

}

     GameStart();
//    $("#test").click(function(){
//        console.log(Player.px);
//        console.log(Player.py);
//
//        GameStart();
//
//    });

    $("#north").click(function(){

        movement('w');

    });

    $("#east").click(function(){
        
        movement('d');

    });

    $("#south").click(function(){
        
        movement('s');

    });

    $("#west").click(function(){
        
        movement('a');
    });







});
