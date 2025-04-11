import { useNavigate } from "react-router";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";

export const BadPageRequest = () => {
  const { setStatus } = useUI();
  const { Redirecting } = UIStatus;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-base sm:text-lg md:text-xl items-center justify-center text-red-900 sm:gap-1 md:gap-2 font-semibold">
      <p>400</p>
      <p>BAD REQUEST !</p>
      <p className="pb-1">Page does not exist...</p>
      <button
        type="button"
        className="py-0.5 px-5 rounded-[10px] bg- text-sm sm:text-base md:text-lg border-1 border-purple-800 text-purple-800 bg-pink-100 hover:bg-purple-300 mt-4"
        onClick={() => {
          setStatus(Redirecting);
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }}
      >
        🔙 Go Back
      </button>
    </div>
  );
};
