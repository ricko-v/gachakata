<template>
  <Modal v-model="localShowModal" title="Informasi Projek" @close="emit('close')">
    <p>Halo teman-teman semua 👋</p>
    <p>
      Kali ini saya membuat sebuah mini projek open source dengan nama
      "GachaKata". Projek GachaKata ini dibuat dengan
      <a href="https://nuxt.com/" target="_blank" class="text-blue-600">Nuxtjs</a>
      dan
      <a href="https://tailwindcss.com/" target="_blank" class="text-blue-600">Tailwindcss</a>.
    </p>
    <p>
      Projek GachaKata sangatlah simple, hanya menggacha sebuah kata dari
      tokoh-tokoh dunia. Jika teman-teman ingin berkontribusi untuk menambah
      fitur, silahkan menuju ke repositori projek
      <a
        href="https://github.com/ricko-v/gachakata"
        target="_blank"
        class="text-blue-600"
      >GachaKata</a>
      👈
    </p>
    <p>
      API? tentu saja sudah saya buatkan di
      <a
        class="text-blue-600"
        href="https://gachakata.vercel.app/api/gacha?q=manusia"
        target="_blank"
      >api/gacha?q={kata_kunci}</a>
    </p>
    <p class="text-center mt-4 text-slate-600">
      @2023 by
      <a href="https://github.com/ricko-v" class="text-blue-600" target="_blank">ricko-v</a>
    </p>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  showModal: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:showModal': [value: boolean]
}>()

const localShowModal = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('update:showModal', val),
})
</script>
