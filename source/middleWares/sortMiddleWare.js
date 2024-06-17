module.exports = function sortMiddleWare (req, res, next) {
  res.locals._sortReverse = {
    value: "default",
  };
  res.locals._sortName = {
    value: "default",
  };
  if (req.query.hasOwnProperty("_sort")&&req.query.type=="reverse") {
    res.locals._sortReverse.value = req.query.value;
  }
  if (req.query.hasOwnProperty("_sort")&&req.query.type=="name") {
    res.locals._sortName.value = req.query.value;
  }
  next();
};
