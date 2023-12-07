import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 1000));
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });
  console.log("Props: ", props);
  console.log("Snippets: ", snippet);
  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <div className="flex justify-between m-4 items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border rounded p-2"
          >
            Edit
          </Link>
          <button className="border rounded p-2">Delete</button>
        </div>
      </div>
      <pre className="border rounded bg-gray-400 border-gray-200 p-3">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
