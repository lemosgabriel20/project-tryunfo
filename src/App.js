import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      packCards: [],
      isFilterOn: false,
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
      isTrunfoFilterOn: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.canSave = this.canSave.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onRemoveCard = this.onRemoveCard.bind(this);
    this.displayCards = this.displayCards.bind(this);
  }

  onInputChange(evt) {
    let { value } = evt.target;
    if (evt.target.id === 'cardTrunfo') value = evt.target.checked;
    if (evt.target.id.includes('cardAttr')) value = Number(evt.target.value);
    this.setState({
      [evt.target.id]: value,
    }, () => {
      this.canSave();
    });
  }

  onSaveButtonClick(evt) {
    evt.preventDefault();
    const { state } = this;
    const { packCards } = this.state;
    const info = ['cardName', 'cardDescription', 'cardAttr1', 'cardAttr2', 'cardAttr3',
      'cardImage', 'cardRare', 'cardTrunfo'];
    const newCard = {};
    info.forEach((field) => {
      newCard[field] = state[field];
    });
    newCard.key = (Math.random());
    this.setState({
      packCards: [...packCards, newCard],
      isSaveButtonDisabled: true,
    }, () => {
      if (state.cardTrunfo === true) {
        this.setState({ hasTrunfo: true, cardTrunfo: false });
      }
    });
    this.clearInput();
  }

  onFilter(evt) {
    let val = evt.target.value;
    if (evt.target.id === 'trunfoFilter') {
      val = evt.target.checked;
      if (val === true) {
        this.setState({ isTrunfoFilterOn: true });
      } else this.setState({ isTrunfoFilterOn: false });
    }
    this.setState({
      [evt.target.id]: val,
      isFilterOn: true,
    });
  }

  onRemoveCard(evt) {
    const { state } = this;
    const temp = state.packCards.filter((card) => {
      if (card.key !== Number(evt.target.id)) {
        return card;
      }
      if (card.cardTrunfo === true) {
        this.setState({ hasTrunfo: false });
      }
      return false;
    });
    this.setState({ packCards: [...temp] });
    console.log(temp);
  }

  displayCards(filter) {
    const { state } = this;
    let cdLi = [...(state.packCards)];
    const display = [];
    if (state.trunfoFilter) {
      cdLi = cdLi.filter((card) => card.cardTrunfo === (state.trunfoFilter));
      return this.renderCard(cdLi, display);
    }
    if (filter) {
      if (state.nameFilter !== '') {
        cdLi = cdLi.filter((card) => card.cardName.includes(state.nameFilter));
      }
      if (state.rareFilter !== 'todas') {
        cdLi = cdLi.filter((card) => card.cardRare === (state.rareFilter));
      }
      return this.renderCard(cdLi, display);
    }
    // packCards
    return this.renderCard(cdLi, display);
    // returnCardlist
  }

  clearInput() {
    const textInputs = ['cardName', 'cardDescription',
      'cardImage'];
    const numberInputs = ['cardAttr1', 'cardAttr2', 'cardAttr3'];

    textInputs.forEach((field) => this.setState({ [field]: '' }));
    numberInputs.forEach((field) => this.setState({ [field]: 0 }));
    this.setState({ cardRare: 'normal' });
  }

  canSave() {
    const textToBeChecked = ['cardName', 'cardDescription', 'cardImage', 'cardRare'];
    const numbersToBeChecked = ['cardAttr1', 'cardAttr2', 'cardAttr3'];
    const textValues = [];
    const numberValues = [];
    const ninLimit = 90;
    const twohLimit = 210;
    const isLesserThanNinety = [];
    const { state } = this;
    textToBeChecked.forEach((field) => textValues.push(state[field]));
    numbersToBeChecked.forEach((field) => {
      numberValues.push(state[field]);
      isLesserThanNinety.push(state[field] <= ninLimit);
    });
    const min = numberValues.reduce((a, b) => Math.min(a, b));
    const sum = numberValues.reduce((a, b) => a + b, 0);
    if (!(textValues.includes(''))
        && (min >= 0)
        && !isLesserThanNinety.includes(false)
        && (sum <= twohLimit)
    ) this.setState({ isSaveButtonDisabled: false });
    else this.setState({ isSaveButtonDisabled: true });
  }

  renderCard(cdLi, display) {
    cdLi.forEach((card) => {
      display.push(
        <Card
          key={ card.key }
          removeId={ card.key }
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
          haveRemove
          onRemoveCard={ this.onRemoveCard }
        />,
      );
    });
    return display;
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      isFilterOn, isTrunfoFilterOn } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          haveRemove={ false }
          onRemoveCard={ null }
        />
        <label htmlFor="nameFilter">
          <input
            data-testid="name-filter"
            type="text"
            id="nameFilter"
            onChange={ this.onFilter }
            disabled={ isTrunfoFilterOn }
          />
        </label>

        <label htmlFor="rareFilter">
          <select
            data-testid="rare-filter"
            id="rareFilter"
            onChange={ this.onFilter }
            disabled={ isTrunfoFilterOn }
          >
            <option value="todas" defaultValue="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <label htmlFor="trunfoFilter">
          <input
            data-testid="trunfo-filter"
            id="trunfoFilter"
            type="checkbox"
            onClick={ this.onFilter }
          />
          Super Trybe Trunfo
        </label>
        { isFilterOn ? this.displayCards(isFilterOn) : this.displayCards(isFilterOn)}
      </div>
    );
  }
}
export default App;
