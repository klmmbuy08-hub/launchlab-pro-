'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAgent } from '@/lib/hooks/use-agent'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function AgentTestPage() {
  const ceoAgent = useAgent('ceo')
  const cmoAgent = useAgent('cmo')
  const salesAgent = useAgent('sales')

  const [formData, setFormData] = useState({
    productName: 'Masterclass de Copywriting',
    productType: 'course',
    price: 997,
    targetAudience: 'Emprendedores digitales que quieren mejorar sus ventas',
    launchDate: '',
  })

  const testCEO = async () => {
    try {
      const result = await ceoAgent.execute(formData)
      console.log('CEO Result:', result)
    } catch (error) {
      console.error('CEO Error:', error)
    }
  }

  const testCMO = async () => {
    try {
      const result = await cmoAgent.execute({
        task: 'hooks',
        productName: formData.productName,
        targetAudience: formData.targetAudience,
      })
      console.log('CMO Result:', result)
    } catch (error) {
      console.error('CMO Error:', error)
    }
  }

  const testSales = async () => {
    try {
      const result = await salesAgent.execute({
        task: 'landing',
        productName: formData.productName,
        price: formData.price,
        targetAudience: formData.targetAudience,
        mainProblem: 'No saben escribir copy que convierte',
      })
      console.log('Sales Result:', result)
    } catch (error) {
      console.error('Sales Error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">
          🧪 Test de Agentes IA
        </h1>
        <p className="text-neutral-400">
          Prueba los agentes con datos reales
        </p>
      </div>

      {/* Form */}
      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardHeader>
          <CardTitle>Datos del Lanzamiento</CardTitle>
          <CardDescription>Información base para los agentes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre del Producto</Label>
            <Input
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="bg-neutral-900 border-neutral-700"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-100"
              >
                <option value="course">Curso</option>
                <option value="mentorship">Mentoría</option>
                <option value="community">Comunidad</option>
                <option value="ebook">eBook</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Precio ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Audiencia Objetivo</Label>
            <Textarea
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="bg-neutral-900 border-neutral-700"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent Tests */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CEO Test */}
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Agent CEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={testCEO}
              disabled={ceoAgent.loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              {ceoAgent.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generar Estrategia
            </Button>

            {ceoAgent.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-400">{ceoAgent.error}</span>
              </div>
            )}

            {ceoAgent.result && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-400">¡Estrategia generada!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CMO Test */}
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              Agent CMO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={testCMO}
              disabled={cmoAgent.loading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500"
            >
              {cmoAgent.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generar Hooks
            </Button>

            {cmoAgent.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-400">{cmoAgent.error}</span>
              </div>
            )}

            {cmoAgent.result && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-400">¡Hooks generados!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sales Test */}
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Agent Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={testSales}
              disabled={salesAgent.loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              {salesAgent.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generar Landing
            </Button>

            {salesAgent.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-400">{salesAgent.error}</span>
              </div>
            )}

            {salesAgent.result && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-400">¡Landing generada!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results Display */}
      {(ceoAgent.result || cmoAgent.result || salesAgent.result) && (
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-neutral-300 overflow-auto max-h-96 bg-neutral-900 p-4 rounded-lg">
              {JSON.stringify({
                ceo: ceoAgent.result,
                cmo: cmoAgent.result,
                sales: salesAgent.result,
              }, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
