import { mount } from '@vue/test-utils';
import StateFlags from '@/components/StateFlags.vue';

describe('StateFlags', () => {
  test('renders correctly', () => {
    const verboseView = false;
    const domainDetail = {
      state_flags: {
        flags: [
          { name: 'flag1', active: true, description: 'Flag 1' },
          { name: 'flag2', active: false, description: 'Flag 2' },
        ],
      },
    };

    const wrapper = mount(StateFlags, {
      props: {
        verboseView,
        domainDetail,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
