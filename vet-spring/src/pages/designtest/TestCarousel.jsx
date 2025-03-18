const TestCarousel = () => {
    return (
      <div className="w-full max-w-screen-xl mx-auto p-5">
        <div className="relative flex justify-center gap-8">
          {/* Placeholder Boxes */}
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

<button type="submit" className="custom-black-btn mt-4">Box 1</button>