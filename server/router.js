const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Server is running!')
});

router.get('/chat', (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});


module.exports = router;