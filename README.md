# coyotendancev2

Before you start, Install Mongodb, npm, node on your server.

$ sudo npm install -g ionic@beta

$ sudo npm install -g nodemon

$ npm install

$ mkdir mongodata

In one terminal, start mongodb.

$ mongod --dbpath mongodata

In second terminal, start backend

$ nodemon server/index.js

In third terminal, start ionic.

$ ionic serve
