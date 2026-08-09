import { Suspense } from "react"
import ErrorBoundary from "@/components/error-boundary"
import {
  ExploreContent,
  ExplorePageSkeleton,
} from "@/features/explore/components/explore-destinations"

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExplorePageSkeleton />}>
      <ErrorBoundary label="Eksplorasi">
        <ExploreContent />
      </ErrorBoundary>
    </Suspense>
  )
}
