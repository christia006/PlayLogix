import z from "zod";

export const gameReviewSchema = z
  .object({
    rating: z.number(),
    content: z
      .string()
      .min(2),
  })
  .required();

export type GameReviewSchema = z.infer<typeof gameReviewSchema>;
