# Feature Detectie

[Opdracht 2 - 1, 2, 3 Feature Detectie](ASSIGNMENT.md)


## Features, waarvan ik zou verwachten dat ze geheel ondersteund worden:
<details>
    <summary>textContent ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/textContent-support.png" alt="textContent ondersteuning">
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/textContent2-support.png" alt="textContent ondersteuning">
    <p>Internet Explorer, opmerkelijk slakkig.</p>
</details>

<details>
    <summary>createElement ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/createElement-support.png" alt="createElement ondersteuning">
</details>

<details>
    <summary>createTextNode ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/createTextNode-support.png" alt="createTextNode ondersteuning">
</details>

<details>
    <summary>Delete operator ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/delete-operator-support.png" alt="Delete operator ondersteuning">
</details>

<details>
    <summary>getElementsByTagName ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/getElementsByTagName-support.png" alt="getElementsByTagName ondersteuning">
</details>

<details>
    <summary>removeChild ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/removeChild-support.png" alt="removeChild ondersteuning">
</details>

## Voorbereiding op de test rondes
Voordat het prototype getest werd, heb ik zoveel mogelijk features bekeken of ze mogelijk ergens niet ondersteund worden.

### JS syntax / keywords
Ook is er in de prototype rekening gehouden met het gebruik van de vorige syntax / keywords.

Well:
```JS
var variable;
```

Niet:
```JS
let variable1; // Geen let
const variable2; // Geen const

var variable3 // Niet vergeten om de regel af te sluiten (;)
```
### HTML tag support controleren met JS
```JS
if (!("open" in document.createElement('details'))) {

}
```

Niet ondersteund? Vervang tags met JavaScript!
```JS
//////////////////////////////////////
// function to replace element tags //
var replaceTags = function (startElement, tag) {
    if (startElement != undefined && tag != undefined) {
        // collect information of the element //
        var content = startElement.innerHTML;
        var container = startElement.parentElement;

        // make the new element //
        var newElement = document.createElement(tag);

        // move the old content inside //
        newElement.innerHTML = content;

        // replace the tag //
        container.replaceChild(newElement, startElement);

        return newElement;
    }
};
```

Voor:
```HTML
<details>
    <summary>Krijn</summary>
    <div>
        <p>Likes Aria attributes. (not)</p>
    </div>
</details>
```

Na:
```HTML
<section>
    <h3>Krijn</h3>
    <div>
        <p>Likes Aria attributes. (not)</p>
    </div>
</section>
```

Na, met support van CSS:
```CSS
ol section:not(.open) *:not(button) {
    display: none;
    visibility: hidden;
}
```

### CSS syling van de geordende lijst:
Als CSS ondersteund wordt komen de cijfers na de kopjes te staan. Bij geen CSS ondersteuning of geen `content` eigenschap komen de cijfers er standaard voor.


```CSS
@supports (content: "") {
    #accordeon ol {
        counter-reset: section;
        list-style-type: none;
    }
    #accordeon li {
        counter-increment: section;
        list-style-type: inherit;
    }
    #accordeon summary::after, #accordeon button::after {
        content: " " counter(section);
    }
}
```

<details>
    <summary>Lijst - CSS ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/list-css.png" alt="CSS ondersteund bij lijst">
</details>

<details>
    <summary>Lijst - Geen CSS ondersteuning</summary>
    <img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/list-no-css.png" alt="Geen CSS ondersteund bij lijst">
</details>

De @ support notatie wordt gebruik om te controleren of iets ondersteund is in de browser. Voor meer informatie [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports).

```CSS
@supports (content: "") {
    /* Content is cool! */
}
```

## Test ronden 1 (Beide componenten)



<details>
<summary>Maar helaas toch niet allemaal:</summary>
<img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/classList-error.jpg" alt="classList error">
<p>De classList methode was niet beschikbaar op de windows tablet in Internet Explorer. Deze wordt gebruikt om de accordeon te openen en te sluiten, op het moment dat de detail element niet beschikbaar is.</p>
<img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/classList-error-fix.jpg" alt="classList fix">
<p>Een snelle fix er achteraan gegooid tijdens het testen.</p>
</details>


### Nieuwe code:
```JS
// get the previous state of the clicked button //
var previousState = parentElement.className === "open";

// clear all states //
for (var i = 0; i < sections.length; i++) {
    sections[i].className = "";
}

// Toggle the state //
parentElement.className = !previousState ? "open" : "";
```

Inplaats van de classList is nu de oudere className methode gebruikt. Het nadeel van deze methode is, dat je handmatig de class string moet manipuleren. Dit is geen probleem als je maar één class gebruikt, maar wel irritant als je er meer hebt.
