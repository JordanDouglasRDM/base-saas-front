<script>
import Tag from 'primevue/tag'

export default {
  name: 'TagCustom',
  components: { Tag },
  props: {
    severity: { type: String, default: 'info' },
    value: { type: String },
    rounded: { type: Boolean, default: false },
  },
  computed: {
    tagStyle() {
      if (this.severity === 'help') {
        return {
          backgroundColor: 'var(--p-purple-100)',
          color: 'var(--p-purple-700)',
        }
      }
      return {}
    },
  },
}
</script>

<template>
  <Tag :value :severity="severity !== 'help' ? severity : null" :style="tagStyle" :rounded />
</template>

<style scoped></style>
