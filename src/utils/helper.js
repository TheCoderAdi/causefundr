import toast from "react-hot-toast"

export const showToastNotifications = (message, type) => toast[type](message);
