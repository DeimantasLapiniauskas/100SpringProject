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

export const DeletePostModal = ({
  onConfirm,
  postTitle,
  isModalOpen,
  setIsModalOpen,
}) => {
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
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
