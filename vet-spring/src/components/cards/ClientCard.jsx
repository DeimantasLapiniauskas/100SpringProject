import EditClientButton from "../admin/buttons/EditClientButton";


const ClientCard = ({ client, getPage, currentPage, pageSize }) => {
    const { firstName, lastName, phoneNubmer } = client;

    return (
        <div className="card card-side shadow-sm bg-[#97a0f1] text-[#000000] w-80">
            <div className="p-6">
                <div className="card-body  block break-words w-[16rem]">
                    <h2 className="card-title  block break-words w-[16rem]">{name}</h2>
                    <p className="py-2">{firstName}</p>
                    <p className="py-2">{lastName}</p>
                    <p className="py-2">{phoneNubmer}</p>
                </div>
            </div>
            <div className="card-actions">
                <EditClientButton
                    client={client}
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </div>
        </div>
    )
}

export default ClientCard;