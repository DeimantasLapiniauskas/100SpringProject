
import  { Toaster } from "react-hot-toast";

export const CustomToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 2000,
      style: {
        borderRadius: "10px",
        background: "#1e293b",    
        color: "#f1f5f9",
        padding: "15px 20px",
        fontSize: "1rem",
      },
      success: {
        icon: "✅",
        duration: 3500,
        style: {
           background: "rgba(0, 204, 0, 0.8)",
          color: "#fff",
        },
      },
      error: {
        icon: "📛",
        duration: 5000,
        style: {
          background: "rgba(204, 0, 0, 0.8)",
          color: "#fff",
        },
      },
      loading: {
        duration: Infinity,
        icon: "⏳",
      },
      warning: {
        icon: "⚠️",
        duration: 2000,
        style: {
          background: "#FACC15",
          color: "#B91C1C"
        }
      }
    }}
    containerStyle={{
        top: "6rem",
        // opacity: 0.9, 
      }}
  />
);

// toast((t) => (     --->Custom Toastas
//     <div className="flex items-center gap-2">
//       <CheckIcon className="text-green-500" />
//       <span>Custom toast message</span>
//     </div>
//   ));
  
