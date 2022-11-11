
// A server for testing locally

process.chdir(__dirname);

const express = require('express');

const srv = express();
srv.use(express.static('./'));
srv.listen(8888, () => { console.log(`Server is listening`) });