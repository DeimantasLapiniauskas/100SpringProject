import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialogBase";
import { Button } from "@/components/ui/buttonBase";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/inputBase";
import { useState } from "react";
import { verifyPaswword } from "@/utils/helpers/posts";

export const DeletePostModal = ({
  handleDelete,
  postTitle,
  isModalOpen,
  setIsModalOpen,
}) => {

const [message, setMessage] = useState(null)
const [password, setPassword] = useState();
const [error, setError] = useState(null);

const onConfirm = async () => {

  try {
    const response = await verifyPaswword(password)
    const { message, success} = response.data
    if (success && message) {
      setMessage(message)
      handleDelete()
    }
  } catch (error) {
  const errorMessage = error.response?.data?.message ?? error.message?? "Unknown error"
  setError(errorMessage)
  }
}

  return (
    <div>
      <DialogRoot open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="permanent" size="responsive2" className="inline-flex items-center gap-2">
            Delete <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{postTitle}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div>
            <label htmlFor="password">Please Enter Password</label>
            <Input
            id="password"
            type="password"
            value={message ? message : password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            intent={error ? "error" : "default"}
            placeholder="Password"
            />
            {error && <p className="text:xs sm:text-sm md:text-base">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setPassword(null)
              }}
            >
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={onConfirm}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
};
