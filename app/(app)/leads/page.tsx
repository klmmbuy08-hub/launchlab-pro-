'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, MoreVertical, Mail, Phone, Calendar } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed'
  source: string
  created_date: string
  value: number
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/leads')
      const result = await response.json()
      if (result.success) {
        setLeads(result.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    new: 'bg-blue-500/10 text-blue-400',
    contacted: 'bg-yellow-500/10 text-yellow-400',
    qualified: 'bg-purple-500/10 text-purple-400',
    proposal: 'bg-orange-500/10 text-orange-400',
    closed: 'bg-green-500/10 text-green-400',
  }

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true
    return lead.status === filter
  })

  if (loading) {
    return <div className="flex items-center justify-center min-h-[600px]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads &amp; Prospects</h1>
          <p className="text-[#6B7280] mt-1">Manage your sales pipeline</p>
        </div>
        <Button size="lg"><Plus className="w-4 h-4 mr-2" />Add Lead</Button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B7280]" />
          <input type="text" placeholder="Search leads..." className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-[#262626] rounded-lg text-white" />
        </div>
        <Button><Filter className="w-4 h-4 mr-2" />Filter</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-[#171717] border border-[#262626]">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-3">
          {filteredLeads.length === 0 ? (
            <Card className="bg-[#171717] border-[#262626]">
              <CardContent className="py-12 text-center text-[#6B7280]">
                No leads found. Create your first lead!
              </CardContent>
            </Card>
          ) : (
            filteredLeads.map(lead => (
              <Card key={lead.id} className="bg-[#171717] border-[#262626]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{lead.name}</h3>
                      <p className="text-sm text-[#6B7280]">{lead.company}</p>
                      <div className="flex gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1 text-[#6B7280]">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1 text-[#6B7280]">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                      <div className="text-lg font-bold text-white mt-2">{lead.value ? '$' + lead.value.toLocaleString() : '-'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
