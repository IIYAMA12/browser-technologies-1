(function () {

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

    /////////////////////////////////////////////////
    // replacement for Array.from if not supported //
    var convertListToArray = function (list) {
        var newArray = [];
        for (var i = 0; i < list.length; i++) {
            newArray[newArray.length] = list[i];
        }
        return newArray;
    };

    ///////////////////////////
    // manually show details //
    var showDetails = function (e) {
        var sections = document.getElementsByTagName("ol")[0].getElementsByTagName("section");

        var source = e.target != undefined ? e.target : e.srcElement;
        var parentElement = source.parentElement != undefined ? source.parentElement != undefined : parentElement.parentNode

        // get the previous state of the clicked button //
        var previousState = parentElement.classList.contains("open");

        // clear all states //
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove("open");
        }

        // Toggle the state //
        parentElement.classList.toggle("open", !previousState);
    };

    //////////////////////////////////////////////
    // check of the detail element is supported //
    if (!("open" in document.createElement('details'))) {

        // get all detailElements //
        var detailElements = (Array.from != undefined ? Array.from : convertListToArray)(document.getElementsByTagName("ol")[0].getElementsByTagName("details"));

        // replace tags and add manual control //
        for (var i = 0; i < detailElements.length; i++) {
            var detailElement = detailElements[i];
            var sectionElement = replaceTags(detailElement, "section");
            var buttonElement = replaceTags(sectionElement.getElementsByTagName("summary")[0],"button");

            (buttonElement.addEventListener != undefined ? buttonElement.addEventListener : buttonElement.attachEvent)("click", showDetails);
        }

        // custom styling //
        if ("appendChild" in document) {
            var fallBackAccordeonStyle = document.createElement("link");
            fallBackAccordeonStyle.rel = "stylesheet";
            fallBackAccordeonStyle.href = "styles/accordeon-fallback.min.css";
            document.getElementsByTagName("head")[0].appendChild(fallBackAccordeonStyle);
        }
    } else {

    }
})();
