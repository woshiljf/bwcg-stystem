<template>
  <trade-detail :is-edit="true"/>
</template>

<script>
import tradeDetail from './components/TradeDetail'

export default {
  name: 'EditForm',
  components: { tradeDetail }
}
</script>

