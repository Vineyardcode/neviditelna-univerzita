import { mount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar', () => {
  test('renders correctly', () => {
    const userName = 'John Doe';
    const menuItems = [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Logout' },
    ];

    const wrapper = mount(NavBar, {
      propsData: {
        userName,
        menuItems,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
