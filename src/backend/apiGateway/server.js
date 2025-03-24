import app from './src/App.js';
const port = process.env.PORT || '3005';

app.listen(port, function () {
    console.log(`Server listening on port ${port}`)
})