<template>
  <div class="main-layout">
    <header class="navbar">
      <div class="container">
        <div class="logo-section">
          <div class="logo-text"><h1>نظام إدارة الشكاوى</h1></div>
        </div>

        <nav class="nav-links">
          <router-link to="/" class="nav-item">الرئيسية</router-link>
          <router-link to="/about" class="nav-item">نبذة عنا</router-link> 

          <template v-if="userRole === 'admin'">
            <router-link to="/dashboard" class="nav-item">لوحة التحكم</router-link>
            <router-link to="/users" class="nav-item">إدارة المستخدمين</router-link>
          </template>

          <template v-else-if="userRole === 'user'">
            <router-link to="/list" class="nav-item">الشكاوى</router-link>
            <router-link to="/add-complaint" class="nav-item">إضافة شكوى</router-link>
          </template>
        </nav>

        <div class="auth-buttons">
          <template v-if="!userRole">
            <button class="login-btn" @click="loginAsUser">دخول مستخدم</button>
            <button class="register-btn" @click="loginAsAdmin">دخول أدمن</button>
          </template>
          
          <template v-else>
            <span class="user-label">مرحباً ({{ userRole === 'admin' ? 'المدير' : 'المستخدم' }})</span>
            <button class="login-btn logout-style" @click="logout">خروج</button>
          </template>
        </div>
      </div>
    </header>

    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userRole = ref(null) 
const router = useRouter()

// وظيفة دخول المستخدم: تغير الرتبة وتنقلك لصفحة الإضافة
const loginAsUser = () => {
  userRole.value = 'user'
  router.push('/add-complaint')
}

// وظيفة دخول الأدمن: تغير الرتبة وتنقلك للوحة التحكم
const loginAsAdmin = () => {
  userRole.value = 'admin'
  router.push('/dashboard')
}

// وظيفة الخروج: ترجع الحالة لـ null وترجعك للرئيسية
const logout = () => {
  userRole.value = null
  router.push('/')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Cairo', sans-serif !important; }
body { direction: rtl; background-color: #f5f5f5; }

.navbar { background-color: white; height: 80px; display: flex; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
.container { width: 90%; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.logo-text h1 { font-size: 1.2rem; color: #b30000; font-weight: 700; }

.nav-links { display: flex; gap: 10px; }
.nav-item { text-decoration: none; color: #555; padding: 8px 12px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; transition: 0.3s; }
.nav-item:hover, .router-link-active { background-color: #b30000; color: white; }

.auth-buttons { display: flex; gap: 10px; }
.login-btn { background: none; border: 1px solid #ddd; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.register-btn { background-color: #b30000; color: white; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.logout-style { color: #b30000; border-color: #b30000; }
.user-label { align-self: center; margin-left: 10px; font-weight: bold; font-size: 0.9rem; color: #666; }
.page-content { min-height: calc(100vh - 80px); }
</style>