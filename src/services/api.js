import { PROFILES } from '../data/profiles';

const API_BASE = "http://127.0.0.1:8000/api";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function fetchProfileData(profileId = "ml_engineer") {
  try {
    const res = await fetch(`${API_BASE}/preset/${profileId}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API not reachable, using local profile fallback", err);
  }
  return PROFILES[profileId] || PROFILES.ml_engineer;
}

export async function calculateWhatIfScore(baseScore, toggledSkillIds, profileId) {
  try {
    const res = await fetch(`${API_BASE}/what-if`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base_score: baseScore,
        toggled_skill_ids: toggledSkillIds,
        profile_id: profileId
      }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend what-if API offline, calculating locally", err);
  }

  // Local fallback calculation
  const boostMap = {
    pytorch: 16,
    docker: 10,
    mlops: 7,
    numpy_adv: 5,
    ts: 14,
    pg: 8,
    dock: 6,
    test: 4
  };
  let totalDelta = 0;
  toggledSkillIds.forEach(id => {
    totalDelta += boostMap[id] || 6;
  });
  return {
    original_score: baseScore,
    updated_score: Math.min(98, baseScore + totalDelta),
    delta: totalDelta,
    unlocked_capabilities: toggledSkillIds.map(id => `Unlocked competency: ${id.toUpperCase()}`)
  };
}

export async function analyzeCustomDocuments(syllabusText, resumeText, jdText) {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        syllabus_text: syllabusText,
        resume_text: resumeText,
        job_description_text: jdText
      }),
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend analyze API offline, returning default profile", err);
  }
  return PROFILES.ml_engineer;
}

export async function uploadAndAnalyzeFiles(syllabusFile, resumeFile, jdFile) {
  try {
    const formData = new FormData();
    formData.append("syllabus_file", syllabusFile);
    formData.append("resume_file", resumeFile);
    formData.append("jd_file", jdFile);

    const res = await fetch(`${API_BASE}/analyze-files`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend file upload API error:", err);
  }
  return null;
}

