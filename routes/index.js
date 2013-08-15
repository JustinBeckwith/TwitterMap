
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'TwitterMap - ITS A MEETUP' })
};