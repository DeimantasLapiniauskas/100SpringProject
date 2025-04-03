import { useNavigate } from "react-router"

export const Unusual = (props) => {
const {error} = props
    const navigate = useNavigate()

    return (
        <div className="flex flex-col text-base sm:text-lg md:text-xl items-center justify-center text-red-900 sm:gap-1 md:gap-2 font-semibold">
            {error ? error : <h1 className="pb-1">Something went Wrong...</h1>}
           <button type="button" className="py-0.5 px-5 rounded-[10px] bg- text-sm sm:text-base md:text-lg border-1 border-purple-800 text-purple-80 bg-pink-100" onClick={() => {
            navigate(-1)
           }}>🔙 Go back</button>
        </div>
    )
}