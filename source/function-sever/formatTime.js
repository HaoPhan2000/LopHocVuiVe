const formatDate  = function (dateInput) {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

}
  module.exports = { formatDate };