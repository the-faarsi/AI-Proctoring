const video = document.getElementById('video')
async function main() {
  await tf.setBackend('wasm');

await faceapi.loadMtcnnModel('models/')
  await faceapi.loadFaceRecognitionModel('models/')
  faceapi.nets.faceLandmark68Net.loadFromUri('models/'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('models/')
  // faceapi.nets.faceExpressionNet.loadFromUri('models/'),
  // faceapi.nets.tinyFaceDetector.loadFromUri('models/'),

  model = await facemesh.load();
  console.log("Models are Loading. Please Wait for few Seconds");
  getMediaStream();
}


var count = 0;

var check;



async function onPlay(video) {
// document.getElementById('granted').style.backgroundColor = "black"
// document.getElementById('denied').style.backgroundColor = "black"

  const mtcnnForwardParams = {
      maxNumScales: 10,
  // scale factor used to calculate the scale steps of the image
  // pyramid used in stage 1
  scaleFactor: 0.709,
  // the score threshold values used to filter the bounding
  // boxes of stage 1, 2 and 3
  scoreThresholds: [0.6, 0.7, 0.7],
  // mininum face size to expect, the 
  minFaceSize: 75
}




const mtcnnResults = await faceapi.mtcnn(video, mtcnnForwardParams)


const options = new faceapi.MtcnnOptions(mtcnnForwardParams)
const fullFaceDescriptions = await faceapi.detectAllFaces(video,options).withFaceLandmarks().withFaceDescriptors()


// const canvas = document.getElementById('overlay')
//   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
 // console.log("Verifying Please Wait..2");
const labels = ['Salman']

// console.log("Models Loaded");
const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    for(i=1;i<=1;i++){
    const imgUrl = `labeled_images/${label}/${i}.jpg`
    const img = await faceapi.fetchImage(imgUrl)


     const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
// console.log("Verifying Please Wait..3");
     if (!fullFaceDescription) {
      console.log("Please don't cover your face")
    }
    
    const faceDescriptors = [fullFaceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
}  })
)


const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.5)

const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

 // console.log("Verifying Please Wait..4");
// var res;

console.log("Verifying, Please Hold Your Head Still and Face your Camera");
results.forEach((bestMatch, i) => {

  // const box = fullFaceDescriptions[i].detection.box
  var text;
  text = bestMatch.toString()
  // const drawBox = new faceapi.draw.DrawBox(box, { label: text })  
  // drawBox.draw('overlay')
  var res = text.split(" ",1);
  var result = res.toString();
  if(result == "unknown"){
    result = "New Face Intrusion or Face Mismatch";
  }
  // console.log (result)
  count ++;
  console.log(count, result);
  
  check = result;

// console.log("Verifying Please Wait..5");
  // res=result;
  //var canvas= document.getElementById('overlay')
  //var elk= document.getElementById('inputVideo')
  // /canvas.width= elk.width; 
  // canvas.height= elk.height;

// var ver = document.getElementsByClassName('verify')
// confirm("Verifying... Please Wait");

})
  if(count<1){
  setTimeout(() => onPlay(video))
  }
  else{
clearTimeout(onPlay())
// console.log(ffd);
// console.log(check)

// var mf = 1;
// var m = 0;
// var item;

// for (var i = 0; i < check.length; i++) {
//   for (var j = i; j < check.length; j++) {
//     if (check[i] == check[j]) m++;
//     if (mf < m) {
//       mf = m;
//       item = check[i];
//     }
//   }

//   m = 0;
// }

if (check == "New Face Intrusion or Face Mismatch") {
alert("Face Mismatch")
await onPlay(video)
}else{
console.log(check + " has been verified ");
alert("You have been Verified " + check);
// setTimeout(loop(),10000);
loop();
}




  }
}












  a = 0;



async function exam(video) {
console.log("Verifying, Please Hold Your Head Still and Face your Camera");

  const mtcnnForwardParams = {
      maxNumScales: 10,
  scaleFactor: 0.709,
  scoreThresholds: [0.6, 0.7, 0.7],
  minFaceSize: 75
}
const mtcnnResults = await faceapi.mtcnn(video, mtcnnForwardParams);
const options = new faceapi.MtcnnOptions(mtcnnForwardParams);
const fullFaceDescriptions = await faceapi.detectAllFaces(video,options).withFaceLandmarks().withFaceDescriptors();
const labels = ['Salman'];

const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    for(i=1;i<=1;i++){
    const imgUrl = `labeled_images/${label}/${i}.jpg`
    const img = await faceapi.fetchImage(imgUrl)



     const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    
    const faceDescriptors = [fullFaceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
}  })
);

const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.5);

const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));

// var res;
// console.log("Exam running 6");

results.forEach((bestMatch, i) => {
  var text;
  text = bestMatch.toString()
  var res = text.split(" ",1);
  var result = res.toString();

  if(result == "unknown"){
    result = "New Face Intrusion"
    alert("New Face Intrusion")
    a++;
  }
  count ++;
  console.log(result)
//   if(a >= 3){
// alert("Threat Level High")
// onPlay(video);
//   }
  // console.log (result)
  if(!result)
  {
    onPlay();
  }
  if(result == check){
loop();
  }
  else{
console.log("New Face Intrusion");
alert("New Face Intrusion");
clearTimeout(loop());
 onPlay(video);
  }

  // res=result;
  //var canvas= document.getElementById('overlay')
  //var elk= document.getElementById('inputVideo')
  // /canvas.width= elk.width; 
  // canvas.height= elk.height;


})
// console.log("Exam running 7");
// loop()
// setTimeout(() => exam(video))
// console.log("Exam End");
}
//   // console.log(res)










 async function getMediaStream() {
const video = document.getElementById('video')
  stream = await navigator.mediaDevices.getUserMedia({video: true })
  video.srcObject = stream;
  video.onloadedmetadata =async () => {
    video.play();
    await onPlay(video);
    // loop()
     isLooping = true;
  }
}


var cnt = 0;
 async function loop() {
const video = document.getElementById('video')
const predictions = await model.estimateFaces(video);
  if(predictions.length == 1){
  cnt++;
    // console.log(predictions);
    // if (cnt == 20){
    // cnt = 0;
        // }
    // console.log(x)
         let base = predictions[0].scaledMesh;
          // console.log(base)
  for (let x = 0; x < predictions.length; x++) {
            const keypoints = predictions[x].scaledMesh;
            // count++;
 //          // console.log(keypoints);
 //          // let upper = keypoints[13]
 //          // let lower = keypoints[14]
 //          // let a = upper[0] - lower[0]
 //          // let b = upper[1] - lower[1]
 //          // let dist = Math.sqrt(a * a + b * b)
         let lle = keypoints[33][0]
          let lre = keypoints[133][0]

          let rle = keypoints[362][0]
          let rre = keypoints[263][0]
          let fit = keypoints[168][1]

          let chin = keypoints[200][1]
          // console.log(cnt);
          // console.log(rle)
          // console.log(rre)
          // console.log(rle, rre)
          // console.log(chin)
          // console.log(rle)
          // console.log(lre)
          // console.log(fit);
          


//  if(fit >=600 && fit <=700 && fit1 >=250 && fit1 <=350){
// console.log("Focused");
//  }
//  else{
  // if ( cnt >= 20){
  //   clearTimeout(loop());
  //   cnt = 0;
  //   exam(video);
  // }
 

 if (lle >=250 && lle <=350 && lre >= 250 && lre <= 350 && rle >=340 && rle <=400 && rre >= 350 && rre <= 450 && chin >=300 && chin <=400 && fit >=190 && fit <=210) {
   console.log("F O C U S E D");
// cnt++;
 }else if(lle < 250 && lre < 250 && rle < 340 && rre < 350){
console.log("Turning Right");
// cnt++;
 }else if(lle > 350 && lre > 350 && rle > 410 && rre > 410){
console.log("Turning Left");
// cnt++;
 }else if(fit < 190 && chin < 300){
console.log("Moving Up");
// cnt++;
 }else if(fit > 210 && chin > 400){
console.log("Moving Down");
// cnt++;
 }
 else{
  console.log("Not Focused");
  // cnt++;
 }


if(cnt == 200){
  cnt = 0;
  await exam(video);
}












}
// console.log(lre)

//  if (rle >=630 && rle <=750 && rre >= 700 && rre <= 800 && lle >=500 && lle <=600 && lre >= 600 && lre <= 700 && chin >=450 && chin<=550) {
//    console.log("F O C U S E D");
//  }else if(rle < 630 && rre < 700 && lle < 530  && lre < 590) {
// console.log("Turning Right");
// }else if(rle >=750 && rle <=850 && rre >= 750 && rre <= 850 && lle >=600 && lle <=750 && lre >= 650 && lre <= 800) {
// console.log("Turning Left");}
// else if ( chin < 450){
//   console.log("Moving Up");
//  }
// else if ( chin > 550){
//   console.log("Moving Down");
//  }
 
// console.log(cnt);
   // if(cnt == 50){
   //  exam()
   // }       
   }
   if(predictions.length == 0){
    console.log("No person is found on the Screen");
   }
   if(predictions.length > 1){
    alert("Multiple faces detected on the screen");
    console.log("Multiple faces detected on the screen");
    await onPlay(video);
   }
   loop()
 }

  // console.log(a,b,c,d);
    /*
    `predictions` is an array of objects describing each detected face, for example:

    [
      {
        faceInViewConfidence: 1, // The probability of a face being present.
        boundingBox: { // The bounding box surrounding the face.
          topLeft: [232.28, 145.26],
          bottomRight: [449.75, 308.36],
        },
        mesh: [ // The 3D coordinates of each facial landmark.
          [92.07, 119.49, -17.54],
          [91.97, 102.52, -30.54],
          ...
        ],
        scaledMesh: [ // The 3D coordinates of each facial landmark, normalized.
          [322.32, 297.58, -17.54],
          [322.18, 263.95, -30.54]
        ],
        annotations: { // Semantic groupings of the `scaledMesh` coordinates.
          silhouette: [
            [326.19, 124.72, -3.82],
            [351.06, 126.30, -3.00],
            ...
          ],
          ...
        }
      }
    ]
    */
