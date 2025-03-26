import { Filter } from "lucide-react";

export const FilterIcon = () => {
    return (
    
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-indigo-600">
            <Filter className="text-white w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </div>
        </div>
    );
  }