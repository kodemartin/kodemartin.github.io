//$(document).ready ( function(){

$("#whoplays").html("Choose side and press play when ready. X starts first.");
var human;
var robot;

$(".player").each(function(){
    $(this).on("click", function(){
        human = $(this).text().trim();
        robot = human === "X" ? "O" : "X";
        $("#side").text(human);
        $("#whoplays").html("You will play with " + human + "<br>Press " + $("#play").html()+ " when ready.");
    })
});
function rematch() {
    $("td").each(function(index){
        $(this).removeClass("occupied");
        $(this).html("");
    })
}

//})
