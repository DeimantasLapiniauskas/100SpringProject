import { z } from "zod";

export const AddReviewSchema = z.object({
    rating: z
    .number()
    .min(1, {message: "You must rate us if you want to leave your feedback"})
    .max(5),
    comment: z
    .string()
    .max(1000, {message: "Comment should not exeed 1000 characters"})
    .optional()
    // .refine((val) => val.trim() !== "", {
    //     message: "Comment cannot be blank"
    // })
})

