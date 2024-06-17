const paging  = function (data,limit,req) {
    //limit là số item trên mỗi trang
    let pageIndex =Math.floor(req.query._page)||1; // Trang hiện tại, mặc định là trang 1

    const totalPage=Math.ceil(data.length/limit);
    if(pageIndex >totalPage)
    {
        pageIndex=totalPage
    }
    const startIndex = (pageIndex - 1) * limit;
    const endIndex = pageIndex * limit;
    const results = {};
    results.results = data.slice(startIndex, endIndex)
   return results.results
}
  module.exports = { paging };


