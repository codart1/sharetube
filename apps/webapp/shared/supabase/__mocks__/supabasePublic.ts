class SupabasePublic {
  table: string | null = null;
  query: string | null = null;
  event: string | null = null;
  eventCb: (() => void) | null = null;
  amount: number | null = null;
  ordering: unknown[] | null = null;

  mockGetResult:
    | ((
        state: Pick<SupabasePublic, 'table' | 'query' | 'amount' | 'ordering'>
      ) => unknown[])
    | null = null;
  mockUnsubscribe = jest.fn();

  from(table: string) {
    this.table = table;
    return this;
  }
  select(query: string) {
    this.query = query;
    return this;
  }
  limit(amount: number) {
    this.amount = amount;
    return this;
  }
  order(...ordering: unknown[]) {
    this.ordering = ordering;
    return this;
  }
  then(cb: (result: { data: unknown[] }) => void) {
    if (this.mockGetResult) {
      const { amount, table, ordering, query } = this;
      return cb({
        data: this.mockGetResult({ amount, table, query, ordering }),
      });
    }
    cb({ data: [] });
  }

  on(event: string, eventCb: () => void) {
    this.event = event;
    this.eventCb = eventCb;
    return this;
  }

  subscribe() {
    return { unsubscribe: this.mockUnsubscribe };
  }
}

export const supabasePublic = new SupabasePublic();

declare module '@supabase/supabase-js' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface SupabaseClient
    extends Pick<
      SupabasePublic,
      'mockGetResult' | 'mockUnsubscribe' | 'eventCb'
    > {}
}
