import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div>
        <form className="form">
          <label htmlFor="name">
            Nome
            <input
              data-testid="name-input"
              type="text"
              id="name"
              name="name"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <textarea
              data-testid="description-input"
              id="description"
              name="description"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="attr1">
            Attr01
            <input
              data-testid="attr1-input"
              type="number"
              id="attr1"
              name="attr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="attr2">
            Attr02
            <input
              data-testid="attr2-input"
              type="number"
              id="attr2"
              name="attr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="attr3">
            Attr03
            <input
              data-testid="attr3-input"
              type="number"
              id="attr3"
              name="attr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="image">
            Imagem
            <input
              data-testid="image-input"
              type="text"
              id="image"
              name="image"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="rare">
            Raridade
            <select
              data-testid="rare-input"
              name="rare"
              id="rare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>

          <label htmlFor="trunfo">
            <input
              data-testid="trunfo-input"
              type="checkbox"
              id="trunfo"
              name="trunfo"
              value={ cardTrunfo }
              onChange={ onInputChange }
            />
            Super Trybe Trunfo
          </label>

          <label htmlFor="save">
            <input
              type="submit"
              data-testid="save-button"
              id="save"
              value="Salvar"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            />
          </label>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
