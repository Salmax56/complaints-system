<template>
  <div class="page-container add-complaint-page">
    <div class="page-header">
      <h1>📝 تقديم شكوى جديدة</h1>
      <p>من فضلك قم بملء البيانات التالية لتسجيل شكوى جديدة في النظام.</p>
    </div>

    <form class="card" @submit.prevent="handleSubmit">
      <div class="form-row">
        <label for="title">عنوان الشكوى <span class="required">*</span></label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="اكتب عنواناً واضحاً يلخص الشكوى"
        />
      </div>

      <div class="inline-row">
        <div class="form-row">
          <label for="category">نوع الشكوى</label>
          <select id="category" v-model="form.category">
            <option value="">اختر نوع الشكوى</option>
            <option value="service">خدمة</option>
            <option value="staff">موظف</option>
            <option value="system">نظام إلكتروني</option>
            <option value="other">أخرى</option>
          </select>
        </div>

        <div class="form-row">
          <label for="priority">الأولوية</label>
          <select id="priority" v-model="form.priority">
            <option value="normal">عادية</option>
            <option value="high">مرتفعة</option>
            <option value="urgent">عاجلة</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <label for="description">وصف الشكوى بالتفصيل <span class="required">*</span></label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="اكتب تفاصيل المشكلة، الوقت، المكان، وأي معلومات إضافية تساعد في فهم الشكوى"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input id="anonymous" v-model="form.isAnonymous" type="checkbox" />
          <label for="anonymous">إرسال الشكوى بشكل مجهول</label>
        </div>
        <p class="checkbox-helper">
          في حال اختيار الإرسال بشكل مجهول لن يتم استخدام بيانات التواصل الخاصة بك، ولكن قد يصعب متابعتك لاحقاً.
        </p>
      </div>

      <div class="inline-row" v-if="!form.isAnonymous">
        <div class="form-row">
          <label for="fullName">الإسم الكامل <span class="required">*</span></label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            placeholder="مثال: أحمد محمد علي"
          />
        </div>

        <div class="form-row">
          <label for="email">البريد الإلكتروني</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="example@domain.com"
          />
        </div>

        <div class="form-row">
          <label for="phone">رقم الجوال</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="مثال: 05xxxxxxxx"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-main">إرسال الشكوى</button>
        <button type="button" class="btn-secondary" @click="resetForm">مسح الحقول</button>
      </div>

      <p v-if="errorMessage" class="message error-message">
        {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="message success-message">
        {{ successMessage }}
      </p>
    </form>

    <div class="hint">
      <p>
        💡 تأكد من كتابة جميع التفاصيل المهمة بوضوح، فهذا يساعد فريق الدعم على معالجة الشكوى بشكل أسرع.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  title: '',
  category: '',
  priority: 'normal',
  description: '',
  isAnonymous: false,
  fullName: '',
  email: '',
  phone: '',
})

const errorMessage = ref('')
const successMessage = ref('')

const resetForm = (clearMessages = true) => {
  form.title = ''
  form.category = ''
  form.priority = 'normal'
  form.description = ''
  form.isAnonymous = false
  form.fullName = ''
  form.email = ''
  form.phone = ''

  if (clearMessages) {
    errorMessage.value = ''
    successMessage.value = ''
  }
}

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.title.trim() || !form.description.trim()) {
    errorMessage.value = 'الرجاء إدخال عنوان الشكوى ووصف الشكوى قبل الإرسال.'
    return
  }

  if (!form.isAnonymous && !form.fullName.trim()) {
    errorMessage.value = 'الرجاء إدخال الإسم الكامل أو اختيار إرسال الشكوى بشكل مجهول.'
    return
  }

  console.log('Complaint payload (demo only):', { ...form })

  successMessage.value = 'تم إرسال الشكوى بنجاح (تجريبياً، بدون ربط بالخادم).'
  resetForm(false)
}
</script>

<style scoped>
.page-container {
  direction: rtl;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  color: #1f2933;
}

.page-header {
  text-align: right;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #b00020;
}

.page-header p {
  color: #4b5563;
  font-size: 0.98rem;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f1f1;
}

.form-row {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  text-align: right;
}

.form-row label {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

.required {
  color: #d32f2f;
}

input,
select,
textarea {
  border-radius: 10px;
  border: 1px solid #d0d7de;
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fdfdfd;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #b00020;
  box-shadow: 0 0 0 1px rgba(176, 0, 32, 0.2);
  background: #ffffff;
}

textarea {
  min-height: 110px;
  resize: vertical;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.checkbox-row input {
  width: auto;
}

.checkbox-row label {
  margin: 0;
  font-weight: 500;
}

.checkbox-helper {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 12px;
  text-align: right;
}

.inline-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.btn-main {
  background: #ffcc00;
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
  color: #000000;
}

.btn-secondary {
  background: #ffffff;
  border: 1px solid #d0d7de;
  color: #374151;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-main:hover {
  background: #ffd633;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.message {
  margin-top: 14px;
  font-size: 0.9rem;
  text-align: right;
}

.error-message {
  color: #b00020;
}

.success-message {
  color: #166534;
}

.hint {
  margin-top: 16px;
  font-size: 0.9rem;
  text-align: right;
  color: #4b5563;
}

@media (max-width: 640px) {
  .card {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }
}
</style>
