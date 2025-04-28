import { PostRegister } from "./PostRegister";
import { useEntityData } from "@/hooks/useEntityData";
import { useUI } from "@/context/UIContext";
import { Redirecting } from "@/components/feedback/Redirecting";
import { Loading } from "@/components/feedback/Loading";

export const PostEditPage = () => {
 
const { isRedirecting, isLoading } = useUI()
const {initialData, error} = useEntityData({redirect : true})

if (isRedirecting) {
  return <Redirecting />;
}

if (isLoading) {
  return <Loading/>
}

  if (!initialData) return null;

  return (
    <>
      <PostRegister initialData={initialData} getPostError={error}/>
    </>
  );
};
