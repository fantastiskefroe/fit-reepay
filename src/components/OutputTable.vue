<template>
  <div>
    <pre>
      {{ formattedCsv }}
    </pre>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Row} from '@/types/row';

export default defineComponent({
  name: 'OverviewTable',
  props: {
    rows: {type: Object as PropType<Row[]>, required: true}
  },
  computed: {
    formattedCsv() {
      if (this.rows.length === 0) {
        return '';
      }

      const data = this.rows
          .filter(row => row.active)
          .map(this.mapRow);
      data.unshift([
        'Bilag nr.',
        'Dato',
        'Tekst',
        'Konto',
        'Beløb',
        'Modkonto'
      ]);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.$papa.unparse(data, {delimiter: ';'}).trim();
    }
  },
  methods: {
    mapRow(input: Row): string[] {
      return [
        '', //Bilag nr.
        input.date.toISOString(), //Dato
        'Overførsel fra ReePay til Bank', //Tekst
        '55080', //Konto
        (-input.transferred).toString().replace('.', ','), //Beløb
        '55000' //Modkonto
      ];
    }
  }
});
</script>

<style scoped>

</style>