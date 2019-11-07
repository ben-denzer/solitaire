import { Board } from 'types/Board';
import { CardDragItem, Card } from 'types/Card';

function updateTableau(board: Board, cardDragObj: CardDragItem, tableauIndex: number): Board {
  let nextBoard: Board = {
    ...board,
    history: [...board.history, JSON.parse(JSON.stringify(board))]
  };

  let cardsToMove: Card[] = [];

  // check the waste first to see if the dropped card is from there
  if (nextBoard.waste.length) {
    const topWasteCard = nextBoard.waste[0];
    if (topWasteCard.val === cardDragObj.value && topWasteCard.suit === cardDragObj.suit) {
      cardsToMove = [topWasteCard];
      nextBoard.waste = nextBoard.waste.slice(1);
    }
  }

  // check the foundations
  if (!cardsToMove.length) {
    for (let i = 0; i < nextBoard.foundations.length; i++) {
      let { pile } = nextBoard.foundations[i];
      if (pile.length >= 1 && pile[0].suit === cardDragObj.suit && cardDragObj.value === pile[0].val) {
        cardsToMove = [pile[0]];
        nextBoard.foundations[i] = { suit: null, pile: [] };
      }
    }
  }

  // check the tableau piles
  if (!cardsToMove.length) {
    for (let i = 0; i < nextBoard.tableau.length; i++) {
      // stop the loop when the card is found
      if (cardsToMove && cardsToMove.length) {
        break;
      }
      // don't check the tableau that we are dropping into
      if (i === tableauIndex) {
        continue;
      }

      const pile = nextBoard.tableau[i];
      if (pile.length) {
        for (let j = 0; j < pile.length; j++) {
          // stop the loop when a card is found
          if (cardsToMove.length) {
            break;
          }
          if (pile[j].val === cardDragObj.value && pile[j].suit === cardDragObj.suit) {
            cardsToMove = [...pile.slice(0, j + 1)];
            nextBoard.tableau[i] = nextBoard.tableau[i].slice(j + 1);
          }
          // flip the next card up if needed
          if (nextBoard.tableau[i].length && nextBoard.tableau[i][0].face === 'DOWN') {
            nextBoard.tableau[i][0].face = 'UP';
          }
        }
      }
    }
  }

  if (cardsToMove.length) {
    nextBoard.tableau[tableauIndex] = [...cardsToMove, ...nextBoard.tableau[tableauIndex]];
  }

  return nextBoard;
}

export default updateTableau;
