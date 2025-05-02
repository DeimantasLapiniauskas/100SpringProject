import toast from "react-hot-toast";

export const warningToast = (message) => {

    return toast(message, {
      icon: "⚠️",
      duration: 2000,
      style: {
        background: "#FCD34D",
        color: "#B91C1C",
      },
    }
  )};