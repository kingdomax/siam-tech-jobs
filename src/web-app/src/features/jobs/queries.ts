export const HOME_JOBS_QUERY = `
  query HomeJobs {
    homeJobs {
      id
      title
      companyName
      location
      companyLogoUrl
      workingModel
      postedAt
    }
  }
`;
