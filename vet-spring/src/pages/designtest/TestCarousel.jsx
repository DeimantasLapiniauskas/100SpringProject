//import HomePagePawArrow from "../../assets/pawss.png"; 

const TestCarousel = () => {
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

export default TestCarousel;

//TO TEST A PLACEHOLDER. INSERT INTO HomePage.jsx , at the very end like this:

// </main>

// <div className="w-full bg-[#6A7AFF] py-12 mt-12 rounded-t-[50px] shadow-lg">
//     <TestCarousel />
    
// </div>

// </div>
// );
// };

//OR ANOTHER VERSON HOW TO WHRITE COMMENT WITH {}
{/* <div className="w-full bg-[#6A7AFF] py-12 mt-12 rounded-t-[50px] shadow-lg">
<TestCarousel />

</div> */}