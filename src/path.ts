import type { Point } from "./Linalg"

export function move(p : Point) {
  return `M ${p.x} ${p.y}`
}

export function line(p : Point) {
  return `L ${p.x} ${p.y}`
}

export function cubic(p : Point, q : Point, r : Point) {
  return `C ${p.x} ${p.y} ${q.x} ${q.y} ${r.x} ${r.y}`
}
