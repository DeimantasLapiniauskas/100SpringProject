export const BandytiDesign = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-5 relative">
      {/* Container for Boxes */}
      <div className="relative flex justify-center gap-8">
        {/* 1st Box */}
        <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
          <span className="figma-headline-4 !font-bold">
            <button type="submit" className="custom-purple-btn mt-4">
              Box 1
            </button>
          </span>
        </div>

        {/* 2nd Box */}
        <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
          <span className="figma-headline-4 !font-bold">
            <button type="submit" className="custom-white-btn mt-4">
              Box 2
            </button>
          </span>
        </div>

        {/* 3rd Box */}
        <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
          <span className="figma-headline-4 !font-bold">
            <button type="submit" className="custom-white-btn mt-4">
              Box 3
            </button>
          </span>
        </div>

        {/* 4th Box with Paw Buttons Inside */}
        <div className="flex items-center justify-center bg-[#D69052] py-4 px-8 rounded-lg">
          <button className="custom-paw-left-btn"></button>
          <span className="figma-headline-4 text-black font-bold mx-4">
            View More
          </span>
          <button className="custom-paw-right-btn"></button>
        </div>
      </div>
    </div>
  );
};

export default BandytiDesign;




    //   <div className="grid place-items-center h-100">
    //     <p>Not implemented :c</p>
    //     <div className="bg-[#6A7AFF] w-72 h-48 flex items-center justify-center rounded-lg">
    //       <button type="submit" className="custom-pink-btn">
    //         Test
    //       </button>
    //     </div>
    //   </div>