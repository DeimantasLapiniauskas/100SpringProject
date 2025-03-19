const TestCarousel = () => {
    return (
      <div className="w-full max-w-screen-xl mx-auto p-5">
        <div className="relative flex justify-center gap-8">
          {/* Placeholder Boxes */}
          <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
            <span className="text-xl font-semibold text-gray-800">
            <button type="submit" className="custom-purple-btn mt-4">Box 1</button>
            </span>
          </div>

          <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
            <span className="text-xl font-semibold text-gray-800">
            <button type="submit" className="custom-white-btn mt-4">Box 1</button>
            </span>
          </div>

          <div className="w-56 h-56 bg-[#97a0f1] flex justify-center items-center rounded-lg shadow-lg">
            <span className="text-xl font-semibold text-gray-800">
            <button type="submit" className="custom-white-btn mt-4">Box 1</button>
            </span>
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