<script lang="ts">
  import { spring } from 'svelte/motion';
  import { writable } from 'svelte/store';
  
  import { mkLimbs, FABRIK } from '../Skeleton'  
  import { POSES, POSE_LIST, PELVIS } from '../Poses'
  import { createSmoothControlPoints } from '../utils';
  import { plus, minus, angleTo, scale, rotate } from '../Linalg';
  
  import Torso from './Torso.svelte'
  import Legs from './Legs.svelte'
  import Head from './Head.svelte'
  import Bg from './Bg.svelte'
  import Defs from './Defs.svelte'
  import Arm from './Arm.svelte'
  import Controls from './Controls.svelte'
  import Hi from './Hi.svelte'
  import Nav from './Nav.svelte'
  import Bubble from './Bubble.svelte'
  
  let _i =
      0
  
  function move(j: number) {
    $excited = false;
    $look = false;
    _i = j
  }

  let excited =
      writable(false)
  
  let look =
      writable(false)
  
  $: i = 
    $look ? 11 : ($excited ? 10 : _i);
  
  $: pose =
    POSE_LIST[i]
  
  let dy =
      spring(POSE_LIST[_i].HEAD)
  
  $: $dy =
    { x: pose.HEAD.x, y: pose.HEAD.y }

  let orientation_l =
      spring(POSE_LIST[_i].LEG_ORIENTATION_L)
  
  let orientation_r =
      spring(POSE_LIST[_i].LEG_ORIENTATION_R)

  $: $orientation_l =
    pose.LEG_ORIENTATION_L
  
  $: $orientation_r =
    pose.LEG_ORIENTATION_R

  $: pose_data =
    POSES[i]
  
  $: skeleton =
    pose_data.skeleton
  
  let limbs =
      spring(mkLimbs(POSES[_i].skeleton))
  
  $: lean_rad =
    angleTo(minus($limbs.torso[0], $limbs.torso[1]), { x: 0, y: -1})
  
  $: torso_l =
    rotate(scale(minus($limbs.leftLeg[2], $limbs.leftArm[2]), 0.8), lean_rad)
  
  $: torso_r =
    rotate(scale(minus($limbs.rightLeg[2], $limbs.rightArm[2]), 0.8), lean_rad)

  function runDynamics(t: number) {
    t = t / 128

    let swiggity = 35;
    let swooty = 35;
    let speed = t * 1.1
    let hand_r = pose_data.rightHand
    let hand_l = pose_data.leftHand
    
    if ($excited) {
      speed = t * 3
      hand_r.target = plus(plus(PELVIS, pose.HAND_R), { 
        x: 100 * Math.sin(speed),
        y: -60 * Math.cos(speed)
      })
      
      hand_l.target = plus(plus(PELVIS, pose.HAND_L), {
        x: 100 * Math.cos(speed),
        y: 60 * Math.sin(speed)
      })
    } else if (i === 11) {
      speed = t / 2
      swiggity = 0
      swooty = 15
    } else if (i === 0) {
      speed = t / 2
      swiggity = 0
      swooty = 45
      hand_l.target =
        plus(skeleton.target, { x: -400, y: 300 })
      
      if (t < 30) {
        hand_r.target = plus(plus(PELVIS, pose.HAND_R), { 
          x: 180 * Math.sin(t * 2),
          y: 10 * Math.sin(t * 2),
        })
      } else {
        hand_r.orientationConstraint =
          1
        hand_r.target =
          plus(skeleton.target, { x: 350, y: 350 })
      }
    }

    skeleton.target =
      plus(plus(PELVIS, pose.TORSO), {
        x: Math.cos(speed) * swiggity,
        y: Math.sin(speed) * swooty
      })
    
    $limbs = 
      mkLimbs<Limb>(FABRIK(skeleton, 10))    

    requestAnimationFrame(runDynamics)
  }   
  
  requestAnimationFrame(runDynamics)

</script>

<style>
  header {
    position: absolute;
    color: var(--blue);
    font-size: 1rem;
    font-size: 2vh;
    font-weight: 700;
    line-height: 2;
    top: 3vh;
    left: 4vw;
  }

  #guy_svg {
    z-index: 1000;
  }
  
</style>

<div>
  <header>funktion.io</header>
  <article>
    <aside>      
      <Bg />
      <svg
        id="guy_svg"
        viewBox="-3750 -300 9140 4200"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <Defs />
        <g class="svg_content">
          <g transform="translate(800 400)">
            <g id="guy_group" transform="scale(0.9)">
              <Legs
                points_l={$limbs.leftLeg}
                points_r={$limbs.rightLeg}
                orientation_r={$orientation_r}
                orientation_l={$orientation_l}
                on_floor_l={pose.ON_FLOOR_L}
                on_floor_r={pose.ON_FLOOR_R}
                />

              <Torso
                torso_p={$limbs.torso[1]}
                lean_rad={lean_rad}
                left={torso_l}
                right={torso_r}
                />
              <Head
                torso_p={$limbs.torso[1]}
                lean_rad={lean_rad}
                dy={$dy}
                />
              <Arm arm={$limbs.leftArm} />
              <Arm arm={$limbs.rightArm} />
            </g>
          </g>
          
          <Bubble
            excited={$excited}
            head_p={$limbs.torso[1]}
            lean_rad={lean_rad}
            />
        </g>
      </svg>
      
      <Controls move={move} />      

    </aside>
    
    <Hi excited={excited} />
    <Nav look={look} />
    
  </article>
</div>
