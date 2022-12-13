import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <label htmlFor="name">
            Nome
            <input data-testid="name-input" type="text" id="name" name="name" />
          </label>

          <label htmlFor="descri">
            Descrição
            <textarea data-testid="description-input" id="descri" name="descri" />
          </label>

          <label htmlFor="attr1">
            Attr01
            <input data-testid="attr1-input" type="number" id="attr1" name="attr1" />
          </label>

          <label htmlFor="attr2">
            Attr02
            <input data-testid="attr2-input" type="number" id="attr2" name="attr2" />
          </label>

          <label htmlFor="attr3">
            Attr03
            <input data-testid="attr3-input" type="number" id="attr3" name="attr3" />
          </label>

          <label htmlFor="image">
            Imagem
            <input data-testid="image-input" type="text" id="image" name="image" />
          </label>

          <label htmlFor="rare">
            Raridade
            <select data-testid="rare-input" name="rare">
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>

          <label htmlFor="trunfo">
            <input data-testid="trunfo-input" type="checkbox" id="trunfo" name="trunfo" />
            Super Trybe Trunfo
          </label>

          <label htmlFor="save">
            <input type="button" data-testid="save-button" id="save" value="Salvar" />
          </label>
        </form>
      </div>
    );
  }
}

export default Form;
