// Arguably we should make a difference between point / vector
// but it's hard to make TypeScript distinguish without creating
// separate classes which (probably?) adds some pointless perf.
// overhead

export type Point = {
  x : number,
  y : number
}

export function plus(p : Point, q : Point) {
  return {
    x: p.x + q.x,
    y: p.y + q.y
  }
}

export function scale(p : Point, d : number) : Point {
  return {
    x: p.x * d,
    y: p.y * d
  }
}

export function minus(p : Point, q : Point) {
  return plus(p, scale(q, -1))
}

export function rotate(p : Point, rads : number) : Point {
  const cos =
    Math.cos(rads)
  const sin =
    Math.sin(rads)
  return {
    x: cos * p.x - sin * p.y,
    y: sin * p.x + cos * p.y
  }
}

export function interpolate(
  a : Point,
  b : Point,
  t : number = 0.5
) {
  return plus(a, scale(minus(b, a), t))
}

export function magnitude(
  p : Point
) {
  return Math.sqrt(p.x * p.x + p.y * p.y)
}

export function normal(
  p : Point
) {
  return { x: p.y, y: -p.x }
}

export function unit(
  p : Point
) {
  return scale(p, 1 / magnitude(p))
}

export function moveTowards(
  from : Point,
  to : Point,
  distance : number
) {
  return plus(from, scale(unit(minus(to, from)), distance))
}

export function angleTo(
  u : { x : number, y : number },
  v : { x : number, y : number }
) : number {
  let angle = Math.atan2(
    u.x * v.y - u.y * v.x,
    u.x * v.x + u.y * v.y
  )

  if (angle > Math.PI)
    angle -= 2 * Math.PI

  if (angle < -Math.PI)
    angle += 2 * Math.PI

  return angle
}

export function dot(p : Point, q : Point) {
  return p.x * q.x + q.y * p.y
}

export function projectOnto(p : Point, v : Point) {
  return scale(v, dot(p, v) / (v.x * v.x + v.y * v.y))
}

export function mirror(
  p : Point,
  around1 : Point,
  around2 : Point
) {
  const v = minus(p, around1)
  const l = minus(around2, around1)
  const d = projectOnto(v, l)
  return plus(p, (scale(minus(d, v), 2)))

}
