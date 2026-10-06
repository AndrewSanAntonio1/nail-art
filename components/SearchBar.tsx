"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Mic, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SpeechResult = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechResult) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  const ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (typeof ctor !== "function") return null;
  return ctor as new () => SpeechRecognitionInstance;
}

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const [photo, setPhoto] = useState<{ url: string; name: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recogRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 200);
    return () => clearTimeout(t);
  }, [local, value, onChange]);

  useEffect(() => {
    return () => {
      recogRef.current?.stop();
      if (photo) URL.revokeObjectURL(photo.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVoice = () => {
    if (listening) {
      recogRef.current?.stop();
      return;
    }
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setVoiceError(true);
      return;
    }
    setVoiceError(false);
    const recog = new Ctor();
    recogRef.current = recog;
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.onresult = (event) => {
      const transcript = event.results[event.results.length - 1]?.[0]?.transcript ?? "";
      if (transcript.trim()) {
        setLocal(transcript.trim());
        onChange(transcript.trim());
      }
    };
    recog.onerror = () => setVoiceError(true);
    recog.onend = () => {
      setListening(false);
      recogRef.current = null;
    };
    setListening(true);
    recog.start();
  };

  const onFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const clearPhoto = () => {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex h-12 w-full items-center gap-1 rounded-full border border-border bg-card py-1 pl-6 pr-2 transition-shadow duration-150 hover:shadow-md">
        <label htmlFor="gallery-search" className="sr-only">
          Search nail art designs
        </label>
        <input
          id="gallery-search"
          type="search"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onChange(local);
          }}
          placeholder="Search nail art designs"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {local && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setLocal("");
              onChange("");
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
        <button
          type="button"
          aria-label={listening ? "Stop voice search" : "Search by voice"}
          aria-pressed={listening}
          onClick={toggleVoice}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-muted",
            listening ? "text-red-500" : "text-muted-foreground"
          )}
        >
          <span className="relative">
            <Mic className="h-5 w-5" />
            {listening && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-red-500" />
            )}
          </span>
        </button>
        <button
          type="button"
          aria-label="Upload a photo to search"
          onClick={() => fileRef.current?.click()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <Camera className="h-5 w-5" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          aria-hidden="true"
          tabIndex={-1}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <button
          type="button"
          aria-label="Search now"
          onClick={() => onChange(local)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
      {voiceError && (
        <p role="status" className="mt-1 pl-6 text-xs text-muted-foreground">
          Voice search isn&apos;t supported in this browser — try typing instead.
        </p>
      )}
      {photo && (
        <div className="mt-2 flex items-center gap-2 pl-2">
          <Image
            src={photo.url}
            alt={`Uploaded photo ${photo.name}`}
            width={80}
            height={80}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="max-w-40 truncate text-xs text-muted-foreground">{photo.name}</span>
          <button
            type="button"
            aria-label="Remove uploaded photo"
            onClick={clearPhoto}
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <span aria-live="polite" className="sr-only">
        {listening ? "Listening… speak now" : ""}
      </span>
    </div>
  );
}
