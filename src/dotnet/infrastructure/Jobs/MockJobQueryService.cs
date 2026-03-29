using Application.Jobs;
using Contracts.Jobs;

namespace Infrastructure.Jobs
{
    public sealed class MockJobQueryService : IJobQueryService
    {
        public Task<IReadOnlyList<JobCardDto>> GetHomeJobsAsync(CancellationToken cancellationToken = default)
        {
            var companies = new[]
            {
                new { CompanyName = "Agoda", Location = "Bangkok", CompanyLogoUrl = "https://placehold.co/64x64?text=A" },
                new { CompanyName = "LINE MAN Wongnai", Location = "Bangkok", CompanyLogoUrl = "https://placehold.co/64x64?text=LW" },
                new { CompanyName = "Ascend Money", Location = "Bangkok", CompanyLogoUrl = "https://placehold.co/64x64?text=AM" },
                new { CompanyName = "SCB TechX", Location = "Bangkok", CompanyLogoUrl = "https://placehold.co/64x64?text=TX" },
                new { CompanyName = "Pomelo", Location = "Bangkok", CompanyLogoUrl = "https://placehold.co/64x64?text=P" },
            };

            var titles = new[]
            {
                "Software Engineer",
                "Senior Software Engineer",
                "Full Stack Developer",
                "Backend Engineer (.NET)",
                "Frontend Engineer (React)",
                "Platform Engineer",
                "DevOps Engineer",
                "QA Automation Engineer",
            };

            var models = new[] { "Remote", "Hybrid", "Onsite" };

            var postedTimes = new[]
            {
                "2 hours ago",
                "5 hours ago",
                "8 hours ago",
                "1 day ago",
                "2 days ago",
                "3 days ago",
                "5 days ago",
            };

            var jobs = Enumerable.Range(1, 20)
                .Select(index =>
                {
                    var company = companies[(index - 1) % companies.Length];

                    return new JobCardDto
                    {
                        Id = $"job-{index}",
                        Title = titles[(index - 1) % titles.Length],
                        CompanyName = company.CompanyName,
                        Location = company.Location,
                        CompanyLogoUrl = company.CompanyLogoUrl,
                        WorkingModel = models[(index - 1) % models.Length],
                        TimeSincePosted = postedTimes[(index - 1) % postedTimes.Length],
                    };
                })
                .ToList();

            return Task.FromResult<IReadOnlyList<JobCardDto>>(jobs);
        }
    }
}
