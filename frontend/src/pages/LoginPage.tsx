import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TrendingUp, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const result = await login(data.email, data.password)
    if (result.success) {
      toast({ title: 'Welcome back!', description: 'Login successful.', variant: 'default' })
      navigate('/dashboard')
    } else {
      toast({ title: 'Login failed', description: result.error ?? 'Invalid credentials', variant: 'destructive' })
    }
  }

  return (
    <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 lg:hidden">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Sign In</CardTitle>
        <CardDescription>Access Philix Finance Management System</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@philix.zm"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : 'Sign In'}
          </Button>
        </form>

        <div className="mt-5 p-3 bg-slate-700/50 rounded-md border border-slate-600">
          <p className="text-xs text-slate-400 font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1.5">
            {[
              { email: 'admin@philix.zm', pass: 'Admin@123', role: 'Super Admin' },
              { email: 'officer@philix.zm', pass: 'Officer@123', role: 'Loan Officer' },
            ].map(({ email, pass, role }) => (
              <button
                key={email}
                type="button"
                onClick={() => { setValue('email', email); setValue('password', pass) }}
                className="w-full text-left p-2 bg-slate-800 rounded text-xs hover:bg-slate-700 transition-colors border border-slate-600"
              >
                <span className="text-emerald-400 font-medium">{role}</span>
                <span className="text-slate-400 ml-2">{email}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
