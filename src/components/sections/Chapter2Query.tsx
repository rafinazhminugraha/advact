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
            <p>
              TanStack Query (dulu React Query) adalah library untuk mengurus
              semua hal yang berhubungan dengan data dari server: fetching,
              caching, loading state, error state, dan sinkronisasi otomatis.
              Axios adalah HTTP client yang lebih powerful dari{" "}
              <code>fetch</code> bawaan browser.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Mengurus server state dengan <code>useState + useEffect</code> itu
              menyakitkan: kamu harus handle loading, error, refetch, dan cache
              secara manual. TanStack Query melakukan semua itu secara otomatis
              dengan kode yang jauh lebih bersih.
            </p>
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
          <p>
            Bayangkan TanStack Query sebagai "asisten cerdas" untuk data API
            kamu. Kamu cukup bilang "ambilkan data tasks", dan dia yang mengurus
            loading state, error handling, caching, dan pembaruan otomatis. Kamu
            tidak perlu lagi menulis <code>setLoading(true)</code> dan{" "}
            <code>setData(result)</code> secara manual.
          </p>
        </MentalModel>

        <CodeBlock
          lang="bash"
          file="terminal - instalasi tanstack query dan axios"
          id="tq-setup-install"
          html={`npm install @tanstack/react-query axios`}
        />

        <CodeBlock
          lang="tsx"
          file="src/main.tsx - interim QueryClientProvider (final versi lengkap ada di Chapter 4)"
          id="tq-setup-main"
          html={`<span class="kw">import</span> { QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> React <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> ReactDOM <span class="kw">from</span> <span class="str">'react-dom/client'</span>;
<span class="kw">import</span> App <span class="kw">from</span> <span class="str">'./App'</span>;

<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: {
      staleTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">5</span>, <span class="cmt">// data dianggap fresh selama 5 menit</span>
      retry: <span class="num">1</span>,               <span class="cmt">// coba ulang 1x jika gagal</span>
    },
  },
});

ReactDOM.<span class="fn">createRoot</span>(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>)).<span class="fn">render</span>(
  <span class="tag">&lt;React.StrictMode&gt;</span>
    <span class="tag">&lt;QueryClientProvider</span> <span class="atr">client</span>=<span class="jsx">{queryClient}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;App /&gt;</span>
    <span class="tag">&lt;/QueryClientProvider&gt;</span>
  <span class="tag">&lt;/React.StrictMode&gt;</span>
);`}
        />

        <TipBlock>
          <p>
            <strong>Heads up untuk alur belajar:</strong> di Chapter 4 kamu akan
            upgrade <code>main.tsx</code> ini dengan menambahkan
            <code>Provider</code> Redux. Jadi snippet di section ini memang
            bersifat interim untuk fokus ke TanStack Query dulu.
          </p>
        </TipBlock>

        <CodeBlock
          lang="bash"
          file=".env dan .env.example - setup environment variable API"
          id="tq-setup-env"
          html={`# .env (di root project, jangan di-commit ke git)
VITE_API_URL=https://api.taskflow.dev/v1

# .env.example (template yang di-commit ke git)
VITE_API_URL=`}
        />

        <TipBlock>
          <p>
            <strong>Wajib tahu:</strong> Jangan pernah hardcode URL API langsung
            di kode. Gunakan environment variables. Di Vite, semua variabel
            harus diawali dengan <code>VITE_</code> dan diakses dengan{" "}
            <code>import.meta.env.VITE_NAMA_VARIABEL</code>. Tambahkan{" "}
            <code>.env</code> ke <code>.gitignore</code> dan buat{" "}
            <code>.env.example</code> sebagai template.
          </p>
        </TipBlock>

        <CodeBlock
          lang="ts"
          file="src/api/axiosInstance.ts - konfigurasi base instance Axios dengan timeout dan headers"
          id="tq-setup-axios"
          html={`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> api = axios.<span class="fn">create</span>({
  baseURL: import.meta.env.VITE_API_URL ?? <span class="str">'https://api.taskflow.dev/v1'</span>,
  timeout: <span class="num">10000</span>,
  headers: {
    <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span>,
  },
});

<span class="kw">export default</span> api;`}
        />
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
            <p>
              <code>useQuery</code> adalah hook untuk mengambil (GET) data dari
              server. Dia secara otomatis mengurus loading state, error state,
              caching, dan refetch.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Menggantikan pola <code>useEffect + fetch + useState</code> yang
              verbose dan error-prone. Dengan <code>useQuery</code>, kode fetch
              data menjadi 3-5 baris dan lebih reliable.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Fetch daftar tasks di DashboardPage</li>
              <li>Fetch detail task berdasarkan ID</li>
              <li>Fetch data apapun dari API GET</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="ts"
          file="src/api/taskApi.ts - fungsi API untuk operasi task"
          id="tq-usequery-api"
          html={`<span class="kw">import</span> api <span class="kw">from</span> <span class="str">'./axiosInstance'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">export interface</span> <span class="tp">FetchTasksParams</span> {
  status?: <span class="tp">Task</span>[<span class="str">'status'</span>] | <span class="str">'all'</span>;
  priority?: <span class="tp">Task</span>[<span class="str">'priority'</span>];
}

<span class="kw">export const</span> <span class="fn">fetchTasks</span> = (params: <span class="tp">FetchTasksParams</span> = {}): <span class="tp">Promise</span>&lt;<span class="tp">Task</span>[]&gt; =&gt; {
  <span class="kw">const</span> filteredParams = <span class="tp">Object</span>.<span class="fn">fromEntries</span>(
    <span class="tp">Object</span>.<span class="fn">entries</span>(params).<span class="fn">filter</span>(([, v]) =&gt; v !== <span class="str">'all'</span> &amp;&amp; v !== <span class="kw">undefined</span>)
  );
  <span class="kw">return</span> api.<span class="fn">get</span>(<span class="str">'/tasks'</span>, { params: filteredParams }).<span class="fn">then</span>((res) =&gt; res.data);
};

<span class="kw">export const</span> <span class="fn">fetchTaskById</span> = (id: <span class="tp">string</span> | <span class="tp">number</span>): <span class="tp">Promise</span>&lt;<span class="tp">Task</span>&gt; =&gt;
  api.<span class="fn">get</span>(<span class="str">\`/tasks/\${id}\`</span>).<span class="fn">then</span>((res) =&gt; res.data);`}
        />

        <CodeBlock
          lang="tsx"
          file="src/pages/DashboardPage.tsx - useQuery untuk fetch dan render daftar task"
          id="tq-usequery-dashboard"
          html={`<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTasks } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;
<span class="kw">import</span> TaskCard <span class="kw">from</span> <span class="str">'../components/TaskCard'</span>;

<span class="kw">export default function</span> <span class="fn">DashboardPage</span>() {
  <span class="kw">const</span> {
    data: tasks = [],
    isPending,
    isError,
    error,
    isFetching,
  } = <span class="fn">useQuery</span>&lt;<span class="tp">Task</span>[]&gt;({
    queryKey: [<span class="str">'tasks'</span>],
    queryFn: fetchTasks,
  });

  <span class="kw">if</span> (isPending) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Memuat tasks...<span class="tag">&lt;/div&gt;</span>;
  <span class="kw">if</span> (isError) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Error: <span class="jsx">{(error as Error).message}</span><span class="tag">&lt;/div&gt;</span>;

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="jsx">{isFetching &amp;&amp; &lt;span&gt;Memperbarui data...&lt;/span&gt;}</span>
      <span class="jsx">{tasks.<span class="fn">map</span>((task) => (
        &lt;TaskCard key={task.id} task={task} /&gt;
      ))}</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`}
        />

        <CodeBlock
          lang="tsx"
          file="src/pages/TaskDetailPage.tsx - fetch detail satu task berdasarkan URL param"
          id="tq-usequery-detail"
          html={`<span class="kw">import</span> { useParams } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTaskById } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">export default function</span> <span class="fn">TaskDetailPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>&lt;{ id: <span class="tp">string</span> }&gt;();

  <span class="kw">const</span> { data: task, isPending } = <span class="fn">useQuery</span>&lt;<span class="tp">Task</span>&gt;({
    queryKey: [<span class="str">'tasks'</span>, id],
    queryFn: () => <span class="fn">fetchTaskById</span>(id!),
    enabled: !!id,
  });

  <span class="kw">if</span> (isPending) <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>Memuat...<span class="tag">&lt;/div&gt;</span>;
  <span class="kw">return</span> <span class="tag">&lt;div&gt;</span><span class="jsx">{task?.title}</span><span class="tag">&lt;/div&gt;</span>;
}`}
        />

        <TipBlock>
          <p>
            <strong>Best practice di dunia kerja:</strong> query logic sering
            dibungkus dalam custom hook agar reusable dan komponen lebih bersih.
            Ini juga memudahkan testing karena logika query terisolasi.
          </p>
        </TipBlock>

        <CodeBlock
          lang="ts"
          file="src/hooks/useTasks.ts - custom hook yang membungkus query task"
          id="tq-usequery-useTasks"
          html={`<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTasks, fetchTaskById } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import type</span> { FetchTasksParams } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="cmt">// Custom hook untuk daftar tasks dengan filter opsional</span>
<span class="kw">export function</span> <span class="fn">useTasks</span>(filters: <span class="tp">FetchTasksParams</span> = {}) {
  <span class="kw">return</span> <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, filters],
    queryFn: () => <span class="fn">fetchTasks</span>(filters),
  });
}

<span class="cmt">// Custom hook untuk satu task berdasarkan id</span>
<span class="kw">export function</span> <span class="fn">useTask</span>(id: <span class="tp">string</span> | <span class="tp">number</span>) {
  <span class="kw">return</span> <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, id],
    queryFn: () => <span class="fn">fetchTaskById</span>(id),
    enabled: !!id,
  });
}

<span class="cmt">// Pemakaian di komponen jadi jauh lebih bersih:</span>
<span class="cmt">// const { data: tasks, isPending } = useTasks({ status: activeStatus });</span>
<span class="cmt">// const { data: task } = useTask(id);</span>`}
        />

        <MentalModel label="isPending vs isFetching — Perbedaan Penting di Query v5">
          <p>
            Ini adalah sumber kebingungan yang sering muncul di interview. Kedua
            properti ini berbeda dan masing-masing punya use case spesifik.
          </p>
        </MentalModel>

        <CodeBlock
          lang="jsx"
          file="referensi - perbedaan isPending dan isFetching di TanStack Query v5"
          id="tq-usequery-loading-diff"
          html={`<span class="kw">const</span> { data, isPending, isFetching } = <span class="fn">useQuery</span>({ ... });

<span class="cmt">// isPending  = true saat belum ada data sama sekali (query baru pertama kali)</span>
<span class="cmt">//             Gunakan ini untuk skeleton/halaman loading pertama kali</span>

<span class="cmt">// isFetching = true setiap kali sedang fetch, termasuk background refetch</span>
<span class="cmt">//             Gunakan ini untuk indikator "sedang menyinkronkan" tanpa menghapus UI</span>

<span class="cmt">// Pola yang direkomendasikan:</span>
<span class="kw">if</span> (isPending) <span class="kw">return</span> <span class="tag">&lt;SkeletonCard /&gt;</span>;    <span class="cmt">// skeleton saat pertama kali</span>

<span class="kw">return</span> (
  <span class="tag">&lt;div&gt;</span>
    <span class="jsx">{isFetching &amp;&amp; &lt;span&gt;Memperbarui data...&lt;/span&gt;}</span>
    <span class="jsx">{tasks.<span class="fn">map</span>((task) => &lt;TaskCard key={task.id} task={task} /&gt;)}</span>
  <span class="tag">&lt;/div&gt;</span>
);`}
        />

        <MistakeBlock>
          <li>
            Menggunakan <code>queryKey: ['tasks']</code> yang sama untuk query
            dengan ID berbeda - semua task akan berbagi cache yang sama. Selalu
            sertakan ID di queryKey: <code>['tasks', id]</code>
          </li>
          <li>
            Langsung menaruh <code>fetch()</code> di dalam <code>queryFn</code>{" "}
            tanpa fungsi terpisah - susah di-test dan duplikasi kode
          </li>
          <li>
            Tidak menangani <code>isPending</code> dan <code>isError</code> -
            menyebabkan error runtime ketika data belum tersedia
          </li>
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
            <p>
              <code>useMutation</code> adalah hook untuk operasi yang mengubah
              data di server: POST, PUT, PATCH, DELETE. Berbeda dari{" "}
              <code>useQuery</code>, mutation hanya dijalankan ketika kamu
              memintanya secara eksplisit.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Setiap aplikasi CRUD butuh mutation. <code>useMutation</code>{" "}
              menyediakan <code>onSuccess</code>, <code>onError</code>, dan{" "}
              <code>isPending</code> secara gratis, sehingga kamu bisa
              memberikan feedback yang baik ke user.
            </p>
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
          <p>
            <strong>Catatan:</strong> Definisi <code>TaskCard.tsx</code> untuk
            use case ini ada di snippet berikut agar tidak ada referensi
            komponen yang belum didefinisikan.
          </p>
        </TipBlock>

        <CodeBlock
          lang="tsx"
          file="src/api/taskApi.ts - API functions untuk create, update, delete task"
          id="tq-usemutation-api"
          html={`<span class="kw">import</span> api <span class="kw">from</span> <span class="str">'./axiosInstance'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">type</span> <span class="tp">CreateTaskPayload</span> = <span class="tp">Omit</span>&lt;<span class="tp">Task</span>, <span class="str">'id'</span>&gt;;
<span class="kw">type</span> <span class="tp">UpdateTaskPayload</span> = <span class="tp">Partial</span>&lt;<span class="tp">Omit</span>&lt;<span class="tp">Task</span>, <span class="str">'id'</span>&gt;&gt; &amp; { id: <span class="tp">number</span> };

<span class="kw">export const</span> <span class="fn">createTask</span> = (data: <span class="tp">CreateTaskPayload</span>): <span class="tp">Promise</span>&lt;<span class="tp">Task</span>&gt; =&gt;
  api.<span class="fn">post</span>(<span class="str">'/tasks'</span>, data).<span class="fn">then</span>((res) =&gt; res.data);

<span class="kw">export const</span> <span class="fn">updateTask</span> = ({ id, ...data }: <span class="tp">UpdateTaskPayload</span>): <span class="tp">Promise</span>&lt;<span class="tp">Task</span>&gt; =&gt;
  api.<span class="fn">patch</span>(<span class="str">\`/tasks/\${id}\`</span>, data).<span class="fn">then</span>((res) =&gt; res.data);

<span class="kw">export const</span> <span class="fn">deleteTask</span> = (id: <span class="tp">number</span>): <span class="tp">Promise</span>&lt;<span class="tp">void</span>&gt; =&gt;
  api.<span class="fn">delete</span>(<span class="str">\`/tasks/\${id}\`</span>).<span class="fn">then</span>((res) =&gt; res.data);`}
        />

        <CodeBlock
          lang="tsx"
          file="src/components/TaskCard.tsx - useMutation untuk hapus task dari dalam komponen"
          id="tq-usemutation-delete"
          html={`<span class="kw">import</span> { useMutation, useQueryClient } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { deleteTask } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">interface</span> <span class="tp">TaskCardProps</span> {
  task: <span class="tp">Task</span>;
  isOwner?: <span class="tp">boolean</span>;
}

<span class="kw">function</span> <span class="fn">TaskCard</span>({ task, isOwner = <span class="kw">false</span> }: <span class="tp">TaskCardProps</span>) {
  <span class="kw">const</span> queryClient = <span class="fn">useQueryClient</span>(); <span class="cmt">// akses ke query cache</span>

  <span class="kw">const</span> deleteMutation = <span class="fn">useMutation</span>({
    mutationFn: deleteTask,
    onSuccess: () => {
      <span class="cmt">// Setelah hapus berhasil, invalidate cache tasks agar list direfresh</span>
      queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] });
    },
    onError: (error: <span class="tp">Error</span>) => {
      console.<span class="fn">error</span>(<span class="str">'Gagal menghapus task:'</span>, error.message);
    },
  });

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;p&gt;</span><span class="jsx">{task.title}</span><span class="tag">&lt;/p&gt;</span>
      <span class="jsx">{isOwner &amp;&amp; (</span>
        <span class="tag">&lt;button</span>
          <span class="atr">onClick</span>=<span class="jsx">{() =&gt; deleteMutation.mutate(task.id)}</span>
          <span class="atr">disabled</span>=<span class="jsx">{deleteMutation.isPending}</span>
        <span class="tag">&gt;</span>
          <span class="jsx">{deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}</span>
        <span class="tag">&lt;/button&gt;</span>
      <span class="jsx">)}</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`}
        />

        <MistakeBlock>
          <li>
            Tidak memanggil <code>invalidateQueries</code> setelah mutation
            berhasil - list data di UI tidak akan diperbarui setelah
            create/update/delete
          </li>
          <li>
            Menggunakan <code>mutate()</code> tanpa menangani{" "}
            <code>isPending</code> - user bisa klik tombol berkali-kali dan
            mengirim request duplikat
          </li>
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
          <p>
            <strong>Cache</strong> = lemari penyimpanan data sementara.{" "}
            <strong>queryKey</strong> = label di lemari itu.{" "}
            <strong>invalidateQueries</strong> = kamu memberi tanda "sudah
            kedaluwarsa" pada label tertentu sehingga TanStack Query akan
            mengambil data segar dari server di request berikutnya.
          </p>
        </MentalModel>

        <CodeBlock
          lang="jsx"
          file="referensi - cara queryKey bekerja sebagai kunci cache"
          id="tq-cache-concept"
          html={`<span class="cmt">// Setiap queryKey yang unik punya cache sendiri</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>] })             <span class="cmt">// cache: semua tasks</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, <span class="str">'1'</span>] })        <span class="cmt">// cache: task dengan id 1</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, <span class="str">'2'</span>] })        <span class="cmt">// cache: task dengan id 2</span>
<span class="fn">useQuery</span>({ queryKey: [<span class="str">'tasks'</span>, { status: <span class="str">'done'</span> }] }) <span class="cmt">// cache: tasks dengan filter</span>

<span class="cmt">// Invalidate berdasarkan prefix key</span>
queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] });
<span class="cmt">// Ini akan menginvalidasi SEMUA query yang keynya dimulai dengan 'tasks'</span>
<span class="cmt">// Termasuk ['tasks'], ['tasks', '1'], ['tasks', '2'], dll.</span>`}
        />

        <CodeBlock
          lang="tsx"
          file="src/main.tsx - konfigurasi staleTime dan gcTime pada QueryClient"
          id="tq-cache-staletime"
          html={`<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: {
      staleTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">5</span>,  <span class="cmt">// 5 menit: data dianggap "fresh", tidak refetch</span>
      gcTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">10</span>,   <span class="cmt">// 10 menit: data dihapus dari cache setelah ini</span>
    },
  },
});

<span class="cmt">// staleTime = 0 (default): setiap mount komponen akan refetch</span>
<span class="cmt">// staleTime = Infinity: data tidak pernah dianggap stale (jarang dipakai)</span>
<span class="cmt">// Untuk data yang jarang berubah (daftar kategori), staleTime tinggi lebih efisien</span>`}
        />
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
            <p>
              Interceptor adalah middleware di Axios. Request interceptor
              berjalan sebelum request dikirim, response interceptor berjalan
              setelah response diterima. Keduanya memungkinkan kamu mengubah
              atau menangani data secara terpusat.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Tanpa interceptor, kamu harus menambahkan token auth secara manual
              di setiap request. Dengan interceptor, cukup satu kali konfigurasi
              dan semua request otomatis menyertakan token.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Menambahkan JWT token ke header Authorization</li>
              <li>Handle error 401 (unauthorized) - redirect ke login</li>
              <li>Logging semua request/response</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="ts"
          file="src/api/axiosInstance.ts - konfigurasi Axios dengan interceptor auth dan error handling"
          id="tq-interceptor-code"
          html={`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> api = axios.<span class="fn">create</span>({
  baseURL: import.meta.env.VITE_API_URL ?? <span class="str">'https://api.taskflow.dev/v1'</span>,
  timeout: <span class="num">10000</span>,
  headers: { <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> },
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

<span class="kw">export default</span> api;`}
        />

        <MistakeBlock>
          <li>
            Lupa <code>return config</code> di dalam request interceptor - semua
            request akan ter-hang dan tidak pernah dikirim
          </li>
          <li>
            Membuat banyak instance Axios terpisah alih-alih menggunakan satu
            instance yang dibagikan
          </li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
