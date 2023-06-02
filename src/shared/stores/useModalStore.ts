import { defineStore } from "pinia";

import { extend } from "@vue/shared";

import { lockBody, unlockBody } from "@/shared/utils/overflow";

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export interface IStoreProps {
  component: null | VueComponent;
  props?: object;
}

export interface IStoreState {
  modalState: IStoreProps;
}

const useModalStore = defineStore("modalStore", {
  state: (): IStoreState => ({
    modalState: { component: null, props: {} },
  }),
  actions: {
    /**
     * Open modal with providing vue component and/or props
     */
    openModal(payload: IStoreProps) {
      const { props, component } = payload;

      lockBody();

      this.modalState = { component, props: props || {} };
    },

    /**
     * Closes modal
     */
    closeModal() {
      const basicState: IStoreProps = { component: null, props: {} };
      this.modalState = basicState;

      unlockBody();
    },
  },
});

export default useModalStore;
