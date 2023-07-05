import { mount } from '@vue/test-utils';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

describe('ErrorBoundary', () => {
  test('displays error message and retries on button click', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Child Component</div>',
      },
    });

    wrapper.find('div').trigger('error', new Error('Test Error'));

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('An error occurred: Test Error');

    wrapper.find('button').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain('An error occurred: Test Error');
  });

  test('displays slot content when no error', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: '<div>Child Component</div>',
      },
    });

    expect(wrapper.text()).toContain('Child Component');
  });
});
