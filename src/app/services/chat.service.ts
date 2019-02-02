import io from 'socket.io-client'


export class ChatService{
    

    SendMessage()
    {
        console.log('jsuis dans le service');
        var socket = io.connect('localhost:8080');
        socket.on('connect', function () { console.log("socket connected"); });
        socket.emit('messageFromClient', { user: 'someuser1', msg: 'i am online' });
        
    }

    DisplayChat(){

    }
}
