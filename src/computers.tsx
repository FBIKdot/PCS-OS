import { Computer, FastActionHost } from "hnxml/jsx/computer";
import { File } from "./file.ts";
import { render } from "./render.tsx";

export const delayHost = new File(
  "Nodes/delayHost.xml",
  render(
    <Computer id="delayHost" name="delayHost">
      <FastActionHost />
    </Computer>,
  ),
);
export const playerComp = new File(
  "Nodes/playerComp.xml",
  render(
    <Computer id="playerComp" name="PCS" ip="PCS">
      {" " as const}
    </Computer>,
  ),
);
