'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Lock, Users, Zap } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-[#6B7280] mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-[#171717] border border-[#262626]">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-[#171717] border-[#262626]">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                <p className="text-white">Email Notifications</p>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                <p className="text-white">Weekly Digest</p>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-[#171717] border-[#262626]">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#1A1A1A] rounded-lg">
                <p className="text-white mb-2">Two-Factor Authentication</p>
                <Button size="sm">Enable 2FA</Button>
              </div>
              <div className="p-4 bg-[#1A1A1A] rounded-lg">
                <p className="text-white mb-2">API Keys</p>
                <div className="bg-[#171717] p-3 rounded font-mono text-xs text-[#6B7280] mb-2">
                  sk_live_••••••••••••••••
                </div>
                <Button size="sm" variant="outline">Regenerate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-[#171717] border-[#262626]">
            <CardHeader>
              <CardTitle className="text-white">Connected Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Instagram', 'LinkedIn', 'Meta Ads', 'Pipedrive'].map((service, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#1A1A1A] rounded">
                  <p className="text-white">{service}</p>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="bg-[#171717] border-[#262626]">
            <CardHeader>
              <CardTitle className="text-white">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-[#1A1A1A] rounded mb-4">
                <p className="text-white">you@example.com</p>
                <p className="text-sm text-[#6B7280]">Owner</p>
              </div>
              <Button>Add Team Member</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
