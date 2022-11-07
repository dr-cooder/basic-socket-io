const socket = io();

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    const channelSelect = document.getElementById('channelSelect');

    editForm.addEventListener('submit', e => {
        e.preventDefault();

        if(editBox.value) {
            const data = {
                message: editBox.value,
                channel: channelSelect.value,
            }

            socket.emit('chat message', data);
            editBox.value = '';
        }
    })
}

const displayMessage = (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = msg.message;
    document.getElementById('messages').appendChild(messageDiv);
};

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');

    channelSelect.addEventListener('change', () => {
        messages.innerHTML = '';

        switch(channelSelect.value) {
            case 'memes':
                socket.off('general');
                socket.on('memes', displayMessage);
                break;
            default:
                socket.off('memes');
                socket.on('general', displayMessage);
                break;
        }
    });
}

const init = () => {
    handleEditBox();
    socket.on('general', displayMessage);
};

window.onload = init;