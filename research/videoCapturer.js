// I created this video capturing algorithm with the help of the mediaStream API and canvas
// with this, I can now have access of every bitmap as it is being received through the mediaTrack
// I can then manipulate it any way I want

const img = document.querySelector('img');
const status = document.getElementById('status')
const canvas = document.querySelector('canvas');
const StartButton = document.getElementById('start');
// const stopButton = document.getElementById('stop');

StartButton.addEventListener('click',()=> {
    init();
})

// stopButton.addEventListener('click',()=> stop())




// determines the current confidence level of a color
var confidence = 0;
var intervals = [];
// for testing. will help me limit the amount of console logs
var logs = 0;

const init = () => {
    // stopButton.classList.remove('hidden');
    StartButton.classList.add('hidden');
    navigator.mediaDevices.getUserMedia({video:true})
    .then((mediaStream)=> {
        console.log(navigator.mediaDevices)
        // console.log(mediaStream);
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        // console.log(mediaStreamTrack);

        const imageCapture = new ImageCapture(mediaStreamTrack);
        // console.log(imageCapture);
        return imageCapture;
    })
      .then((imageCapture)=> {
            setTimeout(()=>{
                let id = setInterval(()=> getVideoFrame(imageCapture),60);
                intervals.push(id);
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


// const stop = () => {
//     stopButton.classList.add('hidden');
//     StartButton.classList.remove('hidden');
//     for( intervalId of intervals) {
//         clearInterval(intervalId);
//     }
// }





    const getVideoFrame = (imageCapture) => {
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

    const sumOf= (arr) =>{
        return arr.reduce((sum,val)=> sum+val);
    }

    const getColors = (frame) => {
        // for every pixel there are four entries in the array representing RGB
        // this data does not take alpha channel into account
        confidence = 0;
        let length = frame.data.length / 4;
        for (let i = 0; i < length; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            // if (logs < 5) console.log([r,g,b]);
            let red = [255,0,0];
            let currentDistance = colorDistance([r,g,b],red);
            if (currentDistance <= sumOf(red)) {
                confidence++;
            }else {
                confidence--;
            }  
        }
        return;
    }


    const colorDistance = (actualValues,targetValues) => {
        // logs++;
        rDistance = Math.abs(distance(actualValues[0],targetValues[0]));
        gDistance = Math.abs(distance(actualValues[1],targetValues[1]));
        bDistance = Math.abs(distance(actualValues[2],targetValues[2]));
    //    if (logs < 10)console.log(rDistance + gDistance + bDistance)
        return rDistance + gDistance + bDistance;
    }

    const  distance = (a,b) => {
        return a-b;
    }



    


    




