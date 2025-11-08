
"use client";

import { Moon, Palette, Sun, Shield, Bell, FileDown, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();

  const setTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
     toast({
      title: "Theme Updated",
      description: `Switched to ${theme} mode.`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your new preferences have been saved.",
    });
  }

  const handleDataExport = () => {
    toast({
        title: "Data Export Requested",
        description: "Your data export will begin shortly. This is a placeholder action.",
    });
  };

  const handleDeleteAccount = () => {
     toast({
        variant: "destructive",
        title: "Account Deletion Requested",
        description: "Your account is scheduled for deletion. This is a placeholder action.",
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setTheme('light')}>
                        <Sun className="h-4 w-4" />
                         <span className="sr-only">Set light theme</span>
                    </Button>
                     <Button variant="outline" size="icon" onClick={() => setTheme('dark')}>
                        <Moon className="h-4 w-4" />
                         <span className="sr-only">Set dark theme</span>
                    </Button>
                </div>
             </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="h-6 w-6 text-primary" />
                    <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>
                    Manage your notification preferences.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="reminders" className="font-medium">Daily Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive daily prompts to check in.</p>
                    </div>
                    <Switch id="reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="ai-suggestions" className="font-medium">AI Suggestions</Label>
                        <p className="text-sm text-muted-foreground">Get personalized resource recommendations.</p>
                    </div>
                    <Switch id="ai-suggestions" defaultChecked />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <CardTitle>Privacy</CardTitle>
                </div>
                <CardDescription>
                    Manage your data and account settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <p className="font-medium">Export My Data</p>
                        <p className="text-sm text-muted-foreground">Download a copy of your personal data.</p>
                    </div>
                    <Button variant="outline" onClick={handleDataExport}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
                    <div className="space-y-0.5">
                        <p className="font-medium text-destructive">Delete Account</p>
                        <p className="text-sm text-destructive/80">Permanently delete your account and all your data.</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
