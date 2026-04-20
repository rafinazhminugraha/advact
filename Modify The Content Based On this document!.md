## **Recheck Kelengkapan Materi**

### **Yang Sudah Cukup (dan Kenapa)**

**Chapter 1 \- React Router:** Setup, params, programmatic nav, protected routes, nested routes \+ layout sudah mencakup 90% skenario router di pekerjaan junior. Satu-satunya yang kurang critical tapi cukup sering muncul adalah `useSearchParams`.

**Chapter 2 \- TanStack Query \+ Axios:** useQuery, useMutation, cache invalidation, interceptor sudah solid. Ada satu konsep yang hilang yang sering jadi interview question: perbedaan `isLoading` vs `isFetching`.

**Chapter 3 \- RHF \+ Zod:** useForm, schema Zod, Controller, error handling, edit form sudah cukup untuk junior.

**Chapter 4 \- Redux Toolkit:** createSlice, useSelector, useDispatch, createAsyncThunk (referensi) sudah solid. `createSelector` terlalu advanced untuk junior.

**Chapter 5 \- Zustand:** Setup dan penggunaan dasar sudah benar. Satu yang hilang adalah pola `persist` middleware karena auth state yang perlu bertahan saat refresh adalah kebutuhan sangat umum.

**Chapter 6 \- Testing:** Setup, render, query priority, userEvent, mocking sudah cukup. Yang hilang adalah pola `beforeEach`/`afterEach` untuk test cleanup — disebutkan di bagian kesalahan umum tapi tidak ditunjukkan kodenya.

---

### **Material Baru yang Perlu Ditambahkan**

**\[Tambahkan setelah section 1.5 (Nested Routes), sebelum Chapter 2\]**

\<\!-- 1.6 useSearchParams \--\>  
\<section class="topic" id="rr-searchparams"\>  
  \<div class="topic-header"\>  
    \<span class="topic-num"\>1.6\</span\>  
    \<div class="topic-title-wrap"\>  
      \<h3\>useSearchParams untuk Filter via URL\</h3\>  
      \<span class="subtitle"\>Membaca dan mengubah query string di URL tanpa reload\</span\>  
    \</div\>  
  \</div\>

  \<div class="cards"\>  
    \<div class="card"\>  
      \<div class="card-label what"\>Apa itu\</div\>  
      \<p\>\<code\>useSearchParams\</code\> adalah hook untuk membaca dan mengubah query parameters di URL, yaitu bagian setelah tanda \<code\>?\</code\> seperti \<code\>/dashboard?status=todo\&priority=high\</code\>. State filter tersimpan di URL sehingga bisa di-share dan tidak hilang saat refresh.\</p\>  
    \</div\>  
    \<div class="card"\>  
      \<div class="card-label why"\>Kenapa penting\</div\>  
      \<p\>Hampir setiap dashboard di dunia kerja punya fitur filter. Menyimpan filter di URL adalah best practice: user bisa bookmark, share link, dan halaman tidak reset saat refresh. Ini ditanyakan di interview dan ada di hampir setiap job description.\</p\>  
    \</div\>  
    \<div class="card"\>  
      \<div class="card-label when"\>Kapan dipakai\</div\>  
      \<ul\>  
        \<li\>Filter task berdasarkan status di DashboardPage\</li\>  
        \<li\>Pagination: \<code\>?page=2\</code\>\</li\>  
        \<li\>Search query: \<code\>?q=keyword\</code\>\</li\>  
        \<li\>Kombinasi filter: \<code\>?status=todo\&priority=high\</code\>\</li\>  
      \</ul\>  
    \</div\>  
  \</div\>

  \<div class="mental-model"\>  
    \<div class="mm-label"\>Mental Model\</div\>  
    \<p\>Bayangkan \<code\>useSearchParams\</code\> seperti \<code\>useState\</code\> tapi nilainya disimpan di URL, bukan di memori React. \<code\>\[searchParams, setSearchParams\]\</code\> persis seperti \<code\>\[state, setState\]\</code\> — bedanya perubahan langsung tercermin di URL browser.\</p\>  
  \</div\>

  \<div class="code-wrap"\>  
    \<div class="code-header"\>  
      \<span class="code-lang"\>jsx\</span\>  
      \<span class="code-file"\>src/pages/DashboardPage.jsx \- filter task berdasarkan status via URL\</span\>  
      \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
    \</div\>  
    \<pre\>\<code\>\<span class="kw"\>import\</span\> { useSearchParams } \<span class="kw"\>from\</span\> \<span class="str"\>'react-router-dom'\</span\>;  
\<span class="kw"\>import\</span\> { useQuery } \<span class="kw"\>from\</span\> \<span class="str"\>'@tanstack/react-query'\</span\>;  
\<span class="kw"\>import\</span\> { fetchTasks } \<span class="kw"\>from\</span\> \<span class="str"\>'../api/taskApi'\</span\>;

\<span class="kw"\>export default function\</span\> \<span class="fn"\>DashboardPage\</span\>() {  
  \<span class="cmt"\>// searchParams \= URLSearchParams object, setSearchParams \= fungsi update URL\</span\>  
  \<span class="kw"\>const\</span\> \[searchParams, setSearchParams\] \= \<span class="fn"\>useSearchParams\</span\>();

  \<span class="cmt"\>// Baca nilai dari URL: /dashboard?status=todo \=\> 'todo'\</span\>  
  \<span class="cmt"\>// Jika tidak ada di URL, default ke 'all'\</span\>  
  \<span class="kw"\>const\</span\> activeStatus \= searchParams.\<span class="fn"\>get\</span\>(\<span class="str"\>'status'\</span\>) || \<span class="str"\>'all'\</span\>;

  \<span class="kw"\>const\</span\> { data: tasks \= \[\], isLoading } \= \<span class="fn"\>useQuery\</span\>({  
    queryKey: \[\<span class="str"\>'tasks'\</span\>, { status: activeStatus }\], \<span class="cmt"\>// cache terpisah per filter\</span\>  
    queryFn: () \=\> \<span class="fn"\>fetchTasks\</span\>({ status: activeStatus }),  
  });

  \<span class="kw"\>const\</span\> statusOptions \= \[\<span class="str"\>'all'\</span\>, \<span class="str"\>'todo'\</span\>, \<span class="str"\>'in-progress'\</span\>, \<span class="str"\>'done'\</span\>\];

  \<span class="kw"\>return\</span\> (  
    \<span class="tag"\>\&lt;div\&gt;\</span\>  
      \<span class="cmt"\>// Tombol filter \- mengubah URL tanpa reload halaman\</span\>  
      \<span class="tag"\>\&lt;div\&gt;\</span\>  
        \<span class="jsx"\>{statusOptions.\<span class="fn"\>map\</span\>((status) \=\> (  
          \&lt;button  
            key={status}  
            onClick={() \=\> setSearchParams({ status })}  
            style={{ fontWeight: activeStatus \=== status ? 'bold' : 'normal' }}  
          \&gt;  
            {status}  
          \&lt;/button\&gt;  
        ))}\</span\>  
      \<span class="tag"\>\&lt;/div\&gt;\</span\>

      \<span class="jsx"\>{isLoading ? (  
        \&lt;p\&gt;Memuat...\&lt;/p\&gt;  
      ) : (  
        tasks.\<span class="fn"\>map\</span\>((task) \=\> \&lt;TaskCard key={task.id} task={task} /\&gt;)  
      )}\</span\>  
    \<span class="tag"\>\&lt;/div\&gt;\</span\>  
  );  
}

\<span class="cmt"\>// URL berubah saat filter diklik:\</span\>  
\<span class="cmt"\>// /dashboard           \=\> activeStatus \= 'all'\</span\>  
\<span class="cmt"\>// /dashboard?status=todo        \=\> activeStatus \= 'todo'\</span\>  
\<span class="cmt"\>// /dashboard?status=in-progress \=\> activeStatus \= 'in-progress'\</span\>\</code\>\</pre\>  
  \</div\>

  \<div class="project-step"\>  
    \<div class="ps-label"\>TaskFlow \- Filter Task\</div\>  
    \<p\>Dengan \<strong\>useSearchParams\</strong\>, fitur filter status di DashboardPage TaskFlow menjadi persisten di URL. User bisa membagikan link \<code\>/dashboard?status=todo\</code\> dan orang lain langsung melihat task yang sama tersaring.\</p\>  
  \</div\>

  \<div class="mistake-block"\>  
    \<div class="mistake-title"\>Kesalahan Umum\</div\>  
    \<ul class="mistake-list"\>  
      \<li\>Menyimpan state filter di \<code\>useState\</code\> biasa — filter hilang saat user refresh atau berpindah halaman lalu kembali. Gunakan \<code\>useSearchParams\</code\> agar filter persisten\</li\>  
      \<li\>Memanggil \<code\>setSearchParams({ status })\</code\> yang menghapus semua params lain. Jika ada beberapa filter, pertahankan yang lain: \<code\>setSearchParams(prev \=\> { prev.set('status', status); return prev; })\</code\>\</li\>  
      \<li\>Lupa menyertakan nilai filter di \<code\>queryKey\</code\> TanStack Query — semua filter akan berbagi cache yang sama dan data tidak akan diperbarui saat filter berubah\</li\>  
    \</ul\>  
  \</div\>  
\</section\>

---

**\[Tambahkan setelah code block kedua di section 2.2 (setelah TaskDetailPage, sebelum mistake block)\]**

\<div class="mental-model"\>  
  \<div class="mm-label"\>isLoading vs isFetching vs isPending — Perbedaan Penting\</div\>  
  \<p\>Ini adalah sumber kebingungan yang sering muncul di interview. Ketiga properti ini berbeda dan masing-masing punya use case spesifik.\</p\>  
\</div\>

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>referensi \- perbedaan isLoading isFetching dan isPending\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>const\</span\> { data, isLoading, isFetching, isPending } \= \<span class="fn"\>useQuery\</span\>({ ... });

\<span class="cmt"\>// isLoading  \= true HANYA saat pertama kali fetch DAN tidak ada cache sama sekali\</span\>  
\<span class="cmt"\>//             Gunakan ini untuk skeleton/loading screen pertama kali halaman dibuka\</span\>

\<span class="cmt"\>// isFetching \= true setiap kali sedang fetch, termasuk background refetch\</span\>  
\<span class="cmt"\>//             Gunakan ini untuk spinner kecil yang menunjukkan data sedang diperbarui\</span\>

\<span class="cmt"\>// isPending  \= true saat query belum punya data (sama dengan isLoading di v5)\</span\>  
\<span class="cmt"\>//             Di TanStack Query v5, isPending menggantikan isLoading untuk useQuery\</span\>

\<span class="cmt"\>// Contoh use case yang tepat:\</span\>  
\<span class="kw"\>if\</span\> (isLoading) \<span class="kw"\>return\</span\> \<span class="tag"\>\&lt;SkeletonCard /\&gt;\</span\>;    \<span class="cmt"\>// hanya tampil saat pertama kali, bukan setiap refetch\</span\>

\<span class="kw"\>return\</span\> (  
  \<span class="tag"\>\&lt;div\&gt;\</span\>  
    \<span class="jsx"\>{isFetching \&amp;\&amp; \&lt;span\&gt;Memperbarui data...\&lt;/span\&gt;}\</span\>  \<span class="cmt"\>// indikator background update\</span\>  
    \<span class="jsx"\>{tasks.\<span class="fn"\>map\</span\>((task) \=\> \&lt;TaskCard key={task.id} task={task} /\&gt;)}\</span\>  
  \<span class="tag"\>\&lt;/div\&gt;\</span\>  
);\</code\>\</pre\>  
\</div\>

---

**\[Tambahkan setelah code block `useAuthStore.js` di section 5.1, sebelum project-step atau tip block terdekat\]**

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/stores/useAuthStore.js \- versi dengan persist middleware (direkomendasikan)\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> { create } \<span class="kw"\>from\</span\> \<span class="str"\>'zustand'\</span\>;  
\<span class="kw"\>import\</span\> { persist } \<span class="kw"\>from\</span\> \<span class="str"\>'zustand/middleware'\</span\>;

\<span class="cmt"\>// persist middleware otomatis sync state ke localStorage\</span\>  
\<span class="cmt"\>// tidak perlu lagi localStorage.setItem/getItem secara manual\</span\>  
\<span class="kw"\>export const\</span\> useAuthStore \= \<span class="fn"\>create\</span\>(  
  \<span class="fn"\>persist\</span\>(  
    (set) \=\> ({  
      user: \<span class="kw"\>null\</span\>,  
      token: \<span class="kw"\>null\</span\>,  
      isLoggedIn: \<span class="kw"\>false\</span\>,

      \<span class="fn"\>login\</span\>: (user, token) \=\> \<span class="fn"\>set\</span\>({ user, token, isLoggedIn: \<span class="kw"\>true\</span\> }),  
      \<span class="fn"\>logout\</span\>: () \=\> \<span class="fn"\>set\</span\>({ user: \<span class="kw"\>null\</span\>, token: \<span class="kw"\>null\</span\>, isLoggedIn: \<span class="kw"\>false\</span\> }),  
      \<span class="fn"\>updateUser\</span\>: (userData) \=\>  
        \<span class="fn"\>set\</span\>((state) \=\> ({ user: { ...state.user, ...userData } })),  
    }),  
    {  
      name: \<span class="str"\>'auth-storage'\</span\>,  \<span class="cmt"\>// key di localStorage\</span\>  
      partialize: (state) \=\> ({ token: state.token, user: state.user }), \<span class="cmt"\>// hanya simpan ini\</span\>  
    }  
  )  
);\</code\>\</pre\>  
\</div\>

\<div class="tip-block"\>  
  \<p\>\<strong\>Versi mana yang dipakai?\</strong\> Di TaskFlow, gunakan versi dengan \<code\>persist\</code\>. Ini adalah pola standar di industri. Tanpa \<code\>persist\</code\>, state auth hilang setiap kali user refresh halaman dan harus login ulang meskipun token masih valid.\</p\>  
\</div\>

---

**\[Tambahkan setelah code block `DashboardPage.test.jsx` di section 6.4, sebelum tip-block terakhir\]**

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/\_\_tests\_\_/contoh.test.jsx \- pola beforeEach dan afterEach untuk isolasi test\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> \* \<span class="kw"\>as\</span\> taskApi \<span class="kw"\>from\</span\> \<span class="str"\>'../api/taskApi'\</span\>;

vi.\<span class="fn"\>mock\</span\>(\<span class="str"\>'../api/taskApi'\</span\>);

\<span class="fn"\>describe\</span\>(\<span class="str"\>'NamaKomponen'\</span\>, () \=\> {  
  \<span class="cmt"\>// beforeEach: dijalankan SEBELUM setiap test dalam describe ini\</span\>  
  \<span class="fn"\>beforeEach\</span\>(() \=\> {  
    \<span class="cmt"\>// Reset semua mock ke kondisi awal \- mencegah sisa mock dari test sebelumnya\</span\>  
    vi.\<span class="fn"\>clearAllMocks\</span\>();  
  });

  \<span class="cmt"\>// afterEach: dijalankan SETELAH setiap test\</span\>  
  \<span class="fn"\>afterEach\</span\>(() \=\> {  
    \<span class="cmt"\>// Bersihkan efek samping jika ada (localStorage, timer palsu, dll)\</span\>  
    localStorage.\<span class="fn"\>clear\</span\>();  
  });

  \<span class="fn"\>it\</span\>(\<span class="str"\>'test pertama'\</span\>, \<span class="kw"\>async\</span\> () \=\> {  
    taskApi.fetchTasks.\<span class="fn"\>mockResolvedValue\</span\>(\[{ id: \<span class="num"\>1\</span\>, title: \<span class="str"\>'Task A'\</span\> }\]);  
    \<span class="cmt"\>// ... test code\</span\>  
  });

  \<span class="fn"\>it\</span\>(\<span class="str"\>'test kedua tidak terpengaruh mock dari test pertama'\</span\>, \<span class="kw"\>async\</span\> () \=\> {  
    \<span class="cmt"\>// Mock di sini fresh karena clearAllMocks() dipanggil beforeEach\</span\>  
    taskApi.fetchTasks.\<span class="fn"\>mockResolvedValue\</span\>(\[\]);  
    \<span class="cmt"\>// ... test code\</span\>  
  });  
});

\<span class="cmt"\>// beforeAll  \= sekali sebelum semua test di describe (untuk setup mahal)\</span\>  
\<span class="cmt"\>// afterAll   \= sekali setelah semua test di describe (untuk teardown)\</span\>  
\<span class="cmt"\>// beforeEach \= sebelum setiap test (paling sering dipakai)\</span\>  
\<span class="cmt"\>// afterEach  \= setelah setiap test\</span\>\</code\>\</pre\>  
\</div\>

---

## **Recheck Kelengkapan Kode untuk Build TaskFlow**

### **Kode yang Hilang dan Memblokir Build**

**1\. `src/App.jsx` — Tidak ada di materi sama sekali**

File ini adalah titik awal yang memanggil `AppRouter`, tapi tidak pernah ditampilkan. Ini harus ada agar project bisa jalan.

**Tambahkan di section 00 (Intro Project), setelah code block struktur folder:**

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/App.jsx \- root component yang merender semua routes\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> AppRouter \<span class="kw"\>from\</span\> \<span class="str"\>'./router/AppRouter'\</span\>;

\<span class="kw"\>export default function\</span\> \<span class="fn"\>App\</span\>() {  
  \<span class="kw"\>return\</span\> \<span class="tag"\>\&lt;AppRouter /\&gt;\</span\>;  
}

\<span class="cmt"\>// App.jsx sengaja dibuat sesederhana ini.\</span\>  
\<span class="cmt"\>// Semua provider (Redux, QueryClient, BrowserRouter) ada di main.jsx.\</span\>  
\<span class="cmt"\>// App.jsx hanya bertugas merender router.\</span\>\</code\>\</pre\>  
\</div\>

---

**2\. `src/components/TaskCard.jsx` — Dipakai di DashboardPage dan test tapi tidak pernah didefinisikan**

Ini adalah gap paling kritis. `DashboardPage.jsx` merender `<TaskCard />`, dan `TaskCard.test.jsx` mengetes `TaskCard`, tapi implementasinya tidak ada. User tidak bisa build atau run test tanpa ini.

**Tambahkan di section 2.3 (useMutation), sebelum code block `src/api/taskApi.js - tambahkan fungsi mutasi`:**

\<div class="tip-block"\>  
  \<p\>\<strong\>Sebelum lanjut ke useMutation\</strong\>, kita perlu mendefinisikan \<code\>TaskCard.jsx\</code\> terlebih dahulu karena komponen ini digunakan di \<code\>DashboardPage\</code\> dan akan menjadi subjek test di Chapter 6.\</p\>  
\</div\>

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/components/TaskCard.jsx \- kartu tampilan satu task\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> { Link } \<span class="kw"\>from\</span\> \<span class="str"\>'react-router-dom'\</span\>;

\<span class="kw"\>const\</span\> priorityLabel \= {  
  low: \<span class="str"\>'Rendah'\</span\>,  
  medium: \<span class="str"\>'Sedang'\</span\>,  
  high: \<span class="str"\>'Tinggi'\</span\>,  
};

\<span class="kw"\>export default function\</span\> \<span class="fn"\>TaskCard\</span\>({ task, isOwner \= \<span class="kw"\>false\</span\>, onDelete }) {  
  \<span class="kw"\>return\</span\> (  
    \<span class="tag"\>\&lt;div\</span\> \<span class="atr"\>className\</span\>=\<span class="str"\>"task-card"\</span\>\<span class="tag"\>\&gt;\</span\>  
      \<span class="tag"\>\&lt;div\&gt;\</span\>  
        \<span class="tag"\>\&lt;h3\&gt;\</span\>\<span class="jsx"\>{task.title}\</span\>\<span class="tag"\>\&lt;/h3\&gt;\</span\>  
        \<span class="tag"\>\&lt;span\</span\> \<span class="atr"\>role\</span\>=\<span class="str"\>"status"\</span\>\<span class="tag"\>\&gt;\</span\>\<span class="jsx"\>{priorityLabel\[task.priority\]}\</span\>\<span class="tag"\>\&lt;/span\&gt;\</span\>  
      \<span class="tag"\>\&lt;/div\&gt;\</span\>

      \<span class="tag"\>\&lt;p\&gt;\</span\>\<span class="jsx"\>{task.description}\</span\>\<span class="tag"\>\&lt;/p\&gt;\</span\>

      \<span class="tag"\>\&lt;div\&gt;\</span\>  
        \<span class="tag"\>\&lt;Link\</span\> \<span class="atr"\>to\</span\>=\<span class="jsx"\>{\`/tasks/${task.id}\`}\</span\>\<span class="tag"\>\&gt;\</span\>Lihat Detail\<span class="tag"\>\&lt;/Link\&gt;\</span\>

        \<span class="jsx"\>{isOwner \&amp;\&amp; (\</span\>  
          \<span class="tag"\>\&lt;button\</span\>  
            \<span class="atr"\>aria-label\</span\>=\<span class="str"\>"edit"\</span\>  
            \<span class="atr"\>onClick\</span\>=\<span class="jsx"\>{() \=\> {/\* buka edit modal \*/}}\</span\>  
          \<span class="tag"\>\&gt;\</span\>  
            Edit  
          \<span class="tag"\>\&lt;/button\&gt;\</span\>  
        \<span class="jsx"\>)}\</span\>

        \<span class="jsx"\>{isOwner \&amp;\&amp; (\</span\>  
          \<span class="tag"\>\&lt;button\</span\> \<span class="atr"\>onClick\</span\>=\<span class="jsx"\>{() \=\> onDelete(task.id)}\</span\>\<span class="tag"\>\&gt;\</span\>Hapus\<span class="tag"\>\&lt;/button\&gt;\</span\>  
        \<span class="jsx"\>)}\</span\>  
      \<span class="tag"\>\&lt;/div\&gt;\</span\>  
    \<span class="tag"\>\&lt;/div\&gt;\</span\>  
  );  
}\</code\>\</pre\>  
\</div\>

---

**3\. `src/hooks/useTasks.js` — Ada di struktur folder tapi tidak pernah diimplementasikan**

File ini ada di folder structure di section 00 tapi tidak pernah ditampilkan. Ada dua pilihan: hapus dari struktur folder, atau implementasikan. Karena ini adalah contoh custom hook yang bagus dan sering ditanya di interview, lebih baik diimplementasikan.

**Tambahkan di section 2.2 (useQuery), setelah code block `TaskDetailPage.jsx`, sebelum mistake block:**

\<div class="tip-block"\>  
  \<p\>\<strong\>Best practice di dunia kerja:\</strong\> query logic sering dibungkus dalam custom hook agar reusable dan komponen lebih bersih. Ini juga memudahkan testing karena logika query terisolasi.\</p\>  
\</div\>

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/hooks/useTasks.js \- custom hook yang membungkus query task\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> { useQuery } \<span class="kw"\>from\</span\> \<span class="str"\>'@tanstack/react-query'\</span\>;  
\<span class="kw"\>import\</span\> { fetchTasks, fetchTaskById } \<span class="kw"\>from\</span\> \<span class="str"\>'../api/taskApi'\</span\>;

\<span class="cmt"\>// Custom hook untuk daftar tasks dengan filter opsional\</span\>  
\<span class="kw"\>export function\</span\> \<span class="fn"\>useTasks\</span\>(filters \= {}) {  
  \<span class="kw"\>return\</span\> \<span class="fn"\>useQuery\</span\>({  
    queryKey: \[\<span class="str"\>'tasks'\</span\>, filters\],  
    queryFn: () \=\> \<span class="fn"\>fetchTasks\</span\>(filters),  
  });  
}

\<span class="cmt"\>// Custom hook untuk satu task berdasarkan id\</span\>  
\<span class="kw"\>export function\</span\> \<span class="fn"\>useTask\</span\>(id) {  
  \<span class="kw"\>return\</span\> \<span class="fn"\>useQuery\</span\>({  
    queryKey: \[\<span class="str"\>'tasks'\</span\>, id\],  
    queryFn: () \=\> \<span class="fn"\>fetchTaskById\</span\>(id),  
    enabled: \!\!id,  
  });  
}

\<span class="cmt"\>// Pemakaian di komponen jadi jauh lebih bersih:\</span\>  
\<span class="cmt"\>// const { data: tasks, isLoading } \= useTasks({ status: activeStatus });\</span\>  
\<span class="cmt"\>// const { data: task } \= useTask(id);\</span\>\</code\>\</pre\>  
\</div\>

---

**4\. `src/main.jsx` final — Versi lengkap tidak pernah ditampilkan secara eksplisit**

`main.jsx` di-update secara bertahap di chapter 1, 2, dan 4 secara terpisah. User yang mengikuti secara linear mungkin bingung bagaimana ketiga update itu digabung. Ini bukan blocker total karena tiap update bisa digabung sendiri, tapi ada risiko error jika `queryClient` di chapter 4 tidak diimport dari definisi di chapter 2\.

**Tambahkan di section 4.1 (Redux Setup), ganti atau tambahkan catatan pada code block `src/main.jsx - tambahkan Provider` dengan versi final:**

\<div class="code-wrap"\>  
  \<div class="code-header"\>  
    \<span class="code-lang"\>jsx\</span\>  
    \<span class="code-file"\>src/main.jsx \- versi final lengkap dengan semua provider\</span\>  
    \<button class="copy-btn" onclick="copyCode(this)"\>copy\</button\>  
  \</div\>  
  \<pre\>\<code\>\<span class="kw"\>import\</span\> React \<span class="kw"\>from\</span\> \<span class="str"\>'react'\</span\>;  
\<span class="kw"\>import\</span\> ReactDOM \<span class="kw"\>from\</span\> \<span class="str"\>'react-dom/client'\</span\>;  
\<span class="kw"\>import\</span\> { BrowserRouter } \<span class="kw"\>from\</span\> \<span class="str"\>'react-router-dom'\</span\>;  
\<span class="kw"\>import\</span\> { QueryClient, QueryClientProvider } \<span class="kw"\>from\</span\> \<span class="str"\>'@tanstack/react-query'\</span\>;  
\<span class="kw"\>import\</span\> { Provider } \<span class="kw"\>from\</span\> \<span class="str"\>'react-redux'\</span\>;  
\<span class="kw"\>import\</span\> { store } \<span class="kw"\>from\</span\> \<span class="str"\>'./store/store'\</span\>;  
\<span class="kw"\>import\</span\> App \<span class="kw"\>from\</span\> \<span class="str"\>'./App'\</span\>;

\<span class="cmt"\>// Zustand TIDAK butuh Provider \- langsung pakai useAuthStore di komponen manapun\</span\>

\<span class="kw"\>const\</span\> queryClient \= \<span class="kw"\>new\</span\> \<span class="fn"\>QueryClient\</span\>({  
  defaultOptions: {  
    queries: {  
      staleTime: \<span class="num"\>1000\</span\> \* \<span class="num"\>60\</span\> \* \<span class="num"\>5\</span\>,  
      retry: \<span class="num"\>1\</span\>,  
    },  
  },  
});

ReactDOM.\<span class="fn"\>createRoot\</span\>(document.\<span class="fn"\>getElementById\</span\>(\<span class="str"\>'root'\</span\>)).\<span class="fn"\>render\</span\>(  
  \<span class="tag"\>\&lt;Provider\</span\> \<span class="atr"\>store\</span\>=\<span class="jsx"\>{store}\</span\>\<span class="tag"\>\&gt;\</span\>               \<span class="cmt"\>// Redux \- untuk UI state global\</span\>  
    \<span class="tag"\>\&lt;QueryClientProvider\</span\> \<span class="atr"\>client\</span\>=\<span class="jsx"\>{queryClient}\</span\>\<span class="tag"\>\&gt;\</span\>  \<span class="cmt"\>// TanStack Query \- untuk server state\</span\>  
      \<span class="tag"\>\&lt;BrowserRouter\&gt;\</span\>                  \<span class="cmt"\>// React Router \- untuk navigasi\</span\>  
        \<span class="tag"\>\&lt;App /\&gt;\</span\>  
      \<span class="tag"\>\&lt;/BrowserRouter\&gt;\</span\>  
    \<span class="tag"\>\&lt;/QueryClientProvider\&gt;\</span\>  
  \<span class="tag"\>\&lt;/Provider\&gt;\</span\>  
);\</code\>\</pre\>  
\</div\>

---

### **Yang Benar-Benar di Luar Scope (User Kerjakan Sendiri)**

Item berikut tidak dicover di materi karena murni React biasa atau terlalu project-specific, dan user bisa mengerjakan sendiri:

* **Komponen UI dasar** (`Button.jsx`, `Input.jsx`, `Modal.jsx`) — ini regular React component, tidak butuh library khusus  
* **Styling** (CSS Modules, Tailwind, dsb) — tidak ada dalam scope materi library ini  
* **Toast component** — uiSlice sudah punya `showToast`/`hideToast` actions, tapi komponen Toast yang membaca dari Redux dan menampilkan notifikasi perlu dibuat sendiri. Pola dasarnya adalah `useSelector(state => state.ui.toast)` dan render kondisional  
* **Halaman 404** — sudah ada di AppRouter tapi komponennya tidak dibuat, cukup regular JSX  
* **Environment variables** (`.env` untuk `VITE_API_URL`) — ini Vite/project setup biasa, bukan React library

Tambahkan ini di awal penjelasan proyek nya juga agar user tidak kebingungan\!

