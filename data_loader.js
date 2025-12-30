// data-loader.js — Dynamic gallery loader

async function loadGallery() {
  try {
    const response = await fetch("data/gallery.json");
    const data = await response.json();

    const gallery = document.getElementById("gallery");
    const videoGallery = document.getElementById("video-gallery");

    gallery.innerHTML = "";       // Clear current photos
    videoGallery.innerHTML = "";  // Clear current videos

    // Load photos dynamically
    data.photos.forEach(photo => {
      const div = document.createElement("div");
      div.className = "photo";
      div.innerHTML = `<img src="${photo.src}" alt="${photo.alt || 'photo'}">`;
      gallery.appendChild(div);
    });

    // Load videos dynamically
    data.videos.forEach(video => {
      const div = document.createElement("div");
      div.className = "video";
      div.innerHTML = `<video src="${video.src}" controls poster="${video.poster || ''}"></video>`;
      videoGallery.appendChild(div);
    });

  } catch (err) {
    console.error("Error loading gallery:", err);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadGallery);

// Optional: Auto-refresh when admin updates JSON
const refreshButton = document.createElement("button");
refreshButton.textContent = "🔄 Refresh Gallery";
refreshButton.style.position = "fixed";
refreshButton.style.bottom = "20px";
refreshButton.style.right = "20px";
refreshButton.style.padding = "10px 16px";
refreshButton.style.background = "linear-gradient(135deg,#7bffce,#6ea8ff)";
refreshButton.style.color = "#000";
refreshButton.style.fontWeight = "700";
refreshButton.style.border = "none";
refreshButton.style.borderRadius = "10px";
refreshButton.style.cursor = "pointer";
refreshButton.style.zIndex = "9999";
refreshButton.title = "Reload new images/videos from admin data";
document.body.appendChild(refreshButton);

refreshButton.addEventListener("click", async () => {
  refreshButton.textContent = "⏳ Refreshing...";
  await loadGallery();
  refreshButton.textContent = "✅ Updated";
  setTimeout(() => (refreshButton.textContent = "🔄 Refresh Gallery"), 2000);
});