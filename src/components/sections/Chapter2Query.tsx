import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import TipBlock from "../ui/TipBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter2Query() {
  return (
    <>
      <ChapterHeader
        id="ch-query"
        num="Chapter 02"
        title="TanStack Query + Axios"
        subtitle="Server state management dan HTTP client"
        badgeVariant={2}
      />

      {/* 2.1 Setup */}
      <TopicSection
        id="tq-setup"
        num="2.1"
        title="Setup QueryClient & Instance Axios"
        subtitle="Konfigurasi awal yang diperlukan sebelum fetch data"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>TanStack Query (dulu React Query) adalah library untuk mengurus semua hal yang berhubungan dengan data dari server: fetching, caching, loading state, error state, dan sinkronisasi otomatis. Axios adalah HTTP client yang lebih powerful dari <code>fetch</code> bawaan browser.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Mengurus server state dengan <code>useState + useEffect</code> itu menyakitkan: kamu harus handle loading, error, refetch, dan cache secara manual. TanStack Query melakukan semua itu secara otomatis dengan kode yang jauh lebih bersih.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Setiap kali fetch data dari API REST</li>
              <li>Saat butuh caching otomatis</li>
              <li>Saat butuh refetch saat window kembali fokus</li>
              <li>Saat melakukan create/update/delete via API</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel>
          <p>Bayangkan TanStack Query sebagai "asisten cerdas" untuk data API kamu. Kamu cukup bilang "ambilkan data tasks", dan dia yang mengurus loading state, error handling, caching, dan pembaruan otomatis. Kamu tidak perlu lagi menulis <code>setLoading(true)</code> dan <code>setData(result)</code> secara manual.</p>
        </MentalModel>

        <CodeBlock lang="bash" file="terminal - instalasi tanstack query dan axios" id="tq-setup-install" html={`npm install @tanstack/react-query axios`} />

        <CodeBlock lang="jsx" file="src/main.jsx - setup QueryClientProvider" id="tq-setup-main" html={`<span class="kw">import</span> { QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { BrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: {
      staleTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">5</span>, <span class="cmt">// data dianggap fresh selama 5 menit</span>
      retry: <span class="num">1</span>,               <span class="cmt">// coba ulang 1x jika gagal</span>
    },
  },
});

ReactDOM.<span class="fn">createRoot</span>(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>)).<span class="fn">render</span>(
  <span class="tag">&lt;QueryClientProvider</span> <span class="atr">client</span>=<span class="jsx">{queryClient}</span><span class="tag">&gt;</span>
    <span class="tag">&lt;BrowserRouter&gt;</span>
      <span class="tag">&lt;App /&gt;</span>
    <span class="tag">&lt;/BrowserRouter&gt;</span>
  <span class="tag">&lt;/QueryClientProvider&gt;</span>
);`} />

        <CodeBlock lang="jsx" file="src/api/axiosInstance.js - konfigurasi Axios" id="tq-setup-axios" html={`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> api = axios.<span class="fn">create</span>({
  baseURL: <span class="str">'https://api.taskflow.dev/v1'</span>, <span class="cmt">// base URL sekali, tidak perlu diulang</span>
  timeout: <span class="num">10000</span>,                           <span class="cmt">// batas waktu 10 detik</span>
  headers: {
    <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span>,
  },
});

<span class="kw">export default</span> api;`} />
      </TopicSection>

      {/* 2.2 useQuery */}
      <TopicSection
        id="tq-usequery"
        num="2.2"
        title="useQuery - Mengambil Data dari API"
        subtitle="Fetch data dengan loading, error, dan caching otomatis"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p><code>useQuery</code> adalah hook untuk mengambil (GET) data dari server. Dia secara otomatis mengurus loading state, error state, caching, dan refetch.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Menggantikan pola <code>useEffect + fetch + useState</code> yang verbose dan error-prone. Dengan <code>useQuery</code>, kode fetch data menjadi 3-5 baris dan lebih reliable.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Fetch daftar tasks di DashboardPage</li>
              <li>Fetch detail task berdasarkan ID</li>
              <li>Fetch data apapun dari API GET</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/api/taskApi.js - fungsi API" id="tq-usequery-api" html={`<span class="kw">import</span> api <span class="kw">from</span> <span class="str">'./axiosInstance'</span>;

<span class="cmt">// Fungsi-fungsi ini hanya bertanggung jawab untuk panggil API</span>
<span class="kw">export const</span> <span class="fn">fetchTasks</span> = () => api.<span class="fn">get</span>(<span class="str">'/tasks'</span>).<span class="fn">then</span>((res) => res.data);
<span class="kw">export const</span> <span class="fn">fetchTaskById</span> = (id) => api.<span class="fn">get</span>(<span class="str">\`/tasks/\${id}\`</span>).<span class="fn">then</span>((res) => res.data);`} />

        <CodeBlock lang="jsx" file="src/pages/DashboardPage.jsx - useQuery untuk fetch dan render daftar task" id="tq-usequery-dashboard" html={`<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTasks } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="kw">export default function</span> <span class="fn">DashboardPage</span>() {
  <span class="kw">const</span> {
    data: tasks,       <span class="cmt">// data yang dikembalikan dari queryFn</span>
    isLoading,         <span class="cmt">// true saat pertama kali loading</span>
    isError,           <span class="cmt">// true jika request gagal</span>
    error,             <span class="cmt">// objek error jika isError = true</span>
    refetch,           <span class="cmt">// fungsi untuk fetch ulang manual</span>
  } = <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>],    <span class="cmt">// key unik untuk cache - PENTING!</span>
    queryFn: fetchTasks,    <span class="cmt">// fungsi yang melakukan fetch</span>
  });

  <span class="kw">if</span> (isLoading) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Memuat tasks...<span class="tag">&lt;/div&gt;</span>;
  <span class="kw">if</span> (isError) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Error: <span class="jsx">{error.message}</span><span class="tag">&lt;/div&gt;</span>;

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="jsx">{tasks.<span class="fn">map</span>((task) => (
        &lt;TaskCard key={task.id} task={task} /&gt;
      ))}</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`} />

        <CodeBlock lang="jsx" file="src/pages/TaskDetailPage.jsx - useQuery dengan ID dinamis" id="tq-usequery-detail" html={`<span class="kw">import</span> { useParams } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTaskById } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="kw">export default function</span> <span class="fn">TaskDetailPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>();

  <span class="kw">const</span> { data: task, isLoading } = <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, id],           <span class="cmt">// key mengandung id agar cache terpisah per task</span>
    queryFn: () => <span class="fn">fetchTaskById</span>(id),  <span class="cmt">// fungsi dengan parameter</span>
    enabled: !!id,                       <span class="cmt">// hanya fetch jika id ada</span>
  });

  <span class="kw">if</span> (isLoading) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Memuat...<span class="tag">&lt;/div&gt;</span>;
  <span class="kw">return</span> <span class="tag">&lt;div&gt;</span><span class="jsx">{task?.title}</span><span class="tag">&lt;/div&gt;</span>;
}`} />

        <TipBlock>
          <p><strong>Best practice di dunia kerja:</strong> query logic sering dibungkus dalam custom hook agar reusable dan komponen lebih bersih. Ini juga memudahkan testing karena logika query terisolasi.</p>
        </TipBlock>

        <CodeBlock lang="jsx" file="src/hooks/useTasks.js - custom hook yang membungkus query task" id="tq-usequery-useTasks" html={`<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTasks, fetchTaskById } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="cmt">// Custom hook untuk daftar tasks dengan filter opsional</span>
<span class="kw">export function</span> <span class="fn">useTasks</span>(filters = {}) {
  <span class="kw">return</span> <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, filters],
    queryFn: () => <span class="fn">fetchTasks</span>(filters),
  });
}

<span class="cmt">// Custom hook untuk satu task berdasarkan id</span>
<span class="kw">export function</span> <span class="fn">useTask</span>(id) {
  <span class="kw">return</span> <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, id],
    queryFn: () => <span class="fn">fetchTaskById</span>(id),
    enabled: !!id,
  });
}

<span class="cmt">// Pemakaian di komponen jadi jauh lebih bersih:</span>
<span class="cmt">// const { data: tasks, isLoading } = useTasks({ status: activeStatus });</span>
<span class="cmt">// const { data: task } = useTask(id);</span>`} />

        <MentalModel label="isLoading vs isFetching vs isPending — Perbedaan Penting">
          <p>Ini adalah sumber kebingungan yang sering muncul di interview. Ketiga properti ini berbeda dan masing-masing punya use case spesifik.</p>
        </MentalModel>

        <CodeBlock lang="jsx" file="referensi - perbedaan isLoading isFetching dan isPending" id="tq-usequery-loading-diff" html={`<span class="kw">const</span> { data, isLoading, isFetching, isPending } = <span class="fn">useQuery</span>({ ... });

<span class="cmt">// isLoading  = true HANYA saat pertama kali fetch DAN tidak ada cache sama sekali</span>
<span class="cmt">//             Gunakan ini untuk skeleton/loading screen pertama kali halaman dibuka</span>

<span class="cmt">// isFetching = true setiap kali sedang fetch, termasuk background refetch</span>
<span class="cmt">//             Gunakan ini untuk spinner kecil yang menunjukkan data sedang diperbarui</span>

<span class="cmt">// isPending  = true saat query belum punya data (sama dengan isLoading di v5)</span>
<span class="cmt">//             Di TanStack Query v5, isPending menggantikan isLoading untuk useQuery</span>

<span class="cmt">// Contoh use case yang tepat:</span>
<span class="kw">if</span> (isLoading) <span class="kw">return</span> <span class="tag">&lt;SkeletonCard /&gt;</span>;    <span class="cmt">// hanya tampil saat pertama kali, bukan setiap refetch</span>

<span class="kw">return</span> (
  <span class="tag">&lt;div&gt;</span>
    <span class="jsx">{isFetching &amp;&amp; &lt;span&gt;Memperbarui data...&lt;/span&gt;}</span>  <span class="cmt">// indikator background update</span>
    <span class="jsx">{tasks.<span class="fn">map</span>((task) => &lt;TaskCard key={task.id} task={task} /&gt;)}</span>
  <span class="tag">&lt;/div&gt;</span>
);`} />

        <MistakeBlock>
          <li>Menggunakan <code>queryKey: ['tasks']</code> yang sama untuk query dengan ID berbeda - semua task akan berbagi cache yang sama. Selalu sertakan ID di queryKey: <code>['tasks', id]</code></li>
          <li>Langsung menaruh <code>fetch()</code> di dalam <code>queryFn</code> tanpa fungsi terpisah - susah di-test dan duplikasi kode</li>
          <li>Tidak menangani <code>isLoading</code> dan <code>isError</code> - menyebabkan error runtime ketika data belum tersedia</li>
        </MistakeBlock>
      </TopicSection>

      {/* 2.3 useMutation */}
      <TopicSection
        id="tq-usemutation"
        num="2.3"
        title="useMutation - Create, Update, Delete Data"
        subtitle="Mengirim data ke server dengan feedback otomatis"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p><code>useMutation</code> adalah hook untuk operasi yang mengubah data di server: POST, PUT, PATCH, DELETE. Berbeda dari <code>useQuery</code>, mutation hanya dijalankan ketika kamu memintanya secara eksplisit.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Setiap aplikasi CRUD butuh mutation. <code>useMutation</code> menyediakan <code>onSuccess</code>, <code>onError</code>, dan <code>isPending</code> secara gratis, sehingga kamu bisa memberikan feedback yang baik ke user.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Membuat task baru (POST)</li>
              <li>Mengupdate status task (PATCH)</li>
              <li>Menghapus task (DELETE)</li>
              <li>Semua operasi yang mengubah data server</li>
            </ul>
          </Card>
        </CardGrid>

        <TipBlock>
          <p><strong>Sebelum lanjut ke useMutation</strong>, kita perlu mendefinisikan <code>TaskCard.jsx</code> terlebih dahulu karena komponen ini digunakan di <code>DashboardPage</code> dan akan menjadi subjek test di Chapter 6.</p>
        </TipBlock>

        <CodeBlock lang="jsx" file="src/components/TaskCard.jsx - kartu tampilan satu task" id="tq-usemutation-taskcard" html={`<span class="kw">import</span> { Link } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">const</span> priorityLabel = {
  low: <span class="str">'Rendah'</span>,
  medium: <span class="str">'Sedang'</span>,
  high: <span class="str">'Tinggi'</span>,
};

<span class="kw">export default function</span> <span class="fn">TaskCard</span>({ task, isOwner = <span class="kw">false</span>, onDelete }) {
  <span class="kw">return</span> (
    <span class="tag">&lt;div</span> <span class="atr">className</span>=<span class="str">"task-card"</span><span class="tag">&gt;</span>
      <span class="tag">&lt;div&gt;</span>
        <span class="tag">&lt;h3&gt;</span><span class="jsx">{task.title}</span><span class="tag">&lt;/h3&gt;</span>
        <span class="tag">&lt;span</span> <span class="atr">role</span>=<span class="str">"status"</span><span class="tag">&gt;</span><span class="jsx">{priorityLabel[task.priority]}</span><span class="tag">&lt;/span&gt;</span>
      <span class="tag">&lt;/div&gt;</span>

      <span class="tag">&lt;p&gt;</span><span class="jsx">{task.description}</span><span class="tag">&lt;/p&gt;</span>

      <span class="tag">&lt;div&gt;</span>
        <span class="tag">&lt;Link</span> <span class="atr">to</span>=<span class="jsx">{\`/tasks/\${task.id}\`}</span><span class="tag">&gt;</span>Lihat Detail<span class="tag">&lt;/Link&gt;</span>

        <span class="jsx">{isOwner &amp;&amp; (</span>
          <span class="tag">&lt;button</span>
            <span class="atr">aria-label</span>=<span class="str">"edit"</span>
            <span class="atr">onClick</span>=<span class="jsx">{() => {/* buka edit modal */}}</span>
          <span class="tag">&gt;</span>
            Edit
          <span class="tag">&lt;/button&gt;</span>
        <span class="jsx">)}</span>

        <span class="jsx">{isOwner &amp;&amp; (</span>
          <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{() => onDelete(task.id)}</span><span class="tag">&gt;</span>Hapus<span class="tag">&lt;/button&gt;</span>
        <span class="jsx">)}</span>
      <span class="tag">&lt;/div&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`} />

        <CodeBlock lang="jsx" file="src/api/taskApi.js - tambahkan fungsi mutasi" id="tq-usemutation-api" html={`<span class="kw">export const</span> <span class="fn">createTask</span> = (data) => api.<span class="fn">post</span>(<span class="str">'/tasks'</span>, data).<span class="fn">then</span>((res) => res.data);
<span class="kw">export const</span> <span class="fn">updateTask</span> = ({ id, ...data }) => api.<span class="fn">patch</span>(<span class="str">\`/tasks/\${id}\`</span>, data).<span class="fn">then</span>((res) => res.data);
<span class="kw">export const</span> <span class="fn">deleteTask</span> = (id) => api.<span class="fn">delete</span>(<span class="str">\`/tasks/\${id}\`</span>).<span class="fn">then</span>((res) => res.data);`} />

        <CodeBlock lang="jsx" file="src/pages/DashboardPage.jsx - useMutation untuk hapus task" id="tq-usemutation-delete" html={`<span class="kw">import</span> { useMutation, useQueryClient } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { deleteTask } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="kw">function</span> <span class="fn">TaskCard</span>({ task }) {
  <span class="kw">const</span> queryClient = <span class="fn">useQueryClient</span>(); <span class="cmt">// akses ke query cache</span>

  <span class="kw">const</span> deleteMutation = <span class="fn">useMutation</span>({
    mutationFn: deleteTask,
    onSuccess: () => {
      <span class="cmt">// Setelah hapus berhasil, invalidate cache tasks agar list direfresh</span>
      queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] });
    },
    onError: (error) => {
      console.<span class="fn">error</span>(<span class="str">'Gagal menghapus task:'</span>, error);
    },
  });

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;p&gt;</span><span class="jsx">{task.title}</span><span class="tag">&lt;/p&gt;</span>
      <span class="tag">&lt;button</span>
        <span class="atr">onClick</span>=<span class="jsx">{() => deleteMutation.mutate(task.id)}</span>
        <span class="atr">disabled</span>=<span class="jsx">{deleteMutation.isPending}</span>  <span class="cmt">// disable saat loading</span>
      <span class="tag">&gt;</span>
        <span class="jsx">{deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}</span>
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`} />

        <MistakeBlock>
          <li>Tidak memanggil <code>invalidateQueries</code> setelah mutation berhasil - list data di UI tidak akan diperbarui setelah create/update/delete</li>
          <li>Menggunakan <code>mutate()</code> tanpa menangani <code>isPending</code> - user bisa klik tombol berkali-kali dan mengirim request duplikat</li>
        </MistakeBlock>
      </TopicSection>

      {/* 2.4 Cache & Invalidation */}
      <TopicSection
        id="tq-cache"
        num="2.4"
        title="Cache & Query Invalidation"
        subtitle="Cara TanStack Query mengingat data dan kapan harus memperbarui"
      >
        <MentalModel>
          <p><strong>Cache</strong> = lemari penyimpanan data sementara. <strong>queryKey</strong> = label di lemari itu. <strong>invalidateQueries</strong> = kamu memberi tanda "sudah kedaluwarsa" pada label tertentu sehingga TanStack Query akan mengambil data segar dari server di request berikutnya.</p>
        </MentalModel>

        <CodeBlock lang="jsx" file="referensi - cara queryKey bekerja sebagai kunci cache" id="tq-cache-concept" html={`<span class="cmt">// Setiap queryKey yang unik punya cache sendiri</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>] })             <span class="cmt">// cache: semua tasks</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, <span class="str">'1'</span>] })        <span class="cmt">// cache: task dengan id 1</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, <span class="str">'2'</span>] })        <span class="cmt">// cache: task dengan id 2</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, { status: <span class="str">'done'</span> }] }) <span class="cmt">// cache: tasks dengan filter</span>

<span class="cmt">// Invalidate berdasarkan prefix key</span>
queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] });
<span class="cmt">// Ini akan menginvalidasi SEMUA query yang keynya dimulai dengan 'tasks'</span>
<span class="cmt">// Termasuk ['tasks'], ['tasks', '1'], ['tasks', '2'], dll.</span>`} />

        <CodeBlock lang="jsx" file="src/main.jsx - konfigurasi staleTime dan gcTime pada QueryClient" id="tq-cache-staletime" html={`<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: {
      staleTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">5</span>,  <span class="cmt">// 5 menit: data dianggap "fresh", tidak refetch</span>
      gcTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">10</span>,   <span class="cmt">// 10 menit: data dihapus dari cache setelah ini</span>
    },
  },
});

<span class="cmt">// staleTime = 0 (default): setiap mount komponen akan refetch</span>
<span class="cmt">// staleTime = Infinity: data tidak pernah dianggap stale (jarang dipakai)</span>
<span class="cmt">// Untuk data yang jarang berubah (daftar kategori), staleTime tinggi lebih efisien</span>`} />
      </TopicSection>

      {/* 2.5 Axios Interceptor */}
      <TopicSection
        id="tq-interceptor"
        num="2.5"
        title="Axios Interceptor untuk Auth Token"
        subtitle="Menambahkan token JWT otomatis di setiap request"
        isLast
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>Interceptor adalah middleware di Axios. Request interceptor berjalan sebelum request dikirim, response interceptor berjalan setelah response diterima. Keduanya memungkinkan kamu mengubah atau menangani data secara terpusat.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Tanpa interceptor, kamu harus menambahkan token auth secara manual di setiap request. Dengan interceptor, cukup satu kali konfigurasi dan semua request otomatis menyertakan token.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Menambahkan JWT token ke header Authorization</li>
              <li>Handle error 401 (unauthorized) - redirect ke login</li>
              <li>Logging semua request/response</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/api/axiosInstance.js - interceptor lengkap" id="tq-interceptor-code" html={`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> api = axios.<span class="fn">create</span>({
  baseURL: <span class="str">'https://api.taskflow.dev/v1'</span>,
  timeout: <span class="num">10000</span>,
});

<span class="cmt">// Request interceptor: tambahkan token sebelum request dikirim</span>
api.interceptors.request.<span class="fn">use</span>(
  (config) => {
    <span class="kw">const</span> token = localStorage.<span class="fn">getItem</span>(<span class="str">'token'</span>);
    <span class="kw">if</span> (token) {
      config.headers.Authorization = <span class="str">\`Bearer \${token}\`</span>;
    }
    <span class="kw">return</span> config; <span class="cmt">// harus return config!</span>
  },
  (error) => Promise.<span class="fn">reject</span>(error)
);

<span class="cmt">// Response interceptor: handle error 401 secara global</span>
api.interceptors.response.<span class="fn">use</span>(
  (response) => response, <span class="cmt">// jika sukses, lewatkan saja</span>
  (error) => {
    <span class="kw">if</span> (error.response?.status === <span class="num">401</span>) {
      localStorage.<span class="fn">removeItem</span>(<span class="str">'token'</span>);
      window.location.href = <span class="str">'/'</span>; <span class="cmt">// redirect ke login</span>
    }
    <span class="kw">return</span> Promise.<span class="fn">reject</span>(error);
  }
);

<span class="kw">export default</span> api;`} />

        <MistakeBlock>
          <li>Lupa <code>return config</code> di dalam request interceptor - semua request akan ter-hang dan tidak pernah dikirim</li>
          <li>Membuat banyak instance Axios terpisah alih-alih menggunakan satu instance yang dibagikan</li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
