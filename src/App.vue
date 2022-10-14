<template>

  <div class="container">
    <div class="row my-5">
      <h1 class="display-4">Reepay transaction organizer</h1>
    </div>

    <div class="row mb-3 justify-content-center">
      <div class="col-lg-10 col-xl-8">
        <div class="input-group">
          <input @change="parseCSV" class="form-control form-control-lg" type="file" placeholder="Upload CSV file">
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10 col-xl-8">
        <OverviewTable :rows="parsedRows"></OverviewTable>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10 col-xl-8">
        <OutputTable :rows="parsedRows"></OutputTable>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import '@/assets/style.scss'
import {defineComponent} from 'vue';
import OverviewTable from '@/components/OverviewTable.vue';
import {Row} from '@/types/row';
import OutputTable from '@/components/OutputTable.vue';

export default defineComponent({
  name: 'App',
  components: {OutputTable, OverviewTable},
  data() {
    return {
      parsedRows: [] as Row[],
    }
  },
  methods: {
    parseCSV(event: Event): void {
      const input = (event.target as HTMLInputElement);

      if (!input.files || input.files.length === 0) {
        return;
      }

      const file = input.files[0];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$papa.parse(file, {
        complete: (results: { data: string[][] }) => {
          console.log(results);
          const filteredData = results.data
              .filter(this.filterRow);

          const rows = []
          for (const row of filteredData) {
            rows.push(this.mapRow(row));
          }

          this.parsedRows = rows
              .sort((a, b) => a.date.getTime() - b.date.getTime());
        }
      });
    },
    filterRow(input: string[]): boolean {
      if (input.length < 15) {
        return false;
      }

      return input[1] !== 'Date';
    },
    mapRow(input: string[]): Row {
      const charged = parseFloat(input[3]);
      const fee = -parseFloat(input[5]);

      return {
        id: Math.random(),
        active: true,
        date: this.mapDate(input[1]),
        type: input[2],
        charged,
        fee,
        transferred: charged - fee,
      };
    },
    mapDate(input: string): Date {
      const year = input.substring(6);
      const month = input.substring(3, 5);
      const day = input.substring(0, 2);
      const iso8601 = `${year}-${month}-${day}`;

      return new Date(Date.parse(iso8601));
    }
  }
});
</script>

<style lang="scss">
</style>
