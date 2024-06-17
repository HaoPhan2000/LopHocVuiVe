const search = function (data, req) {
  if (req.query.hasOwnProperty("_search")) {
    switch (req.query.type) {
      case "name":
        return data.filter((value) =>
          removeAccents(value.tenHocSinh)
            .toLowerCase()
            .includes(removeAccents(req.query.value).toLowerCase())
        );
      default:
        return data;
    }
  } else {
    return data;
  }
};
const searchTime = function (req) {
  let query;
  if (
    req.query.hasOwnProperty("_search") &&
    req.query.type == "time" &&
    (req.query.fromTime || req.query.toTime)
  ) {
    if (req.query.fromTime && !req.query.toTime) {
      const fromTime = new Date(`${req.query.fromTime}-01`);
      return (query = {
        CreateDay: {
          $gte: fromTime,
        },
      });
    } else if (!req.query.fromTime && req.query.toTime) {
      const [toYear, toMonth] = req.query.toTime.split("-").map(Number);
      const toTime = new Date(toYear, toMonth);
      return (query = {
        CreateDay: {
          $lte: toTime,
        },
      });
    } else {
      const [toYear, toMonth] = req.query.toTime.split("-").map(Number);
      const fromTime = new Date(`${req.query.fromTime}-01`);
      const toTime = new Date(toYear, toMonth);
      return (query = {
        CreateDay: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
    }
  } else {
    return (query = {});
  }
};
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
module.exports = { search, searchTime };
