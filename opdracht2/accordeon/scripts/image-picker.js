(function (){
    var inputElement = document.getElementById("image-preview").getElementsByTagName("input")[0];

    // window.FileReader = null;
    // delete window.FileReader;



    if ("FileReader" in window) {

        inputElement.removeAttribute("disabled");
        inputElement.addEventListener("change", function (e) {
            var fileList = this.files;
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
            var reader = new FileReader();
            reader.onload = (function(image) {
                return function(e) {
                    image.src = e.target.result;
                };
            })(document.querySelector("#image-preview img"));

            reader.readAsDataURL(fileList[0]);
        });
        var feedbackElement = document.getElementById("image-preview").getElementsByTagName("p")[0];
        if (feedbackElement != undefined) {
            feedbackElement.parentElement.removeChild(feedbackElement);
        }
    } else {
        var feedbackElement = document.getElementById("image-preview").getElementsByTagName("p")[0];
        if (feedbackElement != undefined) {
            if ("textContent" in document) {
                feedbackElement.textContent = "Upload feature unavailable";
            } else {
                feedbackElement.appendChild(document.createTextNode("Upload feature unavailable."));
            }
        }
    }
})();
