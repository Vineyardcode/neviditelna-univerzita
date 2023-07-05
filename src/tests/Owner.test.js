import { mount } from '@vue/test-utils';
import Owner from '@/components/Owner.vue';

describe('Owner', () => {
  test('renders correctly', () => {
    const domainDetail = {
      owner: {
        handle: 'owner-handle',
        organization: 'owner-organization',
        name: 'owner-name',
        publish: {
          organization: true,
          name: false,
        },
      },
    };

    const wrapper = mount(Owner, {
      propsData: {
        domainDetail,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
