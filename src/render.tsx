import { Comment, render as _render } from "hnxml/jsx";
import { JsxXmlElement } from "hnxml/jsx-runtime";
export function render(element: JsxXmlElement) {
  return _render(
    <>
      <Comment>Generated by hnxml.js https://github.com/FBIKdot/PCS-OS</Comment>
      {element}
    </>,
  ).end({
    headless: true,
    prettyPrint: true,
    allowEmptyTags: false,
    spaceBeforeSlash: true,
  });
}
