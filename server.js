const express = require('express');
const app = express();
const path = require('path');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(app.get('port'), function() {
  console.log('The party is at port', app.get('port'));
});
