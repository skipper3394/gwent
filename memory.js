
var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];
function newCards(){
    cards.sort( () => .5 - Math.random() );
}

var c0 = document.getElementById("c0");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");

var c4 = document.getElementById("c4");
var c5 = document.getElementById("c5");
var c6 = document.getElementById("c6");
var c7 = document.getElementById("c7");

var c8 = document.getElementById("c8");
var c9 = document.getElementById("c9");
var c10 = document.getElementById("c10");
var c11 = document.getElementById("c11");

c0.addEventListener("click", function() { revealCard(0); });
c1.addEventListener("click", function() { revealCard(1); });
c2.addEventListener("click", function() { revealCard(2); });
c3.addEventListener("click", function() { revealCard(3); });

c4.addEventListener("click", function() { revealCard(4); });
c5.addEventListener("click", function() { revealCard(5); });
c6.addEventListener("click", function() { revealCard(6); });
c7.addEventListener("click", function() { revealCard(7); });

c8.addEventListener("click", function() { revealCard(8); });
c9.addEventListener("click", function() { revealCard(9); });
c10.addEventListener("click", function() { revealCard(10); });
c11.addEventListener("click", function() { revealCard(11); });

var oneVisible = false;
var turnCounter = 0;
var visibleNumber;
var lock = false;
var pairsLeft = 6;

function revealCard(nr){

    var opacityValue = $('#c'+nr).css('opacity');

    if(opacityValue != 0 && lock == false){
        lock = true;
        var obraz = "url(img/" + cards[nr] + ")";

        $('#c'+nr).css('background-image', obraz);
        $('#c'+nr).addClass('cardA');
        $('#c'+nr).removeClass('card');
    
        if(oneVisible == false){
            //first card
            oneVisible = true;
            visibleNumber = nr;
            lock = false;
        }
        else{
            //second card
            if(cards[visibleNumber] == cards[nr]){
                setTimeout(function() { hide2Cards(nr, visibleNumber) }, 1000);
            }
            else{
                setTimeout(function() { restore2Cards(nr, visibleNumber) }, 1000);
            }
            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible = false;
        }
    }
}
function hide2Cards(nr1, nr2){
    $("#c"+nr1).css('opacity', '0');
    $("#c"+nr2).css('opacity', '0');

    pairsLeft--;

    if(pairsLeft == 0){
        $('.score').css('opacity', '0');
        $('.end').html(`<h1 id="alert">You win! <br>Done in ${turnCounter} turns</h1><div id="restart">Restart game</div>`);

        $('#restart').css('width', '600px');
        $('#restart').css('height', '90px');
        $('#restart').css('background-color', 'black');
        $('#restart').css('border', '4px solid #51c8b2');
        $('#restart').css('border-radius', '4px');
        $('#restart').css('font-size', '64px');
        $('#restart').css('filter', 'brightness(70%)');
        $('#restart').css('transition', 'all .3s ease-in-out');
        $('#restart').css('cursor', 'pointer');
        $('#restart').hover(function(){
            $(this).css('border', '4px solid #E9B64A');
            $(this).css('filter', 'brightness(100%)');
            }, function(){
            $(this).css('filter', 'brightness(70%)');
            $(this).css('border', '4px solid #51c8b2');
          });
        document.getElementById("restart").addEventListener("click", function(){restartGame()});
    }
    lock = false;
}
function restore2Cards(nr1, nr2){
    $('#c'+nr1).css('background-image', 'url(img/karta.png)');
    $('#c'+nr1).addClass('card');
    $('#c'+nr1).removeClass('cardA');

    $('#c'+nr2).css('background-image', 'url(img/karta.png)');
    $('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardA');

    lock = false;
}
function restartGame(){
    oneVisible = false;
    turnCounter = 0;
    visibleNumber;
    lock = false;
    pairsLeft = 6;
    $('#restart').remove();
    $('#alert').remove();
    newCards();
    $('.score').html('Turn counter: '+turnCounter);
    $('.score').css('opacity', '1');
    for(let i=0; i<12; i++){
        $('#c'+i).css('background-image', 'url(img/karta.png)');
        $('#c'+i).addClass('card');
        $('#c'+i).removeClass('cardA');
        $('#c'+i).css('opacity', '1');
    }
}