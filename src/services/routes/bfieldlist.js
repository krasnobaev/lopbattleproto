var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  let versions = [];

  fs.readdirSync(process.env.BTLFLD_DIST_DIR_TO)
  .reverse()
  .forEach(folder => {
    versions.push(folder);
  });

  res.render('bfieldlist', {
    title: 'Reactive Battlefield version history',
    versions,
  });
});

module.exports = router;
