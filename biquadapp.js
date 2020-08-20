let XHR = ("onload" in new XMLHttpRequest())?XMLHttpRequest:XDomainRequest;

let request = new XHR();

let urls = {
    mainurl : "https://www.biquad.ru/app.html",
    proxyurl : "https://cors-anywhere.herokuapp.com/"
};

request.open('GET',urls.proxyurl+urls.mainurl,true);

request.onload = function() {
    if(request.status >= 200 && request.status < 400) 
    { //success request status
        let response = request.responseText;
        let responseDocument = new DOMParser().parseFromString(response,"text/html");
        let openChatSection = responseDocument.getElementsByClassName("_openchat-section")[0];
        let chatWrapper = responseDocument.getElementsByClassName("_chatwrapper")[0];
        let chatStyles = responseDocument.getElementsByTagName('style')[0];
        let chatScript = document.createElement("script");
        chatScript.type = "text/javascript";
        chatScript.innerHTML =  responseDocument.getElementsByTagName('script')[0].innerHTML;
        let parent = openChatSection.parentNode;

      
        document.head.appendChild(chatStyles);
        document.body.appendChild(parent);
        document.getElementsByClassName('biquadapp')[0].appendChild(openChatSection);
        document.getElementsByClassName('biquadapp')[0].appendChild(chatWrapper);
        document.body.appendChild(chatScript);
       
        
    }
};

request.onerror = function() {
    console.log("XHR ERROR: ",request.status);
};

request.send();

