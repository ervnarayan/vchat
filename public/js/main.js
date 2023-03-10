let username;

do{

    username = prompt('Enter username..')

}while(!username);


// Create chat card
const chatList = document.querySelector('#chatList');
const textarea = document.querySelector('#chatTxt');
const send = document.querySelector('#button-addon2');




textarea.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        let chatTxt = textarea.value;
        if(!chatTxt){
            return;
        }
        postChat(chatTxt);
        textarea.value='';
    }

});

send.addEventListener('click', (e) => {
    e.preventDefault();
    let chatTxt = textarea.value;
    if(!chatTxt){
        return;
    }
    postChat(chatTxt);
    textarea.value='';
});


function postChat(chatTxt){
    
    const data = {
        username : username,
        chatTxt : chatTxt
    }

    // Add to DOM
    addToDom(data);

    // Broadcast MSG

    // Insert to database
}


function addToDom(data){
    let toast = document.createElement('div');
    toast.classList.add('toast', 'show', 'mb-4');
    let renderTxt = `
                <div class="toast-header">
                <strong class="me-auto">${data.username}</strong>
                <small>${moment(data.time).format('LT')}</small>
                <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true"></span>
                </button>
                </div>
                <div class="toast-body">${data.chatTxt}</div>
    `;

    toast.innerHTML = renderTxt;
    chatList.prepend(toast);
}
