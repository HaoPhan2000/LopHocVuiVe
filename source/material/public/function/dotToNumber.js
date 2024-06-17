export function addDotToNumber(input) {
  // Thêm dấu chấm sau mỗi 3 số
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function xoaChuCaiVaThemDauCham(input) {
  // Thêm dấu chấm sau mỗi 3 số,Xóa bất kỳ ký tự không phải số nào
  return input.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function loaiBoDauChamVaChuyenThanhKieuSo(num) {
  if (num !="") {
    const chuoiHocPhi = num.replace(/\./g, "");
    return parseFloat(chuoiHocPhi);
  } else {
    return 0;
  }
}
