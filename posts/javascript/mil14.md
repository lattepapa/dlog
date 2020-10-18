---
title: "Graph, Tree 그리고 BST"
category: javascript
path: /javascript/mil14
date: 2020-09-08 23:00:13
---

### Graph

vertex(정점) 또는 node를 연결하는 edge(간선)으로 구성된 자료구조

#### 예시

웹사이트(V:페이지, uE:링크), 지도(V:교차로, dE:도로), SNS(V:회원, uE:친구맺기) 등

#### 종류

[1] 무방향(Undirected Graph) : 일명 '대칭' graph로, 한 edge에 두 vertex가 방향성 없이 대칭적으로 연결됨  
[2] 방향(Directed Graph) : 일명 '비대칭' graph로, 한 vertex에서 다른 vertex로 방향이 정해진 edge가 존재

#### 주요 개념

[1] Adjacent vertex(인접node) : edge에 의해 직접 연결된 vertex를 의미  
[2] degree(node차수) : UGraph에서, 인접한 vertex의 개수를 의미하며, 이때 다음을 만족한다.

> (모든 degree의 수) = (모든 edge의 수) \* 2

[3] in-degree(진입차수) : DGraph에서, 외부에서 오는 edge의 개수를 의미  
[4] out-degree(진출차수) : DGraph에서, 외부로 향하는 edge의 개수를 의미하며, 이때 다음을 만족한다.

> (모든 indegree의 수) = (모든 outdegree의 수) = (모든 edge의 수)

[5] weight(가중치) : edge에 부여되는 일종의 인덱스  
[6] path-length(경로길이) : 경로를 구성하는데 사용된 edge의 개수  
[7] simple path(단순경로) : 경로 중에서 반복되는 vertex가 없는 경우를 의미  
[8] cycle(순환) : 단순경로일 때, 시작 vertex와 종료 vertex가 동일한 경우를 의미

#### 구현방식

[1] Adjacent List(인접리스트) : vertex를 key로 하여 인접node들을 list에 저장하는 방식으로 공간복잡도는 V + E 이다. 즉, 인접리스트를 구현하려면 메모리가 최대 V + E 만큼 필요하다. 따라서 vertex의 추가, 삭제, 탐색에 유리하다.  
[2] Adjacent Matrix(인접행렬) : 행렬의 각 element들이 두 vertex 간 연결을 나타내는 방식으로 공간복잡도는 V _ V 이다. 즉, 인접행렬을 구현하려면 메모리가 최대 V _ V 만큼 필요하다. 따라서 vertex의 '빈번한' 추가, 삭제, 탐색에 유리하다.

#### 주요 메소드

.addNode(node), .contains(node), .removeNode(node), .hasEdge(fromNode, toNode), .addEdge(fromNode, toNode), .removeEdge(fromNode, toNode) 등

```jsx{numberLines: true}
// Graph 생성 클래스
class Graph {
  // highlight-start
  constructor() {
    this.nodes = {};
  }
  // highlight-end
}
```

```jsx{numberLines: true}
// Vertex(Node) 추가 메소드
Graph.prototype.addNode = function (node) {
  this.nodes[node] = this.nodes[node] || [];
};
```

```jsx{numberLines: true}
// Vertex(Node) 존재여부 확인 메소드
Graph.prototype.contains = function (node) {
  if (this.nodes[node]) return true;
  return false;
};
```

```jsx{numberLines: true}
// Vertex(Node) 삭제 메소드
Graph.prototype.removeNode(node) {
	if(this.nodes[node]) {
		// 먼저 삭제하려는 Vertex의 edge도 삭제해야 한다.
		for(let vtx of this.nodes[node]) {
			this.removeEdge(node, vtx);
		}
		delete this.nodes[node];
	}
	return undefined;
}
```

```jsx{numberLines: true}
// 두 Vertex(Node)가 연결되었는지 확인 메소드
Graph.prototype.hasEdge = function(fromNode, toNode) {
	for(let vtx of this.nodes[fromNode] {
		if(vtx === toNode) return true;
	}
	return false;
}
```

```jsx{numberLines: true}
// 두 Vertex(Node) 연결 메소드
Graph.prototype.addEdge = function (fromNode, toNode) {
  this.nodes[fromNode].push(toNode);
  this.nodes[toNode].push(fromNode);
};
```

```jsx{numberLines: true}
// 두 Vertex(Node) 연결 삭제 메소드
Graph.prototype.removeEdge = function (fromNode, toNode) {
  this.node[fromNode].pop(toNode);
  this.node[toNode].pop(fromNode);
};
```

<br>
<br>
<br>

### Tree

Node로 구성된 계층적 자료구조로, root를 만들고 child를 추가하고 또 child를 추가하여 만든다.

#### 주요 개념

[1] height : tree의 전체 depth의 개수  
[2] depth : root까지의 depth의 개수

#### 주요 메소드 : .insertNode(value), .contains(value) 등

```jsx{numberLines: true}
class TreeNode {
  // highlight-start
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  // highlight-end
}
```

```jsx{numberLines: true}
TreeNode.prototype.insertNode = function(value) {
	this.children.push(new TreeNode(value);
}
```

```jsx{numberLines: true}
TreeNode.prototype.contains = function (value) {
  if (this.value === value) return true;
  for (let child of this.children) {
    if (child.contains(value)) return true;
  }
  return false;
};
```

<br>
<br>
<br>

### Binary Search Tree

Node가 최대 2개의 child를 가지며, node의 크기는 반드시 Left child < Parent < Right child 이다.

#### BST의 종류

[1] Complete Binary Tree(완전이진트리) : Leaf node가 왼쪽이 채워진 것  
[2] Full Binary Tree(전이진트리) : 모든 node가 0 아니면 2개의 child를 가지는 것  
[3] Perfect Binary Tree(포화이진트리) : Leaf node를 제외하고 모든 node가 2개의 child로 꽉 차있는 것으로, node의 수는 정확히 $2^{(height - 1)}$ 개이다.

#### BST에서의 DFS

[1] Pre-order(전위탐색) : root 기준 가장 Left Parent의 Left child의 Left...에서 탐색시작(top-down)  
[2] In-order(중위탐색) : 가장 Left child인 Leaf에서 탐색시작(bottom-up)  
[3] Post-order(후위탐색) : 가장 Left chil인 Leaf에서 탐색시작

#### 시간복잡도

node 추가/삭제/탐색 모두에서 $O(h)$

```jsx{numberLines: true}
class BinarySearchTreeNode {
  // highlight-start
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  // highlight-end
}
```

```jsx{numberLines: true}
BinarySearchTreeNode.prototype.insert = function (value) {
  // value가 부모보다 작은 경우
  if (value < this.value) {
    if (!this.left) this.left = new BinarySearchTreeNode(value);
    this.left.insert(value);
  }
  // value가 부모보다 큰 경우
  else if (value > this.value) {
    if (!this.right) this.right = new BinarySearchTreeNode(value);
    this.right.insert(value);
  }
};
```

```jsx{numberLines: true}
BinarySearchTreeNode.prototype.contains = function (value) {
  // value가 부모에서 바로 일치하는 경우
  if (value === this.value) return true;
  // value가 부모보다 작은 경우
  else if (value < this.value) {
    if (!this.left) return false;
    if (this.left.contains(value)) return true;
  }
  // value가 부모보다 큰 경우
  else if (value > this.value) {
    if (!this.right) return false;
    if (this.right.contains(value)) return true;
  }
  return false;
};
```

```jsx{numberLines: true}
BinarySearchTreeNode.prototype.inorder = function (callback) {
  // 항상 this.left -> 부모(this.value) -> this.right로 순회하는 함수 생성
  if (this.left) this.left.inorder(callback);
  callback(this.value);
  if (this.right) this.right.inorder(callback);
};
```
