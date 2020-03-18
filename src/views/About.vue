<template>
  <div id="about">
    <div class="flex arrow">
      <p @click="$router.push('/')">&It;</p>
      <h1>{{$store.state.user.displayName}}さん</h1>
      <p></p>
    </div>
    <h2>お気に入りリスト</h2>
    <div class="flex">
      <div v-for="(data,index) in likes" :key="index" class="card">
        <img :src="data.url" alt />
        <p>{{data.name}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #about {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    overflow: scroll;
    height: 100vh;
}
.arrow p {
    font-size: 30px;
    cursor: pointer;
}
img {
    height: 350px;
}
.flex {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.card {
    margin-bottom: 10px;
}
h2 {
    margin: 10px;
}
</style>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      likes: []
    };
  },
  async created() {
    await this.getImage();
  },
  methods: {
    async getImage() {
      this.likes = [];
      var db = firebase.firestore();
      const data = await db
      .collection("likes")
      .where("email", "==", this.$store.state.user.email)
      .get();
      for(let i = 0; i < data.docs.length; i++) {
        const like = await db
        .collection("people")
        .where("url", "==", data.docs[i].data().url)
        .get();
        this.likes.push(like.docs[0].data());
      }
    }
  }
};
</script>
