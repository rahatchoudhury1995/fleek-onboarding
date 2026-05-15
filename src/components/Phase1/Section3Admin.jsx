import { useState } from 'react'

function Input({ id, label, value, onChange, placeholder, required, subtext, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-semibold"
        style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
      >
        {label}
        {required && <span style={{ color: '#FFD400' }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-sm border outline-none focus:border-pitch-black transition-colors"
        style={{
          backgroundColor: 'white',
          borderColor: 'rgba(51,51,51,0.2)',
          color: '#0F0F0F',
          fontFamily: '"DM Sans", sans-serif',
          minHeight: '44px',
        }}
      />
      {subtext && (
        <p
          className="text-xs"
          style={{ color: 'rgba(51,51,51,0.6)', fontFamily: '"DM Sans", sans-serif' }}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}

export default function Section3Admin({ formData, updateFormData, onComplete }) {
  const payroll = formData.payroll || {}
  const [validationError, setValidationError] = useState('')

  const update = (field, value) => {
    updateFormData('payroll', { ...payroll, [field]: value })
  }

  const canProceed =
    payroll.nameOnAccount?.trim() &&
    payroll.accountNumber?.trim() &&
    payroll.sortCode?.trim()

  const handleSubmit = () => {
    if (!canProceed) {
      setValidationError('Please fill in the required payroll fields.')
      return
    }
    setValidationError('')
    onComplete()
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Intro */}
      <p
        className="text-lg font-semibold"
        style={{ color: '#FFD400', fontFamily: '"DM Sans", sans-serif' }}
      >
        The unglamorous bit. Let's get it done. ✦
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Payroll card */}
        <div
          className="p-6 rounded-xl border"
          style={{ backgroundColor: 'white', borderColor: 'rgba(51,51,51,0.15)' }}
        >
          <h2
            className="font-display text-2xl mb-5"
            style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
          >
            Payroll Details ✦
          </h2>
          <div className="flex flex-col gap-4">
            <Input
              id="nameOnAccount"
              label="Name on Account"
              value={payroll.nameOnAccount || ''}
              onChange={(v) => update('nameOnAccount', v)}
              placeholder="As it appears on your bank account"
              required
            />
            <Input
              id="accountNumber"
              label="Account Number"
              value={payroll.accountNumber || ''}
              onChange={(v) => update('accountNumber', v)}
              placeholder="8 digits"
              required
            />
            <Input
              id="sortCode"
              label="Sort Code"
              value={payroll.sortCode || ''}
              onChange={(v) => update('sortCode', v)}
              placeholder="XX-XX-XX"
              required
            />
            <Input
              id="taxCode"
              label="Tax Code"
              value={payroll.taxCode || ''}
              onChange={(v) => update('taxCode', v)}
              placeholder="e.g. 1257L"
              subtext="Don't worry if you don't have this yet — but we'll need it as soon as you do."
            />
          </div>
        </div>

        {/* Right to Work card */}
        <div
          className="p-6 rounded-xl border-2 flex flex-col gap-4"
          style={{ backgroundColor: 'white', borderColor: '#FFD400' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <h2
              className="font-display text-2xl"
              style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Right to Work Verification ✦
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            You'll receive an email from Deel before your first day. Keep an eye out for it and complete it as soon as possible — it's required before you can officially start. ✦
          </p>
        </div>
      </div>

      {validationError && (
        <p
          className="text-sm font-semibold"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          {validationError}
        </p>
      )}

      {/* CTA */}
      <div className="pb-4">
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="w-full sm:w-auto py-4 px-10 rounded-lg font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
          style={{
            backgroundColor: '#FFD400',
            color: '#1D1A0E',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          All done ✦
        </button>
      </div>
    </div>
  )
}
