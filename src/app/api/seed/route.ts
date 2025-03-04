import { handleAPIError } from '@/lib/utils/errors';
import { AdvocateService } from '@/services/advocate';
import { advocateData } from '@/db/seed/advocates';

export async function POST() {
  try {
    const records = await AdvocateService.seedAdvocates(advocateData);
    return Response.json({ advocates: records });
  } catch (error) {
    return handleAPIError(error);
  }
}
