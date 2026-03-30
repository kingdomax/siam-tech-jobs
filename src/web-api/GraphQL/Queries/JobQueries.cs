using Application.Jobs;
using Contracts.Jobs;

namespace Web.Api.GraphQL.Queries
{
    public sealed class JobQueries
    {
        private readonly IJobQueryService _jobQueryService;

        public JobQueries(IJobQueryService jobQueryService)
        {
            _jobQueryService = jobQueryService;
        }

        public Task<IReadOnlyList<JobCardDto>> GetHomeJobs(CancellationToken cancellationToken)
        {
            return _jobQueryService.GetHomeJobsAsync(cancellationToken);
        }
    }
}
