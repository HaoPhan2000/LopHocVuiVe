module.exports = {
  sum: (a, b) => {
    return a + b;
  },
  time: (start, end) => {
    return `${start}-${end}`;
  },
  formatDate: (dateInput) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return (
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year
    );
  },
  formatDatetime: (dateTimeInput) => {
    const dateTime = new Date(dateTimeInput);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Month is zero-based
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return (
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year +
      " " +
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes
    );
  },
  formatTime: (timeInput) => {
    const time = new Date(timeInput);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes
    );
  },
  addDotToNumber: (num) => {
    let value = num.toString();
    // Thêm dấu chấm sau mỗi 3 số
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return value;
  },
  sortReverse: (data) => {
    const icons = {
      default: "fa-solid fa-sort",
      asc: "fa-solid fa-arrow-up-1-9",
      desc: "fa-solid fa-arrow-up-9-1",
    };
    const values = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };
    const value = values[data.value];
    const icon = icons[data.value];
    return `<a href="?_sort&type=reverse&value=${value}" class="no-underline">
      <i class="${icon}"></i>
    </a>`;
  },
  sortName: (data) => {
    const selectedValue = data.value;
    return `<select style="text-align: center;border-radius: 3px;color: #212529;" id="sortNameClassDetail">
    <option id="default" value="?_sort&type=name&value=default"${
      selectedValue === "default" ? " selected" : ""
    }>--Sắp xếp--</option>
    <option id="a-z" value="?_sort&type=name&value=a-z"${
      selectedValue === "a-z" ? " selected" : ""
    }>A - Z</option>
    <option id="z-a" value="?_sort&type=name&value=z-a"${
      selectedValue === "z-a" ? " selected" : ""
    }>Z - A</option>
  </select>`;
  },
  searchName: (data) => {
    const placeholder = data.value;
    return `<div class="input-group">
    <input type="search" id="searchInput" class="form-control rounded" placeholder="${placeholder}" aria-label="Search" aria-describedby="search-addon" />
    <button type="button" id="searchbtn" class="btn btn-outline-primary white-space-nowrap" data-mdb-ripple-init>Tìm kiếm</button>
  </div>`;
  },
  searchTime: (data) => {
    const fromTime = data.fromTime;
    const toTime = data.toTime;
    return `  <div class="d-flex justify-content-around align-items-center">
          <div>
            <div>
              <label for="monthInputFrom"
                ><h6 class="m-0">Từ tháng và năm:</h6></label
              >
            </div>
            <div>
              <input
                type="month"
                id="monthInputFrom"
                name="monthInputFrom"
                value="${fromTime}"
                required
                min="2020-01"
                max="2030-12"
              />
            </div>
          </div>
          <div>
            <div>
              <label for="monthInputTo"
                ><h6 class="m-0">Đến tháng và năm:</h6></label
              >
            </div>
            <div>
              <input
                type="month"
                id="monthInputTo"
                name="monthInputTo"
                value="${toTime}"
                required
                min="2020-01"
                max="2030-12"
              />
            </div>
          </div>
        </div>`;
  },
  pagination: (data, totalPage) => {
    if (
      Object.keys(data.resQuery).length === 0 ||
      (Object.keys(data.resQuery).length === 1 &&
        Object.keys(data.resQuery)[0] === "_page")
    ) {
      let page = "";
      for (let i = 1; i <= totalPage; i++) {
        page += `
              <li class="page-item ${
                data.page == i ? "active" : ""
              }" onclick="addDataScrollToView()">
                <a class="page-link" href="?_page=${i}">${i}</a>
              </li>
              `;
      }
      return ` 
    <nav aria-label="Page navigation example">
    <ul class="pagination m-0">
    ${
      data.page > 1
        ? `<li class="page-item" onclick="addDataScrollToView()"><a class="page-link" href="?_page=${
            data.page - 1
          }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
        : ""
    }
    ${page}
    ${
      data.page < totalPage
        ? `<li class="page-item" onclick="addDataScrollToView()"><a class="page-link" href="?_page=${
            data.page + 1
          }" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
        : ""
    }  
    </ul>
  </nav>`;
    } else {
      const newObjQuery = { ...data.resQuery };
      delete newObjQuery._page;
      let queryString =
        "?" +
        Object.keys(newObjQuery)
          .map((key) =>
            newObjQuery[key] !== "" ? `${key}=${newObjQuery[key]}` : key
          )
          .join("&");
      let page = "";
      for (let i = 1; i <= totalPage; i++) {
        page += `
                  <li class="page-item ${
                    data.page == i ? "active" : ""
                  }" onclick="addDataScrollToView()">
                    <a class="page-link" href="${queryString}&_page=${i}">${i}</a>
                  </li>
                  `;
      }
      return `
        <nav aria-label="Page navigation example">
        <ul class="pagination m-0">
        ${
          data.page > 1
            ? `<li class="page-item" onclick="addDataScrollToView()"><a class="page-link" href="${queryString}&_page=${
                data.page - 1
              }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
            : ""
        }
        ${page}
        ${
          data.page < totalPage
            ? `<li class="page-item" onclick="addDataScrollToView()"><a class="page-link" href="${queryString}&_page=${
                data.page + 1
              }" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
            : ""
        }
        </ul>
      </nav>`;
    }
  },
  paginationIndex: (data,limit,dataIndex) => {
    const page = data.page;
    let index = dataIndex + 1;
    if (page > 1) {
      index+=(page-1)*limit
    }
    return index;
  },
};
