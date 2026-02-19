import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, Zap, ArrowRight,
  Github, Chrome, ShieldCheck, AlertCircle
} from "lucide-react";

/* ── Fonts & Global Keyframes ─────────────────────────────────────────── */
const Styles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      body{background:#03050d;font-family:'DM Sans',sans-serif}
      input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #080c1a inset!important;-webkit-text-fill-color:#e2e8f0!important}
      @keyframes bgShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
      @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,-40px) scale(1.15)}}
      @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,50px) scale(0.88)}}
      @keyframes lineGlow{0%,100%{opacity:0.4;background-position:0% 50%}50%{opacity:1;background-position:100% 50%}}
      @keyframes scanline{0%{top:-10%}100%{top:110%}}
      @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)}70%{box-shadow:0 0 0 12px rgba(99,102,241,0)}}
    `}</style>
  </>
);

/* ── Animated Background ──────────────────────────────────────────────── */
const Background = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",background:"#03050d"}}>
    {/* deep radial glow */}
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 10% 10%,rgba(79,70,229,.25) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 90% 90%,rgba(139,92,246,.18) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(6,182,212,.06) 0%,transparent 60%)"}} />
    {/* grid */}
    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)",backgroundSize:"48px 48px"}} />
    {/* scanline sweep */}
    <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.2),transparent)",animation:"scanline 6s linear infinite",zIndex:1}} />
    {/* orbs */}
    {[
      {w:380,h:380,top:"-5%",left:"-5%",c:"rgba(99,102,241,.08)",a:"orb1 16s ease-in-out infinite"},
      {w:260,h:260,top:"60%",left:"70%",c:"rgba(139,92,246,.07)",a:"orb2 18s ease-in-out infinite"},
      {w:160,h:160,top:"40%",left:"20%",c:"rgba(6,182,212,.05)",a:"orb1 22s ease-in-out infinite reverse"},
    ].map((o,i)=>(
      <div key={i} style={{position:"absolute",width:o.w,height:o.h,top:o.top,left:o.left,background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,borderRadius:"50%",animation:o.a,filter:"blur(2px)"}} />
    ))}
  </div>
);

/* ── Reusable Field ───────────────────────────────────────────────────── */
function Field({label,type="text",placeholder,value,onChange,IconL,error,right}){
  const [focused,setFocused]=useState(false);
  return(
    <div style={{marginBottom:16}}>
      <label style={{display:"block",fontSize:11,fontWeight:500,color:focused?"#818cf8":"#475569",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:7,fontFamily:"'Syne',sans-serif",transition:"color .2s"}}>{label}</label>
      <div style={{position:"relative",animation:error?"shake .35s ease":"none"}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:focused?"#6366f1":"#334155",display:"flex",transition:"color .2s",pointerEvents:"none"}}>
          <IconL size={15}/>
        </span>
        <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
          style={{width:"100%",background:error?"rgba(239,68,68,.05)":"rgba(255,255,255,.03)",border:`1.5px solid ${error?"rgba(239,68,68,.45)":focused?"#6366f1":"rgba(99,102,241,.18)"}`,borderRadius:12,padding:`13px ${right?"44px":"16px"} 13px 42px`,fontSize:14,color:"#e2e8f0",outline:"none",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",caretColor:"#6366f1",boxShadow:focused?"0 0 0 3px rgba(99,102,241,.12)":"none"}}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        />
        {right&&<span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)"}}>{right}</span>}
      </div>
      {error&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}><AlertCircle size={11} color="#f87171"/><span style={{fontSize:11,color:"#f87171",fontFamily:"'DM Sans',sans-serif"}}>{error}</span></div>}
    </div>
  );
}

/* ── Password Field ───────────────────────────────────────────────────── */
function PassField({label="Password",value,onChange,error}){
  const [show,setShow]=useState(false);
  const [focused,setFocused]=useState(false);
  return(
    <div style={{marginBottom:16}}>
      <label style={{display:"block",fontSize:11,fontWeight:500,color:focused?"#818cf8":"#475569",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:7,fontFamily:"'Syne',sans-serif",transition:"color .2s"}}>{label}</label>
      <div style={{position:"relative",animation:error?"shake .35s ease":"none"}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:focused?"#6366f1":"#334155",display:"flex",pointerEvents:"none"}}><Lock size={15}/></span>
        <input type={show?"text":"password"} placeholder="••••••••" value={value} onChange={e=>onChange(e.target.value)}
          style={{width:"100%",background:error?"rgba(239,68,68,.05)":"rgba(255,255,255,.03)",border:`1.5px solid ${error?"rgba(239,68,68,.45)":focused?"#6366f1":"rgba(99,102,241,.18)"}`,borderRadius:12,padding:"13px 44px 13px 42px",fontSize:14,color:"#e2e8f0",outline:"none",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",caretColor:"#6366f1",boxShadow:focused?"0 0 0 3px rgba(99,102,241,.12)":"none"}}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        />
        <button type="button" onClick={()=>setShow(v=>!v)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#475569",cursor:"pointer",display:"flex"}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>
      </div>
      {error&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}><AlertCircle size={11} color="#f87171"/><span style={{fontSize:11,color:"#f87171"}}>{error}</span></div>}
    </div>
  );
}

/* ── Primary Button ───────────────────────────────────────────────────── */
function PrimaryBtn({children,onClick,loading,style={}}){
  const [hov,setHov]=useState(false);
  return(
    <button type="button" onClick={onClick}
      style={{width:"100%",padding:"14px 24px",borderRadius:13,fontWeight:700,fontSize:14,color:"#fff",border:"none",cursor:"pointer",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",boxShadow:hov?"0 0 0 1px rgba(99,102,241,.5) inset,0 14px 40px rgba(99,102,241,.45)":"0 0 0 1px rgba(99,102,241,.3) inset,0 8px 24px rgba(99,102,241,.25)",transform:hov?"translateY(-1px)":"translateY(0)",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Syne',sans-serif",...style}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {loading?<div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>:children}
    </button>
  );
}

/* ── Social Button ────────────────────────────────────────────────────── */
function SocialBtn({Icon,label}){
  const [hov,setHov]=useState(false);
  return(
    <button type="button"
      style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 14px",borderRadius:12,border:`1.5px solid ${hov?"rgba(99,102,241,.4)":"rgba(255,255,255,.07)"}`,background:hov?"rgba(99,102,241,.07)":"rgba(255,255,255,.02)",color:hov?"#c7d2fe":"#64748b",fontSize:13,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"all .2s",fontWeight:500}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <Icon size={15}/>{label}
    </button>
  );
}

/* ── Link Button ──────────────────────────────────────────────────────── */
function LinkBtn({children,onClick,style={}}){
  const [hov,setHov]=useState(false);
  return(
    <button type="button" onClick={onClick}
      style={{background:"none",border:"none",color:hov?"#a5b4fc":"#6366f1",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"color .2s",...style}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/* LOGIN PAGE                                                              */
/* ══════════════════════════════════════════════════════════════════════ */
export default function LoginPage(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [errs,setErrs]=useState({});
  const [loading,setLoad]=useState(false);
  const [remember,setRem]=useState(false);

  // Simulate navigation (replace with router in real app)
  const [page,setPage]=useState("login");

  const validate=()=>{
    const e={};
    if(!email.includes("@"))e.email="Enter a valid email address";
    if(pass.length<6)e.pass="Password must be at least 6 characters";
    setErrs(e);
    return!Object.keys(e).length;
  };

  const submit=()=>{
    if(!validate())return;
    setLoad(true);
    setTimeout(()=>{setLoad(false);alert("✅ Logged in successfully! (Connect your backend here)");},2000);
  };

  // Simulate other pages for demo
  if(page==="register") return <RegisterSimulator onBack={()=>setPage("login")}/>;
  if(page==="forgot")   return <ForgotSimulator   onBack={()=>setPage("login")}/>;

  return(
    <div style={{minHeight:"100vh",display:"flex",position:"relative"}}>
      <Styles/>
      <Background/>

      {/* ── Left decorative panel ── */}
      <div style={{display:"none",position:"relative",zIndex:1,background:"linear-gradient(145deg,rgba(99,102,241,.12) 0%,rgba(139,92,246,.06) 100%)",borderRight:"1px solid rgba(99,102,241,.12)",padding:"48px 40px",flexDirection:"column",justifyContent:"space-between","@media(min-width:900px)":{display:"flex"}}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(99,102,241,.5)"}}>
            <Zap size={20} color="#fff"/>
          </div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:"#fff"}}>Code<span style={{color:"#8b5cf6"}}>Quest</span></span>
        </div>
        <div>
          <p style={{fontSize:13,color:"#334155",fontFamily:"'DM Sans',sans-serif"}}>© 2025 CodeQuest. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right: Login Form ── */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 20px",position:"relative",zIndex:1}}>
        <div style={{width:"100%",maxWidth:420,animation:"slideUp .5s cubic-bezier(.22,.68,0,1.15) both"}}>

          {/* Card */}
          <div style={{background:"rgba(8,12,26,.92)",border:"1px solid rgba(99,102,241,.2)",borderRadius:24,overflow:"hidden",boxShadow:"0 0 0 1px rgba(255,255,255,.03) inset,0 40px 100px rgba(0,0,0,.7),0 0 80px rgba(99,102,241,.08)",backdropFilter:"blur(32px)"}}>
            {/* top accent */}
            <div style={{height:3,background:"linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)",backgroundSize:"200% 100%",animation:"bgShift 3s linear infinite"}}/>

            <div style={{padding:"32px 32px 36px"}}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
                <div style={{width:38,height:38,borderRadius:11,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(99,102,241,.45)",flexShrink:0}}>
                  <Zap size={18} color="#fff"/>
                </div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:"#fff"}}>Code<span style={{color:"#8b5cf6"}}>Quest</span></span>
              </div>

              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#fff",marginBottom:6,lineHeight:1.2}}>Welcome back</h1>
              <p style={{fontSize:14,color:"#64748b",marginBottom:28,fontFamily:"'DM Sans',sans-serif"}}>
                New here?{" "}
                <LinkBtn onClick={()=>setPage("register")}>Create an account →</LinkBtn>
              </p>

              {/* Fields */}
              <Field label="Email Address" type="email" placeholder="you@email.com" value={email} onChange={setEmail} IconL={Mail} error={errs.email}/>
              <PassField label="Password" value={pass} onChange={setPass} error={errs.pass}/>

              {/* Remember & Forgot */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                  <input type="checkbox" checked={remember} onChange={e=>setRem(e.target.checked)} style={{accentColor:"#6366f1",width:15,height:15}}/>
                  <span style={{fontSize:13,color:"#64748b",fontFamily:"'DM Sans',sans-serif"}}>Remember me</span>
                </label>
                <LinkBtn onClick={()=>setPage("forgot")}>Forgot password?</LinkBtn>
              </div>

              {/* Submit */}
              <PrimaryBtn onClick={submit} loading={loading}>
                <Zap size={15}/>Sign In<ArrowRight size={15}/>
              </PrimaryBtn>

              {/* Divider */}
              <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0"}}>
                <div style={{flex:1,height:1,background:"rgba(255,255,255,.06)"}}/>
                <span style={{fontSize:12,color:"#334155",fontFamily:"'DM Sans',sans-serif"}}>or continue with</span>
                <div style={{flex:1,height:1,background:"rgba(255,255,255,.06)"}}/>
              </div>

              {/* Social */}
              <div style={{display:"flex",gap:10,marginBottom:20}}>
                <SocialBtn Icon={Github} label="GitHub"/>
                <SocialBtn Icon={Chrome} label="Google"/>
              </div>

              {/* Security note */}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:10,background:"rgba(16,185,129,.04)",border:"1px solid rgba(16,185,129,.12)"}}>
                <ShieldCheck size={14} color="#34d399"/>
                <span style={{fontSize:12,color:"#475569",fontFamily:"'DM Sans',sans-serif"}}>Secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stub simulators so the demo is self-contained ── */
function RegisterSimulator({onBack}){
  return(
    <div style={{minHeight:"100vh",background:"#03050d",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <Styles/>
      <Background/>
      <div style={{position:"relative",zIndex:1,background:"rgba(8,12,26,.9)",border:"1px solid rgba(99,102,241,.2)",borderRadius:20,padding:"32px 36px",textAlign:"center",maxWidth:360}}>
        <p style={{fontFamily:"'Syne',sans-serif",color:"#fff",fontSize:18,fontWeight:700,marginBottom:8}}>Register Page</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:"#64748b",fontSize:13,marginBottom:20}}>In your real app, this routes to <code style={{color:"#818cf8"}}>/register</code></p>
        <button type="button" onClick={onBack} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700}}>← Back to Login</button>
      </div>
    </div>
  );
}
function ForgotSimulator({onBack}){
  return(
    <div style={{minHeight:"100vh",background:"#03050d",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <Styles/>
      <Background/>
      <div style={{position:"relative",zIndex:1,background:"rgba(8,12,26,.9)",border:"1px solid rgba(99,102,241,.2)",borderRadius:20,padding:"32px 36px",textAlign:"center",maxWidth:360}}>
        <p style={{fontFamily:"'Syne',sans-serif",color:"#fff",fontSize:18,fontWeight:700,marginBottom:8}}>Forgot Password Page</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",color:"#64748b",fontSize:13,marginBottom:20}}>In your real app, this routes to <code style={{color:"#818cf8"}}>/forgot-password</code></p>
        <button type="button" onClick={onBack} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700}}>← Back to Login</button>
      </div>
    </div>
  );
}
