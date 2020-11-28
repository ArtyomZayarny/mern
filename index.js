const express = require('express');
const config = require('config');
const mongoose = require('mongoose');


const app = express();
app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

const PORT = config.get('port') || 5000;


function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    app.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => { console.log(`Server start at port ${PORT}`) })
    } catch (e) {
        console.log('Server error ', e.message);
        process.on('SIGTERM', shutDown);
        process.on('SIGINT', shutDown);
    }
}
start();

