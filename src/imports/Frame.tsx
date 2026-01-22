function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.695px] pt-0 px-0 relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[76.8px] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="css-4hzbpn mb-0">From Loss to Profit in 4</p>
        <p className="css-4hzbpn">Weeks</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_Devanagari:Regular',sans-serif] font-normal justify-center leading-[25.6px] not-italic relative shrink-0 text-[#ddd] text-[12.9px] w-full">
        <p className="css-4hzbpn mb-0">Trading सीखो बिना real money खोए. Expert setups daily + unlimited mock tests +</p>
        <p className="css-4hzbpn">AI feedback on every trade.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#00a8a8] content-stretch flex flex-col items-center justify-center px-[24px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12.3px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">🎯 Start Free Trial</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex flex-col items-center justify-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00a8a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.5px] text-center">
        <p className="css-ew64yg leading-[normal]">📚 Attend Free Webinar</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex flex-col items-center justify-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00a8a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px] text-center">
        <p className="css-ew64yg leading-[normal]">📱 Try Mock Tests</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-start flex flex-wrap gap-[0px_15px] items-start pb-0 pt-[5.7px] px-0 relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[10.9px]">
        <p className="css-ew64yg leading-[19.2px]">⭐ 4.8 rating (1,200+ reviews)</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[10.9px]">
        <p className="css-ew64yg leading-[19.2px]">5,000+ traders</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[10.9px]">
        <p className="css-ew64yg leading-[19.2px]">₹500+ Cr tracked</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-wrap gap-[0px_30px] items-start pb-0 pt-[9.7px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[19.3px] items-start left-0 right-[600px] top-[27.42px]" data-name="Container">
      <Heading />
      <Container />
      <Container1 />
      <Container5 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bg-[#2a4a4f] content-stretch flex h-[400px] items-center justify-center left-[600px] p-[2px] right-0 rounded-[8px] top-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#00a8a8] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[13.2px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Dashboard Screenshot Placeholder (16:9 aspect)</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[400px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
        <BackgroundBorder />
      </div>
    </div>
  );
}

function SectionSection1Hero() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-[81px] pt-[80px] px-[380px] right-0 top-[72px]" data-name="Section - SECTION 1: HERO" style={{ backgroundImage: "linear-gradient(134.949deg, rgb(15, 20, 25) 0%, rgb(26, 61, 66) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 2</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.59px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.1px] text-center">
        <p className="css-ew64yg leading-[51.2px]">{`Most Traders Lose Money. Here's Why.`}</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.3px] text-center">
        <p className="css-ew64yg leading-[22.4px]">3 Core Pain Points</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[31px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[16px] text-center">
        <p className="css-ew64yg leading-[51.2px]">🔴</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[98.19px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.5px] text-center">
        <p className="css-ew64yg leading-[32px]">Emotional Trading</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.69px] pt-0 px-0 right-[32px] top-[141.09px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular','Noto_Sans_Devanagari:Regular',sans-serif] font-normal justify-center leading-[20.8px] not-italic relative shrink-0 text-[#666] text-[11.9px] text-center">
        <p className="css-ew64yg mb-0">Fear और greed guide trades, not logic. One bad day</p>
        <p className="css-ew64yg">= ₹10K loss. Then revenge trade.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.8px] pt-0 px-0 right-[32px] top-[197.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[12.4px]">
          <span className="leading-[20.8px]">Impact:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20.8px] not-italic">{` 70% traders lose money`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#fff9f9] relative rounded-[8px] self-stretch shrink-0 w-[366.66px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f44] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container9 />
      <Heading2 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[31px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[16px] text-center">
        <p className="css-ew64yg leading-[51.2px]">🔴</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[98.19px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.1px] text-center">
        <p className="css-ew64yg leading-[32px]">No System/Strategy</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.69px] pt-0 px-0 right-[32px] top-[141.09px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20.8px] not-italic relative shrink-0 text-[#666] text-[12.4px] text-center">
        <p className="css-ew64yg mb-0">Which setup? When to enter? Where SL? Complete</p>
        <p className="css-ew64yg">confusion and random trades.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.8px] pt-0 px-0 right-[32px] top-[197.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[12.5px]">
          <span className="leading-[20.8px]">Impact:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20.8px] not-italic">{` Random results`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#fff9f9] relative rounded-[8px] self-stretch shrink-0 w-[366.67px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f44] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container12 />
      <Heading4 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[31px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[16px] text-center">
        <p className="css-ew64yg leading-[51.2px]">🔴</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[98.19px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.4px] text-center">
        <p className="css-ew64yg leading-[32px]">No Feedback/Learning</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.69px] pt-0 px-0 right-[32px] top-[141.09px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[20.8px] not-italic relative shrink-0 text-[#666] text-[12.2px] text-center">
        <p className="css-ew64yg mb-0">Trade, get result, learn nothing. Same mistakes</p>
        <p className="css-ew64yg">repeat every month.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] pb-[0.8px] pt-0 px-0 right-[32px] top-[197.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[12.3px]">
          <span className="leading-[20.8px]">Impact:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20.8px] not-italic">{` Stuck in losing cycle`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#fff9f9] relative rounded-[8px] self-stretch shrink-0 w-[366.66px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f44] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container15 />
      <Heading5 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[30px] items-start justify-center left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[442.75px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background />
        <Heading1 />
        <Container8 />
        <Container18 />
      </div>
    </div>
  );
}

function SectionSection2Problems() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[633px]" data-name="Section - SECTION 2: PROBLEMS">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container19 />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 3</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.59px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.4px] text-center">
        <p className="css-ew64yg leading-[51.2px]">How Money Scalper Fixes It</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.1px] text-center">
        <p className="css-ew64yg leading-[22.4px]">All-in-One Trading Academy. Learn. Practice. Track. Improve.</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-1/2 pb-[4.79px] pt-[4.21px] px-0 rounded-[17.5px] size-[35px] top-[27px] translate-x-[-50%]" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white">
        <p className="css-ew64yg leading-[25.6px]">1</p>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[72px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[15.6px] text-center">
        <p className="css-ew64yg leading-[25.6px]">Learn</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[106.69px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.2px] not-italic relative shrink-0 text-[#666] text-[11.3px] text-center">
        <p className="css-ew64yg mb-0">6 foundational videos (45 mins) + LIVE class</p>
        <p className="css-ew64yg">with Piyush</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-center left-[283px] top-[70.49px] w-[20px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[20px] text-center">
        <p className="css-ew64yg leading-[32px]">→</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Background2 />
      <Heading7 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-1/2 pb-[4.79px] pt-[4.21px] px-0 rounded-[17.5px] size-[35px] top-[27px] translate-x-[-50%]" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white">
        <p className="css-ew64yg leading-[25.6px]">2</p>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[72px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[15.4px] text-center">
        <p className="css-ew64yg leading-[25.6px]">Practice</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[106.69px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.2px] not-italic relative shrink-0 text-[#666] text-[11.1px] text-center">
        <p className="css-ew64yg mb-0">{`₹10L virtual portfolio. Copy Piyush's daily`}</p>
        <p className="css-ew64yg">setups (2-3/day). Unlimited trades.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-center left-[283px] top-[70.49px] w-[20px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[20px] text-center">
        <p className="css-ew64yg leading-[32px]">→</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Background3 />
      <Heading8 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-1/2 pb-[4.79px] pt-[4.21px] px-0 rounded-[17.5px] size-[35px] top-[27px] translate-x-[-50%]" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white">
        <p className="css-ew64yg leading-[25.6px]">3</p>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[72px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[15.1px] text-center">
        <p className="css-ew64yg leading-[25.6px]">Track</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[106.69px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.2px] not-italic relative shrink-0 text-[#666] text-[11.1px] text-center">
        <p className="css-ew64yg mb-0">Auto-recorded journal. TradingView charts.</p>
        <p className="css-ew64yg">{`Day-wise P&L + stats.`}</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-center left-[283px] top-[70.49px] w-[20px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[20px] text-center">
        <p className="css-ew64yg leading-[32px]">→</p>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Background4 />
      <Heading9 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-1/2 pb-[4.79px] pt-[4.21px] px-0 rounded-[17.5px] size-[35px] top-[27px] translate-x-[-50%]" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15.3px] text-center text-white">
        <p className="css-ew64yg leading-[25.6px]">4</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[72px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[15.6px] text-center">
        <p className="css-ew64yg leading-[25.6px]">Improve</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[17px] right-[17px] top-[106.69px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.2px] not-italic relative shrink-0 text-[#666] text-[11.1px] text-center">
        <p className="css-ew64yg mb-0">AI analyzes every trade. Setup quality + risk</p>
        <p className="css-ew64yg">+ psychology + recommendations.</p>
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Background5 />
      <Heading10 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-start justify-center left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder4 />
      <BackgroundBorder5 />
      <BackgroundBorder6 />
      <BackgroundBorder7 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[349.14px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background1 />
        <Heading6 />
        <Container20 />
        <Container28 />
      </div>
    </div>
  );
}

function SectionSection3Solution() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[1196.75px]" data-name="Section - SECTION 3: SOLUTION">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container29 />
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 4</p>
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.59px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[30.9px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Your Trading Headquarters</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.2px] text-center">
        <p className="css-ew64yg leading-[22.4px]">See all features in action</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#00a8a8] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.3px] text-center">
            <p className="css-ew64yg leading-[normal]">Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f9f9f9] flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.2px] text-center">
            <p className="css-ew64yg leading-[normal]">Expert Setups</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f9f9f9] flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center">
            <p className="css-ew64yg leading-[normal]">Mock Tests</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#f9f9f9] flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.3px] text-center">
            <p className="css-ew64yg leading-[normal]">Journal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f9f9f9] flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.5px] text-center">
            <p className="css-ew64yg leading-[normal]">Live Data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#f9f9f9] flex-[1_0_0] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[15px] px-[15px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.4px] text-center">
            <p className="css-ew64yg leading-[normal]">Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-[1156px]" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#eee] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[2px] pt-0 px-0 relative w-full">
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px p-[2px] relative" data-name="Background+Border" style={{ backgroundImage: "linear-gradient(134.77deg, rgb(249, 249, 249) 0%, rgb(232, 244, 244) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[13.2px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Screenshot: Dashboard Tab</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f9f9f9] h-[350px] relative shrink-0 w-[1156px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BackgroundBorder8 />
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="absolute bg-white left-[20px] right-[20px] rounded-[8px] top-[176.17px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] w-full">
        <BackgroundHorizontalBorder />
        <Background7 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[580.17px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background6 />
        <Heading11 />
        <Container30 />
        <BackgroundBorder9 />
      </div>
    </div>
  );
}

function SectionSection4Showcase() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[1666.89px]" data-name="Section - SECTION 4: SHOWCASE">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container31 />
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 5</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.6px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.3px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Why Choose Money Scalper?</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.3px] text-center">
        <p className="css-ew64yg leading-[22.4px]">5 Core USPs vs Competition</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] pb-[0.8px] pt-0 px-0 right-[30px] top-[29px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px]">
        <p className="css-ew64yg leading-[44.8px]">🎓</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] right-[30px] top-[89.8px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[19.5px]">
        <p className="css-ew64yg leading-[32px]">Expert Guidance</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[131.8px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.4px] not-italic relative shrink-0 text-[#666] text-[13.2px] text-center">
        <p className="css-ew64yg mb-0">{`Piyush's 11 years of experience shared daily. Daily setups with video`}</p>
        <p className="css-ew64yg">explanation. LIVE class every Saturday 7 PM. 80% win rate proven.</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[191.58px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[13.2px]">
          <span className="leading-[22.4px]">vs Others:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic">{` Pre-recorded, no real-time guidance`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="absolute bg-white border-2 border-[#ccc] border-dashed h-[262.97px] left-0 right-[595px] rounded-[8px] top-0" data-name="Background+Border">
      <Container33 />
      <Heading13 />
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] pb-[0.8px] pt-0 px-0 right-[30px] top-[29px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px]">
        <p className="css-ew64yg leading-[44.8px]">📊</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] right-[30px] top-[89.8px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[19.4px]">
        <p className="css-ew64yg leading-[32px]">Risk-Free Practice</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[131.8px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.4px] not-italic relative shrink-0 text-[#666] text-[13.1px] text-center">
        <p className="css-ew64yg mb-0">₹10L virtual portfolio. Real market data. Unlimited mock tests. Leaderboards +</p>
        <p className="css-ew64yg">prizes.</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[191.58px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[13.1px]">
          <span className="leading-[22.4px]">vs Others:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic">{` Limited free trades (5-10), stale data`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="absolute bg-white border-2 border-[#ccc] border-dashed h-[262.97px] left-[595px] right-0 rounded-[8px] top-0" data-name="Background+Border">
      <Container36 />
      <Heading14 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] pb-[0.8px] pt-0 px-0 right-[30px] top-[29px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px]">
        <p className="css-ew64yg leading-[44.8px]">🤖</p>
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] right-[30px] top-[89.8px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[19.5px]">
        <p className="css-ew64yg leading-[32px]">AI Feedback</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[131.8px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.4px] not-italic relative shrink-0 text-[#666] text-[13.1px] text-center">
        <p className="css-ew64yg mb-0">Instant feedback on every trade. Setup quality rating. Risk audit. Psychology</p>
        <p className="css-ew64yg">assessment. Actionable improvements.</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[191.58px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[13.1px]">
          <span className="leading-[22.4px]">vs Others:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic">{` Journaling tools don't teach improvement`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="absolute bg-white border-2 border-[#ccc] border-dashed h-[262.97px] left-0 right-[595px] rounded-[8px] top-[292.97px]" data-name="Background+Border">
      <Container39 />
      <Heading15 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] pb-[0.8px] pt-0 px-0 right-[30px] top-[29px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px]">
        <p className="css-ew64yg leading-[44.8px]">📈</p>
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30px] right-[30px] top-[89.8px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[19.4px]">
        <p className="css-ew64yg leading-[32px]">Complete Ecosystem</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[131.8px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.4px] not-italic relative shrink-0 text-[#666] text-[13px] text-center">
        <p className="css-ew64yg mb-0">Videos + live class + expert setups + mock tests + journal + live data + AI</p>
        <p className="css-ew64yg">feedback. Everything in ONE place.</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[30px] right-[30px] top-[191.58px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] text-center">
        <p className="css-ew64yg text-[13.2px]">
          <span className="leading-[22.4px]">vs Others:</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic">{` Tradervue (journal only), Unacademy (courses only)`}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="absolute bg-white border-2 border-[#ccc] border-dashed h-[262.97px] left-[595px] right-0 rounded-[8px] top-[292.97px]" data-name="Background+Border">
      <Container42 />
      <Heading16 />
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[555.94px] left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder10 />
      <BackgroundBorder11 />
      <BackgroundBorder12 />
      <BackgroundBorder13 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[732.11px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background8 />
        <Heading12 />
        <Container32 />
        <Container45 />
      </div>
    </div>
  );
}

function SectionSection5Features() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[2368.06px]" data-name="Section - SECTION 5: FEATURES">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container46 />
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 6</p>
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.6px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.9px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Real Traders, Real Results</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Join 5,000+ Profitable Traders</p>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex items-center justify-center pb-[12.29px] pt-[11.71px] px-[2px] relative rounded-[25px] shrink-0 size-[50px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[25px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[8px] text-center">
        <p className="css-ew64yg leading-[25.6px]">👤</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[13.5px]">
        <p className="css-ew64yg leading-[22.4px]">Harsh, 22</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Beginner → Profitable</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px pt-0 px-0 relative self-stretch shrink-0" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[15px] items-start left-[27px] right-[27px] top-[27px]" data-name="Container">
      <BackgroundBorder14 />
      <Container50 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[91px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ff9800] text-[7.1px]">
        <p className="css-ew64yg leading-[19.2px]">⭐⭐⭐⭐⭐</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[121.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#666] text-[12.1px]">
        <p className="css-ew64yg mb-0">{`"₹5K loss in first week. After 4 weeks: 62% win rate +`}</p>
        <p className="css-ew64yg mb-0">{`₹50K virtual profit. Piyush's daily setups are game-`}</p>
        <p className="css-ew64yg">{`changing!"`}</p>
      </div>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container51 />
      <Container52 />
      <Container53 />
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex items-center justify-center pb-[12.29px] pt-[11.71px] px-[2px] relative rounded-[25px] shrink-0 size-[50px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[25px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[8px] text-center">
        <p className="css-ew64yg leading-[25.6px]">👤</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[13.3px]">
        <p className="css-ew64yg leading-[22.4px]">Priya, 35</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Active Trader</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px pt-0 px-0 relative self-stretch shrink-0" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex gap-[15px] items-start left-[27px] right-[27px] top-[27px]" data-name="Container">
      <BackgroundBorder16 />
      <Container56 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[91px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ff9800] text-[7.1px]">
        <p className="css-ew64yg leading-[19.2px]">⭐⭐⭐⭐⭐</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[121.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#666] text-[12.2px]">
        <p className="css-ew64yg mb-0">{`"Journal + feedback showed I win 65% on support-`}</p>
        <p className="css-ew64yg mb-0">{`resistance. 2 months = 2x profit. Now disciplined &`}</p>
        <p className="css-ew64yg">{`consistent!"`}</p>
      </div>
    </div>
  );
}

function BackgroundBorder17() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container57 />
      <Container58 />
      <Container59 />
    </div>
  );
}

function BackgroundBorder18() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex items-center justify-center pb-[12.29px] pt-[11.71px] px-[2px] relative rounded-[25px] shrink-0 size-[50px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[25px]" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[8px] text-center">
        <p className="css-ew64yg leading-[25.6px]">👤</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[13.5px]">
        <p className="css-ew64yg leading-[22.4px]">Rajesh, 45</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Comeback Trader</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px pt-0 px-0 relative self-stretch shrink-0" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[15px] items-start left-[27px] right-[27px] top-[27px]" data-name="Container">
      <BackgroundBorder18 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[91px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ff9800] text-[7.1px]">
        <p className="css-ew64yg leading-[19.2px]">⭐⭐⭐⭐⭐</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] right-[27px] top-[121.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#666] text-[12.2px]">
        <p className="css-ew64yg mb-0">{`"Lost ₹10L in 2012. Money Scalper rebuilt confidence.`}</p>
        <p className="css-ew64yg mb-0">3 months practicing, now ready for real trading. Best</p>
        <p className="css-ew64yg">{`₹99 ever spent!"`}</p>
      </div>
    </div>
  );
}

function BackgroundBorder19() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container63 />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex gap-[25px] items-start justify-center left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder15 />
      <BackgroundBorder17 />
      <BackgroundBorder19 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex gap-[14.5px] items-start left-[20px] pb-[7.59px] pt-[10px] px-[553.55px] right-[20px] top-[402.86px]" data-name="Container">
      <div className="bg-[#00a8a8] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
      <div className="bg-[#ccc] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
      <div className="bg-[#ccc] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[457.46px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10.9px] text-center">
        <p className="css-ew64yg leading-[19.2px]">⭐ 4.8 rating | 1,200+ reviews | 5,000+ traders</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[477.64px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background9 />
        <Heading17 />
        <Container47 />
        <Container66 />
        <Container67 />
        <Container68 />
      </div>
    </div>
  );
}

function SectionSection6Testimonials() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex flex-col items-start left-0 pb-[76px] pt-[60px] px-[360px] right-0 top-[3221.17px]" data-name="Section - SECTION 6: TESTIMONIALS">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container69 />
    </div>
  );
}

function Background10() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 7</p>
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.6px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.3px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Simple, Transparent Pricing</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.2px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Choose Your Plan. Cancel Anytime. 14-day money-back guarantee.</p>
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[32px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18.6px] text-center">
        <p className="css-ew64yg leading-[32px]">Starter</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute font-['Inter:Bold',sans-serif] font-bold h-[51.19px] leading-[0] left-[32px] not-italic right-[32px] text-center top-[79px]" data-name="Paragraph">
      <div className="absolute flex flex-col h-[52px] justify-center left-[calc(50%-23.23px)] text-[#00a8a8] text-[27.3px] top-[25px] translate-x-[-50%] translate-y-[-50%] w-[51.76px]">
        <p className="css-4hzbpn leading-[51.2px]">₹99</p>
      </div>
      <div className="absolute flex flex-col h-[23px] justify-center left-[calc(50%+25.88px)] text-[#666] text-[13.1px] top-[31px] translate-x-[-50%] translate-y-[-50%] w-[46.86px]">
        <p className="css-4hzbpn leading-[22.4px]">/month</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[144.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.1px] text-center">
        <p className="css-ew64yg leading-[19.2px]">Best for beginners</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-[32px] px-[24px] py-[12px] right-[32px] rounded-[4px] top-[189.38px]" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.2px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Start Free Trial</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Expert Setups (7 days history)</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10.9px]">
        <p className="css-ew64yg leading-[19.2px]">Mock Tests (5/week)</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Trading Journal (limited)</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccc] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">AI Feedback</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccc] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Live Data</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccc] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">1-on-1 Coaching</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] right-[32px] top-[249.38px]" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function BackgroundBorder20() {
  return (
    <div className="bg-white h-full relative rounded-[8px] shrink-0 w-[370px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Heading19 />
      <Paragraph />
      <Container71 />
      <Button9 />
      <List />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#00a8a8] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[5.83px] pt-[4.15px] px-[10.5px] relative">
        <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10.9px] text-center text-white">
          <p className="css-ew64yg leading-[18.48px]">⭐ BEST VALUE</p>
        </div>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="relative shrink-0 w-[321.3px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[21px] text-center">
          <p className="css-ew64yg leading-[33.6px]">Pro</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[58.99px] relative shrink-0 w-[321.3px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid font-['Inter:Bold',sans-serif] font-bold leading-[0] not-italic relative size-full text-center">
        <div className="absolute flex flex-col h-[54px] justify-center left-[calc(50%-24.4px)] text-[#00a8a8] text-[28.2px] top-[26.25px] translate-x-[-50%] translate-y-[-50%] w-[73.03px]">
          <p className="css-4hzbpn leading-[53.76px]">₹499</p>
        </div>
        <div className="absolute flex flex-col h-[24px] justify-center left-[calc(50%+36.51px)] text-[#666] text-[13.8px] top-[32.55px] translate-x-[-50%] translate-y-[-50%] w-[49.19px]">
          <p className="css-4hzbpn leading-[23.52px]">/month</p>
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-[321.3px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[15.75px] pt-[4.2px] px-0 relative w-full">
        <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.6px] text-center">
          <p className="css-ew64yg leading-[20.16px]">Most popular</p>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#00a8a8] relative rounded-[4px] shrink-0 w-[321.3px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[25.2px] py-[12.6px] relative w-full">
        <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.6px] text-center text-white">
          <p className="css-ew64yg leading-[normal]">Get Started (7-day free)</p>
        </div>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.65px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.8px]">
        <p className="css-ew64yg leading-[20.16px]">Expert Setups (Real-time)</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.64px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.6px]">
        <p className="css-ew64yg leading-[20.16px]">Mock Tests (Unlimited)</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.65px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px]">
        <p className="css-ew64yg leading-[20.16px]">Trading Journal (Full)</p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.65px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.8px]">
        <p className="css-ew64yg leading-[20.16px]">AI Feedback (Instant)</p>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.64px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.8px]">
        <p className="css-ew64yg leading-[20.16px]">Live Market Data</p>
      </div>
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex gap-[8.4px] items-start pb-[9.65px] pt-[7.35px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12.6px]">
        <p className="css-ew64yg leading-[20.16px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccc] text-[11.8px]">
        <p className="css-ew64yg leading-[20.16px]">1-on-1 Coaching</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="relative shrink-0 w-[321.3px]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[10.5px] px-0 relative w-full">
        <Item6 />
        <Item7 />
        <Item8 />
        <Item9 />
        <Item10 />
        <Item11 />
      </div>
    </div>
  );
}

function BackgroundBorder21() {
  return (
    <div className="bg-[#f0fafa] content-stretch flex flex-col gap-[10.5px] h-[583.9px] items-center p-[33.6px] relative rounded-[8px] shrink-0 w-[388.5px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#00a8a8] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Background11 />
      <Heading20 />
      <Paragraph1 />
      <Container72 />
      <Button10 />
      <List1 />
    </div>
  );
}

function Heading21() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[32px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.8px] text-center">
        <p className="css-ew64yg leading-[32px]">Elite</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute font-['Inter:Bold',sans-serif] font-bold h-[51.19px] leading-[0] left-[32px] not-italic right-[32px] text-center top-[79px]" data-name="Paragraph">
      <div className="absolute flex flex-col h-[52px] justify-center left-[calc(50%-23.24px)] text-[#00a8a8] text-[28.9px] top-[25px] translate-x-[-50%] translate-y-[-50%] w-[96.25px]">
        <p className="css-4hzbpn leading-[51.2px]">₹1,499</p>
      </div>
      <div className="absolute flex flex-col h-[23px] justify-center left-[calc(50%+48.12px)] text-[#666] text-[13.1px] top-[31px] translate-x-[-50%] translate-y-[-50%] w-[46.86px]">
        <p className="css-4hzbpn leading-[22.4px]">/month</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[144.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.4px] text-center">
        <p className="css-ew64yg leading-[19.2px]">Power users</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-[32px] px-[24px] py-[12px] right-[32px] rounded-[4px] top-[189.38px]" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.5px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Book Call</p>
      </div>
    </div>
  );
}

function Item12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Expert Setups (Real-time)</p>
      </div>
    </div>
  );
}

function Item13() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Mock Tests (Unlimited)</p>
      </div>
    </div>
  );
}

function Item14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Trading Journal (Full)</p>
      </div>
    </div>
  );
}

function Item15() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">AI Feedback (Instant)</p>
      </div>
    </div>
  );
}

function Item16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Live Market Data</p>
      </div>
    </div>
  );
}

function Item17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[9.19px] pt-[7px] px-0 relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">{`✓ `}</p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">1-on-1 with Piyush (1x/week)</p>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] right-[32px] top-[249.38px]" data-name="List">
      <Item12 />
      <Item13 />
      <Item14 />
      <Item15 />
      <Item16 />
      <Item17 />
    </div>
  );
}

function BackgroundBorder22() {
  return (
    <div className="bg-white h-full relative rounded-[8px] shrink-0 w-[370px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Heading21 />
      <Paragraph2 />
      <Container73 />
      <Button11 />
      <List2 />
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex gap-[15.8px] h-[556.09px] items-center justify-center left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder20 />
      <BackgroundBorder21 />
      <BackgroundBorder22 />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[732.27px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background10 />
        <Heading18 />
        <Container70 />
        <Container74 />
      </div>
    </div>
  );
}

function SectionSection7Pricing() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[3834.81px]" data-name="Section - SECTION 7: PRICING">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container75 />
    </div>
  );
}

function Background12() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 8</p>
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.59px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[30.9px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Get Started in 3 Ways</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[113.78px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.3px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Choose Your Path</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[32px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[20px] text-center">
        <p className="css-ew64yg leading-[64px]">💻</p>
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[111px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.5px] text-center">
        <p className="css-ew64yg leading-[32px]">Direct Signup</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[154px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.1px] text-center">
        <p className="css-ew64yg leading-[19.2px]">Know what you want, immediate buyer</p>
      </div>
    </div>
  );
}

function Item18() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.3px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Click Start Free Trial</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item19() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Choose tier</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item20() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.3px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Enter payment</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item21() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Instant access!</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function OrderedList() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[7px] items-start leading-[0] left-[32px] not-italic pl-[20px] pr-0 py-0 right-[32px] text-[#666] top-[193.19px]" data-name="Ordered List">
      <Item18 />
      <Item19 />
      <Item20 />
      <Item21 />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[321.38px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[0px] text-center">
        <p className="css-ew64yg text-[13px]">
          <span className="leading-[22.4px]">3 mins</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic text-[#666]">{` | ₹99/month`}</span>
        </p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-[32px] px-[24px] py-[12px] right-[32px] rounded-[4px] top-[368.77px]" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Get Started Now</p>
      </div>
    </div>
  );
}

function BackgroundBorder23() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[366.66px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container77 />
      <Heading23 />
      <Container78 />
      <OrderedList />
      <Container79 />
      <Button12 />
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[32px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[20px] text-center">
        <p className="css-ew64yg leading-[64px]">📅</p>
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[111px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.5px] text-center">
        <p className="css-ew64yg leading-[32px]">Free Webinar</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[154px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.3px] text-center">
        <p className="css-ew64yg leading-[19.2px]">Learn first, meet Piyush</p>
      </div>
    </div>
  );
}

function Item22() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.3px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Register free</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item23() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Attend Thursday 7 PM</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item24() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Learn live trading</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item25() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[11.8px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">₹99 offer at end</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function OrderedList1() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[7px] items-start leading-[0] left-[32px] not-italic pl-[20px] pr-0 py-0 right-[32px] text-[#666] top-[193.19px]" data-name="Ordered List">
      <Item22 />
      <Item23 />
      <Item24 />
      <Item25 />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[321.38px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[0px] text-center">
        <p className="css-ew64yg text-[13.6px]">
          <span className="leading-[22.4px]">1 hour</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic text-[#666]">{` | FREE + ₹3,999 course`}</span>
        </p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-[32px] px-[24px] py-[12px] right-[32px] rounded-[4px] top-[368.77px]" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.2px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Attend Webinar</p>
      </div>
    </div>
  );
}

function BackgroundBorder24() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[366.67px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container80 />
      <Heading24 />
      <Container81 />
      <OrderedList1 />
      <Container82 />
      <Button13 />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[32px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[20px] text-center">
        <p className="css-ew64yg leading-[64px]">📱</p>
      </div>
    </div>
  );
}

function Heading25() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[111px]" data-name="Heading 3">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[19.1px] text-center">
        <p className="css-ew64yg leading-[32px]">Try Mock Tests</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[154px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#999] text-[11.1px] text-center">
        <p className="css-ew64yg leading-[19.2px]">Experience first, decide later</p>
      </div>
    </div>
  );
}

function Item26() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Download app</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item27() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Get ₹10L virtual</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item28() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Take 5 free tests</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Item29() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[20.1px] pt-0 px-0 relative shrink-0 w-full" data-name="Item">
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[12.2px] z-[2]">
        <p className="css-ew64yg leading-[20.8px]">Then upgrade</p>
      </div>
      <div className="css-g0mm18 flex flex-col justify-center mb-[-20.1px] relative shrink-0 text-[13px] z-[1]">
        <ol className="css-8097nc ml-[-1.5em]" start="1">
          <li className="css-4hzbpn ms-[19.5px]">
            <span className="leading-[20.8px]">&nbsp;</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function OrderedList2() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[7px] items-start leading-[0] left-[32px] not-italic pl-[20px] pr-0 py-0 right-[32px] text-[#666] top-[193.19px]" data-name="Ordered List">
      <Item26 />
      <Item27 />
      <Item28 />
      <Item29 />
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[32px] right-[32px] top-[321.38px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[14px] text-center">
        <p className="css-ew64yg">
          <span className="leading-[22.4px]">7 days</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic text-[#666]">{` | FREE`}</span>
        </p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-center justify-center left-[32px] px-[24px] py-[12px] right-[32px] rounded-[4px] top-[368.77px]" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.3px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Try Free</p>
      </div>
    </div>
  );
}

function BackgroundBorder25() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[366.66px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container83 />
      <Heading25 />
      <Container84 />
      <OrderedList2 />
      <Container85 />
      <Button14 />
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex gap-[30px] items-start justify-center left-[20px] right-[20px] top-[176.17px]" data-name="Container">
      <BackgroundBorder23 />
      <BackgroundBorder24 />
      <BackgroundBorder25 />
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[616.94px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background12 />
        <Heading22 />
        <Container76 />
        <Container86 />
      </div>
    </div>
  );
}

function SectionSection8GetStarted() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex flex-col items-start left-0 pb-[61px] pt-[60px] px-[360px] right-0 top-[4688.08px]" data-name="Section - SECTION 8: GET STARTED">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container87 />
    </div>
  );
}

function Background13() {
  return (
    <div className="absolute bg-[#00a8a8] content-stretch flex items-start left-[20px] px-[10px] py-[5px] rounded-[4px] top-0" data-name="Background">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.8px] text-white">
        <p className="css-ew64yg leading-[17.6px]">SECTION 9</p>
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[20px] right-[20px] top-[46.59px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[31.1px] text-center">
        <p className="css-ew64yg leading-[51.2px]">Frequently Asked Questions</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13.8px]">
        <p className="css-ew64yg leading-[22.4px]">{`I'm a complete beginner. Is this for me?`}</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[18px]">
        <p className="css-ew64yg leading-[28.8px]">+</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-[796px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[20px] relative w-full">
        <Container88 />
        <Container89 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] w-full">
        <Background14 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13.6px]">
        <p className="css-ew64yg leading-[22.4px]">How is this different from YouTube / ₹2L courses?</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[18px]">
        <p className="css-ew64yg leading-[28.8px]">+</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-[796px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[20px] relative w-full">
        <Container90 />
        <Container91 />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] w-full">
        <Background15 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13.7px]">
        <p className="css-ew64yg leading-[22.4px]">Can I cancel anytime?</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[18px]">
        <p className="css-ew64yg leading-[28.8px]">+</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-[796px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[20px] relative w-full">
        <Container92 />
        <Container93 />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] w-full">
        <Background16 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13.8px]">
        <p className="css-ew64yg leading-[22.4px]">Do I need to trade real money to see results?</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[18px]">
        <p className="css-ew64yg leading-[28.8px]">+</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-[796px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[20px] relative w-full">
        <Container94 />
        <Container95 />
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] w-full">
        <Background17 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ccc] border-dashed inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[200px] max-w-[800px] right-[200px] top-[138.78px]" data-name="Container">
      <Border />
      <Border1 />
      <Border2 />
      <Border3 />
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[474.97px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background13 />
        <Heading26 />
        <Container96 />
      </div>
    </div>
  );
}

function SectionSection9Faq() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[76px] pt-[60px] px-[360px] right-0 top-[5426.02px]" data-name="Section - SECTION 9: FAQ">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Container97 />
    </div>
  );
}

function Heading27() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[-1px]" data-name="Heading 2">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[31.5px] text-center text-white">
        <p className="css-ew64yg leading-[51.2px]">Ready to Become a Profitable Trader?</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[71.19px]" data-name="Container">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.8px] text-center">
        <p className="css-ew64yg leading-[22.4px]">Take the first step today</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#00a8a8] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.2px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Get Started Free</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#00a8a8] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.3px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Join Webinar</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#00a8a8] content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12.9px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Try Mock Tests</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[0px_15px] items-start justify-center left-0 right-0 top-[108.58px]" data-name="Container">
      <Button15 />
      <Button16 />
      <Button17 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute border-[#333] border-b border-solid h-[189.58px] left-[20px] right-[20px] top-0" data-name="HorizontalBorder">
      <Heading27 />
      <Container98 />
      <Container99 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Heading 4">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.6px] text-white">
        <p className="css-ew64yg leading-[22.4px]">Product</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[36.39px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.6px]">
        <p className="css-ew64yg leading-[19.2px]">Features</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[65.58px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Pricing</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[94.77px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[123.96px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Testimonials</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading3 />
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Heading28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Heading 4">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-white">
        <p className="css-ew64yg leading-[22.4px]">Resources</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[36.39px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Blog</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[65.58px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Webinars</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[94.77px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[12px]">
        <p className="css-ew64yg leading-[19.2px]">FAQ</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[123.96px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Community</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading28 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Heading29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Heading 4">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-white">
        <p className="css-ew64yg leading-[22.4px]">Legal</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[36.39px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Terms</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[65.58px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.4px]">
        <p className="css-ew64yg leading-[19.2px]">Privacy</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[94.77px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.1px]">
        <p className="css-ew64yg leading-[19.2px]">Support</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[123.96px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[10.9px]">
        <p className="css-ew64yg leading-[19.2px]">Contact</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading29 />
      <Link8 />
      <Link9 />
      <Link10 />
      <Link11 />
    </div>
  );
}

function Heading30() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Heading 4">
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.9px] text-white">
        <p className="css-ew64yg leading-[22.4px]">Social</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[36.39px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">Instagram</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[65.58px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.6px]">
        <p className="css-ew64yg leading-[19.2px]">YouTube</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[94.77px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[10.7px]">
        <p className="css-ew64yg leading-[19.2px]">Twitter</p>
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[123.96px]" data-name="Link">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aaa] text-[11.3px]">
        <p className="css-ew64yg leading-[19.2px]">WhatsApp</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading30 />
      <Link12 />
      <Link13 />
      <Link14 />
      <Link15 />
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute content-stretch flex gap-[30px] items-start justify-center left-[20px] right-[20px] top-[229.58px]" data-name="Container">
      <Container100 />
      <Container101 />
      <Container102 />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] text-center">
          <p className="css-ew64yg leading-[22.4px]">© 2026 Money Scalper. Made with ❤️ for Indian retail traders.</p>
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.3px] text-center">
          <p className="css-ew64yg leading-[22.4px]">Questions? Email: support@moneyscalper.com</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[20px] pb-0 pt-[21px] px-0 right-[20px] top-[413.72px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#333] border-solid border-t inset-0 pointer-events-none" />
      <Container105 />
      <Container106 />
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[494.5px] max-w-[1200px] relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder />
      <Container104 />
      <HorizontalBorder1 />
    </div>
  );
}

function FooterSection10Footer() {
  return (
    <div className="absolute bg-[#0f1419] content-stretch flex flex-col items-start left-0 pb-[35px] pt-[60px] px-[360px] right-0 top-[6036.98px]" data-name="Footer - SECTION 10: FOOTER">
      <Container107 />
    </div>
  );
}

function BackgroundBorder26() {
  return (
    <div className="bg-[#e8f4f4] content-stretch flex h-[40px] items-center justify-center p-[2px] relative shrink-0 w-[150px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#999] border-dashed inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00a8a8] text-[20px] text-center">
        <p className="css-ew64yg leading-[32px]">Logo</p>
      </div>
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] pt-0 px-0 relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12.9px]">
        <p className="css-ew64yg leading-[22.4px]">About</p>
      </div>
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] pt-0 px-0 relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.5px]">
        <p className="css-ew64yg leading-[22.4px]">Features</p>
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] pt-0 px-0 relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.1px]">
        <p className="css-ew64yg leading-[22.4px]">Testimonials</p>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] pt-0 px-0 relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13.3px]">
        <p className="css-ew64yg leading-[22.4px]">Blog</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[25px] items-start justify-center min-h-px min-w-px relative" data-name="Nav">
      <Link16 />
      <Link17 />
      <Link18 />
      <Link19 />
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#00a8a8] content-stretch flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white">
        <p className="css-ew64yg leading-[normal]">Get Started</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <BackgroundBorder26 />
        <Nav />
        <Button18 />
      </div>
    </div>
  );
}

function HeaderHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[17px] pointer-events-auto pt-[15px] px-[380px] sticky top-0" data-name="Header - HEADER">
      <div aria-hidden="true" className="absolute border-[#ddd] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Container108 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full" data-name="Frame" style={{ backgroundImage: "linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <SectionSection1Hero />
      <SectionSection2Problems />
      <SectionSection3Solution />
      <SectionSection4Showcase />
      <SectionSection5Features />
      <SectionSection6Testimonials />
      <SectionSection7Pricing />
      <SectionSection8GetStarted />
      <SectionSection9Faq />
      <FooterSection10Footer />
      <div className="absolute h-[6626.47998046875px] inset-0 pointer-events-none">
        <HeaderHeader />
      </div>
    </div>
  );
}