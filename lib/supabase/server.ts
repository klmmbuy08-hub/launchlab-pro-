// Placeholder Supabase server client
const createChainableQuery = (): any => ({
  select: (...args: any[]) => createChainableQuery(),
  insert: (...args: any[]) => createChainableQuery(),
  update: (...args: any[]) => createChainableQuery(),
  delete: (...args: any[]) => createChainableQuery(),
  eq: (...args: any[]) => createChainableQuery(),
  order: (...args: any[]) => createChainableQuery(),
  single: (...args: any[]) => Promise.resolve({ data: null, error: null }),
  then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback),
})

export const supabase = {
  from: (table: string) => createChainableQuery(),
}
