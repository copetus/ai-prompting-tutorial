import svgPaths from "./svg-ox7gclqi1v";
import { avatarPhotoDataUrl } from "./assets";
import { imgPhoto1 } from "./svg-d17m4";

function Author() {
  return (
    <div
      className="absolute bg-[#ffffff] inset-0 rounded-[50px]"
      data-name="Author"
    >
      <div className="absolute border-[#8e22a7] border-[3px] border-solid inset-[-3px] pointer-events-none rounded-[53px] shadow-[0px_1px_4px_2px_rgba(0,0,0,0.15)]" />
      <div
        className="absolute bg-center bg-cover bg-no-repeat bottom-[-12.745%] left-[-0.49%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.348145px_9.04883px] mask-size-[71px_71px] right-0 top-[-12.745%]"
        data-name="Photo"
        style={{
          backgroundImage: `url('${avatarPhotoDataUrl}')`,
          maskImage: `url('${imgPhoto1}')`,
        }}
      />
    </div>
  );
}

function AuthorWidgetFloating2AuthorProgressable() {
  return (
    <div
      className="absolute bottom-[713px] left-[104px] size-[71px]"
      data-name="Author Widget_Floating_2/Author_Progressable"
    >
      <Author />
    </div>
  );
}

function CloseFilled() {
  return (
    <div className="absolute right-2 size-6 top-2" data-name="CloseFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="CloseFilled">
          <path
            d={svgPaths.p3fd9e500}
            fill="var(--fill-0, #302F2A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function DialogButton() {
  return (
    <div
      className="bg-[#302f2a] relative rounded-lg shrink-0"
      data-name="Dialog Button"
    >
      <div className="absolute border border-[#54595e] border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-3 relative">
          <div className="font-['Gilroy:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap tracking-[0.08px]">
            <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">
              Get Started!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Right() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Right"
    >
      <DialogButton />
    </div>
  );
}

function NavigationControlsAlt() {
  return (
    <div
      className="absolute bottom-4 box-border content-stretch flex flex-row gap-2 items-center justify-end left-4 p-0 right-4"
      data-name="Navigation Controls_Alt"
    >
      <Right />
    </div>
  );
}

function SpeechBubble() {
  return (
    <div
      className="absolute bottom-[505px] left-[89px] top-[126px]"
      data-name="Speech Bubble"
      style={{ right: "calc(66.6667% + 59px)" }}
    >
      <div
        className="absolute h-[192.879px] left-0 top-[-10.879px] w-[332px]"
        data-name="Background_Speech Bubble"
      >
        <div className="absolute bottom-[-3.629%] left-[-1.807%] right-[-1.807%] top-[-2.592%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 344 205"
          >
            <g filter="url(#filter0_d_1_1046)" id="Background_Speech Bubble">
              <mask fill="white" id="path-1-inside-1_1_1046">
                <path d={svgPaths.p1edbae80} />
              </mask>
              <path d={svgPaths.p1edbae80} fill="var(--fill-0, #FFEDB0)" />
              <path d={svgPaths.p1edbae80} fill="url(#paint0_radial_1_1046)" />
              <path
                d={svgPaths.p231d5400}
                fill="var(--stroke-0, #CACBD6)"
                mask="url(#path-1-inside-1_1_1046)"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="204.879"
                id="filter0_d_1_1046"
                width="344"
                x="0"
                y="-0.000368086"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feMorphology
                  in="SourceAlpha"
                  operator="dilate"
                  radius="2"
                  result="effect1_dropShadow_1_1046"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_1_1046"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1046"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="translate(46.4654 188.298) rotate(6.20755) scale(520.364 288.977)"
                gradientUnits="userSpaceOnUse"
                id="paint0_radial_1_1046"
                r="1"
              >
                <stop stopColor="#FBFBFB" />
                <stop offset="0.934471" stopColor="white" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 font-['Lexend:Medium',_sans-serif] font-medium leading-[0] left-4 right-[35px] text-[#302f2a] text-[16px] text-left top-4 tracking-[-0.24px]">
        <p className="adjustLetterSpacing block leading-[24px]">
          Follow along up here, and you’ll be guided in prompting, refining, and
          assessing the output of different examples.
        </p>
      </div>
      <CloseFilled />
      <NavigationControlsAlt />
    </div>
  );
}

function PulseEffect() {
  return (
    <div
      className="absolute h-10 rounded-lg top-[252px] w-[125px]"
      data-name="Pulse Effect"
      style={{ left: "calc(16.6667% + 40px)" }}
    >
      <div className="absolute inset-0 opacity-0 rounded-lg" data-name="Objec">
        <div className="absolute border-0 border-[#8e22a7] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-start justify-center left-[151px] p-0 top-[183px] w-[358px]"
      data-name="Messages"
    >
      <div className="basis-0 font-['Gilroy:Medium',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#302f2a] text-[16px] text-center tracking-[0.16px]">
        <p className="block leading-[21px]">
          Hi! I’m an LLM, trained to help assist you with tasks and answer
          questions.
        </p>
      </div>
    </div>
  );
}

function AvatarLogo1() {
  return (
    <div
      className="absolute left-[254px] size-[152px] top-2"
      data-name="Avatar Logo"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 152 152"
      >
        <g id="Avatar Logo">
          <rect
            fill="var(--fill-0, #F3F2F5)"
            height="152"
            rx="76"
            width="152"
          />
          <g id="Sparkle">
            <g id="Vector">
              <path d={svgPaths.p37665f40} fill="var(--fill-0, #8E22A7)" />
              <path d={svgPaths.p18522200} fill="var(--fill-0, #8E22A7)" />
              <path
                clipRule="evenodd"
                d={svgPaths.p1e24df80}
                fill="var(--fill-0, #8E22A7)"
                fillRule="evenodd"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Conversation() {
  return (
    <div
      className="absolute bottom-[260px] h-[226px] overflow-clip translate-x-[-50%] w-[660px]"
      data-name="Conversation"
      style={{ left: "calc(58.3333% - 2.99997px)" }}
    >
      <Messages />
      <AvatarLogo1 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 opacity-20" data-name="background">
      <div className="absolute bottom-[-302px] h-[466px] right-[214px] w-[1148px]">
        <div className="absolute bottom-[-107.296%] left-[-43.554%] right-[-43.554%] top-[-107.296%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 2148 1466"
          >
            <g filter="url(#filter0_f_1_1021)" id="Ellipse 90">
              <ellipse
                cx="1074"
                cy="733"
                fill="var(--fill-0, #D0F6F7)"
                rx="574"
                ry="233"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="1466"
                id="filter0_f_1_1021"
                width="2148"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1021"
                  stdDeviation="250"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[-302px] h-[686px] right-[-592px] w-[1148px]">
        <div className="absolute bottom-[-72.886%] left-[-43.554%] right-[-43.554%] top-[-72.886%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 2148 1686"
          >
            <g filter="url(#filter0_f_1_1031)" id="Ellipse 91">
              <ellipse
                cx="1074"
                cy="843"
                fill="var(--fill-0, #FAE5EA)"
                rx="574"
                ry="343"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="1686"
                id="filter0_f_1_1031"
                width="2148"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1031"
                  stdDeviation="250"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="absolute left-1/2 size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3fd9e500}
            fill="var(--fill-0, #302F2A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconButton1() {
  return (
    <div
      className="bg-[rgba(202,203,214,0.5)] relative rounded-3xl shrink-0 size-10"
      data-name="Icon Button"
    >
      <Icon1 />
    </div>
  );
}

function AvatarLogoExit() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-start order-3 p-0 relative shrink-0"
      data-name="Avatar Logo/Exit"
    >
      <IconButton1 />
    </div>
  );
}

function IconButton2() {
  return (
    <div
      className="absolute bg-[#45b730] order-2 right-[111px] rounded-3xl size-2.5 top-[1.5px]"
      data-name="Icon Button"
    />
  );
}

function Icon3() {
  return (
    <div
      className="absolute left-1/2 size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3646bc00}
            fill="var(--fill-0, #302F2A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconButton3() {
  return (
    <div
      className="bg-[#f3f2f5] relative rounded-3xl shrink-0 size-10"
      data-name="Icon Button"
    >
      <Icon3 />
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[8.333%] left-[27.25%] right-[27.24%] top-[12.5%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 19"
      >
        <g id="Group">
          <path
            d={svgPaths.p2eda3e70}
            fill="var(--fill-0, #302F2A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div
      className="absolute left-1/2 overflow-clip rounded-[32px] size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Icon"
    >
      <Group />
    </div>
  );
}

function IconButton4() {
  return (
    <div
      className="bg-[#f3f2f5] relative rounded-3xl shrink-0 size-10"
      data-name="Icon Button"
    >
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div
      className="absolute left-1/2 size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p2e550380}
            fill="var(--fill-0, #302F2A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconButton5() {
  return (
    <div
      className="bg-[#f3f2f5] relative rounded-3xl shrink-0 size-10"
      data-name="Icon Button"
    >
      <Icon5 />
    </div>
  );
}

function RightSide() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start order-1 p-0 relative shrink-0"
      data-name="Right Side"
    >
      <IconButton3 />
      <IconButton4 />
      <IconButton5 />
    </div>
  );
}

function TopBar() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row-reverse h-10 items-center justify-between left-10 p-0 right-10 top-10"
      data-name="Top Bar"
    >
      <AvatarLogoExit />
      <IconButton2 />
      <RightSide />
    </div>
  );
}

function CheckCircleOutlineFilled() {
  return (
    <div
      className="absolute left-[-4px] size-6 top-[-4.5px]"
      data-name="CheckCircleOutlineFilled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="CheckCircleOutlineFilled">
          <path
            d={svgPaths.p33d53300}
            fill="var(--fill-0, #CACBD6)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icon_Container">
      <CheckCircleOutlineFilled />
    </div>
  );
}

function Title() {
  return (
    <div
      className="backdrop-blur-[2px] backdrop-filter bg-[rgba(202,203,214,0.4)] relative rounded-2xl shrink-0"
      data-name="Title"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2 py-1 relative">
          <div className="font-['Gilroy:SemiBold',_sans-serif] leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#302f2a] text-[18px] text-left text-nowrap tracking-[0.09px]">
            <p className="[text-overflow:inherit] adjustLetterSpacing block leading-[normal] overflow-inherit whitespace-pre">
              Introduction to the Five Principles of Prompting
            </p>
          </div>
          <IconContainer />
        </div>
      </div>
    </div>
  );
}

function Author2() {
  return (
    <div
      className="backdrop-blur-[2px] backdrop-filter bg-[rgba(202,203,214,0.4)] relative rounded-2xl shrink-0"
      data-name="Author"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-2 py-1 relative">
          <div className="font-['Gilroy:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#302f2a] text-[14px] text-left text-nowrap tracking-[0.07px]">
            <p className="leading-[normal] whitespace-pre">
              <span>{`By `}</span>
              <span className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] adjustLetterSpacing">
                O’Reilly Media
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetaTag() {
  return (
    <div
      className="backdrop-blur-[2px] backdrop-filter bg-[#8e22a7] relative rounded-2xl shrink-0"
      data-name="Beta Tag"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start px-2 py-1 relative">
          <div className="font-['Gilroy:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.07px]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
              Beta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bottom() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Bottom"
    >
      <Author2 />
      <BetaTag />
    </div>
  );
}

function TitleSection() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Title_Section"
    >
      <Title />
      <Bottom />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 top-[34px]"
      data-name="Header"
      style={{ left: "calc(8.33333% + 71px)" }}
    >
      <TitleSection />
    </div>
  );
}

function Option1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Option1"
    >
      <div className="absolute border-2 border-[#8e22a7] border-dashed inset-0 pointer-events-none rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.16)]" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[16px] relative w-full">
          <div className="-webkit-box basis-0 font-['Gilroy:SemiBold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-80 overflow-ellipsis overflow-hidden relative shrink-0 text-[#6f1385] text-[16px] text-left tracking-[0.144px]">
            <p className="block leading-[20px]">
              My team is remote and we want to have an end of year celebration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Option2() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Option2"
    >
      <div className="absolute border-2 border-[#8e22a7] border-dashed inset-0 pointer-events-none rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.16)]" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[16px] relative w-full">
          <div className="-webkit-box basis-0 font-['Gilroy:SemiBold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-80 overflow-ellipsis overflow-hidden relative shrink-0 text-[#6f1385] text-[16px] text-left tracking-[0.144px]">
            <p className="block leading-[20px]">
              Provide a list of 10 ideas for a team event for a group of remote
              employees to share our end of year celebrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DialogOptions() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 top-[585px] w-[660px]"
      data-name="Dialog Options"
      style={{ left: "calc(33.3333% + 27px)" }}
    >
      <Option1 />
      <Option2 />
    </div>
  );
}

function Send() {
  return (
    <div className="absolute bottom-2.5 right-2.5 size-8" data-name="Send">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Send">
          <rect
            fill="var(--fill-0, #CACBD6)"
            fillOpacity="0.7"
            height="32"
            rx="16"
            width="32"
          />
          <circle
            cx="16"
            cy="16"
            fill="var(--fill-0, #CACBD6)"
            id="Background"
            opacity="0.2"
            r="16"
          />
          <g id="ArrowUpwardFilled">
            <path
              d={svgPaths.p61e02f2}
              fill="var(--fill-0, #302F2A)"
              id="Vector"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TypingArea() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[40px] shrink-0 w-full"
      data-name="Typing Area"
    >
      <div className="absolute border border-[#cacbd6] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-start justify-start px-6 py-4 relative w-full">
          <div
            className="flex flex-col font-['Gilroy:Medium',_sans-serif] justify-center leading-[0] min-w-full not-italic opacity-50 relative shrink-0 text-[#302f2a] text-[16px] text-left tracking-[0.08px]"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[20px]">Send a message</p>
          </div>
          <Send />
        </div>
      </div>
    </div>
  );
}

function Values() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 text-[#302f2a] text-[14.22px]"
      data-name="Values"
    >
      <div className="relative shrink-0 text-nowrap">
        <p className="block leading-[16px] whitespace-pre">340</p>
      </div>
      <div className="relative shrink-0 text-nowrap">
        <p className="block leading-[16px] whitespace-pre">/</p>
      </div>
      <div className="relative shrink-0 w-[35px]">
        <p className="block leading-[16px]">5000</p>
      </div>
    </div>
  );
}

function TokenLimit() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Gilroy:Medium',_sans-serif] gap-2 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left"
      data-name="Token Limit"
    >
      <div className="opacity-50 relative shrink-0 text-[#302f2a] text-[14.22px] text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Tokens used</p>
      </div>
      <Values />
      <div className="relative shrink-0 text-[#cfb8ff] text-[0px] text-nowrap">
        <p className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] block font-['Gilroy:Medium',_sans-serif] leading-[16px] not-italic text-[#8e22a7] text-[14.22px] whitespace-pre">
          What’s a token?
        </p>
      </div>
    </div>
  );
}

function InputField() {
  return (
    <div
      className="absolute bottom-16 box-border content-stretch flex flex-col gap-2 items-center justify-start p-0 translate-x-[-50%] w-[660px]"
      data-name="Input Field"
      style={{ left: "calc(58.3333% - 2.99997px)" }}
    >
      <TypingArea />
      <TokenLimit />
    </div>
  );
}

export default function Concept() {
  return (
    <div
      className="bg-[#ffffff] overflow-clip relative rounded-[10px] size-full"
      data-name="Concept"
    >
      <TopBar />
      <Header />
      <DialogOptions />
      <InputField />
      <AuthorWidgetFloating2AuthorProgressable />
      <SpeechBubble />
      <PulseEffect />
      <Conversation />
      <Background />
    </div>
  );
}
