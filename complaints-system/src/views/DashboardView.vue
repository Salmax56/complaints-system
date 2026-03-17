<template>
  <div class="p-6 bg-gray-50 min-h-screen dir-rtl" dir="rtl">
    
    <div class="mb-8 flex justify-between items-center">
      <div class="text-right">
        <h1 class="text-3xl font-bold text-gray-900">قائمة الشكاوى</h1>
        <p class="text-gray-500 mt-2">عرض وإدارة جميع الشكاوى وتفاصيلها الدقيقة</p>
      </div>
      <button class="bg-[#b30000] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-red-700 transition">
        + شكوى جديدة
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100 flex gap-4 items-center">
       <span class="text-gray-400">🔍</span>
       <input type="text" placeholder="ابحث برقم الشكوى أو الاسم..." class="w-full bg-transparent outline-none text-sm">
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-right">
          <thead class="bg-gray-50 text-gray-500 text-sm font-bold uppercase tracking-wider">
            <tr>
              <th class="p-4">رقم الشكوى</th>
              <th class="p-4">صاحب الشكوى</th> <th class="p-4">الفئة / التصنيف</th> <th class="p-4">العنوان</th>
              <th class="p-4">الحالة</th>
              <th class="p-4 text-center">إجراءات</th> </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="complaint in complaints" :key="complaint.id" class="hover:bg-gray-50 transition-colors group">
              <td class="p-4 font-bold text-red-600 group-hover:text-red-700">{{ complaint.id }}</td>
              <td class="p-4 text-gray-800 font-semibold">{{ complaint.userName }}</td>
              <td class="p-4">
                <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {{ complaint.category }}
                </span>
              </td>
              <td class="p-4 text-gray-700 font-medium">{{ complaint.title }}</td>
              <td class="p-4">
                <span :class="statusClass(complaint.status)" class="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  {{ complaint.status }}
                </span>
              </td>
              <td class="p-4 text-center">
                <button @click="showFullDetails(complaint)" class="border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-100 flex items-center justify-center gap-2 m-auto">
                  <span>👁️</span> عرض التفاصيل
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="selectedComplaint" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
      <div class="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-fade-in shadow-red-900/10">
        <button @click="selectedComplaint = null" class="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">تفاصيل الشكوى</h2>
        <p class="text-red-600 font-bold mb-6">رقم المرجع: {{ selectedComplaint.id }}</p>
        <hr class="mb-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-right mb-6">
          <div>
            <label class="block text-xs font-bold text-gray-400 mb-1 uppercase">صاحب الشكوى:</label>
            <p class="text-lg font-bold text-gray-800">{{ selectedComplaint.userName }}</p>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-400 mb-1 uppercase">تصنيف الشكوى:</label>
            <p class="text-gray-800 font-semibold underline decoration-red-300 decoration-2">{{ selectedComplaint.category }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-xs font-bold text-gray-400 mb-1">الموضوع:</label>
          <p class="text-lg font-bold text-gray-900">{{ selectedComplaint.title }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-xs font-bold text-gray-400 mb-1">الوصف التفصيلي:</label>
          <div class="bg-red-50/30 p-4 rounded-xl border border-red-100 text-gray-700 leading-relaxed min-h-[100px]">
            {{ selectedComplaint.summary }}
          </div>
        </div>

        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
           <div>
              <label class="block text-[10px] font-bold text-gray-400">تاريخ التقديم</label>
              <p class="text-sm font-bold text-gray-600">{{ selectedComplaint.date }}</p>
           </div>
           <span :class="statusClass(selectedComplaint.status)" class="px-4 py-2 rounded-full text-xs font-bold">
              {{ selectedComplaint.status }}
           </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedComplaint = ref(null);

const complaints = ref([
  { 
    id: 'C-1234', 
    userName: 'أحمد محمد علي',
    category: 'مرافق',
    title: 'مشكلة في خدمة الكهرباء', 
    summary: 'يوجد عطل فني في المحول الرئيسي المغذي للمبنى الإداري، مما يتسبب في انقطاع التيار الكهربائي بشكل متقطع خلال ساعات العمل الرسمية منذ 3 أيام.',
    status: 'قيد المعالجة', 
    date: '2026-03-01' 
  },
  { 
    id: 'C-1233', 
    userName: 'سارة إبراهيم',
    category: 'صيانة',
    title: 'طلب صيانة طارئة', 
    summary: 'تسريب مياه في الطابق الثاني من ماسورة الصرف الرئيسية، المياه بدأت تؤثر على الجدران وتحتاج تدخل فني فوري قبل تضرر الأثاث المكتبي.',
    status: 'تم الحل', 
    date: '2026-02-28' 
  },
  { 
    id: 'C-1232', 
    userName: 'محمود حسن',
    category: 'نظافة',
    title: 'شكوى بخصوص النظافة', 
    summary: 'عدم الالتزام بجدول النظافة اليومي في الممرات الجانبية وتراكم المهملات، نرجو المتابعة مع شركة النظافة المتعاقد معها.',
    status: 'جديدة', 
    date: '2026-02-27' 
  }
]);

const showFullDetails = (complaint) => {
  selectedComplaint.value = complaint;
};

const statusClass = (status) => {
  switch (status) {
    case 'تم الحل': return 'bg-green-100 text-green-700 border border-green-200';
    case 'قيد المعالجة': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'جديدة': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};
</script>

<style scoped>
.dir-rtl { direction: rtl; }
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
* { font-family: 'Cairo', sans-serif !important; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.3s ease-out; }
</style>
