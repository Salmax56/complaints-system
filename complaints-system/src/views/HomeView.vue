<template>
  <div class="main-container dir-rtl" dir="rtl">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title animate-fade-in-down">منصة إدارة الشكاوى والمقترحات</h1>
        <p class="hero-subtitle animate-fade-in-up">صوتك مسموع.. تواصل معنا دائماً ونحن هنا لخدمتك.</p>
      </div>
    </div>

    <div class="cards-section">
      <div class="cards-grid">
        <div class="info-card">
          <div class="card-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h2 class="card-title">قدّم شكوى جديدة</h2>
          <p class="card-text">شاركنا ملاحظاتك أو سجل شكواك مباشرة عبر ملء الاستبيانات التفصيلية لضمان متابعة سريعة وفعالة.</p>
          <button @click="navigateTo('/add-complaint')" class="card-btn">قدّم الآن</button>
        </div>

        <div class="info-card featured-card">
          <div class="card-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h2 class="card-title">تابع شكواك</h2>
          <p class="card-text">ادخل رقم المرجع لمتابعة حالة شكواك ومعرفة آخر التحديثات والإجراءات المتخذة حيالها.</p>
          <button @click="navigateTo('/list')" class="card-btn card-btnFeatured">تابع حالة الشكوى</button>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
          <h2 class="card-title">قدّم مقترحاً</h2>
          <p class="card-text">ساهم بأفكارك لتطوير خدماتنا والمشاركة في المناقشات المفتوحة حول تحسين الأداء العام.</p>
          <button @click="navigateTo('/add-suggestion')" class="card-btn">شارك بفكرة</button>
        </div>
      </div>
    </div>

    <section class="stats-section">
      <h2 class="section-heading">إحصائيات النظام</h2>
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <div :class="['stat-icon-box', stat.colorClass]">
            <component :is="stat.icon" class="stat-svg" />
          </div>
          <div class="stat-info">
            <span class="stat-num">{{ stat.value }}</span>
            <p class="stat-desc">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-heading">مميزات النظام</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-box bg-light-red">
            <svg class="feature-svg text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h3>سهولة التقديم</h3>
          <p>نموذج بسيط وسهل لتقديم الشكاوى مع إمكانية إرفاق المستندات.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box bg-light-yellow">
            <svg class="feature-svg text-yellow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          </div>
          <h3>متابعة فورية</h3>
          <p>تتبع حالة شكواك لحظياً والحصول على تحديثات مستمرة.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box bg-light-green">
            <svg class="feature-svg text-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3>حلول سريعة</h3>
          <p>فريق متخصص لمعالجة الشكاوى بكفاءة ومهنية عالية.</p>
        </div>
      </div>
    </section>

    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-grid">
          <div class="footer-col">
            <h3 class="footer-logo">نظام إدارة الشكاوى الذكي</h3>
            <p>منصة متكاملة لإدارة ومتابعة الشكاوى بكفاءة عالية، تهدف لتحسين جودة الخدمات للمواطنين.</p>
          </div>
          <div class="footer-col">
            <h4>روابط سريعة</h4>
            <ul>
              <li>الرئيسية</li>
              <li>لوحة التحكم</li>
              <li>الشكاوى</li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>اتصل بنا</h4>
            <p>القاهرة، مصر</p>
            <p>info@complaints.gov.eg</p>
            <p>+20 123 456 7890</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 جميع الحقوق محفوظة للنظام الذكي</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue';
import { useRouter } from 'vue-router';

// Variables
const router = useRouter();
const userInput = ref('');
const userMessage = ref('');
const isChatOpen = ref(false);

// Functions
const navigateTo = (path) => router.push(path);

const sendMessage = () => {
  if (userInput.value.trim()) {
    userMessage.value = userInput.value;
    userInput.value = '';
  }
};

// Icons components
const IconFile = defineComponent({ 
  render: () => h('svg', { class: 'stat-svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '1.5' }, 
  [h('path', { d: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' })]) 
});

const IconCheck = defineComponent({ 
  render: () => h('svg', { class: 'stat-svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: '1.5' }, 
  [h('path', { d: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' })]) 
});

const stats = [
  { label: 'إجمالي الشكاوى', value: '1,248', icon: IconFile, colorClass: 'bg-red' },
  { label: 'تم الحل بنجاح', value: '856', icon: IconCheck, colorClass: 'bg-red' }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

.dir-rtl { font-family: 'Cairo', sans-serif; background-color: #f8fafc; color: #1e293b; overflow-x: hidden; }

/* Hero Section */
.hero-section {
  height: 65vh;
  background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80');
  background-size: cover; background-position: center;
  display: flex; align-items: center; justify-content: center; text-align: center; color: white; position: relative;
}
.hero-title { font-size: 3.5rem; font-weight: 900; margin-bottom: 20px; letter-spacing: -1px; }
.hero-subtitle { font-size: 1.25rem; opacity: 0.9; font-weight: 400; }

/* Cards Section */
.cards-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px; width: 90%; max-width: 1200px; margin: -100px auto 60px; position: relative; z-index: 10;
}
.info-card {
  background: white; padding: 50px 35px; border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06); text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(226, 232, 240, 0.8); position: relative; overflow: hidden;
}
.info-card:hover { transform: translateY(-15px); box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
.featured-card { border: 2.5px solid #b30000; background: #fffbff; }
.card-icon-wrapper {
  width: 90px; height: 90px; background: #fff1f2; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;
  color: #b30000; transition: 0.3s;
}
.info-card:hover .card-icon-wrapper { background: #b30000; color: white; transform: rotateY(180deg); }
.icon-svg { width: 40px; height: 40px; }
.card-title { color: #0f172a; font-size: 1.6rem; font-weight: 800; margin-bottom: 15px; }
.card-text { color: #64748b; line-height: 1.7; font-size: 1rem; margin-bottom: 25px; }
.card-btn {
  padding: 14px 30px; border-radius: 15px; border: 2px solid #b30000; color: #b30000;
  font-weight: 700; background: white; cursor: pointer; transition: 0.3s; width: 100%;
}
.card-btn:hover { background: #b30000; color: white; }
.card-btnFeatured { background: #b30000; color: white; }

/* Stats Section */
.stats-section { padding: 100px 5% 60px; text-align: center; }
.section-heading { font-size: 2.2rem; font-weight: 900; margin-bottom: 50px; color: #0f172a; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; max-width: 1000px; margin: 0 auto; }
.stat-card {
  background: white; padding: 30px; border-radius: 25px; display: flex; align-items: center; gap: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.02); transition: 0.3s;
}
.stat-icon-box { width: 75px; height: 75px; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: white; }
.bg-red { background: linear-gradient(135deg, #ef4444, #b30000); }
.bg-green { background: linear-gradient(135deg, #10b981, #059669); }
.stat-svg { width: 35px; height: 35px; }
.stat-num { font-size: 2.2rem; font-weight: 900; color: #0f172a; line-height: 1; }
.stat-desc { color: #94a3b8; font-weight: 600; margin-top: 5px; }

/* Features Section */
.features-section { padding: 80px 5%; background: white; text-align: center; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
.feature-card { padding: 40px 20px; border-radius: 20px; border: 1px solid #f1f5f9; transition: 0.3s; }
.feature-icon-box { width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.bg-light-red { background: #fff1f2; } .text-red { color: #e11d48; }
.bg-light-yellow { background: #fffbeb; } .text-yellow { color: #d97706; }
.bg-light-green { background: #f0fdf4; } .text-green { color: #16a34a; }
.feature-svg { width: 35px; height: 35px; }

/* Footer */
.main-footer { background: #0f172a; color: #f8fafc; padding: 80px 5% 30px; margin-top: 80px; }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto; }
.footer-logo { font-size: 1.5rem; font-weight: 900; color: #b00404; margin-bottom: 20px; }
.footer-col h4 { font-size: 1.2rem; margin-bottom: 20px; border-right: 3px solid #b00404; padding-right: 15px; }
.footer-col ul { list-style: none; padding: 0; }
.footer-col li { margin-bottom: 12px; opacity: 0.8; cursor: pointer; transition: 0.3s; }
.footer-bottom { text-align: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); opacity: 0.6; font-size: 0.9rem; }

/* Animations */
@keyframes fade-in-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
@keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
</style>