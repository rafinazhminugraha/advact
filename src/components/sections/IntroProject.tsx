import TopicSection from "../layout/TopicSection";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import TipBlock from "../ui/TipBlock";
import MistakeBlock from "../ui/MistakeBlock";

export default function IntroProject() {
  return (
    <TopicSection
      id="intro-project"
      num="00"
      title="Struktur Proyek TaskFlow"
      subtitle="Gambaran awal sebelum mulai belajar"
      isLast
    >
      <MentalModel>
        <p>
          Sebelum membangun rumah, kamu perlu melihat blueprintnya dulu. Bagian
          ini menunjukkan bagaimana TaskFlow distrukturisasi dan di mana setiap
          library akan digunakan. Kamu tidak perlu memahami semuanya sekarang,
          cukup jadikan referensi selama belajar.
        </p>
      </MentalModel>

      <CodeBlock
        lang="text"
        file="referensi - struktur folder proyek TaskFlow"
        id="intro-project-code"
        html={`taskflow/
|-- src/
|   |-- api/
|   |   |-- axiosInstance.ts       <span class="cmt"># Konfigurasi Axios + interceptor (CH 2)</span>
|   |   \\-- taskApi.ts            <span class="cmt"># Fungsi API untuk task</span>
|   |
|   |-- components/
|   |   |-- ui/
|   |   |   |-- Button.tsx
|   |   |   \\-- Input.tsx
|   |   |-- TaskCard.tsx            <span class="cmt"># Kartu satu task</span>
|   |   \\-- TaskForm.tsx           <span class="cmt"># Form buat/edit task (CH 3)</span>
|   |
|   |-- features/
|   |   \\-- ui/
|   |       \\-- uiSlice.ts         <span class="cmt"># Redux slice untuk UI state (CH 4)</span>
|   |
|   |-- pages/
|   |   |-- LoginPage.tsx           <span class="cmt"># Halaman login</span>
|   |   |-- DashboardPage.tsx       <span class="cmt"># Halaman utama berisi daftar task</span>
|   |   \\-- TaskDetailPage.tsx     <span class="cmt"># Detail satu task</span>
|   |
|   |-- router/
|   |   |-- AppRouter.tsx           <span class="cmt"># Definisi semua routes (CH 1)</span>
|   |   \\-- ProtectedRoute.tsx     <span class="cmt"># Guard untuk route privat (CH 1)</span>
|   |
|   |-- store/
|   |   |-- store.ts                <span class="cmt"># Redux store (CH 4)</span>
|   |   \\-- hooks.ts               <span class="cmt"># Typed hooks Redux (CH 4)</span>
|   |
|   |-- stores/
|   |   \\-- useAuthStore.ts        <span class="cmt"># Zustand store untuk auth (CH 5)</span>
|   |
|   |-- types/
|   |   \\-- index.ts               <span class="cmt"># Shared type definitions</span>
|   |
|   |-- hooks/
|   |   \\-- useTasks.ts            <span class="cmt"># Custom hook untuk query task (CH 2)</span>
|   |
|   \\-- App.tsx                    <span class="cmt"># Root component</span>
|
|-- src/__tests__/
|   |-- TaskCard.test.tsx           <span class="cmt"># Unit test komponen (CH 6)</span>
|   \\-- TaskForm.test.tsx          <span class="cmt"># Test form dan validasi (CH 6)</span>
|
|-- mock-api/
|   |-- db.json                     <span class="cmt"># Data mock users + tasks (CH 2)</span>
|   \\-- server.js                 <span class="cmt"># Server API lokal (CH 2, dipakai CH 2-5)</span>
|
|-- .env.example                    <span class="cmt"># Template env: VITE_API_URL=http://localhost:3001/api</span>
|-- .env                            <span class="cmt"># File env lokal (jangan di-commit)</span>
|-- package.json                    <span class="cmt"># Scripts: dev, api, dev:full</span>
\\-- vite.config.ts`}
      />

      <CodeBlock
        lang="ts"
        file="src/types/index.ts - definisi tipe data yang dipakai di seluruh aplikasi"
        id="intro-types-ts"
        html={`<span class="kw">export interface</span> <span class="tp">User</span> {
  id: <span class="tp">number</span>;
  name: <span class="tp">string</span>;
  email: <span class="tp">string</span>;
}

<span class="kw">export interface</span> <span class="tp">Task</span> {
  id: <span class="tp">number</span>;
  title: <span class="tp">string</span>;
  description?: <span class="tp">string</span>;
  priority: <span class="str">'low'</span> | <span class="str">'medium'</span> | <span class="str">'high'</span>;
  status: <span class="str">'todo'</span> | <span class="str">'in-progress'</span> | <span class="str">'done'</span>;
  dueDate?: <span class="tp">string</span>;
  assignedTo?: <span class="tp">number</span>;
}

<span class="kw">export interface</span> <span class="tp">ApiError</span> {
  message: <span class="tp">string</span>;
  statusCode: <span class="tp">number</span>;
}`}
      />

      <CodeBlock
        lang="tsx"
        file="src/App.tsx - root component merender router"
        id="intro-app-jsx"
        html={`<span class="kw">import</span> { RouterProvider } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { router } <span class="kw">from</span> <span class="str">'./router/AppRouter'</span>;

<span class="kw">export default function</span> <span class="fn">App</span>() {
  <span class="kw">return</span> <span class="tag">&lt;RouterProvider</span> <span class="atr">router</span>=<span class="jsx">{router}</span> <span class="tag">/&gt;</span>;
}

<span class="cmt">// Catatan: semua Provider (Redux, QueryClient) ada di main.tsx</span>
<span class="cmt">// Catatan: App.tsx hanya bertanggung jawab merender RouterProvider</span>`}
      />

      <MistakeBlock>
        <li>
          <strong>Komponen UI dasar</strong> (<code>Button.tsx</code>,{" "}
          <code>Input.tsx</code>, <code>Modal.tsx</code>) - ini regular React
          component, tidak butuh library khusus. Buat sendiri sesuai kebutuhan
        </li>
        <li>
          <strong>Styling</strong> (CSS Modules, Tailwind, dsb) - tidak ada
          dalam scope materi library ini
        </li>
        <li>
          <strong>Toast component</strong> - <code>uiSlice</code> sudah punya{" "}
          <code>showToast</code>/<code>hideToast</code> actions, tapi komponen
          Toast yang membaca dari Redux perlu dibuat sendiri dengan{" "}
          <code>useAppSelector(state =&gt; state.ui.toast)</code>
        </li>
        <li>
          <strong>Halaman 404</strong> - sudah ada di AppRouter tapi komponennya
          tidak dibuat, cukup regular JSX
        </li>
        <li>
          <strong>Environment variables</strong> (<code>.env</code> untuk{" "}
          <code>VITE_API_URL</code>) - ini memang setup proyek Vite, tapi tetap
          wajib agar semua contoh API lintas chapter mengarah ke backend mock
          lokal yang sama
        </li>
      </MistakeBlock>

      <TipBlock>
        <p>
          <strong>Supaya alur chapter sinkron:</strong> jalankan
          <code>npm run dev:full</code> saat belajar agar frontend dan mock API
          lokal aktif bersamaan. Semua contoh data fetching di Chapter 2, form
          submit di Chapter 3, dan auth di Chapter 4-5 mengandalkan setup ini.
        </p>
      </TipBlock>

      <TipBlock>
        <p>
          <strong>Cara pakai panduan ini:</strong> Setiap chapter akan
          menambahkan layer baru ke proyek TaskFlow. Di akhir chapter 6, kamu
          akan punya satu aplikasi lengkap yang menggunakan semua library yang
          dipelajari.
        </p>
      </TipBlock>
    </TopicSection>
  );
}
