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
const exitOBS = document.getElementById("exitOBS");

const downloadBtn = document.getElementById("download");

// Preview

const previewSubreddit = document.getElementById("previewSubreddit");
const previewAuthor = document.getElementById("previewAuthor");
const previewTime = document.getElementById("previewTime");
const previewTitle = document.getElementById("previewTitle");
const previewStory = document.getElementById("previewStory");
const previewUpvotes = document.getElementById("previewUpvotes");
const previewComments = document.getElementById("previewComments");


// ==========================
// UPDATE POST
// ==========================

function updatePost() {

    previewSubreddit.textContent = subreddit.value;

    previewAuthor.textContent = author.value;

    previewTime.textContent = time.value;

    previewTitle.textContent = title.value;

    previewStory.textContent = story.value;

    previewUpvotes.textContent = upvotes.value;

    previewComments.textContent = comments.value;
}

updateBtn.addEventListener("click", updatePost);


// ==========================
// LIVE UPDATE
// ==========================

document.querySelectorAll(
    "#subreddit, #author, #time, #title, #story, #upvotes, #comments"
).forEach(input => {

    input.addEventListener("input", updatePost);

});


// ==========================
// AVATAR
// ==========================

avatarUpload.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        avatarImage.src = event.target.result;

    };

    reader.readAsDataURL(file);

});


// ==========================
// OBS MODE
// ==========================

function enterOBS() {

    document.body.classList.add("obs");

    exitOBS.style.display = "block";

}

function leaveOBS() {

    document.body.classList.remove("obs");

    exitOBS.style.display = "none";

}


// Кнопка OBS Mode

obsBtn.addEventListener("click", enterOBS);


// Кнопка Exit OBS

exitOBS.addEventListener("click", leaveOBS);


// ESC — выход из OBS

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        leaveOBS();

    }

});


// F11 — переключение OBS

document.addEventListener("keydown", function (e) {

    if (e.key === "F11") {

        e.preventDefault();

        if (document.body.classList.contains("obs")) {

            leaveOBS();

        } else {

            enterOBS();

        }

    }

});


// ==========================
// DOWNLOAD PNG
// ==========================

downloadBtn.addEventListener("click", async function () {

    const card = document.querySelector(".redditCard");

    // Запоминаем текущий скролл текста

    const oldScrollTop = card.querySelector(".story").scrollTop;

    // Временно убираем ограничение высоты текста,
    // чтобы PNG не обрезал нижние строки

    const storyElement = card.querySelector(".story");

    const oldMaxHeight = storyElement.style.maxHeight;

    const oldOverflow = storyElement.style.overflow;

    storyElement.style.maxHeight = "none";

    storyElement.style.overflow = "visible";

    // Ждём перерисовку браузера

    await new Promise(resolve => requestAnimationFrame(resolve));

    const canvas = await html2canvas(card, {

        backgroundColor: "#000000",

        scale: 2,

        useCORS: true,

        allowTaint: false,

        logging: false,

        imageTimeout: 0,

        removeContainer: true

    });

    // Возвращаем всё назад

    storyElement.style.maxHeight = oldMaxHeight;

    storyElement.style.overflow = oldOverflow;

    storyElement.scrollTop = oldScrollTop;

    // Скачиваем PNG

    const link = document.createElement("a");

    link.download = "reddit-story.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

});
