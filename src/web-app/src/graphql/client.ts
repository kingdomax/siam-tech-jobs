const GRAPHQL_ENDPOINT =
    process.env.GRAPHQL_ENDPOINT ?? "http://localhost:5142/graphql";

export const fetchGraphQL = async <TData>(
    query: string,
    variables?: Record<string, unknown>,
): Promise<TData> => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors?.length) {
        throw new Error(json.errors[0].message ?? "GraphQL error");
    }

    return json.data;
};
