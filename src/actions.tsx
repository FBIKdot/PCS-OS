import { ConditionalActions, Instantly, OnConnect } from "hnxml/jsx/action";
import {
  DeleteFile,
  LaunchHackScript,
  RunFunction,
  SetLock,
} from "hnxml/jsx/task";
import { loadConditionalActions } from "hnxml/function";
import { render } from "./render.tsx";
import { File } from "./file.ts";
import { hackerScriptFiles, initHackerScript } from "./hackerScritps.ts";

const launcher_path = "Nodes/hackerScriptLauncher.xml";
export const hackerScriptLauncher = new File(
  launcher_path,
  render(
    <ConditionalActions>
      <Instantly>
        {hackerScriptFiles.map((v: [number, File]) => (
          <LaunchHackScript
            Filepath={v[1].path}
            DelayHost="delayHost"
            Delay={v[0]}
          />
        ))}
        <RunFunction
          FunctionName={loadConditionalActions(launcher_path)}
          FunctionValue={0}
          DelayHost="delayHost"
          Delay={58}
        />
      </Instantly>
    </ConditionalActions>,
  ),
);

export const startingAction = new File(
  "Nodes/startingAction.xml",
  render(
    <ConditionalActions>
      <OnConnect target="playerComp">
        <RunFunction
          FunctionName={loadConditionalActions(launcher_path)}
          FunctionValue={0}
        />
        <LaunchHackScript
          Filepath={initHackerScript.path}
          DelayHost="delayHost"
          Delay={0}
        />
        <SetLock
          DelayHost="delayNode"
          Delay={0}
          Module="terminal"
          IsLocked={true}
          IsHidden={false}
        />
      </OnConnect>
      <Instantly>
        <DeleteFile
          TargetComp="playerComp"
          FilePath="sys"
          FileName="x-server.sys"
        />
      </Instantly>
    </ConditionalActions>,
  ),
);
