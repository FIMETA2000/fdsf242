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

    if (!card) {
        alert("Карточка не найдена");
        return;
    }

    const storyElement = card.querySelector(".story");

    // Запоминаем исходные стили
    const oldMaxHeight = storyElement.style.maxHeight;
    const oldHeight = storyElement.style.height;
    const oldOverflow = storyElement.style.overflow;
    const oldScrollHeight = storyElement.scrollHeight;

    // Временно раскрываем весь текст
    storyElement.style.maxHeight = "none";
    storyElement.style.height = "auto";
    storyElement.style.overflow = "visible";

    // Ждём обновления страницы
    await new Promise(resolve => requestAnimationFrame(resolve));

    try {

        const canvas = await html2canvas(card, {

            // ВАЖНО: фон картинки НЕ прозрачный
            backgroundColor: "#000000",

            // Качество
            scale: 2,

            // Размер строго по карточке
            width: card.offsetWidth,
            height: card.scrollHeight,

            useCORS: true,
            allowTaint: false,

            // Убираем лишние эффекты
            logging: false,

            // ВАЖНО для скруглённых углов
            onclone: function (clonedDocument) {

                const clonedCard =
                    clonedDocument.querySelector(".redditCard");

                const clonedStory =
                    clonedDocument.querySelector(".story");

                if (clonedCard) {

                    clonedCard.style.background = "#000000";

                    clonedCard.style.borderRadius = "24px";

                    clonedCard.style.overflow = "hidden";

                    clonedCard.style.boxShadow = "none";

                }

                if (clonedStory) {

                    clonedStory.style.maxHeight = "none";

                    clonedStory.style.height = "auto";

                    clonedStory.style.overflow = "visible";

                }

            }

        });

        // Восстанавливаем карточку на сайте
        storyElement.style.maxHeight = oldMaxHeight;
        storyElement.style.height = oldHeight;
        storyElement.style.overflow = oldOverflow;

        // Создаём PNG
        canvas.toBlob(function (blob) {

            if (!blob) {

                alert("Не удалось создать изображение");

                return;

            }

            // Создаём временную ссылку
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = "reddit-story.png";

            // ВАЖНО: добавляем ссылку в DOM
            document.body.appendChild(link);

            // Запускаем скачивание
            link.click();

            // Удаляем ссылку
            setTimeout(function () {

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            }, 1000);

        }, "image/png");

    } catch (error) {

        // Возвращаем стили даже при ошибке
        storyElement.style.maxHeight = oldMaxHeight;
        storyElement.style.height = oldHeight;
        storyElement.style.overflow = oldOverflow;

        console.error("Ошибка сохранения PNG:", error);

        alert("Ошибка при сохранении изображения. Открой F12 → Console и посмотри ошибку.");

    }

});
