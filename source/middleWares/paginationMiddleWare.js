module.exports = function searchMiddleWare (req, res, next) {
    res.locals._pagination = {
        page:1,
        resQuery:req.query,
    };
    if (req.query.hasOwnProperty("_page")&&req.query._page>=1) {
      res.locals._pagination.page = Math.floor(req.query._page);
      res.locals._pagination.resQuery =req.query
    }
    next();
  };
  