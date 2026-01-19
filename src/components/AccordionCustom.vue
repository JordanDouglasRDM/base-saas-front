<script>
export default {
  name: 'AccordionCustom',
  props: {
    header: { type: String, default: 'Filtros' },
  },
}
</script>

<template>
  <Accordion value="0">
    <AccordionPanel value="0">
      <AccordionHeader>
        {{ header }}
      </AccordionHeader>
      <AccordionContent>
        <div class="p-2">
          <slot name="content"> </slot>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style>
.p-accordionheader {
  background-color: var(--p-surface-300) !important;
  padding: 0.4rem !important;
}
.p-accordionpanel {
  border: solid 1px var(--p-surface-300) !important;
  border-radius: 6px !important;
}
.p-accordioncontent-content {
  padding: 0 !important;
  border-radius: 6px !important;
}
</style>
