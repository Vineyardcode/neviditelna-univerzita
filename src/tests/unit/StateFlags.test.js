import { describe, it, expect } from "vitest"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { mount, shallowMount } from "@vue/test-utils"
import AuthInfo from "@/components/AuthInfo.vue"

describe("test", () => {
  const vuetify = createVuetify({ components, directives })

  it("renders properly", () => {
    const wrapper = mount(AuthInfo, {
      global: {
        plugins: [vuetify],
      },
      props: { title: "Hello Vitest" },
    })
    expect(wrapper.text()).toContain("Hello Vitest")
  })
})
