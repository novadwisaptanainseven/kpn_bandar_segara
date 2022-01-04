import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swal = withReactContent(swal2);

const showAlertError = (message, title) => {
  let err_message = "";

  for (const key in message) {
    err_message += `${message[key]}, `;
  }

  Swal.fire({
    icon: "error",
    title: message,
    text: err_message,
  }).then((result) => {});
};

export default showAlertError;
