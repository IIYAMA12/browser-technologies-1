
'use strict';


var gameData = {
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
            touch: function (e) {
                var self = gameData.controller;

                self.position.player1 = 50;
                self.position.player2 = 50;
                document.getElementById("test-touch").innerHTML = "heeeYY";
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
                    }
                }
            }
        },

        render: {
            func: function (timeStamp) {

                var speedFactor = (timeStamp - gameData.canvas.render.lastTimeStamp) / 17;

                var speed = speedFactor * 1.5;
                // console.log(speed);

                gameData.canvas.render.lastTimeStamp = timeStamp;

                var canvasData = gameData.canvas.data;

                var context = gameData.canvas.element.getContext('2d');

                var sizeScaleFactor = canvasData.size / 640;

                context.fillStyle = "white";
                // context.strokeStyle = "black";

                context.strokeStyle = "black";

                context.fillRect(0, 0, canvasData.size, canvasData.size);
                context.strokeRect(1, 1, canvasData.size - 2, canvasData.size - 2);

                context.fillStyle = "black";

                var players = ["player1", "player2"];
                for (var i = 0; i < players.length; i++) {
                    var player = players[i];
                    var controllerPosition = gameData.controller.position[player];

                    var playerComponent = canvasData.components[player];
                    var componentPosition = playerComponent.position;

                    if (controllerPosition > componentPosition) {
                        componentPosition = componentPosition + speed;
                        if (componentPosition > controllerPosition) {
                            componentPosition = controllerPosition;
                        }

                    } else if (controllerPosition < componentPosition) {
                        componentPosition = componentPosition - speed;
                        if (componentPosition < controllerPosition) {
                            componentPosition = controllerPosition;
                        }
                    }

                    canvasData.components[player].position = componentPosition;
                    var barWidth = 10 * sizeScaleFactor;
                    var barHeight = 100 * sizeScaleFactor;
                    context.fillRect(i * (canvasData.size - barWidth), (canvasData.size - barHeight) * (componentPosition / 100) ,  barWidth, barHeight);
                }



                gameData.canvas.render.animationFrameRequest = window.requestAnimationFrame(gameData.canvas.render.func);
            },
            start: function () {
                if (this.animationFrameRequest == undefined) {
                    this.lastTimeStamp = new Date().getTime();
                    this.animationFrameRequest= window.requestAnimationFrame(this.func);
                }
            },
            stop: function () {
                if (this.animationFrameRequest != undefined) {
                    window.cancelAnimationFrame(this.animationFrameRequest);
                    delete this.animationFrameRequest;
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
        canvasElement.width = domRect.width;
        canvasElement.height = domRect.width;
    } else { // IE 8
        canvasElement.width = 640;
        canvasElement.height = 640;
    }

    gameData.canvas.data.size = canvasElement.width;

    gameData.canvas.element = canvasElement;

    var controlsSectionElement = document.createElement("section");
    controlsSectionElement.id = "controls";

    var containerElement = document.createElement("div");

    var controlsHeadingElement = document.createElement("h2");
    controlsHeadingElement.appendChild(document.createTextNode("Controls"));
    controlsSectionElement.appendChild(controlsHeadingElement);

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

    for (var i = 1; i < 3; i++) {
        var playerSectionElement = document.createElement("section");

        // Controls section headings
        var headingElement = document.createElement("h3");
        headingElement.appendChild(document.createTextNode("Player" + i));
        playerSectionElement.appendChild(headingElement);
        playerSectionElement.id = "player-controls-" + i;
        // Make the buttons
        for (var j = 0; j < buttonsData.length; j++) {
            var buttonElement = document.createElement("button");
            var buttonData = buttonsData[j];
            buttonElement.addEventListener("click", gameData.controller.functions.buttons);

            // Set the properties
            buttonElement.value = buttonData.value;
            buttonElement.appendChild(document.createTextNode(buttonData.nodeValue));

            playerSectionElement.appendChild(buttonElement);
        }



        containerElement.appendChild(playerSectionElement);
    }

    controlsSectionElement.appendChild(containerElement);


    mainElement.appendChild(canvasElement);
    mainElement.appendChild(controlsSectionElement);
    gameData.canvas.render.start();

    document.addEventListener("keypress",gameData.controller.functions.keyboard);
    canvasElement.addEventListener("mousemove",gameData.controller.functions.mouse);
    window.addEventListener("touchmove",gameData.controller.functions.mouse);
});
