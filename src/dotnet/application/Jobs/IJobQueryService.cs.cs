using Contracts.Jobs;

namespace Application.Jobs
{
    public interface IJobQueryService
    {
        Task<IReadOnlyList<JobCardDto>> GetHomeJobsAsync(CancellationToken cancellationToken = default);
    }
}
