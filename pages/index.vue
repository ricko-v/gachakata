<template>
  <div
    class="bg-slate-50 py-10 min-h-screen w-full font-semibold text-cyan-900 flex items-center"
  >
    <div class="w-full">
      <div class="flex justify-center">
        <h1 class="text-5xl tracking-widest">#GachaKata</h1>
      </div>

      <!-- <div class="flex justify-center mt-4 flex-wrap">
        <img
          class="mr-2 my-1"
          alt="?"
          src="https://img.shields.io/badge/github-gachakata-brightgreen?logo=github&style=flat"
        />
        <img
          class="mr-2 my-1"
          alt="?"
          src="https://img.shields.io/github/license/ricko-v/gachakata.svg"
        />
        <img
          class="mr-2 my-1"
          alt="?"
          src="https://img.shields.io/github/issues-pr/ricko-v/gachakata.svg"
        />
        <img
          class="mr-2 my-1"
          alt="?"
          src="https://img.shields.io/github/issues-pr-closed/ricko-v/gachakata.svg"
        />
        <a
          href="https://github.com/ricko-v/gachakata/releases/download/v.2.0.0/gachakata.apk"
        >
          <img
            class="mr-2 my-1"
            alt="?"
            src="https://img.shields.io/badge/download-aplikasi-blue?style=?style=for-the-badge&logo=android"
          />
        </a>
      </div> -->

      <div class="flex justify-center mt-8 w-100">
        <div
          class="border rounded-lg text-center border-stone-100 shadow-sm w-100 mx-4 w-full p-3 bg-white md:w-2/3"
        >
          <div v-if="kata">
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

          <div v-if="!kata">
            <p class="text-left text-4xl">❝</p>
            <i class="text-xl">Kata kunci '{{ cookies }}' tidak ditemukan :(</i
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

      <Info @close="showModalInfo = false" :showModal="showModalInfo" />

      <div class="flex justify-center mt-6 mb-6">
        <button
          @click="!kata ? (showModal = true) : gacha()"
          :disabled="loading"
          class="bg-cyan-900 p-3 rounded text-white rounded-lg"
        >
          - {{ loading ? acak : !kata ? "G A N T I" : "G A C H A" }} -
        </button>
      </div>
    </div>

    <div>
      <FloatingButton
        @onShowModal="showModal = true"
        @onShowModalInfo="showModalInfo = true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  async asyncData({ $axios, app }) {
    let req, res;
    let loading = false;
    let cookies = app.$cookies.get("gachakata");

    if (cookies) {
      let page = cookies.lastPage
        ? `&page=${Math.floor(Math.random() * cookies.lastPage)}`
        : "";
      req = await $axios(`/api/gacha?q=${cookies.kataKunci}${page}`);
      res = req.data.result;
      app.$cookies.set("gachakata", {
        ...cookies,
        lastPage: req.data.lastPaginate,
      });
    } else {
      let random = [
        "Ali bin Abi Thalib",
        "Tere Liye",
        "Albert Einstein",
        "Mahatma Gandhi",
        "Wira Nagara",
        "Boy Candra",
        "Pidi Baiq",
        "Sujiwo Tejo",
        "Fiersa Besari",
        "Joko Pinurbo",
        "Sapardi Djoko Damono",
        "Soekarno",
        "Jatuh Cinta",
        "Patah Hati",
        "Rindu",
        "Hujan",
        "Sepi",
        "Manusia",
        "Doa",
        "Ibu",
      ];
      req = await $axios(
        `/api/gacha?q=${
          random[Math.floor(Math.random() * (random.length - 1))]
        }`
      );
      res = req.data.result;
    }

    if (res.length > 0) {
      return {
        loading: loading,
        kata: res[0],
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
      showModalInfo: false,
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
      this.$router.app.refresh();
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
