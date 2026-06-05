import { DocsPage, DocsBody } from 'fumadocs-ui/layouts/notebook/page';

export default function NotFoundPage() {
    return (
        <DocsPage full>
            <DocsBody>
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <h1 className="mt-20 mb-4 text-2xl font-bold">Not Found</h1>
                    <p className="text-fd-muted-foreground mt-0!">
                        The page you are looking for does not exist.
                    </p>
                </div>
            </DocsBody>
        </DocsPage>
    );
}
