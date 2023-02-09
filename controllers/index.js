const router = require('express').Router();

router.get('/', (req, res) => {
    //res.json({msg: "Pikachu is great!"});
    res.send("<p> Sending an Object </p>");
    //res.sendFile('index.html');
})

module.exports = router;