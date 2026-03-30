namespace Contracts.Jobs
{
    public sealed record JobCardDto(
        string Id,
        string Title,
        string CompanyName,
        string Location,
        string CompanyLogoUrl,
        string WorkingModel,
        DateTimeOffset PostedAt
    );
}
