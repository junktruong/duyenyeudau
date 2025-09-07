"use client";
import { useEffect } from "react";
import "@/styles/global.css";

export default function Home() {
    useEffect(() => {
        const env = document.getElementById("envelope");
        const heartsBox = document.getElementById("hearts");
        const btnAgain = document.getElementById("btnAgain");
        const btnWrite = document.getElementById("btnWrite");
        const modal = document.getElementById("modal");
        const btnCancel = document.getElementById("btnCancel");
        const btnSend = document.getElementById("btnSend");
        const wishText = document.getElementById("wishText");
        const toastBox = document.getElementById("toast");

        let isOpen = false;

        function toggleEnvelope(openForce) {
            isOpen = typeof openForce === "boolean" ? openForce : !isOpen;
            env.classList.toggle("open", isOpen);
            if (isOpen) burstHearts();
        }

        env.addEventListener("click", (e) => {
            if (e.target === btnAgain || e.target === btnWrite) return;
            toggleEnvelope(true);
        });

        btnAgain.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleEnvelope(false);
            setTimeout(() => env.focus(), 0);
        });

        btnWrite.addEventListener("click", (e) => {
            e.stopPropagation();
            modal.classList.add("show");
            wishText.focus();
        });

        btnCancel.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        btnSend.addEventListener("click", async () => {
            const content = wishText.value.trim();
            if (content) {
                try {
                    await fetch("/api/send", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: content }),
                    });
                    wishText.value = "";
                    modal.classList.remove("show");
                    showToast("✨ Đã gửi cho ông trời rồi nhé ✨");
                } catch (err) {
                    console.error(err);
                    showToast("❌ Lỗi gửi tin nhắn");
                }
            }
        });

        function burstHearts() {
            const count = 18 + Math.floor(Math.random() * 12);
            const rect = env.getBoundingClientRect();
            for (let i = 0; i < count; i++) {
                const h = document.createElement("div");
                h.className = "heart";
                h.textContent =
                    Math.random() > 0.2
                        ? "❤"
                        : Math.random() > 0.5
                            ? "💕"
                            : "💖";
                const startX = 20 + Math.random() * (rect.width - 40);
                h.style.left = startX + "px";
                h.style.bottom = "22%";
                h.style.animationDelay = i * 0.05 + "s";
                h.style.fontSize = 16 + Math.random() * 16 + "px";
                heartsBox.appendChild(h);
                setTimeout(() => h.remove(), 3600 + i * 50);
            }
        }

        function showToast(message) {
            const msg = document.createElement("div");
            msg.className = "toast-msg";
            msg.textContent = message;

            const heart = document.createElement("div");
            heart.className = "toast-heart";
            heart.textContent = "❤";
            msg.appendChild(heart);

            toastBox.appendChild(msg);

            setTimeout(() => {
                msg.style.opacity = "0";
                msg.style.transform = "translateY(-20px)";
                setTimeout(() => msg.remove(), 400);
            }, 3000);
        }
    }, []);

    return (
        <div className="wrap">
            <h1>Gửi Sữa yêu – một chiếc phong thư nho nhỏ</h1>
            <p className="lead">Bấm vào dưới nhé 💌</p>

            <div className="scene">
                <div
                    className="envelope"
                    id="envelope"
                    role="button"
                    aria-label="Mở phong thư"
                    tabIndex="0"
                >
                    <div className="env-base"></div>
                    <div className="pocket"></div>
                    <div className="flap"></div>
                    <div className="seal pulse">❤</div>

                    <div className="letter" id="letter">
                        <h2>Em yêu à,</h2>
                        <p>
                            Anh biết dạo này em rất buồn và mệt. Anh có thể không hiểu hết
                            những gì em đang trải qua, nhưng anh muốn em nhớ rằng em không bao
                            giờ phải chịu đựng một mình.
                        </p>
                        <p>
                            Dù chúng ta xa nhau, anh vẫn luôn bên em, lắng nghe và cùng em đi
                            qua mọi khó khăn. Em mạnh mẽ hơn em nghĩ nhiều lắm, và anh tin rồi
                            mọi chuyện cũng sẽ dần ổn thôi.
                        </p>
                        <p>Anh luôn yêu và ở cạnh em, dù ở bất cứ đâu ❤</p>
                        <p>Thương em nhiều ❤</p>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <button className="btn" id="btnAgain" aria-label="Đóng thư">
                                Đóng thư
                            </button>
                            <p>&nbsp; &nbsp;</p>
                            <button
                                className="btn"
                                id="btnWrite"
                                aria-label="Viết gì đó gửi ông trời"
                            >
                                Viết gì đó gửi ông trời
                            </button>
                        </div>
                    </div>

                    <div className="hearts" id="hearts" aria-hidden="true"></div>
                </div>
            </div>

            <footer>@ from Quoc Khanh</footer>

            <div className="modal" id="modal">
                <div className="modal-box">
                    <h3>
                        Hãy viết thật thoải mái nhé, cái này anh không nhận được đâu, coi
                        như em gửi cho ông trời
                    </h3>
                    <textarea
                        id="wishText"
                        placeholder="Viết điều em muốn gửi..."
                    ></textarea>
                    <div className="modal-actions">
                        <button className="btn" id="btnCancel">
                            Hủy
                        </button>
                        <button className="btn" id="btnSend">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>

            <div id="toast"></div>
        </div>
    );
}
