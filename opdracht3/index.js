'use strict';


var gameData = {
    playerData: {
        score: {
            player1: 0,
            player2: 0,
        },
        givePlayerScore: function(player, score) {
            var self = gameData.playerData;
            self.score[player] += score;
            document.getElementById("score-" + player).getElementsByTagName("span")[0].textContent = self.score[player];
        }
    },
    gameSpeed: {
        gameSpeedMultiplier: 1,
        increaseSpeed: function () {
            var self = gameData.gameSpeed;
            self.gameSpeedMultiplier += 0.1;
        },
        resetSpeed: function () {
            var self = gameData.gameSpeed;
            self.gameSpeedMultiplier = 1;
        }
    },
    controller: {
        sensitivity: 15,
        functions: {
            buttons: function (e) {
                var source = e.target;
                var value = source.value;
                if (value != "") {
                    var self = gameData.controller;

                    var player;
                    if (source.parentElement.id === "player-controls-1") {
                        player = "player1";
                    } else if (source.parentElement.id === "player-controls-2") {
                        player = "player2";
                    }
                    if (player != undefined) {

                        var position = self.position[player];
                        position += (value === "up" ? -self.sensitivity : self.sensitivity);

                        position = gameData.utility.setValueLimit(position, 0, 100);

                        self.position[player] = position;
                    }
                }
            },
            keyboard: function (e) {
                var keyName = e.key;

                var self = gameData.controller;

                var sensitivity = self.sensitivity;

                switch (keyName) {
                    case "ArrowUp":
                        var position = self.position.player2;
                        position -= sensitivity;
                        position = gameData.utility.setValueLimit(position, 0, 100);

                        self.position.player2 = position;
                        break;
                    case "ArrowDown":
                        var position = self.position.player2;
                        position += sensitivity;
                        position = gameData.utility.setValueLimit(position, 0, 100);
                        self.position.player2 = position;
                        break;
                    case "w":
                        var position = self.position.player1;
                        position -= sensitivity;
                        position = gameData.utility.setValueLimit(position, 0, 100);
                        self.position.player1 = position;

                        break;
                    case "s":
                        var position = self.position.player1;
                        position += sensitivity;
                        position = gameData.utility.setValueLimit(position, 0, 100);
                        self.position.player1 = position;
                        break;
                }
            },
            mouse: function (e) {
                var source = e.target;

                var cursorPositionY = e.clientY - source.getBoundingClientRect().top;
                var cursorPositionX = e.clientX - source.getBoundingClientRect().left;
                // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element

                if (cursorPositionY > 0 && cursorPositionX > 0) {
                    var self = gameData.controller;
                    var canvasData = gameData.canvas.data;
                    var sizeScaleFactor = canvasData.size / 640;
                    var barHeight = 100 * sizeScaleFactor;

                    var position = ((cursorPositionY - (barHeight / 2)) / (canvasData.size - barHeight)) * 100;

                    position = gameData.utility.setValueLimit(position, 0, 100);

                    self.position.player1 = position;
                    self.position.player2 = position;


                }
            },
            pointerMove: function (e) {
                console.log("pointerMove");
                var source = e.target;
                // max 2 fingers
                for (var i = 0; i < Math.min(2, e.targetTouches.length); i++ ) {
                    var clientY = parseInt(e.targetTouches[i].clientY);
                    var clientX = parseInt(e.targetTouches[i].clientX);
                    gameData.controller.functions.touchMoveDetection(source, clientX, clientY);
                }
                e.preventDefault();
            },
            touchMove: function (e) {
                console.log("touchMove");
                var source = e.target;
                // max 2 fingers
                for (var i = 0; i < Math.min(2, e.targetTouches.length); i++ ) {
                    var clientY = parseInt(e.targetTouches[i].clientY);
                    var clientX = parseInt(e.targetTouches[i].clientX);
                    gameData.controller.functions.touchMoveDetection(source, clientX, clientY);
                }
                e.preventDefault();
            },
            touchMoveDetection: function (source, clientX, clientY) {


                if (clientY != undefined && clientX != undefined) {
                    var self = gameData.controller;
                    var canvasData = gameData.canvas.data;

                    var cursorPositionY = clientY - source.getBoundingClientRect().top;
                    var cursorPositionX = clientX - source.getBoundingClientRect().left;

                    if (cursorPositionY > 0 && cursorPositionY < canvasData.size) {

                        var sizeScaleFactor = canvasData.size / 640;
                        var barHeight = 100 * sizeScaleFactor;


                        var position = ((cursorPositionY - (barHeight / 2)) / (canvasData.size - barHeight)) * 100;


                        position = gameData.utility.setValueLimit(position, 0, 100);
                        if (cursorPositionX < canvasData.size / 2) {
                            self.position.player1 = position;
                        } else {
                            self.position.player2 = position;
                        }
                    }
                }
            }
        },
        position: {
            player1: 100,
            player2: 100
        }
    },
    canvas: {
        data: {
            components: {
                player1: {
                    position: 100
                },
                player2: {
                    position: 100
                },
                ball: {
                    position: {
                        x: 50,
                        y: 50
                    },
                    velocity: {
                        x: (1 - Math.random() * 2) > 0 ? 0.5 : -0.5,
                        y: (1 - Math.random() * 2) > 0 ? 0.5 : -0.5
                    }
                }
            }
        },

        render: {
            colors: {
                components:{
                    ball: "black",
                    barLeft: "black",
                    barRight: "black",
                },
                setComponentColor: function (component, color) {
                    var self = gameData.canvas.render.colors;
                    self.components[component] = color;
                    return true;
                },
                getComponentColor: function (component, color) {
                    var self = gameData.canvas.render.colors;
                    return self.components[component];
                }
            },

            func: function (timeStamp) {



                var speedFactor = 1;
                if (gameData.canvas.render.lastTimeStamp != undefined) {
                    speedFactor = (timeStamp - gameData.canvas.render.lastTimeStamp) / 17;
                }

                var colors = gameData.canvas.render.colors;


                gameData.canvas.render.lastTimeStamp = timeStamp;

                var canvasData = gameData.canvas.data;

                var context = gameData.canvas.element.getContext('2d');

                var sizeScaleFactor = canvasData.size / 640;



                var ball = canvasData.components.ball;

                var ballRadius = 10 * sizeScaleFactor;
                var ballRadiusPercentage = ballRadius * 100 / canvasData.size;

                var ballPosition = ball.position;
                var ballVelocity = ball.velocity;

                ballPosition.x = ballPosition.x + (ballVelocity.x * speedFactor * gameData.gameSpeed.gameSpeedMultiplier);
                ballPosition.y = ballPosition.y + (ballVelocity.y * speedFactor * gameData.gameSpeed.gameSpeedMultiplier);

                var ballAbsolutePositionX = ballPosition.x / 100 * canvasData.size;
                var ballAbsolutePositionY = ballPosition.y / 100 * canvasData.size;


                var barWidth = 20 * sizeScaleFactor;
                var barHeight = 100 * sizeScaleFactor;


                context.fillStyle = "white";

                context.strokeStyle = "black";

                context.fillRect(0, 0, canvasData.size, canvasData.size);
                //
                context.strokeRect(1, 1, canvasData.size - 2, canvasData.size - 2);

                context.fillStyle = colors.getComponentColor("barLeft");

                context.fillRect(0, 0, barWidth, canvasData.size);

                context.fillStyle = colors.getComponentColor("barRight");

                context.fillRect(canvasData.size - barWidth, 0, canvasData.size, canvasData.size);






                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
                context.fillStyle = "orange";

                var barSpeed = speedFactor * 1.7;
                var players = ["player1", "player2"];
                for (var i = 0; i < players.length; i++) {
                    var player = players[i];
                    var controllerPosition = gameData.controller.position[player];

                    var playerComponent = canvasData.components[player];
                    var componentPosition = playerComponent.position;

                    if (controllerPosition > componentPosition) {
                        componentPosition = componentPosition + barSpeed;
                        if (componentPosition > controllerPosition) {
                            componentPosition = controllerPosition;
                        }

                    } else if (controllerPosition < componentPosition) {
                        componentPosition = componentPosition - barSpeed;
                        if (componentPosition < controllerPosition) {
                            componentPosition = controllerPosition;
                        }
                    }

                    canvasData.components[player].position = componentPosition;

                    context.fillRect(i * (canvasData.size - barWidth), (canvasData.size - barHeight) * (componentPosition / 100) ,  barWidth, barHeight);
                }

                var sideOffsetX = barWidth / canvasData.size * 100;
                var barDetectionArea = barHeight / canvasData.size * 100;

                if (ballPosition.x < sideOffsetX || ballPosition.x > 100 - sideOffsetX) {
                    if (ballPosition.x < sideOffsetX) {
                        ballPosition.x = sideOffsetX;
                    } else {
                        ballPosition.x = 100 - sideOffsetX;
                    }

                    ballVelocity.x = -ballVelocity.x;



                    if (ballPosition.x == sideOffsetX) {
                        var playerComponent = canvasData.components.player1;
                        var componentPosition = playerComponent.position;

                        componentPosition = (100 - barDetectionArea) / 100 * componentPosition;

                        if (ballPosition.y + (ballRadiusPercentage / 2) > componentPosition && ballPosition.y - ballRadiusPercentage < componentPosition + barDetectionArea) {
                            gameData.gameSpeed.increaseSpeed();

                            colors.setComponentColor("ball", "orange");
                            setTimeout(colors.setComponentColor, 300, "ball", "black");
                        } else {

                            gameData.playerData.givePlayerScore("player2", 1);

                            ballPosition.x = 50;
                            ballPosition.y = 50;
                            gameData.gameSpeed.resetSpeed();

                            colors.setComponentColor("barLeft", "red");
                            setTimeout(colors.setComponentColor, 300, "barLeft", "black");
                        }
                    } else if (ballPosition.x == 100 - sideOffsetX) {

                        var playerComponent = canvasData.components.player2;
                        var componentPosition = playerComponent.position;

                        componentPosition = (100 - barDetectionArea) / 100 * componentPosition;

                        if (ballPosition.y + (ballRadiusPercentage / 2) > componentPosition && ballPosition.y - ballRadiusPercentage < componentPosition + barDetectionArea) {
                            gameData.gameSpeed.increaseSpeed();

                            colors.setComponentColor("ball", "orange");
                            setTimeout(colors.setComponentColor, 300, "ball", "black");
                        } else {
                            gameData.playerData.givePlayerScore("player1", 1);

                            ballPosition.x = 50;
                            ballPosition.y = 50;

                            gameData.gameSpeed.resetSpeed();

                            colors.setComponentColor("barRight", "red");
                            setTimeout(colors.setComponentColor, 300, "barRight", "black");
                        }
                    }
                } else if (ballPosition.y < 0 || ballPosition.y > 100) {
                    if (ballPosition.y < 0) {
                        ballPosition.y = 0;
                    } else {
                        ballPosition.y = 100;
                    }
                    ballVelocity.y = -ballVelocity.y;
                }



                context.fillStyle = colors.getComponentColor("ball");

                context.beginPath();
                context.arc(ballRadius + (canvasData.size - ballRadius * 2) * (ballPosition.x / 100), ballRadius + (canvasData.size - ballRadius  * 2) * (ballPosition.y / 100), ballRadius, 0, 2 * Math.PI);
                context.fill();
                // context.stroke();
                if ("requestAnimationFrame" in window) {
                    gameData.canvas.render.animationFrameRequest = window.requestAnimationFrame(gameData.canvas.render.func);
                } else {
                    gameData.canvas.render.animationTimer = setTimeout(gameData.canvas.render.func, 30, new Date().getTime());
                }
            },
            start: function () {
                if (this.animationFrameRequest == undefined) {
                    // this.lastTimeStamp = new Date().getTime();
                    if ("requestAnimationFrame" in window) {
                        this.animationFrameRequest= window.requestAnimationFrame(this.func);
                    } else {
                        gameData.canvas.render.animationTimer = setTimeout(gameData.canvas.render.func, 30, new Date().getTime());
                    }
                }
            },
            stop: function () {
                if (this.animationFrameRequest != undefined) {
                    window.cancelAnimationFrame(this.animationFrameRequest);
                    delete this.animationFrameRequest;
                } else if (this.animationTimer != undefined) {
                    clearTimeout(this.animationTimer);
                    delete this.animationTimer;
                }
            }

        }
    },
    utility: {
        setValueLimit: function (value, minValue, maxValue) {
            if (value < minValue) {
                value = minValue;
            } else if (value > maxValue )  {
                value = maxValue;
            }
            return value;
        }
    }
};









window.addEventListener("load", function () {
    var gamePreview = document.getElementById("game-preview");
    if (gamePreview != undefined) {
        gamePreview.parentElement.removeChild(gamePreview);
    }


    var mainElement = document.getElementsByTagName("main")[0];
    var canvasElement = document.createElement("canvas");

    var domRect = mainElement.getBoundingClientRect();
    if (domRect.width != undefined) {
        canvasElement.width = domRect.width * 0.7;
        canvasElement.height = domRect.width * 0.7;
    } else { // IE 8
        canvasElement.width = 600;
        canvasElement.height = 600;
    }

    gameData.canvas.data.size = canvasElement.width;

    gameData.canvas.element = canvasElement;


    // Controller section
    var controlsSectionElement = document.createElement("section");
    controlsSectionElement.id = "controls";

    // Add a div for styling
    var controlsContainerElement = document.createElement("div");

    var controlsHeadingElement = document.createElement("h2");
    controlsHeadingElement.textContent = "Controls";
    controlsSectionElement.appendChild(controlsHeadingElement);

    // Buttons per player.
    var buttonsData = [
        {
            value: "up",
            nodeValue: "up"
        },
        {
            value: "down",
            nodeValue: "down"
        }
    ];

    // Make the controller content info
    for (var i = 1; i < 3; i++) {
        var playerSectionElement = document.createElement("section");

        // Controls section headings
        var headingElement = document.createElement("h3");
        headingElement.textContent = "Player" + i;
        playerSectionElement.appendChild(headingElement);
        playerSectionElement.id = "player-controls-" + i;
        // Make the buttons
        for (var j = 0; j < buttonsData.length; j++) {
            var buttonElement = document.createElement("button");
            var buttonData = buttonsData[j];
            buttonElement.addEventListener("click", gameData.controller.functions.buttons);

            // Set the properties
            buttonElement.value = buttonData.value;
            buttonElement.textContent = buttonData.nodeValue;

            playerSectionElement.appendChild(buttonElement);
        }



        controlsContainerElement.appendChild(playerSectionElement);
    }

    controlsSectionElement.appendChild(controlsContainerElement);

    // Player 1 score
    var scorePlayer1Element = document.createElement("p");
    scorePlayer1Element.textContent = "Score player1: ";
    var scoreIndicatorPlayer1Element = document.createElement("span");
    scoreIndicatorPlayer1Element.textContent = "0";
    scorePlayer1Element.appendChild(scoreIndicatorPlayer1Element);
    scorePlayer1Element.id = "score-player1";
    mainElement.appendChild(scorePlayer1Element);

    // Player 2 score
    var scorePlayer2Element = document.createElement("p");
    scorePlayer2Element.textContent = "Score player2: ";
    var scoreIndicatorPlayer2Element = document.createElement("span");
    scoreIndicatorPlayer2Element.textContent = "0";
    scorePlayer2Element.appendChild(scoreIndicatorPlayer2Element);
    scorePlayer2Element.id = "score-player2";
    mainElement.appendChild(scorePlayer2Element);

    // Touch and cursor area
    var touchAndCursorElement = document.createElement("div");
    touchAndCursorElement.appendChild(canvasElement);
    touchAndCursorElement.id = "touch-and-cursor-element";
    mainElement.appendChild(touchAndCursorElement);

    mainElement.appendChild(controlsSectionElement);
    gameData.canvas.render.start();

    if ("addEventListener" in document) {
        document.addEventListener("keypress",gameData.controller.functions.keyboard);
        touchAndCursorElement.addEventListener("mousemove",gameData.controller.functions.mouse, false);
        touchAndCursorElement.addEventListener("touchmove",gameData.controller.functions.touchMove, false);
        touchAndCursorElement.addEventListener("pointermove",gameData.controller.functions.pointerMove, false);

    }
});
