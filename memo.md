## Vuex 기술 요소

- state: 여러 컴포넌트에 공유되는 데이터 data
- getters: 연산된 state값을 접근하는 속성 computed
- mutations: state값을 변경하는 이벤트 로직 / 메서드 methods
- actions: 비동기 처리 로직을 선언하는 메서드 async methods

### state란

```javascript
// Vue
data: {
  message: "Hello Vue.js!"
}

// Vuex
state: {
  message: "Hello Vuex!"
}
```

```
<!-- Vue -->
<p>{{ message }}</p>

<!-- Vuex -->
<p>{{ this.$store.state.message }}</p>
```

### getters란?

- state값을 접근하는 속성이자 computed() 처럼 미리 연산된 값을 접근하는 속성

```javascript
// store.js
state: {
  num: 10
},
getters: {
  getNumber(state) {
    return state.num;
  },
  doubleNumber(state) {
    return state.num * 2;
  }
}
```

```javascript
  <p>{{ this.$store.getters.getNumber }}</p>
  <p>{{ this.$store.getters.doubleNumber }}</p>
```

### mutations란?

- state의 값을 변경할 수 있는 **유일한 방법**이자 메서드
- 뮤테이션은 commit() 으로 동작시킨다.

- state를 변경하기 위해 mutations를 동작시킬 때 인자(payload)를 전달할 수 있다.

```javascript
// store.js
state: {
  num: 10
},
mutations: {
  printNumbers(state) {
    return state.num;
  },
  sumNumbers(state, anotherNum) {
    return state.num + anotherNum;
  },

  //
  //
  //

  modifyState(state, payload) {
    console.log(payload.str);
    return state.num += payload.num;
  }

}


// App.vue
this.$store.commit('printNumbers'); // 10
this.$store.commit('sumNumbers', 20); // 30

//
//
//

this.$store.commit('modifyState', {
  str: 'passed from payload',
  num: 20
})
```

### state는 왜 직접 변경하지 않고 mutations로 변경할까?

- 여러개의 컴포넌트에서 아래와 같이 state 값을 변경하는 경우 **어느 컴포넌트에서 해당 state를 변경했는지 추적하기가 어렵다.**

```javascript
methods: {
  increaseCounter() {
    this.$store.state.counter++;
  }
}
```

- 특정 시점에 어떤 컴포넌트가 state를 접근하여 변경한 건지 확인하기 어렵기 때문
- 따라서, 뷰의 반응성을 거스르지 않게 명시적으로 상태변화를 수행. **반응성, 디버깅, 테스팅혜택**

### actions란?

- 비동기 처리 로직을 선언하는 메서드. 비동기 로직을 담당하는 mutations
- 데이터 요청, **Promise**, ES6 async과 같은 **비동기 처리**는 모두 actions에 선언

```javascript
// store.js
state: {
  num: 10
},
mutations: {
  doubleNumber(state) {
    state.num * 2;
  }
},
actions: {
  delayDoubleNumber(context) { // context로 store의 메서드와 속성 접근
    context.commit('doubleNumber');
  }
}

// App.vue
this.$store.dispatch('delayDoubleNumber');
```

#### actions 비동기 코드 예제 1

```javascript
// store.js
mutations: {
  addCounter(state) {
    state.number++
  },
},
actions: {
  delayedAddCounter(context) {
    setTimeout(() => context.commit('addCounter'), 2000); // 2초후 증가
  }
}

// App.vue
methods: {
  incrementCounter() {
    this.$store.dispatch('delayedAddCounter');
  }
}
```

#### actions 비동기 코드 예제 2

```javascript
// store.js
mutations: {
  setData(state, fetchedData) {
      state.product = fetchedData;
  }
},
actions: {
  fetchProductData(context) {
    return axios.get('https://domain.com/products/1')
                .then(response => context.commit('setData', response));
  }
}

// App.vue
methods: {
  getProduct() {
    this.$store.dispatch('fetchProductData');
  }
}
```

### 왜 비동기 처리 로직은 actions에 선언해야 할까?

- 여러개의 컴포넌트에서 mutations로 시간 차를 두고 state를 변경하는 경우
  - 결론 : state 값의 변화를 추적하기 어렵기 때문에 mutations 속성에는 동기 처리 로직만 넣어야 한다!!!


### 각 속성들을 더 쉽게 사용하는 방법 - Helper

Store에 있는 아래 4가지 속성들을 간편하게 코딩하는 방법

- state > mapState
- getters > mapGetters
- mutations > mapMutations
- actions > mapActions


```javascript

// ...

export default { // store의 'num'을 this.num 으로 사용가능해진다 (vue에서 권고함!)
  computed() { ...mapState(['num']), mapGetters(['countedNum']) },
  methods: { ...mapMutations(['clickBtn']), mapActions(['asyncClickBtn']) }
}

```

### mapState

- Vuex에 선언한 state 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```javascript
// App.vue

import { mapState } from 'vuex'

computed() {
    ...mapState(['num'])
    // num() { return this.$store.state.num; }
}

// store.js
state: {
  num: 10
}
```

```javascript
  // <p>{{ this.$store.state.num }}</p>
  <p>{{ this.num }}</p>
```


### mapGetters

- Vuex에 선언한 getters 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```javascript
// App.vue

import { mapGetters } from 'vuex'

computed() {
    ...mapGetters(['reverseMessage'])
}

// store.js
getters: {
  reverseMessage(state) {
    return state.msg.split('').reverse().join('');
  }
}
```

```javascript
  // <p>{{ this.$store.getters.reverseMessage }}</p>
  <p>{{ this.reverseMessage }}</p>
```


### mapMutations

- Vuex에 선언한 mutations 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```javascript
// App.vue
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations(['clickBtn']),
  authLogin() {},
  displayTable() {}
}


// store.js
mutations: {
  clickBtn(state) {
    alert(state.msg);
  }
}
```

```html
<button @click="clickBtn">popup message</button>
```

### mapActions

- Vuex에 선언한 actions 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```javascript
// App.vue
import { mapActions } from 'vuex'

methods: {
  ...mapActions(['delayClickBtn']),
}


// store.js
mutations: {
  delayClickBtn(context) {
    setTimeout(() => context.commit('clickBtn'), 2000);
  }
}
```

```html
<button @click="delayClickBtn">delay popup message</button>
```

### 헬퍼의 유연한 문법

- Vuex에 선언한 속성을 그대로 컴포넌트에 연결하는 문법

```javascript
// 배열 리터럴
...mapMutations([
  'clickBtn', // 'clickBtn': clickBtn
  'addNumber' // addNumber(인자) // 인자를 표현을 안해도 알아서 넘겨준다!
])
```

- Vuex에 선언한 속성을 컴포넌트의 특정 메서드에다가 연결하는 문법

```javascript
// 객체 리터럴
...mapMutations({
  popupMsg: 'clickBtn' // 컴포넌트 메서드 명 : Store의 뮤테이션 명
})
```