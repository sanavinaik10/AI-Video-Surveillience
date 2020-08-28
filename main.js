objects = [];
video = "";
status = "";
percent = "";
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}
function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 400, 400);
    if(status != ""){
        object_detector.detect(video, gotResult);
        for(s = 0; s < objects.length; s++){
            document.getElementById("status").innerHTML = "Status: Object detcted!";
            document.getElementById("noofobjects").innerHTML = "Number of objects detected: " + objects.length;
            fill("#0000FF");
            stroke("#0000FF");
            noFill();
            percent = floor(objects[s].confidence * 100);
            text(objects[s].label + " " + percent + "%", objects[s].x + 15, objects[s].y + 15);
            rect(objects[s].x , objects[s].y, objects[s].width , objects[s].height);
        }
    }
}
function start() {
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: In Detection Mode";
}
function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.volume(1);
}

function slider_value() {
    slider = document.getElementById("slider").value;
    console.log(slider);
    video.speed(slider);
}
function pause_video() {
    video.pause();
}

function stop_video() {
    video.stop();
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}