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



#### createMediaElementSource()

__*MediaElementAudioSourceNode *__

It is an interface represents an audio source consisting of an HTML5 <audio> or <video> element. It is an AudioNode that acts as an audio source.

#### createBufferSource()
is used to create a new AudioBufferSourceNode

#### GainNode

It is an audio-processing module that causes a given gain to be applied to the input data before its propagation to the output. 

A GainNode always has exactly one input and one output, both with the same number of channels.

![alt text](https://mdn.mozillademos.org/files/5085/WebAudioGainNode.png)


#### OscillatorNode

It represents a periodic waveform, such as a sine wave.

![oscillator](https://media.springernature.com/original/springer-static/image/chp%3A10.1007%2F978-1-4842-0460-3_6/MediaObjects/978-1-4842-0460-3_6_Fig7_HTML.gif)

#### URL.createObjectURL()

It creates a `DOMString` containing a `URL representing the object` given in the parameter. 

The new object URL represents the specified File object or Blob object.




## Reference

 - [https://github.com/doabit/vue-ssr-starter-kit](https://github.com/doabit/vue-ssr-starter-kit)

## License

[MIT](http://opensource.org/licenses/MIT)
