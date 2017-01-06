/**
 * @author kodemartin
 */


$( document ).ready( function () { 
    var minC = document.getElementById("minutes");
    var secC = document.getElementById("seconds");

    function setCountDown(minutes, seconds) {
        var min = ("0" + minutes).slice(-2);
        var sec = ("0" + seconds).slice(-2);
        minC.innerHTML = min;
        secC.innerHTML = sec;
    }


    $("#sessionLength").val("25");
    $("#breakLength").val("5");

    $("#sessionLength").on("input", function(){
        var session = $("#sessionLength").val();
        setCountDown(session, "00");
        sessionLength = session;
    });
    $("#breakLength").on("input", function(){
        var session = $("#breakLength").val();
        breakLength = session;
    });

    var sessionLength = $("#sessionLength").val();
    var breakLength = $("#breakLength").val();
    setCountDown(sessionLength, "00");
    

    var sessionCount = true;
    function toggleCount() {
        if (sessionCount) { 
            setCountDown($("#sessionLength").val(), "00");
            sessionCount = false;
            $("#label").text("SESSION");
            $("#label").css("color", "#C7CBCF");
            $("#clock").css("border-color", "#57AD68")
        } else {
            setCountDown($("#breakLength").val(), "00");
            sessionCount = true;
            $("#label").text("BREAK");
            $("#label").css("color", "#57ad68");
            $("#clock").css("border-color", "#C7CBCF")
        }
    }
    toggleCount();

    $("#sessionp").on("click", function(){
        var session = $("#sessionLength").val();
        var cur = parseInt(session);
        cur ++;
        $("#sessionLength").val(cur);
        sessionLength = cur.toString();
        setCountDown(sessionLength, "00");
    });
    $("#sessionm").on("click", function(){
        var session = $("#sessionLength").val();
        var cur = parseInt(session);
        if (cur > 0) {
            cur--;
        } else {
            cur = 0;
        }
        
        $("#sessionLength").val(cur);
        sessionLength = cur.toString();
        setCountDown(sessionLength, "00");
    });
    $("#breakp").on("click", function(){
        var breakk = $("#breakLength").val();
        var cur = parseInt(breakk);
        cur ++;
        $("#breakLength").val(cur);
        breakLength = cur.toString();
    });
    $("#breakm").on("click", function(){
        var breakk = $("#breakLength").val();
        var cur = parseInt(breakk);
        if (cur > 0) {
            cur--;
        } else {
            cur = 0;
        }
        
        $("#breakLength").val(cur);
        breakLength = cur.toString();
    });
    $("#reset").on("click", function(){
        $("#breakLength").val("5");
        $("#sessionLength").val("25");
        clearInterval(countDown);
        setCountDown("25", "0");
        if (sessionCount){
            toggleCount();
        }
        if (!stopped) {
            $("#start").text("Start");
            stopped = true;
        }

    });
    // Set the countdown clock
    // Initialize
    function getCurrentTime() {
        var minutes = minC.innerHTML;
        var seconds = secC.innerHTML;
        return parseInt(minutes)*60*1000 + parseInt(seconds)*1000;

    }
    function evalCT (msec) {
        var minutes = Math.floor( (msec/1000/60));
        var seconds = (msec - minutes*60*1000)/1000;
        seconds = Math.round(seconds);
        return {
            "minutes": minutes.toString(),
            "seconds": seconds.toString()
        }
    }
   var stopped = true;
   var countDown;
   var snd = document.createElement("audio");
   snd.src = "http://www.orangefreesounds.com/wp-content/uploads/2015/08/Old-clock-ringing-short.mp3?_=1";
   snd.autoPlay = false;
   snd.preLoad = true;

    $("#start").on("click", function(){

        if (stopped) {
            $("#start").text("Stop");
            stopped = false;
            var start = Date.now();
            var clock = getCurrentTime();
            countDown = setInterval(function() {
                var now = Date.now() - start;
                var timeF = evalCT(clock - now);
                setCountDown(timeF.minutes, timeF.seconds);
                var display = getCurrentTime();
                if (display < 1000) {
                    toggleCount();
                    snd.play();
                    start = Date.now();
                    clock = getCurrentTime();
                }
            }, 1000);
        } else {
            $("#start").text("Start");
            stopped = true;
            clearInterval(countDown);
        }
    });
});
