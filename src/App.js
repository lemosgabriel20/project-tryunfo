import React from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      attr1: '',
      attr2: '',
      attr3: '',
      image: '',
      rare: '',
      trunfo: false,
      hasTrunfo: null,
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onSaveButtonClick() {
    return 0;
  }

  onInputChange(evt) {
    console.log(evt.target.value);
    let val = evt.target.value;
    if (evt.target.id === 'trunfo') {
      if (val === 'false') val = true;
      if (val === 'true') val = false;
    }
    this.setState({
      [evt.target.id]: val,
    });
  }

  render() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
      trunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
        />
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attr1: PropTypes.string.isRequired,
  attr2: PropTypes.string.isRequired,
  attr3: PropTypes.string.isRequired,
  imag: PropTypes.string.isRequired,
  rare: PropTypes.string.isRequired,
  trunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  //onInputChange: PropTypes.func.isRequired,
  //onSaveButtonClick: PropTypes.func.isRequired,
};

export default App;
