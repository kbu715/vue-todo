<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
    <Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <h3 slot="header">
        경고!
        <i
          class="fa fa-times closeModalBtn"
          aria-hidden="true"
          @click="showModal = false"
        ></i>
      </h3>
      <div slot="body">무언가를 입력하세요!</div>
      <footer slot="footer">copy right</footer>
    </Modal>
  </div>
</template>
<script>
import Modal from "./common/Modal.vue"

export default {
  data() {
    return {
      newTodoItem: "",
      showModal: false,
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        const text = this.newTodoItem.trim()
        this.$store.commit("addOneItem", text)
        this.clearInput()
      } else {
        this.showModal = !this.showModal
      }
    },
    clearInput() {
      this.newTodoItem = ""
    },
  },
  components: {
    Modal,
  },
}
</script>
<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  display: flex;
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  width: 100%;
  flex-grow: 1;
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}

.addBtn {
  color: white;
  vertical-align: middle;
}

.closeModalBtn {
  color: #42b983;
}
</style>
