<template>
  <div class="home">
   <Tinder ref="tinder" key-name="url" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
     <template slot-scope="scope">
       <div class="pic" :style="{'background-image':`url(${scope.data.url})`}" /></template>
   </Tinder>
   <div class="btns">
     <img src="../assets/cross.png" @click="decide('nope')" />
     <img src="../assets/person.png" @click="$router.push('/about')" />
     <img src="../assets/heart.png" @click="decide('like')" />
   </div>
  </div>
</template>

<style scoped>
  #home .vue-tinder {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 23px;
    margin: auto;
    width: calc(100% - 20px);
    height: calc(100% - 23px - 65px - 47px - 16px);
    max-width: 355px;
}

.pic {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}
.btns {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    max-width: 355px;
}
.btns img {
    margin-right: 12px;
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
.btns img:nth-child(2n + 1) {
    width: 53px;
}
.btns img:nth-child(2n) {
    width: 65px;
}
.btns img:nth-child(1) {
    margin-right: 0;
}
@media screen and(max-width: 480px) {
    #home .vue-tinder {
        height: 63%;
        width: 70%;
        top: 8%;
    }
    .btns {
        top: 70%;
    }
}
</style>

<script>
  import Tinder from 'vue-tinder';
  import firebase from 'firebase';
  export default {
    data() {
      return {
        queue: [],
        offset: 0,
        people: []
      };
    },
    methods: {
      mock() {
        let count = 5;
        const list = [];
        for (let i = 0; i < count; i++) {
          list.push({ url:this.people[this.offset].url});
          this.offset++;
        }
        this.queue = this.queue.concat(list);
      },
      async getImage() {
        this.people = [];
        var db = firebase.firestore();
        const data = await
        db.collection("people").get();
        data.docs.forEach(element => {
          this.people.push(element.data());
        });
      },
      async onSubmit(choice) {
        if (this.queue.length < 3) {
          this.mock();
        }
        var db = firebase.firestore();
        const data = await db
        .collection("likes")
        .where("url", "==", choice.item.url)
        .where("email", "==", this.$store.state.user.email)
        .get();
        if(data.empty && choice.type == "like") {
          await db.collection("likes").add({
            email: this.$store.state.user.email,
            url: choice.item.url
          });
        }
        if (!data.empty && choice.type == "nope") {
          await db
          .collection("likes")
          .doc(data.docs[0].id)
          .delete();
        }
      },
      decide(choice) {
        this.$refs.tinder.decide(choice);
      }
    }
  };
</script>
