<template>
  <dialog
    ref="dialogRef"
    class="modal-dialog backdrop:bg-black/50 rounded-lg shadow-xl w-full max-w-md p-0 bg-white"
    @close="onDialogClose"
    @click="onBackdropClick"
  >
    <div class="p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-cyan-900">{{ title }}</h3>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>
      </div>
      <div class="text-sm text-gray-700 space-y-2">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

function close() {
  dialogRef.value?.close()
}

function onDialogClose() {
  emit('update:modelValue', false)
  emit('close')
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) {
    close()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      dialogRef.value?.showModal()
    } else {
      dialogRef.value?.close()
    }
  },
)

onMounted(() => {
  if (props.modelValue) {
    dialogRef.value?.showModal()
  }
})
</script>

<style scoped>
.modal-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog[open] {
  animation: modal-appear 0.2s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
