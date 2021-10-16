import index from "../pages/index";
import { mount, createLocalVue } from "@vue/test-utils";
import BaseInput from "../components/BaseInput";
import VueRouter from "vue-router";

describe("index page tests", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  let wrapper = mount(index, {
    stubs: ["SessionStartButton"],
    components: {
      BaseInput
    },
    mocks: {
      $router: [],
      $route: { name: "index" }
    }
  });

  it("is a Vue Instance", async () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("should redirect with param waitTime from input", async () => {
    wrapper.findComponent(BaseInput).setValue(6);

    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.$router).toStrictEqual([
      {
        name: "authorize",
        params: { waitTime: "6" }
      }
    ]);
  });
});
