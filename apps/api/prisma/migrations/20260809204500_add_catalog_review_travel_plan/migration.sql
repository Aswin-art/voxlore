ALTER TABLE "Destination"
  ADD COLUMN "subtitle" TEXT;

ALTER TABLE "Festival"
  ADD COLUMN "organizer" TEXT,
  ADD COLUMN "status" TEXT NOT NULL DEFAULT 'Mendatang',
  ADD COLUMN "attendees" TEXT NOT NULL DEFAULT '—';

ALTER TABLE "Review"
  ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "helpfulCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

CREATE TABLE "AudioSpot" (
  "id" UUID NOT NULL,
  "destinationId" TEXT NOT NULL,
  "spotNumber" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "audioUrl" TEXT,
  "isFree" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "AudioSpot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AudioSpot_destinationId_spotNumber_key"
  ON "AudioSpot"("destinationId", "spotNumber");
CREATE INDEX "AudioSpot_destinationId_idx" ON "AudioSpot"("destinationId");
ALTER TABLE "AudioSpot"
  ADD CONSTRAINT "AudioSpot_destinationId_fkey"
  FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "TravelPlan" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "province" TEXT NOT NULL,
  "dateRange" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TravelPlan_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "TravelPlan_userId_createdAt_idx" ON "TravelPlan"("userId", "createdAt");
ALTER TABLE "TravelPlan"
  ADD CONSTRAINT "TravelPlan_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "TravelPlanItem" (
  "id" UUID NOT NULL,
  "travelPlanId" UUID NOT NULL,
  "festivalId" TEXT NOT NULL,
  CONSTRAINT "TravelPlanItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "TravelPlanItem_travelPlanId_festivalId_key"
  ON "TravelPlanItem"("travelPlanId", "festivalId");
CREATE INDEX "TravelPlanItem_travelPlanId_idx" ON "TravelPlanItem"("travelPlanId");
ALTER TABLE "TravelPlanItem"
  ADD CONSTRAINT "TravelPlanItem_travelPlanId_fkey"
  FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "TravelPlanItem_festivalId_fkey"
  FOREIGN KEY ("festivalId") REFERENCES "Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
