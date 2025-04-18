const ProductModal = ({ product, onClose }) => {
  const { name, description, price, stockQuantity, imageUrl } = product;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#000]/75 flex items-center justify-center z-50 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-[#97a0f1] z-51 text-center rounded-lg shadow-lg p-4 sm:p-6 max-w-[90%] sm:max-w-lg w-full opacity-100 cursor-default relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border border-gray-500 hover:border-gray-700 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3 h-40 sm:h-auto bg-gray-200 rounded-lg flex items-center justify-center">

            <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />

          </div>
          <div className="w-full sm:w-2/3 flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold block break-all">{name}</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm sm:text-base">Price: {price} EUR</p>
              <p className="text-xs text-gray-700">Stock: {stockQuantity}</p>
            </div>
            <button className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 w-1/2 mx-auto">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm sm:text-base font-semibold text-left ">Description:</h3>
          <p className="text-sm sm:text-base text-left block break-all">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;