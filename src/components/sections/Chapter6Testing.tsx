import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import TipBlock from "../ui/TipBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter6Testing() {
  return (
    <>
      <ChapterHeader
        id="ch-testing"
        num="Chapter 06"
        title="React Testing Library + Vitest"
        subtitle="Testing komponen React yang berfokus pada perilaku, bukan implementasi"
        badgeVariant={6}
      />

      {/* 6.1 Setup */}
      <TopicSection
        id="test-setup"
        num="6.1"
        title="Setup RTL, Vitest, dan jsdom"
        subtitle="Konfigurasi environment testing untuk React"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              React Testing Library (RTL) adalah library testing yang mendorong
              kamu test komponen seperti yang user lakukan (mencari teks, klik
              tombol), bukan implementasi internal. Vitest adalah test runner
              modern yang cepat, cocok dipakai bersama Vite.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Testing adalah skill yang membedakan developer junior yang baik.
              Di interview sering ditanyakan. Di pekerjaan, kemampuan menulis
              test yang baik membuat kamu dipercaya untuk mengerjakan fitur yang
              lebih besar.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Test form dan validasi (TaskForm)</li>
              <li>Test komponen yang punya state</li>
              <li>Test integrasi beberapa komponen</li>
              <li>Test tampilan berdasarkan kondisi</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel label="Filosofi Utama RTL">
          <p>
            "Test what the user sees, not how it works internally." Artinya:
            jangan test nama state variable atau nama fungsi internal. Test
            apakah teks yang benar muncul di layar, apakah tombol bisa diklik,
            apakah form menampilkan error yang benar.
          </p>
        </MentalModel>

        <CodeBlock
          lang="bash"
          file="terminal - instalasi vitest rtl user-event dan jest-dom"
          id="test-setup-install"
          html={`npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`}
        />

        <CodeBlock
          lang="ts"
          file="vite.config.ts - konfigurasi Vite dengan environment testing"
          id="test-setup-vite"
          html={`<span class="kw">import</span> { defineConfig } <span class="kw">from</span> <span class="str">'vite'</span>;
<span class="kw">import</span> react <span class="kw">from</span> <span class="str">'@vitejs/plugin-react'</span>;

<span class="kw">export default</span> <span class="fn">defineConfig</span>({
  plugins: [<span class="fn">react</span>()],
  test: {
    environment: <span class="str">'jsdom'</span>,      <span class="cmt">// Catatan: simulasi browser DOM</span>
    globals: <span class="kw">true</span>,             <span class="cmt">// Catatan: tidak perlu import describe, it, expect</span>
    setupFiles: <span class="str">'./src/setupTests.ts'</span>,
  },
});`}
        />

        <TipBlock>
          <p>
            <strong>Wajib untuk TypeScript:</strong> Tambahkan{" "}
            <code>"types": ["vitest/globals"]</code> ke dalam{" "}
            <code>compilerOptions</code> di <code>tsconfig.app.json</code> agar
            TypeScript mengenali <code>describe</code>, <code>it</code>,{" "}
            <code>expect</code>, dan <code>vi</code> tanpa perlu import manual
            di setiap file test.
          </p>
        </TipBlock>

        <CodeBlock
          lang="ts"
          file="src/setupTests.ts - setup jest-dom matchers"
          id="test-setup-setup"
          html={`<span class="kw">import</span> <span class="str">'@testing-library/jest-dom'</span>;
<span class="cmt">// Catatan: Ini menambahkan matcher seperti .toBeInTheDocument(), .toBeVisible(), dll.</span>`}
        />
      </TopicSection>

      {/* 6.2 Render & Query */}
      <TopicSection
        id="test-render"
        num="6.2"
        title="Render dan Mencari Elemen"
        subtitle="Cara merender komponen dan menemukan elemen di DOM virtual"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>render()</code> merender komponen ke DOM virtual. Query
              functions seperti <code>getByRole</code>, <code>getByText</code>,{" "}
              <code>getByLabelText</code> digunakan untuk mencari elemen di DOM
              tersebut.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Urutan prioritas query adalah kunci menulis test yang baik.
              Menggunakan query yang tepat membuat test lebih resilient dan
              lebih mencerminkan pengalaman user sesungguhnya.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>
                Setiap test komponen dimulai dengan <code>render()</code>
              </li>
              <li>
                Gunakan <code>getByRole</code> sebagai prioritas pertama
              </li>
              <li>
                Gunakan <code>getByText</code> untuk konten teks
              </li>
              <li>
                Hindari <code>getByTestId</code> kecuali tidak ada pilihan lain
              </li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/__tests__/TaskCard.test.tsx - final unit test render dan kondisi komponen TaskCard"
          id="test-render-taskcard"
          html={`<span class="kw">import</span> { render, screen } <span class="kw">from</span> <span class="str">'@testing-library/react'</span>;
<span class="kw">import type</span> { ReactElement } <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> { BrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> TaskCard <span class="kw">from</span> <span class="str">'../components/TaskCard'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="cmt">// Catatan: TaskCard menggunakan &lt;Link&gt; dari react-router-dom sehingga butuh BrowserRouter</span>
<span class="kw">const</span> renderTaskCard = (props: <span class="tp">Partial</span>&lt;<span class="tp">Parameters</span>&lt;<span class="kw">typeof</span> TaskCard&gt;[<span class="num">0</span>]&gt; = {}): <span class="tp">ReactElement</span> =&gt; {
  <span class="kw">const</span> defaultTask: <span class="tp">Task</span> = {
    id: <span class="num">1</span>,
    title: <span class="str">'Buat fitur login'</span>,
    priority: <span class="str">'high'</span>,
    status: <span class="str">'in-progress'</span>,
  };
  <span class="kw">return</span> <span class="fn">render</span>(
    <span class="tag">&lt;BrowserRouter&gt;</span>
      <span class="tag">&lt;TaskCard</span> <span class="atr">task</span>=<span class="jsx">{defaultTask}</span> <span class="jsx">{...props}</span> <span class="tag">/&gt;</span>
    <span class="tag">&lt;/BrowserRouter&gt;</span>
  );
};

<span class="fn">describe</span>(<span class="str">'TaskCard'</span>, () => {
  <span class="fn">it</span>(<span class="str">'menampilkan judul task dengan benar'</span>, () => {
    <span class="fn">renderTaskCard</span>();
    <span class="kw">expect</span>(screen.<span class="fn">getByText</span>(<span class="str">'Buat fitur login'</span>)).<span class="fn">toBeInTheDocument</span>();
  });

  <span class="fn">it</span>(<span class="str">'menampilkan badge prioritas tinggi'</span>, () => {
    <span class="fn">renderTaskCard</span>();
    <span class="kw">const</span> badge = screen.<span class="fn">getByRole</span>(<span class="str">'status'</span>);
    <span class="kw">expect</span>(badge).<span class="fn">toHaveTextContent</span>(<span class="str">'Tinggi'</span>);
  });

  <span class="fn">it</span>(<span class="str">'tidak menampilkan tombol edit ketika isOwner = false'</span>, () => {
    <span class="fn">renderTaskCard</span>({ isOwner: <span class="kw">false</span> });
    <span class="kw">expect</span>(screen.<span class="fn">queryByRole</span>(<span class="str">'button'</span>, { name: /edit/i })).<span class="fn">not</span>.<span class="fn">toBeInTheDocument</span>();
  });
});`}
        />

        <CodeBlock
          lang="jsx"
          file="referensi - urutan prioritas query selector RTL"
          id="test-render-priority"
          html={`<span class="cmt">// Catatan: Prioritas tinggi ke rendah (gunakan dari atas ke bawah):</span>

screen.<span class="fn">getByRole</span>(<span class="str">'button'</span>, { name: /submit/i })   <span class="cmt">// Catatan: TERBAIK - berbasis aksesibilitas</span>
screen.<span class="fn">getByLabelText</span>(<span class="str">'Email'</span>)                     <span class="cmt">// Catatan: untuk input dengan label</span>
screen.<span class="fn">getByPlaceholderText</span>(<span class="str">'Masukkan email'</span>)       <span class="cmt">// Catatan: kurang ideal tapi OK</span>
screen.<span class="fn">getByText</span>(<span class="str">'Selamat Datang'</span>)                  <span class="cmt">// Catatan: untuk konten teks biasa</span>
screen.<span class="fn">getByDisplayValue</span>(<span class="str">'nilai input'</span>)             <span class="cmt">// Catatan: untuk input yang sudah terisi</span>
screen.<span class="fn">getByAltText</span>(<span class="str">'logo'</span>)                        <span class="cmt">// Catatan: untuk gambar</span>
screen.<span class="fn">getByTestId</span>(<span class="str">'my-element'</span>)                   <span class="cmt">// Catatan: TERBURUK - hanya jika tidak ada pilihan</span>

<span class="cmt">// Catatan: Perbedaan getBy vs queryBy vs findBy:</span>
<span class="cmt">// Catatan: getBy    - throw error jika tidak ditemukan (untuk elemen yang HARUS ada)</span>
<span class="cmt">// Catatan: queryBy  - return null jika tidak ditemukan (untuk test "tidak ada")</span>
<span class="cmt">// Catatan: findBy   - async, return promise (untuk elemen yang muncul setelah loading)</span>`}
        />
      </TopicSection>

      {/* 6.3 User Events */}
      <TopicSection
        id="test-events"
        num="6.3"
        title="User Events dan Async Testing"
        subtitle="Mensimulasikan interaksi user dan menunggu operasi async"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>userEvent</code> dari{" "}
              <code>@testing-library/user-event</code> mensimulasikan interaksi
              user yang lebih realistis dibanding <code>fireEvent</code>.{" "}
              <code>waitFor</code> dan <code>findBy*</code> digunakan untuk
              menunggu perubahan DOM yang async.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Form, tombol, dan elemen interaktif lainnya adalah bagian yang
              paling sering perlu ditest. <code>userEvent</code> lebih realistis
              karena mensimulasikan events yang sebenarnya terjadi saat user
              berinteraksi.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Test submit form dan validasi error</li>
              <li>Test klik tombol yang mengubah UI</li>
              <li>Test input teks dan perubahan state</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/__tests__/TaskForm.test.tsx - final test form validasi dan submit dengan semua provider"
          id="test-events-form"
          html={`<span class="kw">import</span> { render, screen, waitFor } <span class="kw">from</span> <span class="str">'@testing-library/react'</span>;
<span class="kw">import type</span> { ReactElement } <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> userEvent <span class="kw">from</span> <span class="str">'@testing-library/user-event'</span>;
<span class="kw">import</span> { QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { BrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> TaskForm <span class="kw">from</span> <span class="str">'../components/TaskForm'</span>;
<span class="kw">import</span> * <span class="kw">as</span> taskApi <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

vi.<span class="fn">mock</span>(<span class="str">'../api/taskApi'</span>);
<span class="cmt">// Catatan: Semua import dari taskApi sekarang menjadi mock function (bukan request jaringan asli)</span>

<span class="kw">const</span> renderWithProviders = (ui: <span class="tp">ReactElement</span>) =&gt; {
  <span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
    <span class="cmt">// Catatan: Retry dimatikan agar test error tidak menunggu retry bawaan</span>
    defaultOptions: { queries: { retry: <span class="kw">false</span> } },
  });
  <span class="kw">return</span> <span class="fn">render</span>(
    <span class="tag">&lt;QueryClientProvider</span> <span class="atr">client</span>=<span class="jsx">{queryClient}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;BrowserRouter&gt;</span>{ui}<span class="tag">&lt;/BrowserRouter&gt;</span>
    <span class="tag">&lt;/QueryClientProvider&gt;</span>
  );
};

<span class="fn">describe</span>(<span class="str">'TaskForm'</span>, () => {
  <span class="fn">beforeEach</span>(() => {
    vi.<span class="fn">clearAllMocks</span>();
  });

  <span class="fn">it</span>(<span class="str">'menampilkan error validasi ketika judul kurang dari 3 karakter'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>();
    <span class="fn">renderWithProviders</span>(<span class="tag">&lt;TaskForm</span> <span class="atr">onClose</span>=<span class="jsx">{vi.fn()}</span> <span class="tag">/&gt;</span>);

    <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByPlaceholderText</span>(<span class="str">'Judul task'</span>), <span class="str">'ab'</span>);
    <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">'button'</span>, { name: /buat task/i }));

    <span class="kw">await</span> <span class="fn">waitFor</span>(() => {
      <span class="kw">expect</span>(screen.<span class="fn">getByText</span>(<span class="str">'Judul minimal 3 karakter'</span>)).<span class="fn">toBeInTheDocument</span>();
    });
  });

  <span class="fn">it</span>(<span class="str">'memanggil onClose setelah form berhasil disubmit'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>();
    <span class="kw">const</span> mockOnClose = vi.<span class="fn">fn</span>();
    vi.<span class="fn">mocked</span>(taskApi.createTask).<span class="fn">mockResolvedValue</span>({
      id: <span class="num">99</span>,
      title: <span class="str">'Task baru saya'</span>,
      priority: <span class="str">'medium'</span>,
      status: <span class="str">'todo'</span>,
    });

    <span class="fn">renderWithProviders</span>(<span class="tag">&lt;TaskForm</span> <span class="atr">onClose</span>=<span class="jsx">{mockOnClose}</span> <span class="tag">/&gt;</span>);

    <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByPlaceholderText</span>(<span class="str">'Judul task'</span>), <span class="str">'Task baru saya'</span>);
    <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">'button'</span>, { name: /buat task/i }));

    <span class="kw">await</span> <span class="fn">waitFor</span>(() => {
      <span class="kw">expect</span>(mockOnClose).<span class="fn">toHaveBeenCalledOnce</span>();
    });
  });
});`}
        />

        <MistakeBlock>
          <li>
            Menggunakan <code>fireEvent.click()</code> alih-alih{" "}
            <code>userEvent.click()</code> - fireEvent lebih rendah level dan
            tidak mensimulasikan urutan event yang sebenarnya (mousedown,
            mouseup, click)
          </li>
          <li>
            Lupa <code>await</code> sebelum <code>userEvent.type()</code> dan{" "}
            <code>userEvent.click()</code> - user-event v14 semuanya async
          </li>
          <li>
            Menggunakan <code>getBy</code> untuk elemen yang muncul secara async
            - gunakan <code>findBy</code> yang mengembalikan promise dan
            menunggu elemen muncul
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 6.4 Mocking API */}
      <TopicSection
        id="test-mock"
        num="6.4"
        title="Mocking API dengan vi.mock"
        subtitle="Isolasi komponen dari API call nyata saat testing"
        isLast
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Mocking adalah teknik menggantikan dependency nyata (seperti API
              call) dengan versi palsu yang bisa kita kontrol hasilnya. Ini
              memastikan test tidak bergantung pada network atau server
              eksternal.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Test yang memanggil API nyata itu lambat, tidak reliable, dan bisa
              gagal karena masalah network. Mock membuat test cepat, terisolasi,
              dan deterministik - hasilnya selalu sama setiap kali dijalankan.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Test komponen yang menggunakan TanStack Query</li>
              <li>Test komponen yang langsung memanggil API</li>
              <li>Simulasi kondisi error dari API</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/__tests__/DashboardPage.test.tsx - final test integrasi dengan semua provider"
          id="test-mock-code"
          html={`<span class="kw">import</span> { render, screen } <span class="kw">from</span> <span class="str">'@testing-library/react'</span>;
<span class="kw">import</span> { QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { Provider } <span class="kw">from</span> <span class="str">'react-redux'</span>;
<span class="kw">import</span> { BrowserRouter } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { configureStore } <span class="kw">from</span> <span class="str">'@reduxjs/toolkit'</span>;
<span class="kw">import</span> DashboardPage <span class="kw">from</span> <span class="str">'../pages/DashboardPage'</span>;
<span class="kw">import</span> * <span class="kw">as</span> taskApi <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;
<span class="kw">import</span> uiReducer <span class="kw">from</span> <span class="str">'../features/ui/uiSlice'</span>;
<span class="kw">import type</span> { Task } <span class="kw">from</span> <span class="str">'../types'</span>;

vi.<span class="fn">mock</span>(<span class="str">'../api/taskApi'</span>);

<span class="kw">const</span> createTestStore = () =&gt;
  <span class="cmt">// Catatan: Store test dibuat fresh per render agar state antar test tidak bocor</span>
  <span class="fn">configureStore</span>({ reducer: { ui: uiReducer } });

<span class="kw">import type</span> { ReactElement } <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">const</span> renderWithAllProviders = (ui: <span class="tp">ReactElement</span>) =&gt; {
  <span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
    defaultOptions: { queries: { retry: <span class="kw">false</span> } },
  });
  <span class="kw">return</span> <span class="fn">render</span>(
    <span class="cmt">// Catatan: Urutan provider mengikuti dependency komponen nyata di aplikasi</span>
    <span class="tag">&lt;Provider</span> <span class="atr">store</span>=<span class="jsx">{createTestStore()}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;QueryClientProvider</span> <span class="atr">client</span>=<span class="jsx">{queryClient}</span><span class="tag">&gt;</span>
        <span class="tag">&lt;BrowserRouter&gt;</span>{ui}<span class="tag">&lt;/BrowserRouter&gt;</span>
      <span class="tag">&lt;/QueryClientProvider&gt;</span>
    <span class="tag">&lt;/Provider&gt;</span>
  );
};

<span class="fn">describe</span>(<span class="str">'DashboardPage'</span>, () => {
  <span class="fn">beforeEach</span>(() => {
    vi.<span class="fn">clearAllMocks</span>();
  });

  <span class="fn">it</span>(<span class="str">'menampilkan daftar task setelah data berhasil di-fetch'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> mockTasks: <span class="tp">Task</span>[] = [
      { id: <span class="num">1</span>, title: <span class="str">'Task Pertama'</span>, status: <span class="str">'todo'</span>, priority: <span class="str">'low'</span> },
      { id: <span class="num">2</span>, title: <span class="str">'Task Kedua'</span>, status: <span class="str">'done'</span>, priority: <span class="str">'high'</span> },
    ];
    vi.<span class="fn">mocked</span>(taskApi.fetchTasks).<span class="fn">mockResolvedValue</span>(mockTasks);

    <span class="fn">renderWithAllProviders</span>(<span class="tag">&lt;DashboardPage /&gt;</span>);

    <span class="kw">expect</span>(<span class="kw">await</span> screen.<span class="fn">findByText</span>(<span class="str">'Task Pertama'</span>)).<span class="fn">toBeInTheDocument</span>();
    <span class="kw">expect</span>(<span class="kw">await</span> screen.<span class="fn">findByText</span>(<span class="str">'Task Kedua'</span>)).<span class="fn">toBeInTheDocument</span>();
  });

  <span class="fn">it</span>(<span class="str">'menampilkan pesan error ketika API gagal'</span>, <span class="kw">async</span> () => {
    vi.<span class="fn">mocked</span>(taskApi.fetchTasks).<span class="fn">mockRejectedValue</span>(<span class="kw">new</span> <span class="fn">Error</span>(<span class="str">'Network Error'</span>));

    <span class="fn">renderWithAllProviders</span>(<span class="tag">&lt;DashboardPage /&gt;</span>);

    <span class="kw">expect</span>(<span class="kw">await</span> screen.<span class="fn">findByText</span>(/error/i)).<span class="fn">toBeInTheDocument</span>();
  });
});`}
        />

        <CodeBlock
          lang="jsx"
          file="src/__tests__/contoh.test.jsx - pola beforeEach dan afterEach untuk isolasi test"
          id="test-mock-beforeeach"
          html={`<span class="kw">import</span> * <span class="kw">as</span> taskApi <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

vi.<span class="fn">mock</span>(<span class="str">'../api/taskApi'</span>);

<span class="fn">describe</span>(<span class="str">'NamaKomponen'</span>, () => {
  <span class="cmt">// Catatan: beforeEach: dijalankan SEBELUM setiap test dalam describe ini</span>
  <span class="fn">beforeEach</span>(() => {
    <span class="cmt">// Catatan: Reset semua mock ke kondisi awal - mencegah sisa mock dari test sebelumnya</span>
    vi.<span class="fn">clearAllMocks</span>();
  });

  <span class="cmt">// Catatan: afterEach: dijalankan SETELAH setiap test</span>
  <span class="fn">afterEach</span>(() => {
    <span class="cmt">// Catatan: Bersihkan efek samping jika ada (localStorage, timer palsu, dll)</span>
    localStorage.<span class="fn">clear</span>();
  });

  <span class="fn">it</span>(<span class="str">'test pertama'</span>, <span class="kw">async</span> () => {
    taskApi.fetchTasks.<span class="fn">mockResolvedValue</span>([{ id: <span class="num">1</span>, title: <span class="str">'Task A'</span> }]);
    <span class="cmt">// Catatan: ... test code</span>
  });

  <span class="fn">it</span>(<span class="str">'test kedua tidak terpengaruh mock dari test pertama'</span>, <span class="kw">async</span> () => {
    <span class="cmt">// Catatan: Mock di sini fresh karena clearAllMocks() dipanggil beforeEach</span>
    taskApi.fetchTasks.<span class="fn">mockResolvedValue</span>([]);
    <span class="cmt">// Catatan: ... test code</span>
  });
});

<span class="cmt">// Catatan: beforeAll  = sekali sebelum semua test di describe (untuk setup mahal)</span>
<span class="cmt">// Catatan: afterAll   = sekali setelah semua test di describe (untuk teardown)</span>
<span class="cmt">// Catatan: beforeEach = sebelum setiap test (paling sering dipakai)</span>
<span class="cmt">// Catatan: afterEach  = setelah setiap test</span>`}
        />

        <TipBlock>
          <p>
            <strong>Buat helper renderWithProviders:</strong> Di proyek nyata,
            buat satu fungsi helper yang membungkus semua Provider
            (QueryClientProvider, Provider Redux, BrowserRouter) agar tidak
            mengulang kode di setiap file test. Tempatkan di{" "}
            <code>src/__tests__/utils.tsx</code>.
          </p>
        </TipBlock>

        <MistakeBlock>
          <li>
            Tidak membungkus komponen dengan Provider yang diperlukan
            (QueryClientProvider, Redux Provider) saat rendering di test - ini
            akan menyebabkan error karena hooks tidak bisa menemukan context
          </li>
          <li>
            Menggunakan <code>getByText</code> untuk konten yang muncul secara
            async (setelah loading) - gunakan <code>await findByText()</code>{" "}
            untuk menunggu konten muncul
          </li>
          <li>
            Tidak mereset mock antar test dengan <code>vi.clearAllMocks()</code>{" "}
            di <code>afterEach</code> - sisa mock dari test sebelumnya bisa
            mempengaruhi test berikutnya
          </li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
