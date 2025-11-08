
"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { resources } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = resources.find((r) => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  const { title, description, type, Icon, content, steps } = resource as any;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3">
        <Icon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">{title}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{description}</span>
            <Badge variant="outline">{type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {type === "Video" ? (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={content}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg min-h-[400px]"
              ></iframe>
            </div>
          ) : type === 'Exercise' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step: any) => (
                <div key={step.step} className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <p>{content}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
