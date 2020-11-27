<script>
  import { clamp, createSmoothControlPoints } from '../utils.ts'
  import { plus, scale, angleTo, unit, normal, minus, interpolate, moveTowards } from '../Linalg.ts'
  import { move, cubic, line } from '../path.ts'
  
  export let lean_rad
  export let torso_p
  export let left;
  export let right;

  $: lean_torso =
    -lean_rad / Math.PI * 180
  
  $: waist_l =
    plus(left, { x: -380, y: -15 })

  $: waist_r =
    plus(right, {x: 400, y: 40 })

  $: armpit_r =
    { x: 458, y: 51 }

  $: armpit_l =
    { x: -482, y: 56 }

  $: groin = plus(
    interpolate(waist_r, waist_l),
    scale(unit(normal(minus(waist_l, waist_r))), 260)
  ) 

  $: lean =
    angleTo(minus(waist_r, waist_l), { x: 1, y: 0 }) / Math.PI * 180

  $: belt_center =
    interpolate(waist_l, moveTowards(waist_r, armpit_r, 100))

  $: pq =
    moveTowards(waist_r, armpit_r, 100)

  $: pr =
    moveTowards(waist_l, armpit_l, 100)

</script>

<g id="torso_group" transform="translate({torso_p.x} {torso_p.y}) rotate({lean_torso}) translate(0 -220)">

  <path
    d="{move(waist_l)} {cubic(...createSmoothControlPoints(waist_l, groin, waist_r))}"
    stroke-width="10"
    fill="var(--green)"
  />

  <path
    stroke-width="10"
    fill="var(--blue)"
    d="M -482.313 56.24 C -540.471 -118.57 -410.346 -299.0 -226.12 -299.0 H 227.07 C 408.98 -299.0 538.84 -122.766 484.96 50.98 L {waist_r.x} {waist_r.y} L {waist_l.x} {waist_l.y} L -482.313 56.24 Z"
  />

  <use href="#torso1" />

  <path
    fill="var(--black)"
    d="{move(waist_l)} {line(waist_r)} {line(pq)} {line(pr)} Z"
    />

  <rect
    transform="translate({belt_center.x} {belt_center.y}) rotate({-lean})"
    fill="var(--yellow)"
    x="-90"
    y="-50"
    width="180"
    height="100"
    rx="20"
    />
</g>
