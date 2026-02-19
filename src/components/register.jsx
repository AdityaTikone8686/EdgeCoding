import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Phone, Calendar, Lock, Eye, EyeOff,
  ArrowRight, ArrowLeft, Zap, AlertCircle, CheckCircle2,
  Circle, RefreshCw, MailCheck, ShieldCheck, Check, Sparkles
} from "lucide-react";

/* ── Fonts & Keyframes ────────────────────────────────────────────────── */
const Styles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      body{background:#03050d;font-family:'DM Sans',sans-serif}
      input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #080c1a inset!important;-webkit-text-fill-color:#e2e8f0!important}
      @keyframes bgShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-30px)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
      @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,-40px) scale(1.15)}}
      @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,50px) scale(0.88)}}
      @keyframes popIn{0%{transform:scale(0.4);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
      @keyframes scanline{0%{top:-5%}100%{top:110%}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes progressFill{from{width:0}to{width:var(--w)}}
      @keyframes checkPop{0%{transform:scale(0) rotate(-45deg);opacity:0}60%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1) rotate(0);opacity:1}}
    `}</style>
  </>
);

/* ── Background ───────────────────────────────────────────────────────── */
const Background = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",background:"#03050d"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 10% 10%,rgba(79,70,229,.22) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 90% 90%,rgba(139,92,246,.15) 0%,transparent 60%)"}}/>
    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>
    <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.18),transparent)",animation:"scanline 7s linear infinite"}}/>
    {[
      {w:360,h:360,top:"-8%",left:"-4%",c:"rgba(99,102,241,.08)",a:"orb1 16s ease-in-out infinite"},
      {w:240,h:240,top:"65%",left:"72%",c:"rgba(139,92,246,.07)",a:"orb2 19s ease-in-out infinite"},
    ].map((o,i)=>(
      <div key={i} style={{position:"absolute",width:o.w,height:o.h,top:o.top,left:o.left,background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,borderRadius:"50%",animation:o.a,filter:"blur(2px)"}}/>
    ))}
  </div>
);

/* ── Step Progress Bar ────────────────────────────────────────────────── */
const steps = ["Details","Security","Verify","Done"];
const StepBar = ({current})=>(
  <div style={{marginBottom:28}}>
    <div style={{display:"flex",alignItems:"center"}}>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:i<current?"linear-gradient(135deg,#6366f1,#8b5cf6)":i===current?"rgba(99,102,241,.15)":"rgba(255,255,255,.04)",border:`2px solid ${i<=current?"#6366f1":"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:i===current?"0 0 0 4px rgba(99,102,241,.18)":"none",transition:"all .4s"}}>
              {i<current?<Check size={14} color="#fff"/>:<span style={{fontSize:11,fontWeight:700,color:i===current?"#a5b4fc":"#334155",fontFamily:"'Syne',sans-serif"}}>{i+1}</span>}
            </div>
            <span style={{fontSize:9,fontWeight:600,color:i<=current?"#818cf8":"#1e293b",fontFamily:"'Syne',sans-serif",whiteSpace:"nowrap"}}>{s}</span>
          </div>
          {i<steps.length-1&&<div style={{flex:1,height:2,margin:"0 6px",marginBottom:16,background:i<current?"linear-gradient(90deg,#6366f1,#8b5cf6)":"rgba(255,255,255,.06)",borderRadius:1,transition:"background .4s"}}/>}
        </div>
      ))}
    </div>
  </div>
);

/* ── Field Components ─────────────────────────────────────────────────── */
function Field({label,type="text",placeholder,value,onChange,IconL,error,rightEl,hint}){
  const [focused,setFocused]=useState(false);
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
        <label style={{fontSize:10,fontWeight:600,color:focused?"#818cf8":"#475569",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"'Syne',sans-serif",transition:"color .2s"}}>{label}</label>
        {hint&&<span style={{fontSize:10,color:"#334155",fontFamily:"'DM Sans',sans-serif"}}>{hint}</span>}
      </div>
      <div style={{position:"relative",animation:error?"shake .35s ease":"none"}}>
        <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:focused?"#6366f1":"#334155",display:"flex",transition:"color .2s",pointerEvents:"none"}}>
          <IconL size={15}/>
        </span>
        <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
          style={{width:"100%",background:error?"rgba(239,68,68,.05)":"rgba(255,255,255,.03)",border:`1.5px solid ${error?"rgba(239,68,68,.45)":focused?"#6366f1":"rgba(99,102,241,.16)"}`,borderRadius:11,padding:`12px ${rightEl?"44px":"14px"} 12px 40px`,fontSize:13,color:"#e2e8f0",outline:"none",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",caretColor:"#6366f1",boxShadow:focused?"0 0 0 3px rgba(99,102,241,.1)":"none"}}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        />
        {rightEl&&<span style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)"}}>{rightEl}</span>}
      </div>
      {error&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}>
        <AlertCircle size={11} color="#f87171"/>
        <span style={{fontSize:11,color:"#f87171",fontFamily:"'DM Sans',sans-serif"}}>{error}</span>
      </div>}
    </div>
  );
}

function PassField({label,value,onChange,error,showMeter}){
  const [show,setShow]=useState(false);
  const [focused,setFocused]=useState(false);
  const strength=!value?0:value.length<5?1:value.length<8?2:/[A-Z]/.test(value)&&/[0-9!@#$%]/.test(value)?4:3;
  const colors=["transparent","#ef4444","#f97316","#eab308","#22c55e"];
  const labels=["","Too short","Weak","Fair","Strong ✓"];
  return(
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:10,fontWeight:600,color:focused?"#818cf8":"#475569",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,fontFamily:"'Syne',sans-serif",transition:"color .2s"}}>{label}</label>
      <div style={{position:"relative",animation:error?"shake .35s ease":"none"}}>
        <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:focused?"#6366f1":"#334155",display:"flex",pointerEvents:"none"}}><Lock size={15}/></span>
        <input type={show?"text":"password"} placeholder="Min. 8 characters" value={value} onChange={e=>onChange(e.target.value)}
          style={{width:"100%",background:error?"rgba(239,68,68,.05)":"rgba(255,255,255,.03)",border:`1.5px solid ${error?"rgba(239,68,68,.45)":focused?"#6366f1":"rgba(99,102,241,.16)"}`,borderRadius:11,padding:"12px 42px 12px 40px",fontSize:13,color:"#e2e8f0",outline:"none",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",caretColor:"#6366f1",boxShadow:focused?"0 0 0 3px rgba(99,102,241,.1)":"none"}}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        />
        <button type="button" onClick={()=>setShow(v=>!v)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#475569",cursor:"pointer",display:"flex"}}>
          {show?<EyeOff size={15}/>:<Eye size={15}/>}
        </button>
      </div>
      {error&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}><AlertCircle size={11} color="#f87171"/><span style={{fontSize:11,color:"#f87171",fontFamily:"'DM Sans',sans-serif"}}>{error}</span></div>}
      {showMeter&&value&&(
        <div style={{marginTop:8}}>
          <div style={{display:"flex",gap:3,marginBottom:4}}>
            {[1,2,3,4].map(i=><div key={i} style={{flex:1,height:2.5,borderRadius:2,background:i<=strength?colors[strength]:"rgba(255,255,255,.07)",transition:"all .3s"}}/>)}
          </div>
          <span style={{fontSize:10,color:colors[strength],fontFamily:"'DM Sans',sans-serif"}}>{labels[strength]}</span>
        </div>
      )}
    </div>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────── */
function PrimaryBtn({children,onClick,loading,disabled,style={}}){
  const [hov,setHov]=useState(false);
  return(
    <button type="button" onClick={onClick} disabled={disabled||loading}
      style={{width:"100%",padding:"14px 24px",borderRadius:13,fontWeight:700,fontSize:14,color:"#fff",border:"none",cursor:disabled||loading?"not-allowed":"pointer",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",boxShadow:hov&&!disabled?"0 0 0 1px rgba(99,102,241,.5) inset,0 14px 40px rgba(99,102,241,.45)":"0 0 0 1px rgba(99,102,241,.3) inset,0 8px 24px rgba(99,102,241,.25)",opacity:disabled?.45:1,transform:hov&&!disabled?"translateY(-1px)":"translateY(0)",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Syne',sans-serif",...style}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {loading?<div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>:children}
    </button>
  );
}

function GhostBtn({children,onClick}){
  const [hov,setHov]=useState(false);
  return(
    <button type="button" onClick={onClick}
      style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:hov?"#a5b4fc":"#64748b",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"color .2s",padding:0}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </button>
  );
}

/* ── OTP Input ────────────────────────────────────────────────────────── */
function OTPInput({digits,setDigits,error,shake}){
  const refs=useRef([]);
  const setDigit=(i,v)=>{
    if(!/^\d?$/.test(v))return;
    const n=[...digits];n[i]=v;setDigits(n);
    if(v&&i<5)refs.current[i+1]?.focus();
  };
  const onKey=(i,e)=>{if(e.key==="Backspace"&&!digits[i]&&i>0)refs.current[i-1]?.focus();};
  const onPaste=(e)=>{
    const t=e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    if(t.length===6){setDigits(t.split(""));refs.current[5]?.focus();}
    e.preventDefault();
  };
  return(
    <div style={{display:"flex",gap:9,justifyContent:"center",animation:shake?"shake .4s ease":"none"}} onPaste={onPaste}>
      {digits.map((d,i)=>(
        <input key={i} ref={el=>refs.current[i]=el}
          type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e=>setDigit(i,e.target.value)} onKeyDown={e=>onKey(i,e)}
          style={{width:52,height:60,textAlign:"center",fontSize:24,fontWeight:700,borderRadius:13,border:`2px solid ${error?"rgba(239,68,68,.5)":d?"#6366f1":"rgba(255,255,255,.1)"}`,background:d?"rgba(99,102,241,.15)":"rgba(255,255,255,.02)",color:"#fff",outline:"none",fontFamily:"'Syne',sans-serif",transition:"all .2s",boxShadow:d?"0 0 0 3px rgba(99,102,241,.18)":"none",caretColor:"#6366f1"}}
          onFocus={e=>{e.target.style.borderColor="#6366f1";e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,.2)";}}
          onBlur={e=>{e.target.style.boxShadow=d?"0 0 0 3px rgba(99,102,241,.18)":"none";e.target.style.borderColor=d?"#6366f1":"rgba(255,255,255,.1)";}}
        />
      ))}
    </div>
  );
}

/* ── Password Requirements ────────────────────────────────────────────── */
const pwReqs=[
  {t:"At least 8 characters",  fn:p=>p.length>=8},
  {t:"One uppercase letter",   fn:p=>/[A-Z]/.test(p)},
  {t:"One number",             fn:p=>/[0-9]/.test(p)},
  {t:"One special character",  fn:p=>/[!@#$%^&*]/.test(p)},
];

/* ══════════════════════════════════════════════════════════════════════ */
/* REGISTER PAGE                                                           */
/* ══════════════════════════════════════════════════════════════════════ */
export default function RegisterPage(){
  /* state */
  const [step,setStep]=useState(0);
  const [form,setForm]=useState({name:"",email:"",phone:"",dob:"",pass:"",confirm:""});
  const [errs,setErrs]=useState({});
  const [digits,setDigits]=useState(["","","","","",""]);
  const [otpError,setOtpError]=useState("");
  const [otpShake,setOtpShake]=useState(false);
  const [countdown,setCount]=useState(60);
  const [loading,setLoad]=useState(false);
  const [page,setPage]=useState("register"); // for back-to-login nav

  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));

  /* countdown */
  useEffect(()=>{
    if(step!==2||countdown<=0)return;
    const t=setTimeout(()=>setCount(c=>c-1),1000);
    return()=>clearTimeout(t);
  },[step,countdown]);

  /* === VALIDATION === */
  const validateStep0=()=>{
    const e={};
    if(!form.name.trim())e.name="Full name is required";
    if(!form.email.includes("@"))e.email="Enter a valid email address";
    const ph=form.phone.replace(/\D/g,"");
    if(ph.length<10)e.phone="Enter a valid 10-digit phone number";
    if(!form.dob)e.dob="Date of birth is required";
    else{
      const age=(new Date()-new Date(form.dob))/3.154e10;
      if(age<13)e.dob="You must be at least 13 years old";
    }
    setErrs(e);
    return!Object.keys(e).length;
  };

  const validateStep1=()=>{
    const e={};
    if(!pwReqs.every(r=>r.fn(form.pass)))e.pass="Password doesn't meet all requirements";
    if(form.pass!==form.confirm)e.confirm="Passwords do not match";
    setErrs(e);
    return!Object.keys(e).length;
  };

  /* === NAVIGATION === */
  const nextStep=()=>{
    if(step===0){
      if(!validateStep0())return;
      setStep(1);
    } else if(step===1){
      if(!validateStep1())return;
      // Simulate sending OTP email
      setLoad(true);
      setTimeout(()=>{
        setLoad(false);
        setStep(2);
        setCount(60);
        setDigits(["","","","","",""]);
      },1800);
    }
  };

  const verifyOTP=()=>{
    const code=digits.join("");
    if(code.length<6){setOtpError("Please enter the complete 6-digit code");return;}
    setLoad(true);
    setTimeout(()=>{
      setLoad(false);
      if(code==="123456"){
        // Simulate sending welcome email + complete registration
        setStep(3);
      } else {
        setOtpError("Invalid code. For demo, use: 123456");
        setOtpShake(true);
        setDigits(["","","","","",""]);
        setTimeout(()=>setOtpShake(false),450);
      }
    },1400);
  };

  const resendOTP=()=>{
    setCount(60);
    setDigits(["","","","","",""]);
    setOtpError("");
  };

  if(page==="login") return <LoginStub onBack={()=>setPage("register")}/>;

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"28px 16px",position:"relative"}}>
      <Styles/>
      <Background/>

      <div style={{width:"100%",maxWidth:step===3?420:460,position:"relative",zIndex:1,animation:"slideUp .45s cubic-bezier(.22,.68,0,1.15) both"}}>
        <div style={{background:"rgba(8,12,26,.92)",border:"1px solid rgba(99,102,241,.2)",borderRadius:24,overflow:"hidden",boxShadow:"0 0 0 1px rgba(255,255,255,.03) inset,0 40px 100px rgba(0,0,0,.7),0 0 80px rgba(99,102,241,.08)",backdropFilter:"blur(32px)"}}>
          {/* accent bar */}
          <div style={{height:3,background:"linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)",backgroundSize:"200% 100%",animation:"bgShift 3s linear infinite"}}/>

          <div style={{padding:"30px 32px 36px"}}>

            {/* ── Logo + back ── */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:step<3?20:28}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px rgba(99,102,241,.45)"}}>
                  <Zap size={16} color="#fff"/>
                </div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:"#fff"}}>Code<span style={{color:"#8b5cf6"}}>Quest</span></span>
              </div>
              {step<3&&(
                <GhostBtn onClick={()=>setPage("login")}>
                  <ArrowLeft size={13}/>Back to Login
                </GhostBtn>
              )}
            </div>

            {/* ── Step Bar ── */}
            {step<3&&<StepBar current={step}/>}

            {/* ═══════════════════════════════════════════════ */}
            {/* STEP 0 – Personal Details                       */}
            {/* ═══════════════════════════════════════════════ */}
            {step===0&&(
              <div style={{animation:"slideIn .3s ease both"}}>
                <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:"#fff",marginBottom:5}}>Create Account</h1>
                <p style={{fontSize:13,color:"#64748b",marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>
                  Fill in your personal details to get started.
                </p>

                <Field label="Full Name" placeholder="Alex Johnson" value={form.name} onChange={v=>upd("name",v)} IconL={User} error={errs.name}/>

                <Field label="Email Address" type="email" placeholder="alex@gmail.com" value={form.email} onChange={v=>upd("email",v)} IconL={Mail} error={errs.email}
                  hint="OTP will be sent here"/>

                <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={v=>upd("phone",v)} IconL={Phone} error={errs.phone}/>

                <Field label="Date of Birth" type="date" placeholder="" value={form.dob} onChange={v=>upd("dob",v)} IconL={Calendar} error={errs.dob}
                  hint="Must be 13+"/>

                <div style={{marginTop:20}}>
                  <PrimaryBtn onClick={nextStep}>
                    Continue<ArrowRight size={15}/>
                  </PrimaryBtn>
                </div>

                <p style={{textAlign:"center",fontSize:12,color:"#1e293b",marginTop:16,fontFamily:"'DM Sans',sans-serif"}}>
                  Already have an account?{" "}
                  <button type="button" onClick={()=>setPage("login")} style={{background:"none",border:"none",color:"#6366f1",cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Sign in</button>
                </p>
              </div>
            )}

            {/* ═══════════════════════════════════════════════ */}
            {/* STEP 1 – Security                               */}
            {/* ═══════════════════════════════════════════════ */}
            {step===1&&(
              <div style={{animation:"slideIn .3s ease both"}}>
                <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:"#fff",marginBottom:5}}>Set Your Password</h1>
                <p style={{fontSize:13,color:"#64748b",marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>
                  Choose a strong password to secure your account.
                </p>

                <PassField label="Password" value={form.pass} onChange={v=>upd("pass",v)} error={errs.pass} showMeter/>
                <PassField label="Confirm Password" value={form.confirm} onChange={v=>upd("confirm",v)} error={errs.confirm}/>

                {/* Requirements checklist */}
                {form.pass&&(
                  <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"12px 14px",marginBottom:18}}>
                    <p style={{fontSize:10,fontWeight:600,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontFamily:"'Syne',sans-serif"}}>Password Requirements</p>
                    {pwReqs.map(({t,fn})=>{
                      const ok=fn(form.pass);
                      return(
                        <div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                          {ok?<CheckCircle2 size={13} color="#22c55e"/>:<Circle size={13} color="#1e293b"/>}
                          <span style={{fontSize:12,color:ok?"#86efac":"#475569",fontFamily:"'DM Sans',sans-serif",transition:"color .25s"}}>{t}</span>
                        </div>
                      );
                    })}
                    {form.confirm&&(
                      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5,paddingTop:8,borderTop:"1px solid rgba(255,255,255,.04)"}}>
                        {form.pass===form.confirm?<CheckCircle2 size={13} color="#22c55e"/>:<Circle size={13} color="#1e293b"/>}
                        <span style={{fontSize:12,color:form.pass===form.confirm?"#86efac":"#475569",fontFamily:"'DM Sans',sans-serif"}}>Passwords match</span>
                      </div>
                    )}
                  </div>
                )}

                <div style={{display:"flex",gap:10}}>
                  <button type="button" onClick={()=>{setStep(0);setErrs({});}}
                    style={{display:"flex",alignItems:"center",gap:6,padding:"14px 18px",borderRadius:13,border:"1.5px solid rgba(255,255,255,.08)",background:"none",color:"#64748b",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(99,102,241,.35)";e.currentTarget.style.color="#a5b4fc";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.color="#64748b";}}>
                    <ArrowLeft size={14}/>Back
                  </button>
                  <PrimaryBtn onClick={nextStep} loading={loading} style={{flex:1}}>
                    <MailCheck size={15}/>Send Verification Code
                  </PrimaryBtn>
                </div>

                {/* What happens next */}
                <div style={{marginTop:16,padding:"11px 14px",borderRadius:10,background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.14)",display:"flex",alignItems:"flex-start",gap:10}}>
                  <Mail size={13} color="#818cf8" style={{flexShrink:0,marginTop:1}}/>
                  <span style={{fontSize:12,color:"#475569",fontFamily:"'DM Sans',sans-serif",lineHeight:1.55}}>
                    A 6-digit OTP will be sent to <strong style={{color:"#818cf8"}}>{form.email||"your email"}</strong> to verify your account.
                  </span>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════ */}
            {/* STEP 2 – OTP Verification                       */}
            {/* ═══════════════════════════════════════════════ */}
            {step===2&&(
              <div style={{animation:"slideIn .3s ease both"}}>
                <div style={{textAlign:"center",marginBottom:24}}>
                  <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(99,102,241,.12)",border:"1.5px solid rgba(99,102,241,.28)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",animation:"popIn .5s cubic-bezier(.22,.68,0,1.4) both"}}>
                    <MailCheck size={28} color="#818cf8"/>
                  </div>
                  <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff",marginBottom:6}}>Verify Your Email</h1>
                  <p style={{fontSize:13,color:"#64748b",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>
                    We sent a 6-digit code to<br/>
                    <span style={{color:"#818cf8",fontFamily:"'Syne',sans-serif",fontWeight:600}}>{form.email}</span>
                  </p>
                </div>

                {/* OTP boxes */}
                <div style={{marginBottom:16}}>
                  <OTPInput digits={digits} setDigits={d=>{setDigits(d);setOtpError("");}} error={!!otpError} shake={otpShake}/>
                </div>

                {otpError&&(
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:14}}>
                    <AlertCircle size={13} color="#f87171"/>
                    <span style={{fontSize:12,color:"#f87171",fontFamily:"'DM Sans',sans-serif"}}>{otpError}</span>
                  </div>
                )}

                <PrimaryBtn onClick={verifyOTP} loading={loading} disabled={digits.join("").length<6}>
                  <ShieldCheck size={15}/>Verify &amp; Create Account
                </PrimaryBtn>

                {/* Resend */}
                <div style={{textAlign:"center",marginTop:16}}>
                  {countdown>0?(
                    <span style={{fontSize:13,color:"#334155",fontFamily:"'DM Sans',sans-serif"}}>
                      Resend code in <span style={{color:"#818cf8",fontWeight:600}}>{countdown}s</span>
                    </span>
                  ):(
                    <button type="button" onClick={resendOTP}
                      style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#6366f1",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>
                      <RefreshCw size={13}/>Resend verification email
                    </button>
                  )}
                </div>

                {/* Demo hint */}
                <div style={{marginTop:18,padding:"10px 14px",borderRadius:10,background:"rgba(234,179,8,.04)",border:"1px solid rgba(234,179,8,.12)",display:"flex",alignItems:"center",gap:8}}>
                  <AlertCircle size={13} color="#fbbf24"/>
                  <span style={{fontSize:12,color:"#475569",fontFamily:"'DM Sans',sans-serif"}}>
                    Demo mode — use code <strong style={{color:"#fbbf24",fontFamily:"'Syne',sans-serif"}}>123456</strong>
                  </span>
                </div>

                <div style={{textAlign:"center",marginTop:14}}>
                  <button type="button" onClick={()=>{setStep(1);setErrs({});}}
                    style={{display:"inline-flex",alignItems:"center",gap:5,background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>
                    <ArrowLeft size={12}/>Wrong email? Go back
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════ */}
            {/* STEP 3 – Success + Welcome Email Sent           */}
            {/* ═══════════════════════════════════════════════ */}
            {step===3&&(
              <div style={{animation:"slideIn .35s ease both",textAlign:"center"}}>
                {/* Success icon */}
                <div style={{position:"relative",display:"inline-block",marginBottom:20}}>
                  <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:"0 0 40px rgba(34,197,94,.35)",animation:"popIn .55s cubic-bezier(.22,.68,0,1.4) both"}}>
                    <CheckCircle2 size={36} color="#fff"/>
                  </div>
                  <div style={{position:"absolute",bottom:-4,right:-4,width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #03050d"}}>
                    <Sparkles size={13} color="#fff"/>
                  </div>
                </div>

                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:"#fff",marginBottom:8}}>You're all set!</h2>
                <p style={{fontSize:14,color:"#64748b",fontFamily:"'DM Sans',sans-serif",lineHeight:1.65,marginBottom:24}}>
                  Welcome to CodeQuest, <strong style={{color:"#e2e8f0"}}>{form.name.split(" ")[0]}</strong>! Your account has been created successfully.
                </p>

                {/* Welcome email notice */}
                <div style={{background:"rgba(99,102,241,.08)",border:"1.5px solid rgba(99,102,241,.2)",borderRadius:14,padding:"16px 18px",marginBottom:20,textAlign:"left"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(99,102,241,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Mail size={17} color="#818cf8"/>
                    </div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:"#e2e8f0",fontFamily:"'Syne',sans-serif"}}>Welcome Email Sent!</p>
                      <p style={{fontSize:11,color:"#475569",fontFamily:"'DM Sans',sans-serif"}}>Check your inbox at <span style={{color:"#818cf8"}}>{form.email}</span></p>
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#475569",fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:10}}>
                    Your welcome email includes your account details, a getting-started guide, and quick links to begin your first quest.
                  </div>
                </div>

                {/* Account summary */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:22}}>
                  {[
                    {label:"Name",val:form.name},
                    {label:"Email",val:form.email},
                    {label:"Phone",val:form.phone||"—"},
                    {label:"Member Since",val:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"})},
                  ].map(({label,val})=>(
                    <div key={label} style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:10,textAlign:"left"}}>
                      <p style={{fontSize:9,fontWeight:600,color:"#334155",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"'Syne',sans-serif",marginBottom:3}}>{label}</p>
                      <p style={{fontSize:12,color:"#cbd5e1",fontFamily:"'DM Sans',sans-serif",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{val}</p>
                    </div>
                  ))}
                </div>

                <PrimaryBtn onClick={()=>setPage("login")}>
                  <Zap size={15}/>Go to Login<ArrowRight size={15}/>
                </PrimaryBtn>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function LoginStub({onBack}){
  return(
    <div style={{minHeight:"100vh",background:"#03050d",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Styles/><Background/>
      <div style={{position:"relative",zIndex:1,background:"rgba(8,12,26,.9)",border:"1px solid rgba(99,102,241,.2)",borderRadius:20,padding:"32px 36px",textAlign:"center",maxWidth:360}}>
        <p style={{fontFamily:"'Syne',sans-serif",color:"#fff",fontSize:18,fontWeight:700,marginBottom:8}}>Login Page</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:"#64748b",fontSize:13,marginBottom:20}}>In your app, this routes to <code style={{color:"#818cf8"}}>/login</code></p>
        <button type="button" onClick={onBack} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13}}>← Back to Register</button>
      </div>
    </div>
  );
}
