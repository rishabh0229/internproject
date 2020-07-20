const express = require("express");
const router = express.Router();

//route               GET api/profile
//discription         test route
//ascess given        public

router.get("/", (req, res) => res.send("profile route is connected"));

module.exports = router;
