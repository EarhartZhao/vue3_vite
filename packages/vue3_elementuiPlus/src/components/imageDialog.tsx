import '@style/component/index.scss'

import loadingError from '@assets/svg/loadingError.svg'
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: "ImageDialog",
  props: {
    status: {
      type: String,
      validator: (val: string) => ["success", "error", "loading"].includes(val),
      default: "success",
    },
  },
  setup(props) {
    const { status } = toRefs(props);

    const s = status.value;
    return () => (
      <>
        {s != "success" ? (
          <div class="ImageDialog">
            {s == "error" ? (
              <img src={loadingError} />
            ) : (
              <div class="ImageDialogLoading">
                <i class="el-icon-loading"></i>
              </div>
            )}
          </div>
        ) : null}
      </>
    );
  },
});
