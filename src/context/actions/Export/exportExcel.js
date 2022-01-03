export const exportExcel = (key) => {
  window.open(`${localStorage.baseURL}${key}/export_excel`, "_self");
};
