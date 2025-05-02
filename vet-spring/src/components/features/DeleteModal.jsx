import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/uiBase/dialogBase";
import { Button } from "@/components/uiBase/buttonBase";
import { Input } from "@/components/uiBase/inputBase";
import { useUI } from "@/context/UIContext";
import { useDeleteModal } from "@/context/DeleteModalContext";

export const DeleteModal = () => {
  const { isLoading } = useUI();

  const {
    isDeleteModalOpen,
    selectedEntity: entity,
    handleCloseModal,
    onConfirm,
    setFieldErrors,
    fieldErrors,
    setError,
    error,
    setPassword,
    password
  } = useDeleteModal();

  if(!entity) return

  return (
    <DialogRoot
      open={isDeleteModalOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal();
      }}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="absolute right-3 top-1.5">⚠️</span>
            Delete Post
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete:
            <strong>{entity.title || entity.rating}</strong> ?
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
              setFieldErrors({});
            }}
            intent={
              error ? "error" : fieldErrors.newPassword ? "error" : "default"
            }
            placeholder="Password"
            variant="default"
          />
          {error && (
            <p className="text:xs sm:text-sm md:text-base text-red-600">
              {error}
            </p>
          )}
          {Array.isArray(fieldErrors.newPassword) ? (
            fieldErrors.newPassword.map((msg, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm md:text-base text-red-600"
              >
                {msg}
              </p>
            ))
          ) : fieldErrors.newPassword ? (
            <p className="text-xs sm:text-sm md:text-base text-red-600">
              {fieldErrors.newPassword}
            </p>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            <span className="flex items-center gap-1 group w-full justify-center">
              <span className="hidden group-hover:inline">💥</span>
              <span>{isLoading ? "Verifying..." : "Confirm Delete"}</span>
            </span>
          </Button>
        </DialogFooter>
        <div className="absolute pt-1 sm:pt-1.5 md:pt-2 right-8">
          <DialogClose asChild>
            <Button type="button" variant="close" size="sm">
              Close !
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
