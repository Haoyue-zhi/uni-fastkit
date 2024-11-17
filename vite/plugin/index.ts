import UniPages from '@uni-helper/vite-plugin-uni-pages'
import uni from "@dcloudio/vite-plugin-uni";

export function setPlugin(){
    return [
        UniPages(),
        uni()
    ]
}