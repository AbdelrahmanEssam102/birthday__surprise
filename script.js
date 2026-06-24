// ==========================================
// 🌟 1. إعداد مشهد الـ Three.js للقلب النيون
// ==========================================
let scene, camera, renderer, heartParticles, geometry, material;
let animationFrameId = null; // لمعالجة مشكلة القفلة وتتبع الحركة بأمان

function initHeartAnimation() {
    const container = document.getElementById('heart-canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // إنشاء هيكل جزيئات القلب (تم تقليله لـ 400 لجعل الموبايل سريع جداً)
    const totalParticles = 400;
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(totalParticles * 3);

    for (let i = 0; i < totalParticles; i++) {
        const t = Math.PI * 2 * (i / totalParticles);
        // معادلة رسم القلب الرياضية فخمة ونظيفة
        const x = 16 * Math.pow(Math.sin(t), 3) * 0.1;
        const y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * 0.1;
        const z = (Math.random() - 0.5) * 0.5;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    material = new THREE.PointsMaterial({
        color: 0xff007f, // لون نيون وردي فاجر
        size: 0.08,
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    heartParticles = new THREE.Points(geometry, material);
    scene.add(heartParticles);

    // بدء حلقة الحركة بأمان
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        heartParticles.rotation.y += 0.005;
        // تأثير نبض خفيف للقلب
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.05;
        heartParticles.scale.set(scale, scale, scale);
        renderer.render(scene, camera);
    }
    animate();
}

// تشغيل الأنيميشن أول ما الموقع يفتح
window.addEventListener('DOMContentLoaded', initHeartAnimation);

// استجابة لتغيير حجم الشاشة
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// ==========================================
// 🚀 2. دالة الإنطلاق الفوري وتدمير الأنيميشن بأمان لمنع التهنيج والخطأ
// ==========================================
function startEverything() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            
            // التدمير الآمن والنهائي للمحرك لمنع قفلة المتصفح (CORS/Chrome Error)
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (renderer) {
                try {
                    scene.remove(heartParticles);
                    geometry.dispose();
                    material.dispose();
                    renderer.dispose();
                    document.getElementById('heart-canvas-container').innerHTML = '';
                } catch(e) { console.log("تم التنظيف بنجاح"); }
            }
        }, 800);
    }
    togglePlay('song1'); // تشغيل الأغنية الأولى تلقائياً
}

// ==========================================
// 🎵 3. كود التحكم بالأغاني (سلس ويدعم أي عدد)
// ==========================================
function togglePlay(id) {
    const audio = document.getElementById(id);
    if (!audio) return;
    
    const icon = document.getElementById('icon-' + id);
    
    document.querySelectorAll('audio').forEach(el => {
        if (el.id !== id) { 
            el.pause(); 
            el.currentTime = 0; 
            const otherIcon = document.getElementById('icon-' + el.id);
            if (otherIcon) otherIcon.innerText = "▶️"; 
        }
    });
    
    if (audio.paused) { 
        audio.play().catch(e => console.log("تحتاج تفاعل مستخدم أولاً")); 
        if (icon) icon.innerText = "⏸️"; 
    } else { 
        audio.pause(); 
        if (icon) icon.innerText = "▶️"; 
    }
}

// ==========================================
// 📊 4. ربط Google Sheets عبر Sheet Monkey الإرسال الآمن
// ==========================================
function sendAnswersToGoogleSheets() {
    // ⚠️ ضع رابط الـ API الخاص بك من Sheet Monkey بالأسفل مكان علامات الاستفهام
    const sheetMonkeyUrl = "https://api.sheetmonkey.io/form/xxxxxxxxxxxx"; 
    
    const statusText = document.getElementById("sheet-status-text");
    const sendBtn = document.getElementById("send-sheet-btn");
    
    if (sheetMonkeyUrl.includes("xxxx")) {
        alert("برجاء وضع رابط فورم Sheet Monkey الخاص بك أولاً في ملف script.js");
        return;
    }

    if (sendBtn) sendBtn.disabled = true;
    if (statusText) statusText.innerText = "جاري الحفظ بأمان في قاعدة البيانات... ⏳";

    // تجميع الإجابات من الـ localStorage اللي خزنّا فيها إجابات الـ 10 أسئلة المقالية
    const dataToSend = {};
    for (let i = 1; i <= 10; i++) {
        dataToSend[`Question_${i}`] = localStorage.getItem(`essay_ans_${i}`) || "لم يتم الإجابة";
    }

    fetch(sheetMonkeyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (response.ok) {
            if (statusText) statusText.innerText = "تم حفظ إجاباتك السرية بنجاح تام! 🔐❤️";
            alert("تم إرسال الإجابات السرية لحمزة بنجاح! 🎉");
        } else {
            throw new Error("فشل الإرسال");
        }
    })
    .catch(error => {
        console.error(error);
        if (statusText) statusText.innerText = "حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة مرة أخرى.";
        if (sendBtn) sendBtn.disabled = false;
    });
}

// توليد قلوب الخلفية بشكل متزن وخفيف (قلب كل ثانية)
setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('background-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}, 1000);