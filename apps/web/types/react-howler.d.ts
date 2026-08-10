declare module "react-howler" {
  import * as React from "react"

  export interface ReactHowlerProps {
    src: string | string[]
    format?: string[]
    playing?: boolean
    mute?: boolean
    volume?: number
    loop?: boolean
    preload?: boolean
    html5?: boolean
    onPlay?: () => void
    onPause?: () => void
    onStop?: () => void
    onEnd?: () => void
    onLoad?: () => void
    onLoadError?: (id: number, error: unknown) => void
    onPlayError?: (id: number, error: unknown) => void
    onSeek?: () => void
    ref?: React.Ref<ReactHowler>
  }

  export default class ReactHowler extends React.Component<ReactHowlerProps> {
    howler: any
    seek(time?: number): number
    duration(): number
    load(): void
    stop(): void
  }
}
