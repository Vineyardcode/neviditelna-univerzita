import { mount } from '@vue/test-utils';
import NSSet from '@/components/NSSet.vue';

describe('NSSet', () => {
  test('renders correctly', () => {
    const domainDetail = {
      nsset: {
        handle: 'ns-handle',
        registrar: 'ns-registrar',
        dns: [
          { ip_address: '192.168.0.1', name: 'ns1.example.com' },
          { ip_address: '192.168.0.2', name: 'ns2.example.com' },
        ],
      },
    };

    const wrapper = mount(NSSet, {
      propsData: {
        domainDetail,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
