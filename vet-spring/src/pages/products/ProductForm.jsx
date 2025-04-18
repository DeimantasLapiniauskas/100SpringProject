import { addProduct, updateProduct } from "@/utils/helpers/addEditProduct";
import ModalContext from "@/utils/helpers/modalContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SimpleDropzone } from "./SimpleDropzone";
import { addProductImage } from "@/utils/helpers/addProductImage";

const ProductForm = ({ product, getPage, currentPage, pageSize }) => {
  const { setAddModalID, setEditModalID } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      category: "",
      imageFile: null,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState(null);
  const categoriesSelect = ["Medicine", "Food", "Toys"];

  useEffect(() => {
    if (product) {
      setValue("name", product.name || "");
      setValue("description", product.description || "");
      setValue("price", product.price ? product.price.toString() : "");
      setValue("stockQuantity", product.stockQuantity ? product.stockQuantity.toString() : "");
      setValue("category", product.categories?.[0]?.name || "");
      setPreviewUrl(product.imageUrl || null);
    }
  }, [product, setValue]);

  const updatePreview = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    setImageError(null);

    try {
      let imageUrl = product?.imageUrl || "";
      if (data.imageFile) {
        imageUrl = await addProductImage(data.imageFile);
      }

      if (!data.category) {
        throw new Error("Please select a category");
      }

      const payload = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity, 10),
        imageUrl,
        categories: [{ name: data.category }],
      };

      if (product?.id) {

        await updateProduct(product.id, payload);
        await getPage(pageSize, currentPage);
        setEditModalID("");
      } else {
        await addProduct(payload);
        await getPage(pageSize, currentPage);
        setAddModalID("");
      }

      reset();
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error details: ", error.response?.data || error.message);
      setSubmitError(error.response?.data?.message || error.message || "Failed to submit the form.");
    } finally {
      setIsLoading(false);
      setValue("imageFile", null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="  text-center"
    >
      {submitError && <p className="bg-red-700 text-white">{submitError}</p>}
      <div>
        <div className="text-center">
          <label htmlFor="name" className="font-bold text-lg text-white">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-text-select"
            {...register("name", {
              required: "Product name is required",
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters",
              },
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            placeholder="Product name"
          />
          <div className="text-red-500">
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        </div>

        <div className="text-center">
          <label htmlFor="description" className="font-bold text-lg text-white ">
            Description:
          </label>
          <textarea
            id="description"
            className="form-text-select"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
            rows="1"
            placeholder="Product description"
          />
          <div className="text-red-500">
            {errors.description && <p>{errors.description.message}</p>}
          </div>
        </div>

        <div className="text-center">
          <label htmlFor="price" className="font-bold text-lg text-white">
            Price:
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            className="form-text-select"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 0.01,
                message: "Price must be greater than 0",
              },
            })}
            placeholder="Price"
          />
          <div className="text-red-500">
            {errors.price && <p>{errors.price.message}</p>}
          </div>
        </div>

        <div className="text-center">
          <label
            htmlFor="stockQuantity"
            className="font-bold text-lg text-white"
          >
            Stock Quantity:
          </label>
          <input
            type="number"
            id="stockQuantity"
            className="form-text-select"
            {...register("stockQuantity", {
              required: "Stock quantity is required",
              min: {
                value: 0,
                message: "Stock quantity cannot be negative",
              },
            })}
            placeholder="Stock quantity"
          />
          <div className="text-red-500">
            {errors.stockQuantity && <p>{errors.stockQuantity.message}</p>}
          </div>
        </div>

        <div>
          <div className="text-center">
            <label htmlFor="category" className="font-bold text-lg text-white">
              Category:
            </label>
            <select
              id="category"
              className="form-text-select"
              defaultValue={product?.categories?.[0]?.name}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="" hidden>
                Select a category
              </option>
              {categoriesSelect.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="text-red-500">
              {errors.category && <p>{errors.category.message}</p>}
            </div>
          </div>
        </div>

        <div className="text-center">
          <label htmlFor="imageFile" className="font-bold text-lg text-white">
            Product Image (optional):
          </label>
          <SimpleDropzone
            onDrop={(file, error) => {
              setValue("imageFile", file, { shouldValidate: true });
              setImageError(error);
              updatePreview(file);
            }}
            previewUrl={previewUrl}
            error={imageError || errors.imageFile?.message}
          />
          <div className="text-red-500">
            {errors.imageFile && <p>{errors.imageFile.message}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;