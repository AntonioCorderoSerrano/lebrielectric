document.addEventListener("DOMContentLoaded", function () {
    const lightboxContainer = document.createElement("div");
    lightboxContainer.id = "lightbox";
    lightboxContainer.innerHTML = `
        <span class="close">&times;</span>
        <button class="prev">&#10094;</button>
        <img src="" alt="">
        <button class="next">&#10095;</button>
    `;
    document.body.appendChild(lightboxContainer);

    const lightboxImage = lightboxContainer.querySelector("img");
    const closeButton = lightboxContainer.querySelector(".close");
    const nextButton = lightboxContainer.querySelector(".next");
    const prevButton = lightboxContainer.querySelector(".prev");

    let currentIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll("a[data-litebox-group='gallery']"));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = galleryImages[currentIndex].href;
        lightboxContainer.style.display = "flex";
    }

    function closeLightbox() {
        lightboxContainer.style.display = "none";
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex].href;
    }

    function previousImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex].href;
    }

    galleryImages.forEach((link, index) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", previousImage);

    lightboxContainer.addEventListener("click", (e) => {
        if (e.target === lightboxContainer) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (lightboxContainer.style.display === "flex") {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") previousImage();
            if (e.key === "Escape") closeLightbox();
        }
    });
});