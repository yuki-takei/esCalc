export interface Result {

  input: String;

  output: String;

}

export class ResultSet {

  public results: Result[] = [];

  public addResult(result: Result): void {
    this.results.push(result);
  }

}
