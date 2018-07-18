 <template>
  <div id="canvas-container" />
</template>

<script>
 /* eslint-disable */

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
      y: 100,
      canvasW: 300,
      canvasH: 300,
      filter: null,
      noise: null,
      fft: null
    }
  },
  mounted() {
    Object.assign(window, this.sketch)
  },
  methods: {
    setup: function(){
      fill(255, 40, 255);
    
      this.filter = new p5.BandPass();
    
      this.noise = new p5.Noise();
      
      this.noise.disconnect();
      this.noise.connect(this.filter);
      this.noise.start();
    
      this.fft = new p5.FFT();
    },
    draw: function(){
      background(30);
      var freq = map(mouseX, 0, width, 20, 10000);
      this.filter.freq(freq);

      this.filter.res(50);
    
      // draw filtered spectrum
      var spectrum = this.fft.analyze();
      noStroke();
      for (var i = 0; i < spectrum.length; i++) {
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width/spectrum.length, h);
      }
    
      this.isMouseOverCanvas();
    },
    isMouseOverCanvas: function() {
      var mX = mouseX, mY = mouseY;
      if (mX > 0 && mX < width && mY < height && mY > 0) {
        this.noise.amp(0.5, 0.2);
      } else {
        this.noise.amp(0, 0.2);
      }
    }
  }

}
</script>

<style>
</style>
