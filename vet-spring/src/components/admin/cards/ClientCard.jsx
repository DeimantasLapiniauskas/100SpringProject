import { useState } from "react";
import EditClientButton from "../buttons/EditClientButton";
import DeleteAccountButton from "../buttons/DeleteAccountButton";
import ChangeAccountPasswordButton from "../buttons/ChangeAccountPasswordButton";


const ClientCard = ({ client, getPage, currentPage, pageSize }) => {
    const { firstName, lastName, phoneNumber, accountId } = client;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <li
            className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-center py-4 px-6 md:px-4 md:py-2 gap-4">
                <div className="lg:text-lg md:text-base sm:text-sm text-xs font-medium break-words w-full text-left">
                    {firstName} {lastName}
                </div>
                <EditClientButton
                    client={client}
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
                <DeleteAccountButton
                    id={accountId}
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
                <ChangeAccountPasswordButton
                    accountId={accountId}
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </div>

            {isExpanded && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    <p>Phone: {phoneNumber}</p>
                </div>
            )}
        </li>
    )
}

export default ClientCard;