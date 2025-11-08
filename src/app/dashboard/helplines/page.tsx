
'use client';

import { LifeBuoy, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { helplines } from '@/lib/data';

export default function HelplinesPage() {
  const HelplineCard = ({ helpline }: { helpline: (typeof helplines)[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{helpline.name}</CardTitle>
          <Badge variant='secondary'>
            {helpline.region}
          </Badge>
        </div>
        <CardDescription>{helpline.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-lg font-semibold font-mono">{helpline.number}</p>
        <Button asChild variant="outline">
          <a href={`tel:${helpline.number.replace(/\s/g, '')}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3">
        <LifeBuoy className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Helpline Access</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Immediate Support</CardTitle>
          <CardDescription>
            If you are in distress or need someone to talk to, please reach out
            to one of the helplines below. You are not alone.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {helplines.map((helpline) => (
          <HelplineCard key={helpline.name} helpline={helpline} />
        ))}
      </div>
    </div>
  );
}
