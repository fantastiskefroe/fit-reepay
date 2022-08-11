<template>
  <div>
    <div class="input-group">
      <input class="form-control form-control-lg" type="date" placeholder="Choose earliest date to include" @change="updateEarliestDate">
    </div>

    <table class="row table table-striped w-100 d-block d-md-table table-responsive">
      <thead>
        <tr>
          <th scope="col">Selected</th>
          <th scope="col">Date</th>
          <th scope="col">Type</th>
          <th scope="col">Charged</th>
          <th scope="col">Fee</th>
          <th scope="col">Transferred</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td><input type="checkbox" :name="'active-'+row.id" :id="'cb:active-'+row.id" v-model="row.active"></td>
          <td>{{ row.date.toDateString() }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.charged }}</td>
          <td>{{ row.fee }}</td>
          <td>{{ row.transferred }}</td>
        </tr>
      </tbody>
    </table>
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
  data() {
    return {
      earliestDate: new Date() as Date,
    }
  },
  methods: {
    updateEarliestDate(event: Event): void {
      const input = (event.target as HTMLInputElement);

      this.earliestDate = new Date(input.value)
      for (const row of this.rows) {
        if (row.active) {
          row.active = row.date >= this.earliestDate;
        }
      }
    }
  }
});
</script>

<style scoped>

</style>