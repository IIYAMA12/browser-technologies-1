# Pong

[Opdracht 3](assignment.md)


[Website](index.html)


## Controls X 4
* Knoppen (op het scherm)
* Toetsenbord
* Muis
* Touch



## HTML

### Game preview
```HTML
<body>
    <main>
        <div id="game-preview">
            <img src="images/preview.png" alt="Example of the game.">
            <p>Waiting for Javascript, it is required for this game to work.</p>
        </div>
    </main>
</body>
```
Mocht Javascript uitstaan dan zal een preview worden weergegeven. Het spel is niet te spelen zonder JavaScript. JavaScript is daarom ook een deel van de bottomline.

<details>
    <summary>Preview</summary>
    <img src="https://raw.githubusercontent.com/IIYAMA12/browser-technologies-1/master/opdracht3/readme-content/preview.png" alt="Preview game">
</details>





## CSS

### Wanneer Flexbox niet ondersteund wordt:
```CSS
#controls > div {
    width: 100%;
    display: flex;
}

#controls > div > section {
    width: 49.99%;
}
#controls > div > section:nth-of-type(2) {
    float: left;
}

@supports (display: flex) {
    #controls > div > section {
        flex-grow: 1;
        width: auto;
    }
}
```
Mocht display flex niet ondersteund worden, gebruik dan een float left met breedte 49.99%. Sommige browser geven problemen als je twee elementen naast elkaar zet met een breedte van 50%, er kan dan net een pixel te veel of te weinig worden gerekend en het content wordt dan niet naast elkaar gezet. Safari is hier erg goed in. Door aan beide kanten 0.01 pixel weg te halen los je dat probleem op. (Soms moet je meer weg halen)


## JS

<details>
    <summary>
        Touch events niet ondersteund in IE.
    </summary>
    <img src="https://raw.githubusercontent.com/IIYAMA12/browser-technologies-1/master/opdracht3/readme-content/touch-not-supported-uses-cursor.jpg" alt="Touch events niet ondersteund in IE"/>
    <p>Internet Explorer ondersteund de <i>touch(Move) events</i> niet. Maar wel de mousemove event. Hierdoor volgt hij de muis wel waardoor de twee balken gelijk blijven.</p>
    <a href="https://vimeo.com/262180748">Video</a>
</details>


<details>
    <summary>
        Pointer events toegevoegd voor IE.
    </summary>
    <img src="https://raw.githubusercontent.com/IIYAMA12/browser-technologies-1/master/opdracht3/readme-content/pointer-events-added.jpg" alt="Pointer events toegevoegd voor IE"/>
    <p>Na het toevoegen van de <i>pointer events</i> ondersteund ook de tablet ook touch.</p>
    <a href="https://vimeo.com/262180800">Video</a>
</details>


### Configuratie controller
```JS
setControllerConfig: function (controller) {
    switch (controller) {
        case "keyPress":
            return true;
        case "mouseMove":
            return true;
        case "pointerMove":
            // console.log("pointerMove 222", gameData.controller.functions.isControllerEnabled("mouseMove"));
            if (gameData.controller.functions.isControllerEnabled("mouseMove")) {
                gameData.controller.touchAndCursorElement.removeEventListener("mousemove",gameData.controller.functions.mouseMove, false);
            }
            gameData.controller.enabled.mouseMove = false;

            return true;
        case "touchMove":
            if (gameData.controller.functions.isControllerEnabled("mouseMove")) {
                gameData.controller.touchAndCursorElement.removeEventListener("mousemove",gameData.controller.functions.mouseMove, false);
            }
            if (gameData.controller.functions.isControllerEnabled("pointerMove")) {
                gameData.controller.touchAndCursorElement.removeEventListener("pointermove",gameData.controller.functions.pointerMove, false);
            }

            gameData.controller.enabled.mouseMove = false;
            gameData.controller.enabled.pointerMove = false;
            return true;
        default:
    }
    return false;
}
```
Met deze code wordt de juiste controller aangezet/gekozen. Dit is op basis van van controller gebruik. Mocht een gebruiker het (`keypress`) toetsenbord of (`mousemove`) muis gebruiken, dan heeft dit geen gevolgens. Maar bij de (`pointermove`) touch (IE variant) en (`touchmove`) touch (Apple variant), zal de (`mousemove`) worden uitgeschakeld. Daarnaast zal hij ook (`pointermove`) uitschakelen wanneer (`touchmove`) actief is.



<details>
    <summary>
        Eerste resultaat op oudere smartphones
    </summary>
    <ul>
        <li>
            <img src="https://raw.githubusercontent.com/IIYAMA12/browser-technologies-1/master/opdracht3/readme-content/first-mobile-layout-1.jpg" alt="Samsung"/>
            <p>Op deze Samsung smartphone werkte de game in zijn geheel. De knoppen werkte helaas niet helemaal goed omdat deze veel te klein waren.</p>
        <li>
        <li>
            <img src="https://raw.githubusercontent.com/IIYAMA12/browser-technologies-1/master/opdracht3/readme-content/first-mobile-layout-2.jpg" alt="O?"/>
            <p>Op deze smartphone was de schaal verhouding ook niet optimaal.</p>
        <li>
    </ul>
</details>

Oplossing
```HTML
<meta name="viewport" content="width=device-width, initial-scale=1">
```
De goede oude viewport tag helemaal vergeten!
