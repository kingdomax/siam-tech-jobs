import type { ReactNode } from "react";
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";

// This is the entry point for all other routes. The code in this file will wrap all other routes in the application.
const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html lang="en">
        <head>
            <HeadContent />
        </head>
        <body>
            {children}
            <Scripts />
        </body>
    </html>
);

const RootComponent = () => (
    <RootDocument>
        <Outlet />
    </RootDocument>
);

export const Route = createRootRoute({
    component: RootComponent,
});
