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

    /////////////////////////////

    //EDGAR NavBar Design 2025-03-28; Stays horizontal even on when less than 640px; 375px and smaller:
//<nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]"></nav>

//VLADIMIR NavBar Design 2025-03-28; transforms into vertical when less than 640px; 375px and smaller:
{/* <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-auto bg-[#6A7AFF] rounded-[10px] border-2 border-[#CBC5C5]
 flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-[5rem] py-2 gap-2 sm:gap-0"></nav> */}

//  VLADIMIR PetList.jsx Title Design 2025-03-28; 
//        {/* Top Section - Future Image & Text */}
//        <main className="flex flex-col sm:flex-row items-center justify-center gap-4 py-22">
//        {/* Text Section */}
//        <h1 className=" text-black lg:text-4xl md:text-2xl sm:text-lg text-base text-center">
//          Happy Hearts<br />Welcomes Your Pet!
//        </h1>
//      </main>

//Comment for initial commit for KOM-124 18:22 03/04/2025

//Comment for commit for KOM-124 13:28 11/04/2025 before merge main

//Comment for commit for KOM-61.2 12:35 24/04/2025 before merge main