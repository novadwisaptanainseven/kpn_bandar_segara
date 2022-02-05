import React from "react";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(swal2);

const handleDelete = (id, deleteData, dispatch) => {
  Swal.fire({
    icon: "warning",
    title: "Anda yakin ingin menghapus data ini ?",
    text: "Jika yakin, klik YA",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YA",
    cancelButtonText: "Batal",
  }).then((res) => {
    if (res.isConfirmed) {
      deleteData(id, dispatch, Swal);
    }
  });
};

export default handleDelete;
