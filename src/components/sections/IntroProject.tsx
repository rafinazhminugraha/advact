import TopicSection from "../layout/TopicSection";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import TipBlock from "../ui/TipBlock";

export default function IntroProject() {
  return (
    <TopicSection
      id="intro-project"
      num="00"
      title="Struktur Proyek TaskFlow"
      subtitle="Gambaran awal sebelum mulai belajar"
    >
      <MentalModel>
        <p>Sebelum membangun rumah, kamu perlu melihat blueprintnya dulu. Bagian ini menunjukkan bagaimana TaskFlow distrukturisasi dan di mana setiap library akan digunakan. Kamu tidak perlu memahami semuanya sekarang, cukup jadikan referensi selama belajar.</p>
      </MentalModel>

      <CodeBlock lang="text" file="referensi - struktur folder proyek TaskFlow" id="intro-project-code" html={`taskflow/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js       <span class="cmt"># Konfigurasi Axios + interceptor (CH 2)</span>
│   │   └── taskApi.js             <span class="cmt"># Fungsi API untuk task</span>
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   └── Input.jsx
│   │   ├── TaskCard.jsx            <span class="cmt"># Kartu satu task</span>
│   │   └── TaskForm.jsx            <span class="cmt"># Form buat/edit task (CH 3)</span>
│   │
│   ├── features/
│   │   └── ui/
│   │       └── uiSlice.js          <span class="cmt"># Redux slice untuk UI state (CH 4)</span>
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx           <span class="cmt"># Halaman login</span>
│   │   ├── DashboardPage.jsx       <span class="cmt"># Halaman utama berisi daftar task</span>
│   │   └── TaskDetailPage.jsx      <span class="cmt"># Detail satu task</span>
│   │
│   ├── router/
│   │   ├── AppRouter.jsx           <span class="cmt"># Definisi semua routes (CH 1)</span>
│   │   └── ProtectedRoute.jsx      <span class="cmt"># Guard untuk route privat (CH 1)</span>
│   │
│   ├── store/
│   │   └── store.js                <span class="cmt"># Redux store (CH 4)</span>
│   │
│   ├── stores/
│   │   └── useAuthStore.js         <span class="cmt"># Zustand store untuk auth (CH 5)</span>
│   │
│   ├── hooks/
│   │   └── useTasks.js             <span class="cmt"># Custom hook untuk query task (CH 2)</span>
│   │
│   └── App.jsx                     <span class="cmt"># Root component</span>
│
├── src/__tests__/
│   ├── TaskCard.test.jsx           <span class="cmt"># Unit test komponen (CH 6)</span>
│   └── TaskForm.test.jsx           <span class="cmt"># Test form dan validasi (CH 6)</span>
│
└── vite.config.js`} />

      <TipBlock>
        <p><strong>Cara pakai panduan ini:</strong> Setiap chapter akan menambahkan layer baru ke proyek TaskFlow. Di akhir chapter 6, kamu akan punya satu aplikasi lengkap yang menggunakan semua library yang dipelajari.</p>
      </TipBlock>
    </TopicSection>
  );
}
