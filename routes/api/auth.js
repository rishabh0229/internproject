const express = require("express");
const router = express.Router();

//route               GET api/auth
//discription         test route
//ascess given        public

router.get("/", (req, res) => res.send("auth route is connected"));

module.exports = router;
