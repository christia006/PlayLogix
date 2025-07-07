import prisma from "../../prisma/prismaClient";

export default {
  async getAverageRating(gameId: number) {
    try {
      const ratingAggregation = await prisma.review.aggregate({
        where: { gameId },
        _avg: {
          rating: true,
        },
      });
      return ratingAggregation._avg.rating?.toFixed(1) || 0;
    } catch (error) {
      console.error(error);
    }
  },

  async getExistingReview(gameId: number, userId?: number) {
    try {
      if (userId) {
        return await prisma.review.findUnique({
          where: {
            userId_gameId: { userId, gameId },
          },
        });
      } else {
        return await prisma.review.findUnique({
          where: { id: gameId },
          select: {
            gameId: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
