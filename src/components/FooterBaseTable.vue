<script>
export default {
  name: 'FooterBaseTable',
  props: {
    data: { type: Array, default: () => [] },
    showLabel: { type: Boolean, default: true },
  },
  emits: ['update-table'],
  computed: {
    registrosLabel() {
      if (this.data.length === 1) return `Exibindo 1 registro.`
      if (this.data.length === 0) return ``
      return `Exibindo ${this.data.length} registros.`
    },
  },
}
</script>

<template>
  <div class="is-flex is-justify-content-space-between">
    <div v-if="showLabel">{{ registrosLabel }}</div>
    <div v-else></div>
    <div>
      <slot name="buttons" />
      <Button
        type="button"
        severity="contrast"
        icon="pi pi-refresh"
        text
        @click="$emit('update-table')"
      />
    </div>
  </div>
</template>

<style scoped></style>
