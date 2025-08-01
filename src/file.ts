export class File {
  constructor(
    public readonly path: string,
    public readonly content: string,
  ) {
  }
}
export class Asset {
  constructor(
    public readonly source_path: string,
    public readonly target_path: string,
  ) {
  }
}
