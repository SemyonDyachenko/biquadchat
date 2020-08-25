async function getToken() {
    return window.biquadId;
}

async function sendMessage(parentDOM,messageText) {
    parentDOM.appendChild(createMessage(messageText));

    //add message to datebase
    createMessageRequest(messageText,String((new Date).getHours()) + ":" + String((new Date).getMinutes()));



}

async function createMessage() // create message html
{
    let messageWrapper =  document.createElement('div');
    messageWrapper.setAttribute('class','message message-personal');
    messageWrapper.innerText = text;
    let timestep = document.createElement('div');
    timestep.setAttribute('class','timestep');
    let nowTimeStr = String((new Date).getHours()) + ":" + String((new Date).getMinutes());
    timestep.innerText = nowTimeStr;

    messageWrapper.appendChild(timestep);
                
    return messageWrapper;
}


function createMessageRequest(text,time) { // create message request with adding to datebase
    let chatId = findUnqiueId();

    let request = new XMLHttpRequest();

   

    let urls = {
        mainurl : "https://www.biquad.ru/server/receive",
        proxyurl : "https://cors-anywhere.herokuapp.com/"
    };

    let Message = {
        "id" : chatId,
        "content" : text,
        "time" : time
    };

    let result = false;

    let jsonMessage = JSON.stringify(Message);

    request.open('POST',urls.proxyurl+urls.mainurl,true);

    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function() {
        if(request.readyState == 4 && (request.status >= 200 && request.status < 400)) {
            result = true;
        }
    }

    request.send(jsonMessage);

    return result;
}  



async function getChatJson(token) { // get chat history 

    let request = new XMLHttpRequest();

    let urls = {
        mainurl : "https://www.biquad.ru/server/give?unique_id="+String(token),
        proxyurl : "https://cors-anywhere.herokuapp.com/"
    };

    request.open("GET",urls.proxyurl+urls.mainurl,true);

    request.setRequestHeader("Content-Type", "application/json");

    request.send();

    let json = request.responseText;
    
    //json.push(request.response);
    //jsonString =  JSON.parse(json);
    //console.log(jsonString);
    return console.log(json);

}
