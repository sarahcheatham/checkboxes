# Set Up

## Server

cd into the server directory<br>

### `yarn install`

Go to server/index.js <br>

Replace `process.env.mongodburi` in the ```mongoose.connect()``` function with the connection string I sent in the email.<br>

### `node index.js`

This starts the server.<br>
The server runs on [http://localhost:3001](http://localhost:3001) <br>
There is a proxy in the package.json on client side that links the front-end to the server.


## Client

cd in to the client directory

### `yarn install`

### `yarn start`
