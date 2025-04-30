import {JSX} from "react"
import {Link} from "react-router-dom"

export const NavBar = (): JSX.Element => {
    return(
        <div style={{ display: "flex", height: "100vh" }}>
      {/* Navbar Lateral */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1e293b",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          zIndex: 10

        }}
      >
        {/* Navegação */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link to="/quadras" style={linkStyle}>Quadras</Link>
          <Link to="/reservas" style={linkStyle}>Reservas</Link>
          <Link to="/usuarios" style={linkStyle}>Usuários</Link>
        </nav>

        {/* Rodapé */}
        <div>
          <hr style={{ borderColor: "#334155", margin: "20px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Olá, Usuário</span>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "rgb(62, 171, 201)",
                border: "none",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={() => alert("Você saiu.")}
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px"
};