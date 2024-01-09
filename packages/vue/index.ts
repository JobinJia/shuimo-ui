/**
 * @description shuimo vue component index
 * @author 阿怪
 * @date 2023/1/14 01:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App, Component } from 'vue';
import './index.css';
import { MUIOption, MWCType } from './types/shuimo-ui';
import useDialog from './composition/useDialog';
// [base]
import MButton from './lib/base/MButton';
import MInput from './lib/base/MInput';
import MCheckbox from './lib/base/checkbox/MCheckbox';
import MCheckboxGroup from './lib/base/checkbox/MCheckboxGroup';
import MLi from './lib/base/MLi';
import MList from './lib/base/MList';
import MSwitch from './lib/base/MSwitch';
import MRadio from './lib/base/MRadio';
import MTag from './lib/base/MTag';
import MProgress from './lib/base/MProgress';
import MAvatar from './lib/base/MAvatar';
import MSelect from './lib/base/MSelect';
import MDatePicker from './lib/base/MDatePicker';
import MTree from './lib/base/tree/MTree';
import MTreeNode from './lib/base/tree/MTreeNode';
import MInputNumber from './lib/base/MInputNumber';
import MSlider from './lib/base/MSlider';

// [other]
import MDivider from './lib/other/MDivider';
import MLoading from './lib/other/loading/MLoading';
import { loadingDirective } from './lib/other/loading/directive';
import MDarkMode from './lib/other/MDarkMode';
import MDeleteIcon from './lib/other/MDeleteIcon';
import MPrinter from '@shuimo-design/core/lib/other/printer/Printer';

// [message]
import MPopover from './lib/message/MPopover';
import MDialog from './lib/message/MDialog';
import MDrawer from './lib/message/MDrawer';
import MConfirm from './lib/message/MConfirm';
import MMessage from './lib/message/message/MMessage';
import MTooltip from './lib/message/MTooltip';

// [template]
import MRicePaper from './lib/template/ricePaper/MRicePaper';
import MBorder from './lib/template/border/MBorder';
import MForm from './lib/template/MForm';
import MFormItem from './lib/template/MFormItem';
import MTable from './lib/template/MTable';
import MTableColumn from './lib/template/MTableColumn';
import MPagination from './lib/template/MPagination';
import MWCBorder from './lib/template/border/MWCBorder';
import MWCRicePaper from './lib/template/ricePaper/MWCRicePaper';
import MCell from './lib/template/MCell';
import MGrid from './lib/template/MGrid';
import MVirtualList from './lib/template/MVirtualList';
import MMenu from './lib/template/menu/MMenu';
import MBreadcrumb from './lib/template/breadcrumb/MBreadcrumb';
import MBreadcrumbItem from './lib/template/breadcrumb/MBreadcrumbItem';

const components: Record<string, Component> = {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MCheckboxGroup,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,
  MInputNumber,
  MTree,
  MTreeNode,
  MSlider,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,

  // [message]
  MPopover,
  MDialog,
  MDrawer,
  MTooltip,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
  MCell,
  MGrid,
  MVirtualList,
  MMenu,
  MBreadcrumb,
  MBreadcrumbItem
};

export {
  useDialog,
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MCheckboxGroup,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,
  MTree,
  MTreeNode,
  MInputNumber,
  MSlider,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,
  MPrinter,

  // [message]
  MPopover,
  MDialog,
  MDrawer,
  MConfirm,
  MMessage,
  MTooltip,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
  MCell,
  MGrid,
  MVirtualList,
  MMenu,
  MBreadcrumb,
  MBreadcrumbItem
};

export function createMUI(options: MUIOption | undefined = {}) {
  return {
    install: (app: App) => {
      // todo support nuxt
      const { disableWebComponent } = options ?? {};
      const useWebComponent = new Map([
        ['MBorder', { key: 'm-border', component: MWCBorder }],
        ['MRicePaper', { key: 'm-rice-paper', component: MWCRicePaper }]
      ]);
      if (disableWebComponent && Array.isArray(disableWebComponent) && disableWebComponent.length > 0) {
        // remove useWebComponent key in disableWebComponent
        disableWebComponent.forEach((item) => {
          useWebComponent.delete(item);
        });
      }
      if (useWebComponent.size > 0) {
        Array.from(useWebComponent).forEach(
          ([key, value]) => {
            customElements.define(value.key, value.component);
          });
      }

      // install icon svg
      if (typeof process === 'undefined') {
        installIconSvg();
      }

      Object.keys(components).forEach(key => {
        if (useWebComponent.has(key as MWCType)) {
          return;
        }
        app.component(key, components[key]);
      });
      app.directive('loading', loadingDirective);



      app.provide(MShuimoConfigKey,{
        svgInject: options?.svgInject ?? 'auto'
      })

      return app;
    }
  };
}

const SVG_ID = 'm-shuimo-svg-icon';
export const installIconSvg = () => {
  if (!document) {return;}
  if (!document.getElementById(SVG_ID)) {
    const svgWrapperDom = document.createElement('div');
    svgWrapperDom.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
          <symbol id="${SVG_ID}">
            <g class="m-svg-icon">
              <path
                d="m2.06,20.75c-.13.01-.17.02-.22.02-.23,0-.36-.12-.28-.33.11-.3.13-.57-.03-.85-.03-.06,0-.15-.03-.22-.05-.17-.11-.34-.17-.51-.01-.04-.05-.07-.06-.11-.06-.41-.12-.82-.17-1.23-.02-.14-.02-.28-.02-.43,0-.19,0-.38,0-.57,0-.16-.04-.31-.05-.47-.01-.24-.02-.48-.03-.71,0-.04.03-.09.03-.12-.07-.33.09-.58.22-.85.04-.08.04-.2.02-.29-.06-.25-.01-.47.15-.65.11-.12.13-.23.11-.4-.03-.35-.04-.71.18-1.01.06-.09.07-.22.11-.33.08-.18.18-.35.24-.53.05-.14.1-.3.1-.45,0-.22.03-.41.21-.56.16-.13.12-.32.05-.49-.07-.17-.2-.07-.3-.05-.2.04-.28-.04-.2-.24.09-.2.21-.39.34-.57.04-.05.14-.08.21-.08.26.03.31-.03.29-.32-.01-.13-.03-.29.03-.39.08-.15.23-.26.35-.39.09-.1.21-.17.28-.28.28-.42.54-.85.81-1.27.13-.2.31-.36.42-.57.29-.57.81-.89,1.2-1.35.19-.22.41-.43.63-.62.3-.26.62-.49.94-.73.15-.11.33-.19.47-.32.17-.15.36-.23.57-.31.28-.1.53-.29.77-.48.2-.16.4-.16.62-.13.06,0,.15.11.14.16,0,.08-.07.21-.13.23-.64.24-1.12.77-1.71,1.1-.26.14-.53.28-.77.47-.32.24-.62.52-.92.79-.17.16-.32.34-.47.51-.12.14-.07.23.09.25.22.03.41-.01.59-.21.26-.27.56-.5.85-.73.38-.3.78-.57,1.18-.86.03-.02.06-.05.1-.07.3-.14.6-.26.89-.41.09-.04.16-.13.22-.21.21-.32.38-.37.71-.22.07.03.19.03.25-.02.32-.23.64-.43,1.04-.47.12-.01.24-.11.37-.16.15-.05.29-.12.45-.13.2-.01.38-.02.51-.22.03-.04.17,0,.26.02.1.02.21.09.29.06.08-.03.12-.16.18-.24-.08-.04-.16-.12-.23-.12-.35.02-.7.06-1.04.11-.26.04-.52.11-.78.17-.07.02-.15.03-.19.08-.24.25-.55.22-.84.2-.1,0-.24-.1-.27-.18-.03-.09.04-.24.1-.33.06-.07.17-.12.27-.13.21-.04.43-.06.65-.09.23-.02.46-.03.64-.24.05-.05.14-.06.22-.07.32-.04.65-.04.97-.12.33-.08.64-.23.97-.34.17-.06.33-.14.51-.15.28-.03.56-.01.84-.02.05,0,.12,0,.16.02.4.24.81.11,1.22.06.26-.03.55-.07.79.03.41.16.82.13,1.24.16.31.02.63-.07.9.16.03.02.1-.02.15-.03.09-.02.19-.08.27-.05.08.03.17.12.19.21.02.07-.03.22-.09.25-.07.04-.23.05-.27,0-.15-.18-.28-.11-.47-.1-.36.04-.73-.02-1.09-.04-.15,0-.29,0-.44,0-.13-.01-.26-.05-.38-.07-.13-.02-.27-.09-.38-.05-.58.25-1.18.15-1.78.18-.24.02-.48.02-.69.19-.07.06-.19.05-.29.06-.07,0-.15-.03-.21,0-.07.03-.12.1-.18.16.06.05.11.14.17.14.15,0,.29-.04.44-.05.69-.02,1.39-.04,2.08-.04.33,0,.67.13.99.09.42-.05.85.13,1.27-.03.06-.02.2.05.24.11.11.21.22.27.4.08.16-.16.29-.05.43.06.26.2.52.39.8.55.2.12.52-.01.67-.2.05-.06.14-.07.21-.11,0,.08,0,.16,0,.24,0,.06-.02.14,0,.18.23.33.58.39.93.45.03,0,.1-.08.1-.13.01-.09-.02-.19,0-.28.01-.07.05-.18.1-.2.06-.03.18-.02.23.03.15.15.28.31.39.49.08.13.13.17.28.12.12-.04.27-.05.38,0,.24.11.46.28.69.41.09.05.2.1.3.11.39.05.73.21,1.04.48.11.1.29.12.43.19.12.06.29.11.35.22.15.31.44.41.66.62.19.17.41.31.59.49.45.43.91.86,1.32,1.33.37.43.71.89,1,1.38.29.48.51,1.01.76,1.51.03.06.09.11.14.17.05.05.14.11.13.16-.03.45.43.72.37,1.18,0,.05.03.12.06.16.22.19.22.43.21.71,0,.17.04.35.08.52.1.38.16.75.08,1.14-.02.08,0,.2.04.26.16.24.18.51.17.79-.01.39-.05.77.18,1.12.05.08.07.19.07.29,0,.68.01,1.36.01,2.04,0,.12-.02.24,0,.35.04.26.03.49-.19.68-.06.05-.07.2-.07.3,0,.3.03.61,0,.91-.02.16-.11.32-.21.44-.16.19-.21.41-.18.65.03.22.06.41-.16.55-.06.04-.07.17-.09.27-.03.1-.01.23-.07.29-.32.34-.37.84-.61,1.22-.04.07-.09.14-.14.2-.03.04-.11.07-.12.12-.07.44-.4.7-.63,1.03-.04.06-.07.13-.09.2-.09.43-.35.69-.7.88-.12.06-.23.09-.3-.06-.07-.14-.06-.26.05-.39.19-.22.35-.46.53-.68.3-.36.4-.89.85-1.13.05-.03.11-.12.1-.18-.04-.44.27-.69.44-1.02.09-.17.13-.37.2-.55.06-.14.1-.3.19-.42.19-.25.31-.5.33-.84.01-.27.12-.53.16-.8.02-.14,0-.3-.03-.45,0-.04-.06-.09-.09-.09-.03,0-.08.05-.09.09-.03.16-.02.33-.08.47-.14.31-.29.61-.29.97,0,.02,0,.04-.02.05-.4.24-.22.8-.53,1.1-.06.06-.06.19-.08.28-.02.06,0,.14-.04.19-.26.4-.52.79-.78,1.18-.06.09-.12.18-.17.27-.24.39-.46.8-.71,1.18-.1.14-.28.22-.4.35-.5.55-1,1.11-1.5,1.67-.12.14-.38.14-.51,0-.13-.13-.13-.47.02-.6.3-.25.62-.48.92-.73.09-.07.17-.16.23-.27.09-.19.18-.36.4-.41.08-.02.17-.15.19-.25.04-.25.16-.36.39-.37.27-.01.3-.07.2-.34-.09-.26.05-.43.17-.61.09-.13.18-.27.23-.42.18-.55.39-1.07.77-1.52.21-.24.31-.59.58-.8.06-.05.02-.25.04-.38.02-.13.04-.25.07-.38.05-.18.15-.35.15-.53.01-.24.05-.43.19-.63.08-.1.13-.29.1-.42-.11-.53.01-1.04.07-1.55.01-.13.05-.27.03-.4-.01-.08-.1-.14-.16-.21-.05.07-.15.14-.15.21,0,.42.01.84.02,1.26,0,.11.02.26-.03.31-.33.31-.33.74-.37,1.14-.03.38-.24.63-.39.92-.08.16-.13.35-.19.52-.05.14-.1.29-.17.42-.18.33-.38.64-.54.97-.27.56-.55,1.12-1.01,1.53-.06.06-.17.12-.17.19-.03.4-.36.57-.55.84-.13.18-.25.36-.39.53-.21.25-.43.49-.66.72-.35.35-.7.69-1.07,1.01-.23.2-.5.35-.76.53-.16.11-.31.25-.47.36-.47.32-.95.62-1.42.94-.06.04-.08.13-.12.2.07.02.15.09.2.06.31-.14.66-.24.91-.46.4-.35.86-.55,1.28-.84.23-.16.47-.32.69-.51.13-.11.24-.13.37-.02.43.36.43.42-.06.68-.22.12-.42.25-.41.55,0,.1.1.2.15.3.07-.06.14-.11.2-.18.05-.06.09-.17.15-.18.26-.06.39-.3.57-.46.19-.17.43-.29.62-.47.31-.3.6-.62.9-.93.06-.06.12-.14.19-.18.17-.09.32,0,.28.2-.03.19-.1.41-.22.52-.41.39-.86.75-1.3,1.11-.25.2-.49.45-.77.57-.35.15-.6.34-.79.7-.1.21-.32.31-.56.29-.06,0-.13.02-.17.06-.21.15-.41.3-.61.45-.04.03-.08.07-.12.07-.46,0-.78.37-1.19.51-.27.09-.56.12-.84.18-.07.02-.17.04-.21.09-.16.22-.38.21-.61.24-.2.02-.38.12-.58.15-.42.08-.84.15-1.26.2-.21.03-.44-.04-.61.17-.03.03-.1.04-.16.04-.51,0-1.03,0-1.54.01-.13,0-.24-.02-.24-.2,0-.17.12-.2.24-.2.19,0,.38,0,.56-.02.26-.05.52-.14.79-.19.17-.03.34-.05.51-.06.33-.01.66,0,.97-.19.15-.09.37-.06.55-.1.34-.08.67-.18,1.01-.28.07-.02.15-.06.23-.06.18,0,.34-.03.45-.2.02-.03.06-.05.1-.07.39-.14.78-.25,1.16-.41.31-.13.61-.32.91-.48.06-.03.12-.08.18-.11.25-.13.51-.24.75-.38.07-.04.13-.17.13-.26,0-.06-.13-.13-.21-.16-.26-.09-.44.13-.63.25-.27.17-.52.37-.79.52-.28.16-.58.28-.87.41-.23.11-.47.22-.71.3-.14.05-.3.04-.45.09-.29.09-.62.14-.86.32-.3.24-.61.23-.93.21-.27-.02-.51,0-.74.14-.19.12-.34.03-.48-.12-.24-.26-.28-.25-.48.03-.07.09-.18.17-.29.19-.25.05-.51.09-.76.1-.71.02-1.42.02-2.13.03-.21,0-.37.07-.48.29-.12.24-.29.24-.53.12-.32-.15-.64-.41-1.03-.24-.04.02-.09.01-.14,0-.3-.09-.59-.2-.89-.27-.4-.09-.81-.15-1.21-.24-.21-.05-.42-.12-.62-.18-.02,0-.04-.03-.06-.03-.5-.15-1.01-.31-1.51-.46-.04-.01-.1,0-.14-.03-.39-.34-.92-.29-1.33-.58-.18-.13-.39-.24-.51-.42-.19-.29-.51-.31-.74-.49-.32-.26-.72-.37-.99-.73-.18-.23-.46-.36-.66-.58-.42-.45-.95-.81-1.22-1.42-.03-.07-.1-.13-.17-.16-.22-.1-.38-.26-.47-.5-.03-.09-.11-.16-.16-.24-.1-.15-.04-.31.14-.32.18-.01.32.07.43.24.14.22.28.44.45.63.25.27.58.48.77.79.18.3.42.46.66.67.28.24.52.54.85.71.19.1.32.31.49.46.2.18.4.35.61.52.02.02.05.05.08.05.38,0,.63.33.96.47.06.03.15,0,.22,0-.03-.1-.05-.29-.09-.29-.46-.07-.71-.49-1.07-.72-.16-.1-.29-.27-.44-.39-.11-.08-.27-.11-.37-.2-.21-.18-.41-.4-.61-.59-.12-.12-.25-.23-.38-.36-.21-.22-.42-.44-.62-.66-.08-.08-.14-.18-.22-.25-.14-.14-.29-.26-.43-.4-.04-.04-.06-.1-.11-.13-.3-.19-.48-.45-.52-.84,0-.08-.12-.17-.2-.22-.19-.12-.3-.28-.38-.51-.09-.26-.27-.48-.42-.71-.23-.35-.49-.69-.58-1.13,0-.02,0-.04-.01-.05-.22-.26-.31-.55-.08-.92Zm.62-6.83c.06-.03.08-.05.11-.05.32-.01.41-.16.27-.47-.09-.2-.04-.34.11-.46.14-.11.14-.23.07-.39-.05-.14-.08-.33-.05-.47.09-.41.21-.81.32-1.21.02-.08.07-.15.11-.22.15-.31.31-.63.46-.94.02-.04.02-.12,0-.14-.04-.04-.15-.08-.16-.07-.12.13-.27.27-.31.43-.08.33-.27.51-.53.66-.08.05-.15.21-.15.32.02.4.04.79-.25,1.11-.04.04-.05.12-.06.19-.05.34-.08.68-.13,1.01,0,.06-.02.12-.06.16-.16.19-.3.41-.56.46-.21.05-.32.3-.3.53.03.29.05.58.05.88,0,.47-.02.93.17,1.38.15.35.18.74.14,1.15-.04.36-.03.79.12,1.11.25.53.39,1.07.49,1.64.04.21.16.39.21.6.02.09.01.22-.04.3-.15.24-.1.46.15.52.2.05.34.15.41.36.02.06.13.14.16.12.12-.08.26-.16.3-.28.04-.11-.03-.28-.07-.41-.02-.07-.11-.12-.14-.19-.16-.36-.31-.72-.47-1.08-.14-.33-.29-.66-.43-.99-.12-.28-.1-.42.1-.64.14-.15.12-.37-.06-.49-.07-.04-.18-.06-.2-.12-.08-.29-.17-.59-.17-.88,0-.17,0-.27-.1-.4-.05-.06-.09-.21-.06-.28.08-.15.07-.27.04-.43-.02-.1.04-.26.12-.32.05-.04.19.02.29.05.05.02.09.09.14.13.16.12.29.07.41-.08.12-.16.09-.29-.04-.41-.06-.05-.13-.1-.19-.14-.16-.08-.22-.21-.16-.39.07-.21.14-.43.23-.63.11-.25.07-.37-.18-.44-.04-.01-.07-.04-.13-.08Zm1.17,8.73c-.1.08-.23.13-.28.23-.07.17-.03.34.15.45.09.05.19.16.2.25.03.25.16.41.35.53.18.11.27.28.25.52,0,.07.12.23.18.22.4-.03.58.29.77.56.1.13.17.2.34.21.12,0,.27.06.35.15.25.26.47.56.72.82.09.09.2.18.32.21.29.08.32.11.22.42-.06.19-.01.35.16.45.33.2.66.4.99.6.26.16.51.34.77.5.15.09.29.08.4-.06.1-.12.08-.24-.08-.24-.25,0-.42-.14-.59-.3-.28-.28-.62-.48-.78-.88-.09-.22-.24-.42-.37-.62-.03-.05-.09-.09-.14-.13-.21-.15-.45-.28-.64-.46-.37-.34-.86-.53-1.09-1.05-.03-.07-.14-.09-.21-.15-.14-.14-.35-.27-.39-.44-.08-.28-.22-.49-.43-.62-.26-.16-.41-.52-.78-.5-.14,0-.23-.12-.15-.31.09-.22.02-.33-.24-.38Zm9.72,5.93c0,.08-.01.12,0,.16.01.27-.17.45-.5.49-.25.03-.2-.19-.24-.34-.02-.08-.07-.18-.13-.21-.04-.02-.17.05-.18.1-.02.08.02.18.03.27.01.1.07.23.03.3-.1.22-.08.3.15.35.19.04.38.1.58.15.16.04.31.02.39-.17.18-.42.41-.47.76-.21.12.09.28.14.42.17.44.09.92-.05,1.35.21.04.03.12,0,.18-.02.19-.06.37-.14.56-.18.23-.05.35-.19.37-.44.01-.16.06-.34-.14-.4-.19-.05-.3.06-.38.24-.05.11-.15.28-.23.28-.42.02-.86.04-1.26-.05-.3-.07-.57-.32-.85-.48-.08-.04-.19-.02-.29-.04-.13-.03-.26-.06-.39-.09-.06-.02-.12-.05-.2-.09ZM5.85,5.69s-.03-.03-.04-.05c-.14.06-.28.11-.41.18-.11.07-.21.16-.29.26-.2.24-.39.49-.58.74-.12.15-.25.3-.36.46-.19.28-.36.57-.55.85-.12.18-.08.41.1.51.25.13.4.04.55-.29.09-.21.2-.41.32-.6.24-.36.5-.7.74-1.05.05-.07.06-.17.1-.25.08-.18.17-.36.26-.54.04-.08.1-.14.15-.21Zm19.72-1.9c-.06.04-.15.1-.14.11.03.09.07.2.13.24.39.25.81.46,1.2.72.36.24.7.52,1.03.81.35.31.68.66,1.02.99.15.14.29.28.45.39.07.05.17.05.25.07-.03-.1-.03-.23-.09-.31-.15-.2-.32-.39-.5-.56-.27-.27-.54-.52-.82-.77-.28-.26-.54-.53-.83-.76-.24-.19-.52-.32-.79-.48-.02-.01-.05,0-.07-.01-.14-.07-.28-.15-.42-.22-.14-.07-.28-.14-.43-.21Zm-5.24,23.82c-.26-.03-.55.23-.53.48.02.19-.06.3-.19.4-.11.09-.23.17-.33.27-.04.04-.1.14-.08.18.02.05.11.1.17.1.1,0,.19-.04.29-.08.09-.03.17-.08.26-.1.36-.08.7-.2.97-.5.11-.12.27-.17.41-.26.07-.04.18-.08.19-.14.02-.08-.01-.2-.07-.27-.2-.26-.48-.24-.75-.18-.11.03-.22.06-.34.09Zm-8.74,1.84c.3.02.41-.14.3-.43-.02-.05-.03-.09-.04-.14-.07-.38-.08-.4-.43-.4-.28,0-.51-.06-.72-.28-.09-.1-.24-.18-.37-.19-.1-.01-.27.06-.3.15-.06.17.12.19.22.25.25.15.49.33.74.5.02.02.03.06.04.09.08.3.26.44.57.46ZM31.27,9.64c-.08-.15-.11-.23-.16-.31-.08-.14-.16-.27-.24-.41-.04-.06-.07-.13-.11-.19-.18-.27-.36-.54-.54-.81-.11-.16-.22-.33-.35-.47-.08-.09-.21-.15-.25.03-.02.12,0,.32.08.39.18.15.29.31.3.56,0,.06.09.12.14.18.15.19.38.35.44.57.08.28.25.4.44.51.05.03.14-.04.25-.07Zm-12.96,18.44s0-.04,0-.05c-.2.01-.41,0-.6.04-.08.02-.15.13-.22.2.08.04.17.11.25.12.35.02.7.03,1.05.04.21,0,.38-.08.46-.31.02-.05.03-.14,0-.16-.04-.03-.11-.04-.17-.03-.26.05-.51.1-.77.16Zm3.04,2.09l.03-.06c-.18-.11-.35-.23-.54-.32-.03-.02-.12.04-.15.09-.12.19-.28.2-.47.16-.09-.02-.19-.03-.28,0-.09.04-.17.13-.25.2.09.04.18.12.27.11.47-.04.93-.11,1.39-.17Zm-2.88-1.34c-.23.06-.4.07-.54.15-.07.04-.09.18-.14.28.07.04.15.1.22.11.15,0,.3,0,.44-.05.09-.03.16-.13.24-.2-.08-.1-.16-.21-.22-.29Zm-9.32-1.5s-.08.06-.08.1c0,.08,0,.19.05.25.09.11.2.2.32.28.06.04.14.04.22.03.03,0,.07-.07.07-.11,0-.17-.39-.57-.58-.55Zm6.44,1.43c.13-.1.26-.17.35-.27.03-.03-.02-.23-.05-.23-.14-.01-.27,0-.41.02,0,0-.01,0-.02.01-.06.09-.12.17-.18.26.09.06.19.12.31.21ZM3.4,8.81c-.19.11-.37.21-.54.31.25.15.5.02.54-.31Z"/>
              <path
                d="m1.2,21.84c.09-.23,0-.34-.16-.46-.06-.05-.1-.2-.08-.3.03-.22-.02-.4-.17-.51-.23-.17-.28-.42-.27-.68.01-.25,0-.48-.18-.68-.07-.08-.09-.23-.1-.35-.04-.43-.07-.87-.08-1.31,0-.27.04-.54.05-.8,0-.18-.03-.31-.16-.46-.09-.11-.02-.39,0-.59.02-.12.12-.23.13-.35.05-.73.08-1.46.12-2.19,0-.07.01-.17.06-.21.2-.2.19-.46.21-.72.01-.13.11-.26.17-.39.08-.18.16-.37.24-.55.15-.34.3-.68.45-1.03.05-.11.06-.25.13-.35.05-.08.14-.16.22-.17.05,0,.16.14.15.2-.02.16-.08.33-.13.48-.04.11-.11.2-.16.3-.09.19-.17.38-.26.57-.02.05-.05.1-.07.16-.06.24-.11.48-.19.72-.12.34-.16.69-.17,1.06,0,.34-.12.68-.19,1.03-.04.2-.11.39-.11.59-.01.73-.02,1.46,0,2.2,0,.21.09.43.13.64.05.23.1.47.13.71.06.49.1.98.15,1.48,0,.02,0,.06.02.07.25.25.24.56.17.89-.01.05.09.13.13.21.07.11.14.21.19.33.06.14.1.29.15.43.07.2.16.39.23.59.02.06.02.14.05.19.25.4.52.79.77,1.18.05.08.09.18.09.28,0,.07-.03.18-.08.21-.05.03-.15,0-.2-.05-.15-.11-.29-.25-.43-.37-.2-.18-.25-.45-.36-.68-.18-.35-.23-.78-.51-1.07-.05-.05-.06-.15-.08-.21Z"/>
              <path
                d="m17.08,31.98c-.16-.08-.31-.18-.47-.25-.07-.03-.15-.03-.22-.03-.14,0-.28.03-.41,0-.07-.02-.16-.14-.17-.22,0-.06.09-.17.16-.2.21-.1.45,0,.6.2.05.06.14.09.22.09.15,0,.31-.03.46-.04.12,0,.24.02.24.2,0,.17-.12.19-.25.19-.04,0-.08,0-.12,0,0,.02-.02.04-.03.06Z"/>
              <path
                d="m8.5,1.73c-.11-.09-.22-.14-.23-.21-.01-.07.05-.18.11-.24.09-.09.19-.18.31-.22.09-.03.2.02.29.03-.02.09-.02.2-.07.26-.12.13-.26.24-.42.38Z"/>
              <path d="m21.52.57c.29.06.43.17.39.34-.02.1-.13.22-.21.24-.19.04-.51-.2-.46-.32.05-.11.18-.18.27-.26Z"/>
              <path d="m33.65,12.29c-.12.14-.2.32-.29.33-.22,0-.22-.21-.23-.39,0-.16.03-.35.2-.31.11.02.18.21.31.37Z"/>
              <path d="m7.76,2.02c-.1.09-.17.19-.23.19-.06,0-.17-.12-.16-.16.02-.09.1-.16.16-.24.06.06.12.11.23.21Z"/>
              <path d="m33.24,11c-.1.08-.17.17-.22.15-.06-.02-.13-.12-.12-.19,0-.06.09-.12.14-.18.05.06.11.11.2.21Z"/>
              <path
                d="m2.45,15.24c-.16-.07-.3-.11-.43-.19-.06-.03-.1-.12-.11-.2,0-.04.07-.12.12-.12.07,0,.16.03.2.09.08.12.14.26.23.42Z"/>
              <path d="m20.74,28.02c-.1-.02-.2-.03-.3-.06,0,0,0-.08,0-.13.1.01.2.02.3.03,0,.05-.01.1-.02.15Z"/>
            </g>
          </symbol>
        </svg>`;
    // todo use body must have some problem...
    document.body.appendChild(svgWrapperDom);
  }
};
