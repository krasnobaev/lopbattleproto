var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  const scriptid = req.params.id;

  console.dir(['params', scriptid]);
  res.render('bfield', {
    title: 'Express - battlefield',
    csspath: `/battlefields/${scriptid}/style.css`,
    jspath: `/battlefields/${scriptid}/index.js`,
  });
});

module.exports = router;
