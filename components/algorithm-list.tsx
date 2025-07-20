import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AlgorithmList({
  title,
  algorithms,
}: {
  title: string
  algorithms: string[]
}) {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">{title}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {algorithms.map((algo) => (
          <Card key={algo}>
            <CardHeader>
              <CardTitle>{algo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Implementation &amp; visualisation coming soon.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
