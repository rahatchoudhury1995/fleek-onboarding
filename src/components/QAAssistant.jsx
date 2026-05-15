import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are the Fleek onboarding assistant — warm, direct, and a little bit fun. You help new Fleek hires get answers to any questions they have before and during their first week. You only answer based on the information below. If you don't know something, say so honestly and suggest they email people@joinfleek.com. Never be corporate. Never be stiff. Talk like a knowledgeable colleague who genuinely wants to help.

COMPANY
Fleek's mission: Make secondhand the first choice. Founded November 2021 by Abhi Arora (CEO) and Sanket Agarwal (CTO). Post-Series B. Backed by a16z, Y Combinator, HV Capital, Burda Principal Investments. Team: 100+ globally, ~25 in London.

VALUES
1. Dream Big and Disrupt Yourself
2. Absolute Ownership
3. Curiosity Leads the Way
4. Talk to the Customer
5. Embrace Diversity

HOW WE WORK
In-office 4-5 days per week. One day at home for deep work. Non-hierarchical, high-ownership, execution-focused. AI is expected in your day-to-day work.

OFFICE
Address: Fleek HQ, Commercial Street, E1, London. Nearest stations: Liverpool Street (5 min), Aldgate (7 min), Shoreditch High Street (8 min). Arrive on day one at 9:00am. Ask for Hatty Choudhury (People Ops & Workspace Manager) at reception. Bring photo ID.

DRESS CODE
No formal dress code. Wear what feels like you. We have taste, not rules.

TOOLS
Slack, Notion, Gmail, Deel. Equipment set up before day one.

ONBOARDING
All new joiners get an intro call with Abhi (CEO) in their first week. Right to work comes via Deel before day one. Tax code can follow later. 30 day check-in with manager. 90 day goals set in month one.

BENEFITS
Competitive salary. Private health insurance. Pension contributions. 25 days holiday plus bank holidays. Learning and development budget. Equipment of your choice. Regular team events, offsites, and All Hands.

ACCESSIBILITY
The London office is accessible. For specific requirements or adjustments email people@joinfleek.com as early as possible.

LOCAL AREA — SHOREDITCH
Coffee: Allpress Espresso (Redchurch St), Ozone Coffee (Leonard St), Nude Coffee (Hanbury St)
Lunch: Dishoom Shoreditch (Boundary St), Pilpel (Brushfield St), Bleecker Burger (Spitalfields), Spitalfields Market
After work: The Culpeper (Commercial St), Trapeze (Old St), The Ten Bells (Commercial St), Nightjar (City Rd)

IF YOU DON'T KNOW SOMETHING
Ask your manager, ask in Slack #general, or email people@joinfleek.com for HR and ops queries.`

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#FFD400',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function QAAssistant({ firstName }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const key = import.meta.env.VITE_ANTHROPIC_API_KEY
    console.log('[QAAssistant] API key prefix:', key ? key.slice(0, 10) + '...' : 'NOT FOUND')
  }, [])

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      })

      if (!response.ok) {
        const errBody = await response.text().catch(() => '')
        console.error('[QAAssistant] API error:', response.status, errBody)
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const assistantText = data.content?.[0]?.text || "I'm having a moment — drop a note to people@joinfleek.com and someone will get back to you. ✦"
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantText }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a moment — drop a note to people@joinfleek.com and someone will get back to you. ✦",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 md:right-6 z-50 flex flex-col shadow-2xl rounded-2xl overflow-hidden fade-in"
          style={{
            width: 'min(360px, calc(100vw - 2rem))',
            height: '480px',
            backgroundColor: '#F6F1E7',
            border: '1px solid rgba(51,51,51,0.12)',
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: '#1D1A0E' }}
          >
            <div>
              <h3
                className="font-display text-xl"
                style={{ color: '#FFD400', fontFamily: '"Bebas Neue", sans-serif' }}
              >
                Ask Fleek ✦
              </h3>
              <p
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"DM Sans", sans-serif' }}
              >
                Your onboarding companion — ask me anything.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Close chat"
              style={{ minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="text-center mt-8">
                <p
                  className="text-sm"
                  style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
                >
                  {firstName ? `Hey ${firstName}! ` : ''}Ask me anything about Fleek, your first day, benefits, or the office.
                </p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="px-4 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed"
                  style={{
                    backgroundColor: msg.role === 'user' ? '#FFD400' : 'white',
                    color: msg.role === 'user' ? '#1D1A0E' : '#0F0F0F',
                    fontFamily: '"DM Sans", sans-serif',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl"
                  style={{ backgroundColor: 'white', borderRadius: '18px 18px 18px 4px' }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 flex gap-2 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(51,51,51,0.1)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none border transition-colors"
              style={{
                backgroundColor: 'white',
                borderColor: 'rgba(51,51,51,0.2)',
                color: '#0F0F0F',
                fontFamily: '"DM Sans", sans-serif',
                minHeight: '44px',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#FFD400', color: '#1D1A0E' }}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#FFD400' }}
        aria-label={isOpen ? 'Close chat' : 'Open Fleek assistant'}
      >
        {isOpen ? (
          <span className="text-xl" style={{ color: '#1D1A0E' }}>✕</span>
        ) : (
          <span className="text-2xl" style={{ color: '#1D1A0E' }}>✦</span>
        )}
      </button>
    </>
  )
}
