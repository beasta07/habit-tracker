'use client'

import { useActionState } from 'react'
import { signUp } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, null)

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      {/* Background subtle grid */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <div className="w-5 h-5 rounded-full bg-indigo-400" />
          </div>
          <h1 className="text-2xl font-light text-white tracking-wide">
            focus<span className="text-indigo-400 font-medium">flow</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">Your calm productivity space</p>
        </div>

        {/* Card */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-light text-white mb-1">Create an account</h2>
          <p className="text-zinc-500 text-sm mb-8">Start your focused journey</p>

          <form action={formAction} className="space-y-4">
            {/* Name */}
     

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            {/* Feedback */}
            {state?.message && (
              <p className={`text-xs ${state.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {state.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors duration-200 mt-2"
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-zinc-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}