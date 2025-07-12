import { File } from "./file.ts";
import { render } from "./render.tsx";

export const startingMission = new File(
  "Missions/startingMission.xml",
  render(
    <mission id="startMission" activeCheck={true}>
      <goals>{" " as const}</goals>
      <nextMission IsSilent={true}>NONE</nextMission>
      <email>
        <sender>a</sender>
        <subject>a</subject>
        <body>a</body>
        <attachments>{" " as const}</attachments>
      </email>
    </mission>,
  ),
);
