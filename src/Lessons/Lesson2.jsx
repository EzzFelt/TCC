import React from 'react';
import MyCodeMirror from '../Components/CodeMirror';
import '../Styles/Lessons.css';

const Lesson2 = () => {
  return (
    <div className="lesson-container">
      <div className="lesson-info">
        <div className="lesson-objective">
          <h2>Objetivo da Lição</h2>
          <p>O objetivo é criar uma função que multiplica dois parâmetros e exibe o resultado no console.</p>
        </div>
        <div className="lesson-divider" />
        <div className="lesson-tips">
          <h2>Dicas</h2>
          <ul>
            <li>Use a função `console.log()` para exibir o resultado.</li>
            <li>Defina uma função com `function` ou `const nomeDaFuncao = () = {}`.</li>
            <li>Teste com diferentes valores, como números positivos e negativos.</li>
          </ul>
        </div>
      </div>
      <MyCodeMirror />
    </div>
  );
};

export default Lesson2;
