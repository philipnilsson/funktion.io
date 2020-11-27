<script>
  export let excited;

</script>

<style>
  main {
      position: absolute;
      top: 15vh;
      left: 7%; 
      max-width: min(39vw, 450px);
  }

  h1 {
    margin: 0;
    margin-top: 0; 
    padding: 0;
    letter-spacing: -0.05em;
    color: var(--blue);
    font-size: 2.5rem;
    font-size: calc(min(12vh, 13vw));
    font-weight: 800;
    line-height: .9;
  }

  h3 {
    white-space: nowrap;
    margin: 0;
    margin-top: 1em;
    margin-right: .625em;    
    font-weight: 800;
    letter-spacing: -0.025em;
    padding: 0;
    line-height: 1.4;
    text-transform: uppercase;
    color: var(--white);
    background: var(--green);
    padding: 1em;
    border-radius: .625em;
    display: inline-block;
    cursor: pointer;
    transition: background .125s;
    z-index: 200;
    font-size: 1rem;
    font-size: calc(min(2vh, 3vw));
  }
  
  #contact_wrapper {
    position: fixed;
    left: 7vw;
    bottom: 10vw;
    max-width: 50vw;
  }

  #contact {
    color: var(--white);
    background: var(--blue);
    color: var(--white);
  }

  h3, #contact {
    transition: background .125s, transform .25s;
  }

  h3:hover, #contact:hover {
    background: var(--orange);
    transform: scale(1.1);
  }

  p {
    letter-spacing: -0.03em;
    color: var(--black);
    line-height: 1.5em;
    font-weight: 500;
    margin: 0;
    margin-top: 3.5vh;
    margin-bottom: 3.5vh;
    font-size: .8rem;
    font-size: calc(min(2.5vh, 3vw, 18px));
  }
  
  p em {
    font-style: normal;
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

</style>

<main>
  <h1>Hi! I'm Philip Nilsson</h1>
  <p>
    <em>Full-stack</em> developer. <em>Functional programming</em> enthusiast. Building cool things for the <em>web</em>.
    I'm currently <em>available</em> for <em>remote</em> full-time
    and freelance work.
  </p>
  <div id="contact_wrapper">
    <a href="mailto:philip.nilsson@outlook.com"
      on:mouseenter={() => { excited.set(true) }}
      on:mouseleave={() => excited.set(false)}
      on:touchstart={() => excited.set(true)}
      on:touchend={() => excited.set(false)}
      on:touchcancel={() => excited.set(false)}
    >
      <h3 id="contact">
        Get in touch
      </h3>
    </a>
    <a
      href="/Philip Nilsson - Resume.pdf"
      on:mouseenter={() => { excited.set(true) }}
      on:mouseleave={() => excited.set(false)}
      on:touchstart={() => excited.set(true)}
      on:touchend={() => excited.set(false)}
      on:touchcancel={() => excited.set(false)}
      >
      <h3 id="resume">
        Get my Resume
      </h3>
    </a>
  </div>
</main>
