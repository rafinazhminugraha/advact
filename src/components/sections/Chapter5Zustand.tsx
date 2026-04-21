import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import TipBlock from "../ui/TipBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter5Zustand() {
  return (
    <>
      <ChapterHeader
        id="ch-zustand"
        num="Chapter 05"
        title="Zustand"
        subtitle="State management global yang minimalis dan tanpa boilerplate"
        badgeVariant={5}
      />

      {/* 5.1 Setup */}
      <TopicSection
        id="zus-setup"
        num="5.1"
        title="Setup dan Membuat Store"
        subtitle="Cara membuat state global dengan Zustand dalam hitungan menit"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>
              Zustand adalah library state management yang sangat ringan dan
              simpel. Berbeda dari Redux, tidak ada boilerplate, tidak ada
              Provider, tidak ada action type, tidak ada reducer. Cukup{" "}
              <code>create()</code> dan selesai.
            </p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>
              Semakin populer di tahun-tahun terakhir sebagai alternatif Redux
              yang lebih sederhana. Banyak startup dan tim kecil memilih Zustand
              karena kemudahannya. Sangat sering muncul di lowongan pekerjaan
              frontend modern.
            </p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>State auth: user yang sedang login, token</li>
              <li>Proyek kecil-menengah yang butuh state global</li>
              <li>Ketika Redux terasa terlalu berat untuk kebutuhan</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel>
          <p>
            Zustand store adalah sebuah hook biasa. Kamu membuat{" "}
            <code>useAuthStore</code> dan memanggilnya di komponen manapun,
            persis seperti hook React biasa. Tidak perlu Provider dan tidak ada
            setup tambahan.
          </p>
        </MentalModel>

        <CodeBlock
          lang="bash"
          file="terminal - instalasi zustand"
          id="zus-setup-install"
          html={`npm install zustand`}
        />

        <CodeBlock
          lang="ts"
          file="src/stores/useAuthStore.ts - final auth store dengan persist middleware"
          id="zus-setup-store"
          html={`<span class="kw">import</span> { create } <span class="kw">from</span> <span class="str">'zustand'</span>;
<span class="kw">import</span> { persist } <span class="kw">from</span> <span class="str">'zustand/middleware'</span>;
<span class="kw">import type</span> { User } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">interface</span> <span class="tp">AuthState</span> {
  user: <span class="tp">User</span> | <span class="kw">null</span>;
  token: <span class="tp">string</span> | <span class="kw">null</span>;
  isLoggedIn: <span class="tp">boolean</span>;
  login: (user: <span class="tp">User</span>, token: <span class="tp">string</span>) =&gt; <span class="tp">void</span>;
  logout: () =&gt; <span class="tp">void</span>;
  updateUser: (userData: <span class="tp">Partial</span>&lt;<span class="tp">User</span>&gt;) =&gt; <span class="tp">void</span>;
}

<span class="kw">export const</span> useAuthStore = <span class="fn">create</span>&lt;<span class="tp">AuthState</span>&gt;()( 
  <span class="fn">persist</span>(
    (set) => ({
      user: <span class="kw">null</span>,
      token: <span class="kw">null</span>,
      isLoggedIn: <span class="kw">false</span>,

      <span class="fn">login</span>: (user, token) => <span class="fn">set</span>({ user, token, isLoggedIn: <span class="kw">true</span> }),

      <span class="fn">logout</span>: () => <span class="fn">set</span>({ user: <span class="kw">null</span>, token: <span class="kw">null</span>, isLoggedIn: <span class="kw">false</span> }),

      <span class="fn">updateUser</span>: (userData) =>
        <span class="fn">set</span>((state) => ({
          user: state.user ? { ...state.user, ...userData } : <span class="kw">null</span>,
        })),
    }),
    {
      name: <span class="str">'auth-storage'</span>,
      <span class="cmt">// Hanya simpan token dan user ke localStorage, bukan seluruh state</span>
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);`}
        />

        <TipBlock>
          <p>
            <strong>Versi mana yang dipakai?</strong> Di TaskFlow, gunakan versi
            dengan <code>persist</code>. Ini adalah pola standar di industri.
            Tanpa <code>persist</code>, state auth hilang setiap kali user
            refresh halaman dan harus login ulang meskipun token masih valid.
          </p>
        </TipBlock>
      </TopicSection>

      {/* 5.2 Actions */}
      <TopicSection
        id="zus-actions"
        num="5.2"
        title="Menggunakan Store di Komponen"
        subtitle="Membaca state dan memanggil action dari Zustand store"
      >
        <CodeBlock
          lang="tsx"
          file="src/pages/LoginPage.tsx - integrasi Zustand, RHF, Zod, dan useNavigate"
          id="zus-actions-login"
          html={`<span class="kw">import</span> { useNavigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
<span class="kw">import</span> { useAuthStore } <span class="kw">from</span> <span class="str">'../stores/useAuthStore'</span>;
      <span class="kw">import</span> { useForm, SubmitHandler } <span class="kw">from</span> <span class="str">'react-hook-form'</span>;
<span class="kw">import</span> { zodResolver } <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>;
<span class="kw">import</span> { z } <span class="kw">from</span> <span class="str">'zod'</span>;
<span class="kw">import</span> api <span class="kw">from</span> <span class="str">'../api/axiosInstance'</span>;
      <span class="kw">import type</span> { User } <span class="kw">from</span> <span class="str">'../types'</span>;

<span class="kw">const</span> loginSchema = z.<span class="fn">object</span>({
  email: z.<span class="fn">string</span>().<span class="fn">email</span>(<span class="str">'Format email tidak valid'</span>),
  password: z.<span class="fn">string</span>().<span class="fn">min</span>(<span class="num">6</span>, <span class="str">'Password minimal 6 karakter'</span>),
});

<span class="kw">type</span> <span class="tp">LoginFormData</span> = z.<span class="fn">infer</span>&lt;<span class="kw">typeof</span> loginSchema&gt;;

<span class="kw">interface</span> <span class="tp">LoginResponse</span> {
  user: <span class="tp">User</span>;
  token: <span class="tp">string</span>;
}

<span class="kw">export default function</span> <span class="fn">LoginPage</span>() {
  <span class="kw">const</span> navigate = <span class="fn">useNavigate</span>();
  <span class="kw">const</span> login = <span class="fn">useAuthStore</span>((state) => state.login);

  <span class="kw">const</span> {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = <span class="fn">useForm</span>&lt;<span class="tp">LoginFormData</span>&gt;({
    resolver: <span class="fn">zodResolver</span>(loginSchema),
  });

  <span class="kw">const</span> onSubmit: <span class="tp">SubmitHandler</span>&lt;<span class="tp">LoginFormData</span>&gt; = <span class="kw">async</span> (data) =&gt; {
    <span class="kw">try</span> {
      <span class="kw">const</span> response = <span class="kw">await</span> api.<span class="fn">post</span>&lt;<span class="tp">LoginResponse</span>&gt;(<span class="str">'/auth/login'</span>, data);
      <span class="fn">login</span>(response.data.user, response.data.token);
      navigate(<span class="str">'/dashboard'</span>);
    } <span class="kw">catch</span> {
      <span class="cmt">// Tampilkan error dari server ke field yang relevan</span>
      <span class="fn">setError</span>(<span class="str">'root'</span>, { message: <span class="str">'Email atau password salah'</span> });
    }
  };

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="atr">onSubmit</span>=<span class="jsx">{handleSubmit(onSubmit)}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;input</span> <span class="atr">type</span>=<span class="str">"email"</span> <span class="jsx">{...register('email')}</span> <span class="atr">placeholder</span>=<span class="str">"Email"</span> <span class="tag">/&gt;</span>
      <span class="jsx">{errors.email &amp;&amp; &lt;p&gt;{errors.email.message}&lt;/p&gt;}</span>

      <span class="tag">&lt;input</span> <span class="atr">type</span>=<span class="str">"password"</span> <span class="jsx">{...register('password')}</span> <span class="atr">placeholder</span>=<span class="str">"Password"</span> <span class="tag">/&gt;</span>
      <span class="jsx">{errors.password &amp;&amp; &lt;p&gt;{errors.password.message}&lt;/p&gt;}</span>

      <span class="jsx">{errors.root &amp;&amp; &lt;p style={{ color: 'red' }}&gt;{errors.root.message}&lt;/p&gt;}</span>

      <span class="tag">&lt;button</span> <span class="atr">type</span>=<span class="str">"submit"</span> <span class="atr">disabled</span>=<span class="jsx">{isSubmitting}</span><span class="tag">&gt;</span>
        <span class="jsx">{isSubmitting ? 'Masuk...' : 'Masuk'}</span>
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}`}
        />

        <CodeBlock
          lang="tsx"
          file="src/components/layout/Navbar.tsx - tombol logout menggunakan Zustand auth store"
          id="zus-actions-logout"
          html={`<span class="kw">import</span> { useNavigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>;
      <span class="kw">import</span> { useAppDispatch } <span class="kw">from</span> <span class="str">'../../store/hooks'</span>;
      <span class="kw">import</span> { openCreateTaskModal } <span class="kw">from</span> <span class="str">'../../features/ui/uiSlice'</span>;
<span class="kw">import</span> { useAuthStore } <span class="kw">from</span> <span class="str">'../../stores/useAuthStore'</span>;

<span class="kw">export default function</span> <span class="fn">Navbar</span>() {
  <span class="kw">const</span> navigate = <span class="fn">useNavigate</span>();
        <span class="kw">const</span> dispatch = <span class="fn">useAppDispatch</span>();
        <span class="kw">const</span> { user, logout } = <span class="fn">useAuthStore</span>();

  <span class="kw">const</span> <span class="fn">handleLogout</span> = () => {
    <span class="fn">logout</span>();
    navigate(<span class="str">'/'</span>, { replace: <span class="kw">true</span> });
  };

  <span class="kw">return</span> (
    <span class="tag">&lt;nav&gt;</span>
      <span class="tag">&lt;span&gt;</span>Halo, <span class="jsx">{user?.name}</span><span class="tag">&lt;/span&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{() => dispatch(openCreateTaskModal())}</span><span class="tag">&gt;</span>+ Buat Task<span class="tag">&lt;/button&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">onClick</span>=<span class="jsx">{handleLogout}</span><span class="tag">&gt;</span>Keluar<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/nav&gt;</span>
  );
}`}
        />

        <MistakeBlock>
          <li>
            Mengambil seluruh store: <code>useAuthStore()</code> tanpa selector
            - komponen akan re-render setiap kali state apapun di store berubah.
            Gunakan selector: <code>useAuthStore(state =&gt; state.user)</code>
          </li>
          <li>
            Menyimpan data sensitif seperti password di Zustand atau
            localStorage - hanya simpan token
          </li>
        </MistakeBlock>
      </TopicSection>

      {/* 5.3 Zustand vs Redux */}
      <TopicSection
        id="zus-vs-redux"
        num="5.3"
        title="Zustand vs Redux Toolkit - Kapan Pilih Mana?"
        subtitle="Panduan memilih state management yang tepat di interview"
        isLast
      >
        <MentalModel label="Aturan Praktis untuk Interview">
          <p>
            Pertanyaan "Redux atau Zustand?" sering muncul di interview. Jawaban
            yang baik bukan "Zustand lebih bagus" tapi tahu kapan masing-masing
            tepat digunakan.
          </p>
        </MentalModel>

        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                {["Kriteria", "Zustand", "Redux Toolkit"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 bg-surface3 text-muted2 text-[11px] font-semibold tracking-[0.06em] uppercase border-b border-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Boilerplate",
                  "Sangat minimal",
                  "Lebih banyak (slice, store, provider)",
                ],
                ["Kurva belajar", "Sangat mudah", "Lebih curam"],
                [
                  "DevTools",
                  "Ada (lebih terbatas)",
                  "Redux DevTools yang kuat",
                ],
                [
                  "Skala proyek",
                  "Kecil hingga menengah",
                  "Menengah hingga besar",
                ],
                ["Time-travel debug", "Tidak ada", "Ada"],
                [
                  "Middleware",
                  "Tersedia tapi manual",
                  "Built-in dan terstandar",
                ],
                [
                  "Kapan pilih",
                  "Startup, proyek baru, tim kecil",
                  "Enterprise, tim besar, standarisasi",
                ],
              ].map(([crit, zus, rtk]) => (
                <tr key={crit} className="group">
                  <td className="px-4 py-2.5 text-muted2 border-b border-border group-last:border-b-0 align-top leading-[1.6] group-hover:bg-surface2">
                    <strong className="text-text">{crit}</strong>
                  </td>
                  <td className="px-4 py-2.5 text-muted2 border-b border-border group-last:border-b-0 align-top leading-[1.6] group-hover:bg-surface2">
                    {zus}
                  </td>
                  <td className="px-4 py-2.5 text-muted2 border-b border-border group-last:border-b-0 align-top leading-[1.6] group-hover:bg-surface2">
                    {rtk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TipBlock>
          <p>
            <strong>Di TaskFlow:</strong> Kita menggunakan Zustand untuk state
            auth (ringan, tidak butuh DevTools kompleks) dan Redux Toolkit untuk
            UI state global (bisa berkembang, punya DevTools yang baik). Di
            dunia nyata, sebuah proyek biasanya hanya menggunakan salah satunya,
            bukan keduanya.
          </p>
        </TipBlock>
      </TopicSection>
    </>
  );
}
