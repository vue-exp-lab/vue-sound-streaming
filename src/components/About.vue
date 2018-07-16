<template>
  <div id="canvas-container" />
</template>

<script>
import P5Base from '../mixin/P5';
export default {
  extends: {mixins: [P5Base]},
  created: function () {
  },
  data: function(){
    return {
      maxX: 100,
      maxY: 100,
      minX: 0,
      minY: 0,
      x: 100,
      y: 100
    }
  },
  methods: {
    draw: function(){
      const sketch = this.sketch
      const {x,y, minX, minY} = this
      // sketch.draw = function() {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x,y,50,50);

      if(x> minX)
        this.$set(this, 'x', x-1)

      if(y> minY)
        this.$set(this, 'y', y-1)
    }
  }

}
</script>

<style>
</style>
