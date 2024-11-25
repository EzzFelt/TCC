import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Tema importado
import "../utils/codeMirrorSetup"; // Importa a configuração da pasta utils
import "../Styles/CodeMirror.css";

const MyCodeMirror = () => {
  const editorRef = useRef(null); // Referência para o editor
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript"); // Estado para a linguagem selecionada
  const [code, setCode] = useState(""); // Estado para a linguagem selecionada
  const [consoleOutput, setConsoleOutput] = useState([]); // Estado para armazenar a saída do console

  useEffect(() => {
    // Inicializa o CodeMirror
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById("Editor"),
      {
        mode: "javascript", // Modo padrão: JavaScript
        theme: "material", // Tema configurado
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
      }
    );

    // Função para redirecionar o console.log para o estado do componente
    const overrideConsole = () => {
      const originalConsoleLog = console.log;
      console.log = (message) => {
        setConsoleOutput((prevOutput) => [...prevOutput, message]);
        originalConsoleLog(message); // Opcional: ainda loga no console do navegador
      };

      return () => {
        console.log = originalConsoleLog; // Restaura o console.log original
      };
    };

    // Executa a função que sobrescreve o console.log
    const restoreConsole = overrideConsole();

    // Limpa o editor ao desmontar o componente
    return () => {
      editorRef.current.toTextArea();
      restoreConsole(); // Restaura o console.log original
    };
  }, []);

  // Função para mudar a linguagem
  const changeLanguage = (language) => {
    if (editorRef.current) {
      const mode = language === "python" ? "python" : "javascript"; // Define o modo corretamente
      editorRef.current.setOption("mode", mode);
      setSelectedLanguage(language === "python" ? "Python" : "JavaScript");
    }
  };

  // Função para executar o código
  const handleRun = async () => {
    const token = localStorage.getItem("token"); // Certifique-se de obter o token corretamente

    if (!token) {
      setConsoleOutput((prevOutput) => [...prevOutput, "Token não encontrado"]);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/validateCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Certifique-se de que o token é válido
          },
          body: JSON.stringify({
            code, // Código fonte
            testCase: 1, // Caso de teste
          }),
        }
      );

      // Garante que a resposta JSON seja válida
      const data = await response.json();

      if (response.ok) {
        alert("Parabéns, seu código passou!");
        setConsoleOutput((prevOutput) => [
          ...prevOutput,
          "Parabéns, seu código passou!",
        ]);
      } else {
        setConsoleOutput((prevOutput) => [
          ...prevOutput,
          "Há algo a melhorar...",
        ]);
      }
    } catch (error) {
      setConsoleOutput((prevOutput) => [
        ...prevOutput,
        "Erro ao enviar código para validação",
      ]);
    }
  };

  // Função para limpar a saída do console
  const handleClean = () => {
    setConsoleOutput([]); // Limpa a saída do console
  };

  return (
    <div>
      <div className="language-buttons">
        <button
          onClick={() => changeLanguage("javascript")}
          className={selectedLanguage === "JavaScript" ? "selected" : ""}
        >
          JavaScript
        </button>
        <button
          onClick={() => changeLanguage("python")}
          className={selectedLanguage === "Python" ? "selected" : ""}
        >
          Python
        </button>
      </div>
      <p className="selected-language">{selectedLanguage}</p>
      <textarea
        id="Editor"
        placeholder="Insira seu código aqui."
        value={code}
        onChange={(ev) => {
          setCode(ev.target.value);
          console.log(ev.target.value);
        }}
      />
      <div className="container-output">
        <div className="button-container">
          <button onClick={handleRun}>Run</button>
          <button onClick={handleClean}>Clean</button>
        </div>
        <div id="console">
          <div>
            {consoleOutput.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCodeMirror;
