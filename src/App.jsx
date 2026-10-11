import React, { useEffect, useRef, useState } from 'react';

/* Lucide-style 24x24 outline icons: one consistent family, no emoji or icon fonts. */
const paths = {
  'arrow-up-right': <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  'arrow-right': <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  'arrow-down': <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
  'plus': <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  'minus': <path d="M5 12h14"/>,
  'menu': <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  'x': <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
  'check': <path d="m5 12 4 4L19 6"/>,
  'external-link': <><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></>
};
function Icon({ name, size = 22, className = '' }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="miter">{paths[name]}</svg>;
}

const services = [
  {
    id: '01', name: 'Search & visibility', short: 'Get found by people already looking.',
    body: 'Search should bring the right people to your business, not just inflate a chart. We focus on the searches that connect real needs to what you offer.',
    details: ['SEO + technical site reviews', 'Search intent and content strategy', 'Local search visibility', 'Clear monthly reporting']
  },
  {
    id: '02', name: 'Landing pages & conversion', short: 'Make every visit work harder.',
    body: 'A faster, clearer page can be more valuable than another thousand uninterested visitors. We improve the path from first impression to real inquiry.',
    details: ['High-converting landing pages', 'Website messaging + UX', 'Conversion audits', 'Form and funnel optimization']
  },
  {
    id: '03', name: 'Creative & campaigns', short: 'Give people a reason to stop scrolling.',
    body: 'A strong message deserves to be seen. We plan and create campaigns that bring attention to what makes your business different.',
    details: ['Campaign concepts + creative', 'Paid campaign setup and iteration', 'Social content strategy', 'Performance review']
  }
];
const plans = [
  {id:'01', title:'The audit', label:'FIND THE LEAKS', desc:'A fresh set of eyes on your website, traffic, and customer journey.', bullets:['Site and search review','Top opportunities, prioritized','Actionable next steps']},
  {id:'02', title:'The sprint', label:'FIX WHAT MATTERS', desc:'A focused project to improve one part of your growth system.', bullets:['One specific growth objective','Design and implementation','Before-and-after measurement']},
  {id:'03', title:'The partnership', label:'KEEP THE MOMENTUM', desc:'An ongoing approach to testing, learning, and improving.', bullets:['Recurring strategy and execution','Monthly performance review','Continuous iteration']}
];
const fmt = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);

function Eyebrow({children, inverted=false}) { return <div className={'eyebrow' + (inverted ? ' eyebrow-inverted' : '')}><span className="eyebrow-mark" aria-hidden="true" />{children}</div>; }
function Reveal({children, className='', delay=0}) {const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return; if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.classList.add('is-visible');return;}const obs=new IntersectionObserver((entries)=>{if(entries[0].isIntersecting){el.classList.add('is-visible');obs.disconnect();}},{threshold:.1,rootMargin:'0px 0px -20px 0px'});obs.observe(el);return()=>obs.disconnect();},[]);return <div ref={ref} className={'reveal '+className} style={{'--delay':`${delay}ms`}}>{children}</div>;}

function Nav() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{if(!open)return;const onKey=(e)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[open]);
  const close=()=>setOpen(false);
  return <header className="header" id="top">
    <div className="nav shell">
      <a href="#top" className="wordmark" onClick={close} aria-label="NONZERO home"><span className="wordmark-symbol" aria-hidden="true"><i></i><i></i><i></i><i></i></span>nonzero<span className="wordmark-dot">.</span></a>
      <nav className={'nav-links '+(open?'nav-open':'')} aria-label="Main navigation">
        <a onClick={close} href="#services">Services</a><a onClick={close} href="#approach">Approach</a><a onClick={close} href="#engage">Ways to work</a><a onClick={close} href="#contact" className="mobile-contact">Start a project <Icon name="arrow-up-right" size={16}/></a>
      </nav>
      <a href="#contact" className="nav-cta"><span>LET'S WORK</span><Icon name="arrow-up-right" size={17}/></a>
      <button type="button" className="nav-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?'x':'menu'} size={24}/></button>
    </div>
  </header>;
}
function Progress(){const [p,setP]=useState(0);useEffect(()=>{let ticking=false;const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setP(max>0?window.scrollY/max:0);ticking=false;};const scroll=()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}};update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);};},[]);return <div className="scroll-progress" style={{transform:`scaleX(${p})`}} aria-hidden="true"/>;}
function Diagram(){return <div className="signal-diagram" aria-label="A conceptual illustration of a growth system, not performance data" role="img">
  <div className="diagram-top"><span>FIG. 01 / THE SIGNAL SYSTEM</span><span className="diagram-star">✳</span></div>
  <div className="diagram-canvas"><div className="diagram-grid"/>
    <svg viewBox="0 0 410 270" className="diagram-lines" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="diagram-backline" d="M4 238 C84 223 88 176 158 191 S245 136 282 126 S344 81 408 23"/>
      <path className="diagram-line" d="M4 238 C84 223 88 176 158 191 S245 136 282 126 S344 81 408 23"/>
      <circle cx="158" cy="191" r="5" fill="#d8fa58"/><circle cx="282" cy="126" r="5" fill="#d8fa58"/><circle cx="408" cy="23" r="6" fill="#d8fa58"/>
      <path d="M158 191v-70h-45M282 126v72h-43" stroke="#8c9188" strokeWidth="1" strokeDasharray="3 5" fill="none"/>
    </svg>
    <span className="diagram-tag tag-one">GET FOUND</span><span className="diagram-tag tag-two">GET CHOSEN</span>
    <span className="diagram-axis">ATTENTION</span><span className="diagram-axis axis-end">ACTION</span>
  </div>
  <div className="diagram-bottom"><span>LESS NOISE.</span><span>MORE SIGNAL <Icon name="arrow-up-right" size={15}/></span></div>
</div>;}
function Hero(){return <section className="hero" aria-labelledby="hero-title"><div className="shell">
  <div className="hero-topline"><Eyebrow inverted>INDEPENDENT DIGITAL GROWTH STUDIO</Eyebrow><span className="hero-serial">INTERNET, BUT BETTER. / 2026</span></div>
  <div className="hero-layout"><div className="hero-content">
    <h1 id="hero-title" className="hero-title"><span className="hero-title-line">BE SEEN<span className="period">.</span></span><span className="hero-title-line hero-title-lime">BE CHOSEN<span className="period dark-period">.</span></span></h1>
    <div className="hero-bottom"><p className="hero-subcopy">Attention is a start. Customers are the point. We help ambitious businesses get discovered, stand out, and turn visits into real opportunities.</p><a className="button button-lime" href="#contact">LET'S GROW SOMETHING <Icon name="arrow-up-right" size={20}/></a></div>
  </div><div className="hero-aside"><div className="hero-aside-number">N<span>°</span> 001 — 003</div><Diagram/><div className="hero-aside-note"><span className="tiny-cross">+</span><span>BUILT ON STRATEGY.<br/>BACKED BY BETTER EXECUTION.</span></div></div></div>
  <div className="hero-footer"><a href="#services" className="scroll-hint">SCROLL TO EXPLORE <Icon name="arrow-down" size={16}/></a><span>SEARCH / CREATIVE / CONVERSION</span></div>
</div></section>}
function Marquee(){const words=['LESS SCROLLING.','MORE SHOWING UP.','LESS GUESSING.','MORE GROWING.'];return <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...words,...words].map((w,i)=><span key={i}>{w}<span className="marquee-x">×</span></span>)}</div></div>}
function Intro(){return <section className="intro light-section" id="intro"><div className="shell intro-layout"><div><Eyebrow>THE IDEA</Eyebrow><Reveal><h2 className="intro-head">Not more traffic.<br/><em>Better business.</em></h2></Reveal></div><Reveal className="intro-right" delay={100}><div className="intro-line"/><p>Anyone can chase clicks. We're interested in what happens after the click.</p><p>NONZERO is an independent growth studio built around a simple belief: attention only matters when it moves your business forward.</p><span className="note-index">01 / THE WAY WE SEE IT</span></Reveal></div></section>}
function Services(){const [active,setActive]=useState(0);return <section className="services light-section" id="services"><div className="shell"><div className="section-heading"><div><Eyebrow>WHAT WE DO</Eyebrow><Reveal><h2>Three ways<br/>to move <span className="italic-accent">forward.</span></h2></Reveal></div><p>We connect the dots between being found, being remembered, and being chosen.</p></div><div className="service-list">{services.map((s,i)=><div className={'service-item '+(active===i?'service-active':'')} key={s.id}>
  <button type="button" className="service-trigger" aria-expanded={active===i} aria-controls={`service-panel-${i}`} onClick={()=>setActive(active===i?-1:i)}><span className="service-num">/{s.id}</span><span className="service-name">{s.name}</span><span className="service-short">{s.short}</span><span className="service-icon"><Icon name={active===i?'minus':'plus'} size={23}/></span></button>
  <div className="service-panel" id={`service-panel-${i}`} aria-hidden={active!==i}><div className="service-panel-inner"><div className="service-panel-offset"/><div className="service-details"><p>{s.body}</p><div className="service-chip-grid">{s.details.map(d=><span key={d}>{d}</span>)}</div></div><a href="#contact" className="service-action">TALK ABOUT THIS <Icon name="arrow-up-right" size={18}/></a></div></div>
</div>)}</div></div></section>}
function Approach(){return <section className="approach dark-section" id="approach"><div className="shell"><div className="approach-top"><Eyebrow inverted>OUR APPROACH</Eyebrow><div className="approach-counter">A WORKING SYSTEM / NOT A MAGIC TRICK</div></div><div className="approach-grid"><Reveal><h2>GROWTH<br/>ISN'T<br/><span className="outline-word">LUCK.</span></h2></Reveal><div className="approach-right"><Reveal><p className="approach-lede">It happens when the right people see the right message at the right moment.</p></Reveal><div className="method-list">
  {[{n:'01',title:'Find the opportunity',d:'We look at your audience, competitors, search demand, and the moments people actually make decisions.'},{n:'02',title:'Build the experience',d:'We create pages, content, and campaigns that make your offer easier to discover and easier to choose.'},{n:'03',title:'Learn and improve',d:'We measure what matters, improve what works, and stop wasting time on what doesn’t.'}].map(step=><Reveal key={step.n}><div className="method-item"><span className="method-number">{step.n}</span><div><h3>{step.title}</h3><p>{step.d}</p></div><Icon name="arrow-up-right" size={19}/></div></Reveal>)}
</div></div></div></div></section>}
function Calculator(){const [visitors,setVisitors]=useState(5000);const [rate,setRate]=useState(2);const [lift,setLift]=useState(0.5);const current=visitors*rate/100;const potential=visitors*(rate+lift)/100;return <section className="calculator light-section" id="calculator"><div className="shell"><div className="calculator-head"><Eyebrow>THE MATH OF MOMENTUM</Eyebrow><p>REAL GROWTH STARTS WITH BETTER QUESTIONS.</p></div><div className="calculator-grid"><div className="calculator-copy"><Reveal><h2>Small shifts.<br/><span>Real impact.</span></h2></Reveal><p>More visitors aren't always the answer. See how improving what happens after the click can change the picture.</p><span className="smallprint">Illustrative scenario only. Not a forecast, benchmark, or promise of results.</span></div><div className="calc-panel"><div className="calc-panel-top"><span>INTERACTIVE / 001</span><span>MAKE THE NUMBERS YOURS</span></div><div className="calc-controls"><label htmlFor="visitors">MONTHLY VISITS <strong>{fmt(visitors)}</strong></label><input id="visitors" type="range" min="1000" max="30000" step="500" value={visitors} onChange={e=>setVisitors(Number(e.target.value))} style={{'--pct':`${(visitors-1000)/29000*100}%`}}/><div className="range-ends"><span>1,000</span><span>30,000</span></div>
<label htmlFor="rate">CURRENT CONVERSION RATE <strong>{rate.toFixed(1)}%</strong></label><input id="rate" type="range" min="0.5" max="8" step="0.5" value={rate} onChange={e=>setRate(Number(e.target.value))} style={{'--pct':`${(rate-.5)/7.5*100}%`}}/><div className="range-ends"><span>0.5%</span><span>8.0%</span></div>
<label htmlFor="lift">POSSIBLE RATE IMPROVEMENT <strong>+{lift.toFixed(1)} pp</strong></label><input id="lift" type="range" min="0.1" max="2" step="0.1" value={lift} onChange={e=>setLift(Number(e.target.value))} style={{'--pct':`${(lift-.1)/1.9*100}%`}}/><div className="range-ends"><span>+0.1 pp</span><span>+2.0 pp</span></div></div>
<div className="calc-result"><div><span>ADDITIONAL LEADS / MONTH</span><div className="calc-big">+{fmt(potential-current)}<span>*</span></div></div><div className="calc-result-right"><span>BEFORE / {fmt(current)}</span><span>AFTER / {fmt(potential)}</span><span className="calc-mini">*IF THE ASSUMED LIFT IS ACHIEVED</span></div></div></div></div></div></section>}
function Engage(){return <section className="engage light-section" id="engage"><div className="shell"><div className="section-heading engage-heading"><div><Eyebrow>WORK WITH US</Eyebrow><Reveal><h2>Start where<br/>you <span className="italic-accent">are.</span></h2></Reveal></div><p>Different businesses need different things. Here's how we can get started.</p></div><div className="engage-grid">{plans.map((plan,i)=><Reveal key={plan.id} delay={i*100} className="engage-reveal"><article className="engage-card"><div className="engage-card-top"><span>{plan.id} / {plan.label}</span><Icon name="arrow-up-right" size={21}/></div><h3>{plan.title}</h3><p>{plan.desc}</p><div className="engage-card-bottom">{plan.bullets.map(b=><div key={b}><Icon name="check" size={15}/><span>{b}</span></div>)}<a href="#contact">DISCUSS THIS OPTION <Icon name="arrow-right" size={18}/></a></div></article></Reveal>)}</div></div></section>}
function Contact(){const [status,setStatus]=useState('idle');const [error,setError]=useState('');async function handleSubmit(event){event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;if(status==='sending')return;setError('');if(['localhost','127.0.0.1','0.0.0.0'].includes(window.location.hostname)||['file:','about:'].includes(window.location.protocol)){setStatus('preview');return;}setStatus('sending');try{const body=new URLSearchParams(new FormData(form));const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});if(!response.ok)throw new Error('Server response '+response.status);setStatus('success');form.reset();}catch(e){setError('Message not sent. Please try again in a moment.');setStatus('error');}}
return <section className="contact dark-section" id="contact"><div className="shell"><div className="contact-header"><Eyebrow inverted>LET'S MAKE SOMETHING HAPPEN</Eyebrow><span>PROJECT INQUIRIES / OPEN</span></div><div className="contact-grid"><div className="contact-copy"><Reveal><h2>ENOUGH<br/>TALK.<br/><span>LET'S</span> GROW.</h2></Reveal><p>Tell us a little about your business and what you're trying to change. We'll start with a conversation, not a sales pitch.</p><div className="contact-crosshair" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div></div><div className="contact-form-wrap"><div className="contact-form-heading"><span>NEW INQUIRY</span><span>01 / 01</span></div>{status==='success'?<div className="form-done" role="status"><span className="done-square"><Icon name="check" size={30}/></span><h3>Message received.</h3><p>Thanks for reaching out. Your inquiry has been submitted.</p><button type="button" className="text-action" onClick={()=>setStatus('idle')}>SEND ANOTHER MESSAGE <Icon name="arrow-right" size={17}/></button></div>:<form className="contact-form" name="project-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
<input type="hidden" name="form-name" value="project-inquiry"/><p className="visually-hidden"><label>Don't fill this out <input name="bot-field" tabIndex="-1" autoComplete="off"/></label></p>
<div className="field-row"><label>YOUR NAME <input required name="name" type="text" maxLength="100" autoComplete="name" placeholder="What's your name?" /></label><label>EMAIL ADDRESS <input required name="email" type="email" maxLength="200" autoComplete="email" placeholder="you@company.com" /></label></div>
<label>WEBSITE <span className="optional">(OPTIONAL)</span><input name="website" type="url" maxLength="300" placeholder="https://yourbusiness.com" /></label>
<label>WHAT DO YOU NEED HELP WITH? <select name="service" defaultValue="" required><option value="" disabled>Select an area</option><option>Search & visibility</option><option>Landing pages & conversion</option><option>Creative & campaigns</option><option>Not sure yet</option></select></label>
<label>TELL US A BIT MORE <textarea name="message" rows="3" required maxLength="3000" placeholder="What's your business, and what would you like to improve?" /></label>
<div className="submit-row"><p>No commitments. Just a conversation.</p><button className="button button-lime" type="submit" disabled={status==='sending'}>{status==='sending'?'SENDING…':'SEND INQUIRY'} <Icon name="arrow-up-right" size={19}/></button></div>
{status==='preview'&&<p className="form-notice" role="status">This is a local preview. Nothing was sent. Deploy to Netlify and enable Forms to receive inquiries.</p>}{status==='error'&&<p className="form-error" role="alert">{error}</p>}
</form>}</div></div></div></section>}
function Footer(){return <footer className="footer"><div className="shell"><div className="footer-top"><a href="#top" className="footer-wordmark">nonzero<span>.</span></a><a href="#top" className="back-top">BACK TO TOP <Icon name="arrow-up-right" size={18}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NONZERO. INDEPENDENT GROWTH STUDIO.</span><span>NOT JUST MORE. <b>BETTER.</b></span></div></div></footer>}
export default function App(){return <><Progress/><Nav/><main><Hero/><Marquee/><Intro/><Services/><Approach/><Calculator/><Engage/><Contact/></main><Footer/></>}