<template>
  <div class="page-container users-page">
    <div class="page-header">
      <h1>👥 إدارة المستخدمين</h1>
      <p>من هنا يمكنك إدارة حسابات الموظفين المسؤولين عن معالجة الشكاوى.</p>
    </div>

    <section class="card add-user-card">
      <div class="card-header">
        <h2>إضافة مستخدم جديد</h2>
        <p>قم بإدخال بيانات الموظف الجديد ثم اضغط على زر الحفظ. هذه البيانات تجريبية على الواجهة فقط.</p>
      </div>

      <form class="add-user-form" @submit.prevent="handleAddUser">
        <div class="inline-row">
          <div class="form-row">
            <label for="fullName">الإسم الكامل <span class="required">*</span></label>
            <input
              id="fullName"
              v-model="newUser.fullName"
              type="text"
              placeholder="مثال: أحمد محمد علي"
            />
          </div>

          <div class="form-row">
            <label for="email">البريد الإلكتروني <span class="required">*</span></label>
            <input
              id="email"
              v-model="newUser.email"
              type="email"
              placeholder="example@domain.com"
            />
          </div>

          <div class="form-row">
            <label for="role">الدور في النظام</label>
            <select id="role" v-model="newUser.role">
              <option value="agent">موظف دعم</option>
              <option value="admin">مسؤول نظام</option>
              <option value="user">مستخدم عادي</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-main">حفظ المستخدم</button>
        </div>

        <p v-if="formError" class="message error-message">
          {{ formError }}
        </p>
        <p v-if="formSuccess" class="message success-message">
          {{ formSuccess }}
        </p>
      </form>
    </section>

    <section class="card users-list-card">
      <div class="card-header list-header">
        <h2>قائمة المستخدمين</h2>
        <p>هذه قائمة تجريبية للمستخدمين في النظام. يمكن التعديل عليها من الواجهة فقط.</p>
      </div>

      <div v-if="!users.length" class="empty-state">
        <p>لا يوجد مستخدمون حالياً. قم بإضافة مستخدم جديد من الأعلى.</p>
      </div>

      <div v-else class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>الإسم الكامل</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-badge" :class="'role-' + user.role">
                  {{
                    user.role === 'admin'
                      ? 'مسؤول نظام'
                      : user.role === 'agent'
                        ? 'موظف دعم'
                        : 'مستخدم عادي'
                  }}
                </span>
              </td>
              <td>
                <span
                  class="status-badge"
                  :class="user.active ? 'status-active' : 'status-inactive'"
                >
                  {{ user.active ? 'مفعل' : 'غير مفعل' }}
                </span>
              </td>
              <td class="actions-cell">
                <button type="button" class="btn-icon" @click="toggleStatus(user)">
                  {{ user.active ? 'إيقاف' : 'تفعيل' }}
                </button>
                <button
                  type="button"
                  class="btn-icon danger"
                  @click="removeUser(user.id)"
                >
                  حذف
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const users = ref([
  { id: 1, fullName: 'أحمد محمد', email: 'ahmed@example.com', role: 'admin', active: true },
  { id: 2, fullName: 'سارة علي', email: 'sara@example.com', role: 'agent', active: true },
  { id: 3, fullName: 'خالد يوسف', email: 'khaled@example.com', role: 'user', active: false },
])

const newUser = reactive({
  fullName: '',
  email: '',
  role: 'agent',
})

const formError = ref('')
const formSuccess = ref('')

const handleAddUser = () => {
  formError.value = ''
  formSuccess.value = ''

  if (!newUser.fullName.trim() || !newUser.email.trim()) {
    formError.value = 'الرجاء إدخال الإسم الكامل والبريد الإلكتروني.'
    return
  }

  users.value.push({
    id: Date.now(),
    fullName: newUser.fullName.trim(),
    email: newUser.email.trim(),
    role: newUser.role,
    active: true,
  })

  newUser.fullName = ''
  newUser.email = ''
  newUser.role = 'agent'

  formSuccess.value = 'تم إضافة المستخدم بنجاح (تجريبياً، بدون ربط بالخادم).'
}

const toggleStatus = (user) => {
  user.active = !user.active
}

const removeUser = (id) => {
  users.value = users.value.filter((u) => u.id !== id)
}
</script>

<style scoped>
.page-container {
  direction: rtl;
  max-width: 1100px;
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
  margin-bottom: 24px;
}

.card-header {
  text-align: right;
  margin-bottom: 16px;
}

.card-header h2 {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.card-header p {
  font-size: 0.9rem;
  color: #6b7280;
}

.add-user-form .inline-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px 16px;
}

.form-row {
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-bottom: 10px;
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
select {
  border-radius: 10px;
  border: 1px solid #d0d7de;
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fdfdfd;
}

input:focus,
select:focus {
  border-color: #b00020;
  box-shadow: 0 0 0 1px rgba(176, 0, 32, 0.2);
  background: #ffffff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-main {
  background: #ffcc00;
  color: #000;
  border: none;
  padding: 9px 22px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-main:hover {
  background: #ffd633;
}

.message {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: right;
}

.error-message {
  color: #b00020;
}

.success-message {
  color: #166534;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  direction: rtl;
}

.users-table thead {
  background: #f9fafb;
}

.users-table th,
.users-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #eef1f4;
  text-align: right;
  font-size: 0.9rem;
  white-space: nowrap;
}

.role-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.role-admin {
  background: #fee2e2;
  color: #b91c1c;
}

.role-agent {
  background: #e0f2fe;
  color: #075985;
}

.role-user {
  background: #ecfdf3;
  color: #166534;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fee2e2;
  color: #b91c1c;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}

.btn-icon {
  background: #f3f4f6;
  border-radius: 999px;
  border: none;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-icon.danger {
  background: #fee2e2;
  color: #b91c1c;
}

.empty-state {
  text-align: center;
  padding: 24px 0;
  font-size: 0.95rem;
  color: #6b7280;
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