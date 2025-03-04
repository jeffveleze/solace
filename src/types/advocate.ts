import { advocates } from '@/db/schema';

// For select operation
export type Advocate = typeof advocates.$inferSelect;

// For insert operations
export type NewAdvocate = typeof advocates.$inferInsert;
