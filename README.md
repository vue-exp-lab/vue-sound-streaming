# vue-ssr-starter-kit

This is an implementation of sound streaming, with Vue.js SSr architect

Base on the boilerplate :
 - [https://github.com/wahengchang/vue-ssr-p5-kit](https://github.com/wahengchang/vue-ssr-p5-kit)

## Node Version Requirement

```bash
node 8.10.0
```

## Build Setup

``` bash
npm install
npm run build
npm start
```

## Development Setup

```bash
npm install
npm run dev
```

## Note

 Noise : Perlin Noise 
 noise.connect(): connect/disconnect noise from sound input

## Reference

 - [https://github.com/doabit/vue-ssr-starter-kit](https://github.com/doabit/vue-ssr-starter-kit)


## Note Audio Context:


#### decodeAudioData()

 - It is used to asynchronously decode audio file data contained in an ArrayBuffer.
 - The decoded AudioBuffer is resampled to the AudioContext's sampling rate, then passed to a `callback` or `promise`.

#### createBufferSource()

 - It is used to create a new `AudioBufferSourceNode`, which can be used to play audio data contained within an `AudioBuffer object`.

  - [Read More](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBufferSource)

## License

[MIT](http://opensource.org/licenses/MIT)
