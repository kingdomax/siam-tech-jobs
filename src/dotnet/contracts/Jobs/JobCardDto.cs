namespace Contracts.Jobs
{
    public sealed class JobCardDto
    {
        public required string Id { get; init; }
        public required string Title { get; init; }
        public required string CompanyName { get; init; }
        public required string Location { get; init; }
        public required string CompanyLogoUrl { get; init; }
        public required string WorkingModel { get; init; }
        public required string TimeSincePosted { get; init; }
    }
}
