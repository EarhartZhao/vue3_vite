import '/@style/component/index.scss'

import loadingError from '/@assets/svg/loadingError.svg'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ImageDialog",
  props: {
    status: {
      type: String,
      default: "success", //success, error, loading
    },
  },
  setup(props) {
    const { status } = props;
    return () => (
      <>
        <div class="ImageDialog" v-if={status != "success"}>
          <img src={loadingError} v-if={status == "error"} />
          <div class="ImageDialogLoading" v-if={status == "loading"}>
            <i class="el-icon-loading"></i>
          </div>
        </div>
      </>
    );
  },
});
