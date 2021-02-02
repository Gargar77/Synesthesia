import React, { Component } from 'react';
// import Canvas from '../../hoc/Canvas';

class VideoCapture extends Component {
    state = {
        intervals:[],
        confidence:0,
        logs:0,
        canvas:<canvas></canvas>
    }
    addInterval(id) {
        let newIntervals = this.state.intervals;
        newIntervals.push(id);

        this.setState({
            ...this.state,
            intervals: newIntervals
        })
    }
    // TODO: translate into react
    getVideoFrame = (imageCapture) => {
        imageCapture.grabFrame()
        .then(imageBitmap => {
            // logs++;
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(imageBitmap,0,0);
        //    if (logs < 5)console.log(ctx.getImageData(0,0,canvas.width,canvas.height));
        let frame = ctx.getImageData(0,0,canvas.width,canvas.height);
        getColors(frame);
        })
        .catch(error => console.error('grabFrame() error:',error));
    }

    init() {
        navigator.mediaDevices.getUserMedia({video:true})
    .then((mediaStream)=> {
        // console.log(navigator.mediaDevices)
        // console.log(mediaStream);
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        // console.log(mediaStreamTrack);
        const imageCapture = new ImageCapture(mediaStreamTrack);
        // console.log(imageCapture);
        return imageCapture;
    })
      .then((imageCapture)=> {
            setTimeout(()=>{
                let id = setInterval(()=> this.getVideoFrame(imageCapture),60);
                this.addInterval(id);
            },1000)
            
      });

     let id =  setInterval(()=>{
        if (confidence > 2000) {
            status.textContent = 'red'
        } else {
            status.textContent = 'not sure...'
        }
    },500)

    intervals.push(id);
    }

    render() {
        return (
            <div className="capture_container">

                <button>TEST</button>
            </div>
        )
    }
}

export default VideoCapture;