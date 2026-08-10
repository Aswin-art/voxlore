CREATE TABLE "ReviewVote" (
  "id" UUID NOT NULL,
  "reviewId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReviewVote_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewVote_reviewId_userId_key"
  ON "ReviewVote"("reviewId", "userId");
CREATE INDEX "ReviewVote_userId_idx" ON "ReviewVote"("userId");

ALTER TABLE "ReviewVote"
  ADD CONSTRAINT "ReviewVote_reviewId_fkey"
  FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "ReviewVote_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

UPDATE "Review" AS review
SET "helpfulCount" = votes.count
FROM (
  SELECT "reviewId", COUNT(*)::INTEGER AS count
  FROM "ReviewVote"
  GROUP BY "reviewId"
) AS votes
WHERE review.id = votes."reviewId";
