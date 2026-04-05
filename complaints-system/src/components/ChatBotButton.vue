<template>
  <div class="chatbot-wrapper">
    <transition name="el-zoom-in-bottom">
      <div v-if="isChatOpen" class="chat-window">
        <div class="chat-header">
          <div class="header-content">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>مساعد نظام الشكاوى الذكي</span>
          </div>
          <div @click="toggleChat" class="close-btn-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <div class="chat-body">
          <div class="messages-container">
            <div class="message bot-message">
              <div class="avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                  <line x1="16" y1="16" x2="16" y2="16"></line>
                </svg>
              </div>
              <div class="text-bubble">
                أهلاً بكِ يا سلمى، كيف يمكنني مساعدتك في تقديم شكواكِ اليوم؟
              </div>
            </div>
          </div>

          <div class="input-area">
            <el-input 
              v-model="userInput" 
              placeholder="اكتب رسالتك هنا..." 
              @keyup.enter="sendMessage"
              class="chat-input"
            />
            <el-button type="primary" @click="sendMessage" class="send-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              إرسال
            </el-button>
          </div>
        </div>
      </div>
    </transition>

    <button class="chat-fab" @click="toggleChat">
      <svg v-if="!isChatOpen" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChatOpen = ref(false)
const userInput = ref('')

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const sendMessage = () => {
  if (userInput.value.trim()) {
    console.log("الرسالة:", userInput.value)
    userInput.value = ''
  }
}
</script>

<style scoped>
/* الحاوية الرئيسية */
.chatbot-wrapper {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 10000;
  direction: rtl;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* نافذة الشات */
.chat-window {
  width: 360px;
  height: 520px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

/* الهيدر */
.chat-header {
  background-color: #A51515;
  color: #ffffff;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 15px;
}

.close-btn-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.close-btn-wrapper:hover {
  opacity: 0.7;
}

/* الجسم */
.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fcfcfc;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.avatar {
  width: 38px;
  height: 38px;
  background-color: #A51515;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(165, 21, 21, 0.2);
}

.text-bubble {
  background: white;
  padding: 12px 16px;
  border-radius: 0 18px 18px 18px;
  border: 1px solid #ededed;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  max-width: 80%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

/* منطقة الإدخال */
.input-area {
  padding: 15px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 10px;
  background: white;
}

.send-btn {
  display: flex;
  align-items: center;
  background-color: #A51515 !important;
  border-color: #A51515 !important;
}

/* الزر العائم FAB */
.chat-fab {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #A51515;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(165, 21, 21, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-fab:hover {
  transform: scale(1.1);
  background-color: #8b1212;
}

.chat-fab:active {
  transform: scale(0.95);
}

/* تأثيرات الانتقال */
.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
  transition: all 0.3s ease-out;
}
</style>