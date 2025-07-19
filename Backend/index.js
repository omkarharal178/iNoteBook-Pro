const express = require('express');
const connectToMongo = require('./db');
var cros = require('cors')
connectToMongo();

const app = express();
const port = 5000;

app.use(cros())
app.use(express.json());

// Correct route usage:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`iNoteBook Pro Backend listening on http://localhost:${port}`);
});
