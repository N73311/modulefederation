<template>
  <div class="p-grid p-fluid dashboard">
    <!-- Framework Integration Banner -->
    <div class="p-col-12">
      <div class="integration-banner">
        <div class="banner-content">
          <h2>🚀 Vue 3 + PrimeVue Running Inside React!</h2>
          <p>This dashboard is a Vue 3 application loaded as a remote module into the React host container.</p>
          <div class="tech-badges">
            <span class="badge vue">Vue {{ vueVersion }}</span>
            <span class="badge primevue">PrimeVue 3.x</span>
            <span class="badge webpack">Webpack Module Federation</span>
            <span class="badge remote">Remote Module</span>
          </div>
          <p class="integration-note">
            Notice: No iframe, no hacks - just seamless runtime integration. Both frameworks share the same DOM!
          </p>
        </div>
      </div>
    </div>

    <div class="p-col-12 p-lg-4">
      <div class="card summary">
        <span class="title">Active Modules</span>
        <span class="detail">Currently loaded micro-frontends</span>
        <span class="count visitors">4</span>
      </div>
    </div>
    <div class="p-col-12 p-lg-4">
      <div class="card summary">
        <span class="title">Sales</span>
        <span class="detail">Number of purchases</span>
        <span class="count purchases">534</span>
      </div>
    </div>
    <div class="p-col-12 p-lg-4">
      <div class="card summary">
        <span class="title">Revenue</span>
        <span class="detail">Income for today</span>
        <span class="count revenue">$3,200</span>
      </div>
    </div>

    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #007be5; color: #00448f">
          <span>TV</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-search"></i>
          <span>Total Queries</span>
          <span class="count">523</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #ef6262; color: #a83d3b">
          <span>TI</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-question-circle"></i>
          <span>Total Issues</span>
          <span class="count">81</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #20d077; color: #038d4a">
          <span>OI</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-filter"></i>
          <span>Open Issues</span>
          <span class="count">21</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #f9c851; color: #b58c2b">
          <span>CI</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-check"></i>
          <span>Closed Issues</span>
          <span class="count">60</span>
        </div>
      </div>
    </div>

    <div class="p-col-12 p-md-6 p-lg-4">
      <Panel header="Tasks" style="height: 100%">
        <ul class="task-list">
          <li>
            <Checkbox name="task" value="reports" v-model="tasksCheckbox" />
            <span class="task-name">Sales Reports</span>
            <i class="pi pi-chart-bar" />
          </li>
          <li>
            <Checkbox name="task" value="invoices" v-model="tasksCheckbox" />
            <span class="task-name">Pay Invoices</span>
            <i class="pi pi-dollar" />
          </li>
          <li>
            <Checkbox name="task" value="dinner" v-model="tasksCheckbox" />
            <span class="task-name">Dinner with Tony</span>
            <i class="pi pi-user" />
          </li>
          <li>
            <Checkbox name="task" value="meeting" v-model="tasksCheckbox" />
            <span class="task-name">Client Meeting</span>
            <i class="pi pi-users" />
          </li>
          <li>
            <Checkbox name="task" value="theme" v-model="tasksCheckbox" />
            <span class="task-name">New Theme</span>
            <i class="pi pi-globe" />
          </li>
          <li>
            <Checkbox name="task" value="flight" v-model="tasksCheckbox" />
            <span class="task-name">Flight Ticket</span>
            <i class="pi pi-briefcase" />
          </li>
        </ul>
      </Panel>
    </div>

    <div class="p-col-12 p-md-6 p-lg-4 p-fluid contact-form">
      <Panel header="Contact Us">
        <div class="p-grid">
          <div class="p-col-12">
            <Dropdown
              v-model="dropdownCity"
              :options="dropdownCities"
              optionLabel="name"
              placeholder="Select a City"
            />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Name" />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Age" />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Message" />
          </div>
          <div class="p-col-12">
            <Button type="button" label="Send" icon="pi pi-envelope" />
          </div>
        </div>
      </Panel>
    </div>

    <!-- <div class="p-col-12 p-lg-4 contacts">
      <Panel header="Contacts">
        <ul>
          <li>
            <button class="p-link">
              <span class="name">Claire Williams</span>
              <span class="email">clare@primevue.com</span>
            </button>
          </li>
          <li>
            <button class="p-link">
              <span class="name">Jason Dourne</span>
              <span class="email">jason@primevue.com</span>
            </button>
          </li>
          <li>
            <button class="p-link">
              <span class="name">Jane Davidson</span>
              <span class="email">jane@primevue.com</span>
            </button>
          </li>
          <li>
            <button class="p-link">
              <span class="name">Tony Corleone</span>
              <span class="email">tony@primevue.com</span>
            </button>
          </li>
        </ul>
      </Panel>
    </div> -->

    <div class="p-col-12 p-lg-4">
      <Panel header="Activity" style="height: 100%">
        <div class="activity-header">
          <div class="p-grid">
            <div class="p-col-6">
              <span style="font-weight: bold">Last Activity</span>
              <p>Updated 1 minute ago</p>
            </div>
            <div class="p-col-6" style="text-align: right">
              <Button label="Refresh" icon="pi pi-refresh" />
            </div>
          </div>
        </div>

        <ul class="activity-list">
          <li>
            <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
              <h5 class="activity p-m-0">Income</h5>
              <div class="count">$900</div>
            </div>
            <ProgressBar :value="95" :showValue="false" />
          </li>
          <li>
            <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
              <h5 class="activity p-m-0">Tax</h5>
              <div class="count" style="background-color: #f9c851">$250</div>
            </div>
            <ProgressBar :value="24" :showValue="false" />
          </li>
        </ul>
      </Panel>
    </div>

    <div class="p-col-12 p-lg-6">
      <div class="card">
        <h1 style="font-size: 16px">Recent Sales</h1>
        <DataTable
          :value="products"
          class="p-datatable-customers"
          :rows="5"
          style="margin-bottom: 20px"
          :paginator="true"
        >
          <Column>
            <template #header> Logo </template>
            <template #body="slotProps">
              <img
                :src="'assets/layout/images/product/' + slotProps.data.image"
                :alt="slotProps.data.image"
                width="50"
              />
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="true"></Column>
          <Column field="category" header="Category" :sortable="true"></Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column>
            <template #header> View </template>
            <template #body>
              <Button
                icon="pi pi-search"
                type="button"
                class="p-button-success p-mr-2 p-mb-1"
              ></Button>
              <Button
                icon="pi pi-times"
                type="button"
                class="p-button-danger p-mb-1"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="p-col-12 p-lg-6">
      <div class="card">
        <h1 style="font-size: 16px">Module Federation Performance Metrics</h1>
        <Chart type="line" :data="lineData" />
        <p style="font-size: 12px; color: #666; margin-top: 10px;">
          Real-time metrics showing load times and bundle sizes for each micro-frontend module.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { version } from 'vue';
import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';

export default {
  components: {
    ProgressBar,
    Checkbox,
    Panel,
    Dropdown,
    InputText,
    Button,
    Column,
    DataTable,
    Chart,
  },
  data() {
    return {
      vueVersion: version,
      tasksCheckbox: [],
      dropdownCities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
      dropdownCity: null,
      options: {
        defaultDate: '2019-01-01',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true,
      },
      events: null,
      products: null,
      selectedProducts: null,
      lineData: {
        labels: [
          'Container',
          'Marketing',
          'Auth',
          'Dashboard',
          'Shared Deps',
          'Total Bundle',
        ],
        datasets: [
          {
            label: 'Load Time (ms)',
            data: [45, 120, 95, 145, 30, 435],
            fill: false,
            backgroundColor: '#61dafb',
            borderColor: '#61dafb',
          },
          {
            label: 'Bundle Size (KB)',
            data: [234, 156, 98, 189, 342, 1019],
            fill: false,
            backgroundColor: '#4fc08d',
            borderColor: '#4fc08d',
          },
        ],
      },
    };
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.p-datatable) {
    &.p-datatable-customers {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr {
        border-bottom: 1px solid #dee2e6;
        > td {
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0 none !important;
          width: 100% !important;
          float: left;
          clear: left;
          border: 0 none;

          .p-column-title {
            padding: 0.4rem;
            min-width: 30%;
            display: inline-block;
            margin: -0.4rem 1rem -0.4rem -0.4rem;
            font-weight: bold;
          }

          .p-progressbar {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
}
$fontSize: 14px;
$bodyBgColor: #edf0f5;
$textColor: #333333;
$textSecondaryColor: #707070;
$borderRadius: 3px;
$dividerColor: #e3e3e3;
$transitionDuration: 0.2s;
$maskBgColor: #424242;
$focusShadowColor: #8dcdff;

/* Menu Common */
$menuitemBadgeBgColor: #007be5;
$menuitemBadgeColor: #ffffff;
$submenuFontSize: 13px;
$menuitemActiveRouteColor: #1fa1fc;

/* Menu Light */
$menuBgColorFirst: #f3f4f9;
$menuBgColorLast: #d7dbe8;
$menuitemColor: #232428;
$menuitemHoverColor: #0388e5;
$menuitemActiveColor: #0388e5;
$menuitemActiveBgColor: #ffffff;
$menuitemBorderColor: rgba(207, 211, 224, 0.6);

/* Menu Dark */
$menuDarkBgColorFirst: #4d505b;
$menuDarkBgColorLast: #3b3e47;
$menuitemDarkColor: #ffffff;
$menuitemDarkHoverColor: #0388e5;
$menuitemDarkActiveColor: #0388e5;
$menuitemDarkActiveBgColor: #2e3035;
$menuitemDarkBorderColor: rgba(52, 56, 65, 0.6);

/* Topbar */
$topbarLeftBgColor: #0388e5;
$topbarRightBgColor: #07bdf4;
$topbarItemBadgeBgColor: #ef6262;
$topbarItemBadgeColor: #ffffff;
$topbarItemColor: #ffffff;
$topbarItemHoverColor: #c3e8fb;
$topbarSearchInputBorderBottomColor: #ffffff;
$topbarSearchInputColor: #ffffff;

.card {
  background-color: #ffffff;
  padding: 1em;
  margin-bottom: 16px;
  border-radius: $borderRadius;

  &.card-w-title {
    padding-bottom: 2em;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1.5rem 0 1rem 0;
  font-family: inherit;
  font-weight: normal;
  line-height: 1.2;
  color: inherit;

  &:first-child {
    margin-top: 0;
  }
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
}
@mixin icon-override($icon) {
  &:before {
    content: $icon;
  }
}

@mixin linear-gradient($top, $bottom) {
  background: $top; /* Old browsers */
  background: linear-gradient(to bottom, $top 0%, $bottom 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
}

@mixin linear-gradient-left($left, $right) {
  background: $left; /* Old browsers */
  background: linear-gradient(to right, $left 0%, $right 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$left, endColorstr=$right,GradientType=1 ); /* IE6-9 */
}

@mixin opacity($opacity) {
  opacity: $opacity;
  $opacity-ie: $opacity * 100;
  filter: alpha(opacity=$opacity-ie);
}

@mixin focused() {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2em $focusShadowColor;
}

@mixin focused-inset() {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.2em $focusShadowColor;
}

@mixin clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
mark {
  background: #fff8e1;
  padding: 0.25rem 0.4rem;
  border-radius: $borderRadius;
  font-family: monospace;
}

blockquote {
  margin: 1rem 0;
  padding: 0 2rem;
  border-left: 4px solid #90a4ae;
}

hr {
  border-top: solid $dividerColor;
  border-width: 1px 0 0 0;
  margin: 1rem 0;
}

p {
  margin: 0 0 1rem 0;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
}

/* Code Highlight */
.docs {
  pre[class*='language-'] {
    padding: 0 !important;
    background: transparent;
    overflow: visible;

    > code {
      border-left: 0 none;
      box-shadow: none !important;
      font-size: 14px;
    }
  }
}
/* Footer */
$footerBgColor: #ffffff;
.dashboard {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  background-color: #edf0f5;

  .integration-banner {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);

    .banner-content {
      color: white;
      text-align: center;

      h2 {
        margin-top: 0;
        font-size: 2rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }

      p {
        font-size: 1.1rem;
        opacity: 0.95;
        margin-bottom: 1.5rem;
      }

      .tech-badges {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;

          &.vue {
            background-color: #4fc08d;
            color: white;
          }

          &.primevue {
            background-color: #41b883;
            color: white;
          }

          &.webpack {
            background-color: #8dd6f9;
            color: #1d78c1;
          }

          &.remote {
            background-color: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid white;
          }
        }
      }

      .integration-note {
        font-size: 0.95rem;
        font-style: italic;
        opacity: 0.9;
        background: rgba(255,255,255,0.1);
        padding: 1rem;
        border-radius: 6px;
        margin: 0;
      }
    }
  }
  .summary {
    position: relative;

    .title {
      font-size: 20px;
    }

    .detail {
      color: $textSecondaryColor;
      display: block;
      margin-top: 10px;
    }

    .count {
      color: #ffffff;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      padding: 7px 14px;
      border-radius: $borderRadius;

      &.visitors {
        background-color: #20d077;
      }

      &.purchases {
        background-color: #f9c851;
      }

      &.revenue {
        background-color: #007be5;
      }
    }
  }

  .highlight-box {
    height: 100px;
    display: flex;
    @include clearfix();

    .initials {
      height: 100%;
      width: 50%;
      text-align: center;
      padding: 1em;

      > span {
        font-size: 48px;
      }
    }

    .highlight-details {
      height: 100%;
      background-color: #ffffff;
      width: 50%;
      padding: 1em;

      i {
        font-size: 18px;
        vertical-align: middle;
        margin-right: 0.5em;
      }

      .count {
        color: $textSecondaryColor;
        font-size: 36px;
        margin-top: 4px;
        display: block;
      }
    }
  }

  .task-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0.5em 0.25em;
      border-bottom: 1px solid $dividerColor;
      @include clearfix();
    }

    .p-checkbox {
      vertical-align: middle;
      margin-right: 0.5em;
    }

    .task-name {
      vertical-align: middle;
    }

    i {
      float: right;
      font-size: 24px;
      color: $textSecondaryColor;
    }

    .p-panel-content {
      min-height: 256px;
    }
  }

  .contact-form {
    .p-panel-content {
      min-height: 256px;
    }
  }

  .contacts {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        border-bottom: 1px solid $dividerColor;

        button {
          padding: 9px;
          width: 100%;
          box-sizing: border-box;
          text-decoration: none;
          position: relative;
          display: block;
          border-radius: 2px;
          transition: background-color 0.2s;

          .name {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 18px;
          }

          .email {
            position: absolute;
            right: 10px;
            top: 30px;
            font-size: 14px;
            color: $textSecondaryColor;
          }

          &:hover {
            cursor: pointer;
            background-color: #eeeeee;
          }
        }

        &:last-child {
          border: 0;
        }
      }
    }

    .p-panel-content {
      min-height: 256px;
    }
  }

  .activity-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid $dividerColor;
      padding: 16px 8px;

      .count {
        font-size: 24px;
        color: #ffffff;
        background-color: #007be5;
        font-weight: 700;
        padding: 0.25em 0.5em;
        display: inline-block;
        border-radius: $borderRadius;
      }
    }
  }
}
</style>
