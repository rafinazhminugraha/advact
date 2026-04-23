import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import ProjectStep from "../ui/ProjectStep";
import TipBlock from "../ui/TipBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter1Router() {
  return (
    <>
      <ChapterHeader
        id="ch-router"
        num="Chapter 01"
        title="React Router v6"
        subtitle="Navigasi dan routing di aplikasi React"
        badgeVariant={1}
      />

      {/* 1.1 Setup & createBrowserRouter */}
      <TopicSection
        id="rr-setup"
        num="1.1"
        title="Setup & createBrowserRouter"
        subtitle="Cara kerja React Router modern dan titik awal konfigurasi"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              React Router adalah library yang memungkinkan kamu membuat
              navigasi antar halaman di aplikasi React tanpa melakukan full page
              reload. URL berubah, konten berganti, tapi browser tidak reload.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Setiap aplikasi multi-halaman membutuhkan routing. Ini adalah
              skill wajib yang selalu ditanyakan di interview. Tanpa React
              Router, aplikasimu hanya satu halaman statis.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Saat aplikasi punya lebih dari satu halaman</li>
              <li>Saat perlu navigasi login &rarr; dashboard</li>
              <li>Saat URL harus mencerminkan konten yang ditampilkan</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel>
          <p>
            Bayangkan router sebagai "GPS" aplikasimu. Di arsitektur modern,
            <code>createBrowserRouter</code> menyimpan seluruh definisi route
            dalam satu objek yang menjadi sumber kebenaran untuk navigasi.
          </p>
        </MentalModel>

        <CodeBlock
          lang="bash"
          file="terminal - instalasi react-router-dom"
          id="rr-setup-install"
          html={`npm install react-router-dom`}
        />

        <CodeBlock
          lang="tsx"
          file="src/main.tsx - final modern entry point (router ada di App.tsx)"
          id="rr-setup-main"
          html={`<span class="kw">import</span> React <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> ReactDOM <span class="kw">from</span> <span class="str">'react-dom/client'</span>;
<span class="kw">import</span> App <span class="kw">from</span> <span class="str">'./App'</span>;

<span class="cmt">// Catatan: Modern React Router pattern:</span>
<span class="cmt">// Catatan: RouterProvider ada di App.tsx, bukan di main.tsx</span>
<span class="cmt">// Catatan: main.tsx hanya jadi entry point render App</span>
<span class="cmt">// Catatan: Provider lain (QueryClient, Redux) ditambahkan bertahap di chapter berikutnya</span>

ReactDOM.<span class="fn">createRoot</span>(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>) <span class="kw">as</span> <span class="tp">HTMLElement</span>).<span class="fn">render</span>(
  <span class="tag">&lt;React.StrictMode&gt;</span>
    <span class="tag">&lt;App /&gt;</span>
  <span class="tag">&lt;/React.StrictMode&gt;</span>
);`}
        />

        <ProjectStep label="TaskFlow - Langkah 1">
          <p>
            Di TaskFlow, kita mendefinisikan semua routes menggunakan
            createBrowserRouter di AppRouter.tsx. RouterProvider dirender di
            App.tsx. main.tsx tetap bersih tanpa provider routing apapun.
          </p>
        </ProjectStep>
      </TopicSection>

      {/* 1.2 Routes & Params */}
      <TopicSection
        id="rr-routes"
        num="1.2"
        title="Router Object, Params, dan Layout Route"
        subtitle="Mendefinisikan halaman dan membaca data dari URL"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>Routes</code> adalah wadah untuk semua route.{" "}
              <code>Route</code> adalah aturan "jika URL ini, tampilkan komponen
              ini". URL params (<code>:id</code>) memungkinkan kamu menyematkan
              data dinamis di URL.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Hampir setiap halaman detail menggunakan URL params, contohnya{" "}
              <code>/tasks/42</code>. Memahami cara membaca params dari URL
              adalah skill dasar yang wajib dikuasai.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>
                Halaman detail produk: <code>/produk/:id</code>
              </li>
              <li>
                Profil user: <code>/user/:username</code>
              </li>
              <li>
                Halaman edit: <code>/tasks/:id/edit</code>
              </li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/router/AppRouter.tsx - final router object dengan createBrowserRouter"
          id="rr-routes-approuter"
          html={`<span class="kw">import</span> { createBrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> LoginPage <span class="kw">from</span> <span class="str">'../pages/LoginPage'</span>;
<span class="kw">import</span> DashboardPage <span class="kw">from</span> <span class="str">'../pages/DashboardPage'</span>;
<span class="kw">import</span> TaskDetailPage <span class="kw">from</span> <span class="str">'../pages/TaskDetailPage'</span>;
<span class="kw">import</span> ProtectedRoute <span class="kw">from</span> <span class="str">'./ProtectedRoute'</span>;
<span class="kw">import</span> AppLayout <span class="kw">from</span> <span class="str">'../components/layout/AppLayout'</span>;

<span class="kw">export const</span> router = <span class="fn">createBrowserRouter</span>([
  {
    path: <span class="str">'/'</span>,
    element: <span class="tag">&lt;LoginPage /&gt;</span>,
  },
  {
    <span class="cmt">// Catatan: Layout route: semua child mewarisi AppLayout + proteksi auth</span>
    element: (
      <span class="tag">&lt;ProtectedRoute&gt;</span>
        <span class="tag">&lt;AppLayout /&gt;</span>
      <span class="tag">&lt;/ProtectedRoute&gt;</span>
    ),
    children: [
      { path: <span class="str">'/dashboard'</span>, element: <span class="tag">&lt;DashboardPage /&gt;</span> },
      { path: <span class="str">'/tasks/:id'</span>, element: <span class="tag">&lt;TaskDetailPage /&gt;</span> },
    ],
  },
  {
    path: <span class="str">'*'</span>,
    element: <span class="tag">&lt;div&gt;</span>404 - Halaman tidak ditemukan<span class="tag">&lt;/div&gt;</span>,
  },
]);`}
        />

        <CodeBlock
          lang="tsx"
          file="src/pages/TaskDetailPage.tsx - membaca URL param dengan useParams"
          id="rr-routes-params"
          html={`<span class="kw">import</span> { useParams } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">export default function</span> <span class="fn">TaskDetailPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>(); <span class="cmt">// Catatan: membaca :id dari URL /tasks/42 => id = "42"</span>

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;h1&gt;</span>Detail Task #<span class="jsx">{id}</span><span class="tag">&lt;/h1&gt;</span>
      <span class="cmt">// Catatan: fetch task berdasarkan id (akan diintegrasikan di Chapter 2)</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`}
        />

        <CodeBlock
          lang="tsx"
          file="src/components/layout/Navbar.tsx - navigasi dengan Link dan NavLink, bukan tag a"
          id="rr-routes-link"
          html={`<span class="kw">import</span> { Link, NavLink } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">function</span> <span class="fn">Navbar</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;nav&gt;</span>
      <span class="cmt">// Catatan: Link = navigasi tanpa reload, NavLink = Link dengan class "active" otomatis</span>
      <span class="tag">&lt;NavLink</span>
        <span class="atr">to</span>=<span class="str">"/dashboard"</span>
        <span class="atr">className</span>=<span class="jsx">{({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}</span>
      <span class="tag">&gt;</span>
        Dashboard
      <span class="tag">&lt;/NavLink&gt;</span>

      <span class="cmt">// Catatan: Link ke halaman task dengan ID dinamis</span>
      <span class="tag">&lt;Link</span> <span class="atr">to</span>=<span class="jsx">{\`/tasks/\${task.id}\`}</span><span class="tag">&gt;</span>Lihat Detail<span class="tag">&lt;/Link&gt;</span>
    <span class="tag">&lt;/nav&gt;</span>
  );
}`}
        />

        <MistakeBlock>
          <li>
            Menggunakan <code>&lt;a href="/dashboard"&gt;</code> untuk navigasi
            internal - ini akan menyebabkan full page reload dan kehilangan
            semua state. Selalu gunakan <code>&lt;Link&gt;</code>
          </li>
          <li>
            Lupa bahwa nilai dari <code>useParams()</code> selalu bertipe
            string, bukan number. Pastikan konversi dengan{" "}
            <code>Number(id)</code> atau <code>parseInt(id)</code> saat perlu
          </li>
          <li>
            Membuat layout route tanpa <code>children</code> atau tanpa{" "}
            <code>&lt;Outlet /&gt;</code> - child route tidak akan pernah tampil
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 1.3 Navigate */}
      <TopicSection
        id="rr-navigate"
        num="1.3"
        title="Navigasi Programatik dengan useNavigate"
        subtitle="Berpindah halaman dari dalam kode JavaScript"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>useNavigate</code> adalah hook yang mengembalikan fungsi{" "}
              <code>navigate</code>. Fungsi ini digunakan untuk berpindah
              halaman dari dalam logika JavaScript, bukan dari klik user secara
              langsung.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Kamu tidak bisa selalu menggunakan <code>&lt;Link&gt;</code>.
              Setelah submit form login, setelah delete data, atau setelah aksi
              async selesai, kamu perlu redirect secara programatik.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Setelah login berhasil &rarr; redirect ke dashboard</li>
              <li>Setelah submit form &rarr; redirect ke halaman list</li>
              <li>Tombol "kembali" kustom</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/pages/LoginPage.tsx - redirect setelah login berhasil menggunakan useNavigate"
          id="rr-navigate-code"
          html={`<span class="kw">import</span> { useNavigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">const</span> <span class="fn">loginApi</span> = <span class="kw">async</span> (data) => {
  <span class="cmt">// Catatan: Untuk konsistensi materi, login diarahkan ke mock backend lokal yang sama</span>
  <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'http://localhost:3001/auth/login'</span>, {
    method: <span class="str">'POST'</span>,
    headers: { <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> },
    body: <span class="tp">JSON</span>.<span class="fn">stringify</span>(data),
  });

  <span class="kw">if</span> (!res.ok) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="str">'Login gagal'</span>);
  <span class="kw">return</span> res.<span class="fn">json</span>();
};

<span class="kw">export default function</span> <span class="fn">LoginPage</span>() {
  <span class="kw">const</span> navigate = <span class="fn">useNavigate</span>();

  <span class="kw">const</span> <span class="fn">handleLogin</span> = <span class="kw">async</span> (data) => {
    <span class="kw">try</span> {
      <span class="kw">await</span> <span class="fn">loginApi</span>(data);             <span class="cmt">// Catatan: panggil API login</span>
      navigate(<span class="str">'/dashboard'</span>);          <span class="cmt">// Catatan: redirect setelah berhasil</span>
    } <span class="kw">catch</span> (err) {
      console.<span class="fn">error</span>(<span class="str">'Login gagal'</span>, err);
    }
  };

  <span class="kw">return</span> <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{handleLogin}</span><span class="tag">&gt;</span>Login<span class="tag">&lt;/button&gt;</span>;
}

<span class="cmt">// Catatan: navigate(-1)         => kembali ke halaman sebelumnya (seperti tombol back)</span>
<span class="cmt">// Catatan: navigate('/login', { replace: true })  => replace history, tidak bisa back</span>
<span class="cmt">// Catatan: Di Chapter 2, loginApi ini direfactor ke axiosInstance + VITE_API_URL</span>`}
        />

        <MistakeBlock>
          <li>
            Memanggil <code>navigate()</code> langsung di body komponen (bukan
            di dalam event handler atau useEffect) - ini menyebabkan infinite
            render
          </li>
          <li>
            Lupa <code>replace: true</code> setelah logout sehingga user bisa
            menekan "back" dan kembali ke halaman yang butuh autentikasi
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 1.4 Protected Routes */}
      <TopicSection
        id="rr-protected"
        num="1.4"
        title="Protected Routes (Guard)"
        subtitle="Mencegah akses ke halaman tanpa login"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Protected Route adalah pola di mana kamu membungkus{" "}
              <code>Route</code> dengan komponen yang memeriksa status
              autentikasi. Jika user belum login, dia diarahkan ke halaman login
              secara otomatis.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Ini adalah pola yang wajib ada di hampir setiap aplikasi
              production. Tanpa ini, siapapun bisa mengakses halaman dashboard
              atau admin hanya dengan mengetik URL secara langsung.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Halaman dashboard yang butuh login</li>
              <li>Halaman admin yang butuh role tertentu</li>
              <li>Semua route yang butuh autentikasi</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/router/ProtectedRoute.tsx - interim guard (final auth store di Chapter 5)"
          id="rr-protected-code"
          html={`<span class="kw">import</span> { Navigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">interface</span> <span class="tp">ProtectedRouteProps</span> {
  children: <span class="tp">React.ReactNode</span>;
}

<span class="kw">export default function</span> <span class="fn">ProtectedRoute</span>({ children }: <span class="tp">ProtectedRouteProps</span>) {
  <span class="cmt">// Catatan: Interim placeholder untuk menjaga alur belajar Chapter 1 tetap jalan.</span>
  <span class="cmt">// Catatan: Di Chapter 5, ganti jadi:</span>
  <span class="cmt">// Catatan: const isLoggedIn = useAuthStore((state) =&gt; state.isLoggedIn);</span>
  <span class="kw">const</span> isLoggedIn = <span class="kw">true</span>;

  <span class="kw">if</span> (!isLoggedIn) {
    <span class="kw">return</span> <span class="tag">&lt;Navigate</span> <span class="atr">to</span>=<span class="str">"/"</span> <span class="atr">replace</span> <span class="tag">/&gt;</span>;
  }

  <span class="kw">return</span> children;
}`}
        />

        <TipBlock>
          <p>
            <strong>Dengan createBrowserRouter:</strong> ProtectedRoute tidak
            lagi dibungkus di setiap Route secara terpisah. Cukup satu kali di
            parent element pada definisi router di AppRouter.tsx. Semua child
            routes otomatis terlindungi. Lihat kode di section 1.2 untuk
            implementasi lengkapnya.
          </p>
        </TipBlock>

        <MistakeBlock>
          <li>
            Mengecek autentikasi hanya dari localStorage tanpa state global -
            state tidak reaktif, tampilan tidak update saat logout
          </li>
          <li>
            Tidak menggunakan <code>replace</code> pada Navigate setelah logout
            - user bisa kembali ke halaman protected dengan tombol back browser
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 1.5 Nested Routes */}
      <TopicSection
        id="rr-nested"
        num="1.5"
        title="Nested Routes & Layout Route"
        subtitle="Berbagi layout (Navbar, Sidebar) antar halaman"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Nested Routes memungkinkan route bersarang di dalam route lain.
              Layout Route digunakan untuk berbagi komponen layout (seperti
              Navbar) tanpa mengulang kode di setiap halaman.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Ini adalah pola yang sangat umum di aplikasi production. Navbar
              dan Sidebar yang konsisten di semua halaman dashboard
              diimplementasikan dengan nested routes, bukan dengan mengcopy
              komponen ke setiap halaman.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Semua halaman dashboard berbagi satu layout</li>
              <li>Tab navigasi di dalam satu halaman</li>
              <li>Halaman admin dengan sidebar khusus</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/components/layout/AppLayout.tsx - layout bersama Navbar dan Sidebar dengan Outlet"
          id="rr-nested-layout"
          html={`<span class="kw">import</span> { Outlet } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> Navbar <span class="kw">from</span> <span class="str">'./Navbar'</span>;
<span class="kw">import</span> Sidebar <span class="kw">from</span> <span class="str">'./Sidebar'</span>;

<span class="cmt">// Catatan: Outlet = placeholder untuk child route yang aktif</span>
<span class="kw">export default function</span> <span class="fn">AppLayout</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;Navbar /&gt;</span>
      <span class="tag">&lt;div</span> <span class="atr">style</span>=<span class="jsx">{{ display: 'flex' }}</span><span class="tag">&gt;</span>
        <span class="tag">&lt;Sidebar /&gt;</span>
        <span class="tag">&lt;main&gt;</span>
          <span class="tag">&lt;Outlet /&gt;</span> <span class="cmt">// Catatan: Di sini child route dirender</span>
        <span class="tag">&lt;/main&gt;</span>
      <span class="tag">&lt;/div&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`}
        />

        <MentalModel label="Struktur Akhir AppRouter.tsx">
          <p>
            Dengan <code>createBrowserRouter</code>, nested routes dan layout
            route sudah terintegrasi dalam satu definisi di{" "}
            <code>AppRouter.tsx</code> yang ditunjukkan di section 1.2. Tidak
            ada file router terpisah yang diperlukan. Satu file, satu sumber
            kebenaran untuk semua routes.
          </p>
        </MentalModel>

        <TipBlock>
          <p>
            <strong>Pola ini sangat umum di dunia kerja.</strong> Hampir semua
            aplikasi production menggunakan layout route untuk Navbar dan
            Sidebar. Kuasai pola ini dengan baik sebelum interview.
          </p>
        </TipBlock>

        <MistakeBlock>
          <li>
            Lupa menambahkan <code>&lt;Outlet /&gt;</code> di komponen layout -
            child route tidak akan pernah ditampilkan
          </li>
          <li>
            Copy-paste Navbar ke setiap halaman secara manual alih-alih
            menggunakan layout route
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 1.6 useSearchParams */}
      <TopicSection
        id="rr-searchparams"
        num="1.6"
        title="useSearchParams untuk Filter via URL"
        subtitle="Membaca dan mengubah query string di URL tanpa reload"
        isLast
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>useSearchParams</code> adalah hook untuk membaca dan
              mengubah query parameters di URL, yaitu bagian setelah tanda{" "}
              <code>?</code> seperti{" "}
              <code>/dashboard?status=todo&amp;priority=high</code>. State
              filter tersimpan di URL sehingga bisa di-share dan tidak hilang
              saat refresh.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Hampir setiap dashboard di dunia kerja punya fitur filter.
              Menyimpan filter di URL adalah best practice: user bisa bookmark,
              share link, dan halaman tidak reset saat refresh. Ini ditanyakan
              di interview dan ada di hampir setiap job description.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Filter task berdasarkan status di DashboardPage</li>
              <li>
                Pagination: <code>?page=2</code>
              </li>
              <li>
                Search query: <code>?q=keyword</code>
              </li>
              <li>
                Kombinasi filter: <code>?status=todo&amp;priority=high</code>
              </li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel>
          <p>
            Bayangkan <code>useSearchParams</code> seperti <code>useState</code>{" "}
            tapi nilainya disimpan di URL, bukan di memori React.{" "}
            <code>[searchParams, setSearchParams]</code> persis seperti{" "}
            <code>[state, setState]</code> - bedanya perubahan langsung
            tercermin di URL browser.
          </p>
        </MentalModel>

        <CodeBlock
          lang="tsx"
          file="src/pages/DashboardPage.tsx - filter task berdasarkan status via URL"
          id="rr-searchparams-code"
          html={`<span class="kw">import</span> { useSearchParams } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { useQuery } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { fetchTasks } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">type</span> <span class="tp">TaskStatus</span> = <span class="tp">Task</span>[<span class="str">'status'</span>] | <span class="str">'all'</span>;

<span class="kw">export default function</span> <span class="fn">DashboardPage</span>() {
  <span class="kw">const</span> [searchParams, setSearchParams] = <span class="fn">useSearchParams</span>();

  <span class="cmt">// Catatan: URL menjadi source of truth untuk filter aktif</span>
  <span class="kw">const</span> activeStatus = (searchParams.<span class="fn">get</span>(<span class="str">'status'</span>) <span class="kw">as</span> <span class="tp">TaskStatus</span>) || <span class="str">'all'</span>;

  <span class="kw">const</span> { data: tasks = [], isPending } = <span class="fn">useQuery</span>&lt;<span class="tp">Task</span>[]&gt;({
    <span class="cmt">// Catatan: status wajib masuk ke queryKey agar cache per-filter tidak tertukar</span>
    queryKey: [<span class="str">'tasks'</span>, { status: activeStatus }],
    queryFn: () => <span class="fn">fetchTasks</span>({ status: activeStatus }),
  });

  <span class="kw">const</span> statusOptions: <span class="tp">TaskStatus</span>[] = [<span class="str">'all'</span>, <span class="str">'todo'</span>, <span class="str">'in-progress'</span>, <span class="str">'done'</span>];

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;div&gt;</span>
        <span class="jsx">{statusOptions.<span class="fn">map</span>((status) => (
          &lt;button
            key={status}
            onClick={() =&gt; setSearchParams((prev) =&gt; {
              <span class="cmt">// Catatan: update hanya param status, param lain tetap dipertahankan</span>
              prev.set('status', status);
              return prev;
            })}
            style={{ fontWeight: activeStatus === status ? 'bold' : 'normal' }}
          &gt;
            {status}
          &lt;/button&gt;
        ))}</span>
      <span class="tag">&lt;/div&gt;</span>

      <span class="jsx">{isPending ? (
        &lt;p&gt;Memuat...&lt;/p&gt;
      ) : (
        tasks.<span class="fn">map</span>((task) => &lt;TaskCard key={task.id} task={task} /&gt;)
      )}</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`}
        />

        <ProjectStep label="TaskFlow - Filter Task">
          <p>
            Dengan <strong>useSearchParams</strong>, fitur filter status di
            DashboardPage TaskFlow menjadi persisten di URL. User bisa
            membagikan link <code>/dashboard?status=todo</code> dan orang lain
            langsung melihat task yang sama tersaring.
          </p>
        </ProjectStep>

        <MistakeBlock>
          <li>
            Menyimpan state filter di <code>useState</code> biasa - filter
            hilang saat user refresh atau berpindah halaman lalu kembali.
            Gunakan <code>useSearchParams</code> agar filter persisten
          </li>
          <li>
            Memanggil <code>setSearchParams(&#123; status &#125;)</code> yang
            menghapus semua params lain. Jika ada beberapa filter, pertahankan
            yang lain:{" "}
            <code>
              setSearchParams(prev =&gt; &#123; prev.set('status', status);
              return prev; &#125;)
            </code>
          </li>
          <li>
            Lupa menyertakan nilai filter di <code>queryKey</code> TanStack
            Query - semua filter akan berbagi cache yang sama dan data tidak
            akan diperbarui saat filter berubah
          </li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
