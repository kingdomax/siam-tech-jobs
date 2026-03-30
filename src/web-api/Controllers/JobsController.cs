using Application.Jobs;
using Contracts.Jobs;
using Microsoft.AspNetCore.Mvc;

namespace Web.Api.Controllers
{
    [ApiController]
    [Route("api/jobs")]
    public sealed class JobsController : ControllerBase
    {
        private readonly IJobQueryService _jobQueryService;

        public JobsController(IJobQueryService jobQueryService)
        {
            _jobQueryService = jobQueryService;
        }

        [HttpGet()]
        [ProducesResponseType(typeof(IReadOnlyList<JobCardDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<JobCardDto>>> GetHomeJobs(CancellationToken cancellationToken)
        {
            var jobs = await _jobQueryService.GetHomeJobsAsync(cancellationToken);
            return Ok(jobs);
        }
    }
}
