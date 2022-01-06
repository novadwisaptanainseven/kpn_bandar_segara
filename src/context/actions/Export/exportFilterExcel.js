export const exportFilterExcel = (key, filterTgl) => {
  window.open(
    `${localStorage.baseURL}${key}/export_excel/${filterTgl.dari_tgl}/${filterTgl.sampai_tgl}`,
    "_self"
  );
};
