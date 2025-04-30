import { Filter } from "lucide-react";

export const FilterIcon = () => {
    return (
          <div className="flex items-center justify-center rounded-full w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-indigo-600 hover:scale-110 transform transition duration-400 border border-white">
            <Filter className="text-white w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </div> 
    );
  }