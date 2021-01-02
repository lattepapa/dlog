---
title: "BFS(너비우선탐색)"
category: algorithm
path: /algorithm/algorithm08
date: 2021-01-02 22:45:00
---

#### 문제

값이 Number 타입인 value와, 값이 배열인 children을 속성으로 갖는 Node 객체를 입력받아, 너비우선탐색이 수행된 순서대로 value들을 배열에 저장하여 리턴하라.

#### 입출력 예시

```
let Node = value => {
  this.value = value;
  this.children = [];
};
Node.prototype.addChild = child => {
  this.children.push(child);
  return child;
};

let root = new Node(1);
let rootChild1 = root.addChild(new Node(2));
let rootChild2 = root.addChild(new Node(3));
let leaf1 = rootChild1.addChild(new Node(4));
let leaf2 = rootChild1.addChild(new Node(5));
leaf1.addChild(new Node(6));
rootChild2.addChild(new Node(7));
console.log((dfs(root)))
// [ 1, 2, 3, 4, 5, 7, 6 ]
```

<br>

#### Reference

```jsx{numberLines: true}
const treeBfs = (node) => {
  // 각 정점들의 부모들만 큐에 저장하여, 이들의 value들을 차례대로 빈 배열에 저장할 것이다.
  let queue = [node];
  let values = [];

  while (queue.length > 0) {
    // highlight-start
    // 위에서 설계한대로, 각 정점들의 부모들(head)의 value들만 차례대로 빈 배열에 저장한다.
    let head = queue[0];
    queue = queue.slice(1);
    values.push(head.value);
    // highlight-end
    head.children.forEach(
      (child) =>
        // highlight-start
        // 자식 정점들 중 또다시 부모들만 따기 위해 큐에 다음 순서로 밀어넣는다.
        queue.push(child)
      // highlight-end
    );
  }
  return values;
};
```

<br>

일반적으로 BFS(너비우선탐색) 또한 직전 포스팅에서 살펴본 DFS와 마찬가지로 모든 정점(vertex)에 대한 조회를 감행한다. 따라서 시간복잡도 역시 DFS와 동일하게, 최소 $O(N+E)$의 시간복잡도($N$: 정점의 수, $E$: 간선의 수)를 갖으며, 인접행렬의 경우 최소 $O(N{^2})$가 된다. 단, BFS가 DFS와 다른 것은 위의 코드에서 볼 수 있듯이 탐색 로직이 직관적이지 않고 복잡성을 갖는다. 또한, 처음부터 트리의 최대 깊이까지 순회하지 않고 정점과 인접한 곳부터 탐색한다. 이러한 원리는 BFS가 '최단경로' 탐색과 같은 길찾기 원리에 활용될 수 있음을 시사한다.
