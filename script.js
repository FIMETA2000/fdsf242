// ==========================
// ELEMENTS
// ==========================

const avatarUpload = document.getElementById("avatarUpload");

const avatarImage = document.getElementById("avatarImage");

const subreddit = document.getElementById("subreddit");

const author = document.getElementById("author");

const time = document.getElementById("time");

const title = document.getElementById("title");

const story = document.getElementById("story");

const upvotes = document.getElementById("upvotes");

const comments = document.getElementById("comments");

const updateBtn = document.getElementById("update");

const obsBtn = document.getElementById("obs");

const exitOBS=document.getElementById("exitOBS");

// Preview

const previewSubreddit = document.getElementById("previewSubreddit");

const previewAuthor = document.getElementById("previewAuthor");

const previewTime = document.getElementById("previewTime");

const previewTitle = document.getElementById("previewTitle");

const previewStory = document.getElementById("previewStory");

const previewUpvotes = document.getElementById("previewUpvotes");

const previewComments = document.getElementById("previewComments");


// ==========================
// UPDATE
// ==========================

function updatePost(){

previewSubreddit.textContent=subreddit.value;

previewAuthor.textContent=author.value;

previewTime.textContent=time.value;

previewTitle.textContent=title.value;

previewStory.textContent=story.value;

previewUpvotes.textContent=upvotes.value;

previewComments.textContent=comments.value;

}

updateBtn.onclick=updatePost;


// ==========================
// LIVE UPDATE
// ==========================

document.querySelectorAll("input, textarea").forEach(input=>{

input.addEventListener("input",updatePost);

});


// ==========================
// AVATAR
// ==========================

avatarUpload.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(event){

avatarImage.src=event.target.result;

}

reader.readAsDataURL(file);

});


// ==========================
// OBS MODE
// ==========================

obsBtn.onclick=function(){

document.body.classList.add("obs");

exitOBS.style.display="block";

};

exitOBS.onclick=function(){

document.body.classList.remove("obs");

exitOBS.style.display="none";

};


// ==========================
// SHORTCUTS
// ==========================

document.addEventListener("keydown",(e)=>{

if(e.key==="F11"){

e.preventDefault();

document.body.classList.toggle("obs");

exitOBS.style.display =
document.body.classList.contains("obs") ? "block" : "none";

}

});


// ==========================
// START
// ==========================

updatePost();

// ==========================
// DOWNLOAD PNG
// ==========================

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", () => {

    html2canvas(document.querySelector(".redditCard"), {
    backgroundColor: "#000000",
    scale: 2,
    useCORS: true,
    logging: false,
    removeContainer: true
}).then(canvas => {

    const link = document.createElement("a");
    link.download = "reddit-story.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

});

});

// ==========================
// VIDEO BACKGROUND
// ==========================

const videoUpload = document.getElementById("videoUpload");
const backgroundVideo = document.getElementById("backgroundVideo");

videoUpload.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    backgroundVideo.src = url;
    backgroundVideo.load();
    backgroundVideo.play();

});

// EXIT OBS
document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){

    document.body.classList.remove("obs");

    exitOBS.style.display="none";

}

});
