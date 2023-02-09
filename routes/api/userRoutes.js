const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try{
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session
      })
    } catch (err){

    }
})


module.exports = router;