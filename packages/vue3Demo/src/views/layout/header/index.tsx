import '@styleLayout/header.scss'

import leaveGif from '@img/leave.gif'
import Logo from '@img/logo.png'
import { useStore } from '@store/index'
import { ElButton, ElPopover } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    let visible = ref(false);
    let imgSrc = Logo;
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
