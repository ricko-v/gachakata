<template>
  <Modal v-model="localShowModal" title="Setelan" @close="emit('close')">
    <form @reset.prevent="reset" @submit.prevent="save">
      <label class="text-cyan-900 font-semibold">Kata Kunci</label>
      <input
        minlength="3"
        required
        :value="kataKunci"
        @input="onInput"
        class="border w-full rounded mt-1 px-3 py-2 outline-0 focus:border-cyan-900"
      />
      <small v-if="!isValidQ && kataKunci !== ''" class="text-red-500">
        Minimal 3 huruf diperlukan
      </small>
      <small v-if="kataKunci === '' || isValidQ" class="text-slate-500">
        Masukan nama tokoh atau kata
      </small>
      <div class="flex w-full justify-end mt-4 gap-3">
        <button
          v-if="data"
          type="reset"
          class="bg-red-600 font-semibold text-white px-3 py-2 rounded-lg"
        >
          {{ loadingReset ? 'Mengatur Ulang...' : 'Atur Ulang' }}
        </button>
        <button
          type="submit"
          :disabled="loading || !isValidQ"
          class="bg-cyan-900 font-semibold text-white px-3 py-2 rounded-lg disabled:bg-slate-300"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  showModal: boolean
  data: { kataKunci: string; lastPage?: number } | null
}>()

const emit = defineEmits<{
  close: []
  'update:showModal': [value: boolean]
}>()

const localShowModal = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('update:showModal', val),
})

const kataKunci = ref(props.data?.kataKunci ?? '')
const isValidQ = ref(!!props.data)
const loading = ref(false)
const loadingReset = ref(false)

const cookie = useCookie<{ kataKunci: string; lastPage?: number } | null>('gachakata')

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value.toLowerCase()
  kataKunci.value = val
}

watch(kataKunci, (val) => {
  if (val !== '' && val.length < 3) {
    isValidQ.value = false
  } else {
    isValidQ.value = true
  }
})

function reset() {
  loadingReset.value = true
  cookie.value = null
  window.location.reload()
}

async function save() {
  loading.value = true
  cookie.value = { kataKunci: kataKunci.value }
  await refreshNuxtData()
  loading.value = false
  emit('close')
}
</script>
