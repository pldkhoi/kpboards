// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center md:flex-row md:text-left">
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold">Drop or Select file</h2>

        <p className="text-sm text-muted-foreground">
          Drop files here or click&nbsp;
          <span className="text-primary underline">browse</span>
          &nbsp;thorough your machine
        </p>
      </div>
    </div>
  );
}
