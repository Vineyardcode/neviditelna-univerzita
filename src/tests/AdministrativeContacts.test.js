import { shallowMount } from '@vue/test-utils';
import AdministrativeContacts from '@/components/AdministrativeContacts.vue';


describe('AdministrativeContacts', () => {
  test('renders without errors', () => {
    const wrapper = shallowMount(AdministrativeContacts, {
      props: {
        verboseView: false,
        domainDetail: {
          administrative_contacts: []
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
