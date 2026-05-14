#!/usr/bin/env bash
# Dev-server helper for the cloud container.
#
#   scripts/dev-server.sh start [port]   start vite in the demo workspace
#   scripts/dev-server.sh stop           kill the running server
#   scripts/dev-server.sh status         is it running, on which port?
#   scripts/dev-server.sh logs [-f]      print (or follow) the log
#   scripts/dev-server.sh url            print the URL the server is bound to
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$ROOT/.devserver"
PID_FILE="$STATE_DIR/pid"
PORT_FILE="$STATE_DIR/port"
LOG_FILE="$STATE_DIR/log"
mkdir -p "$STATE_DIR"

is_alive() { [[ -f $PID_FILE ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; }

case "${1:-start}" in
  start)
    if is_alive; then
      echo "dev server already running (pid $(cat "$PID_FILE"), port $(cat "$PORT_FILE" 2>/dev/null || echo ?))"
      exit 0
    fi
    PORT="${2:-5173}"
    : > "$LOG_FILE"
    # nohup so it survives this shell; strict-port so we know the URL.
    nohup pnpm -F demo exec vite --host 127.0.0.1 --port "$PORT" --strictPort \
      >>"$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "$PORT" > "$PORT_FILE"
    # Wait until vite prints "ready" or the process dies.
    for _ in $(seq 1 60); do
      if grep -q "ready in" "$LOG_FILE" 2>/dev/null; then
        echo "dev server up: http://127.0.0.1:$PORT (pid $(cat "$PID_FILE"))"
        exit 0
      fi
      if ! is_alive; then
        echo "dev server failed to start; tail of log:" >&2
        tail -n 40 "$LOG_FILE" >&2
        exit 1
      fi
      sleep 0.5
    done
    echo "dev server did not become ready in 30s" >&2
    tail -n 40 "$LOG_FILE" >&2
    exit 1
    ;;
  stop)
    if is_alive; then
      PID=$(cat "$PID_FILE")
      kill "$PID" 2>/dev/null || true
      # Give vite a moment, then SIGKILL if needed.
      for _ in $(seq 1 10); do kill -0 "$PID" 2>/dev/null || break; sleep 0.2; done
      kill -0 "$PID" 2>/dev/null && kill -9 "$PID" 2>/dev/null || true
      echo "stopped pid $PID"
    else
      echo "not running"
    fi
    rm -f "$PID_FILE" "$PORT_FILE"
    ;;
  status)
    if is_alive; then
      echo "running (pid $(cat "$PID_FILE"), port $(cat "$PORT_FILE"))"
    else
      echo "stopped"
      exit 1
    fi
    ;;
  logs)
    shift || true
    if [[ "${1:-}" == "-f" ]]; then tail -f "$LOG_FILE"; else cat "$LOG_FILE"; fi
    ;;
  url)
    is_alive || { echo "not running" >&2; exit 1; }
    echo "http://127.0.0.1:$(cat "$PORT_FILE")"
    ;;
  *)
    echo "usage: $0 {start [port]|stop|status|logs [-f]|url}" >&2
    exit 2
    ;;
esac
