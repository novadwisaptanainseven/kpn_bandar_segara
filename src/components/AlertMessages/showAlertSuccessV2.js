import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swal = withReactContent(swal2);

const showAlertSuccessV2 = (title) => {
  Swal.fire({
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  }).then((res) => {
    // history.push("/simantra/${path}`);
  });
};

export default showAlertSuccessV2;
