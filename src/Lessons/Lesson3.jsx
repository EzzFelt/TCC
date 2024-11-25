import React from 'react';
import MyCodeMirror from '../Components/CodeMirror';
import '../Styles/Lessons.css';

const Lesson3 = () => {
  return (
    <div className="lesson-container">
      <div className="lesson-info">
        <div className="lesson-objective">
          <h2>Objetivo da Lição</h2>
          <p>O objetivo é criar uma função que recebe um array de números e retorna a soma de todos os números dentro dele.</p>
        </div>
        <div className="lesson-divider" />
        <div className="lesson-tips">
          <h2>Dicas</h2>
          <ul>
            <li>Use a função `reduce()` para somar todos os valores do array.</li>
            <li>Se quiser, defina uma função com `const nomeDaFuncao = () = {}` ou `function nomeDaFuncao() {}`.</li>
            <li>Certifique-se de testar com diferentes tamanhos de arrays e números.</li>
          </ul>
        </div>
      </div>
      <MyCodeMirror />
    </div>
  );
};

export default Lesson3;
