"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ProgressProvider } from "@bprogress/next/app"
import { ThemeProvider } from "@/components/theme-provider"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 3,
        retryDelay: 3000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ProgressProvider
          height="4px"
          color="#1E2229"
          options={{ showSpinner: false }}
          shallowRouting
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ProgressProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
