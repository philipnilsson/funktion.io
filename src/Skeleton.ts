import { centroid, getOrientation } from "./utils"
import { minus, angleTo, rotate, plus, magnitude, scale, Point, mirror } from "./Linalg"

export const CLOCKWISE =
  1 as Orientation

export const COUNTER_CLOCKWISE =
  -1 as Orientation

export type Orientation =
  -1 | 1

export type Skeleton = {
  children : readonly Skeleton[],
  location : Point,
  names : readonly string[],
  distanceConstraint?: number,
  rotationConstraint?: readonly [number, number],
  globalRotationConstraint?: readonly [number, number],
  orientationConstraint?: Orientation,
  target?: Point,
  parent : null | Skeleton
}

export type PartialSkeleton = Omit<Skeleton, 'children' | 'parent' | 'location'> & {
  children?: PartialSkeleton[],
  location?: Point,
}

export function init(s : PartialSkeleton, parent : Skeleton | null = null) : Skeleton {
  const newS : Skeleton = {
    ...s,
    location: s.location || { x: 0, y: 0 },
    children: [],
    parent
  }

  newS.children =
    (s.children || []).map(c => init(c, newS))

  return newS
}

const ITERATIONS =
  100

type RotationConstraint = {
  child : Point,
  min : number,
  max : number
}

function runRotationConstraints(
  current : Point,
  parent : Point,
  rotationConstraints : readonly RotationConstraint[]
) : Point {
  let result =
    current

  if (rotationConstraints.length > 1) {
    throw new Error('Too hard!')
  }

  if (rotationConstraints.length === 1) {
    let { child: grandChild, min, max } =
      rotationConstraints[0]

    const joint =
      minus(parent, grandChild)

    const diff =
      minus(result, parent)

    const a =
      -angleTo(diff, joint)

    if (a < min) {
      result = plus(parent, rotate(joint, min))
    }

    if (a > max) {
      result =
        plus(parent, rotate(joint, max))
    }
  }

  return result
}

function runDistanceConstraint(s : Skeleton, node : Point, distance : number | undefined) {
  if (distance === void 0) {
    return node
  }
  const target =
    s.target || s.location

  let diff =
    minus(node, target)

  if (magnitude(diff) === 0) {
    diff =
      { x: Math.random(), y: Math.random() }
  }

  return plus(
    target,
    scale(diff, distance / magnitude(diff))
  )
}

function runOrientationConstraint(
  node : Point,
  child : Skeleton,
  parentLocation : Point
) : Point {
  if (!child.orientationConstraint) {
    return node
  }

  const orientation = getOrientation(
    child.location,
    node,
    parentLocation
  )

  if (orientation === -child.orientationConstraint) {
    return mirror(
      node,
      parentLocation,
      child.location,
    )
  }

  return node
}

export function FABRIK(s : Skeleton, iterations = ITERATIONS) : Skeleton {
  let result =
    s as Skeleton

  for (let i = 0; i < iterations; i++) {
    FABRIK_SINGLE(result)
  }

  return result
}

export function FABRIK_SINGLE(s : Skeleton) : Skeleton {
  const result =
    s

  FABRIK_FORWARDS(result)

  result.location =
    result.target || result.location

  FABRIK_BACKWARDS(result)

  return result
}

export function FABRIK_FORWARDS(s : Skeleton) : void {
  const suggestions : Point[] =
    []

  const target =
    s.target || s.location

  const current =
    target || { x: 0, y: 0 }

  for (const child of s.children) {
    FABRIK_FORWARDS(child)

    if (!target) {
      continue
    }

    let suggestedParentPos =
      s.location

    suggestedParentPos = runDistanceConstraint(
      child,
      s.location,
      child.distanceConstraint
    )

    if (s.parent) {
      suggestedParentPos = runOrientationConstraint(
        suggestedParentPos,
        child,
        s.parent!.location,
      )
    }

    suggestions.push(suggestedParentPos)
  }

  const location = suggestions.length
    ? centroid(suggestions)
    : current

  s.location = location
}

export function FABRIK_BACKWARDS(s : Skeleton, parent : Skeleton | null = null) : void {

  s.children.forEach(child => {

    const rotationConstraint = []

    if (child.rotationConstraint) {
      rotationConstraint.push({
        child: parent!.location,
        min: child.rotationConstraint[0],
        max: child.rotationConstraint[1],
      })
    }

    if (child.globalRotationConstraint) {
      rotationConstraint.push({
        child: plus(s.location, { x: -1, y: 0 }),
        min: child.globalRotationConstraint[0],
        max: child.globalRotationConstraint[1],
      })
    }

    child.location = runRotationConstraints(
      child.location,
      s.target || s.location,
      rotationConstraint
    )

    child.location = runDistanceConstraint(
      s,
      child.location,
      child.distanceConstraint
    )

    child.location = runOrientationConstraint(
      child.location,
      child,
      s.location
    )

    FABRIK_BACKWARDS(child, s)
  })
}

export type Limbs<Key extends string> = {
  [key in Key]: Point[]
}

export function mkLimbs<Key extends string>(
  s : Skeleton,
) : Limbs<Key> {
  const result : Limbs<Key> =
    {} as any

  for (const l of s.children.map(mkLimbs)) {
    for (const n of Object.keys(l) as Key[]) {
      result[n] = result[n] || []
      result[n] = [...result[n], ...l[n]]
    }
  }

  for (const n of s.names as Key[]) {
    result[n] = result[n] || []
    result[n] = [...result[n], s.location]
  }

  return result
}
