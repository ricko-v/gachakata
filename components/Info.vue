<template>
  <vue-modal
    @close="$emit('close', true)"
    v-model="showModal"
    title="Informasi Projek"
  >
    <p>Halo teman-teman semua 👋</p>
    <p>
      Kali ini saya membuat sebuah mini projek open source dengan nama
      "GachaKata". Projek GachaKata ini dibuat dengan
      <a href="https://v2.nuxt.com/" target="_blank" class="text-blue-600"
        >Nuxtjs</a
      >
      dan
      <a href="https://tailwindcss.com/" target="_blank" class="text-blue-600"
        >Tailwindcss</a
      >.
    </p>
    <p>
      Projek GachaKata sangatlah simple, hanya menggacha sebuah kata dari
      tokoh-tokoh dunia. Jika teman-teman ingin berkontribusi untuk menambah
      fitur, silahkan menuju ke repositori projek
      <a
        href="https://github.com/ricko-v/gachakata"
        target="_blank"
        class="text-blue-600"
        >GachaKata</a
      >
      👈
    </p>
    <p>
      API? tentu saja sudah saya buatkan di
      <a
        class="text-blue-600"
        href="https://gachakata.vercel.app/api/gacha?q=manusia"
        target="_blank"
        >api/gacha?q={kata_kunci}</a
      >
    </p>
    <p class="text-center mt-4 text-slate-600">
      @2023 by
      <a href="https://github.com/ricko-v" class="text-blue-600" target="_blank"
        >ricko-v</a
      >
    </p>
  </vue-modal>
</template>

<script>
export default {
  props: ["showModal"],
};
</script>
