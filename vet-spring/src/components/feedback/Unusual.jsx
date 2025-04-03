import { useNavigate } from "react-router"

export const Unusual = (props) => {
const {error} = props
    const navigate = useNavigate()

    return (
        <div className="flex flex-column items-center justify-center">
            {error ? error : <h1>Something went Wrong...</h1>}
           <button type="button" className="p-5 rounded-[10px]" onClick={() => {
            navigate(-1)
           }}>Go back</button>
        </div>
    )
}