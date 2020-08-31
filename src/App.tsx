import React, {
  ReactElement,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import styled from "theme/styled";
import themeType from "theme/type";
import Card from "Card";
import { useTheme } from "emotion-theming";
import defaultCards from "theme/defaultCards";
import config from "config";
import getCards from "./service";

interface State {
  cards: {
    key: string;
    faceTop: boolean;
    card: number;
    done: boolean;
  }[];
  started: boolean;
  finished: boolean;
}

const initialState: State = {
  started: false,
  cards: [],
  finished: false,
};

const Game = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(50px, 1fr));
  grid-template-rows: repeat(3, minmax(80px, 1fr));
  grid-gap: 15px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(9, minmax(100px, 1fr));
    grid-template-rows: repeat(2, minmax(150px, 1fr));
  }
`;

function App(): ReactElement {
  const theme = useTheme<themeType>();
  const flipTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const cards = useMemo(() => {
    return getCards(config.cardsCount);
  }, []);
  const [state, setSate] = useState<State>(initialState);

  const themedCards = useMemo(() => {
    return theme.cards || defaultCards;
  }, [theme.cards]);
  const reset = useCallback((init: State = initialState) => {
    const newState: State = {
      ...init,
      cards: init.cards.map((card) => ({
        ...card,
        faceTop: card.done,
      })),
    };
    if (flipTimeout.current) {
      clearTimeout(flipTimeout.current);
      flipTimeout.current = undefined;
    }
    return newState;
  }, []);

  const flip = useCallback(
    (id: string) => {
      if (
        // Game not started yet
        !state.started ||
        // or click on faceTop cards
        state.cards.some((card) => card.faceTop && id === card.key)
      ) {
        return;
      }

      let affectiveState: State;
      if (flipTimeout.current) {
        affectiveState = reset(state);
      } else {
        affectiveState = state;
      }

      const faceTops = affectiveState.cards.filter(
        (card) => !card.done && card.faceTop
      );
      const faceTopsCount = faceTops.length;
      const toBeFaceTop = affectiveState.cards.find((card) => card.key === id);
      const isCorrect = faceTops.some(
        (card) => card.key !== id && card.card === toBeFaceTop?.card
      );

      const newState = {
        ...affectiveState,
        cards: affectiveState.cards.map((card) => ({
          ...card,
          faceTop:
            card.key === id || card.done || (card.faceTop && faceTopsCount < 2),
          done: card.done || (card.card === toBeFaceTop?.card && isCorrect),
        })),
        finished: affectiveState.cards.length - faceTopsCount <= 1,
      };

      setSate(newState);

      if (faceTopsCount > 0) {
        flipTimeout.current = setTimeout(() => {
          setSate(reset(newState));
        }, config.displayReset);
      }
    },
    [reset, state]
  );

  const cardElements = useMemo(
    () =>
      state.cards.map((element) => (
        <Card
          key={element.key}
          alt="Card"
          back={themedCards[0]}
          face={themedCards[element.card]}
          faceTop={element.faceTop}
          onClick={() => flip(element.key)}
        />
      )),
    [flip, state.cards, themedCards]
  );

  useEffect(() => {
    const idPrefix = Math.floor(Math.random() * 100).toString();
    const getCardObjects = (faceTop: boolean) =>
      cards.map((card, index) => ({
        key: `${idPrefix}-${card}-${index}`,
        faceTop,
        card,
        done: false,
      }));

    const newState = {
      started: false,
      cards: getCardObjects(true),
      finished: false,
    };
    setSate(newState);

    const timeout = setTimeout(() => {
      setSate(
        reset({
          ...newState,
          started: true,
        })
      );
    }, config.startedDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [cards, reset]);

  return (
    <Game>
      <Container>{cardElements}</Container>
    </Game>
  );
}

export default App;
