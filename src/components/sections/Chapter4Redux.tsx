import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import TipBlock from "../ui/TipBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter4Redux() {
  return (
    <>
      <ChapterHeader
        id="ch-redux"
        num="Chapter 04"
        title="Redux Toolkit (RTK)"
        subtitle="State management global untuk aplikasi skala besar"
        badgeVariant={4}
      />

      {/* 4.1 Setup */}
      <TopicSection
        id="rtk-setup"
        num="4.1"
        title="Setup Store dan Provider"
        subtitle="Konfigurasi Redux Toolkit dari nol"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Redux Toolkit (RTK) adalah cara modern dan resmi untuk menggunakan
              Redux. Redux adalah library state management global berbasis
              "single source of truth": semua state aplikasi disimpan di satu
              tempat bernama "Store".
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Redux masih digunakan di banyak perusahaan dan sering ditanyakan
              di interview. RTK menghilangkan boilerplate Redux lama yang sangat
              verbose, sehingga lebih praktis dan modern.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>State UI global: sidebar open/close, notifikasi toast</li>
              <li>Aplikasi besar dengan banyak fitur yang berbagi state</li>
              <li>Tim besar yang butuh standar dan predictability</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel label="Mental Model Redux">
          <p>
            <strong>Store</strong> = satu objek besar yang menyimpan semua
            state. <strong>Slice</strong> = satu bagian/fitur dari store
            (contoh: uiSlice, authSlice). <strong>Action</strong> = pesan
            "terjadi sesuatu" yang dikirim ke store. <strong>Reducer</strong> =
            fungsi yang memutuskan bagaimana state berubah berdasarkan action.
          </p>
        </MentalModel>

        <CodeBlock
          lang="bash"
          file="terminal - instalasi redux toolkit dan react-redux"
          id="rtk-setup-install"
          html={`npm install @reduxjs/toolkit react-redux`}
        />

        <CodeBlock
          lang="ts"
          file="src/store/store.ts - konfigurasi Redux store dan export tipe yang diperlukan"
          id="rtk-setup-store"
          html={`<span class="kw">import</span> { configureStore } <span class="kw">from</span> <span class="str">'@reduxjs/toolkit'</span>;
<span class="kw">import</span> uiReducer <span class="kw">from</span> <span class="str">'../features/ui/uiSlice'</span>;

<span class="kw">export const</span> store = <span class="fn">configureStore</span>({
  reducer: {
    ui: uiReducer,
  },
});

<span class="kw">export type</span> <span class="tp">RootState</span> = <span class="tp">ReturnType</span>&lt;<span class="kw">typeof</span> store.getState&gt;;
<span class="kw">export type</span> <span class="tp">AppDispatch</span> = <span class="kw">typeof</span> store.dispatch;`}
        />

        <TipBlock>
          <p>
            <strong>Typed hooks adalah keharusan di TypeScript + Redux.</strong>{" "}
            Jangan gunakan <code>useSelector</code> dan <code>useDispatch</code>{" "}
            langsung dari react-redux di komponen. Buat custom typed wrapper
            sekali, gunakan selamanya di seluruh aplikasi.
          </p>
        </TipBlock>

        <CodeBlock
          lang="ts"
          file="src/store/hooks.ts - typed hooks pengganti useSelector dan useDispatch bawaan"
          id="rtk-setup-hooks"
          html={`<span class="kw">import</span> { TypedUseSelectorHook, useDispatch, useSelector } <span class="kw">from</span> <span class="str">'react-redux'</span>;
<span class="kw">import type</span> { RootState, AppDispatch } <span class="kw">from</span> <span class="str">'./store'</span>;

<span class="cmt">// Catatan: Gunakan dua hook ini di SEMUA komponen, bukan yang langsung dari react-redux</span>
<span class="kw">export const</span> useAppDispatch = () =&gt; <span class="fn">useDispatch</span>&lt;<span class="tp">AppDispatch</span>&gt;();
<span class="kw">export const</span> useAppSelector: <span class="tp">TypedUseSelectorHook</span>&lt;<span class="tp">RootState</span>&gt; = useSelector;`}
        />

        <CodeBlock
          lang="tsx"
          file="src/main.tsx - versi final dengan semua Provider"
          id="rtk-setup-mainjsx-final"
          html={`<span class="kw">import</span> React <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> ReactDOM <span class="kw">from</span> <span class="str">'react-dom/client'</span>;
<span class="kw">import</span> { Provider } <span class="kw">from</span> <span class="str">'react-redux'</span>;
<span class="kw">import</span> { QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { store } <span class="kw">from</span> <span class="str">'./store/store'</span>;
<span class="kw">import</span> App <span class="kw">from</span> <span class="str">'./App'</span>;

<span class="cmt">// Catatan: auth state akan dibahas terpisah di Chapter 5 (Zustand)</span>

<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: {
      staleTime: <span class="num">1000</span> * <span class="num">60</span> * <span class="num">5</span>,
      retry: <span class="num">1</span>,
    },
  },
});

ReactDOM.<span class="fn">createRoot</span>(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>) <span class="kw">as</span> <span class="tp">HTMLElement</span>).<span class="fn">render</span>(
  <span class="tag">&lt;React.StrictMode&gt;</span>
    <span class="tag">&lt;Provider</span> <span class="atr">store</span>=<span class="jsx">{store}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;QueryClientProvider</span> <span class="atr">client</span>=<span class="jsx">{queryClient}</span><span class="tag">&gt;</span>
        <span class="tag">&lt;App /&gt;</span>
      <span class="tag">&lt;/QueryClientProvider&gt;</span>
    <span class="tag">&lt;/Provider&gt;</span>
  <span class="tag">&lt;/React.StrictMode&gt;</span>
);

<span class="cmt">// Catatan: Urutan Provider dari luar ke dalam tidak terlalu penting di sini</span>
<span class="cmt">// Catatan: karena ketiganya independen. Namun QueryClientProvider harus</span>
<span class="cmt">// Catatan: membungkus semua komponen yang menggunakan useQuery/useMutation.</span>`}
        />
      </TopicSection>

      {/* 4.2 createSlice */}
      <TopicSection
        id="rtk-slice"
        num="4.2"
        title="createSlice - Mendefinisikan State dan Reducer"
        subtitle="Cara modern mendefinisikan potongan state dan logika perubahannya"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>createSlice</code> adalah fungsi RTK yang menggabungkan
              state awal, reducer functions, dan action creators dalam satu
              objek. Ini menghilangkan boilerplate Redux lama yang membutuhkan
              file terpisah untuk actions dan reducers.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Ini adalah cara utama mendefinisikan state di RTK. Semua logika
              perubahan state untuk satu fitur diletakkan di satu tempat
              (slice), membuat kode mudah dibaca dan dirawat.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Mendefinisikan state global untuk satu fitur</li>
              <li>Sidebar open/close, modal open/close</li>
              <li>Notifikasi toast global</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="ts"
          file="src/features/ui/uiSlice.ts - UI state global untuk TaskFlow"
          id="rtk-slice-code"
          html={`<span class="kw">import</span> { createSlice, PayloadAction } <span class="kw">from</span> <span class="str">'@reduxjs/toolkit'</span>;

<span class="kw">interface</span> <span class="tp">ToastPayload</span> {
  message: <span class="tp">string</span>;
  type: <span class="str">'success'</span> | <span class="str">'error'</span> | <span class="str">'info'</span>;
}

<span class="kw">interface</span> <span class="tp">UiState</span> {
  isSidebarOpen: <span class="tp">boolean</span>;
  isCreateTaskModalOpen: <span class="tp">boolean</span>;
  toast: <span class="tp">ToastPayload</span> | <span class="kw">null</span>;
}

<span class="kw">const</span> initialState: <span class="tp">UiState</span> = {
  isSidebarOpen: <span class="kw">true</span>,
  isCreateTaskModalOpen: <span class="kw">false</span>,
  toast: <span class="kw">null</span>,
};

<span class="kw">const</span> uiSlice = <span class="fn">createSlice</span>({
  name: <span class="str">'ui'</span>,
  initialState,
  reducers: {
    <span class="fn">toggleSidebar</span>(state) {
      <span class="cmt">// Catatan: Immer membuat "mutasi" ini aman dan tetap immutable di hasil akhir</span>
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    <span class="fn">openCreateTaskModal</span>(state) {
      state.isCreateTaskModalOpen = <span class="kw">true</span>;
    },
    <span class="fn">closeCreateTaskModal</span>(state) {
      state.isCreateTaskModalOpen = <span class="kw">false</span>;
    },
    <span class="fn">showToast</span>(state, action: <span class="tp">PayloadAction</span>&lt;<span class="tp">ToastPayload</span>&gt;) {
      <span class="cmt">// Catatan: Payload berisi message + type agar komponen toast tidak perlu logika tambahan</span>
      state.toast = action.payload;
    },
    <span class="fn">hideToast</span>(state) {
      state.toast = <span class="kw">null</span>;
    },
  },
});

<span class="cmt">// Catatan: Export action creators</span>
<span class="kw">export const</span> {
  toggleSidebar,
  openCreateTaskModal,
  closeCreateTaskModal,
  showToast,
  hideToast,
} = uiSlice.actions;

<span class="cmt">// Catatan: Export reducer untuk dimasukkan ke store</span>
<span class="kw">export default</span> uiSlice.reducer;`}
        />

        <TipBlock>
          <p>
            <strong>Immer di balik layar:</strong> RTK menggunakan library
            Immer, sehingga di dalam reducer kamu boleh "memutasi" state secara
            langsung seperti <code>state.isSidebarOpen = true</code>. Ini tidak
            benar-benar memutasi state asli, Immer yang membuatnya immutable di
            balik layar.
          </p>
        </TipBlock>
      </TopicSection>

      {/* 4.3 Async Thunk */}
      <TopicSection
        id="rtk-thunk"
        num="4.3"
        title="createAsyncThunk (Legacy Pattern)"
        subtitle="Referensi untuk membaca codebase lama yang masih fetch data via Redux"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              <code>createAsyncThunk</code> adalah cara Redux menangani operasi
              asynchronous seperti API call. Dia secara otomatis men-dispatch
              tiga action: <code>pending</code>, <code>fulfilled</code>, dan{" "}
              <code>rejected</code>.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Sering muncul di interview dan di codebase lama yang menggunakan
              Redux untuk server state. Penting untuk dipahami meskipun di
              project baru kamu akan lebih sering menggunakan TanStack Query
              untuk ini.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>
                Ketika proyek sudah pakai Redux tapi belum ada TanStack Query
              </li>
              <li>
                Proses async yang bukan data fetching murni (contoh: login yang
                menyimpan token ke state)
              </li>
            </ul>
          </Card>
        </CardGrid>

        <TipBlock>
          <p>
            <strong>Gunakan sebagai reference skill:</strong> di proyek modern,
            data fetching baru sebaiknya menggunakan TanStack Query. Pelajari
            <code>createAsyncThunk</code> untuk kebutuhan interview dan
            maintenance codebase lama, bukan sebagai default untuk proyek baru.
          </p>
        </TipBlock>

        <TipBlock>
          <p>
            <strong>Konsistensi API untuk materi ini:</strong> contoh login di
            section ini tetap memakai mock backend lokal yang sama dari Chapter
            2, yaitu endpoint <code>/auth/login</code> pada
            <code>http://localhost:3001</code>. Gunakan akun demo
            <code>rafi@taskflow.dev</code> dan <code>password123</code>.
          </p>
        </TipBlock>

        <CodeBlock
          lang="jsx"
          file="src/features/auth/authSlice.js - createAsyncThunk untuk login (referensi pola legacy, endpoint tetap pakai mock API TaskFlow)"
          id="rtk-thunk-code"
          html={`<span class="kw">import</span> { createAsyncThunk, createSlice } <span class="kw">from</span> <span class="str">'@reduxjs/toolkit'</span>;
<span class="kw">import</span> api <span class="kw">from</span> <span class="str">'../../api/axiosInstance'</span>;

<span class="cmt">// Catatan: createAsyncThunk(actionName, asyncFunction)</span>
<span class="kw">export const</span> loginUser = <span class="fn">createAsyncThunk</span>(
  <span class="str">'auth/loginUser'</span>,
  <span class="kw">async</span> (credentials, thunkAPI) => {
    <span class="kw">try</span> {
      <span class="kw">const</span> response = <span class="kw">await</span> api.<span class="fn">post</span>(<span class="str">'/auth/login'</span>, credentials);
      <span class="kw">return</span> response.data; <span class="cmt">// Catatan: menjadi action.payload di fulfilled</span>
    } <span class="kw">catch</span> (error) {
      <span class="kw">return</span> thunkAPI.<span class="fn">rejectWithValue</span>(error.response?.data?.message);
    }
  }
);

<span class="kw">const</span> authSlice = <span class="fn">createSlice</span>({
  name: <span class="str">'auth'</span>,
  initialState: { user: <span class="kw">null</span>, status: <span class="str">'idle'</span>, error: <span class="kw">null</span> },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .<span class="fn">addCase</span>(loginUser.pending, (state) => {
        state.status = <span class="str">'loading'</span>;
      })
      .<span class="fn">addCase</span>(loginUser.fulfilled, (state, action) => {
        state.status = <span class="str">'succeeded'</span>;
        state.user = action.payload.user;
      })
      .<span class="fn">addCase</span>(loginUser.rejected, (state, action) => {
        state.status = <span class="str">'failed'</span>;
        state.error = action.payload;
      });
  },
});`}
        />
      </TopicSection>

      {/* 4.4 useSelector & useDispatch */}
      <TopicSection
        id="rtk-selector"
        num="4.4"
        title="useAppSelector & useAppDispatch di Komponen"
        subtitle="Cara membaca state dan mengirim aksi dari komponen React dengan typed hooks"
        isLast
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Di Chapter ini, komponen memakai <code>useAppSelector</code> dan
              <code>useAppDispatch</code>. Di balik itu, wrapper tersebut tetap
              mengandalkan <code>useSelector</code> dan <code>useDispatch</code>
              dari react-redux untuk membaca dan mengirim action ke store.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Ini adalah dua hook utama yang dipakai di setiap komponen yang
              berinteraksi dengan Redux. Tanpa ini, kamu tidak bisa membaca atau
              mengubah state Redux dari komponen manapun.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Setiap komponen yang butuh data dari Redux store</li>
              <li>Setiap komponen yang perlu mengubah state Redux</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock
          lang="tsx"
          file="src/components/layout/Sidebar.tsx - membaca dan mengubah UI state Redux"
          id="rtk-selector-sidebar"
          html={`<span class="kw">import</span> { useAppDispatch, useAppSelector } <span class="kw">from</span> <span class="str">'../../store/hooks'</span>;
<span class="kw">import</span> { toggleSidebar } <span class="kw">from</span> <span class="str">'../../features/ui/uiSlice'</span>;

<span class="kw">export default function</span> <span class="fn">Sidebar</span>() {
        <span class="kw">const</span> dispatch = <span class="fn">useAppDispatch</span>();

  <span class="cmt">// Catatan: Selector membaca state global tanpa prop drilling</span>
        <span class="kw">const</span> isSidebarOpen = <span class="fn">useAppSelector</span>((state) => state.ui.isSidebarOpen);

  <span class="kw">return</span> (
    <span class="tag">&lt;aside</span> <span class="atr">style</span>=<span class="jsx">{{ width: isSidebarOpen ? '240px' : '60px' }}</span><span class="tag">&gt;</span>
      <span class="cmt">// Catatan: Dispatch mengirim action; reducer yang menentukan state baru</span>
      <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{() => dispatch(toggleSidebar())}</span><span class="tag">&gt;</span>
        <span class="jsx">{isSidebarOpen ? 'Tutup' : 'Buka'}</span>
      <span class="tag">&lt;/button&gt;</span>
      <span class="cmt">// Catatan: ... isi sidebar ...</span>
    <span class="tag">&lt;/aside&gt;</span>
  );
}`}
        />

        <CodeBlock
          lang="tsx"
          file="src/components/layout/Navbar.tsx - trigger modal buat task"
          id="rtk-selector-navbar"
          html={`<span class="kw">import</span> { useAppDispatch, useAppSelector } <span class="kw">from</span> <span class="str">'../../store/hooks'</span>;
<span class="kw">import</span> { openCreateTaskModal, closeCreateTaskModal } <span class="kw">from</span> <span class="str">'../../features/ui/uiSlice'</span>;
<span class="kw">import</span> TaskForm <span class="kw">from</span> <span class="str">'../TaskForm'</span>;

<span class="kw">export default function</span> <span class="fn">Navbar</span>() {
        <span class="kw">const</span> dispatch = <span class="fn">useAppDispatch</span>();
        <span class="kw">const</span> isModalOpen = <span class="fn">useAppSelector</span>((state) => state.ui.isCreateTaskModalOpen);

  <span class="kw">return</span> (
    <span class="tag">&lt;nav&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{() => dispatch(openCreateTaskModal())}</span><span class="tag">&gt;</span>
        + Buat Task
      <span class="tag">&lt;/button&gt;</span>

      <span class="jsx">{isModalOpen &amp;&amp; (
        &lt;Modal&gt;
          &lt;TaskForm onClose={() => dispatch(closeCreateTaskModal())} /&gt;
        &lt;/Modal&gt;
      )}</span>
    <span class="tag">&lt;/nav&gt;</span>
  );
}`}
        />

        <MistakeBlock>
          <li>
            Selector yang terlalu lebar:{" "}
            <code>useSelector(state =&gt; state.ui)</code> - ini menyebabkan
            komponen re-render setiap kali state UI berubah meskipun bagian yang
            dipakai tidak berubah. Selalu ambil data yang spesifik:{" "}
            <code>state =&gt; state.ui.isSidebarOpen</code>
          </li>
          <li>
            Menggunakan Redux untuk menyimpan data dari API (server state) -
            gunakan TanStack Query untuk itu, Redux untuk UI state
          </li>
          <li>
            Memanggil <code>dispatch</code> secara langsung di render (bukan di
            event handler atau useEffect)
          </li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
