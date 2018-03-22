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

## Test ronden 1 (Beide componenten)

Voor dat de eerste test ronden heeft plaatst gevonden, heb ik zoveel mogelijk features bekeken of ze mogelijk ergens niet ondersteund werden.

<details>
<summary>Maar helaas toch niet allemaal:</summary>
<img src="https://github.com/IIYAMA12/browser-technologies-1/blob/master/opdracht2/readme-content/classList-error.jpg" alt="classList error">
<p>De classList methode was niet beschikbaar op de windows tablet in Internet Explorer. Deze wordt gebruikt om de accordeon te openen en te sluiten op het moment dat de detail element niet beschikbaar is.</p>
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
