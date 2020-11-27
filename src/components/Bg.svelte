<script>
  import Clouds from './Clouds.svelte'
</script>

<svg
  id="background-svg"
  viewBox="-3750 -300 9140 4200"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
  <defs>
    <ellipse
      id="shadow"
      cx="820"
      cy="3000"
      rx="2600"
      ry="350"
      fill="var(--shadow)"
      />
    <g id="cloud">
      <circle
        cx="-919"
        cy="962"
        r="481"
        />
      <circle
        cx="-324.5"
        cy="721.5" r="721.5"
        />
      <circle
        cx="396.5"
        cy="721.5"
        r="506.5"
        />
      <circle
        cx="972"
        cy="1032"
        r="417"
        />
      <rect
        x="-954"
        y="897"
        width="1926"
        height="552"
        />
    </g>
  </defs>
  <Clouds />
</svg>
      