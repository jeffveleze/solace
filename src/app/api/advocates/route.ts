import { handleAPIError } from '@/lib/utils/errors';
import { AdvocateService } from '@/services/advocate';

export async function GET() {
  try {
    const advocates = await AdvocateService.getAllAdvocates();
    return Response.json({ data: advocates });
  } catch (error) {
    return handleAPIError(error);
  }
}
