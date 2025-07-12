import { Asset, File } from "./file.ts";
import { copy, ensureDir, ensureFile } from "@std/fs";

export class Builder {
  private static file_tree: { [key: string]: string } = {};
  private static assert_tree: { [key: string]: string } = {};

  public static fileRegister(...args: File[]): void {
    for (const file of args) {
      if (!this.file_tree[file.path]) {
        this.file_tree[file.path] = file.content;
      } else {
        throw new Error(`file path duplication: "${file.path}"`);
      }
    }
  }

  public static assetsRegister(...args: Asset[]): void {
    for (const asset of args) {
      if (!this.assert_tree[asset.source_path]) {
        this.assert_tree[asset.source_path] = asset.target_path;
      } else {
        throw new Error(`asset path duplication: "${asset.target_path}"`);
      }
    }
  }

  public static async build() {
    const file_list: [string, string][] = [];
    for (const [path, content] of Object.entries(this.file_tree)) {
      file_list.push([path, content]);
    }

    const assert_list: [string, string][] = [];
    for (const [source, target] of Object.entries(this.assert_tree)) {
      assert_list.push([source, target]);
    }

    await ensureDir("dist");
    await ensureDir("dist/Nodes");
    await ensureDir("dist/Missions");
    await Promise.all([
      ...file_list.map(async ([path, content]) => {
        await ensureFile(`dist/${path}`);
        return Deno.writeTextFile(`dist/${path}`, content);
      }),
      ...assert_list.map(async ([source, target]) => {
        return copy(source, `dist/${target}`, { overwrite: true });
      }),
    ]).catch((err) => {
      throw new Error(err);
    });
  }
}
