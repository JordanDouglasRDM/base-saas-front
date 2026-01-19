<script>
export default {
  name: 'TagStrong',
  props: {
    severity: { type: String, default: 'info' },
    value: { type: String },
    padding: { type: String, default: 'px-2' },
  },
  computed: {
    getSeverityColor() {
      let color = 'info'
      if (this.severity === 'danger') color = 'var(--p-red-500)'
      if (this.severity === 'success') color = 'var(--p-green-500)'
      if (this.severity === 'help') color = 'var(--p-purple-500)'
      if (this.severity === 'info') color = 'var(--p-sky-500)'
      if (this.severity === 'warn') color = 'var(--p-orange-500)'
      return 'background-color: ' + color + '; color: white;'
    },
  },
}
</script>

<template>
  <p
    :class="[padding, 'is-size-7', 'has-text-weight-bold', 'is-align-self-center']"
    :style="[
      getSeverityColor,
      'border-radius: 6px',
      'padding-top: .08rem',
      'padding-bottom: .08rem',
    ]"
  >
    {{ value }}
  </p>
</template>

<style scoped></style>
