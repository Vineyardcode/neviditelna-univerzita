import { shallowMount } from '@vue/test-utils';
import AuthInfo from '@/components/AuthInfo.vue';


describe('AuthInfo', () => {
  test('renders without errors', () => {
    const wrapper = shallowMount(AuthInfo, {
      props: {
        domainDetail: {
          expires_at: '2023-07-05T12:00:00Z'
        },
        password: 'Swordfish'
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
