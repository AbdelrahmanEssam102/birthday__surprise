// ==========================================
// ❤️ أنيميشن القلب النيون المتحرك على شاشة الإنترو
// ==========================================
const canvasContainer = document.getElementById('heart-canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    return new THREE.Vector3(x * 0.15, y * 0.15, 0);
}

const geometry = new THREE.BufferGeometry();
const vertices = [];
const totalParticles = 500;

for (let i = 0; i < totalParticles; i++) {
    const t = (i / totalParticles) * Math.PI * 2;
    const point = getHeartPoint(t);
    point.x += (Math.random() - 0.5) * 0.4;
    point.y += (Math.random() - 0.5) * 0.4;
    point.z += (Math.random() - 0.5) * 0.4;
    vertices.push(point.x, point.y, point.z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
    color: 0xff007f,
    size: 0.07,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const heartParticles = new THREE.Points(geometry, material);
scene.add(heartParticles);

gsap.from(heartParticles.scale, { x: 0, y: 0, z: 0, duration: 2.5, ease: "elastic.out(1, 0.5)" });

function animateHeart() {
    requestAnimationFrame(animateHeart);
    heartParticles.rotation.y += 0.01; 
    renderer.render(scene, camera);
}
animateHeart();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// ⏰ كود العداد التنازلي المدمج في الإنترو (30 أكتوبر 2026)
// ==========================================
function updateCountdown() {
    const targetDate = new Date("may 24, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        const timeBoxes = document.querySelectorAll('#intro-countdown .time-box span');
        timeBoxes[0].innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        timeBoxes[1].innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        timeBoxes[2].innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeBoxes[3].innerText = Math.floor((diff % (1000 * 60)) / 1000);
    } else {
        // عندما يكتمل العداد بنجاح
        clearInterval(countdownInterval);
        document.getElementById('welcome-title').innerText = "اكتمل القمر ودلوقتي وقت المفاجأة ! 😍";
        document.getElementById('intro-countdown').style.display = 'none';
        document.getElementById('start-btn').style.display = 'inline-block'; // إظهار زر انطلق
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// دالة الدخول للموقع وتشغيل الأغنية المحدثة لتسريع الفون
function startEverything() {
    const overlay = document.getElementById('welcome-overlay');
    overlay.style.opacity = '0';
    
    setTimeout(() => { 
        overlay.style.display = 'none'; 
        
        // 🚀 السطور السحرية لتدمير الأنيميشن تماماً وتحرير رامات التليفون
        cancelAnimationFrame(animateHeart); // إيقاف محرك الحركة
        scene.remove(heartParticles); // حذف جزيئات القلب من المشهد
        geometry.dispose(); // مسح الهيكل من الذاكرة
        material.dispose(); // مسح الألوان والنيون من الذاكرة
        renderer.dispose(); // إغلاق محرك الرندر تماماً
        
        // تنظيف الحاوية لضمان عدم وجود أي بقايا ثقيلة
        document.getElementById('heart-canvas-container').innerHTML = '';
    }, 800);
    
    togglePlay('song4'); // تشغيل الأغنية الأولى
}


// ==========================================
// ✉️ كود فتح الظرف السحري والرسالة
// ==========================================
function openEnvelope() {
    const envelope = document.getElementById('main-envelope');
    envelope.classList.add('open');
    document.querySelector('.hint-click-env').style.display = 'none';
    setTimeout(() => {
        document.getElementById('go-from-envelope').style.display = 'inline-block';
    }, 800);
}

// ==========================================
// 2. كود زينة الخلفية المتحركة
// ==========================================
const container = document.getElementById('hearts-container');
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const icons = ['❤️', '🤍', '💖', '🎈', '🎉', '✨'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart,1000);

// ==========================================
// 4. كود هروب زر "لأ" الفخ
// ==========================================
const btnNo = document.getElementById('btn-no');
function escapeButton() {
    const containerWidth = document.querySelector('.prank-container').offsetWidth;
    const containerHeight = document.querySelector('.prank-container').offsetHeight;
    const randomX = Math.floor(Math.random() * (containerWidth - btnNo.offsetWidth - 40)) + 10;
    const randomY = Math.floor(Math.random() * (containerHeight - btnNo.offsetHeight - 140)) - 20;
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}
btnNo.addEventListener('mouseenter', escapeButton);
btnNo.addEventListener('touchstart', function(e) { e.preventDefault(); escapeButton(); });

function answerYes() {
    document.getElementById('prank-question').style.display = 'none';
    document.querySelector('.prank-buttons-wrapper').style.display = 'none';
    document.getElementById('prank-success-msg').style.display = 'block';
}

// ==========================================
// 5. كود شريط الذكريات السينمائي بالمسارات المحلية الخاصة بك
// ==========================================
const storyData = {
    0: { caption: "يلا بينا . كل 10% في استيكر شوفيهم بالترتيب وبعدين اختاري نسبتك😉", img: "image/000.jpg" },
    10: { caption: "اممممممم😒😒😒😒 🌱", img: "image/10.jpg" },
    20: { caption: "بطلي هزار بقى 🔪", img: "image/20.jpg" },
    30: { caption: "ها اي تاااني ؟؟؟؟؟؟؟", img: "image/30.jpg" },
    40: { caption: "في جيييييه😡", img: "image/40.jpg" },
    50: { caption: "ده اللي ربنا قدرك عليك🙄", img: "image/50.jpg" },
    60: { caption: "هتزودي ولا تونس مغاوري😤", img: "image/60.jpg" },
    70: { caption: "بحبحيها شويه🤏", img: "image/70.jpg" },
    80: { caption: "شكرا والله 🥰✨", img: "image/80.jpg" },
    90: { caption: "انا يا بنتي شكرا على ثقتك الغاليه❤️❤️✨", img: "image/90.jpg" },
    100: { caption: "ااااااه اي الحلاوه ديه 🤤🤤🤤", img: "image/100.jpg" }
};

const slider = document.getElementById('story-slider');
const rangeValue = document.getElementById('range-value');
const storyImg = document.getElementById('story-img');
const storyCaption = document.getElementById('story-caption');

slider.addEventListener('input', function() {
    const value = this.value;
    rangeValue.innerText = value;
    if (storyData[value]) {
        storyImg.style.transform = "scale(0.95)"; storyImg.style.opacity = 0.3;
        setTimeout(() => {
            storyImg.src = storyData[value].img;
            storyCaption.innerText = storyData[value].caption;
            storyImg.style.transform = "scale(1)"; storyImg.style.opacity = 1;
        }, 200);
    }
});

// ==========================================
// 6. لعبة الأسئلة الـ 5 التفاعلية
// ==========================================
const quizQuestions = [
    { q: "هل أول مرة اتقابلنا فيها كانت في فصل الشتاء? ❄️",
         correct: true, success: { text: "صح! برافو عليكي  🧥",
             img: "image/true.jpg" },
              fail: { text: "لأ غلط! إحنا اتقابلنا في بدايه الشتاء 🥶",
                 img: "image/false.jpg" } },

    { q: "طولي تحت 190 سم🤔؟؟؟",
         correct: true, success: { text: "بالظبط صح! مفيش بني ادم اطول من كده 😂",
             img: "image/true.jpg" },
              fail: { text: " اكيد غلط  🍔",
                 img: "image/false.jpg" } },

    { q: "هل حماقي هو المغني المفضل اللي بنسمعه دايماً في خروجاتنا؟ 🎤",
         correct: false, success: { text: "شطوره! الإجابة غلط، لاننا بنحب عمرو دياب 🎵",
             img: "image/true.jpg" },
              fail: { text: "لأ غلط.. 😉",
                 img: "image/false.jpg" } },

    { q: "انا اللي مصمم الموقع💡؟؟؟",
         correct: true, success: { text: "أكيد صح! انا السوفت وير  ",
             img: "image/true.jpg" },
              fail: { text: "عيب عليكي يقى متصغرناش . لا طعبا",
                 img: "image/false.jpg" } },

    { q: "تفتكري اعرف عنك حاجات كتير؟؟؟",
         correct: true, success: { text: "اكيد . اعرف حاجات كتير",
             img: "image/true.jpg" },
              fail: { text: "لاء . عارفك كويس",
                 img: "image/false.jpg" } }
];
let currentQuestionIndex = 0;
function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        document.getElementById("quiz-box").style.display = "block"; document.getElementById("quiz-feedback").classList.add("feedback-hidden");
        document.getElementById("question-number").innerText = `السؤال ${currentQuestionIndex + 1} من 5`;
        document.getElementById("question-text").innerText = quizQuestions[currentQuestionIndex].q;
    } else {
        document.getElementById("quiz-box").style.display = "none"; document.getElementById("quiz-feedback").classList.remove("feedback-hidden");
        document.getElementById("feedback-img").src = "image/Q kiss.jpg";
        document.getElementById("feedback-text").innerHTML = "🥳 مبروك خلصتي . هل  عرفتيني ❤️";
        document.getElementById("next-btn").style.display = "none";
    }
}
function checkAnswer(userAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("quiz-feedback").classList.remove("feedback-hidden");
    if (userAnswer === currentQuestion.correct) {
        document.getElementById("feedback-img").src = currentQuestion.success.img;
         document.getElementById("feedback-text").innerText = currentQuestion.success.text;
    } else {
        document.getElementById("feedback-img").src = currentQuestion.fail.img;
         document.getElementById("feedback-text").innerText = currentQuestion.fail.text;
    }
}
function nextQuestion() { currentQuestionIndex++; loadQuestion(); }
loadQuestion();

// ==========================================
// 📝 محرك الـ 10 أسئلة المقالية وإرسالها لـ Google Sheets صامتاً
// ==========================================
const essayQuestions = [
    "هل كنتي خايفه تفتحيها ل يكون حد عاوز يهكر تلفونك😂؟؟؟",
    "اختارتي نسبه حبك ليا كام🌚؟؟؟",
    "اي رايك في الهديه😁❤️؟؟؟",
    "لو جه واحد غريب واعطاك صندوق وقالك فيه اسرار وفضايح كل اللي حواليكي هل تفتحيه😲او فاكس😶؟؟؟",
    "لو نسختك الصغيره شافتك دلوقتي هتكون فخوره بيكي👀؟؟؟",
    "اي اكتر حاجه ممكن تفرحك🧐؟؟؟",
    "انتي معاكي مصباح علاء الدين وليكي 3 امنيات اي هما ال3 امنيات اللي هتطلبيهم 🌟؟؟؟",
    "مين اول شخص جه في دماغك حسيتي انه هو اللي ورا الهديه ديه🙋‍♂️🙋🙋‍♀️ ؟؟؟",
    "اي اكتر موقف حصلك وخلاكي تضحكي من قلبك🤣؟؟؟",
    "لو رجعتي ب الزمن اي اكتر حاجه هتكوني نفسك تغييريها🫠؟؟؟"
];

let currentEssayIndex = 0;
let userAnswersLog = {}; // كائن لحفظ البيانات منسقة كجدول لإرسالها

function loadEssayQuestion() {
    if (currentEssayIndex < essayQuestions.length) {
        document.getElementById("essay-box").style.display = "block";
        document.getElementById("essay-final-box").style.display = "none";
        document.getElementById("essay-number").innerText = `السؤال ${currentEssayIndex + 1} من 10`;
        document.getElementById("essay-question-text").innerText = essayQuestions[currentEssayIndex];
        document.getElementById("essay-answer-input").value = "";
    } else {
        document.getElementById("essay-box").style.display = "none";
        document.getElementById("essay-final-box").style.display = "block";
    }
}

function submitEssayAnswer() {
    const answerText = document.getElementById("essay-answer-input").value.trim();
    if (answerText === "") { alert(" اكتبي إجابتك الاول! 😉"); return; }
    
    // حفظ السؤال برقم العمود المناسب في ملف الإكسل
    userAnswersLog[`Question_${currentEssayIndex + 1}`] = answerText;
    
    currentEssayIndex++;
    loadEssayQuestion();
}

// 🚀 دالة الربط والإرسال المباشر لـ Google Sheets عبر Sheet Monkey
function sendAnswersToGoogleSheets() {
    // ⚠️ ضع رابط الـ API الخاص بك من Sheet Monkey بين علامتي التنصيص بالأسفل
    const sheetMonkeyUrl = "https://api.sheetmonkey.io/form/wXtShfPxNao7B3dP6nNKp8"; 
    
    const statusText = document.getElementById("sheet-status-text");
    const sendBtn = document.getElementById("send-sheet-btn");
    
    statusText.innerText = "جاري حفظ الإجابات وتأمين الصندوق... ⏳";
    sendBtn.disabled = true;

    fetch(sheetMonkeyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswersLog)
    })
    .then(response => {
        if(response.ok) {
            statusText.innerHTML = "🎉 تم الإرسال وحفظ البيانات بنجاح وأمان كامل! كملي جولتك تحت 🔐";
            sendBtn.style.display = "none";
        } else {
            statusText.innerText = "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى ❌";
            sendBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        statusText.innerText = "فشل الاتصال بالخادم، تحقق من الرابط ❌";
        sendBtn.disabled = false;
    });
}
loadEssayQuestion();



// ==========================================
// 🎵 كود التحكم بالصوت والأغاني (يدعم أي عدد أغاني)
// ==========================================
function togglePlay(id) {
    const audio = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    // إيقاف وتصفير أي أغنية أخرى شغال حالياً تلقائياً مهما كان عددها
    document.querySelectorAll('audio').forEach(el => {
        if(el.id !== id) { 
            el.pause(); 
            el.currentTime = 0; 
            // تأكد من إرجاع الأيقونة لشكل التشغيل للأغاني الأخرى
            const otherIcon = document.getElementById('icon-' + el.id);
            if(otherIcon) otherIcon.innerText = "▶️"; 
        }
    });
    
    // تشغيل أو إيقاف الأغنية الحالية
    if (audio.paused) { 
        audio.play().catch(e => console.log("تحتاج تفاعل من المستخدم أولاً")); 
        icon.innerText = "⏸️"; 
    } 
    else { 
        audio.pause(); 
        icon.innerText = "▶️"; 
    }
}