export type WorkingModel = "Remote" | "Hybrid" | "Onsite";

export type JobCardDto = {
    id: string;
    title: string;
    companyName: string;
    location: string;
    companyLogoUrl: string;
    workingModel: WorkingModel;
    postedAt: string;
};
