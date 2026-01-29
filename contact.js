/**
 * TMVC Website - Contact Form Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = '正在送出...';

        status.style.display = 'block';
        status.style.background = 'rgba(14, 165, 233, 0.1)';
        status.style.color = 'var(--text-dim)';
        status.innerText = '正在傳送您的訊息，請稍候...';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.style.background = 'rgba(16, 185, 129, 0.2)';
                status.style.color = '#6ee7b7';
                status.innerText = '感謝您的來信！我們已收到您的諮詢，將儘快處理。';
                form.reset();
                submitBtn.innerText = '送出成功';
            } else {
                const data = await response.json();
                throw new Error(data.error || '傳送失敗');
            }
        } catch (error) {
            status.style.background = 'rgba(239, 68, 68, 0.2)';
            status.style.color = '#fca5a5';

            let errorMsg = error.message;
            if (errorMsg.includes("isn't set up yet")) {
                errorMsg = '表單尚未啟用。請務必至 tmvcserv@tmvc.com.tw 收取 Formspree 的確認信並點擊「Activate Form」按鈕。';
            }

            status.innerText = '抱歉，發生錯誤：' + errorMsg + '。請稍後再試，或直接來信 tmvcserv@tmvc.com.tw';
            submitBtn.disabled = false;
            submitBtn.innerText = '重新送出';
        }
    };
});
