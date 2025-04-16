import { useState } from "react";
import EditVetButton from "../buttons/EditVetButton";

const VetCard = ({ vet, getPage, currentPage, pageSize }) => {
    const { firstName, lastName, email, phoneNumber, specialty, licenseNumber } = vet;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex justify-between items-center py-4 px-6 md:px-4 md:py-2 gap-4">
                <div className="lg:text-lg md:text-base sm:text-sm text-xs font-medium break-words w-full text-left">
                    {firstName} {lastName}
                </div>
                <EditVetButton
                    vet={vet}
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </div>

            {isExpanded && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    <p>E-mail: {email}</p>
                    <p>Phone: {phoneNumber}</p>
                    <p>Specialty: {specialty}</p>
                    <p>License: {licenseNumber}</p>
                </div>
            )}
        </div>
    )
}

export default VetCard;