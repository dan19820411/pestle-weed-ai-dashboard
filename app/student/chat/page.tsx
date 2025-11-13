'use client'

import { useState } from 'react'
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'

// Intelligent response system based on keywords and context
const getAIResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase()
  
  // Math topics
  if (msg.includes('algebra') || msg.includes('equation')) {
    return `Let me help you with algebra! An equation is a mathematical statement that shows two expressions are equal, like 2x + 3 = 7. To solve it, we isolate the variable:
    
Step 1: Subtract 3 from both sides: 2x = 4
Step 2: Divide both sides by 2: x = 2

Would you like me to explain any specific algebra concept?`
  }
  
  if (msg.includes('geometry') || msg.includes('triangle') || msg.includes('angle')) {
    return `Geometry is fascinating! Here's what you should know:

**Triangles:** Three-sided shapes where all angles add up to 180°
**Types:** Equilateral (all sides equal), Isosceles (two sides equal), Scalene (all different)
**Key formula:** Area = 1/2 × base × height

What specific geometry topic would you like to explore?`
  }
  
  if (msg.includes('fraction') || msg.includes('decimal')) {
    return `Great question about fractions and decimals!

**Fractions** represent parts of a whole (like 3/4)
**Decimals** are another way to show parts (like 0.75)
**Converting:** To convert 3/4 to decimal, divide 3 ÷ 4 = 0.75

Example: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75

Need help with a specific conversion or operation?`
  }
  
  // Science topics
  if (msg.includes('photosynthesis')) {
    return `Photosynthesis is how plants make food! Here's the simple explanation:

📗 **What:** Plants convert sunlight + water + CO₂ into glucose (food) + oxygen
📗 **Where:** In chloroplasts (green parts of leaves)
📗 **Equation:** 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

**Remember:** Plants take in CO₂ and release O₂ - the opposite of what we do!

Would you like to know about the light and dark reactions?`
  }
  
  if (msg.includes('force') || msg.includes('motion') || msg.includes('newton')) {
    return `Newton's Laws of Motion - the foundation of physics!

**Newton's First Law (Inertia):** An object at rest stays at rest; an object in motion stays in motion unless acted upon by force.

**Newton's Second Law:** F = ma (Force = mass × acceleration)
- More mass = harder to move
- More force = more acceleration

**Newton's Third Law:** For every action, there's an equal and opposite reaction.
Example: When you jump, you push Earth down and Earth pushes you up!

What would you like me to clarify?`
  }
  
  if (msg.includes('cell') || msg.includes('biology')) {
    return `Cells are the building blocks of life! 🔬

**Two main types:**
1. **Prokaryotic** (bacteria) - No nucleus
2. **Eukaryotic** (animals, plants) - Has nucleus

**Key parts of animal cell:**
- Nucleus: Control center (brain of cell)
- Mitochondria: Powerhouse (makes energy)
- Cell membrane: Protective barrier
- Cytoplasm: Jelly-like substance

**Plant cells also have:** Cell wall, chloroplasts, large vacuole

Need more details about any organelle?`
  }
  
  // English topics
  if (msg.includes('grammar') || msg.includes('noun') || msg.includes('verb')) {
    return `Let's master grammar! 📚

**Parts of Speech:**
- **Noun:** Person, place, thing (dog, park, happiness)
- **Verb:** Action word (run, think, is)
- **Adjective:** Describes noun (big, blue, happy)
- **Adverb:** Describes verb (quickly, very, well)
- **Pronoun:** Replaces noun (he, she, it, they)

**Example:** "The quick brown fox jumps swiftly"
- "fox" = noun
- "jumps" = verb
- "quick, brown" = adjectives
- "swiftly" = adverb

What grammar concept should we practice?`
  }
  
  if (msg.includes('essay') || msg.includes('writing')) {
    return `Let me help you write better essays! ✍️

**Essay Structure (5 Paragraphs):**

1. **Introduction** (Hook + Thesis)
   - Grab attention
   - State your main point

2. **Body Paragraph 1** (First Reason)
   - Topic sentence
   - Evidence/Examples
   - Explanation

3. **Body Paragraph 2** (Second Reason)
4. **Body Paragraph 3** (Third Reason)

5. **Conclusion** (Restate + Final Thought)
   - Summarize main points
   - Leave strong impression

**Pro tip:** Use transition words like "First," "Moreover," "Therefore," "In conclusion"

What type of essay are you working on?`
  }
  
  // Social Studies
  if (msg.includes('history') || msg.includes('independence') || msg.includes('gandhi')) {
    return `Indian Independence Movement - a remarkable story! 🇮🇳

**Key Events:**
- **1857:** First War of Independence
- **1920s:** Non-Cooperation Movement led by Gandhi
- **1930:** Salt March (Dandi March)
- **1942:** Quit India Movement
- **1947:** India gains independence (August 15)

**Important Leaders:**
- Mahatma Gandhi (Father of the Nation)
- Jawaharlal Nehru (First Prime Minister)
- Sardar Patel (Iron Man of India)
- Subhas Chandra Bose (Netaji)

Want to know about a specific event or leader?`
  }
  
  if (msg.includes('geography') || msg.includes('map') || msg.includes('continent')) {
    return `Let's explore Geography! 🌍

**7 Continents:**
1. Asia (largest)
2. Africa
3. North America
4. South America
5. Antarctica
6. Europe
7. Australia/Oceania (smallest)

**5 Oceans:**
1. Pacific (largest)
2. Atlantic
3. Indian
4. Southern
5. Arctic (smallest)

**India's Geography:**
- Continent: Asia
- Neighbors: 7 countries
- Major rivers: Ganga, Brahmaputra, Godavari
- Mountain range: Himalayas (north)

What geographical topic interests you?`
  }
  
  // Homework help
  if (msg.includes('homework') || msg.includes('assignment')) {
    return `I'm here to help with your homework! 📝

To give you the best help, please tell me:
1. **Subject:** Math, Science, English, or Social Studies?
2. **Topic:** What specific concept?
3. **Question:** What are you stuck on?

Example: "I need help with my math homework on solving quadratic equations"

Share your question and I'll guide you step-by-step!`
  }
  
  // Study tips
  if (msg.includes('study') || msg.includes('exam') || msg.includes('test')) {
    return `Here are proven study tips for success! 🎯

**Before Exam:**
1. **Create a schedule** - Plan what to study each day
2. **Active recall** - Test yourself, don't just read
3. **Space it out** - Study over several days, not all at once
4. **Teach others** - Explain concepts to friends/family
5. **Practice questions** - Solve past papers

**During Study:**
- Take 10-min breaks every 50 minutes
- Remove distractions (phone away!)
- Use diagrams and mind maps
- Write notes in your own words

**Exam Day:**
- Get good sleep (8 hours)
- Eat a healthy breakfast
- Read questions carefully
- Manage your time

You've got this! Which exam are you preparing for?`
  }
  
  // Quiz request
  if (msg.includes('quiz') || msg.includes('test me') || msg.includes('question')) {
    return `Great! Let's test your knowledge! 🎯

**Quick Quiz - Choose a topic:**

1. **Mathematics** - Algebra, Geometry, or Fractions?
2. **Science** - Biology, Chemistry, or Physics?
3. **English** - Grammar, Vocabulary, or Comprehension?
4. **Social Studies** - History, Geography, or Civics?

Just tell me which topic and I'll create a mini-quiz for you!

Example: "Give me a math quiz on fractions"`
  }
  
  // Default helpful response
  return `I'm here to help you learn! I can explain concepts in:

📘 **Mathematics:** Algebra, Geometry, Fractions, Equations
📗 **Science:** Physics, Chemistry, Biology, Experiments
📕 **English:** Grammar, Writing, Vocabulary, Essays
📙 **Social Studies:** History, Geography, Civics

I can also:
- ✏️ Help with homework
- 📝 Create quizzes to test you
- 📚 Give study tips
- 🎯 Break down complex topics

What subject or topic would you like to explore?`
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI study assistant. I can help you with Math, Science, English, and Social Studies. What would you like to learn about today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay for realistic feel
    setTimeout(() => {
      const aiResponse = getAIResponse(input)
      const newMessage = {
        role: 'assistant',
        content: aiResponse
      }
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Study Assistant</h1>
            <p className="text-purple-100">Get instant help with your studies</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 animate-fade-in ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`p-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-blue-600" />
              ) : (
                <Bot className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div className={`flex-1 max-w-2xl ${
              message.role === 'user' ? 'text-right' : ''
            }`}>
              <div className={`inline-block p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow border border-gray-200'
              }`}>
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div className="bg-white shadow border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            placeholder="Ask me anything about your studies..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span>Send</span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Quick questions:</span>
          {[
            'Explain photosynthesis',
            'Help with algebra',
            'Give me a science quiz',
            'Study tips for exams',
            'Explain Newton\'s laws'
          ].map(q => (
            <button
              key={q}
              onClick={() => setInput(q)}
              disabled={isTyping}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
