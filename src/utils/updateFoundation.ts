import { Board } from 'types/Board';
import { CardDragItem, Card } from 'types/Card';

function updateFoundation(board: Board, cardDragObj: CardDragItem, foundationIndex: number): Board {
  let nextBoard: Board = {
    ...board,
    history: [...board.history, JSON.parse(JSON.stringify(board))]
  };

  let cardToMove: Card | null = null;

  // check the waste first to see if the dropped card is from there
  if (nextBoard.waste.length) {
    const topWasteCard = nextBoard.waste[0];
    if (topWasteCard.val === cardDragObj.value && topWasteCard.suit === cardDragObj.suit) {
      cardToMove = topWasteCard;
      nextBoard.waste = nextBoard.waste.slice(1);
    }
  }

  // check the other foundations
  // this can only be someone moving an Ace from one foundation to the other
  if (!cardToMove) {
    if (cardDragObj.value === 1) {
      for (let i = 0; i < nextBoard.foundations.length; i++) {
        let { pile } = nextBoard.foundations[i];
        if (pile.length === 1 && pile[0].suit === cardDragObj.suit) {
          cardToMove = pile[0];
          nextBoard.foundations[i] = { suit: null, pile: [] };
        }
      }
    }
  }

  // check the tableau piles
  // foundation piles only allow a single card at a time, so check pile[0]
  if (!cardToMove) {
    for (let i = 0; i < nextBoard.tableau.length; i++) {
      if (cardToMove) {
        break;
      }
      const pile = nextBoard.tableau[i];
      if (pile.length && pile[0].suit === cardDragObj.suit && pile[0].val === cardDragObj.value) {
        cardToMove = pile[0];
        nextBoard.tableau[i] = pile.slice(1);

        // flip the next remaining card up if needed
        if (nextBoard.tableau[i].length && nextBoard.tableau[i][0].face === 'DOWN') {
          nextBoard.tableau[i][0].face = 'UP';
        }
      }
    }
  }

  if (cardToMove) {
    nextBoard.foundations[foundationIndex] = {
      suit: cardToMove.suit,
      pile: [cardToMove, ...nextBoard.foundations[foundationIndex].pile]
    };
  }
  return nextBoard;
}

export default updateFoundation;
