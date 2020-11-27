<style>
  #legs {
    stroke-dasharray: 0 120 10000;
  }

  #legs2 {
    stroke-dasharray: 0 120 10000;
  }
</style>

<script lang="ts">
  import { clamp, createSmoothControlPoints } from '../utils.ts'
  import { interpolate } from '../Linalg.ts'
  import { move, cubic } from '../path.ts'
  import Shoe from './Shoe.svelte'
    
  export let points_l;
  export let points_r;
  export let orientation_r;
  export let orientation_l;
  export let on_floor_l;
  export let on_floor_r;

  function getPoint(distance, d) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', d)
    return path.getPointAtLength(distance)
  }
  
  $: cp_l =
    createSmoothControlPoints(points_l[0], points_l[1], points_l[2], 0.2)

  $: cp_r =
    createSmoothControlPoints(points_r[2], points_r[1], points_r[0], 0.2)

  $: cp_r_reversed =
    createSmoothControlPoints(points_r[0], points_r[1], points_r[2], 0.2)
  
  $: cp_2_1 =
    interpolate(points_l[2], cp_l[1], -.4)

  $: cp_2_2 =
    interpolate(points_r[2], cp_r[0], -.4)

  $: path_l =
    getPoint(300, `${move(points_l[0])} ${cubic(...cp_l)}`)
  
  $: path_r =
    getPoint(300, `${move(points_r[0])} ${cubic(...cp_r_reversed)}`)
  
</script>

<g id="legs_group">
  <Shoe
    on_floor={on_floor_l}
    end={points_l[0]}
    cp={path_l}
    orientation={orientation_l}
    />
  
  <Shoe
    on_floor={on_floor_r}
    end={points_r[0]}
    cp={path_r}
    orientation={orientation_r}
    />
  
  <path
    id="legs"
    stroke-width="240"
    stroke="var(--green)"
    d="{move(points_l[0])} {cubic(...cp_l)} {cubic(cp_2_1, cp_2_2, points_r[2])}"
    />

  <path
    id="legs2"
    stroke-width="240"
    stroke="var(--green)"
    d="{move(points_r[0])} {cubic(...cp_r_reversed)} {cubic(cp_2_2, cp_2_1, points_l[2])}"
    />
</g>
