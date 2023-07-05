import { mount } from '@vue/test-utils';
import Events from '@/components/Events.vue';

describe('Events', () => {
  test('renders correctly', () => {
    const domainDetail = {
      events: {
        registered: {
          timestamp: '2023-07-05T10:30:00Z',
          registrar_handle: 'registrar1',
        },
        updated: {
          timestamp: '2023-07-06T14:45:00Z',
          registrar_handle: 'registrar2',
        },
        transferred: {
          timestamp: '2023-07-07T16:20:00Z',
          registrar_handle: 'registrar3',
        },
      },
    };

    const wrapper = mount(Events, {
      propsData: {
        domainDetail,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
