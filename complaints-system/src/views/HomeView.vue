<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <div class="yellow-circle">📄</div>
        <h1>Shakwa</h1>
        <p>منصة متكاملة لتقديم ومتابعة الشكاوى بكفاءة وشفافية عالية</p>
        
        <div class="hero-buttons">
          <div v-if="userRole === 'user'">
            <button class="btn-main" @click="$router.push('/add-complaint')">تقديم شكوى جديدة ←</button>
            <button class="btn-sub" @click="$router.push('/list')">تتبع الشكوى</button>
          </div>

          <div v-else-if="userRole === 'admin'">
            <button class="btn-main" @click="$router.push('/dashboard')">لوحة التحكم</button>
            <button class="btn-sub" @click="$router.push('/users')">إدارة المستخدمين</button>
          </div>

          <div v-else>
            <p>سجل دخولك من الأعلى للبدء في استخدام النظام</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// جربي تغيري القيمة دي لـ 'admin' أو 'user' عشان تشوفي الأزرار بتظهر ازاي
const userRole = ref('user') 
</script>

<style scoped>
.hero { background: linear-gradient(135deg, #b30000 0%, #000000 100%); padding: 100px 20px; text-align: center; color: white; min-height: 80vh; }
.yellow-circle { background: #ffcc00; width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; font-size: 2rem; }
.hero h1 { font-size: 2.5rem; margin-bottom: 15px; }
.btn-main { background: #ffcc00; border: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; margin: 10px; color: #000; }
.btn-sub { background: rgba(255,255,255,0.1); border: 1px solid white; color: white; padding: 12px 25px; border-radius: 8px; cursor: pointer; }
</style>