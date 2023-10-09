<template>
  <vue-modal @close="$emit('close', true)" v-model="showModal" title="Setelan">
    <form @reset="reset" @submit="save">
      <label class="text-cyan-900 font-semibold">Kata Kunci</label>
      <input
        min="3"
        required
        v-model="kataKunci"
        class="border w-full rounded mt-1 px-3 py-2 outline-0 focus:border-cyan-900"
      />
      <small v-if="!isValidQ && kataKunci != ''" class="text-red-500"
        >Minimal 3 huruf diperlukan</small
      >
      <small v-if="kataKunci == '' || isValidQ" class="text-slate-500"
        >Masukan nama tokoh atau kata</small
      >
      <div class="flex w-full justify-end mt-4 gap-3">
        <button
          v-if="data"
          type="reset"
          class="bg-red-600 font-semibold text-white px-3 py-2 rounded-lg"
        >
          {{ loadingReset ? "Mengatur Ulang..." : "Atur Ulang" }}
        </button>
        <button
          type="submit"
          :disabled="loading || !isValidQ"
          class="bg-cyan-900 font-semibold text-white px-3 py-2 rounded-lg disabled:bg-slate-300"
        >
          {{ loading ? "Menyimpan..." : "Simpan" }}
        </button>
      </div>
    </form>
  </vue-modal>
</template>

<script>
export default {
  props: ["showModal", "data"],
  data() {
    return {
      isValidQ: this.data ? true : false,
      kataKunci: this.data ? this.data.kataKunci : "",
      loading: false,
      loadingReset: false,
    };
  },

  methods: {
    reset() {
      this.loadingReset = true;
      this.$cookies.remove("gachakata");

      window.location.reload();
    },
    save(e) {
      this.loading = true;
      e.preventDefault();

      this.$cookies.set(
        "gachakata",
        {
          kataKunci: this.kataKunci,
        },
        {
          path: "/",
        }
      );

      window.location.reload();
    },
  },

  watch: {
    kataKunci: function (val) {
      if (val !== "" && val.length < 3) {
        this.isValidQ = false;
      } else {
        this.isValidQ = true;
      }

      this.kataKunci = val.toLowerCase();
    },
  },
};
</script>
