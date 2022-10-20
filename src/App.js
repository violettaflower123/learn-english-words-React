import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      word: "",
      translation: "",
      cards: [],
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addCard() {
    const newCard = {
      id: 1 + this.state.id,
      value: {
        word: this.state.word.slice(),
        translation: this.state.translation.slice(),
      },
    };

    this.setState({
      id: newCard.id,
      word: "",
      translation: "",
      cards: [...this.state.cards, newCard],
      overturned: false,
    });
  }

  turnCard(id) {
    const cards = [...this.state.cards];

    let index = cards.findIndex((card) => {
      return card.id === id;
    });

    cards[index].value.overturned = !cards[index].value.overturned;

    this.updateInput("cards", cards);
  }

  render() {
    return (
      <div className="App">
        <h1 className="app__title">Учим английский по карточкам &#x1F929;</h1>
        <div className="container">
          <div className="inputs-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Введите слово на русском"
              value={this.state.word}
              onChange={(evt) => this.updateInput("word", evt.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Введите перевод"
              value={this.state.translation}
              onChange={(evt) =>
                this.updateInput("translation", evt.target.value)
              }
            />
          </div>
          <button className="btn" onClick={() => this.addCard()}>
            Добавить карточку
          </button>
        </div>

        <div className="cards-wrapper">
          {this.state.cards.map((card) => {
            return (
              <div
                key={card.id}
                className={`card ${
                  card.value.overturned ? "card-translation" : "card-word"
                }`}
                onClick={() => this.turnCard(card.id)}
              >
                {card.value.overturned
                  ? card.value.translation
                  : card.value.word}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
