---
title: "검색과 정렬"
category: algorithm
path: /algorithm/algorithm22
date: 2021-01-12 14:31:00
---

### 검색

검색은 자료를 얻기 위해 자료 구조의 항목들을 반복적으로 접근하는 것을 의미한다. 검색은 선형 검색과 이진 검색으로 구분할 수 있는데, 이진 검색은 정렬된 자료에 대해 사용해야 하는 한계가 있고 선형 검색은 시간복잡도가 높은 한계가 있다.

#### 선형 검색

배열의 각 항목을 한 인덱스씩 순차적으로 접근하는 방법으로, 반복 루프의 가장 기본 원리이다. 시간복잡도는 $O(n)$이다.

#### 이진 검색

**정렬된 자료**에 대해, **중간 값**을 확인하여 원하는 값보다 해당 중간 값이 큰지 작은지 여부를 확인한다. 원하는 값이 중간 값보다 작은 경우 이진 검색 알고리즘은 중간 값보다 작은 쪽을 검색하고, 원하는 값이 중간 값보다 큰 경우 중간 값보다 큰 쪽을 검색한다.

```jsx
functio binarySearch(array, n) {
  let low = 0,
    high = array.length - 1;

  while (low <= high) {
    // highlight-start
    let mid = Math.floor((low + high) / 2);
    // highlight-end
    if (array[mid] === n) return mid;
    else if (array[mid] < n) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
```

<br />

### 정렬

정렬은 자료 구조의 항목들을 순서대로 위치시키는 것을 의미한다.

#### 버블정렬(Bubble sort)

버블정렬은 전체 배열을 순회하면서, 항목이 다른 항목보다 큰 경우 두 항목을 교환하는 정렬이다. 모든 항목에 대해, 모든 가능한 짝과의 대소비교를 수행해야하기 때문에 가장 최악의 정렬 방법이라고 할 수 있다. 시간복잡도는 $O(n{^2})$, 공간복잡도는 $O(1)$을 만족한다.

```jsx
function bubbleSort(array) {
  const swap = (array, i1, i2) => {
    return ([array[i1], array[i2]] = [array[i2], array[i1]]);
  };

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (array[j] > array[j + 1]) swap(array, i, j);
    }
  }

  return array;
}
```

<br />

#### 선택정렬(Selection sort)

**가장 작은 항목**을 선택하여 해당 항목을 배열의 **현재 위치**와 맞바꾸는 정렬이다. 버블정렬보다 조금 나은 수준의 연산이지만, 여전히 최악의 경우 시간복잡도는 $O(n{^2})$이다. 공간복잡도 역시 버블정렬과 동일하게 $O(1)$이다.

```jsx
function selectionSort(array) {
  const swap = (array, i1, i2) => {
    return ([array[i1], array[i2]] = [array[i2], array[i1]]);
  };

  let min = 0;

  for (let i = 0; i < array.length; i++) {
    // 가장 작은 항목을 현재 위치로 설정
    min = i;

    for (let j = i + 1; j < array.length; j++) {
      // 나머지 중 더 작은 항목이 있다면 가장 작은 항목에 해당 항목을 설정
      if (array[j] < array[min]) min = j;
      // 위의 결과, 현재 위치와 가장 작은 항목이 같지 않다면 스왑
      if (i !== min) swap(array, i, min);
    }
  }

  return array;
}
```

<br />

#### 삽입정렬(Insertion sort)

배열을 순차적으로 검색하면서, 정렬되지 않은 항목들을 **배열의 왼쪽의 정렬된 부분으로 삽입**하는 정렬이다. 선택정렬과 마찬가지로 반복 루프의 중첩 사용으로 인해 시간복잡도는 $O(n{^2})$까지 도달할 수 있으며 공간복잡도는 마찬가지로 $O(1)$이다.

```jsx
function insertionSort(array) {
  let value = 0,
    i = 0, // i: 정렬되지 않은 부분의 인덱스
    j = 0; // j: 정렬된 부분의 인덱스

  for (i = 0; i < array.length; i++) {
    // highlight-start
    value = array[i];

    // 정렬된 부분의 값이 정렬되지 않은 부분의 값보다 큰 경우
    // 정렬된 부분의 모든 항목을 하나씩 뒤로 이동시켜서
    // 값을 삽입할 공간을 만든다
    for (j = i - 1; j > -1 && array[j] > value; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = value;
    // highlight-end
  }

  return array;
}
```

<br />

#### 퀵 정렬(Quick sort)

최초에 배열의 중간값을 **기준점**으로 획득한 다음, 해당 기준점을 기준으로 배열을 나눈다. 기준점의 **왼쪽에는 기준점보다 작은 항목**들을 위치시키고 기준점의 **오른쪽에는 기준점보다 큰 항목**들을 위치시킨다. 이러한 방법으로 모든 항목이 정렬될 때까지 반복한다. 최초 기준점 이후 기준점의 좌, 우측에 모두 기준점을 선정하여 배열을 진행할 것이므로 **분할 정복**이 된다. 아래 그림은 이러한 과정을 요약한 것이다.  
![quicksort](https://user-images.githubusercontent.com/67884699/104813540-1a2fd300-584d-11eb-8a58-2f06819693e6.jpg)  
따라서 기준점을 양 끝쪽에 잡지 않는 한, 시간복잡도는 지금까지의 다른 정렬들과 달리 $O(n{^2})$에서 $O(nlog{_2}{n})$으로 낮아진다. 다만 공간복잡도는 $O(log{_2}{n})$으로, 지금까지의 정렬들보다는 높아지는데 이는 **콜 스택**을 사용하는 것에서 비롯된다.

```jsx
function quickSort(array) {
  // 피벗을 기준으로 분할정복(재귀호출)을 하기 위한 헬퍼함수
  function helper(array, left, right) {
    let index;
    if (array.length > 1) {
      index = partition(array, left, right);
      if (index - 1 > left) helper(array, left, index - 1);
      if (index < right) helper(array, index, right);
    }
    return array;
  }

  // 가운데 항목을 피벗으로 삼아, left와 right 값 비교 후 상호교환 하기 위한 헬퍼함수
  function partition(array, left, right) {
    let pivot = array[Math.floor((left + right) / 2)];
    console.log(
      `array = [${array}] --> left: ${array[left]}, pivot: ${pivot}, right: ${array[right]}`
    );
    while (left <= right) {
      while (pivot > array[left]) left++;
      while (pivot < array[right]) right--;
      if (left <= right) {
        [array[left], array[right]] = [array[right], array[left]];
        left++;
        right--;
      }
    }
    return left;
  }

  // 퀵 정렬 수행 및 결과반환
  return helper(array, 0, array.length - 1);
}

quickSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
/*
  array = [6,1,23,4,2,3] --> left: 6, pivot: 23, right: 3
  array = [6,1,3,4,2,23] --> left: 6, pivot: 3, right: 2
  array = [2,1,3,4,6,23] --> left: 2, pivot: 1, right: 3
  array = [1,2,3,4,6,23] --> left: 2, pivot: 2, right: 3
  array = [1,2,3,4,6,23] --> left: 4, pivot: 4, right: 6
*/
```

<br />

#### 그밖에

퀵 선택(Quick select)은 정렬되지 않은 목록에서 $k$번째로 작은 항목을 찾는 선택 알고리즘이다. 퀵 정렬이 피벗의 양쪽 모두를 재귀적으로 수행하는 것에 비해 퀵 선택은 한쪽만 재귀적으로 수행한다. 따라서 시간복잡도는 $O(n)$으로 더 낮아진다.

병합 정렬(Merge sort)는 각 하위 배열에 하나의 항목이 존재할 때까지 배열을 하위 배열로 나누고 각 하위 배열을 정렬된 순서로 다시 병합하는 알고리즘이다. 시간복잡도는 퀵 정렬과 동일한 $O(nlog{_2}{n})$이지만 공간복잡도는 $O(n)$으로 큰 편이다.

계수 정렬(Coutn sort)은 항목들을 교환하면서 정렬하는 대신에 배열의 각 항목의 등장 횟수를 센다. 따라서 시간복잡도는 $O(k+n)$으로 모든 정렬 중에서 가장 낮다고 할 수 있으며, 공간복잡도 역시 $O(k)$로 매우 낮다. 이러한 계수 정렬은 바로 **객체**(reduce)를 활용한 정렬이다.

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>
