import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PostRegister } from "./PostRegister";

export const PostEditPage = () => {
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

//   const handleCancelEdit = () => {
//     if (initialData) {
//       const fullUrl = initialData.imageUrl?.startsWith("http")
//         ? initialData.imageUrl
//         : `${import.meta.env.VITE_API_URL}${initialData.imageUrl}`;
  
//       form.reset({
//         ...initialData,
//         imageFile: null,
//         imageUrl: initialData.imageUrl ?? null,
//       });
  
//       setPreviewUrl(fullUrl ?? null);
//       setUploadedImage(fullUrl ?? null);
//     }
//   };
  

  useEffect(() => {
    const fectchPost = async () => {
      try {
        const response = await getPostById(postId);
        console.log(response)
        setInitialData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fectchPost()
  }, [postId]);

  if (loading) return <div>loading</div>

  return <PostRegister initialData={initialData} />
};
