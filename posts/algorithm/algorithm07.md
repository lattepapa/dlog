---
title: "DFS(깊이우선탐색)"
category: algorithm
path: /algorithm/algorithm07
date: 2021-01-02 22:05:00
---

#### 문제

값이 Number 타입인 value와, 값이 배열인 children을 속성으로 갖는 Node 객체를 입력받아, 깊이우선탐색이 수행된 순서대로 value들을 배열에 저장하여 리턴하라.

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
// [ 1, 2, 4, 6, 5, 3, 7 ]
```

<br>

#### Reference

```jsx{numberLines: true}
const treeDfs = (node) => {
  let values = [node.value];
  node.children.forEach(
    (child) =>
      // highlight-start
      (values = values.concat(dfs(child)))
    // highlight-end
  );
  return values;
};
```

<br>

일반적으로 DFS(깊이우선탐색)은 모든 정점(vertex)에 대한 조회를 감행하므로, 최소 $O(N+E)$의 시간복잡도($N$: 정점의 수, $E$: 간선의 수)를 갖는다. 만약 이마저도 연결리스트가 아니라 **인접행렬**로 DFS를 구현한다면, 시간복잡도는 최소 $O(N{^2})$가 된다. 다행히도, 이번 포스팅 문제에 의하면 DFS는 **Binary Tree**(이진트리)에 대해 수행된다. Binary Tree는 Graph(그래프)의 하나이며, 연결리스트의 친척이라고 할 수 있다.
