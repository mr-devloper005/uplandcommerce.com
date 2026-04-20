"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f6faf8] text-[#132722]">
      <NavbarShell />
      <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-[2rem] border border-[#c5ddd4] bg-white p-8 shadow-[0_24px_60px_rgba(15,42,35,0.1)] sm:p-10"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#3d5a52] hover:text-[#0f241f]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-[#0f241f]">
                Reset your password
              </h1>
              <p className="mb-8 text-sm leading-relaxed text-[#3d5a52]">
                Enter your email and we&apos;ll send a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#0f241f]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3d5a52]/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-[#c5ddd4] bg-white pl-10 focus-visible:ring-[#1B4332]/25"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#1B4332] text-white hover:bg-[#2d5a47]"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5ee9b0]/25">
                <CheckCircle className="h-8 w-8 text-[#1B4332]" />
              </div>
              <h1 className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-[#0f241f]">
                Check your email
              </h1>
              <p className="mb-8 text-sm leading-relaxed text-[#3d5a52]">
                We&apos;ve sent a password reset link to <strong className="text-[#0f241f]">{email}</strong>
              </p>
              <Button
                asChild
                variant="outline"
                className="h-12 w-full rounded-full border-[#c5ddd4] bg-white text-[#1B4332] hover:bg-[#e8f2ed]"
              >
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-[#3d5a52]">
                Didn&apos;t receive the email?{" "}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="font-semibold text-[#1B4332] hover:underline"
                >
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
