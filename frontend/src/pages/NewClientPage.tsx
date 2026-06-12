import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  nrcNumber: z.string().min(9, 'Enter valid NRC number'),
  phone: z.string().min(10, 'Enter valid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().min(5, 'Required'),
  occupation: z.string().min(1, 'Required'),
})
type FormData = z.infer<typeof schema>

export default function NewClientPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    toast({ title: 'Client Registered', description: `${data.firstName} ${data.lastName} has been registered successfully.` })
    navigate('/clients')
  }

  const field = (label: string, name: keyof FormData, type = 'text', placeholder?: string) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder ?? label} {...register(name)} className={errors[name] ? 'border-red-500' : ''} />
      {errors[name] && <p className="text-xs text-red-400">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <div className="space-y-4 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-1.5" />Back</Button>

      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">Register New Client</h2><p className="text-sm text-slate-400">Create a new client profile</p></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Personal Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {field('First Name', 'firstName')}
            {field('Last Name', 'lastName')}
            {field('NRC Number', 'nrcNumber', 'text', '145782/10/1')}
            {field('Phone Number', 'phone', 'tel', '0977XXXXXX')}
            {field('Email Address', 'email', 'email', 'optional')}
            {field('Home Address', 'address', 'text', 'Plot 45, Lusaka')}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Employment / Business</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Occupation</Label>
              <Select {...register('occupation')}>
                <SelectTrigger><SelectValue placeholder="Select occupation" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Civil Servant">Civil Servant</SelectItem>
                  <SelectItem value="Small Business Owner">Small Business Owner</SelectItem>
                  <SelectItem value="Market Trader">Market Trader</SelectItem>
                  <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Employer / University</Label><Input placeholder="Name of employer or university" /></div>
            <div className="space-y-1.5"><Label>Monthly Income (ZMW)</Label><Input type="number" placeholder="0.00" /></div>
            <div className="space-y-1.5"><Label>Student ID (if applicable)</Label><Input placeholder="UNZA/2024/XXXX" /></div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate('/clients')}>Cancel</Button>
          <Button type="submit"><Save className="w-4 h-4 mr-1.5" />Register Client</Button>
        </div>
      </form>
    </div>
  )
}
