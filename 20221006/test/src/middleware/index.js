// 각각의 middleware에서 내보낼때 export default 말고 그냥 export 로 내보냈으므로 객체형태에 담아서 보내준다
// 따라서 import 할때도 객체에 씌운 형태로 받는다
import { weather } from "./weatherAction";
import { logins } from "./loginAction";

export { weather, logins };
