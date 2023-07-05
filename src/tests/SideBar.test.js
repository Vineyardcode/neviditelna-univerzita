import { mount } from '@vue/test-utils';
import SideBar from '@/components/SideBar.vue';

describe('SideBar', () => {
  test('renders correctly', () => {
    const wrapper = mount(SideBar);

    expect(wrapper.exists()).toBe(true);
  });
});
