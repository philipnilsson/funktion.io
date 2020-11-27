<script>
  import { createSmoothControlPoints } from '../utils.ts'
  import { angleTo, minus } from '../Linalg.ts'
  import { move, cubic } from '../path.ts'
  
  export let arm;

  $: armControlPoints =
    createSmoothControlPoints(arm[0], arm[1], arm[2])
  $: angle_rad = -angleTo(minus(arm[0], armControlPoints[0]), { x:0, y: -1})
  $: angle = angle_rad / Math.PI * 180;

</script>

<g transform="translate({arm[0].x}, {arm[0].y}) rotate({angle})">
  <use href="#hand-path" />
</g>
<path
  d="{move(arm[0])} {cubic(...armControlPoints)}"
  stroke="var(--blue)"
  stroke-width="180"
/>
