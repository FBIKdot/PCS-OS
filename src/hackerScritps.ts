import { HackerScript } from "hnxml/hackerScript";
import { File } from "./file.ts";

const TERMINAL_LOG_SOURCE =
  "[00:00.000]> Danger.\n[00:00.300]> Repeat.\n[00:00.600]> Danger.\n[00:01.000]> ...Danger level... Analyzing...\n[00:01.950]> DANGER.\n[00:02.100]> b'\\xde\\xad\\xbe\\xef' FATAL EXCEPTION\n[00:03.200]> REPEAT.\n[00:03.800]> 0xFEEDFACE: Illegal instruction encountered during execution.\n[00:04.900]> DANGER.\n[00:05.300]> kernel: [ERROR] Buffer overflow detected at 0x7fff5fbff000\n[00:06.600]> ...DANGER LEVEL...ANALYZING...\n[00:08.000]> [ ERROR: Stack corruption detected ]\n[00:09.900]> *** stack smashing detected ***: terminated\n[00:10.700]> UNKNOWN.\n[00:11.500]> *** Error in `./d.out': free(): invalid pointer: 0x0000000000401020 ***\n[00:12.500]> MAXIMUM...\n[00:13.000]> [ERROR] CRITICAL_PROCESS_DIED Illegal instruction (core dumped)\n[00:14.700]> UNLOCKING...\n[00:15.500]> 10001001 11100011 10010110 01100100 10010101 00000001 01011011 10011010\n[00:17.100]> UNDERLYING PROCESSING UNIT UNLOCKED.\n[00:17.600]> [ERROR] M3M0RY_C0RRUPT10N_D3T3CT3D\n[00:18.200]> terminate called after throwing an instance of 'std::logic_error'\n[00:19.200]>   what( error\n[00:20.100]> [0xC00005] EXCEPTION ACCESS VIOLATION\n[00:20.600]> COMPUTATIONAL POWER THRESHOLD EXCEEDED.\n[00:21.800]> [FATAL] System.OutOfMemoryException\n[00:22.600]> terminate called after throwing an instance of 'std::bad_alloc'\n[00:23.200]>   what():  std::bad_alloc\n[00:24.200]> LATERANO...\n[00:26.000]> OUTBREAK.\n";

function generator(log: [string, string][]): [string, string][] {
  const script_list: [string, string][] = [];
  for (const value of log) {
    const content = new HackerScript()
      .config("playerComp", "playerComp", 0.02)
      .writel_silent("");
    for (const item of value[1].split(" ")) {
      content.write_silent(item);
    }
    script_list.push([value[0], content.end()]);
  }

  return script_list;
}

const TERMINAL_LOG: [string, string][] = [];

for (const line of TERMINAL_LOG_SOURCE.trim().split("\n")) {
  const match = line.match(/\[(.*?)\]\s*(.*)/);
  if (match) {
    TERMINAL_LOG.push([match[1], match[2]]);
  }
}

function toSeconds(time: string) {
  const [minute, second] = time.split(":");
  return Number(minute) * 60 + Number(second);
}

const hackerScriptFiles: [number, File][] = [];
for (const value of generator(TERMINAL_LOG)) {
  hackerScriptFiles.push([
    toSeconds(value[0]),
    new File(`Nodes/HS${toSeconds(value[0])}.txt`, value[1]),
  ]);
}

const initHackerScript = new File(
  "Nodes/initHackerScript.txt",
  new HackerScript()
    .config("playerComp", "playerComp", 0)
    .clearTerminal()
    .end(),
);

export { hackerScriptFiles, initHackerScript };
