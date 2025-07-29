import { Builder } from "./builder.ts";

// ExtensionInfo
import { extensionInfo } from "./info.tsx";
Builder.fileRegister(extensionInfo);

// Actions
import { hackerScriptLauncher, startingAction } from "./actions.tsx";
Builder.fileRegister(startingAction, hackerScriptLauncher);

// Nodes
import { delayHost, playerComp } from "./computers.tsx";
Builder.fileRegister(delayHost, playerComp);

// Missions
import { startingMission } from "./missions.tsx";
Builder.fileRegister(startingMission);

// HackerScript
import { hackerScriptFiles, initHackerScript } from "./hackerScritps.ts";
for (const item of hackerScriptFiles) {
  Builder.fileRegister(item[1]);
}
Builder.fileRegister(initHackerScript);

// Assets
import { bgm, workshopLogo } from "./assets.ts";
Builder.assetsRegister(bgm, workshopLogo);

await Builder.build();
