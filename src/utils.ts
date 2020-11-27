import { plus, minus, scale, Point } from "./Linalg"

export function centroid(ps : Point[]) {
  return scale(ps.reduce(plus, { x: 0, y: 0 }), 1 / ps.length)
}

export function getOrientation(
  p : Point,
  q : Point,
  r : Point,
) : -1 | 1 | 0 {
  const u = minus(q, r)
  const v = minus(p, q)
  return Math.sign(u.x * v.y - u.y * v.x) as -1 | 0 | 1
}

export function createSmoothControlPoints(p : Point, q : Point, r : Point, d = 0.4) : [Point, Point, Point] {
  const cp_1 = plus(q, scale(minus(p, r), d))
  const cp_2 = plus(q, (scale(minus(r, p), d)))
  return [cp_1, cp_2, r]
}

export function clamp(lb : number, x : number, ub : number) {
  return Math.max(lb, Math.min(x, ub))
}
