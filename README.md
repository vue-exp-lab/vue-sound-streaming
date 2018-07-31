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


#### Media Recorder

It creates a `DOMString` containing a `URL representing the object` given in the parameter. 

The new object URL represents the specified File object or Blob object.

#### MediaRecorder.requestData()
is used to raise a dataavailable event containing a Blob object of the captured media as it was when the method was called. 
```
captureMedia.onclick = function() {
    mediaRecorder.requestData();
    // makes snapshot available of data so far
    // ondataavailable fires, then capturing continues
    // in new Blob
  }
```


#### MediaRecorder.ondataavailable()
handles the dataavailable event, letting you run code in response to Blob data being made available for use.

#### BaseAudioContext.createScriptProcessor()

It creates a ScriptProcessorNode used for direct audio processing.

`var scriptProcessor = audioCtx.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);`



#### mediaStreamObject
The MediaStream API was designed to easy access the media streams from local `cameras` and `microphones`. The `getUserMedia()` method is the primary way to access local input devices.
Three key points : 
 - A real-time media stream is represented by a stream object in the form of video or audio
 - It provides a security level through user permissions asking the user before a web application can start fetching a stream
 - The selection of input devices is handled by the MediaStream API (for example, when there are two cameras or microphones connected to the device)

Each `MediaStream` object includes several `MediaStreamTrack` objects. They represent video and audio from different input devices.

Each `MediaStreamTrack` object may include several `channels` (right and left audio channels). These are the smallest parts defined by the MediaStream API.



## Reference

 - [https://stackoverflow.com/questions/16413063/html5-record-audio-to-file/16498273](https://stackoverflow.com/questions/16413063/html5-record-audio-to-file/16498273)
 - [MediaStream](https://www.tutorialspoint.com/webrtc/webrtc_media_stream_apis.htm)

## License

[MIT](http://opensource.org/licenses/MIT)
