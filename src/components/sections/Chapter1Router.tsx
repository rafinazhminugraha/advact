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

      {/* 1.1 Setup & BrowserRouter */}
      <TopicSection
        id="rr-setup"
        num="1.1"
        title="Setup & BrowserRouter"
        subtitle="Cara kerja React Router dan titik awal konfigurasi"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>React Router adalah library yang memungkinkan kamu membuat navigasi antar halaman di aplikasi React tanpa melakukan full page reload. URL berubah, konten berganti, tapi browser tidak reload.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Setiap aplikasi multi-halaman membutuhkan routing. Ini adalah skill wajib yang selalu ditanyakan di interview. Tanpa React Router, aplikasimu hanya satu halaman statis.</p>
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
          <p>Bayangkan <code>BrowserRouter</code> sebagai "GPS" aplikasimu. Dia memantau URL browser dan memberitahu React komponen mana yang harus ditampilkan berdasarkan URL tersebut.</p>
        </MentalModel>

        <CodeBlock lang="bash" file="terminal - instalasi react-router-dom" id="rr-setup-install" html={`npm install react-router-dom`} />

        <CodeBlock lang="jsx" file="src/main.jsx - membungkus App dengan BrowserRouter" id="rr-setup-main" html={`<span class="kw">import</span> { BrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> App <span class="kw">from</span> <span class="str">'./App'</span>;

ReactDOM.<span class="fn">createRoot</span>(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>)).<span class="fn">render</span>(
  <span class="tag">&lt;BrowserRouter&gt;</span>
    <span class="tag">&lt;App /&gt;</span>
  <span class="tag">&lt;/BrowserRouter&gt;</span>
);`} />

        <ProjectStep label="TaskFlow - Langkah 1">
          <p>Kita bungkus seluruh aplikasi TaskFlow dengan <strong>BrowserRouter</strong> di <code>main.jsx</code>. Ini adalah satu-satunya tempat kita meletakkan BrowserRouter, yaitu paling atas di tree komponen.</p>
        </ProjectStep>
      </TopicSection>

      {/* 1.2 Routes & Params */}
      <TopicSection
        id="rr-routes"
        num="1.2"
        title="Routes, Route, dan URL Parameters"
        subtitle="Mendefinisikan halaman dan membaca data dari URL"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p><code>Routes</code> adalah wadah untuk semua route. <code>Route</code> adalah aturan "jika URL ini, tampilkan komponen ini". URL params (<code>:id</code>) memungkinkan kamu menyematkan data dinamis di URL.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Hampir setiap halaman detail menggunakan URL params, contohnya <code>/tasks/42</code>. Memahami cara membaca params dari URL adalah skill dasar yang wajib dikuasai.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Halaman detail produk: <code>/produk/:id</code></li>
              <li>Profil user: <code>/user/:username</code></li>
              <li>Halaman edit: <code>/tasks/:id/edit</code></li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/router/AppRouter.jsx - mendefinisikan semua routes aplikasi" id="rr-routes-approuter" html={`<span class="kw">import</span> { Routes, Route } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> LoginPage <span class="kw">from</span> <span class="str">'../pages/LoginPage'</span>;
<span class="kw">import</span> DashboardPage <span class="kw">from</span> <span class="str">'../pages/DashboardPage'</span>;
<span class="kw">import</span> TaskDetailPage <span class="kw">from</span> <span class="str">'../pages/TaskDetailPage'</span>;

<span class="kw">export default function</span> <span class="fn">AppRouter</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;Routes&gt;</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/"</span>          <span class="atr">element</span>=<span class="jsx">{&lt;LoginPage /&gt;}</span>          <span class="tag">/&gt;</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/dashboard"</span> <span class="atr">element</span>=<span class="jsx">{&lt;DashboardPage /&gt;}</span>      <span class="tag">/&gt;</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/tasks/:id"</span> <span class="atr">element</span>=<span class="jsx">{&lt;TaskDetailPage /&gt;}</span>     <span class="tag">/&gt;</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"*"</span>          <span class="atr">element</span>=<span class="jsx">{&lt;div&gt;404 - Halaman tidak ditemukan&lt;/div&gt;}</span> <span class="tag">/&gt;</span>
    <span class="tag">&lt;/Routes&gt;</span>
  );
}`} />

        <CodeBlock lang="jsx" file="src/pages/TaskDetailPage.jsx - membaca URL param" id="rr-routes-params" html={`<span class="kw">import</span> { useParams } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">export default function</span> <span class="fn">TaskDetailPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>(); <span class="cmt">// membaca :id dari URL /tasks/42 => id = "42"</span>

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;h1&gt;</span>Detail Task #<span class="jsx">{id}</span><span class="tag">&lt;/h1&gt;</span>
      <span class="cmt">// fetch task berdasarkan id (akan diintegrasikan di Chapter 2)</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`} />

        <CodeBlock lang="jsx" file="src/components/layout/Navbar.jsx - navigasi dengan Link, bukan tag a" id="rr-routes-link" html={`<span class="kw">import</span> { Link, NavLink } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">function</span> <span class="fn">Navbar</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;nav&gt;</span>
      <span class="cmt">// Link = navigasi tanpa reload, NavLink = Link dengan class "active" otomatis</span>
      <span class="tag">&lt;NavLink</span>
        <span class="atr">to</span>=<span class="str">"/dashboard"</span>
        <span class="atr">className</span>=<span class="jsx">{({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}</span>
      <span class="tag">&gt;</span>
        Dashboard
      <span class="tag">&lt;/NavLink&gt;</span>

      <span class="cmt">// Link ke halaman task dengan ID dinamis</span>
      <span class="tag">&lt;Link</span> <span class="atr">to</span>=<span class="jsx">{\`/tasks/\${task.id}\`}</span><span class="tag">&gt;</span>Lihat Detail<span class="tag">&lt;/Link&gt;</span>
    <span class="tag">&lt;/nav&gt;</span>
  );
}`} />

        <MistakeBlock>
          <li>Menggunakan <code>&lt;a href="/dashboard"&gt;</code> untuk navigasi internal - ini akan menyebabkan full page reload dan kehilangan semua state. Selalu gunakan <code>&lt;Link&gt;</code></li>
          <li>Lupa bahwa nilai dari <code>useParams()</code> selalu bertipe string, bukan number. Pastikan konversi dengan <code>Number(id)</code> atau <code>parseInt(id)</code> saat perlu</li>
          <li>Meletakkan <code>&lt;Routes&gt;</code> di luar <code>&lt;BrowserRouter&gt;</code> - ini akan error</li>
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
            <p><code>useNavigate</code> adalah hook yang mengembalikan fungsi <code>navigate</code>. Fungsi ini digunakan untuk berpindah halaman dari dalam logika JavaScript, bukan dari klik user secara langsung.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Kamu tidak bisa selalu menggunakan <code>&lt;Link&gt;</code>. Setelah submit form login, setelah delete data, atau setelah aksi async selesai, kamu perlu redirect secara programatik.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Setelah login berhasil &rarr; redirect ke dashboard</li>
              <li>Setelah submit form &rarr; redirect ke halaman list</li>
              <li>Tombol "kembali" kustom</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/pages/LoginPage.jsx - navigasi programatik dengan useNavigate" id="rr-navigate-code" html={`<span class="kw">import</span> { useNavigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">export default function</span> <span class="fn">LoginPage</span>() {
  <span class="kw">const</span> navigate = <span class="fn">useNavigate</span>();

  <span class="kw">const</span> <span class="fn">handleLogin</span> = <span class="kw">async</span> (data) => {
    <span class="kw">try</span> {
      <span class="kw">await</span> <span class="fn">loginApi</span>(data);             <span class="cmt">// panggil API login</span>
      navigate(<span class="str">'/dashboard'</span>);          <span class="cmt">// redirect setelah berhasil</span>
    } <span class="kw">catch</span> (err) {
      console.<span class="fn">error</span>(<span class="str">'Login gagal'</span>, err);
    }
  };

  <span class="kw">return</span> <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{handleLogin}</span><span class="tag">&gt;</span>Login<span class="tag">&lt;/button&gt;</span>;
}

<span class="cmt">// navigate(-1)         => kembali ke halaman sebelumnya (seperti tombol back)</span>
<span class="cmt">// navigate('/login', { replace: true })  => replace history, tidak bisa back</span>`} />

        <MistakeBlock>
          <li>Memanggil <code>navigate()</code> langsung di body komponen (bukan di dalam event handler atau useEffect) - ini menyebabkan infinite render</li>
          <li>Lupa <code>replace: true</code> setelah logout sehingga user bisa menekan "back" dan kembali ke halaman yang butuh autentikasi</li>
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
            <p>Protected Route adalah pola di mana kamu membungkus <code>Route</code> dengan komponen yang memeriksa status autentikasi. Jika user belum login, dia diarahkan ke halaman login secara otomatis.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Ini adalah pola yang wajib ada di hampir setiap aplikasi production. Tanpa ini, siapapun bisa mengakses halaman dashboard atau admin hanya dengan mengetik URL secara langsung.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Halaman dashboard yang butuh login</li>
              <li>Halaman admin yang butuh role tertentu</li>
              <li>Semua route yang butuh autentikasi</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/router/ProtectedRoute.jsx - guard untuk halaman yang butuh autentikasi" id="rr-protected-code" html={`<span class="kw">import</span> { Navigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { useAuthStore } <span class="kw">from</span> <span class="str">'../stores/useAuthStore'</span>; <span class="cmt">// Zustand store (CH 5)</span>

<span class="kw">export default function</span> <span class="fn">ProtectedRoute</span>({ children }) {
  <span class="kw">const</span> isLoggedIn = <span class="fn">useAuthStore</span>((state) => state.isLoggedIn);

  <span class="kw">if</span> (!isLoggedIn) {
    <span class="cmt">// replace: true agar user tidak bisa "back" ke halaman protected</span>
    <span class="kw">return</span> <span class="tag">&lt;Navigate</span> <span class="atr">to</span>=<span class="str">"/"</span> <span class="atr">replace</span> <span class="tag">/&gt;</span>;
  }

  <span class="kw">return</span> children;
}`} />

        <CodeBlock lang="jsx" file="src/router/AppRouter.jsx - menggunakan ProtectedRoute" id="rr-protected-usage" html={`<span class="kw">import</span> ProtectedRoute <span class="kw">from</span> <span class="str">'./ProtectedRoute'</span>;

<span class="kw">export default function</span> <span class="fn">AppRouter</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;Routes&gt;</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/"</span> <span class="atr">element</span>=<span class="jsx">{&lt;LoginPage /&gt;}</span> <span class="tag">/&gt;</span>

      <span class="cmt">// Semua route di bawah ini butuh login</span>
      <span class="tag">&lt;Route</span>
        <span class="atr">path</span>=<span class="str">"/dashboard"</span>
        <span class="atr">element</span>=<span class="jsx">{
          &lt;ProtectedRoute&gt;
            &lt;DashboardPage /&gt;
          &lt;/ProtectedRoute&gt;
        }</span>
      <span class="tag">/&gt;</span>
      <span class="tag">&lt;Route</span>
        <span class="atr">path</span>=<span class="str">"/tasks/:id"</span>
        <span class="atr">element</span>=<span class="jsx">{
          &lt;ProtectedRoute&gt;
            &lt;TaskDetailPage /&gt;
          &lt;/ProtectedRoute&gt;
        }</span>
      <span class="tag">/&gt;</span>
    <span class="tag">&lt;/Routes&gt;</span>
  );
}`} />

        <MistakeBlock>
          <li>Mengecek autentikasi hanya dari localStorage tanpa state global - state tidak reaktif, tampilan tidak update saat logout</li>
          <li>Tidak menggunakan <code>replace</code> pada Navigate setelah logout - user bisa kembali ke halaman protected dengan tombol back browser</li>
        </MistakeBlock>
      </TopicSection>

      {/* 1.5 Nested Routes */}
      <TopicSection
        id="rr-nested"
        num="1.5"
        title="Nested Routes & Layout Route"
        subtitle="Berbagi layout (Navbar, Sidebar) antar halaman"
        isLast
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>Nested Routes memungkinkan route bersarang di dalam route lain. Layout Route digunakan untuk berbagi komponen layout (seperti Navbar) tanpa mengulang kode di setiap halaman.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Ini adalah pola yang sangat umum di aplikasi production. Navbar dan Sidebar yang konsisten di semua halaman dashboard diimplementasikan dengan nested routes, bukan dengan mengcopy komponen ke setiap halaman.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Semua halaman dashboard berbagi satu layout</li>
              <li>Tab navigasi di dalam satu halaman</li>
              <li>Halaman admin dengan sidebar khusus</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/components/layout/AppLayout.jsx - layout bersama" id="rr-nested-layout" html={`<span class="kw">import</span> { Outlet } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> Navbar <span class="kw">from</span> <span class="str">'./Navbar'</span>;
<span class="kw">import</span> Sidebar <span class="kw">from</span> <span class="str">'./Sidebar'</span>;

<span class="cmt">// Outlet = placeholder untuk child route yang aktif</span>
<span class="kw">export default function</span> <span class="fn">AppLayout</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;Navbar /&gt;</span>
      <span class="tag">&lt;div</span> <span class="atr">style</span>=<span class="jsx">{{ display: 'flex' }}</span><span class="tag">&gt;</span>
        <span class="tag">&lt;Sidebar /&gt;</span>
        <span class="tag">&lt;main&gt;</span>
          <span class="tag">&lt;Outlet /&gt;</span> <span class="cmt">// Di sini child route dirender</span>
        <span class="tag">&lt;/main&gt;</span>
      <span class="tag">&lt;/div&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}`} />

        <CodeBlock lang="jsx" file="src/router/AppRouter.jsx - nested routes final TaskFlow" id="rr-nested-final" html={`<span class="kw">export default function</span> <span class="fn">AppRouter</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;Routes&gt;</span>
      <span class="cmt">// Route publik</span>
      <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/"</span> <span class="atr">element</span>=<span class="jsx">{&lt;LoginPage /&gt;}</span> <span class="tag">/&gt;</span>

      <span class="cmt">// Layout route - semua child akan mewarisi AppLayout</span>
      <span class="tag">&lt;Route</span>
        <span class="atr">element</span>=<span class="jsx">{
          &lt;ProtectedRoute&gt;
            &lt;AppLayout /&gt;
          &lt;/ProtectedRoute&gt;
        }</span>
      <span class="tag">&gt;</span>
        <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/dashboard"</span>  <span class="atr">element</span>=<span class="jsx">{&lt;DashboardPage /&gt;}</span>  <span class="tag">/&gt;</span>
        <span class="tag">&lt;Route</span> <span class="atr">path</span>=<span class="str">"/tasks/:id"</span> <span class="atr">element</span>=<span class="jsx">{&lt;TaskDetailPage /&gt;}</span> <span class="tag">/&gt;</span>
      <span class="tag">&lt;/Route&gt;</span>
    <span class="tag">&lt;/Routes&gt;</span>
  );
}`} />

        <TipBlock>
          <p><strong>Pola ini sangat umum di dunia kerja.</strong> Hampir semua aplikasi production menggunakan layout route untuk Navbar dan Sidebar. Kuasai pola ini dengan baik sebelum interview.</p>
        </TipBlock>

        <MistakeBlock>
          <li>Lupa menambahkan <code>&lt;Outlet /&gt;</code> di komponen layout - child route tidak akan pernah ditampilkan</li>
          <li>Copy-paste Navbar ke setiap halaman secara manual alih-alih menggunakan layout route</li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
