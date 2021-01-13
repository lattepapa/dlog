---
title: "집합"
category: algorithm
path: /algorithm/algorithm19
date: 2021-01-11 12:24:00
---

집합은 정렬되지 않은 유일한(**중복되지 않는**) 항목들의 그룹이다. 집합은 $O(1)$ 상수 시간에 유일한 항목을 확인하고 추가할 수 있다. 이러한 상수 시간 연산이 가능한 이유는 집합의 구현이 **해시 테이블** 구현을 기초로 하기 때문이다. 자바스크립트에서는 **Set** 메소드를 통해 집합을 구현할 수 있다. **new Set** 키워드를 통해 생성된 집합은 삽입, 삭제, 포함의 집합 연산기능을 적용할 수 있다. 한편, 이러한 방식으로 집합으로 만들어진 그룹은 **Array.from** 메소드를 통해 배열로 변환할 수 있다.

### 집합 연산

#### 삽입

집합에 항목을 삽입하기 위해 **add** 메소드를 사용할 수 있다. 상술하듯, 집합은 중복되지 않은 항목들의 그룹이므로 중복된 항목이 삽입될 수는 없다. 집합에의 삽입은 $O(1)$의 상수 시간복잡도를 만족한다.

```jsx
// highlight-start
let example = new Set();
// highlight-end

// highlight-start
example.add(1); // Set {1}
// highlight-end
example.add(1);
example.add(2); // Set {1,2}
```

<br />

#### 삭제

집합에 존재하는 항목을 삭제할 때 **delete** 메소드를 사용할 수 있다. 삭제하려는 항목이 존재하면 삭제 후 true를, 삭제하려는 항목이 존재하지 않는다면 false를 반환한다. 배열에서 pop 메소드를 통해 항목 하나를 삭제하기 위해서 $O(n)$의 시간복잡도가 소요되는 것에 비해, 집합에서의 삭제는 $O(1)$의 상수 시간복잡도를 만족한다.

```jsx
let example = new Set([1, 2, 3, 4]); // Set {1,2,3,4}

// highlight-start
example.delete(1); // true
// highlight-end
example.delete(1); // false
example.delete(5); // false
```

<br />

#### 포함

집합에 어떠한 항목이 포함되어 있는 지 확인하기 위해 **has** 메소드를 사용할 수 있다. 이 경우에도 $O(1)$의 시간복잡도를 만족한다.

```jsx
let example = new Set([1, 2, 3, 4]); // Set {1,2,3,4}

// highlight-start
example.has(1); // true
// highlight-end
example.has(5); // false
```

<br />

#### 교집합(intersection)

주어진 두 집합의 교집합은 항목의 포함 여부를 판별하면 쉽게 도출할 수 있다.

```jsx
function intersectSet(set1, set2) {
  let intersection = new Set();

  for (let el of set2) {
    if (set1.has(el)) intersection.add(el);
  }
  return intersection;
}

let set1 = new Set([1, 2, 3, 4]),
  set2 = new Set([3, 4, 5]);

intersectSet(set1, set2); // Set {3,4}
```

<br />

#### 상위집합(superset)과 부분집합(subset)

어떤 집합이 다른 집합의 부분집합이 되는지 확인하는 것도, 위와 마찬가지로 포함 여부를 판별함으로써 쉽게 도출할 수 있다.

```jsx
function isSuperSet(superSet, subSet) {
  for (let el of subSet) {
    if (!superSet.has(el)) return false;
  }
  return true;
}

let set1 = new Set([1, 2, 3, 4]),
  set2 = new Set([3, 4]),
  set3 = new Set([4, 5]);

isSuperSet(set1, set2); // true
isSuperSet(set1, set3); // false
```

<br />

#### 합집합(union)

서로 다른 두 집합을 하나의 집합으로 합치기 위해서 삽입 메소드를 활용한다.

```jsx
function unionSet(set1, set2) {
  let union = new Set(set1);

  for (let el of set2) {
    union.add(el);
  }
  return union;
}

let set1 = new Set([1, 2, 3, 4]),
  set2 = new Set([3, 4]),
  set3 = new Set([4, 5]);

unionSet(set1, set2); // Set {1,2,3,4}
unionSet(set1, set3); // Set {1,2,3,4,5}
```

<br />

#### 차집합(difference)

어떤 집합에서 다른 집합과의 차집합을 구하기 위해선 삭제 메소드를 활용한다.

```jsx
function differenceSet(set1, set2) {
  let difference = new Set(set1);

  for (let el of set2) {
    difference.delete(el);
  }
  return difference;
}

let set1 = new Set([1, 2, 3, 4]),
  set2 = new Set([3, 4]),
  set3 = new Set([4, 5]);

differenceSet(set1, set2); // Set {1,2}
differenceSet(set1, set3); // Set {1,2,3}
```

<br />

#### 배열의 중복 항목 확인

배열을 집합으로 변환하여 집합의 크기와 원본 배열의 크기를 비교하면 중복된 항목이 존재하는 지 쉽게 확인할 수 있다. 배열의 길이가 가변적이므로 시간복잡도와 공간복잡도는 $O(n)$을 갖는다.

```jsx{numberLines: true}
function checkDuplicates(arr) {
  let myset = new Set(arr);
  // highlight-start
  return myset.size < arr.length;
  // highlight-end
}

checkDuplicates([1, 2, 3, 4, 5]); // true
checkDuplicates([1, 2, 3, 4, 5, 5]); // false
```

<br />

#### 두 배열의 유일한 항목만 반환

두 배열을 합쳐서 집합으로 변환 후, 그것을 다시 배열로 변환하면 유일한 항목들만 살아남아 반환된다. 두 배열의 길이에 따라 $O(n+m)$의 시간복잡도와 공간복잡도를 만족한다.

```jsx{numberLines: true}
function uniqueList(arr1, arr2) {
  let myset = new Set(arr1.concat(arr2));
  // highlight-start
  return Array.from(myset);
  // highlight-end
}

uniqueList([1, 1, 2, 2], [2, 3, 4, 5]); // [1,2,3,4,5]
uniqueList([1, 2], [3, 4, 5]); // [1,2,3,4,5]
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>
