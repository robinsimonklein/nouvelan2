<template>
    <div class="app-loader" :class="'app-loader--'+color">
        <svg class="app-loader__svg"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682.5 1608">
            <g id="explosion-d">
                <rect ref="explosion_l" class="app-loader__explosion" y="338.75" width="294.5" height="3"/>
                <rect ref="explosion_r" class="app-loader__explosion" x="387.5" y="338.75" width="295" height="3"/>
                <rect ref="explosion_b" class="app-loader__explosion" x="-684" y="340" width="295.5" height="3" transform="rotate(-90)"/>
                <rect ref="explosion_t" class="app-loader__explosion" x="-295" y="340" width="294" height="3" transform="rotate(-90)"/>
                <rect ref="explosion_bl" class="app-loader__explosion" x="-340" y="480.1" width="276.5" height="3" transform="rotate(-45)"/>
                <rect ref="explosion_tr" class="app-loader__explosion" x="62" y="480" width="276.5" height="3" transform="rotate(-45)"/>
                <rect ref="explosion_tl" class="app-loader__explosion" x="142" y="-1.4" width="276.5" height="3" transform="rotate(45)"/>
                <rect ref="explosion_br" class="app-loader__explosion" x="545.04" y="-1.4" width="276.5" height="3" transform="rotate(45)"/>
            </g>
            <g id="rocket-d">
                <rect ref="rocket" class="app-loader__rocket" x="339.75" y="1605" width="3" height="3"/>
            </g>
        </svg>
    </div>
</template>

<script>
  import gsap from 'gsap'

  export default {
    name: 'AppLoader',
    data() {
      return {
        colors: ['blue', 'pink', 'yellow', 'green','red'],
        color: 'blue',
        timeline: null
      }
    },
    methods: {
      nextColor() {
        let colorIndex = this.colors.indexOf(this.color)
        if(colorIndex >= 0) {
          colorIndex >= (this.colors.length - 1) ? colorIndex = 0 : colorIndex += 1;
        }
        this.color = this.colors[colorIndex]
      }
    },
    created() {
      // Start with a random color
      this.color = this.colors[Math.floor(Math.random()*(this.colors.length))]
    },
    mounted () {
      this.timeline = gsap.timeline();
      this.timeline.to(this.$refs.rocket, {duration: 2, y: -1267, ease: "Power4.out"})
        .fromTo(this.$refs.rocket,{scaleY: 10, transformOrigin: "bottom center"}, {duration: 2, scaleY: 1, ease: "Power3.out", transformOrigin: "bottom center"}, "-=2")
        .to(this.$refs.rocket,{duration: .1, opacity: 0})
        .fromTo(this.$refs.explosion_l, {scaleX: 0, transformOrigin: 'right'}, {duration: .2, scaleX: 1, ease: 'Power4.out'}, '#explosion')
        .fromTo(this.$refs.explosion_r, {scaleX: 0, transformOrigin: 'left' }, {duration: .2, scaleX: 1, ease: 'Power4.out'}, '#explosion')
        .fromTo(this.$refs.explosion_t, {scaleX: 0, rotation: -90, transformOrigin: 'left' }, {duration: .2, scaleX: 1, rotation: -90, ease: 'Power4.out'}, '#explosion')
    }
  }
</script>
