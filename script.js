const API_URL = "https://streamspark-g4px.onrender.com";

function getFormData() {

    return {
        game: document.getElementById("game").value,
        topic: document.getElementById("topic").value,
        style: document.getElementById("style").value
    };
}

function showLoading(text) {

    document.getElementById("result").innerHTML =
        `<div class="loading">${text}</div>`;
}

function copyText(text) {

    navigator.clipboard.writeText(text);

    alert("Kopyalandı!");
}

async function generateTitles() {

    const data = getFormData();

    showLoading("⚡ Başlıklar hazırlanıyor...");

    try {

        const response = await fetch(
            `${API_URL}/generate`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!result.success) {

            document.getElementById("result").innerHTML =
                `<div class="card">Hata: ${result.error}</div>`;

            return;
        }

        const titles =
            result.text
            .split("\n")
            .filter(t => t.trim() !== "");

        document.getElementById("result").innerHTML =
            titles.map(title => `
                <div class="title-card">

                    <span>${title}</span>

                    <button
                        class="copy-btn"
                        onclick="copyText('${title.replace(/'/g, "\\'")}')"
                    >
                        Kopyala
                    </button>

                </div>
            `).join("");

    } catch (error) {

        document.getElementById("result").innerHTML =
            `<div class="card">Sunucuya bağlanılamadı.</div>`;
    }
}

async function generateDescription() {

    const data = getFormData();

    showLoading("📝 Açıklama hazırlanıyor...");

    try {

        const response = await fetch(
            `${API_URL}/description`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("result").innerHTML =
            `<div class="card">${result.text.replace(/\n/g, "<br>")}</div>`;

    } catch (error) {

        document.getElementById("result").innerHTML =
            `<div class="card">Sunucuya bağlanılamadı.</div>`;
    }
}

async function generateThumbnailIdeas() {

    const data = getFormData();

    showLoading("🎯 Thumbnail fikirleri hazırlanıyor...");

    try {

        const response = await fetch(
            `${API_URL}/thumbnail`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("result").innerHTML =
            `<div class="card">${result.text.replace(/\n/g, "<br>")}</div>`;

    } catch (error) {

        document.getElementById("result").innerHTML =
            `<div class="card">Sunucuya bağlanılamadı.</div>`;
    }
}

async function generatePackage() {

    const data = getFormData();

    showLoading("🚀 Yayın paketi hazırlanıyor...");

    try {

        const response = await fetch(
            `${API_URL}/package`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("result").innerHTML =
            `<div class="card">${result.text.replace(/\n/g, "<br>")}</div>`;

    } catch (error) {

        document.getElementById("result").innerHTML =
            `<div class="card">Sunucuya bağlanılamadı.</div>`;
    }
}