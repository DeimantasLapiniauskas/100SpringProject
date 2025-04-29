import {Button} from "@/components/uiBase/buttonBase"
import { useList } from "@/context/ListContext"

export const ClearAllButton = () => {

    const { clearAll } = useList()

    return (
        <Button onClick={clearAll}
        size="xs"
        className=" bg-gray-200 hover:bg-gray-200 rounded-[20px] text-info-content hover:text-warning-content border border-gray-400 hover:border-warning-content shadow-sm">Clear</Button>
    )

}