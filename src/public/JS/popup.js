// Open file dialog
document.getElementById("imageUploadBox").addEventListener("click", () => {
document.getElementById("postImage").click();
});

// Preview uploaded image
document.getElementById("postImage").addEventListener("change", function () {
const file = this.files[0];
if (!file) return;

const previewContainer = document.getElementById("previewContainer");
const previewImg = document.getElementById("previewImg");

previewImg.src = URL.createObjectURL(file);
previewContainer.classList.remove("d-none");
});

