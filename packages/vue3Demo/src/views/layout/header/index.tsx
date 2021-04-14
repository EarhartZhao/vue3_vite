import '@styleLayout/header/index.scss'

import hwLogo from '@img/huawei_logo.png'
import leaveGif from '@img/leave.gif'
import sswLogo from '@img/ssw_logo.png'
import { useStore } from '@store/index'
import { ElButton, ElPopover } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const projectItem = store.getters["system/getProjectItem"];
    let visible = ref(false);
    let imgSrc = projectItem === "hw" ? hwLogo : sswLogo;
    const closePop = () => {
      visible.value = false;
    };
    return { imgSrc, leaveGif, visible, closePop };
  },
  render() {
    const { imgSrc, leaveGif, visible, closePop } = this;
    return (
      <div class="header_box">
        <div class="header_box_logo">
          <img src={imgSrc} />
        </div>
        <div class="header_box_func">
          <img src={leaveGif} />
          <ElPopover placement="top" width={160} v-model={visible.value}>
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <template v-slots="reference">
              <ElButton onClick={closePop()}>删除</ElButton>
            </template>
          </ElPopover>
        </div>
      </div>
    );
  },
});
