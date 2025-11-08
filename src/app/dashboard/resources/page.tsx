
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Video, Wind, BookOpen } from "lucide-react";
import { resources } from "@/lib/data";

const resourceTypes = [
    { value: "Article", icon: Book },
    { value: "Video", icon: Video },
    { value: "Exercise", icon: Wind },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Wellness Resources</h1>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {resourceTypes.map((type) => (
             <TabsTrigger value={type.value} key={type.value} className="gap-2">
                <type.icon className="h-4 w-4" /> 
                <span>{type.value}s</span>
             </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-0">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </TabsContent>
        {resourceTypes.map((type) => (
          <TabsContent value={type.value} key={type.value}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-0">
              {resources
                .filter((r) => r.type === type.value)
                .map((resource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const ResourceCard = ({ resource }: { resource: (typeof resources)[0] }) => {
    return (
         <Link href={resource.href} target={resource.href.startsWith('http') ? '_blank' : '_self'} rel={resource.href.startsWith('http') ? 'noopener noreferrer' : ''}>
            <Card className="h-full hover:shadow-lg transition-shadow bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <resource.Icon className="h-8 w-8 text-primary" />
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                 <div className="text-xs font-semibold text-primary mt-4">{resource.type}</div>
              </CardContent>
            </Card>
          </Link>
    )
}
