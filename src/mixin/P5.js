export default {
  created: function () {
    if (process.browser) {
      this.initP5()
    }
  },
  data: function () {
    return {
      sketch: null
    }
  },
  methods: {
    initP5: function () {
      if (process.browser) {
        new window.p5(this.setupCanvas)
      }
    },
    setupCanvas: function (sketch) {
      this.$set(this, 'sketch', sketch)

      sketch.setup = this.setup

      sketch.draw = this.draw
    },
    setup: function (canvasW = 200, canvasH = 200) {
      const domEle = this.sketch.createCanvas(canvasW, canvasH)
      domEle.parent('canvas-container')
    },
    draw: function () {
      /* eslint-disable no-console */
      console.warn('drawing function is missing, add it.')
    }
  }
}
