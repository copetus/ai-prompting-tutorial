import { useState, useEffect, useMemo, useRef } from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import svgPaths from "./imports/svg-ox7gclqi1v";
import authorProfile from "./imports/author-profile.png";
import sparkleAvatar from "./imports/Sparkles Icon Animation-02.lottie?url";
import confettiAnimation from "./imports/Confetti-01.lottie?url";
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card } from './components/ui/card';

interface TutorialStep {
  id: number;
  title: string;
  instruction: string[];
  examples: string[];
  additionalExamples: string[];
  principle: string;
  inputMode: 'disabled' | 'enabled';
  completionMode: 'examples' | 'custom-input';
  requiredExampleCount?: number;
  blockedActionLabel: string;
}

interface LoadingState {
  header: boolean;
  authorAndBubble: boolean;
  chatArea: boolean;
  inputField: boolean;
  complete: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  viewed: boolean;
}

interface MessageBlock {
  type: 'paragraph' | 'bullet-list' | 'numbered-list' | 'divider';
  text?: string;
  items?: string[];
}

interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  blocks?: MessageBlock[];
}

interface GuideMessage {
  body: string[];
  actionLabel?: string;
}

interface StepActivity {
  sentExamples: string[];
  sentCustomInput: boolean;
  completed: boolean;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Be Specific and Clear",
    instruction: [
      "Start by comparing a broad request with a more specific one.",
      "For this step, use the two suggested prompts below. The input field is disabled on purpose so you can focus on the difference in output."
    ],
    examples: [
      "My team is remote and we want to have an end of year celebration.",
      "Provide a list of 10 ideas for a team event for a group of remote employees to celebrate the end of the year together."
    ],
    additionalExamples: [],
    principle: "Specificity transforms generic responses into actionable, valuable content."
    ,inputMode: 'disabled',
    completionMode: 'examples',
    requiredExampleCount: 2,
    blockedActionLabel: 'Try both suggested prompts'
  },
  {
    id: 2,
    title: "Provide Context",
    instruction: [
      "Now compare a request with missing context against one that names the audience, product, and situation.",
      "Use both suggested prompts so you can see how context narrows the response."
    ],
    examples: [
      "Write a launch email.",
      "Write a launch email for a SaaS company introducing a project management tool to small business owners who currently manage work in spreadsheets."
    ],
    additionalExamples: [],
    principle: "Context ensures AI responses are tailored to your specific situation and constraints."
    ,inputMode: 'disabled',
    completionMode: 'examples',
    requiredExampleCount: 2,
    blockedActionLabel: 'Compare both context prompts'
  },
  {
    id: 3,
    title: "Define the Format",
    instruction: [
      "Next, notice how a format request changes the usability of the answer.",
      "Run both prompts below and compare the unstructured response with the one that asks for a specific format."
    ],
    examples: [
      "Explain machine learning.",
      "Explain machine learning in 3 bullet points, each with a practical example for a business executive."
    ],
    additionalExamples: [],
    principle: "Format specifications ensure information is delivered in the most useful and actionable structure."
    ,inputMode: 'disabled',
    completionMode: 'examples',
    requiredExampleCount: 2,
    blockedActionLabel: 'Run both format prompts'
  },
  {
    id: 4,
    title: "Explore Tone and Style",
    instruction: [
      "Now the input field is open. Try your own prompt and deliberately ask for a tone or style.",
      "You can experiment freely here. Use a suggested starter or write your own prompt from scratch."
    ],
    examples: [
      "Rewrite a status update in a calm, executive-ready tone.",
      "Explain a product delay in a friendly, reassuring voice."
    ],
    additionalExamples: [
      "Turn a rough customer reply into something more empathetic.",
      "Rewrite an announcement so it sounds more direct and confident."
    ],
    principle: "Tone and style control ensures AI communication perfectly matches your audience and brand voice."
    ,inputMode: 'enabled',
    completionMode: 'custom-input',
    blockedActionLabel: 'Send your own prompt'
  },
  {
    id: 5,
    title: "Use Examples and Constraints",
    instruction: [
      "Finish by combining multiple techniques in one prompt: be specific, add context, request a format, and include at least one constraint.",
      "This is another open step. Write your own final prompt and use what you have learned."
    ],
    examples: [
      "Draft a customer update for a delayed launch in 3 bullets and keep it under 120 words.",
      "Create 3 LinkedIn post ideas for a sustainability brand, each under 100 words, ending with a question."
    ],
    additionalExamples: [
      "Write a recruiting email for senior designers, but keep it concise and warm.",
      "Ask for a meeting summary with action items and owners."
    ],
    principle: "Examples and constraints provide precise control, ensuring AI delivers exactly what you need within your specific requirements."
    ,inputMode: 'enabled',
    completionMode: 'custom-input',
    blockedActionLabel: 'Send your final prompt'
  }
];

const initialAchievements: Achievement[] = [
  {
    id: 'first-prompt',
    title: 'Wrote your very first prompt',
    description: 'Sent your first message to the AI',
    completed: false,
    viewed: false
  },
  {
    id: 'practiced-prompting',
    title: 'Compared broad and specific prompts',
    description: 'Completed the first guided comparison',
    completed: false,
    viewed: false
  },
  {
    id: 'generated-image',
    title: 'Added useful context',
    description: 'Completed the context step',
    completed: false,
    viewed: false
  },
  {
    id: 'refined-responses',
    title: 'Specified a clear output format',
    description: 'Completed the formatting step',
    completed: false,
    viewed: false
  },
  {
    id: 'systematic-methods',
    title: 'Explored with your own prompt',
    description: 'Experimented in the open exploration step',
    completed: false,
    viewed: false
  },
  {
    id: 'various-use-cases',
    title: 'Completed Intro to prompting',
    description: 'Finished the guided lesson',
    completed: false,
    viewed: false
  }
];

// Skeleton Components
function HeaderSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-60">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="skeleton animate-shimmer" style={{ width: '400px', height: '36px' }} />
          <div className="flex items-center gap-2">
            <div className="skeleton animate-shimmer" style={{ width: '120px', height: '24px' }} />
            <div className="skeleton animate-shimmer" style={{ width: '80px', height: '24px' }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="skeleton animate-shimmer rounded-full w-10 h-10" />
          <div className="skeleton animate-shimmer rounded-full w-10 h-10" />
          <div className="skeleton animate-shimmer rounded-full w-10 h-10" />
          <div className="skeleton animate-shimmer rounded-full w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

function ChatAreaSkeleton() {
  return (
    <div className="max-w-[500px] mx-auto">
      <div className="min-h-[400px] p-4 mb-6">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4 text-center max-w-md">
            <div className="skeleton animate-shimmer w-12 h-12 rounded-full" />
            <div className="skeleton animate-shimmer w-80 h-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="skeleton animate-shimmer rounded-2xl p-4" style={{ height: '80px' }} />
        <div className="skeleton animate-shimmer rounded-2xl p-4" style={{ height: '80px' }} />
      </div>
    </div>
  );
}

function InputFieldSkeleton() {
  return (
    <div className="mx-auto max-w-[920px] space-y-2">
      <div className="skeleton animate-shimmer rounded-[24px]" style={{ height: '40px' }} />
      <div className="flex items-center justify-center gap-2">
        <div className="skeleton animate-shimmer" style={{ width: '80px', height: '16px' }} />
        <div className="skeleton animate-shimmer" style={{ width: '60px', height: '16px' }} />
        <div className="skeleton animate-shimmer" style={{ width: '100px', height: '16px' }} />
      </div>
    </div>
  );
}

function AuthorBadge({
  onClick,
  buttonRef,
  isNudging = false,
  showPulse = false,
}: {
  onClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  isNudging?: boolean;
  showPulse?: boolean;
}) {
  return (
    <div className="relative h-24 w-24 shrink-0">
      {showPulse && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-6px] rounded-full border-[3px] app-accent-pulse-ring animate-author-avatar-pulse-ring"
        />
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={`pointer-events-auto relative h-24 w-24 cursor-pointer rounded-full bg-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.96] ${isNudging ? 'animate-author-avatar-nudge' : ''}`}
      >
        <div className="app-accent-ring absolute inset-0 rounded-full border-[3px]" />
        <div className="absolute inset-[2px] overflow-hidden rounded-full bg-white">
          <img
            src={authorProfile}
            alt="Author profile"
            className="h-full w-full scale-[0.88] object-contain"
            draggable={false}
          />
        </div>
      </button>
    </div>
  );
}

interface SpeechBubbleProps {
  instruction: string[];
  onNext: () => void;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
  actionLabel?: string;
  canAdvance: boolean;
  blockedActionLabel?: string;
  isLoading?: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
}

function useAnchoredPopoverPosition(
  anchorRef: React.RefObject<HTMLElement | null>,
  options: { width: number; maxWidth: number; topOffset: number; leftOffset?: number; edgePadding?: number; arrowHalfWidth?: number }
) {
  const {
    width: initialWidth,
    maxWidth,
    topOffset,
    leftOffset = 0,
    edgePadding = 24,
    arrowHalfWidth = 38.5,
  } = options;
  const [position, setPosition] = useState({ left: edgePadding, top: 160, width: initialWidth, arrowLeft: initialWidth / 2 });

  useEffect(() => {
    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const width = Math.min(maxWidth, window.innerWidth - edgePadding * 2);
      const left = Math.max(
        edgePadding,
        Math.min(rect.left + rect.width / 2 - width / 2 + leftOffset, window.innerWidth - width - edgePadding)
      );
      const top = rect.bottom + topOffset;
      const anchorCenterX = rect.left + rect.width / 2;
      const arrowLeft = Math.max(arrowHalfWidth, Math.min(anchorCenterX - left, width - arrowHalfWidth));

      setPosition({ left, top, width, arrowLeft });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [anchorRef, initialWidth, maxWidth, topOffset, leftOffset, edgePadding, arrowHalfWidth]);

  return position;
}

function NotchedPopoverShell({
  position,
  zIndex,
  children,
  className = "",
  notchSide = "top",
}: {
  position: { left: number; top: number; width: number; arrowLeft: number };
  zIndex: number;
  children: React.ReactNode;
  className?: string;
  notchSide?: "top" | "bottom";
}) {
  return (
    <div
      className="pointer-events-none fixed animate-popover-enter"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        zIndex,
        transformOrigin: `${position.arrowLeft}px ${notchSide === "top" ? "0px" : "100%"}`
      }}
    >
      <div
        className={`absolute h-[18px] w-[77px] ${notchSide === "top" ? "top-[-10px]" : "bottom-[-10px]"}`}
        style={{ left: position.arrowLeft - 38.5 }}
      >
        {notchSide === "top" ? (
          <svg className="h-full w-full" fill="none" viewBox="0 0 77 18">
            <path
              d="M0 18H21.7L34.1 4.2C36.4 1.7 40.6 1.7 42.9 4.2L55.3 18H77"
              fill="white"
              stroke="#cfd3df"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg className="h-full w-full" fill="none" viewBox="0 0 77 18">
            <path
              d="M0 0H21.7L34.1 13.8C36.4 16.3 40.6 16.3 42.9 13.8L55.3 0H77"
              fill="white"
              stroke="#cfd3df"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
      <div className={`pointer-events-auto relative rounded-[24px] border border-[#cfd3df] bg-white p-4 shadow-[0_14px_32px_rgba(48,47,42,0.08)] ${className}`}>
        {children}
      </div>
    </div>
  );
}

function SpeechBubble({ instruction, onNext, onClose, currentStep, totalSteps, actionLabel, canAdvance, blockedActionLabel, isLoading = false, anchorRef }: SpeechBubbleProps) {
  const popoverWidth = isLoading ? 104 : 300;
  const resolvedActionLabel = actionLabel ?? (currentStep === 1 ? 'Get Started!' : currentStep < totalSteps ? 'Next' : 'Complete Tutorial');
  const position = useAnchoredPopoverPosition(anchorRef, {
    width: popoverWidth,
    maxWidth: popoverWidth,
    topOffset: 18,
    leftOffset: isLoading ? -42 + 52 : -42 + 150,
  });

  return (
    <NotchedPopoverShell position={position} zIndex={140}>
        {!isLoading && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#302f2a] transition-colors hover:bg-[#f4f4f7]"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p3fd9e500} fill="#302F2A" />
            </svg>
          </button>
        )}
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="skeleton animate-shimmer h-4 w-4 rounded-full" />
            <div className="skeleton animate-shimmer h-4 w-4 rounded-full" />
            <div className="skeleton animate-shimmer h-4 w-4 rounded-full" />
          </div>
        ) : (
          <>
            <div className="space-y-7 pr-12">
              {instruction.map((paragraph) => (
                <p key={paragraph} className="text-[16px] font-medium leading-[1.42] tracking-[-0.02em] text-[#302f2a]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-end gap-3">
              <Button
                onClick={onNext}
                disabled={!canAdvance}
                className="h-10 cursor-pointer rounded-xl bg-[#302f2a] px-5 text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(48,47,42,0.18)] hover:bg-[#54595E] active:bg-[#302f2a] disabled:bg-[#c7c8d1] disabled:text-white disabled:shadow-none"
              >
                {resolvedActionLabel}
              </Button>
            </div>
            {!canAdvance && blockedActionLabel && (
              <p className="mt-3 text-right text-[13px] font-medium tracking-[-0.01em] text-[#8a8a96]">
                {blockedActionLabel}
              </p>
            )}
          </>
        )}
    </NotchedPopoverShell>
  );
}

function AvatarLogo() {
  return (
    <div className="relative flex h-full w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
      <DotLottieReact
        src={sparkleAvatar}
        autoplay
        loop
        speed={0.5}
        className="pointer-events-none relative z-[1] h-full w-full scale-[0.72] app-accent-filter"
        renderConfig={{ autoResize: true, devicePixelRatio: 2 }}
        layout={{ fit: "cover", align: [0.5, 0.5] }}
      />
    </div>
  );
}

interface ConversationProps {
  messages: ChatMessage[];
  inputFieldRef: React.RefObject<HTMLDivElement>;
  suggestedExamples: string[];
  onExampleClick: (example: string) => void;
  dismissedPrompts: Set<string>;
  isAwaitingResponse: boolean;
  areSuggestionsDisabled: boolean;
}

function Conversation({ messages, inputFieldRef, suggestedExamples, onExampleClick, dismissedPrompts, isAwaitingResponse, areSuggestionsDisabled }: ConversationProps) {
  const revealClearance = 72;
  const [messageOpacities, setMessageOpacities] = useState<number[]>([]);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const loadingPlaceholderRef = useRef<HTMLDivElement | null>(null);
  const visibleExamples = useMemo(
    () => suggestedExamples.filter((example) => !dismissedPrompts.has(example)),
    [suggestedExamples, dismissedPrompts]
  );
  const suggestionsKey = useMemo(() => visibleExamples.join("||"), [visibleExamples]);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    const updateOpacities = () => {
      if (!inputFieldRef.current) return;
      
      const inputFieldRect = inputFieldRef.current.getBoundingClientRect();
      const inputFieldTop = inputFieldRect.top;
      
      const newOpacities = messageRefs.current.map((messageEl) => {
        if (!messageEl) return 1;
        
        const messageRect = messageEl.getBoundingClientRect();
        const messageBottom = messageRect.bottom;
        
        // If message is below the input field, reduce opacity
        return messageBottom > inputFieldTop ? 0.3 : 1;
      });
      
      setMessageOpacities(newOpacities);
    };

    updateOpacities();
    
    const handleScroll = () => {
      updateOpacities();
    };

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages, inputFieldRef]);

  useEffect(() => {
    if (visibleExamples.length === 0 || lastMessage?.role !== 'ai') return;

    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLDivElement | null;
    const suggestionsEl = suggestionsRef.current;
    const inputEl = inputFieldRef.current;
    if (!scrollContainer || !suggestionsEl || !inputEl) return;

    const revealSuggestions = () => {
      const suggestionsRect = suggestionsEl.getBoundingClientRect();
      const inputRect = inputEl.getBoundingClientRect();
      const desiredBottom = inputRect.top - revealClearance;
      const overlap = suggestionsRect.bottom - desiredBottom;

      if (overlap > 0) {
        scrollContainer.scrollBy({ top: overlap, behavior: 'smooth' });
      }
    };

    const timer = window.setTimeout(revealSuggestions, 80);
    return () => window.clearTimeout(timer);
  }, [suggestionsKey, lastMessage?.id, inputFieldRef, visibleExamples.length]);

  useEffect(() => {
    if (!isAwaitingResponse) return;

    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLDivElement | null;
    const loadingEl = loadingPlaceholderRef.current;
    const inputEl = inputFieldRef.current;
    if (!scrollContainer || !loadingEl || !inputEl) return;

    const revealLoadingPlaceholder = () => {
      const loadingRect = loadingEl.getBoundingClientRect();
      const inputRect = inputEl.getBoundingClientRect();
      const desiredBottom = inputRect.top - revealClearance;
      const overlap = loadingRect.bottom - desiredBottom;

      if (overlap > 0) {
        scrollContainer.scrollBy({ top: overlap, behavior: 'smooth' });
      }
    };

    const timer = window.setTimeout(revealLoadingPlaceholder, 80);
    return () => window.clearTimeout(timer);
  }, [isAwaitingResponse, inputFieldRef, lastMessage?.id]);

  return (
    <div className="flex min-h-[calc(100vh-250px)] flex-col pb-8 pt-12">
      <div className={`mx-auto flex w-full max-w-[500px] ${messages.length === 0 ? 'flex-1 items-end pb-10' : 'pb-14 pt-10'}`}>
        <div className="flex max-w-[88%] items-center gap-4 pl-2 text-left">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full">
            <AvatarLogo />
          </div>
          <p className="max-w-[420px] text-[16px] font-medium leading-[1.45] tracking-[-0.02em] text-[#3b3a35]">
            Hey there, I&apos;m an AI assistant and I respond to your prompts.
          </p>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mx-auto flex w-full max-w-[500px] flex-col gap-10 pb-6">
          {messages.map((message, index) => (
            (() => {
              const resolvedBlocks = message.blocks ?? [{ type: 'paragraph', text: message.content }];
              const isDividerOnlyMessage =
                message.role === 'ai' &&
                resolvedBlocks.length === 1 &&
                resolvedBlocks[0].type === 'divider';

              return (
                <div 
                  key={message.id} 
                  ref={(el) => messageRefs.current[index] = el}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} transition-opacity duration-200`}
                  style={{ opacity: messageOpacities[index] || 1 }}
                >
                  {message.role === 'user' ? (
                    <div className="app-accent-bg max-w-[62%] rounded-[16px] px-4 py-4 text-white">
                      <p className="text-[16px] leading-[1.38] tracking-[-0.01em]">{message.content}</p>
                    </div>
                  ) : (
                    <div className={`${isDividerOnlyMessage ? 'w-full pl-2' : 'max-w-[88%] pl-2'} text-[#302f2a]`}>
                      {resolvedBlocks.map((block, blockIndex) => {
                        if (block.type === 'divider') {
                          return (
                            <div key={blockIndex} className="w-full pt-6 pb-12">
                              <div className="h-px w-full bg-[#d6d8df]" />
                            </div>
                          );
                        }

                        if (block.type === 'bullet-list') {
                          return (
                            <ul key={blockIndex} className="mb-5 list-disc space-y-1.5 pl-10 text-[16px] leading-[1.42]">
                              {block.items?.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          );
                        }

                        if (block.type === 'numbered-list') {
                          return (
                            <ol key={blockIndex} className="mb-6 list-decimal space-y-4 pl-10 text-[17px] leading-[1.42]">
                              {block.items?.map((item) => <li key={item} className="[&>strong]:font-semibold" dangerouslySetInnerHTML={{ __html: item }} />)}
                            </ol>
                          );
                        }

                        return (
                          <p key={blockIndex} className="mb-5 text-[16px] leading-[1.42] tracking-[-0.01em]">
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()
          ))}
          {visibleExamples.length > 0 && lastMessage?.role === 'ai' && (
            <div ref={suggestionsRef} className="mt-[-16px] scroll-mb-[260px] pl-2">
              <div className="flex flex-wrap gap-3">
                {visibleExamples.map((example, index) => (
                  <Card
                    key={`example-${index}-${example.slice(0, 20).replace(/\s+/g, '-')}`}
                    className={`inline-flex w-fit max-w-full rounded-[18px] border border-dashed app-accent-border bg-white/88 px-4 py-3 backdrop-blur-sm transition-all duration-200 ${areSuggestionsDisabled ? 'cursor-not-allowed opacity-55' : 'cursor-pointer hover:-translate-y-0.5 app-accent-soft-hover'}`}
                    onClick={() => {
                      if (!areSuggestionsDisabled) {
                        onExampleClick(example);
                      }
                    }}
                  >
                    <p className="app-accent-ink text-[16px] font-medium leading-[1.35]">
                      {example}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {isAwaitingResponse && (
            <div ref={loadingPlaceholderRef} className="scroll-mb-[260px] pl-2 pt-6">
              <div className="max-w-[88%]">
                <div className="space-y-3">
                  <div className="skeleton animate-shimmer h-4 w-[min(100%,520px)] rounded-full" />
                  <div className="skeleton animate-shimmer h-4 w-[min(100%,360px)] rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(249,251,254,0.9)_100%)]" />
      <div className="absolute bottom-[-70px] left-[-120px] h-[420px] w-[620px] opacity-40">
        <div className="absolute inset-0">
          <svg className="h-full w-full" fill="none" viewBox="0 0 2148 1466">
            <ellipse cx="1074" cy="733" fill="#D0F6F7" rx="574" ry="233" opacity="0.42" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[-120px] right-[-160px] h-[520px] w-[860px] opacity-35">
        <div className="absolute inset-0">
          <svg className="h-full w-full" fill="none" viewBox="0 0 2148 1686">
            <ellipse cx="1074" cy="843" fill="#FAE5EA" rx="574" ry="343" opacity="0.42" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface AchievementsPopoverProps {
  achievements: Achievement[];
  onViewAchievements: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

interface HelpPopoverProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  onTakeTour: () => void;
}

function AchievementsPopover({ achievements, onViewAchievements, anchorRef }: AchievementsPopoverProps) {
  const completedCount = achievements.filter(a => a.completed).length;
  const totalCount = achievements.length;
  const position = useAnchoredPopoverPosition(anchorRef, {
    width: 660,
    maxWidth: 660,
    topOffset: 12,
  });

  return (
    <NotchedPopoverShell position={position} zIndex={220}>
      <div className="space-y-2">
        <div>
          <h3 className="text-[40px] font-medium leading-none tracking-[-0.05em] text-[#302f2a]">Achievements</h3>
          <p className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-[#666975]">
            Achievements attained: {completedCount} of {totalCount}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`inline-flex max-w-full items-center gap-4 rounded-full px-2 py-1 ${
                achievement.completed 
                  ? 'bg-[#eef8e9]' 
                  : 'bg-[#f2f2f7]'
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center">
                <svg className={`h-7 w-7 ${achievement.completed ? 'text-[#4fbd3e]' : 'text-[#c9ccd8]'}`} fill="none" viewBox="0 0 24 24">
                  <path d={achievement.completed ? svgPaths.p3652d000 : svgPaths.p33d53300} fill="currentColor" />
                </svg>
              </div>
              <p className={`text-[16px] font-medium tracking-[-0.02em] ${achievement.completed ? 'text-[#302f2a]' : 'text-[#4f5562]'}`}>
                {achievement.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </NotchedPopoverShell>
  );
}

function HelpPopover({ anchorRef, onTakeTour }: HelpPopoverProps) {
  const position = useAnchoredPopoverPosition(anchorRef, {
    width: 300,
    maxWidth: 300,
    topOffset: 12,
  });

  return (
    <NotchedPopoverShell position={position} zIndex={220}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-[#302f2a]">
            Unsure where to start?
          </h3>
          <p className="text-[14px] font-medium leading-[1.45] tracking-[-0.02em] text-[#666975]">
            Take a guided tour to learn how to navigate this learning experience.
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onTakeTour}
            className="h-10 cursor-pointer rounded-xl bg-[#302f2a] px-4 text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(48,47,42,0.18)] hover:bg-[#54595E] active:bg-[#302f2a]"
          >
            Take guided tour
          </Button>
        </div>
      </div>
    </NotchedPopoverShell>
  );
}

interface AchievementToastProps {
  achievement: Achievement;
  onComplete: () => void;
}

interface CompletionModalProps {
  achievements: Achievement[];
  tokenCount: number;
  elapsedMinutes: number;
  onClose: () => void;
  onRestart: () => void;
}

function CompletionModal({ achievements, tokenCount, elapsedMinutes, onClose, onRestart }: CompletionModalProps) {
  const completedCount = achievements.filter((achievement) => achievement.completed).length;
  const formattedHours = Math.floor(elapsedMinutes / 60);
  const formattedMinutes = elapsedMinutes % 60;
  const formattedTimeSpent =
    formattedHours > 0
      ? `${formattedHours}hr ${formattedMinutes}min`
      : `${Math.max(1, formattedMinutes)}min`;

  return (
    <div className="fixed inset-0 z-[10030] flex items-center justify-center px-8 py-10">
      <div className="absolute inset-0 bg-white/78 backdrop-blur-[8px]" />
      <div
        className="animate-popover-enter relative w-full max-w-[1320px] overflow-hidden rounded-[32px] border border-[#cfd3df] bg-white px-12 py-12 shadow-[0_24px_60px_rgba(48,47,42,0.14)]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-[#302f2a] transition-colors hover:bg-[#f4f4f7]"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p3fd9e500} fill="currentColor" />
          </svg>
        </button>

        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="text-[58px] font-semibold leading-none tracking-[-0.06em] text-[#111111]">Nice Work!</h2>
          <p className="mx-auto mt-8 max-w-[920px] text-[18px] leading-[1.4] tracking-[-0.02em] text-[#302f2a]">
            You&apos;ve learned the core habits behind stronger prompting. You&apos;re now better equipped to
            write clearer requests, guide outputs, and get more useful responses from AI.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#f3f4f7] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
            <span className="text-[16px] font-semibold tracking-[-0.03em] text-[#302f2a]">Intro to prompting</span>
            <svg className="h-6 w-6 text-[#45b730]" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p33d53300} fill="currentColor" />
            </svg>
          </div>
          <p className="mt-4 text-[16px] font-medium tracking-[-0.02em] text-[#1980ff]">
            {completedCount} of {achievements.length} achievements completed
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          <div className="space-y-10">
            <h3 className="max-w-[420px] text-[28px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#111111]">
              Here&apos;s a summary of what you accomplished in this tutorial
            </h3>

            <div className="space-y-8 text-[#302f2a]">
              <div>
                <p className="text-[18px] leading-[1.4] tracking-[-0.02em]">
                  Time Spent: <span className="font-semibold">{formattedTimeSpent}</span>
                </p>
              </div>
              <div>
                <p className="text-[18px] leading-[1.4] tracking-[-0.02em]">
                  Tokens used <span className="font-semibold">{Math.round(tokenCount)} / 5000</span>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={onRestart}
                className="h-11 cursor-pointer rounded-xl bg-[#302f2a] px-5 text-[14px] font-medium text-white hover:bg-[#54595E] active:bg-[#302f2a]"
              >
                Restart lesson
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap content-start gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`inline-flex max-w-full items-center gap-4 rounded-full px-2 py-1 ${
                  achievement.completed ? 'bg-[#eef8e9]' : 'bg-[#f2f2f7]'
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center">
                  <svg
                    className={`h-7 w-7 ${achievement.completed ? 'text-[#4fbd3e]' : 'text-[#c9ccd8]'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d={achievement.completed ? svgPaths.p3652d000 : svgPaths.p33d53300} fill="currentColor" />
                  </svg>
                </div>
                <p className={`text-[16px] font-medium tracking-[-0.02em] ${achievement.completed ? 'text-[#302f2a]' : 'text-[#4f5562]'}`}>
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementConfetti({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10040] overflow-hidden">
      <DotLottieReact
        src={confettiAnimation}
        autoplay
        loop={false}
        className="h-full w-full"
        renderConfig={{ autoResize: true, devicePixelRatio: 2 }}
        layout={{ fit: "cover", align: [0.5, 0.5] }}
      />
    </div>
  );
}

function AchievementToast({ achievement, onComplete }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-28 z-[10000] flex justify-center px-6">
      <div className="animate-achievement-banner inline-flex max-w-[min(560px,calc(100vw-48px))] items-center gap-4 rounded-full bg-[#dff8d4] px-6 py-4 text-[#1e2419] shadow-[0_10px_24px_rgba(74,173,55,0.16)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#3fb433]">
          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p3652d000} fill="currentColor" />
          </svg>
        </div>
        <p className="text-[16px] font-medium tracking-[-0.02em] text-[#1f2519]">
          {achievement.title}
        </p>
      </div>
    </div>
  );
}

function FixedHeader({ onClose, onRestart, onAuthorClick, onDismissAuthorPopover, tutorialCompleted, achievements, onViewAchievements, authorBadgeRef, authorNeedsAttention = false, authorShowPulse = false, className = "" }: { 
  onClose: () => void; 
  onRestart: () => void; 
  onAuthorClick: () => void;
  onDismissAuthorPopover: () => void;
  tutorialCompleted: boolean;
  achievements: Achievement[];
  onViewAchievements: () => void;
  authorBadgeRef: React.RefObject<HTMLButtonElement | null>;
  authorNeedsAttention?: boolean;
  authorShowPulse?: boolean;
  className?: string;
}) {
  const hasCompletedAchievements = achievements.some(a => a.completed);
  const circularControlClassName =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#f3f2f5] text-[#302f2a] transition-colors duration-150 hover:bg-[#cfd2df] active:bg-[#302f2a] active:text-white";
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const achievementsPanelRef = useRef<HTMLDivElement>(null);
  const achievementsTriggerRef = useRef<HTMLButtonElement>(null);
  const helpPanelRef = useRef<HTMLDivElement>(null);
  const helpTriggerRef = useRef<HTMLButtonElement>(null);

  const handleToggleAchievements = () => {
    onDismissAuthorPopover();
    setIsHelpOpen(false);
    setIsAchievementsOpen((open) => !open);
  };

  const handleToggleHelp = () => {
    onDismissAuthorPopover();
    setIsAchievementsOpen(false);
    setIsHelpOpen((open) => !open);
  };

  const handleTakeGuidedTour = () => {
    setIsHelpOpen(false);
    onAuthorClick();
  };

  useEffect(() => {
    if (!isAchievementsOpen) return;

    onViewAchievements();

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = achievementsTriggerRef.current?.contains(target);
      const clickedPanel = achievementsPanelRef.current?.contains(target);

      if (!clickedTrigger && !clickedPanel) {
        setIsAchievementsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAchievementsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isAchievementsOpen, onViewAchievements]);

  useEffect(() => {
    if (!isHelpOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = helpTriggerRef.current?.contains(target);
      const clickedPanel = helpPanelRef.current?.contains(target);

      if (!clickedTrigger && !clickedPanel) {
        setIsHelpOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsHelpOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isHelpOpen]);

  return (
    <div className={`fixed inset-x-0 top-0 px-14 pt-7 pointer-events-auto ${isAchievementsOpen ? 'z-[240]' : 'z-[200]'} ${className}`}>
      <div className="flex items-start justify-between gap-8">
        <div className="flex items-start gap-7">
          <button
            onClick={() => {
              onDismissAuthorPopover();
              onClose();
            }}
            className={`mt-2 ${circularControlClassName}`}
            type="button"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p3fd9e500} fill="currentColor" />
            </svg>
          </button>
          <div className="flex items-start gap-2">
            <AuthorBadge onClick={onAuthorClick} buttonRef={authorBadgeRef} isNudging={authorNeedsAttention} showPulse={authorShowPulse} />
            <div className="flex flex-col gap-2 pt-1">
              <div className="inline-flex max-w-fit items-center gap-2 rounded-[18px] bg-[#eef0f5] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <span className="text-[16px] font-semibold tracking-[-0.03em] text-[#302f2a]">
                  Intro to prompting
                </span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path d={tutorialCompleted ? svgPaths.p3652d000 : svgPaths.p33d53300} fill={tutorialCompleted ? "#45b730" : "#CACBD6"} />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-[16px] bg-[#eef0f5] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <span className="text-[14px] font-medium text-[#302f2a]">
                    by <span className="underline underline-offset-2">Miranda Mota</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className={`relative ${isAchievementsOpen ? 'z-[230]' : ''}`}>
            <button
              ref={achievementsTriggerRef}
              onClick={handleToggleAchievements}
              className={`relative ${circularControlClassName}`}
              type="button"
              aria-expanded={isAchievementsOpen}
              aria-haspopup="dialog"
            >
              {hasCompletedAchievements && (
                <div className="absolute right-[7px] top-[7px] h-3.5 w-3.5 rounded-full border-2 border-white bg-[#53c43c]" />
              )}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.68 7.39 12.96C7.81 14.09 8.72 14.98 10 15.37V19H7V21H17V19H14V15.37C15.28 14.98 16.19 14.09 16.61 12.96C19.08 12.68 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {isAchievementsOpen && (
              <>
                <div ref={achievementsPanelRef}>
                  <AchievementsPopover
                    achievements={achievements}
                    onViewAchievements={onViewAchievements}
                    anchorRef={achievementsTriggerRef}
                  />
                </div>
              </>
            )}
          </div>
          <div className={`relative ${isHelpOpen ? 'z-[230]' : ''}`}>
            <button
              ref={helpTriggerRef}
              onClick={handleToggleHelp}
              className={circularControlClassName}
              type="button"
              aria-expanded={isHelpOpen}
              aria-haspopup="dialog"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
                <path
                  d="M11 18H13V16H11V18ZM12 6C10.9 6 10 6.9 10 8H8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8C16 9.93 14.64 10.85 13.71 11.48C13.01 11.95 12.5 12.3 12.5 13H10.5C10.5 11.26 11.72 10.44 12.62 9.84C13.4 9.32 14 8.92 14 8C14 6.9 13.1 6 12 6Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {isHelpOpen && (
              <div ref={helpPanelRef}>
                <HelpPopover
                  anchorRef={helpTriggerRef}
                  onTakeTour={handleTakeGuidedTour}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => {
              onDismissAuthorPopover();
              setIsAchievementsOpen(false);
              setIsHelpOpen(false);
              onRestart();
            }}
            className={circularControlClassName}
            type="button"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.82 16.33 14.6 18 12 18C8.69 18 6.01 15.31 6.01 12C6.01 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  tokenCount: number;
  inputFieldRef: React.RefObject<HTMLDivElement>;
  tokenInfoRef: React.RefObject<HTMLButtonElement | null>;
  onTokenInfoClick: () => void;
  disabled?: boolean;
}

function InputField({ value, onChange, onSend, tokenCount, inputFieldRef, tokenInfoRef, onTokenInfoClick, disabled = false }: InputFieldProps) {
  const hasInput = value.trim().length > 0;

  return (
    <div ref={inputFieldRef} className="mx-auto w-full max-w-[660px] space-y-3">
      <div className={`relative rounded-[24px] border px-4 py-0 shadow-[0_10px_24px_rgba(78,88,108,0.06)] backdrop-blur-sm ${disabled ? 'cursor-not-allowed border-[#e5e6ec] bg-[#f4f4f7]' : 'border-[#cfd3df] bg-white/92'}`}>
        <div className="flex items-center gap-3">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={disabled ? "Input temporarily disabled" : "Send a message"}
            disabled={disabled}
            className={`h-auto flex-1 border-none bg-transparent px-0 py-4 text-[16px] shadow-none placeholder:text-[#a0a0aa] focus-visible:ring-0 ${disabled ? 'text-[#a9abb4]' : 'text-[#302f2a]'}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <button
            onClick={onSend}
            disabled={disabled || !hasInput}
            className={`flex h-[32px] w-[32px] shrink-0 translate-x-[4px] items-center justify-center rounded-full transition-colors ${
              disabled
                ? 'cursor-not-allowed bg-transparent text-[#44443E]'
                : hasInput
                  ? 'app-accent-bg app-accent-bg-hover text-white'
                  : 'bg-[#ececf2] text-[#4E4D47] hover:bg-[#e2e3ea]'
            }`}
          >
            {disabled ? (
              <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 18V6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.2"
                />
                <path
                  d="M7 11L12 6L17 11"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-[14px] tracking-[-0.01em]">
        <span className="text-[#9b9da7]">Tokens used</span>
        <div className="flex items-center gap-1 text-[#63656d]">
          <span>{Math.round(tokenCount)}</span>
          <span>/</span>
          <span>5000</span>
        </div>
        <button
          ref={tokenInfoRef}
          type="button"
          onClick={onTokenInfoClick}
          className="app-accent-text underline [text-underline-offset:2px] hover:opacity-80"
        >
          What&apos;s a token?
        </button>
      </div>
    </div>
  );
}

function TokenInfoPopover({ anchorRef }: { anchorRef: React.RefObject<HTMLElement | null> }) {
  const position = useAnchoredPopoverPosition(anchorRef, {
    width: 420,
    maxWidth: 420,
    topOffset: -174,
    edgePadding: 16,
  });

  return (
    <NotchedPopoverShell position={position} zIndex={180} className="p-5" notchSide="bottom">
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.01em] text-[#302f2a]">
          A token is a unit of measure for LLMs (Large Language Models) which may represent words,
          characters, or phrases.
        </p>
        <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.01em] text-[#302f2a]">
          It “costs” tokens to provide instructions as well as for LLMs to process and output
          responses.
        </p>
      </div>
    </NotchedPopoverShell>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStartedTutorial, setHasStartedTutorial] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [dismissedPrompts, setDismissedPrompts] = useState<Set<string>>(new Set());
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [showAchievementToast, setShowAchievementToast] = useState<Achievement | null>(null);
  const [confettiRunId, setConfettiRunId] = useState(0);
  const [hasPlayedCompletionConfetti, setHasPlayedCompletionConfetti] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasEverSentMessage, setHasEverSentMessage] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [guideMessage, setGuideMessage] = useState<GuideMessage | null>(null);
  const [isAuthorPopoverLoading, setIsAuthorPopoverLoading] = useState(false);
  const [isAuthorBadgeNudging, setIsAuthorBadgeNudging] = useState(false);
  const [isAuthorBadgePulsing, setIsAuthorBadgePulsing] = useState(false);
  const [stepActivity, setStepActivity] = useState<Record<number, StepActivity>>({});
  const [isTokenPopoverOpen, setIsTokenPopoverOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputFieldRef = useRef<HTMLDivElement>(null);
  const authorBadgeRef = useRef<HTMLButtonElement>(null);
  const tokenInfoRef = useRef<HTMLButtonElement>(null);
  const tutorialStartedAtRef = useRef<number | null>(null);
  const tutorialCompletedAtRef = useRef<number | null>(null);

  // Loading state management
  const [loadingState, setLoadingState] = useState<LoadingState>({
    header: false,
    authorAndBubble: false,
    chatArea: false,
    inputField: false,
    complete: false
  });

  const currentTutorialStep = tutorialSteps.find(step => step.id === currentStep);
  const currentStepActivity = stepActivity[currentStep] ?? {
    sentExamples: [],
    sentCustomInput: false,
    completed: false,
  };
  const displayedPrompts = currentTutorialStep
    ? [...currentTutorialStep.examples, ...currentTutorialStep.additionalExamples].filter(
        (prompt) => !dismissedPrompts.has(prompt)
      )
    : [];
  const isPromptInputDisabled = isAwaitingResponse || currentTutorialStep?.inputMode === 'disabled';
  const canAdvanceTutorialStep = currentTutorialStep ? currentStepActivity.completed : false;
  const shouldNudgeAuthorAvatar =
    !showSpeechBubble &&
    !isAuthorPopoverLoading &&
    (
      !hasStartedTutorial ||
      (hasStartedTutorial && guideMessage?.actionLabel === 'Next' && canAdvanceTutorialStep)
    );
  const welcomeInstruction = [
    'I will guide you through a short, step-by-step lesson on better prompting.',
    'You will compare prompts, see how the responses change, and then try a few guided exercises yourself.'
  ];
  const visibleSpeechInstruction = hasStartedTutorial ? (guideMessage?.body ?? currentTutorialStep?.instruction ?? []) : welcomeInstruction;
  const visibleSpeechActionLabel = hasStartedTutorial ? guideMessage?.actionLabel : 'Get Started!';
  const visibleSpeechBlockedActionLabel = hasStartedTutorial ? currentTutorialStep?.blockedActionLabel : undefined;
  const speechBubbleContentSignature = [
    currentStep,
    isAuthorPopoverLoading ? 'loading' : 'ready',
    visibleSpeechActionLabel ?? '',
    visibleSpeechBlockedActionLabel ?? '',
    ...visibleSpeechInstruction,
  ].join('|');
  const completionElapsedMinutes = (() => {
    if (!tutorialStartedAtRef.current) return 0;
    const endTime = tutorialCompletedAtRef.current ?? Date.now();
    return Math.max(1, Math.round((endTime - tutorialStartedAtRef.current) / 60000));
  })();

  const createStepKickoffMessage = (step: TutorialStep): ChatMessage => {
    return {
      id: `ai-step-${step.id}-${Date.now()}`,
      role: 'ai',
      content: '',
      blocks: [{ type: 'divider' }]
    };
  };

  const markCurrentStepCompleted = (stepId: number) => {
    setStepActivity(prev => ({
      ...prev,
      [stepId]: {
        ...(prev[stepId] ?? { sentExamples: [], sentCustomInput: false, completed: false }),
        completed: true,
      },
    }));
  };

  const trackStepInteraction = (messageContent: string, source: 'example' | 'custom-input') => {
    if (!currentTutorialStep) return;

    setStepActivity(prev => {
      const existing = prev[currentTutorialStep.id] ?? {
        sentExamples: [],
        sentCustomInput: false,
        completed: false,
      };

      const sentExamples =
        source === 'example' && !existing.sentExamples.includes(messageContent)
          ? [...existing.sentExamples, messageContent]
          : existing.sentExamples;
      const sentCustomInput = existing.sentCustomInput || source === 'custom-input';

      let completed = existing.completed;

      if (currentTutorialStep.completionMode === 'examples') {
        const requiredCount = currentTutorialStep.requiredExampleCount ?? currentTutorialStep.examples.length;
        completed = sentExamples.filter(example => currentTutorialStep.examples.includes(example)).length >= requiredCount;
      } else if (currentTutorialStep.completionMode === 'custom-input') {
        completed = sentCustomInput;
      }

      return {
        ...prev,
        [currentTutorialStep.id]: {
          sentExamples,
          sentCustomInput,
          completed,
        },
      };
    });
  };

  const createAiResponse = (messageContent: string): ChatMessage => {
    if (currentStep === 1 && messageContent === tutorialSteps[0].examples[0]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: "Sure, here are some ideas for a team event:",
        blocks: [
          { type: 'paragraph', text: 'Sure, here are some ideas for a team event:' },
          { type: 'bullet-list', items: ['A virtual escape room', 'an online problem-solving workshop', 'a remote team-building game.'] },
          { type: 'paragraph', text: 'What kind of activities would your team prefer?' }
        ]
      };
    }

    if (currentStep === 1 && messageContent === tutorialSteps[0].examples[1]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Here are 5 ideas for a team event to celebrate the end of the year with your remote employees:',
        blocks: [
          { type: 'paragraph', text: 'Here are 5 ideas for a team event to celebrate the end of the year with your remote employees:' },
          {
            type: 'numbered-list',
            items: [
              '<strong>Virtual Holiday Party:</strong> Host a virtual holiday party with festive decorations, holiday music, and holiday-themed games and activities. You can even send out holiday-themed gift boxes to employees to enjoy during the party.',
              '<strong>Virtual Talent Show:</strong> Encourage employees to showcase their talents, whether it&apos;s singing, dancing, playing an instrument, or telling jokes.',
              '<strong>Virtual Escape Room:</strong> Solve puzzles and riddles together as a team to escape a virtual room. This is a great way to build teamwork and communication skills.',
              '<strong>Virtual Cooking Class:</strong> Learn how to cook a new dish together as a team. You can even have a virtual potluck afterwards where everyone shares their creations.',
              '<strong>Virtual Game Night:</strong> Play online games together, such as Jackbox Games, Skribbl.io, or TriviaMaker.'
            ]
          },
          { type: 'paragraph', text: 'These are just a few ideas to get you started. The most important thing is to choose activities that your team will enjoy and that will help them feel connected to each other, even though they are working remotely.' }
        ]
      };
    }

    if (currentStep === 2 && messageContent === tutorialSteps[1].examples[0]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Here is a launch email.',
        blocks: [
          { type: 'paragraph', text: 'Subject: New product launch' },
          { type: 'paragraph', text: 'Hi there, we are excited to launch our new product. It will help teams stay organized and get more done. Let us know if you would like to learn more.' }
        ]
      };
    }

    if (currentStep === 2 && messageContent === tutorialSteps[1].examples[1]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Here is a more contextual launch email.',
        blocks: [
          { type: 'paragraph', text: 'Subject: A simpler way to manage projects without spreadsheets' },
          { type: 'paragraph', text: 'Hi there, today we are introducing a project management tool built for small business teams that have outgrown spreadsheets. It gives you one place to track deadlines, assign work, and see progress clearly without adding enterprise-level complexity.' },
          { type: 'paragraph', text: 'If your team is juggling projects across email, spreadsheets, and meetings, this launch is designed to make that workflow much easier.' }
        ]
      };
    }

    if (currentStep === 3 && messageContent === tutorialSteps[2].examples[0]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Machine learning is a field of AI that allows systems to learn from data.',
        blocks: [
          { type: 'paragraph', text: 'Machine learning is a field of AI that allows systems to learn from data instead of relying only on fixed rules. It is used for tasks like prediction, classification, recommendation, and automation across many industries.' }
        ]
      };
    }

    if (currentStep === 3 && messageContent === tutorialSteps[2].examples[1]) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Here are 3 bullet points.',
        blocks: [
          {
            type: 'bullet-list',
            items: [
              'Machine learning finds patterns in historical data so businesses can make better predictions, such as forecasting sales.',
              'It improves decisions at scale, for example by helping support teams prioritize tickets based on urgency.',
              'It powers personalization, such as recommending the next best product or message for a specific customer.'
            ]
          }
        ]
      };
    }

    if (currentStep === 4) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'Here is a tone-adjusted version.',
        blocks: [
          { type: 'paragraph', text: 'Nice move. Asking for tone and style gives the response a clearer voice and makes it easier to use in a real setting.' },
          { type: 'paragraph', text: 'When you experiment here, notice how words like calm, direct, warm, or executive-ready shape the message differently.' }
        ]
      };
    }

    if (currentStep === 5) {
      return {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: 'This prompt combines multiple principles well.',
        blocks: [
          { type: 'paragraph', text: 'This is a strong final prompt. It combines specificity, context, formatting, and constraints, which makes the response easier to trust and easier to use.' },
          { type: 'paragraph', text: 'That is the core pattern to carry forward when you prompt for real work.' }
        ]
      };
    }

    return {
      id: `ai-${Date.now()}`,
      role: 'ai',
      content: "Thanks for trying that prompt! Each refinement makes the output more useful.",
      blocks: [{ type: 'paragraph', text: "Thanks for trying that prompt! Each refinement makes the output more useful." }]
    };
  };

  const getGuideMessageForPrompt = (messageContent: string): GuideMessage | null => {
    if (currentStep === 1 && messageContent === tutorialSteps[0].examples[0]) {
      return {
        body: [
          'This may be a broad response and not very relevant to your situation yet. AIs know a lot of possible directions an open-ended request like this could go in a conversation.',
          'Giving more details helps the AI refine the response.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 1 && messageContent === tutorialSteps[0].examples[1]) {
      return {
        body: [
          'This version is much more specific. You gave the AI a clear task, a concrete number of ideas, and the context that the team is remote and celebrating the end of the year.',
          'Notice how the response becomes more actionable when the request has clearer constraints.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 2 && messageContent === tutorialSteps[1].examples[0]) {
      return {
        body: [
          'This prompt produces something usable, but it still leaves the AI guessing about the product, audience, and business situation.',
          'Now compare it with the second prompt and notice how context narrows the response.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 2 && messageContent === tutorialSteps[1].examples[1]) {
      return {
        body: [
          'This version gives the AI a target audience, product category, and a familiar pain point.',
          'That extra context leads to language that feels more relevant and more persuasive.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 3 && messageContent === tutorialSteps[2].examples[0]) {
      return {
        body: [
          'The answer is correct, but it is generic and not shaped for how you want to use it.',
          'Run the second prompt and look at how the format request changes the structure.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 3 && messageContent === tutorialSteps[2].examples[1]) {
      return {
        body: [
          'This prompt asks for both a structure and a target audience, so the result is easier to scan and easier to apply.',
          'Format requests are one of the fastest ways to improve usefulness.'
        ],
        actionLabel: 'Next'
      };
    }

    if (currentStep === 4) {
      return {
        body: [
          'Good. This is the experimentation part of the lesson.',
          'Keep testing how tone and style words influence the result, then continue when you are ready.'
        ],
        actionLabel: 'Continue'
      };
    }

    if (currentStep === 5) {
      return {
        body: [
          'That final prompt pulls together the key habits from the tutorial.',
          'You are ready to complete the guided lesson.'
        ],
        actionLabel: 'Complete Tutorial'
      };
    }

    return null;
  };

  // Achievement unlock function
  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === achievementId);
      if (achievement && !achievement.completed) {
        const updatedAchievements = prev.map(a => 
          a.id === achievementId 
            ? { ...a, completed: true, viewed: false }
            : a
        );
        
        // Show achievement toast
        const unlockedAchievement = updatedAchievements.find(a => a.id === achievementId);
        if (unlockedAchievement) {
          setShowAchievementToast(unlockedAchievement);
        }
        
        return updatedAchievements;
      }
      return prev;
    });
  };

  // Mark achievements as viewed when popover is opened
  const handleViewAchievements = () => {
    setAchievements(prev => 
      prev.map(a => ({ ...a, viewed: true }))
    );
  };

  useEffect(() => {
    if (!isTokenPopoverOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!tokenInfoRef.current?.contains(target)) {
        setIsTokenPopoverOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTokenPopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isTokenPopoverOpen]);

  useEffect(() => {
    if (!shouldNudgeAuthorAvatar) {
      setIsAuthorBadgeNudging(false);
      setIsAuthorBadgePulsing(false);
      return;
    }

    let releaseNudgeTimeout: number | undefined;
    let releasePulseTimeout: number | undefined;
    const triggerNudge = () => {
      setIsAuthorBadgeNudging(true);
      setIsAuthorBadgePulsing(true);

      releaseNudgeTimeout = window.setTimeout(() => {
        setIsAuthorBadgeNudging(false);
      }, 420);

      releasePulseTimeout = window.setTimeout(() => {
        setIsAuthorBadgePulsing(false);
      }, 960);
    };

    const intervalId = window.setInterval(triggerNudge, 2000);

    return () => {
      window.clearInterval(intervalId);
      if (releaseNudgeTimeout) {
        window.clearTimeout(releaseNudgeTimeout);
      }
      if (releasePulseTimeout) {
        window.clearTimeout(releasePulseTimeout);
      }
      setIsAuthorBadgeNudging(false);
      setIsAuthorBadgePulsing(false);
    };
  }, [shouldNudgeAuthorAvatar]);

  // Progressive loading sequence
  useEffect(() => {
    const loadingSequence = [
      { key: 'header', delay: 300 },
      { key: 'authorAndBubble', delay: 600 },
      { key: 'chatArea', delay: 900 },
      { key: 'inputField', delay: 1200 },
      { key: 'complete', delay: 1500 }
    ];

    const timeouts = loadingSequence.map(({ key, delay }) => 
      setTimeout(() => {
        setLoadingState(prev => ({ ...prev, [key]: true }));
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Initialize prompts when tutorial step changes
  useEffect(() => {
    if (currentTutorialStep) {
      setDismissedPrompts(new Set());
      setGuideMessage(null);
    }
  }, [currentStep, currentTutorialStep]);

  // Achievement triggers
  useEffect(() => {
    if (hasEverSentMessage) {
      unlockAchievement('first-prompt');
    }

    if (stepActivity[1]?.completed) {
      unlockAchievement('practiced-prompting');
    }

    if (stepActivity[2]?.completed) {
      unlockAchievement('generated-image');
    }

    if (stepActivity[3]?.completed) {
      unlockAchievement('refined-responses');
    }

    if (stepActivity[4]?.completed) {
      unlockAchievement('systematic-methods');
    }

    if (tutorialCompleted) {
      unlockAchievement('various-use-cases');
    }
  }, [hasEverSentMessage, stepActivity, tutorialCompleted]);

  useEffect(() => {
    const allAchievementsCompleted = achievements.length > 0 && achievements.every((achievement) => achievement.completed);

    if (allAchievementsCompleted && !hasPlayedCompletionConfetti) {
      setConfettiRunId(prev => prev + 1);
      setHasPlayedCompletionConfetti(true);
    }
  }, [achievements, hasPlayedCompletionConfetti]);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const sendMessage = (messageContent: string, source: 'example' | 'custom-input') => {
    const newMessages = [...messages, { id: `user-${Date.now()}`, role: 'user' as const, content: messageContent }];
    setMessages(newMessages);
    setTokenCount(prev => prev + messageContent.length / 4); // Rough token estimation
    setIsAwaitingResponse(true);
    trackStepInteraction(messageContent, source);
    setGuideMessage(null);

    if (hasStartedTutorial) {
      setShowSpeechBubble(true);
      setIsAuthorPopoverLoading(true);
    }
    
    if (!hasEverSentMessage) {
      setHasEverSentMessage(true);
    }

    // Scroll to bottom after adding user message
    scrollToBottom();

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, createAiResponse(messageContent)]);
      setTokenCount(prev => prev + 50);
      setIsAwaitingResponse(false);
      
      scrollToBottom();

      window.setTimeout(() => {
        setGuideMessage(getGuideMessageForPrompt(messageContent));
        setIsAuthorPopoverLoading(false);
      }, 1200);
    }, 1000);
  };

  const handleExampleClick = (example: string) => {
    if (isAwaitingResponse) return;
    sendMessage(example, 'example');
    setDismissedPrompts(prev => new Set([...prev, example]));
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    sendMessage(inputValue, 'custom-input');
    setInputValue('');
  };

  const handleStartTutorial = () => {
    if (!currentTutorialStep) return;

    tutorialStartedAtRef.current = Date.now();
    tutorialCompletedAtRef.current = null;
    setHasStartedTutorial(true);
    setGuideMessage(null);
    setIsAuthorPopoverLoading(false);
    setMessages([createStepKickoffMessage(currentTutorialStep)]);
    setDismissedPrompts(new Set());
    setShowSpeechBubble(true);
  };

  const handleNextStep = () => {
    if (!hasStartedTutorial) {
      handleStartTutorial();
      return;
    }

    if (!canAdvanceTutorialStep) return;

    if (currentStep < tutorialSteps.length) {
      markCurrentStepCompleted(currentStep);
      const nextStep = currentStep + 1;
      const nextTutorialStep = tutorialSteps.find(step => step.id === nextStep);
      setCurrentStep(nextStep);
      setShowSpeechBubble(true);
      setGuideMessage(null);
      setIsAuthorPopoverLoading(false);
      setDismissedPrompts(new Set());
      if (nextTutorialStep) {
        setMessages(prev => [...prev, createStepKickoffMessage(nextTutorialStep)]);
      }
    } else {
      markCurrentStepCompleted(currentStep);
      setTutorialCompleted(true);
      setShowSpeechBubble(false);
      tutorialCompletedAtRef.current = Date.now();
      setShowCompletionModal(true);
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  const handleCloseSpeechBubble = () => {
    setShowSpeechBubble(false);
  };

  const handleOpenSpeechBubble = () => {
    if (!showTutorial) {
      setShowTutorial(true);
    }

    setShowSpeechBubble(true);
  };

  const handleToggleTokenPopover = () => {
    setIsTokenPopoverOpen((open) => !open);
  };

  const handleRestartTutorial = () => {
    setCurrentStep(1);
    setHasStartedTutorial(false);
    setMessages([]);
    setInputValue('');
    setTokenCount(0);
    setIsAwaitingResponse(false);
    setGuideMessage(null);
    setIsAuthorPopoverLoading(false);
    setShowSpeechBubble(true);
    setTutorialCompleted(false);
    setDismissedPrompts(new Set());
    setHasEverSentMessage(false);
    setAchievements(initialAchievements);
    setShowAchievementToast(null);
    setConfettiRunId(0);
    setHasPlayedCompletionConfetti(false);
    setShowCompletionModal(false);
    setStepActivity({});
    setIsTokenPopoverOpen(false);
    tutorialStartedAtRef.current = null;
    tutorialCompletedAtRef.current = null;
    
    // Reset loading state
    setLoadingState({
      header: false,
      authorAndBubble: false,
      chatArea: false,
      inputField: false,
      complete: false
    });
    
    // Restart loading sequence
    const loadingSequence = [
      { key: 'header', delay: 300 },
      { key: 'authorAndBubble', delay: 600 },
      { key: 'chatArea', delay: 900 },
      { key: 'inputField', delay: 1200 },
      { key: 'complete', delay: 1500 }
    ];

    const timeouts = loadingSequence.map(({ key, delay }) => 
      setTimeout(() => {
        setLoadingState(prev => ({ ...prev, [key]: true }));
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  };

  if (!showTutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl mb-4">Tutorial Complete!</h2>
          <p className="text-gray-600 mb-6">
            You've learned the five principles of effective AI prompting. Practice these techniques to get better results from AI systems.
          </p>
          <Button onClick={() => {
            setShowTutorial(true);
            setCurrentStep(1);
            setHasStartedTutorial(false);
            setMessages([]);
            setInputValue('');
            setTokenCount(0);
            setGuideMessage(null);
            setIsAuthorPopoverLoading(false);
            setShowSpeechBubble(true);
            setTutorialCompleted(false);
            setDismissedPrompts(new Set());
            setHasEverSentMessage(false);
            setAchievements(initialAchievements);
            setShowAchievementToast(null);
            setConfettiRunId(0);
            setHasPlayedCompletionConfetti(false);
            setShowCompletionModal(false);
            setStepActivity({});
            setIsTokenPopoverOpen(false);
            tutorialStartedAtRef.current = null;
            tutorialCompletedAtRef.current = null;
            
            // Reset loading state
            setLoadingState({
              header: false,
              authorAndBubble: false,
              chatArea: false,
              inputField: false,
              complete: false
            });
            
            // Restart loading sequence
            const loadingSequence = [
              { key: 'header', delay: 300 },
              { key: 'authorAndBubble', delay: 600 },
              { key: 'chatArea', delay: 900 },
              { key: 'inputField', delay: 1200 },
              { key: 'complete', delay: 1500 }
            ];

            loadingSequence.forEach(({ key, delay }) => 
              setTimeout(() => {
                setLoadingState(prev => ({ ...prev, [key]: true }));
              }, delay)
            );
          }}>
            Restart Tutorial
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen bg-white">
      <Background />
      
      {/* Fixed Header - with loading animation */}
      {!loadingState.header ? (
        <HeaderSkeleton />
      ) : (
        <FixedHeader 
          onClose={handleCloseTutorial} 
          onRestart={handleRestartTutorial}
          onAuthorClick={handleOpenSpeechBubble}
          onDismissAuthorPopover={handleCloseSpeechBubble}
          tutorialCompleted={tutorialCompleted}
          achievements={achievements}
          onViewAchievements={handleViewAchievements}
          authorBadgeRef={authorBadgeRef}
          authorNeedsAttention={isAuthorBadgeNudging}
          authorShowPulse={isAuthorBadgePulsing}
          className="animate-fade-in loading-delay-300"
        />
      )}
      
      {/* Main Content - Conditionally scrollable with loading */}
      <div 
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-0 h-screen pt-[128px] ${messages.length > 0 || isAwaitingResponse ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1260px] flex-col px-8 pb-[260px]">
          {!loadingState.chatArea ? (
            <ChatAreaSkeleton />
          ) : (
            <div className="animate-slide-up loading-delay-900">
              <Conversation
                messages={messages}
                inputFieldRef={inputFieldRef}
                suggestedExamples={displayedPrompts}
                onExampleClick={handleExampleClick}
                dismissedPrompts={dismissedPrompts}
                isAwaitingResponse={isAwaitingResponse}
                areSuggestionsDisabled={isAwaitingResponse}
              />
            </div>
          )}
          
          {/* Input Field - with loading animation */}
          {!loadingState.inputField ? (
            <div className="container mx-auto px-4">
              <InputFieldSkeleton />
            </div>
          ) : (
            <>
              <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[85] h-[220px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_18%,rgba(255,255,255,0.68)_42%,rgba(255,255,255,0.92)_68%,rgba(255,255,255,1)_100%)]" />
              <div className="fixed inset-x-0 bottom-16 z-[90] px-8">
                <InputField 
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendMessage}
                  tokenCount={tokenCount}
                  inputFieldRef={inputFieldRef}
                  tokenInfoRef={tokenInfoRef}
                  onTokenInfoClick={handleToggleTokenPopover}
                  disabled={isPromptInputDisabled}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {isTokenPopoverOpen && <TokenInfoPopover anchorRef={tokenInfoRef} />}

      {currentTutorialStep && showTutorial && showSpeechBubble && loadingState.authorAndBubble && (
        <SpeechBubble
          key={speechBubbleContentSignature}
          instruction={visibleSpeechInstruction}
          onNext={handleNextStep}
          onClose={handleCloseSpeechBubble}
          currentStep={currentStep}
          totalSteps={tutorialSteps.length}
          actionLabel={visibleSpeechActionLabel}
          canAdvance={hasStartedTutorial ? canAdvanceTutorialStep : true}
          blockedActionLabel={visibleSpeechBlockedActionLabel}
          isLoading={isAuthorPopoverLoading}
          anchorRef={authorBadgeRef}
        />
      )}

      {/* Achievement Toast */}
      {confettiRunId > 0 && (
        <AchievementConfetti
          key={confettiRunId}
          onComplete={() => setConfettiRunId(0)}
        />
      )}

      {showAchievementToast && (
        <AchievementToast
          achievement={showAchievementToast}
          onComplete={() => setShowAchievementToast(null)}
        />
      )}

      {showCompletionModal && (
        <CompletionModal
          achievements={achievements}
          tokenCount={tokenCount}
          elapsedMinutes={completionElapsedMinutes}
          onClose={() => setShowCompletionModal(false)}
          onRestart={handleRestartTutorial}
        />
      )}
    </div>
  );
}
