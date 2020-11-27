<script>
  import { spring } from 'svelte/motion'
  
  export let excited;
  export let head_p;
  export let lean_rad;
 
  $: lean =
    -lean_rad / Math.PI * 180
  
</script>

<style>
  #bubble {
    opacity: 0;
    transform: scale(0.8) translate(-800px, -850px);
    transition: opacity, transform;
    transition-duration: .15s;
  }

  #bubble.excited {
    transform:  translate(-800px, -850px);
    opacity: 1;
    transition-delay: .2s;
  }
</style>

<g transform="translate({head_p.x} { head_p.y}) rotate({lean}) translate(0, -220)">
  <g id="bubble" class="{excited ? 'excited' : ''}" fill="var(--shadow)">
    <path
      d="M886.765 259.38C883.414 446.056 806.704 501.562 441.197 495.001C75.6898 488.44 1.26721 416.49 4.37178 243.541C7.99731 41.5705 74.6289 1.18269 449.94 7.91983C825.252 14.657 890.116 72.705 886.765 259.38Z"
    />
    <path
      d="M821.906 591.836C812.821 607.675 301.153 461.969 413.135 463.979C525.117 465.989 855.5 430 752.5 469.5C649.5 509 830.991 575.997 821.906 591.836Z"
    />
    <path
      d="M446 206.001C446 254.05 407.049 293.001 359 293.001C329.5 293.001 272 254.05 272 206.001C272 157.952 310.952 119.001 359 119.001C407.049 119.001 446 157.952 446 206.001Z"
      fill="var(--orange)"
    />
    <path
      d="M610 206.001C610 254.05 540.5 293.001 523 293.001C474.951 293.001 436 254.05 436 206.001C436 157.952 474.951 119.001 523 119.001C571.049 119.001 610 157.952 610 206.001Z"
      fill="var(--orange)"
    />
    <path
      d="M584 258.001L446 384.501L307 268.501L446 199.501L584 258.001Z"
      fill="var(--orange)"
    />
  </g>

</g>
