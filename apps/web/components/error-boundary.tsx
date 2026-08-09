"use client"

import * as React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  label?: string
  onReset?: () => void
}

interface ErrorBoundaryState {
  error: unknown
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null, children: props.children }
  }

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
    return { error }
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.error(`[ErrorBoundary] ${this.props.label ?? "Komponen"} gagal`, error, info)
  }

  static getDerivedStateFromProps(
    nextProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ): Partial<ErrorBoundaryState> | null {
    if (nextProps.children !== prevState.children) {
      return { children: nextProps.children, error: null }
    }
    return null
  }

  private handleReset = (): void => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render(): React.ReactNode {
    const { fallback, label = "Komponen" } = this.props
    const { error } = this.state

    if (error === null || error === undefined) {
      return this.state.children
    }

    if (fallback !== undefined) {
      return fallback
    }

    return (
      <div
        role="alert"
        className="w-full rounded-3xl border border-border bg-card p-6 text-center"
      >
        <p className="text-sm font-semibold text-foreground">
          Terjadi kesalahan pada {label}
        </p>
        <button
          type="button"
          onClick={this.handleReset}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Coba Lagi
        </button>
      </div>
    )
  }
}