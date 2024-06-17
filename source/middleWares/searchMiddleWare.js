module.exports = function searchMiddleWare (req, res, next) {
    res.locals._searchName = {
      value: "Tên học sinh",
    };
    res.locals._searchTime = {
     fromTime:"",
     toTime:""
    };
    if (req.query.hasOwnProperty("_search")&&req.query.type=="name") {
      res.locals._searchName.value = req.query.value;
    }
    if (req.query.hasOwnProperty("_search")&&req.query.type=="time") {
      res.locals._searchTime.fromTime = req.query.fromTime;
      res.locals._searchTime.toTime = req.query.toTime;
    }
    next();
  };
  