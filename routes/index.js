
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'TwitterMap - NOW ON WINDOWS AZURE' })
};