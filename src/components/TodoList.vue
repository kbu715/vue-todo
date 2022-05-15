<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.todoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <div>
          <i
            class="checkBtn fas fa-check"
            v-bind:class="{ checkBtnCompleted: todoItem.completed }"
            v-on:click="toggleComplete({todoItem, index})"
          ></i>
          <span v-bind:class="{ textCompleted: todoItem.completed }">{{
            todoItem.item
          }}</span>
        </div>
        <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    // 암묵적으로 인자를 넘긴다.
    ...mapMutations({
      removeTodo: 'removeOneItem', // removeOneItem({ todoItem, index })
      toggleComplete: 'toggleOneItem'
    })

    // removeTodo(todoItem, index) {
    //   this.$store.commit("removeOneItem", { todoItem, index })
    // },
    // toggleComplete(todoItem, index) {
    //   this.$store.commit("toggleOneItem", { todoItem, index })
    // },
  },
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedTodoItems;
    // }

    // (컴포넌트 메서드명: store의 뮤테이션 명)이 서로 같을 때 축약형
    // ...mapGetters(['storedTodoItems'])

    // (컴포넌트 메서드명: store의 뮤테이션 명)이 서로 다를 때 이렇게 사용한다.
    ...mapGetters({
      todoItems: 'storedTodoItems'
    })
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.removeBtn {
  color: #de4343;
}

/* 리스트 아이템 트랜지션 효과 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
