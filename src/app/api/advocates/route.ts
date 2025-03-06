import { handleAPIError } from '@/lib/utils/errors';
import { AdvocateService } from '@/services/advocate';
import { SEARCH_VALUE } from '@/constants/advocates';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchValue = searchParams.get(SEARCH_VALUE) || undefined;
    const advocates = await AdvocateService.getAllAdvocates(searchValue);
    return Response.json({ data: advocates });
  } catch (error) {
    return handleAPIError(error);
  }
}
