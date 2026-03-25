'use client'

import { useState, useRef } from 'react'
import { format } from 'date-fns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createJournal, deleteJournal, fetchJournals, updateJournal } from '@/app/actions/journal'

type Journal = {
  id: number
  title: string
  content: string
  mood: number
  prompt: string | null
  userId: number
  createdAt: Date
}
const PROMPTS = [
  'What went well today?',
  'What drained me?',
  'One win today',
  "What I'd do differently",
  "How's my focus been?",
]

const MOODS = ['😔', '😕', '😐', '🙂', '😄']

export default function JournalPage() {
  const [selectedJournal, setSelectedJournal] = useState<null | {
    id: number
    title: string
    content: string
    mood: number
    prompt: string | null
    userId: number
    createdAt: Date
  }>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<number>(3)
  const [isNew, setIsNew] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  // TODO: useQuery for journals
  const {data:journals} = useQuery({
    queryKey:['journals'],
    queryFn:async() =>{
        const result = await fetchJournals()
        if (!result?.success) throw new Error (result?.message)
            console.log(result.journals,'Journals data in client side')
            return result.journals
    }
  })
  // TODO: useMutation for create, update, delete
   
  const {mutate:addJournal}= useMutation({
    mutationFn: createJournal,
    onSuccess:()=> {
        queryClient.invalidateQueries({ queryKey:['journals']})
          formRef.current?.reset();
          setSelectedJournal(null)
}
    
  })
  const {mutate:editJournal}= useMutation({
    mutationFn: updateJournal,
    onSuccess:()=> {queryClient.invalidateQueries({ queryKey:['journals']})
          formRef.current?.reset();
          setSelectedJournal(null)
}
  })
  const {mutate:removeJournal}= useMutation({
    mutationFn: deleteJournal,
    onSuccess:()=> {queryClient.invalidateQueries({ queryKey:['journals']})
          formRef.current?.reset();
          setSelectedJournal(null)
}
  })



  const handleNew = () => {
    setSelectedJournal(null)
    setSelectedPrompt(null)
    setSelectedMood(3)
    setIsNew(true)
  }

  const handleSelectJournal = (journal: Journal) => {
    setSelectedJournal(journal)
    setSelectedPrompt(journal?.prompt ?? null)
    setSelectedMood(journal?.mood ?? 3)
    setIsNew(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: get formData, append mood and prompt, call create or update mutation

    const formData = new FormData(e.currentTarget)
    formData.append('mood',String(selectedMood))
    if(selectedJournal){
        formData.append('id',String(selectedJournal?.id))
        editJournal(formData)
    }
    else {

        addJournal(formData)
    }
    // formData.append('id',String)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] grid grid-cols-[300px_1fr] px-20 font-sans text-white">
      {/* Sidebar */}
      <div className="border-r border-white/[0.07] px-5 py-10 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-light tracking-tight">Journal</h1>
          <button
          onClick={handleNew}
            className="w-7 h-7 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-white text-lg flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>

        {/* TODO: map journals here */}
        {/* Each entry card: */}
        { journals && 
         journals.map((journal:Journal)=> (
            <div
            key={journal?.id}
              onClick={() => handleSelectJournal(journal)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                selectedJournal?.id === journal?.id
                  ? 'border-indigo-500/40 bg-indigo-500/8'
                  : 'border-white/6 bg-white/2 hover:bg-white/6'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-zinc-200 truncate flex-1">{journal?.title}</span>
                <span className="text-sm ml-2">{MOODS[journal?.mood - 1]}</span>
              </div>
              <div className="text-xs text-zinc-300">{format(new Date(journal?.createdAt), 'MMM d')}</div>
              <div className="text-xs text-zinc-600 truncate mt-1">{journal?.content}</div>
            </div>

        ))}
        
        
      </div>

      {/* Writing area */}
    
        <form
          key={selectedJournal?.id ?? 'new'}
          ref={formRef}
          onSubmit={handleSubmit}
          className="px-16 py-12 flex flex-col gap-8 max-w-3xl"
        >
          <div className="text-xs text-zinc-500 uppercase tracking-widest">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>

          <input
            name="title"
            required
            defaultValue={selectedJournal?.title}
            placeholder="What's on your mind today?"
            className="bg-transparent border-none outline-none text-2xl font-light text-white placeholder-zinc-700 w-full tracking-tight"
          />

          <div className="h-px bg-white/6" />

          {/* Prompt chips */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest">Guided prompts</span>
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setSelectedPrompt(prompt === selectedPrompt ? null : prompt)}
                  className={`px-3 py-1.5 rounded-full border text-xs transition-all ${
                    selectedPrompt === prompt
                      ? 'border-indigo-500/40 bg-indigo-500/8 text-indigo-300'
                      : 'border-white/8 bg-white/3 text-zinc-500 hover:text-indigo-300 hover:border-indigo-500/40'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <textarea
            name="content"
            defaultValue={selectedJournal?.content}
            required
            placeholder="Start writing..."
            rows={8}
            className="bg-transparent border-none outline-none text-sm text-zinc-400 w-full resize-none leading-relaxed placeholder-zinc-700"
          />

          {/* Mood picker */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest">How are you feeling?</span>
            <div className="flex gap-3">
              {MOODS.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedMood(i + 1)}
                  className={`w-11 h-11 rounded-xl border text-xl flex items-center justify-center transition-all ${
                    selectedMood === i + 1
                      ? 'border-indigo-500/50 bg-indigo-500/12'
                      : 'border-white/7 bg-white/2 hover:border-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/6">
            <span className="text-xs text-zinc-600">
              {/* TODO: word count from content */}
            </span>
            <div className="flex gap-2">
              {selectedJournal && (
                <button
                  type="button"
                  onClick={() => removeJournal(selectedJournal?.id)}
                  className="px-4 py-2 bg-red-500/8 text-red-400 hover:bg-red-500/15 text-sm rounded-lg transition-colors"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors"
              >
                Save entry
              </button>
            </div>
          </div>
        </form>
  
    </div>
  )
}