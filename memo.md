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
