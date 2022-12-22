import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      attr1: 0,
      attr2: 0,
      attr3: 0,
      image: '',
      rare: 'normal',
      trunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      filteredCards: [],
      op: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.displayFilteredCards = this.displayFilteredCards.bind(this);
    this.displaySavedCards = this.displaySavedCards.bind(this);
    this.filterCards = this.filterCards.bind(this);
  }

  onSaveButtonClick(evt) {
    evt.preventDefault();
    const {
      name,
      description,
      image,
      rare,
      attr1,
      attr2,
      attr3,
      trunfo,
      hasTrunfo,
      savedCards,
      cardSaved,
    } = this.state;
    const newCard = {
      name,
      description,
      image,
      rare,
      attr1,
      attr2,
      attr3,
      trunfo,
      hasTrunfo,
      cardSaved,
    };
    if (trunfo === true) {
      this.setState({ hasTrunfo: true });
    }
    this.setState(({
      savedCards: [...savedCards, newCard],
      name: '',
      description: '',
      attr1: 0,
      attr2: 0,
      attr3: 0,
      image: '',
      rare: 'normal',
      trunfo: false,
      isSaveButtonDisabled: true,
      op: true,
    }));
  }

  onInputChange(evt) {
    let val = evt.target.value;
    if (
      evt.target.id === 'attr1'
      || evt.target.id === 'attr2'
      || evt.target.id === 'attr3'
    ) {
      val = Number(val);
    }
    if (evt.target.id === 'trunfo') {
      if (val === 'false') {
        val = true;
      }
      if (val === 'true') {
        val = false;
      }
    }
    this.setState({
      [evt.target.id]: val,
    }, this.checkVals);
  }

  removeCard(evt) {
    evt.preventDefault();
    const { savedCards } = this.state;
    const index = savedCards.indexOf(savedCards[evt.target.name]);
    if (savedCards[index].trunfo === true) {
      this.setState({ hasTrunfo: false });
    }
    this.setState({
      savedCards: savedCards.filter((_, i) => i !== index),
    });
  }

  filterCards(evt) {
    if (evt.target.value !== '') {
      this.setState({ op: false });
      const { savedCards } = this.state;
      this.setState({
        filteredCards: savedCards.filter((card) => card.name.includes(evt.target.value)),
      });
    } else {
      this.setState({ op: true });
    }
  }

  checkAttr(attr1, attr2, attr3) {
    const limit = 90;
    const endLimit = 210;
    if (
      (attr1 >= 0 && attr1 <= limit)
      && (attr2 >= 0 && attr2 <= limit)
      && (attr3 >= 0 && attr3 <= limit)
      && ((attr1 + attr2 + attr3) <= endLimit)
    ) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  checkVals() {
    const {
      name,
      description,
      image,
      rare,
      attr1,
      attr2,
      attr3,
    } = this.state;
    if (
      name !== ''
      && description !== ''
      && image !== ''
      && rare !== ''
    ) {
      this.checkAttr(attr1, attr2, attr3);
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  displaySavedCards(renderCards, savedCards, removeCard) {
    savedCards.forEach((card, index) => {
      renderCards.push(<Card
        key={ index }
        value={ index }
        cardName={ card.name }
        cardDescription={ card.description }
        cardAttr1={ card.attr1 }
        cardAttr2={ card.attr2 }
        cardAttr3={ card.attr3 }
        cardImage={ card.image }
        cardRare={ card.rare }
        cardTrunfo={ card.trunfo }
        isCardSaved={ 1 }
        removeCard={ removeCard }
      />);
    });
    return renderCards;
  }

  displayFilteredCards(renderCards, filterCards) {
    filterCards.forEach((card, index) => {
      renderCards.push(<Card
        key={ index }
        value={ index }
        cardName={ card.name }
        cardDescription={ card.description }
        cardAttr1={ card.attr1 }
        cardAttr2={ card.attr2 }
        cardAttr3={ card.attr3 }
        cardImage={ card.image }
        cardRare={ card.rare }
        cardTrunfo={ card.trunfo }
        isCardSaved={ 1 }
      />);
    })
    return renderCards;
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
      savedCards,
      op,
      filteredCards,
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
          value={ -200 }
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          isCardSaved={ 0 }
          removeCard={ null }
        />
        <input
          data-testid="name-filter"
          type="text"
          name="inputFilter"
          id="inputFilter"
          onChange={ this.filterCards }
        />
        { op ? this.displaySavedCards([], savedCards, this.removeCard)
          : this.displayFilteredCards([], filteredCards)}
      </div>
    );
  }
}

export default App;
