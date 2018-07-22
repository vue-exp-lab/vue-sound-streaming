 <template>
        <canvas id="canvas-container"></canvas>
</template>

<script>
export default {
  name: 'soundCanva',
  props:['audioContext'],
  mounted() {
      console.log(' 0-0-0-0- ')
      this.analyser = this.audioContext && this.audioContext.createAnalyser()
      this.drawSound()
  },
  data: function() {
    return {
        analyser: null
    };
  },
  methods: {
      drawSound: function(){
        const analyser = this.analyser
        const drawVisual = requestAnimationFrame(this.drawSound);
        const WIDTH = 100, HEIGHT = 100

        const bufferLength = analyser.fftSize = 2048;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        const canvasElement = document.getElementById("canvas-container");
        const canvasCtx=canvasElement.getContext("2d");

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {
    
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
            canvasCtx.moveTo(x, y);
            } else {
            canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvasElement.width, canvasElement.height/2);
        canvasCtx.stroke();
      }
  }
};
</script>
<style>
</style>
