let username;
let socket = io();

const chatList = document.querySelector('#chatList');
const textarea = document.querySelector('#chatTxt');
const send = document.querySelector('#button-addon2');
const user = document.querySelector('.username');

do{
    username = prompt('Enter Your Name..')
}while(!username){
    user.innerHTML = `Hello, ${username}`;
};


// Create chat card


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        let chatTxt = textarea.value;
        if(!chatTxt){
            return;
        }
        postChat(chatTxt);
        textarea.value='';
    }
    socket.emit('typing', {username});
    scrollToBottom();
});

send.addEventListener('click', (e) => {
    e.preventDefault();
    let chatTxt = textarea.value;
    if(!chatTxt){
        return;
    }
    postChat(chatTxt);
    textarea.value='';
    scrollToBottom();
});

function postChat(chatTxt){
    const data = {
        username : username,
        chatTxt : chatTxt
    }
    // Add to DOM
    addToDom(data, 'outgoing');
    // Broadcast MSG
    broadcastChat(data);
    // Insert to database
}

function addToDom(data, sender){
    let toast = document.createElement('div');
    toast.classList.add('toast', 'show', 'mb-4', sender);
    let renderTxt = `
                <div class="toast-header">
                <strong class="me-auto">${data.username}</strong>
                <small>${moment(data.time).format('LT')}</small>
                
                </div>
                <div class="toast-body">${data.chatTxt}</div>
    `;

    toast.innerHTML = renderTxt;
    chatList.append(toast);
}

function broadcastChat(data){
    // Socket
    socket.emit('chat', data);
}

socket.on('chat', (data)=>{
    addToDom(data, 'incoming');
    scrollToBottom();
});

let typingDiv = document.querySelector('.typing');

let timerId = null;

function debounce(func, timer){
    if(timerId){
        clearTimeout(timerId);
    }

    timerId = setTimeout(()=>{
        func();
    },timer);
}

socket.on('typing', (data)=>{
    typingDiv.innerHTML = `${data.username} is Typing ....`;
    debounce(function() {
        typingDiv.innerHTML = '';        
    }, 1000);
});

function scrollToBottom(){
    chatList.scrollTop = chatList.scrollHeight;
}