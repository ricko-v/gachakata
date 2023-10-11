<template>
  <vue-modal
    @close="$emit('close', true)"
    v-model="showModal"
    title="Informasi Projek"
  >
    <p>Halo teman-teman semua 👋</p>
  </vue-modal>
</template>

<script>
export default {
  props: ["showModal"],
};
</script>
