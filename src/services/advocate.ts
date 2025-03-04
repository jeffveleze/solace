import db from '@/db';
import { advocates } from '@/db/schema';
import { Advocate, NewAdvocate } from '@/types/advocate';

export class AdvocateService {
  static async getAllAdvocates() {
    try {
      return await db.select().from(advocates);
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
