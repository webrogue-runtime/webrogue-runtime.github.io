import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Page not found",
        icons: "/favicon.ico",
    }
}

export default async function NotFoundPage() {
    return <div className="notFoundContainer">
        <h1 className="notFound">404 :(</h1>
        <h2 className="notFound">Requested page not found</h2>
    </div>;
}
