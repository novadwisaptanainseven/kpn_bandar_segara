import { baseURL } from "../../../helpers/url";

export const exportFilterExcel = (key, filterTgl) => {
  window.open(
    `${baseURL}${key}/export_excel/${filterTgl.dari_tgl}/${filterTgl.sampai_tgl}`,
    "_self"
  );
};
