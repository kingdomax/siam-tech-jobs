export type WorkingModel = "Remote" | "Hybrid" | "Onsite";

export type JobCardDto = {
    id: string;
    title: string;
    companyName: string;
    location: string;
    companyLogoUrl: string;
    workingModel: WorkingModel;
    timeSincePosted: string;
};

const companySeeds = [
    {
        companyName: "Agoda",
        location: "Bangkok",
        companyLogoUrl: "https://placehold.co/64x64?text=A",
    },
    {
        companyName: "LINE MAN Wongnai",
        location: "Bangkok",
        companyLogoUrl: "https://placehold.co/64x64?text=LW",
    },
    {
        companyName: "Ascend Money",
        location: "Bangkok",
        companyLogoUrl: "https://placehold.co/64x64?text=AM",
    },
    {
        companyName: "SCB TechX",
        location: "Bangkok",
        companyLogoUrl: "https://placehold.co/64x64?text=TX",
    },
    {
        companyName: "Pomelo",
        location: "Bangkok",
        companyLogoUrl: "https://placehold.co/64x64?text=P",
    },
];

const titles = [
    "Software Engineer",
    "Senior Software Engineer",
    "Full Stack Developer",
    "Backend Engineer (.NET)",
    "Frontend Engineer (React)",
    "Platform Engineer",
    "DevOps Engineer",
    "QA Automation Engineer",
];

const models: WorkingModel[] = ["Remote", "Hybrid", "Onsite"];

const postedTimes = [
    "2 hours ago",
    "5 hours ago",
    "8 hours ago",
    "1 day ago",
    "2 days ago",
    "3 days ago",
    "5 days ago",
];

export function getMockJobs(): JobCardDto[] {
    return Array.from({ length: 20 }, (_, index) => {
        const company = companySeeds[index % companySeeds.length];

        return {
            id: `job-${index + 1}`,
            title: titles[index % titles.length],
            companyName: company.companyName,
            location: company.location,
            companyLogoUrl: company.companyLogoUrl,
            workingModel: models[index % models.length],
            timeSincePosted: postedTimes[index % postedTimes.length],
        };
    });
}
