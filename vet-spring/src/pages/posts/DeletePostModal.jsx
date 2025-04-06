import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/uiBase/dialogBase";
import { Button } from "@/components/uiBase/buttonBase";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/uiBase/inputBase";
import { useState } from "react";
import { verifyPaswword } from "@/utils/helpers/posts";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";

export const DeletePostModal = ({
  handleDelete,
  postTitle,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const { setStatus } = useUI();
  const { Loading, Success, Unusual, Error } = UIStatus;

  const isMounted = useIsMounted();

  const onConfirm = async () => {
    try {
      setStatus(Loading);
      const response = await verifyPaswword(password);
      if (!isMounted.current) return;

      const { message, success } = response.data;

      if (success && message) {
        setMessage(message);
        handleDelete();
        setStatus(Success);
      } else {
        setStatus(Unusual);
      }
    } catch (error) {
      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      const fieldErrors = error.response?.data?.data;
      setStatus(Error);

      if (errorMessage === "Validation failed" && fieldErrors) {
        setFieldErrors(fieldErrors);
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div>
      <DialogRoot open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            variant="permanent"
            size="responsive2"
            className="inline-flex items-center gap-2"
          >
            Delete
            <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="absolute right-3 top-1.5">⚠️</span>
              Delete Post
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete : <strong>{postTitle}</strong> ?
            </DialogDescription>
          </DialogHeader>
          <div>
            <label
              htmlFor="password"
              className="text-xs sm:text-sm md:text-base text-info-content"
            >
              Please Enter Your Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              intent={
                error ? "error" : fieldErrors.newPassword ? "error" : "default"
              }
              placeholder="Password"
              variant="default"
            />
            {error && (
              <p className="text:xs sm:text-sm md:text-base">{error}</p>
            )}
            {Array.isArray(fieldErrors.newPassword) ? (
              fieldErrors.newPassword.map((message, idx) => (
                <p
                  key={idx}
                  className="text-xs sm:text-sm md:text-base text-red-600"
                >
                  {message}
                </p>
              ))
            ) : fieldErrors.newPassword ? (
              <p className="text-xs sm:text-sm md:text-base text-red-600">
                {fieldErrors.newPassword}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="button" variant="danger" onClick={onConfirm}>
              <span className="flex items-center gap-1 group w-full justify-center">
                <span className="hidden group-hover:inline">💥</span>
                <span>Confirm Delete</span>
              </span>
            </Button>
          </DialogFooter>
          <div className="absolute pt-1 sm:pt-1.5 md:pt-2 right-8">
            <Button
              type="button"
              variant="cancel"
              size="sm"
              onClick={() => {
                setIsModalOpen(false);
                setPassword(null);
                setError(null);
                setFieldErrors("");
              }}
            >
              Cancel !
            </Button>
          </div>
        </DialogContent>
      </DialogRoot>
    </div>
  );
};
