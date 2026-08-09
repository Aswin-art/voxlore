<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## CRITICAL — Never kill Node / 9router

**Never, under any circumstance, kill/stop/terminate the `node` process or `9router`.**
- 9router runs as a node process and is the model router used by this session's models (DeepSeek, Gemini, Claude, etc.).
- Killing `node` kills 9router too, which disables all model agents and breaks the session. Fatal.
- NEVER run: `Stop-Process node`, `Get-Process node | Stop-Process`, `taskkill /F /IM node.exe`, `killall node`, `pkill node`.
- To stop only the web dev server, stop a single PID by port (e.g. `Get-NetTCPConnection -LocalPort 3000` → `Stop-Process -Id <PID>`), or Ctrl+C in its terminal. Never stop all node globally.
