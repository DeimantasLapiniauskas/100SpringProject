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

export const DeletePostModal = ({onConfirm, postTitle, isModalOpen, setIsModalOpen}) => {
    return (
        <div>
            <DialogRoot open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="permanent" size="responsive2">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete <strong>{postTitle}</strong>? This cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {setIsModalOpen(false)}}>Cancel</Button>
                <Button type="button" variant="primary" onClick={onConfirm}>Confirm Delete</Button>
              </DialogFooter>
            </DialogContent>
                  </DialogRoot>
        </div>
    )
}