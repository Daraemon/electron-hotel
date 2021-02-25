<template>
<div class="layout">
  <a-menu
    class="menu"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapsed"
    @click="handleChangeMenu"
  >
    <template 
      v-for="item in menuReal" 
      :key="item.key"
    >
      <a-sub-menu
        v-if="item.children"
        :key="menuRef[item.key].router"
      >
        <template #title>
          <span><DynamicIcon :iconName="menuRef[item.key].icon" /><span>{{menuRef[item.key].name}}</span></span>
        </template>
        <a-menu-item
          v-for="child in item.children"
          :key="child"
        >
          {{menuRef[child].name}}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item 
        v-else
        :key="menuRef[item.key].router"
      >
        <DynamicIcon :iconName="menuRef[item.key].icon" />
        <span>{{menuRef[item.key].name}}</span>
      </a-menu-item>
    </template>
  </a-menu>
  <div class="content">
    <div class="content-header">
      <a-button class="header-collapsed" type="primary" @click="handleCollapsed" >
        <template #icon>
          <MenuFoldOutlined v-if="!collapsed" />
          <MenuUnfoldOutlined v-else />
        </template>
      </a-button>
      <div class="header-tabs">
        <a-tabs
          class="header-ant-tabs"
          @tabClick="handleTabClick"
          @edit="handleTabRemove"
          v-model:activeKey="tabActiveKey"
          hideAdd
          type="editable-card"
        >
          <a-tab-pane
            v-for="item in tabPanes"
            :key="item"
            :closable="closeabled"
            :tab="menuRef[item].name"
          ></a-tab-pane>
        </a-tabs>

      </div>
    </div>
    <div class="content-body">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { Menu, Button, Tabs, Tag } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import DynamicIcon from '../components/DynamicIcon.vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

const menu: any = {
  RoomManage: {
    name: '房间管理',
    router: 'RoomManage',
    icon: 'PieChartOutlined'
  },
  ProjectManage: {
    name: '项目管理',
    router: 'ProjectManage',
    icon: 'DesktopOutlined'
  },
  WarningManage: {
    name: '告警管理',
    router: 'WarningManage',
    icon: 'InboxOutlined'
  },
  DeviceManage: {
    name: '设备管理',
    router: 'DeviceManage' ,
    icon: 'MailOutlined',
  },
  DeviceManage1: {
    name: '设备管理1',
    router: 'DeviceManage1',
  },
  DeviceManage2: {
    name: '设备管理2',
    router: 'DeviceManage2',
  },
  DeviceManage3: {
    name: '设备管理3',
    router: 'DeviceManage3',
  },
  DeviceManage4: {
    name: '设备管理4',
    router: 'DeviceManage4',
  },
  EmployeeManage: {
    name: '员工管理',
    router: 'EmployeeManage' ,
    icon: 'AppstoreOutlined',
  },
  EmployeeManage1: {
    name: '员工管理1',
    router: 'EmployeeManage1',
  },
  EmployeeManage2: {
    name: '员工管理2',
    router: 'EmployeeManage2',
  },
  SettingManage: {
    name: '配置管理',
    router: 'SettingManage' ,
    icon: 'AppstoreOutlined',
  },
  SettingManage1: {
    name: '配置管理1',
    router: 'SettingManage1',
  },
  SettingManage2: {
    name: '配置管理2',
    router: 'SettingManage2',
  }
}

const realMenu: any = [
  {
    key: 'RoomManage',
  },
  {
    key: 'ProjectManage',
  },
  {
    key: 'WarningManage',
  },
  {
    key: 'DeviceManage',
    children: [
      'DeviceManage1','DeviceManage2','DeviceManage3','DeviceManage4'
    ]
  },
  {
    key: 'EmployeeManage',
    children: ['EmployeeManage1','EmployeeManage2']
  },
  {
    key: 'SettingManage',
    children: ['SettingManage1','SettingManage2']
  }
]

export default defineComponent({
  components: {
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Tabs.TabPane.name]: Tabs.TabPane,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    DynamicIcon
  },
  setup() {
    const router = useRouter()
    const selectedKeys = ref(['RoomManage'])
    const openKeys = ref(['RoomManage'])
    const collapsed = ref(false)
    const testIcon = ref('MailOutlined')

    onMounted(() => {
      router.push('RoomManage')
    })

    function handleChangeMenu(event: any) {
      router.push(event.key)
      if(!tabPanes.includes(event.key)) {
        tabPanes.push(event.key)
      }
      tabActiveKey.value = event.key
    }
    function handleCollapsed() {
      collapsed.value = !collapsed.value
    }

    const menuRef = reactive(menu)
    const menuReal = reactive(realMenu)

    const tabPanes: any[] = reactive([])
    const tabActiveKey:any = ref('RoomManage')
    const closeabled = computed(() => tabPanes.length > 1)
    tabPanes.push('RoomManage')

    function handleTabClick(key: any) {
      console.log('handleTabClick===',key);
      router.push(key)
      selectedKeys.value[0] = key
    }

    function handleTabRemove(targetKey: any, action: any) {
      const index = tabPanes.indexOf(targetKey)
      tabPanes.splice(index, 1)
      if(targetKey === tabActiveKey.value) {
        tabActiveKey.value = tabPanes[tabPanes.length-1]
        router.push(tabActiveKey.value)
        selectedKeys.value[0] = tabActiveKey.value
      }
    }
    
    return {
      selectedKeys,
      openKeys,
      collapsed,
      handleChangeMenu,
      handleCollapsed,
      tabPanes,
      testIcon,
      menuRef,
      menuReal,
      closeabled,
      handleTabClick,
      handleTabRemove,
      tabActiveKey
    }
  },
});
</script>

<style lang="scss" scope>
.layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  .menu {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    .ant-menu-item {
      padding-right: 34px;
    }
  }
  .menu:not(.ant-menu-inline-collapsed) {
    width: 180px;
    min-width: 180px;
  }
  .content {
    flex-grow: 1;
    height: 100%;
  }
  .content-header {
    width: 100%;
    height: 60px;
    position: relative;
    align-items: center;
    display: flex;

    .header-collapsed {
      position: absolute;
      left: 10px;
    }

    .header-tabs {
      position: absolute;
      left: 52px;
      right: 10px;
      display: flex;
      flex-grow: 1;
      flex-direction: row-reverse;
      margin-right: 10px;
      overflow: auto;

      .ant-tabs {
        .ant-tabs-bar {
          margin: 0 !important;
        }
        .header-ant-tabs .ant-tabs-tab {
          height: 20px !important;
          margin-right: 5px !important;
          line-height: 32px !important;
          background: #ffffff !important;
          border: 1px solid #dedede !important;
          border-bottom: 0px solid #f0f0f0 !important;
        }
        .ant-tabs-tab-prev,
        .ant-tabs-tab-next {
          height: 32px !important;
          line-height: 32px !important;
        }
        .ant-tabs-tab-active {
          border: 1px solid #1890ff !important;
          .ant-tabs-close-x {
            color: #1890ff !important;
          }
        }
      }
      
    }

    

  }
}
</style>