export const Error = (props) => {

  const {error, setVisible} = props;

  if(error == undefined || error == null ){
    return
  }
 
  const errorMessages = Object.values(error);

  const hide = () => {
    setVisible(false);
  }
  
  return (
    <div role="alert" className="alert alert-error mt-4 flex justify-between bg-[#ffaca6]  border-[#932e4e]">
      {typeof error === "string" ? (
        <div>{error}</div>
      ) : (
        <div>
          {errorMessages.map((e, i) => {
            return <li key={i}>{e}</li>;
          })}
        </div>
      )}
      
      <div onClick={()=>hide()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

