const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const CONNECTION_MONGO_ATLAS = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jcnga.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_MONGO_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    server.listen(port, () => {
        console.info(`Listening on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
mongoose.set('useFindAndModify', false);


