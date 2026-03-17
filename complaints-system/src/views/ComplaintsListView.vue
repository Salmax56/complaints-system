<template>
  <div style="padding: 20px; text-align: center;">
    <h1>📁 قائمة شكاواي</h1>
    <p>هنا يمكنك تتبع حالة الشكاوى التي قدمتها سابقاً.</p>
  </div>
 
 <section class="card search-complaint-card">
      <div class="card-header">
        <h2>بحث عن الشكوى</h2>
        <p>أدخل رقم الشكوى لعرض تفاصيلها.</p>
      </div>

      <div class="search-row">
        <input
          v-model="searchId"
          type="number"
          placeholder="مثال: 101"
        />
        <button class="btn-main" @click="findComplaint">
          🔍 بحث
        </button>
      </div>

      <p v-if="searchError" class="message error-message">{{ searchError }}</p>
    </section>

    
    <!-- تفاصيل الشكوى -->
<section v-if="selectedComplaint" class="card complaint-details-card">
  <div class="card-header">
    <h2>تفاصيل الشكوى #{{ selectedComplaint.id }}</h2>
  </div>

  <div class="details-row">
    <p><strong>العنوان:</strong> {{ selectedComplaint.title }}</p>
    <p><strong>مقدم الشكوى:</strong> {{ selectedComplaint.user }}</p>
    <p>
      <strong>الحالة:</strong>
      <span class="status-badge" :class="'status-' + selectedComplaint.status">
        {{
          selectedComplaint.status === 'new'
            ? 'جديدة'
            : selectedComplaint.status === 'processing'
            ? 'قيد المعالجة'
            : 'تم حلها'
        }}
      </span>
    </p>
  </div>

  <div class="comment-row">
    <label for="comment">إضافة تعليق:</label>
    <textarea id="comment" v-model="newComment" placeholder="اكتب تعليقك هنا..."></textarea>
    <button class="btn-main" @click="addComment">إضافة التعليق</button>
  </div>

  <div v-if="selectedComplaint.comments.length">
    <h3>التعليقات السابقة:</h3>
    <ul class="comments-list">
      <li v-for="(c, index) in selectedComplaint.comments" :key="index">
        {{ c }}
      </li>
    </ul>
  </div>
</section>

  
</template>

<script setup>
import { ref } from "vue"

// بيانات تجريبية
const complaints = ref([
  { id: 101, title: "تأخر الرد على الشكوى", user: "محمد أحمد", status: "new", comments: [] },
  { id: 102, title: "مشكلة في الموقع الإلكتروني", user: "سارة علي", status: "processing", comments: [] },
  { id: 103, title: "عدم حل المشكلة", user: "خالد يوسف", status: "solved", comments: [] }
])

const searchId = ref("")
const searchError = ref("")
const selectedComplaint = ref(null)
const newComment = ref("")

const findComplaint = () => {
  searchError.value = ""
  selectedComplaint.value = null

  const id = Number(searchId.value)
  if (!id) {
    searchError.value = "الرجاء إدخال رقم شكوى صحيح."
    return
  }

  const complaint = complaints.value.find(c => c.id === id)
  if (!complaint) {
    searchError.value = "لا توجد شكوى بهذا الرقم."
    return
  }

  selectedComplaint.value = complaint
  searchId.value = ""
}

const changeStatus = (complaint) => {
  if (complaint.status === "new") complaint.status = "processing"
  else if (complaint.status === "processing") complaint.status = "solved"
  else complaint.status = "new"
}

const removeComplaint = (id) => {
  complaints.value = complaints.value.filter(c => c.id !== id)
  selectedComplaint.value = null
}

const addComment = () => {
  if (newComment.value.trim() === "") return
  selectedComplaint.value.comments.push(newComment.value.trim())
  newComment.value = ""
}
</script>

<style scoped>
.page-container {
  direction: rtl;
  max-width: 800px;
  margin: auto;
  padding: 24px 12px;
  color: #1f2933;
}


/* الكارد */
.card {
  background: #fff;
  border-radius: 50px;              
  padding: 20px 16px;               
  margin: 30px auto;            
  max-width: 700px;                 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 

  display: flex;                     
  flex-direction: column;           
  align-items: center;               
  justify-content: center;           
  min-height: 150px;               


}


.small-card {
  padding: 20px 16px;

}
/* العناوين */
.card-header h2 {
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.card-header p {
  font-size: 0.85rem;
  color: #6b7280;
}


.search-row {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 12px;
}

.search-row input {
  flex: 1;
  padding: 10px 10px;   
  border-radius: 20px;
  border: 1px solid #d0d7de;
  font-size: 0.9rem;
  max-width: 200px;
}

.search-row button.btn-main {
  padding: 6px 14px;
  font-size: 0.9rem;
}

/* أزرار */
.btn-main {
  background: #ffcc00;
  border: none;
  border-radius: 999px;
  padding: 6px 16px;
  font-weight: 700;
  cursor: pointer;
}

.btn-main:hover {
  background: #ffd633;
}

.btn-icon {
  background: #f3f4f6;
  border: none;
  border-radius: 999px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 6px;
}

.btn-icon.danger {
  background: #fee2e2;
  color: #b91c1c;
}

/* الحالة */
.status-badge {
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  
}

.status-new { background: #fef3c7; color: #92400e; }
.status-processing { background: #dbeafe; color: #1e40af; }
.status-solved { background: #dcfce7; color: #166534; }

/* تفاصيل */
.details-row p {
  margin-bottom: 6px;
}

.actions-row {
  margin-top: 10px;
}

.comment-row {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
}

.comment-row textarea {
  margin-top: 6px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  resize: vertical;
  font-size: 0.9rem;
}

.comments-list {
  margin-top: 10px;
  list-style-type: disc;
  padding-right: 20px;
}

.message.error-message {
  color: #b00020;
  margin-top: 8px;
  font-size: 0.85rem;
}
</style>*/
