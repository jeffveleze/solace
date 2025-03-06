import { ilike, or } from 'drizzle-orm';
import db from '@/db';
import { advocates } from '@/db/schema';
import { NewAdvocate } from '@/types/advocate';

export class AdvocateService {
  static async getAllAdvocates(searchValue?: string) {
    try {
      const baseQuery = db.select().from(advocates);
      const query = searchValue
        ? baseQuery.where(
            or(
              ilike(advocates.firstName, `%${searchValue}%`),
              ilike(advocates.lastName, `%${searchValue}%`),
              ilike(advocates.city, `%${searchValue}%`),
              ilike(advocates.degree, `%${searchValue}%`)
            )
          )
        : baseQuery;

      return await query;
    } catch (error) {
      console.error('Error fetching advocates:', error);
      throw new Error('Failed to fetch advocates');
    }
  }

  static async seedAdvocates(advocateData: NewAdvocate[]) {
    try {
      const records = await db
        .insert(advocates)
        .values(advocateData)
        .returning();
      return { advocates: records };
    } catch (error) {
      console.error('Error seeding advocates:', error);
      throw new Error('Failed to seed advocates');
    }
  }
}
