import ChapterHeader from "../layout/ChapterHeader";
import CardGrid from "../layout/CardGrid";
import Card from "../ui/Card";
import CodeBlock from "../ui/CodeBlock";
import MentalModel from "../ui/MentalModel";
import MistakeBlock from "../ui/MistakeBlock";
import TopicSection from "../layout/TopicSection";

export default function Chapter3Forms() {
  return (
    <>
      <ChapterHeader
        id="ch-form"
        num="Chapter 03"
        title="React Hook Form + Zod"
        subtitle="Form yang performant dengan validasi yang type-safe"
        badgeVariant={3}
      />

      {/* 3.1 Setup */}
      <TopicSection
        id="rhf-setup"
        num="3.1"
        title="Setup & Hook useForm"
        subtitle="Dasar React Hook Form dan cara mendaftarkan input"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>React Hook Form (RHF) adalah library form yang performant karena tidak menyimpan nilai setiap input ke React state (tidak ada re-render di setiap ketikan). Zod adalah library untuk membuat schema validasi dengan TypeScript.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Form dengan validasi adalah fitur yang ada di hampir setiap aplikasi. Membuat form dengan <code>useState</code> biasa menjadi sangat verbose. RHF + Zod adalah kombinasi yang paling banyak dipakai di industri saat ini.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Form login dan registrasi</li>
              <li>Form buat atau edit task di TaskFlow</li>
              <li>Form yang butuh validasi kompleks</li>
              <li>Form dengan banyak field</li>
            </ul>
          </Card>
        </CardGrid>

        <MentalModel>
          <p>RHF menggunakan "uncontrolled inputs" - dia mengakses nilai input langsung dari DOM, bukan melalui React state. Ini membuat form sangat cepat. <code>register()</code> adalah cara RHF "mendaftarkan" input agar bisa diawasi.</p>
        </MentalModel>

        <CodeBlock lang="bash" file="terminal - instalasi react-hook-form zod dan resolvers" id="rhf-setup-install" html={`npm install react-hook-form zod @hookform/resolvers`} />

        <CodeBlock lang="jsx" file="src/components/TaskForm.jsx - useForm dasar" id="rhf-setup-form" html={`<span class="kw">import</span> { useForm } <span class="kw">from</span> <span class="str">'react-hook-form'</span>;

<span class="kw">export default function</span> <span class="fn">TaskForm</span>({ onSubmit }) {
  <span class="kw">const</span> {
    register,       <span class="cmt">// mendaftarkan input ke RHF</span>
    handleSubmit,   <span class="cmt">// wrapper submit yang menangani validasi</span>
    formState: { errors, isSubmitting }, <span class="cmt">// state form</span>
    reset,          <span class="cmt">// reset form ke nilai awal</span>
  } = <span class="fn">useForm</span>();

  <span class="kw">const</span> <span class="fn">submitHandler</span> = (data) => {
    <span class="cmt">// data = { title: '...', description: '...', priority: '...' }</span>
    onSubmit(data);
    reset();
  };

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="atr">onSubmit</span>=<span class="jsx">{handleSubmit(submitHandler)}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;input</span>
        <span class="atr">placeholder</span>=<span class="str">"Judul task"</span>
        <span class="jsx">{...register('title')}</span>  <span class="cmt">// spread operator untuk register</span>
      <span class="tag">/&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">type</span>=<span class="str">"submit"</span> <span class="atr">disabled</span>=<span class="jsx">{isSubmitting}</span><span class="tag">&gt;</span>
        Simpan
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}`} />

        <MistakeBlock>
          <li>Menggunakan <code>onSubmit={"{"}</code>submitHandler{"}"} langsung di form tanpa membungkusnya dengan <code>handleSubmit()</code> - validasi tidak akan berjalan</li>
          <li>Menambahkan <code>value</code> dan <code>onChange</code> secara manual pada input yang sudah di-<code>register</code> - ini konflik dan menyebabkan bug</li>
        </MistakeBlock>
      </TopicSection>

      {/* 3.2 Zod Validation */}
      <TopicSection
        id="rhf-validation"
        num="3.2"
        title="Validasi Form dengan Zod Schema"
        subtitle="Mendefinisikan aturan validasi dengan cara yang reusable"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p>Zod memungkinkan kamu mendefinisikan "schema" - sebuah objek yang mendeskripsikan bentuk dan aturan validasi data yang valid. Schema ini kemudian dihubungkan ke RHF melalui <code>zodResolver</code>.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Validasi form yang baik adalah kualitas yang membedakan developer junior yang baik. Zod membuat validasi mudah dibaca, mudah diubah, dan bisa digunakan ulang di backend dan frontend.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Setiap form yang butuh validasi</li>
              <li>Validasi: required, min/max, format email, regex</li>
              <li>Validasi silang antar field (misal: konfirmasi password)</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/components/TaskForm.jsx - RHF + Zod lengkap" id="rhf-validation-full" html={`<span class="kw">import</span> { useForm } <span class="kw">from</span> <span class="str">'react-hook-form'</span>;
<span class="kw">import</span> { zodResolver } <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>;
<span class="kw">import</span> { z } <span class="kw">from</span> <span class="str">'zod'</span>;
<span class="kw">import</span> { useMutation, useQueryClient } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;
<span class="kw">import</span> { createTask } <span class="kw">from</span> <span class="str">'../api/taskApi'</span>;

<span class="cmt">// 1. Definisikan schema validasi</span>
<span class="kw">const</span> taskSchema = z.<span class="fn">object</span>({
  title: z.<span class="fn">string</span>()
    .<span class="fn">min</span>(<span class="num">3</span>, <span class="str">'Judul minimal 3 karakter'</span>)
    .<span class="fn">max</span>(<span class="num">100</span>, <span class="str">'Judul maksimal 100 karakter'</span>),
  description: z.<span class="fn">string</span>().<span class="fn">optional</span>(),
  priority: z.<span class="fn">enum</span>([<span class="str">'low'</span>, <span class="str">'medium'</span>, <span class="str">'high'</span>], {
    errorMap: () => ({ message: <span class="str">'Pilih prioritas yang valid'</span> }),
  }),
  dueDate: z.<span class="fn">string</span>().<span class="fn">refine</span>(
    (val) => !isNaN(<span class="kw">new</span> <span class="fn">Date</span>(val)),
    { message: <span class="str">'Format tanggal tidak valid'</span> }
  ),
});

<span class="cmt">// Ekstrak tipe TypeScript dari schema (bonus: type safety)</span>
<span class="kw">type</span> <span class="tp">TaskFormData</span> = z.<span class="fn">infer</span>&lt;<span class="kw">typeof</span> taskSchema&gt;;

<span class="kw">export default function</span> <span class="fn">TaskForm</span>({ onClose }) {
  <span class="kw">const</span> queryClient = <span class="fn">useQueryClient</span>();

  <span class="kw">const</span> { register, handleSubmit, formState: { errors } } = <span class="fn">useForm</span>({
    resolver: <span class="fn">zodResolver</span>(taskSchema), <span class="cmt">// 2. Hubungkan schema ke RHF</span>
    defaultValues: {
      priority: <span class="str">'medium'</span>,
    },
  });

  <span class="kw">const</span> mutation = <span class="fn">useMutation</span>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] });
      onClose(); <span class="cmt">// tutup modal setelah berhasil</span>
    },
  });

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="atr">onSubmit</span>=<span class="jsx">{handleSubmit((data) => mutation.mutate(data))}</span><span class="tag">&gt;</span>

      <span class="tag">&lt;div&gt;</span>
        <span class="tag">&lt;input</span> <span class="atr">placeholder</span>=<span class="str">"Judul task"</span> <span class="jsx">{...register('title')}</span> <span class="tag">/&gt;</span>
        <span class="jsx">{errors.title &amp;&amp; &lt;p className="error"&gt;{errors.title.message}&lt;/p&gt;}</span>
      <span class="tag">&lt;/div&gt;</span>

      <span class="tag">&lt;div&gt;</span>
        <span class="tag">&lt;select</span> <span class="jsx">{...register('priority')}</span><span class="tag">&gt;</span>
          <span class="tag">&lt;option</span> <span class="atr">value</span>=<span class="str">"low"</span><span class="tag">&gt;</span>Rendah<span class="tag">&lt;/option&gt;</span>
          <span class="tag">&lt;option</span> <span class="atr">value</span>=<span class="str">"medium"</span><span class="tag">&gt;</span>Sedang<span class="tag">&lt;/option&gt;</span>
          <span class="tag">&lt;option</span> <span class="atr">value</span>=<span class="str">"high"</span><span class="tag">&gt;</span>Tinggi<span class="tag">&lt;/option&gt;</span>
        <span class="tag">&lt;/select&gt;</span>
        <span class="jsx">{errors.priority &amp;&amp; &lt;p className="error"&gt;{errors.priority.message}&lt;/p&gt;}</span>
      <span class="tag">&lt;/div&gt;</span>

      <span class="tag">&lt;button</span> <span class="atr">type</span>=<span class="str">"submit"</span> <span class="atr">disabled</span>=<span class="jsx">{mutation.isPending}</span><span class="tag">&gt;</span>
        <span class="jsx">{mutation.isPending ? 'Menyimpan...' : 'Buat Task'}</span>
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}`} />
      </TopicSection>

      {/* 3.3 Controlled Components */}
      <TopicSection
        id="rhf-controlled"
        num="3.3"
        title="Controlled Components dengan Controller"
        subtitle="Mengintegrasikan UI library eksternal ke dalam RHF"
      >
        <CardGrid>
          <Card label="Apa itu" type="what">
            <p><code>Controller</code> dari RHF digunakan saat kamu menggunakan komponen input dari library eksternal (seperti Select dari shadcn, DatePicker, atau komponen kustom) yang tidak bisa langsung menggunakan <code>register()</code>.</p>
          </Card>
          <Card label="Kenapa penting" type="why">
            <p>Di dunia kerja nyata, kamu hampir pasti menggunakan komponen UI dari library (shadcn/ui, Ant Design, Chakra UI). Semua komponen kustom ini membutuhkan <code>Controller</code> untuk bekerja dengan RHF.</p>
          </Card>
          <Card label="Kapan dipakai" type="when">
            <ul>
              <li>Komponen Select dari library UI</li>
              <li>Date picker library</li>
              <li>Komponen input kustom yang punya prop <code>value</code> dan <code>onChange</code> sendiri</li>
            </ul>
          </Card>
        </CardGrid>

        <CodeBlock lang="jsx" file="src/components/TaskForm.jsx - Controller untuk integrasi komponen UI library eksternal" id="rhf-controlled-code" html={`<span class="kw">import</span> { useForm, Controller } <span class="kw">from</span> <span class="str">'react-hook-form'</span>;
<span class="kw">import</span> CustomSelect <span class="kw">from</span> <span class="str">'./CustomSelect'</span>; <span class="cmt">// komponen dari library UI</span>

<span class="kw">function</span> <span class="fn">TaskForm</span>() {
  <span class="kw">const</span> { control, handleSubmit } = <span class="fn">useForm</span>();

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="atr">onSubmit</span>=<span class="jsx">{handleSubmit(console.log)}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;Controller</span>
        <span class="atr">name</span>=<span class="str">"priority"</span>
        <span class="atr">control</span>=<span class="jsx">{control}</span>
        <span class="atr">defaultValue</span>=<span class="str">"medium"</span>
        <span class="atr">render</span>=<span class="jsx">{({ field }) => (</span>
          <span class="cmt">// field mengandung: value, onChange, onBlur, name, ref</span>
          <span class="tag">&lt;CustomSelect</span>
            <span class="jsx">{...field}</span>
            <span class="atr">options</span>=<span class="jsx">{[
              { label: 'Rendah', value: 'low' },
              { label: 'Sedang', value: 'medium' },
              { label: 'Tinggi', value: 'high' },
            ]}</span>
          <span class="tag">/&gt;</span>
        <span class="jsx">)}</span>
      <span class="tag">/&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">type</span>=<span class="str">"submit"</span><span class="tag">&gt;</span>Submit<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}`} />
      </TopicSection>

      {/* 3.4 Error Handling */}
      <TopicSection
        id="rhf-errors"
        num="3.4"
        title="Error Handling & Edit Form"
        subtitle="Menampilkan error validasi dan mengisi ulang form untuk edit"
        isLast
      >
        <CodeBlock lang="jsx" file="src/components/EditTaskForm.jsx - prefill form edit dengan data task dari API" id="rhf-errors-edit" html={`<span class="cmt">// Untuk form edit, kita perlu mengisi ulang field dengan data yang ada</span>
<span class="kw">function</span> <span class="fn">EditTaskForm</span>({ taskId }) {
  <span class="kw">const</span> { data: task } = <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'tasks'</span>, taskId],
    queryFn: () => <span class="fn">fetchTaskById</span>(taskId),
  });

  <span class="kw">const</span> { register, handleSubmit, formState: { errors }, reset } = <span class="fn">useForm</span>({
    resolver: <span class="fn">zodResolver</span>(taskSchema),
  });

  <span class="cmt">// Ketika data task tersedia, isi ulang form</span>
  useEffect(() => {
    <span class="kw">if</span> (task) {
      <span class="fn">reset</span>({
        title: task.title,
        description: task.description,
        priority: task.priority,
      });
    }
  }, [task, reset]);

  <span class="kw">const</span> updateMutation = <span class="fn">useMutation</span>({
    mutationFn: (data) => <span class="fn">updateTask</span>({ id: taskId, ...data }),
    onSuccess: () => queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'tasks'</span>] }),
  });

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="atr">onSubmit</span>=<span class="jsx">{handleSubmit((data) => updateMutation.mutate(data))}</span><span class="tag">&gt;</span>
      <span class="tag">&lt;div&gt;</span>
        <span class="tag">&lt;label&gt;</span>Judul<span class="tag">&lt;/label&gt;</span>
        <span class="tag">&lt;input</span> <span class="jsx">{...register('title')}</span> <span class="tag">/&gt;</span>
        <span class="cmt">// Tampilkan pesan error spesifik dari Zod</span>
        <span class="jsx">{errors.title &amp;&amp; (
          &lt;span style={{ color: 'red', fontSize: '12px' }}&gt;
            {errors.title.message}
          &lt;/span&gt;
        )}</span>
      <span class="tag">&lt;/div&gt;</span>
      <span class="tag">&lt;button</span> <span class="atr">type</span>=<span class="str">"submit"</span><span class="tag">&gt;</span>Update<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}`} />

        <MistakeBlock>
          <li>Mengisi defaultValues langsung dari data yang bisa undefined - menyebabkan form tidak ter-populate. Selalu gunakan <code>reset()</code> di dalam <code>useEffect</code> setelah data tersedia</li>
          <li>Lupa menambahkan <code>reset</code> ke dalam dependency array useEffect sehingga ESLint terus warning</li>
          <li>Menggunakan <code>watch()</code> di setiap field untuk tracking nilai - ini menyebabkan re-render berlebihan. Hanya gunakan <code>watch</code> jika benar-benar perlu</li>
        </MistakeBlock>
      </TopicSection>
    </>
  );
}
