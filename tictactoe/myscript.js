/**
 * @author kodemartin
 */


//$( document ).ready( function () { 

var computer = new AI("novice");
var game0 = new Game(computer);
computer.plays(game0);
 
    //populate the board array

$("td").each(function(index){
    $(this).addClass("cell");
    var $this = $(this);
    $(this).on("click", function() {
        if(game0.status === "running" && game0.currentState.turn === human && !$this.hasClass('occupied')) {

            var next = new State(game0.currentState);
            next.board[index] = human;

            ui.insertAt(index, human);

            next.advanceTurn();

            game0.advanceTo(next);


        }});
});
var board = $(".cell");

$("#play").on("click", function(){
    if (human === undefined) {
        $("#whoplays").text("Please select side!");
    } else if (game0.status === "beginning") {
        game0.start();
    } else if (game0.status === "ended") {
        rematch();
        game0 = new Game(computer);
        computer.plays(game0);
        game0.start()
    } else {
        $("#whoplays").text("Game is already running!");
    }
});


//});
