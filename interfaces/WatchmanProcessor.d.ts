export type WatchmanExpression = (string | (string | string[] | (string | (string | number)[])[])[])[];

export interface WatchmanProcessor {
  /**
   * Get this party started!  This is the start of everything.
   * This is what communicates directly with fb-watchman and then passes data to sync/terminal.
   *
   * @memberOf Watchman
   */
  start(): void;
  /**
   * All done!  Time to clean up.
   *
   * @memberOf Watchman
   */
  end(): Promise<void>;
}
