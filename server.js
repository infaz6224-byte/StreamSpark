const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
    res.send("StreamSpark API çalışıyor.");
});

// BAŞLIK ÜRET
app.post("/generate", async (req, res) => {

    try {

        const { game, topic, style } = req.body;

        const prompt = `
Sen profesyonel bir Kick yayın başlığı üreticisisin.

Oyun: ${game}
Konu: ${topic}
Yayın Tarzı: ${style}

10 adet dikkat çekici yayın başlığı üret.

Kurallar:
- Türkçe yaz.
- Her satıra bir başlık yaz.
- Numaralandırma yapma.
- İzleyicinin dikkatini çek.
`;

        const completion =
            await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.9
            });

        res.json({
            success: true,
            text: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// AÇIKLAMA ÜRET
app.post("/description", async (req, res) => {

    try {

        const { game, topic, style } = req.body;

        const prompt = `
Sen profesyonel bir Kick yayın danışmanısın.

Oyun: ${game}
Konu: ${topic}
Yayın Tarzı: ${style}

Şunları oluştur:

- Yayın açıklaması
- İzleyiciyi yayına çağıran kısa metin
- 5 hashtag

Türkçe yaz.
`;

        const completion =
            await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.8
            });

        res.json({
            success: true,
            text: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// THUMBNAIL FİKRİ
app.post("/thumbnail", async (req, res) => {

    try {

        const { game, topic } = req.body;

        const prompt = `
Sen profesyonel içerik üretici danışmanısın.

Oyun: ${game}
Konu: ${topic}

5 adet thumbnail fikri üret.

Her fikirde:

- Ana yazı
- Arka plan
- Karakter pozu
- Dikkat çekici detay

olsun.

Türkçe yaz.
`;

        const completion =
            await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.9
            });

        res.json({
            success: true,
            text: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// YAYIN PAKETİ
app.post("/package", async (req, res) => {

    try {

        const { game, topic, style } = req.body;

        const prompt = `
Sen profesyonel bir Kick yayın danışmanısın.

Oyun: ${game}
Konu: ${topic}
Yayın Tarzı: ${style}

Şunları üret:

# BAŞLIKLAR
10 yayın başlığı

# AÇIKLAMA
1 yayın açıklaması

# HASHTAGLER
10 hashtag

# THUMBNAIL
3 thumbnail fikri

Türkçe yaz.
`;

        const completion =
            await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.9
            });

        res.json({
            success: true,
            text: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Sunucu çalışıyor: http://localhost:3000");
});