//app\admin\page.tsx

import HeaderAdmin from "../_components/headerAdmin/HeaderAdmin";


export default function AdminHome() {
  return (
    <>
      <HeaderAdmin />
      <main style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.6rem", marginBottom: 12 }}>
          Dashboard do Admin
        </h1>
        <p>Você está autenticado. Aqui você pode gerenciar inscrições, etc.</p>

        {/* exemplo: lista de próximas tarefas/atalhos */}
        <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
          <li>Ver novas inscrições</li>
          <li>Buscar por e-mail/CRP</li>
          <li>Exportar dados</li>
        </ul>
      </main>
    </>
  );
}
