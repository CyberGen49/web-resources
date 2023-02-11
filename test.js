
// A server for testing locally

const express = require('express');

const srv = express();
srv.use(express.static(__dirname));
srv.listen(8888, () => { console.log(`Server is listening`) });