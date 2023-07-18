const {Router} =  require('express');
const router = Router();

const {getWebhook, postWebhook, principal} = require('../controllers/functions.controller.js');

router.route("/webhook").get(getWebhook);
router.route("/webhook").post(postWebhook);
router.route("/").get(principal);

module.exports = router;