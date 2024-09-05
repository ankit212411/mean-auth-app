import {toast} from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeButton: true,
    });
}

export const handleError = (msg) => {
    toast.error(msg, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeButton: true,
    });
}