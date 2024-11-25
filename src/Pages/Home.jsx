import React from "react";
import "../Styles/Home.css";

const Home = ({ user }) => {
  if (!user) {
    return <div className="error">Erro ao carregar os dados do usuário.</div>;
  }

  return (
    <div className="home-container">
      <div className="profile-container">
        <img
          src={user.profilePicture || "public/imgs/pfp.jpg"} // Foto do usuário ou imagem padrão
          alt="Foto do Usuário"
          className="profile-picture"
        />
        <h1 className="welcome-title">Bem-vindo, {user.name}!</h1>
        <p className="lessons-completed">
          Você realizou {user.lessonsCompleted || 0} lições até agora!
        </p>
      </div>

      <div className="weekly-challenges">
        <h2>Desafios Semanais</h2>
        <div className="challenges">
          <div className="challenge-card">
            <i className="fab fa-js-square" style={{ color: "#f7df1e" }}></i>
            <span>JS</span>
          </div>
          <div className="challenge-card">
            <i className="fab fa-cuttlefish" style={{ color: "#0078d7" }}></i>
            <span>C#</span>
          </div>
          <div className="challenge-card">
            <i className="fab fa-python" style={{ color: "#3776ab" }}></i>
            <span>Python</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
