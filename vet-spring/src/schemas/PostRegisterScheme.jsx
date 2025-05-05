import { z } from "zod";

export const PostRegisterSchema  = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Title cannot be blank",
    }),
  postType: z.enum(["News", "Blog", "Sale", "PetCare"], {
    message: "Post type is required",
  }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(2000, { message: "Content must not exceed 2000 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Content cannot be blank",
    }),
  imageFile: z.instanceof(File).optional().nullable(),
  imageUrl: z
    .string()
    .trim()
    .regex(/\.(jpg|jpeg|png|webp|gif)$/i, {
      message: "URL must end with .jpg, .png, .webp or .gif",
    })
    .max(255, { message: "URL must not exceed 255 characters" })
    .optional()
    .or(z.literal(null)),
});

