<template>
  <div
    class="bg-slate-50 min-h-screen w-full font-semibold text-cyan-900 flex items-center"
  >
    <div class="w-full">
      <div class="flex justify-center">
        <h1 class="text-5xl tracking-widest">#GachaKata</h1>
      </div>

      <div class="flex justify-center mt-4">
        <a class="mr-1" href="https://github.com/nyancodeid/quotes"
          ><img
            src="https://img.shields.io/badge/github-gachakata-brightgreen?logo=github&amp;style=flat"
            width="109"
            height="20"
            alt="Repository"
        /></a>
      </div>

      <div class="flex justify-center mt-8 w-100">
        <div
          class="border rounded-lg text-center border-stone-100 shadow-sm w-100 mx-4 w-full p-3 bg-white md:w-2/3"
        >
          <div v-if="kata.q">
            <p class="text-left text-4xl">❝</p>
            <i class="text-xl">{{
              loading ? randomEffectQ(kata.q) : kata.q
            }}</i>
            <p class="text-right text-4xl leading-4 mt-[20px]">❞</p>
            <p class="text-left leading-4">
              <span class="text-neutral-600">{{
                loading ? randomEffectQ(kata.nama) : kata.nama
              }}</span>
              <br />
              <small class="text-neutral-500">{{
                loading ? randomEffectQ(kata.keterangan) : kata.keterangan
              }}</small>
              <br />
              <small class="text-neutral-500">{{
                loading ? randomEffectQ(kata.sumber) : kata.sumber
              }}</small>
            </p>
          </div>

          <div v-if="!kata.q">
            <p class="text-left text-4xl">❝</p>
            <i class="text-xl"
              >Kata kunci '{{ cookies.kataKunci }}' tidak ditemukan :(</i
            >'
            <p class="text-right text-4xl leading-4 mt-[20px]">❞</p>
          </div>
        </div>
      </div>

      <Settings
        :data="cookies"
        @close="showModal = false"
        :showModal="showModal"
      />

      <div class="flex justify-center mt-6 mb-6">
        <button
          @click="gacha"
          :disabled="loading || !kata.q"
          class="bg-cyan-900 p-3 rounded text-white rounded-lg"
        >
          - {{ loading ? acak : "G A C H A" }} -
        </button>
      </div>
    </div>

    <div>
      <FloatingButton @click="showModal = true" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  async asyncData({ $axios, app }) {
    let req, res, a;
    let loading = false;
    let cookies = app.$cookies.get("gachakata");

    if (cookies) {
      let page = cookies.lastPage
        ? `&page=${Math.floor(Math.random() * cookies.lastPage)}`
        : "";
      req = await $axios(
        `https://jkscrapper.vercel.app/cari?q=${cookies.kataKunci}${page}`
      );
      res = req.data.data.result;
      app.$cookies.set("gachakata", {
        ...cookies,
        lastPage: req.data.data.lastPaginate,
      });
    } else {
      req = await $axios("https://jkscrapper.vercel.app/acak");
      res = req.data.data;
    }

    if (res.length > 0) {
      a = Math.floor(Math.random() * res.length);
      return {
        loading: loading,
        kata: res[a],
        cookies: cookies,
      };
    } else {
      return {
        loading: loading,
        kata: {},
        cookies: cookies,
      };
    }
  },

  data() {
    return {
      acak: "",
      loading: false,
      showModal: false,
    };
  },

  mounted() {
    setInterval(() => {
      this.randomEffect();
    }, 100);
  },

  methods: {
    gacha() {
      this.loading = true;
      // this.$nuxt.refresh();
      window.location.reload();
    },
    randomEffect() {
      let string = "GACHA";
      let a = "";

      for (let i = 0; i < 5; i++) {
        a += " " + string[Math.floor(Math.random() * string.length)];
      }

      this.acak = a;
    },
    randomEffectQ(x) {
      let string = x;
      let a = "";

      for (let i = 0; i < x.length - 1; i++) {
        a += " " + string[Math.floor(Math.random() * string.length)];
      }

      return a;
    },
  },
};
</script>
