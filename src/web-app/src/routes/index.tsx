import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchGraphQL } from "../graphql/client";
import "../styles/home.css";
import { WorkingModel, JobCardDto } from "../features/jobs/types";
import { HOME_JOBS_QUERY } from "../features/jobs/queries";
import { formatPostedAt } from "../features/jobs/utils";

// Do not put browser-only code directly in the render path of the component.
// e.g. localStorage, sessionStorage, window, document
const HomePage = () => {
    const { jobs } = Route.useLoaderData();
    const [mounted, setMounted] = useState(false);
    const [selectedModel, setSelectedModel] = useState<WorkingModel | "All">(
        "All",
    );

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
                                Posted {formatPostedAt(job.postedAt)}
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

// This is the route definition for the home page.
// It uses the loader to fetch job data from the server function and passes it to the component.
export const Route = createFileRoute("/")({
    ssr: true,
    component: HomePage,
    loader: async () => {
        const data = await fetchGraphQL<{ homeJobs: JobCardDto[] }>(
            HOME_JOBS_QUERY,
        );
        return { jobs: data.homeJobs };
    },
});
