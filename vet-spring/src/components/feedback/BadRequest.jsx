import { useNavigate } from "react-router"

export const BadRequest = () => {

const navigate = useNavigate();

    return (
        <div className="flex flex-column items-center justify-center">
            <p>400</p>
            <p>BAD REQUEST </p>
            <p>Page does not exist...</p>
            <button type="button" className="p-5 rounded-[10px]" onClick={() => {
                navigate(-1)
               }}>Go back</button>
        </div>
        
    )
}