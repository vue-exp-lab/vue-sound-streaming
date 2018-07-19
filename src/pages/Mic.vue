 <template>
  <div id="canvas-container" />
</template>

<script>
 /* eslint-disable */

import P5Base from '../mixin/P5';
export default {
  extends: {mixins: [P5Base]},
  created: function () {
    this.canvasW = 600
    this.canvasH = 600
  },
  data: function(){
    return {
        mic : null
    }
  },
  mounted() {
    Object.assign(window, this.sketch)
  },
  methods: {
    setup: function(){
        this.canvasEle = createCanvas(this.canvasW, this.canvasH);
        this.mic = new p5.AudioIn();
        this.mic.start();
    },
    draw: function(){
        background(30);
        fill(127);
        stroke(0);

        // Get the overall volume (between 0 and 1.0)
        const vol = this.mic.getLevel();
        // Draw an ellipse with height based on volume
        const h = map(vol, 0, 1, height, 0);
        ellipse(width/2, h - 25, 50, 50);
    }
  }

}
</script>

<style>
</style>
