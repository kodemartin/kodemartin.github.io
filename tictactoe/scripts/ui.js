/*
 * ui object encloses all UI related methods and attributes
 */

/*
 * places X or O in the specifed place in the board
 * @param i [Number] : row number (0-indexed)
 * @param j [Number] : column number (0-indexed)
 * @param symbol [String]: X or O
 */
var ui = {};
ui.insertAt = function(index, symbol) {
    var targetCell = $(board[index]);
    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol === human ? "#57AD68" : "#DE1B1B"
        });
        targetCell.addClass('occupied');
    }
};
/*
 * Updates the message field.
 */

ui.switchViewTo = function(string) {
    function _switch(_turn) {
        $("#whoplays").text(_turn);
    }
    _switch(string);
};
