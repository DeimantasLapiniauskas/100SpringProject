
import { PostRegister } from "./PostRegister";
import { useEntityData } from "@/hooks/useEntityData";


export const PostEditPage = () => {
 
const {initialData, error} = useEntityData()

  if (!initialData) return null;

  return (
    <>
      <PostRegister initialData={initialData} getPostError={error}/>
    </>
  );
};
