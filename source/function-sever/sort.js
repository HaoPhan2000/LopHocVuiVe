const sort = function (data, req) {
  if (req.query.hasOwnProperty("_sort")) {
    switch (req.query.type) {
      case "reverse":
        if (req.query.value == "desc") {
          return data.reverse();
        } else {
          return data;
        }
      case "name":
        switch (req.query.value || "default") {
          case "default":
            return data;
          case "a-z":
            data = data.sort((a, b) => {
              const lastNameA = a.tenHocSinh
                .split(" ")
                .slice(-1)[0]
                .toLowerCase();
              const lastNameB = b.tenHocSinh
                .split(" ")
                .slice(-1)[0]
                .toLowerCase();
              return lastNameA.localeCompare(lastNameB);
            });
            return data;
          case "z-a":
            data = data.sort((a, b) => {
              const lastNameA = a.tenHocSinh
                .split(" ")
                .slice(-1)[0]
                .toLowerCase();
              const lastNameB = b.tenHocSinh
                .split(" ")
                .slice(-1)[0]
                .toLowerCase();
              return lastNameB.localeCompare(lastNameA);
            });
            return data;
          default:
            return data;
        }
      default:
        return data;
    }
  } else {
    return data;
  }
};

module.exports = { sort };
