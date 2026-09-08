import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

function getClinicalFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (['die', 'suicide', 'kill myself', 'hurt myself', 'end it', 'emergency', 'harm', 'overdose'].some(w => lower.includes(w))) {
    return `⚠️ Your immediate safety is the highest priority. Please connect with caring human support right now:
• Call Tele-MANAS: 14416 or 1800-891-4416 (Govt of India 24/7 free toll-free helpline across 20+ Indian languages).
• Call KIRAN: 1800-599-0019 (24/7 Mental Health Helpline by Ministry of Social Justice & Empowerment).
• Call or WhatsApp Vandrevala Foundation: +91 9999 666 555 (Free 24/7 counseling across India).
• For immediate physical or medical danger in India, please dial 112 (National Emergency) or 108/102 (Ambulance), or visit the nearest emergency room. You do not have to carry this alone.`;
  }

  if (lower.includes('score') || lower.includes('result') || lower.includes('screening')) {
    return `The Primary Care PTSD Screen (PC-PTSD-5) measures reactions experienced over the past month. A score of 3 or higher is considered a "positive screen," suggesting that post-traumatic symptoms may be significantly present. Remember that this is a clinical screener, not a formal diagnosis. Discussing these results with a licensed healthcare provider or trauma-informed therapist (such as one certified in EMDR or CPT) can help you explore personalized support.`;
  }

  if (lower.includes('hyperarousal') || lower.includes('startled') || lower.includes('on guard') || lower.includes('fight or flight')) {
    return `Hyperarousal occurs when your nervous system's threat-detection center (the amygdala) remains in a state of high alert long after a traumatic stressor has passed. Common signs include feeling easily startled, irritability, sleep disruptions, and physical muscle tension. Somatic practices, such as diaphragmatic breathing and 5-4-3-2-1 sensory grounding, can help gently signal to your nervous system that you are safe in this moment.`;
  }

  if (lower.includes('grounding') || lower.includes('exercise') || lower.includes('calm') || lower.includes('panic') || lower.includes('anxiety')) {
    return `Let's practice the 5-4-3-2-1 sensory grounding technique right now:
1. Look around: Name 5 things you can see (e.g., a chair, a window, a beam of light).
2. Feel: Notice 4 things you can touch (e.g., your feet on the floor, your clothing's texture).
3. Listen: Identify 3 sounds you can hear (e.g., ambient room hum, distant traffic).
4. Smell: Notice 2 scents around you (or imagine a soothing scent like lavender).
5. Taste: Notice 1 taste, or take a gentle sip of cool water.

Take a slow, deep breath in, and let your shoulders drop as you exhale.`;
  }

  if (lower.includes('doctor') || lower.includes('therapist') || lower.includes('talk') || lower.includes('provider')) {
    return `When speaking with a physician or therapist about trauma, you can keep it simple: "I recently completed a validated PC-PTSD-5 screening and noticed that lingering reactions from past events are affecting my daily life, sleep, or mood. I would like to discuss an evaluation or referral to an evidence-based trauma specialist." You don't have to share all traumatic details until you feel comfortable and safe.`;
  }

  if (lower.includes('emdr') || lower.includes('cpt') || lower.includes('treatment') || lower.includes('therapy')) {
    return `Evidence-based trauma therapies have high success rates in helping the brain reprocess traumatic memories:
• EMDR (Eye Movement Desensitization and Reprocessing): Uses bilateral stimulation to reduce emotional charge attached to traumatic memories.
• CPT (Cognitive Processing Therapy): Helps identify and reframe stuck points, self-blame, and safety beliefs.
• Somatic Experiencing: Focuses on releasing stored physical stress and restoring autonomic regulation.`;
  }

  return `Thank you for sharing that with me. Experiencing trauma reactions can feel overwhelming and isolating, but these responses are normal physiological adaptations to severe stress. What aspect of what you're feeling would be most supportive to focus on right now—understanding symptoms, practical grounding exercises, or next steps with a healthcare provider?`;
}

function getClinicalAssessmentFallback(data: {
  traumaExposure: boolean;
  ptsdScore: number;
  ptsdAnswers: boolean[];
  gad7Score: number;
  gad7Severity: string;
  riskLevel: string;
}): string {
  const { traumaExposure, ptsdScore, gad7Score, gad7Severity, riskLevel } = data;

  let riskNote = '';
  if (riskLevel === 'critical' || riskLevel === 'elevated') {
    riskNote = `⚠️ **URGENT SAFETY NOTICE**: Elevated distress or safety concerns were indicated during triage. Immediate, compassionate support is available 24/7 across India:\n• **Tele-MANAS**: 14416 or 1800-891-4416 (Govt of India, 24/7 Toll-Free)\n• **KIRAN**: 1800-599-0019 (Ministry of Social Justice)\n• **Vandrevala Foundation**: +91 9999 666 555 (Call / WhatsApp)\n• **National Emergency**: 112\n\n`;
  }

  let traumaSection = '';
  if (!traumaExposure) {
    traumaSection = `• **PC-PTSD-5 Screener**: Criterion A trauma exposure was not reported. By clinical screening rules, the PTSD score is **0/5 (Negative Screen)**.`;
  } else {
    const isPtsdPositive = ptsdScore >= 3;
    const isVaCutpoint = ptsdScore >= 4;
    traumaSection = `• **PC-PTSD-5 Trauma Screener**: Score is **${ptsdScore}/5 Affirmative**. ${
      isVaCutpoint
        ? 'Meets the established VA research clinical cut-point (≥4) and general screening threshold (≥3), indicating prominent traumatic stress reactions requiring professional evaluation.'
        : isPtsdPositive
        ? 'Meets the clinical screening threshold (≥3), suggesting notable post-traumatic stress reactions over the past month.'
        : 'Below the screening cutoff (0–2), indicating lower indication of clinical post-traumatic stress on this screen.'
    }`;
  }

  const isGadReferral = gad7Score >= 10;
  const gadSection = `• **GAD-7 Anxiety Scale**: Score is **${gad7Score}/21 (${gad7Severity.toUpperCase()} ANXIETY)**. ${
    isGadReferral
      ? 'Meets the clinical referral flag threshold (10+), indicating that generalized anxiety symptoms may be causing significant emotional or functional disruption.'
      : 'Within the low-to-mild range, suggesting manageable baseline anxiety symptoms over the past two weeks.'
  }`;

  const pathways = `• **Evidence-Based Care Pathways**:
  - **EMDR & Cognitive Processing Therapy (CPT)**: Recommended first-line therapies for trauma memory reprocessing and relieving intrusive thoughts.
  - **Somatic Nervous System Regulation**: 5-4-3-2-1 sensory grounding and rhythmic box breathing help down-regulate sympathetic fight-or-flight hyperarousal.
  - **Cognitive Behavioral Strategies**: Effective for breaking loops of uncontrollable worry, catastrophizing, and muscle tension.`;

  const referral = `• **Provider Referral Guidance**:
  Discuss these results with a licensed physician or clinical psychologist. You can share:
  *"I completed validated PC-PTSD-5 and GAD-7 screeners. My results indicated a PTSD screen score of ${traumaExposure ? ptsdScore : 0}/5 and a GAD-7 anxiety score of ${gad7Score}/21. I would like to explore an evaluation and trauma-informed support."*`;

  const disclaimer = `*Clinical Boundary: The PC-PTSD-5 and GAD-7 are screening instruments designed to identify individuals who may benefit from further evaluation. They do not constitute a formal psychiatric diagnosis. A positive screen warrants comprehensive assessment by a qualified clinician.*`;

  return `${riskNote}### Comprehensive Clinical Synthesis\n\n${traumaSection}\n\n${gadSection}\n\n### Care & Treatment Pathways\n${pathways}\n\n### Next Steps & Referral\n${referral}\n\n---\n${disclaimer}`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Assessment Synthesis Endpoint (PC-PTSD-5 + GAD-7 + Risk)
  app.post('/api/assess', async (req, res) => {
    try {
      const {
        traumaExposure,
        ptsdScore = 0,
        ptsdAnswers = [],
        gad7Score = 0,
        gad7Severity = 'minimal',
        riskLevel = 'routine'
      } = req.body;

      const fallbackText = getClinicalAssessmentFallback({
        traumaExposure: !!traumaExposure,
        ptsdScore: Number(ptsdScore) || 0,
        ptsdAnswers: Array.isArray(ptsdAnswers) ? ptsdAnswers : [],
        gad7Score: Number(gad7Score) || 0,
        gad7Severity: String(gad7Severity),
        riskLevel: String(riskLevel)
      });

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({ summary: fallbackText, isFallback: true });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Synthesize these clinical screening results for a victim/patient into an empathetic, structured preliminary assessment report with referral recommendations:
- PC-PTSD-5 Criterion A Trauma Exposure: ${traumaExposure ? 'YES' : 'NO'}
- PC-PTSD-5 PTSD Score: ${traumaExposure ? ptsdScore : 0} of 5 (Cut-point: 3+ indicates positive screen, 4 is VA research cut-point)
- GAD-7 Anxiety Score: ${gad7Score} of 21 (Severity: ${gad7Severity}, Referral threshold: 10+)
- Risk / Urgency Triage Level: ${riskLevel}

Format requirements:
1. Executive Clinical Synthesis (warm, validating, non-diagnostic).
2. Trauma Symptom Profile (PC-PTSD-5 breakdown).
3. Generalized Anxiety Profile (GAD-7 breakdown & functional impact).
4. Evidence-Based Next Steps (EMDR, CPT, Somatic grounding, GP discussion guide).
5. Indian Helplines (Tele-MANAS 14416, KIRAN 1800-599-0019, Vandrevala Foundation +91 9999 666 555).
6. Mandatory Clinical Disclaimer: "The PC-PTSD-5 and GAD-7 are screening tools, not diagnostic tests; a positive result warrants further evaluation by a qualified professional." Keep concise (3-4 concise sections).`;

      let response;
      let usedModel = 'gemini-3.6-flash';
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            systemInstruction: 'You are AASRA, an empathetic, trauma-informed clinical assistant synthesizing screening questionnaires for victims and survivors.'
          }
        });
      } catch (err: any) {
        usedModel = 'gemini-3.8-flash';
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            systemInstruction: 'You are AASRA, an empathetic, trauma-informed clinical assistant synthesizing screening questionnaires for victims and survivors.'
          }
        });
      }

      const summary = response.text || fallbackText;
      res.json({ summary, isFallback: false, model: usedModel });
    } catch (error: any) {
      console.warn('API /api/assess error, falling back:', error?.message);
      const fallbackText = getClinicalAssessmentFallback({
        traumaExposure: !!req.body?.traumaExposure,
        ptsdScore: Number(req.body?.ptsdScore) || 0,
        ptsdAnswers: req.body?.ptsdAnswers || [],
        gad7Score: Number(req.body?.gad7Score) || 0,
        gad7Severity: req.body?.gad7Severity || 'minimal',
        riskLevel: req.body?.riskLevel || 'routine'
      });
      res.json({ summary: fallbackText, isFallback: true });
    }
  });

  // AI Chat Endpoint with Gemini 3.8 Flash + Clinical Safe Fallback
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({
          reply: getClinicalFallbackResponse(message),
          isFallback: true
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are AASRA, an empathetic, trauma-informed psychoeducational assistant.
You provide supportive information, explain PTSD symptoms according to DSM-5 (Intrusive memories, Avoidance, Hyperarousal & reactivity, Negative cognitions & mood), and guide users through nervous system regulation exercises (5-4-3-2-1 grounding, box breathing).
CLINICAL BOUNDARIES & SAFETY PROTOCOLS:
1. You are NOT a doctor, therapist, or emergency service. Never diagnose.
2. If the user expresses thoughts of suicide, self-harm, severe crisis, or immediate danger, lead immediately with Indian Crisis Helplines: Tele-MANAS (14416 / 1800-891-4416), KIRAN (1800-599-0019), Vandrevala Foundation (+91 9999 666 555), and National Emergency (112).
3. Keep responses warm, non-judgmental, validating, gentle, concise (2-3 short paragraphs maximum), and easily readable.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          if (item && item.text) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      let response;
      let usedModel = 'gemini-3.6-flash';
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents,
          config: {
            systemInstruction,
          }
        });
      } catch (err: any) {
        console.warn('gemini-3.6-flash attempt failed, trying gemini-3.8-flash:', err?.message);
        usedModel = 'gemini-3.8-flash';
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
          }
        });
      }

      const replyText = response.text || getClinicalFallbackResponse(message);
      console.log(`[Chat API] Responded using ${usedModel} (${replyText.length} chars)`);
      res.json({ reply: replyText, isFallback: false, model: usedModel });
    } catch (error: any) {
      console.warn('Gemini API call failed, using clinical fallback:', error?.message);
      res.json({
        reply: getClinicalFallbackResponse(req.body?.message || ''),
        isFallback: true
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'MindTrauma AI', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
