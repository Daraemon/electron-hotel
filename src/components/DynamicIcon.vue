<template>
  <MenuFoldOutlined v-if="iconName === 'MenuFoldOutlined'" />
  <MenuUnfoldOutlined v-if="iconName === 'MenuUnfoldOutlined'" />
  <PieChartOutlined v-if="iconName === 'PieChartOutlined'" />
  <MailOutlined v-if="iconName === 'MailOutlined'" />
  <DesktopOutlined v-if="iconName === 'DesktopOutlined'" />
  <InboxOutlined v-if="iconName === 'InboxOutlined'" />
  <AppstoreOutlined v-if="iconName === 'AppstoreOutlined'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  props: {
    iconName: String,
  },
  setup() {

    return {
    }
  },
});
</script>

<style lang="scss" scope>
</style>