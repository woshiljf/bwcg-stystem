<template>
  <trade-detail :is-edit="false"/>
</template>

<script>
import tradeDetail from './components/TradeDetail'

export default {
  name: 'CreateForm',
  components: { tradeDetail }
}
</script>

