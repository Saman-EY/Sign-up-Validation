import { toast } from 'react-toastify';

export let notify = (type, text) => {
    if (type === 'success') {
        toast.success(text);
    } else {
        toast.error(text);
    }
};
