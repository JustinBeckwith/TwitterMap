
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Windows Azure Rocks * 10!' })
};