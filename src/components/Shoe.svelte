<script>

  import { angleTo, minus } from '../Linalg.ts'
  import { spring } from 'svelte/motion';

  export let end;
  export let cp;
  export let orientation;
  export let on_floor;

  $: angle =
    -angleTo(minus(cp, end), { x: 0,y : -1 }) / Math.PI * 180
  
  let angle_toe =
    spring(-2.5)

  $: angle_toe.update(_ => on_floor
    ? -2.5
    : -sign * (-angleTo(minus(cp, end), { x: 0,y : -1 }) / Math.PI * 180)
  )

  $: sign =
    Math.sign(orientation)
</script>

<g fill="red" transform="translate({end.x} {end.y}) scale({-orientation}, 1)">
  <g transform="rotate({-sign * angle})">
    <use href="#ankle" />
  </g>
  <g transform="rotate({$angle_toe})">
    <use href="#foot" />
  </g>
</g>
