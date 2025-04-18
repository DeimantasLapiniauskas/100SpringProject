import { z } from "zod";

export const AddReviewSchema = z.object({
    rating: z
    .number()
    .min(1)
    .max(5),
    comment: z
    .string()
    .max(1000, {message: "Comment should not exeed 1000 characters"})
    .refine((val) => val.trim() !== "", {
        message: "Comment cannot be blank"
    })
})

