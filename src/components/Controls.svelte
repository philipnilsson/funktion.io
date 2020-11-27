<script lang="ts">
  import { clamp } from '../utils.ts'
  
  export let move;
  
  let controls;
  
  function clearActive() {
    Array.from(controls.children).forEach(el_ch => {
      el_ch.classList.remove('active')
    })
  }

  function leave() {
    move(0)
    clearActive()
  }

  function touchMove(ev: TouchEvent) {
    ev.preventDefault()

    const { clientX, clientY } =
      ev.touches[0]

    const g =
      ev.currentTarget! as SVGGElement

    const { x, y, width, height } =
      g.getBoundingClientRect()

    const i =
      clamp(0, Math.floor((clientX - x) / width * 3), 2)

    const j =
      clamp(0, Math.floor((clientY - y) / height * 3), 2)

    clearActive()

    const ix =
      j + j + j + i

    controls.children[ix].classList.add('active')

    move(1 + ix)
  }
  
  function enter(ev: MouseEvent | TouchEvent) {

    ev.preventDefault()

    const currentTarget =
      ev.currentTarget!

    const target =
      Array.from(currentTarget.children).indexOf(ev.target)

    clearActive()

    if (target >= 0) {
      move(target + 1)
      controls.children[target].classList.add('active')
    }

    return false
  }
</script>

<style>
  .control {
    cursor: pointer;
    transform-origin: 50% 50%;
    transition: fill .125s;
  }

  #controls_svg {
    touch-action: none;
    position: fixed;
    height: 40vmin;
    max-height: 18vh;
    right: 7%;
    bottom: 10vw;
  }
</style>

<svg
  id="controls_svg"
  viewBox="-75 0 982 909"
  xmlns="http://www.w3.org/2000/svg"
  >
  
  <g id="control_wrapper">
    <g
      bind:this={controls}
      id="controls"
      on:mouseenter|capture={enter}
      on:touchstart|capture={enter}
      on:mouseleave={leave}
      on:touchend={leave}
      on:touchmove={touchMove}
      fill="var(--blue)"
      stroke-width="125"
      stroke="#00000001"
    >
      <rect class="control" width="278" height="278" rx="95" />
      <rect class="control" x="313" width="275" height="278" rx="95" />
      <rect class="control" x="626" width="278" height="278" rx="95" />
      <rect class="control" y="314" width="278" height="278" rx="95" />
      <rect class="control" x="313" y="314" width="275" height="278" rx="95" />
      <rect class="control" x="626" y="314" width="278" height="278" rx="95" />
      <rect class="control" y="628" width="278" height="278" rx="95" />
      <rect class="control" x="313" y="628" width="275" height="278" rx="95" />
      <rect class="control" x="626" y="628" width="278" height="278" rx="95" />
    </g>
    
    <g fill="var(--white)" style="pointer-events: none">
      <path d="M208.544 133.5L117.044 214L84.5437 79L208.544 133.5Z" />
      <path d="M187.983 394.934L187.644 516.804L65 451.691L187.983 394.934Z" />
      <path d="M396.157 725.29L518.027 725.629L452.914 848.273L396.157 725.29Z" />
      <path d="M394.157 180.983L516.027 180.644L450.914 58L394.157 180.983Z" />
      <path d="M718.335 393.112L718.673 514.983L841.318 449.87L718.335 393.112Z" />
      <path d="M698.044 126.5L789.544 207L822.044 72L698.044 126.5Z" />
      <path d="M208.044 779.5L116.544 699L84.0437 834L208.044 779.5Z" />
      <path d="M697.544 786.5L789.044 706L821.544 841L697.544 786.5Z" />
      <circle cx="453.044" cy="453" r="50" />
    </g>          
  </g>
</svg>
