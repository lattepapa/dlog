---
title: "카드섞기"
category: algorithm
path: /algorithm/algorithm03
date: 2020-10-25 16:23:00
---

#### 문제

트럼프 카드로 이루어진 배열이 주어졌을 때, 그 카드들을 섞는 함수를 작성하라.  
(힌트는 아니지만, 일반적으로 트럼프 카드를 나열하는 방법은 다음과 같다.)

```
const orderedDeck = () => {
  let suits = ['♥', '♣', '♠', '♦'];
  let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  let deck = [];

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push(value + suit);
    });
  });

  return deck;
};
```

<br>

#### Reference

```jsx{numberLines: true}
const shuffleDeck = (deck) => {
  // 트럼프 카드들(deck)은 위의 스니펫을 통해 주어졌다고 가정한다.
  // 카드를 1회 섞는 경우
  const shuffler = (idxA, idxB) => {
    let temp = deck[idxA];
    deck[idxA] = deck[idxB];
    deck[idxB] = temp;
  };

  // 트럼프 카드들(deck)을 무작위로 섞기
  for (let i = 0; i < deck.length; i++) {
    let anyCard = i + Math.floor(Math.random() * (deck.length - i));
    shuffler(i, anyCard);
  }

  return deck;
};
```

<br>

간단한 정렬 알고리즘을 통해 4~8번째 줄과 같은 **shuffler** 함수를 만들어서 for 문에 이를 활용한다. 이때, **Math.random()** 함수를 통해 무작위 섞기의 대상이 될 인덱스를 생성하면 된다.
