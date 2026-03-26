import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { getMockJobs, type JobCardDto } from "../lib/jobs";
import "../styles/home.css";

// Do not put browser-only code directly in the render path of the component.
// e.g. localStorage, sessionStorage, window, document
const HomePage = () => {
    const { jobs } = Route.useLoaderData();
    const [mounted, setMounted] = useState(false);
    const [selectedModel, setSelectedModel] = useState<
        "All" | "Remote" | "Hybrid" | "Onsite"
    >("All");

    const filteredJobs = useMemo(() => {
        if (selectedModel === "All") return jobs;

        return jobs.filter(
            (job: JobCardDto) => job.workingModel === selectedModel,
        );
    }, [jobs, selectedModel]);

    useEffect(() => {
        setMounted(true);
        console.log("Hydrated on client (runs only in browser)");
    }, []);

    return (
        <main className="home-page">
            <header className="home-header">
                <h1 className="home-title">Siam Tech Jobs</h1>
                <p className="home-subtitle">
                    Discover software engineering jobs in Thailand
                </p>
                <p className="mounted-indicator">
                    Mounted: {mounted ? "yes" : "no"}
                </p>
            </header>

            <div className="filter-bar">
                {(["All", "Remote", "Hybrid", "Onsite"] as const).map(
                    (model) => (
                        <button
                            key={model}
                            className={`filter-button ${
                                selectedModel === model ? "is-active" : ""
                            }`}
                            onClick={() => setSelectedModel(model)}
                        >
                            {model}
                        </button>
                    ),
                )}
            </div>

            <section className="job-list">
                {filteredJobs.map((job: JobCardDto) => (
                    <article key={job.id} className="job-card">
                        <img
                            className="job-logo"
                            src={job.companyLogoUrl}
                            alt={`${job.companyName} logo`}
                            width={72}
                            height={72}
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="job-content">
                            <h2 className="job-title">{job.title}</h2>
                            <p className="job-company">{job.companyName}</p>

                            <div className="job-meta-row">
                                <span className="job-pill">{job.location}</span>
                                <span className="job-pill">
                                    {job.workingModel}
                                </span>
                            </div>

                            <p className="job-time">
                                Posted {job.timeSincePosted}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

// This is a server function that simulates fetching job data from a server.
// In a real application, this would likely call your ASP.NET backend / GraphQL API.
const getHomeJobs = createServerFn({ method: "GET" }).handler(
    async (): Promise<JobCardDto[]> => {
        await new Promise((resolve) => setTimeout(resolve, 150));
        return getMockJobs();
    },
);

// This is the route definition for the home page.
// It uses the loader to fetch job data from the server function and passes it to the component.
export const Route = createFileRoute("/")({
    ssr: true,
    component: HomePage,
    loader: async () => {
        const jobs = await getHomeJobs();
        return { jobs };
    },
});
