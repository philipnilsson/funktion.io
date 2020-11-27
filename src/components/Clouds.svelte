<script>
  let cloud1 = { p: 5400,  v: -4  }
  let cloud2 = { p: -300,  v: -10 }
  let cloud3 = { p: -300,  v: 8   }
  let cloud4 = { p: 1700,  v: 5   }
  let cloud5 = { p: -2700, v: 3   }

  let old_t =
    0
  
  function lerpCloud(p, dt) {
    p.p += p.v * dt * .35
    if (p.p > 6000) {
      p.p = -6000
    }
    if (p.p < -6000) {
      p.p = 6000
    }
    return p
  }

  requestAnimationFrame(function go(t) {
    t /= 128
    const dt = old_t - t
    old_t = t
    cloud1 = lerpCloud(cloud1, dt)
    cloud2 = lerpCloud(cloud2, dt)
    cloud3 = lerpCloud(cloud3, dt)
    cloud4 = lerpCloud(cloud4, dt)
    cloud5 = lerpCloud(cloud5, dt)
    requestAnimationFrame(go)
  })
</script>

<g class="svg_content">
  <use href="#shadow" />
  
  <g transform="translate({cloud1.p} 0)" class="cloud">
    <use href="#cloud" fill="var(--shadow)" transform="translate(0 1000)" />
  </g>
  
  <g transform="translate({cloud2.p} 0)" class="cloud">
    <use href="#cloud" fill="white" transform="translate(0 700) scale(-.5, .5)" />
  </g>
  
  <g transform="translate({cloud3.p} 0)" class="cloud">
    <use href="#cloud" fill="var(--shadow)" transform="translate(0, 1200) scale(.4)" />
  </g>
  
  <g transform="translate({cloud4.p} 0)" class="cloud">
    <use href="#cloud" fill="white" transform="translate(0, 800) scale(-.9, .9)" />
  </g>
  
  <g transform="translate({cloud5.p} 0)" class="cloud">
    <use href="#cloud" fill="white" transform="translate(0, 1050) scale(1.1, 1.1)" />
  </g>
</g>
