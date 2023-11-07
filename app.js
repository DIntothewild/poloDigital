const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/hola', function(resquest, response){
    response.send({mesage:'hola'});
});

app.listen(8000, function(){
    console.log('Server up and running!!!')
});
