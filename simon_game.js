var level = 1;
var series = [];
var input = [];
var allowInput = "True";
var number = 0;

function playSound(sound) {
    if (sound === 1) {
        var audio = new Audio(
            "http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav"
        );
    } else if (sound === 2) {
        var audio = new Audio(
            "http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav"
        );
    } else if (sound === 3) {
        var audio = new Audio(
            "http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav"
        );
    } else {
        var audio = new Audio(
            "http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav"
        );
    }
    audio.play();
}

function emphasize(buttonNumber) {
    allowInput = "False";
    var button = document.getElementById("button" + buttonNumber);
    button.style.animation = "emphasize 1s infinite";
    setTimeout(function () {
        button.style.animation = "none";
        allowInput = "True";
    }, 1000);
}

function delay(timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
}

async function onStartClicked() {
    document.getElementById("controlButton").innerHTML = "RESET";
    allowInput = "False";
    number = Math.floor(Math.random() * 4 + 1);
    series.push(number);
    for (i = 0; i < series.length; i++) {
        playSound(series[i]);
        emphasize(series[i]);
        await delay(1000);
    }
    allowInput = "True";
    input = [];
}

function onResetClicked() {
    document.getElementById("controlButton").innerHTML = "START!";
    allowInput = "False";
    level = 1;
    document.getElementById("level").innerHTML = "Level: " + level;
    series = [];
    input = [];
}

function controlButtonClicked() {
    var buttonOperation = document.getElementById("controlButton").innerHTML;
    if (buttonOperation === "START!") {
        onStartClicked();
    } else {
        onResetClicked();
    }
}

async function onUserInput(button) {
    if (allowInput === "False") {
        return;
    }
    input.push(button);
    if (button == series[input.length - 1]) {
        playSound(button);
        emphasize(button);
        await delay(1000);
    } else {
        let score = parseInt(level - 1);
        onResetClicked();
        await delay(100);
        alert("Well played! Your score was: " + score);
        return;
    }
    if (series.length !== input.length) {
        return;
    }
    await delay(1000);
    level = level + 1;
    document.getElementById("level").innerHTML = "Level: " + level;
    onStartClicked();
}