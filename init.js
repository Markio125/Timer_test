let x = 1;
document.getElementById("abut").onclick = function() {
    const timer = new CountdownTimer({
        selector: `#clock${x}`,
        id : x,
    });
    timer.startTimer();
    x += 1; console.log(x)
}