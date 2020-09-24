var img = document.querySelector('img');

    // navigator.mediaDevices.getUserMedia({video:true})
    // .then((mediaStream)=> {

    //     /*The MediaStream interface represents a stream of media content. 
    //     A stream consists of several tracks such as video or audio tracks. 
    //     Each track is specified as an instance of MediaStreamTrack.*/

    //     console.log(mediaStream);
    //     const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    //     console.log(mediaStreamTrack);

    //     const imageCapture = new ImageCapture(mediaStreamTrack);
    //     console.log(imageCapture);
    //     return imageCapture;
    // })
    //     .then((imageCapture)=> imageCapture.takePhoto())
    //         .then(blob => {
    //             console.log(blob);
    //             img.src = URL.createObjectURL(blob);
    //             img.onload = () => {URL.revokeObjectURL(this.src); }
    //         })
    //         .catch(error => console.error('takePhoto() error:',error));

    // const canvas = document.querySelector('canvas');

    // navigator.mediaDevices.getUserMedia({video:true})
    // .then((mediaStream)=> {

    //     /*The MediaStream interface represents a stream of media content. 
    //     A stream consists of several tracks such as video or audio tracks. 
    //     Each track is specified as an instance of MediaStreamTrack.*/

    //     console.log(mediaStream);
    //     const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    //     console.log(mediaStreamTrack);

    //     const imageCapture = new ImageCapture(mediaStreamTrack);
    //     console.log(imageCapture);
    //     return imageCapture;
    // })
    //     .then((imageCapture)=> imageCapture.grabFrame())
    //         .then(imageBitmap => {
    //             canvas.width = imageBitmap.width;
    //             canvas.height = imageBitmap.height;
    //             canvas.getContext('2d').drawImage(imageBitmap,0,0);
    //         })
    //         .catch(error => console.error('grabFrame() error:',error));





// I created this video capturing algorithm with the help of the mediaStream API and canvas
// with this, I can now have access of every bitmap as it is being received through the mediaTrack
// I can then manipulate it any way I want

const canvas = document.querySelector('canvas');

    navigator.mediaDevices.getUserMedia({video:true})
    .then((mediaStream)=> {
        // console.log(mediaStream);
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        console.log(mediaStreamTrack);

        const imageCapture = new ImageCapture(mediaStreamTrack);
        // console.log(imageCapture);
        return imageCapture;
    })
      .then((imageCapture)=> {
            setTimeout(()=>{
                setInterval(()=> getVideoFrame(imageCapture),60)
            },1000)
            
      });

var logs = 0;


        // const getVideoFrame = (imageCapture) => {
        //         imageCapture.grabFrame()
        //         .then(imageBitmap => {
        //             // if (logs < 5) console.log(imageBitmap);
        //             logs++;
        //             canvas.width = imageBitmap.width;
        //             canvas.height = imageBitmap.height;
        //             ctx = canvas.getContext('2d');
        //             ctx.drawImage(imageBitmap,0,0);
        //         })
        //         .catch(error => console.error('grabFrame() error:',error));
    
        
        // }


        // The focus now is to find out HOW to get specific information through a bitmap
        // imagedata on the current canvas can be obtained by using createImageData() on the context
        

        // const getVideoFrame = (imageCapture) => {
        //     imageCapture.grabFrame()
        //     .then(imageBitmap => {
        //         // if (logs < 5) console.log(imageBitmap);
        //         logs++;
        //         canvas.width = imageBitmap.width;
        //         canvas.height = imageBitmap.height;
        //         ctx = canvas.getContext('2d');
        //         ctx.drawImage(imageBitmap,0,0);
        //        if (logs < 5)console.log(ctx.createImageData(canvas.width,canvas.height).data);
        //     })
        //     .catch(error => console.error('grabFrame() error:',error));

    
        // }

    /* imageData has a data property representing a one-dimensional 
    array containing the data in the RGBA order, 
    with integer values between 0 and 255 (included)*/



    // const getVideoFrame = (imageCapture) => {
    //     imageCapture.grabFrame()
    //     .then(imageBitmap => {
    //         // if (logs < 5) console.log(imageBitmap);
    //         logs++;
    //         canvas.width = imageBitmap.width;
    //         canvas.height = imageBitmap.height;
    //         ctx = canvas.getContext('2d');
    //         ctx.drawImage(imageBitmap,0,0);
    //         const imageData = ctx.createImageData(canvas.width,canvas.height);
    //         manipulateData(imageData);
    //     })
    //     .catch(error => console.error('grabFrame() error:',error));

    // }


    // const manipulateData = (imageData) => {
    //     const xCoord = 50;
    //     const yCoord = 100;
    //     const canvasWidth = canvas.width;

    //     const getColorIndicesForCoord = (x, y, width) => {
    //     const red = y * (width * 4) + x * 4;
    //     return [red, red + 1, red + 2, red + 3];
    //     };

    //     const colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);
    //     if (logs < 5) console.log(colorIndices);
    //     const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;


    // }




    const getVideoFrame = (imageCapture) => {
        imageCapture.grabFrame()
        .then(imageBitmap => {
            // if (logs < 5) console.log(imageBitmap);
            logs++;
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(imageBitmap,0,0);
        //    if (logs < 5)console.log(ctx.getImageData(0,0,canvas.width,canvas.height));
        let frame = ctx.getImageData(0,0,canvas.width,canvas.height);
        let enhancedFrame = getColors(frame);
        ctx.putImageData(enhancedFrame,0,0);
        })
        .catch(error => console.error('grabFrame() error:',error));
    }


    const getColors = (frame) => {
        let length = frame.data.length / 4;
        const bestContender = {index:null,distance:0};
        for (let i =0; i < length; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            // if (logs < 5) console.log([r,g,b]);
            // if (logs < 5) console.log(rgb);
            let currentDistance = colorDistance(r,g,b,0,0,255);
            if (currentDistance < 500) {
            //    let x = (i / 4) % frame.width;
            //    let y = Math.floor((i / 4) / frame.width)
                // frame.data[i * 4 + 3] = 0;
                if (!bestContender.index) {
                    bestContender.index = i
                    bestContender.distance = currentDistance;
                    continue;
                }

                if (bestContender.distance > currentDistance) {
                    bestContender.index = i
                    bestContender.distance = currentDistance;
                }
            }   
        }
        frame.data[bestContender * 4 + 3] = 0;
        return frame;
    }

    const colorDistance = (r1,g1,b1,r2,g2,b2) => {
        rDistance = Math.abs(distance(r1,r2));
        gDistance = Math.abs(distance(g1,g2));
        bDistance = Math.abs(distance(b1,b2));
        return rDistance + gDistance + bDistance;
    }

    const  distance = (a,b) => {
        return Math.sqrt(a*a + b*b);
    }
    


    




