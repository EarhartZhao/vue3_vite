import { defineComponent } from 'vue'

export default defineComponent({
  name: "compTest",
  setup(props, { slots }) {
    console.log("slots", slots);
    return () => (
      <>
        <div>
          <p>here is slot ----</p>
          {slots.default && slots.default("默认传参！---")}
          {slots.title && slots.title()}
        </div>
      </>
    );
  },
});
