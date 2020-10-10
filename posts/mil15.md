---
title: "Time Complexity"
category: javascript
path: /mil15
date: 2020-10-10 00:00:14
---

# Time Complexity

### 시간복잡도

- 의미 : 알고리즘에 의해서 수행되는 기본 연산의 개수
- 예시

1. Compare all numbers($n^2$번 연산) : 말 그대로 모든 element들의 모든 경우의 수를 계수(=인접행렬방식)
2. Find the largest & smallest($2n$번 연산) : 모든 element들을 차례로 순회하면서 가장 큰(작은)지 확인
3. Compare first & last(3번 연산) : element들 중 첫번째와 마지막을 확인 후 연산

- 복잡도를 표현하는 다양한 방법들

1. 상한 점근법(일명 Big 'O' notation) : $f(n)\in O(g(n))$
2. 하한 점근법 : $f(n) \in \Omega(g(n))$
3. 상하한 점근법 : $f(n) \in \Theta(g(n))$

- 시간복잡도 수준

1. $O(1)$ : 배열에서 인덱스 조회의 경우, 해시테이블에 자료를 추가하는 경우 등
2. $O(log (n))$ : BST의 조회/탐색/추가/삭제의 경우, 로그값을 계산하는 경우(while, for 반복문 1회 사용) 등
3. $O(n)$ : 연결리스트의 조회/탐색의 경우 등
4. $O(n^2)$ : 이중 for 반복문을 사용하는 모든 경우 등
5. $O(C^n)$ : 메모이제이션을 하지못한 모든 재귀 등

[Data Structure의 시간복잡도](https://www.notion.so/6a8dda34d988455f9276ec4835e72f70)

- 해시테이블에서의 시간복잡도 경우의 수

1. 시간복잡도 최소, 즉, O(1)인 경우 → 해시충돌(collision)이 없는 경우
2. 시간복잡도 최대, 즉, O(n)인 경우 → 해시충돌(collision)이 상존하는 경우

- BST에서의 시간복잡도 경우의 수

1. 시간복잡도 최소, 즉, O(log(n))인 경우 → 모든 child가 2개씩 차 있는 경우
2. 시간복잡도 최대, 즉, O(n)인 경우 → 모든 child가 left에만 1개씩 차 있고 마지막 leaf는 오른쪽만 있는 경우

[Graph의 시간복잡도](https://www.notion.so/29b984d034e44116ad52d200aea353c2)
