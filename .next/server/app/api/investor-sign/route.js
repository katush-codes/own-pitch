"use strict";(()=>{var e={};e.id=669,e.ids=[669],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},852:e=>{e.exports=require("async_hooks")},6113:e=>{e.exports=require("crypto")},4492:e=>{e.exports=require("node:stream")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},1054:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>f,requestAsyncStorage:()=>m,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>l});var d=r(9303),n=r(8716),i=r(670),s=r(7070),a=r(1926),p=r(471);async function l(e){try{let{name:t,email:r,fund:o,amount:d,signature:n}=await e.json();if(!t||!r||!o||!d||!n)return s.NextResponse.json({error:"All fields required"},{status:400});if(d<5e5)return s.NextResponse.json({error:"Minimum investment is $500,000"},{status:400});let i=new Date,l=new Date(i.getTime()+12096e5),c=(0,a.m)();return await c.from("investor_submissions").insert({name:t,email:r,fund:o,amount:Number(d),signature:n,signed_at:i.toISOString()}),await c.from("dd_access").insert({identifier:r.toLowerCase(),granted_at:i.toISOString(),expires_at:l.toISOString()}),await Promise.allSettled([(0,p.Xu)(r,t,l.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})),(0,p.AD)({name:t,email:r,fund:o,amount:Number(d),signature:n})]),s.NextResponse.json({success:!0,expiresAt:l.toISOString()})}catch(e){return console.error("investor-sign error:",e),s.NextResponse.json({error:"Server error"},{status:500})}}let c=new d.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/investor-sign/route",pathname:"/api/investor-sign",filename:"route",bundlePath:"app/api/investor-sign/route"},resolvedPagePath:"/Users/ownworkspace/Downloads/own-app/src/app/api/investor-sign/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:u,serverHooks:g}=c,x="/api/investor-sign/route";function f(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}},471:(e,t,r)=>{r.d(t,{AD:()=>p,Xu:()=>a,cu:()=>i,d1:()=>s});let o=new(r(6495)).R(process.env.RESEND_API_KEY),d=process.env.EMAIL_FROM||"Own. <investments@iown.app>",n=process.env.EMAIL_NOTIFY||"investments@iown.app";async function i(e,t){return o.emails.send({from:d,to:e,subject:"Own. — Your Investment Deck",html:`
      <div style="background:#080808;color:#f5f2ec;font-family:sans-serif;padding:40px;max-width:560px;margin:0 auto;">
        <div style="font-size:2rem;font-weight:900;letter-spacing:0.05em;color:#00E2E2;margin-bottom:24px;">own.</div>
        <h1 style="font-size:1.6rem;margin-bottom:16px;">Hi ${t},</h1>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:24px;">
          Thanks for your interest in Own.'s Pre-Series A Round. Your copy of the investment deck is attached below.
        </p>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:32px;">
          If you'd like to proceed to due diligence or have any questions, reply to this email or visit:
        </p>
        <a href="https://pitch.ownapp.co" style="background:#00E2E2;color:#080808;font-weight:800;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;padding:14px 28px;text-decoration:none;display:inline-block;">
          View Pitch Site →
        </a>
        <p style="color:#555;font-size:0.75rem;margin-top:40px;letter-spacing:0.1em;text-transform:uppercase;">
          investments@iown.app \xb7 www.ownapp.co
        </p>
      </div>
    `})}async function s(e){return o.emails.send({from:d,to:n,subject:`New Deck Request — ${e.name} (${e.fund})`,html:`
      <div style="font-family:monospace;padding:24px;background:#f9f9f9;">
        <h2>New Deck Request</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${e.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${e.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fund</td><td style="padding:8px;border:1px solid #ddd;">${e.fund}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cheque Size</td><td style="padding:8px;border:1px solid #ddd;">${e.cheque}</td></tr>
        </table>
      </div>
    `})}async function a(e,t,r){return o.emails.send({from:d,to:e,subject:"Own. — DD Suite Access Granted",html:`
      <div style="background:#080808;color:#f5f2ec;font-family:sans-serif;padding:40px;max-width:560px;margin:0 auto;">
        <div style="font-size:2rem;font-weight:900;letter-spacing:0.05em;color:#00E2E2;margin-bottom:24px;">own.</div>
        <h1 style="font-size:1.6rem;margin-bottom:16px;">Access Granted, ${t}.</h1>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:8px;">
          You've signed the term sheet and your DD suite access is now active.
        </p>
        <p style="color:#00E2E2;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:32px;">
          Access expires: ${r}
        </p>
        <a href="https://pitch.ownapp.co?access=true" style="background:#00E2E2;color:#080808;font-weight:800;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;padding:14px 28px;text-decoration:none;display:inline-block;">
          Enter DD Suite →
        </a>
        <p style="color:rgba(245,242,236,0.5);font-size:0.8rem;margin-top:32px;line-height:1.6;">
          Use your email address (${e}) to re-enter the DD suite at any time before expiry.
          All information is subject to the MNDA you signed.
        </p>
        <p style="color:#555;font-size:0.75rem;margin-top:40px;letter-spacing:0.1em;text-transform:uppercase;">
          investments@iown.app \xb7 www.ownapp.co
        </p>
      </div>
    `})}async function p(e){return o.emails.send({from:d,to:n,subject:`🔥 Investor Signed Term Sheet — ${e.name} ($${e.amount.toLocaleString()})`,html:`
      <div style="font-family:monospace;padding:24px;background:#f9f9f9;">
        <h2 style="color:green;">Term Sheet Signed</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${e.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${e.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fund</td><td style="padding:8px;border:1px solid #ddd;">${e.fund}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Amount</td><td style="padding:8px;border:1px solid #ddd;color:green;font-weight:bold;">$${e.amount.toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Signature</td><td style="padding:8px;border:1px solid #ddd;">${e.signature}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Signed At</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toISOString()}</td></tr>
        </table>
      </div>
    `})}},1926:(e,t,r)=>{r.d(t,{m:()=>n});var o=r(7857);let d="https://kqqdfjmmsmidnjbjyonh.supabase.co";function n(){return(0,o.eI)(d,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:!1,persistSession:!1}})}(0,o.eI)(d,"sb_publishable_DSFj5DAw324J-jwrdYRzfg_hcMaoeAY")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948,564,495],()=>r(1054));module.exports=o})();