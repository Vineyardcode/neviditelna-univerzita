import { mount } from '@vue/test-utils';
import KeySet from '@/components/KeySet.vue';

describe('KeySet', () => {
  test('renders correctly', () => {
    const domainDetail = {
      keyset: {
        handle: 'keyset-handle',
        registrar: 'registrar-name',
        dns_keys: ['key1', 'key2', 'key3'],
      },
    };

    const wrapper = mount(KeySet, {
      propsData: {
        domainDetail,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
