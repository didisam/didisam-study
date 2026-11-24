// Mermaid 순서도는 노드에서 마우스가 벗어날 때 툴팁에 d3의 `.transition()`을 호출한다.
// `.transition()`은 d3-transition을 불러올 때 selection에 붙는 기능인데,
// d3가 sideEffects: false라서 번들러가 그 코드를 빼 버리면
// "tooltipElem.transition is not a function" 오류가 난다. 여기서 직접 불러와 붙여 둔다.
import 'd3-transition';
