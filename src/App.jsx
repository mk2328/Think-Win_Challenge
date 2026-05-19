import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot,
  collection, serverTimestamp, updateDoc
} from "firebase/firestore";
import { QUESTIONS } from "./questions";

// ══════════════════════════════════════════════════════════════
// 🔥 FIREBASE CONFIG
// ══════════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyA5FXFiCvWyepDn0EFuzP24BtRI3Jhlz4Q",
  authDomain: "thinkfastwinchallenge.firebaseapp.com",
  projectId: "thinkfastwinchallenge",
  storageBucket: "thinkfastwinchallenge.firebasestorage.app",
  messagingSenderId: "494993584784",
  appId: "1:494993584784:web:8f8e7a5e7e4bb296201e15",
  measurementId: "G-V0VG5RVEX6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const QUIZ_DURATION = 30 * 60; // 30 minutes
const LS_KEY = "tfwc_session";

function normalizeAnswer(ans) {
  return ans.trim().toUpperCase().replace(/\s+/g, " ");
}

function saveLocal(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { }
}
function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch { return null; }
}

// ══════════════════════════════════════════════════════════════
// SOUND ENGINE
// ══════════════════════════════════════════════════════════════
function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.connect(ctx.destination);

  const note = (freq, start, dur, vol = 0.55, type_ = "sine") => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(master);
    o.type = type_;
    o.frequency.setValueAtTime(freq, ctx.currentTime + start);
    g.gain.setValueAtTime(vol, ctx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
    o.start(ctx.currentTime + start);
    o.stop(ctx.currentTime + start + dur + 0.01);
  };

  if (type === "correct") {
    note(523, 0, 0.12, 0.6);
    note(659, 0.12, 0.12, 0.6);
    note(784, 0.24, 0.4, 0.6);
  } else if (type === "wrong") {
    note(300, 0, 0.08, 0.55, "sawtooth");
    note(220, 0.1, 0.1, 0.55, "sawtooth");
    note(160, 0.22, 0.2, 0.55, "sawtooth");
  } else if (type === "warning") {
    note(440, 0, 0.18, 0.5);
    note(440, 0.22, 0.18, 0.5);
  } else if (type === "urgent") {
    [0, 0.14, 0.28].forEach(d => note(880, d, 0.1, 0.5, "square"));
  } else if (type === "letter") {
    note(660, 0, 0.07, 0.18);
  }
}

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("join");   // join | loading | quiz | end
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState({});
  const [letterInputs, setLetterInputs] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [quizLocked, setQuizLocked] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [warned10, setWarned10] = useState(false);
  const [warned5, setWarned5] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [resuming, setResuming] = useState(false);

  useEffect(() => {
    const block = (e) => e.preventDefault();
    document.addEventListener("contextmenu", block);
    return () => document.removeEventListener("contextmenu", block);
  }, []);

  const timerRef = useRef(null);
  const letterRefs = useRef([]);

  const q = QUESTIONS[current];
  const solved = correct[q?.id];

  // ── On mount: check localStorage for saved session ──────────
  useEffect(() => {
    const saved = loadLocal();
    if (saved?.teamId && saved?.teamName) {
      setResuming(true);
      setTeamId(saved.teamId);
      setTeamName(saved.teamName);
    }
  }, []);

  // ── When resuming: reload from Firestore ────────────────────
  useEffect(() => {
    if (!resuming || !teamId) return;
    (async () => {
      const snap = await getDoc(doc(db, "teams", teamId));
      if (snap.exists()) {
        const data = snap.data();
        const savedCorrect = data.correct || {};
        setCorrect(savedCorrect);

        if (data.startTime) {
          setStartTime(data.startTime.toMillis());
        }

        // Check if already completed all questions before resuming
        const totalSolved = Object.keys(savedCorrect).length;
        if (QUESTIONS.length > 0 && totalSolved === QUESTIONS.length) {
          setQuizLocked(true);
          setScreen("end");
        } else {
          const nextUnsolved = QUESTIONS.findIndex((qq) => !savedCorrect[qq.id]);
          if (nextUnsolved !== -1) setCurrent(nextUnsolved);
          setScreen("quiz");
        }
      }
      setResuming(false);
    })();
  }, [resuming, teamId]);

  // ── Build letter inputs when question changes ────────────────
  useEffect(() => {
    if (!q) return;
    setLetterInputs(Array(q.answer.length).fill(""));
    setFeedback(null);
    letterRefs.current = [];
  }, [current, q]);

  // ── Auto-focus first box when question changes ───────────────
  useEffect(() => {
    if (screen !== "quiz" || solved || quizLocked) return;
    const firstNonSpace = q?.answer.split("").findIndex(c => c !== " ");
    if (firstNonSpace != null && firstNonSpace >= 0) {
      setTimeout(() => letterRefs.current[firstNonSpace]?.focus(), 60);
    }
  }, [current, screen, solved, quizLocked, q]);

  // ── Leaderboard live listener ────────────────────────────────
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "teams"), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => {
        if (b.score !== a.score) {
          return (b.score || 0) - (a.score || 0); // Pehle score check hoga
        }
        return (a.timeTaken || 99999) - (b.timeTaken || 99999); // Tie hone par kam time wala upar aayega
      });
      setLeaderboard(data);
    });
    return unsub;
  }, []);

  // ── Countdown logic (fires once startTime is set) ───────────
  useEffect(() => {
    if (!startTime || quizLocked) return;
    clearInterval(timerRef.current);

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, QUIZ_DURATION - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 600 && remaining > 595 && !warned10) {
        setWarned10(true);
        playSound("warning");
      }
      if (remaining <= 300 && remaining > 295 && !warned5) {
        setWarned5(true);
        playSound("urgent");
      }
      if (remaining === 0) {
        setQuizLocked(true);
        setScreen("end");
        clearInterval(timerRef.current);
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [startTime, quizLocked, warned10, warned5]);

  // ── Join handler ─────────────────────────────────────────────
  const handleJoin = async () => {
    const name = teamName.trim();
    if (!name) { setJoinError("Please enter a team name."); return; }
    setJoinError("");
    setScreen("loading");

    const id = name.toLowerCase().replace(/\s+/g, "_");
    setTeamId(id);

    const ref = doc(db, "teams", id);
    const snap = await getDoc(ref);

    let savedCorrect = {};
    let savedStart = null;

    if (snap.exists()) {
      const data = snap.data();
      savedCorrect = data.correct || {};
      if (data.startTime) savedStart = data.startTime.toMillis();
      setCorrect(savedCorrect);
    }

    if (!savedStart) {
      const now = serverTimestamp();
      if (snap.exists()) {
        await updateDoc(ref, { startTime: now });
      } else {
        await setDoc(ref, { name, score: 0, correct: {}, joinedAt: now, startTime: now });
      }
      const fresh = await getDoc(ref);
      savedStart = fresh.data().startTime?.toMillis() || Date.now();
    }

    setStartTime(savedStart);
    saveLocal({ teamId: id, teamName: name });

    // Routing calculation on initial join check
    const totalSolved = Object.keys(savedCorrect).length;
    if (QUESTIONS.length > 0 && totalSolved === QUESTIONS.length) {
      setQuizLocked(true);
      setScreen("end");
    } else {
      const nextUnsolved = QUESTIONS.findIndex((qq) => !savedCorrect[qq.id]);
      if (nextUnsolved !== -1) setCurrent(nextUnsolved);
      setScreen("quiz");
    }
  };

  // ── Letter input handler ─────────────────────────────────────
  const handleLetterChange = (idx, val) => {
    if (solved || quizLocked) return;
    const char = val.slice(-1).toUpperCase();
    if (char && !/[A-Z0-9\s\[\],._()!%*+<>/-]/.test(char)) return;

    const newInputs = [...letterInputs];

    if (char) {
      playSound("letter");
      newInputs[idx] = char;

      let next = idx + 1;
      while (next < q.answer.length && q.answer[next] === " ") {
        newInputs[next] = " ";
        next++;
      }
      setLetterInputs([...newInputs]);
      if (next < q.answer.length) {
        letterRefs.current[next]?.focus();
      } else {
        checkAnswer([...newInputs]);
      }
    } else {
      newInputs[idx] = "";
      setLetterInputs(newInputs);
      let prev = idx - 1;
      while (prev >= 0 && q.answer[prev] === " ") prev--;
      if (prev >= 0) letterRefs.current[prev]?.focus();
    }
  };

  const handleLetterKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !letterInputs[idx]) {
      let prev = idx - 1;
      while (prev >= 0 && q.answer[prev] === " ") prev--;
      if (prev >= 0) {
        const newInputs = [...letterInputs];
        newInputs[prev] = "";
        setLetterInputs(newInputs);
        letterRefs.current[prev]?.focus();
      }
    }
  };

  // ── Check answer ─────────────────────────────────────────────
  const checkAnswer = async (inputs) => {
    // If already solved or locked, do not process to avoid race conditions
    if (solved || quizLocked || feedback === "correct") return;

    const given = normalizeAnswer(inputs.join(""));
    const expected = normalizeAnswer(q.answer);

    if (given === expected) {
      const newCorrect = { ...correct, [q.id]: true };
      setCorrect(newCorrect);
      setFeedback("correct");
      playSound("correct");

      const score = Object.keys(newCorrect).length;
      const isFullyCompleted = score === QUESTIONS.length;

      // 🏆 SPEED CALCULATION: Total seconds taken right at this moment
      const totalTimeTakenSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

      if (teamId) {
        const updateData = { correct: newCorrect, score };

        // Agar saare correct ho gaye hain, toh automatic timeTaken stamp save karo tie-breaker ke liye
        if (isFullyCompleted) {
          updateData.timeTaken = totalTimeTakenSeconds;
        }

        try {
          await updateDoc(doc(db, "teams", teamId), updateData);
        } catch (err) {
          console.error("Error updating score:", err);
        }
      }

      // Handlers inside timeout for seamless UI transitions
      setTimeout(() => {
        setFeedback(null);

        // 🌟 IF COMPLETION HIT: Lock immediately and jump to end screen
        if (isFullyCompleted) {
          setQuizLocked(true);
          setScreen("end");
          clearInterval(timerRef.current);
          return;
        }

        // Loop array to look forward for an unsolved item
        const nextUnsolved = QUESTIONS.findIndex((qq, i) => i > current && !newCorrect[qq.id]);
        if (nextUnsolved !== -1) {
          setCurrent(nextUnsolved);
        } else {
          // Wrap around to absolute index if any item skipped behind exists
          const wrapUnsolved = QUESTIONS.findIndex((qq) => !newCorrect[qq.id]);
          if (wrapUnsolved !== -1) setCurrent(wrapUnsolved);
        }
      }, 1500);

    } else {
      setFeedback("wrong");
      playSound("wrong");
      setTimeout(() => {
        setFeedback(null);
        setLetterInputs(Array(q.answer.length).fill(""));
        const firstNonSpace = q.answer.split("").findIndex(c => c !== " ");
        letterRefs.current[firstNonSpace >= 0 ? firstNonSpace : 0]?.focus();
      }, 1000);
    }
  };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const isRed = timeLeft < 300;
  const isOrange = timeLeft < 600 && timeLeft >= 300;

  // ══════════════════════════════════════════════════════════
  // LOADING SCREEN
  // ══════════════════════════════════════════════════════════
  if (screen === "loading" || resuming) {
    return (
      <>
        <style>{globalStyles}</style>
        <div style={s.page}>
          <div style={s.loadingCard}>
            <div style={s.spinner} />
            <p style={s.loadingText}>Setting up your quiz session…</p>
            <p style={s.loadingSubText}>Syncing with server</p>
          </div>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════
  // JOIN SCREEN
  // ══════════════════════════════════════════════════════════
  if (screen === "join") {
    return (
      <>
        <style>{globalStyles}</style>
        <div style={s.page}>
          <div style={s.joinCard}>
            <div style={s.snakeBadge}>🐍</div>
            <h1 style={s.joinTitle}>TeQuest</h1>
            <p style={s.joinChallenge}>Think Fast to Win Challenge</p>
            <p style={s.joinSub}>Python Edition · {QUESTIONS.length} Questions · 45 Minutes</p>
            <div style={s.deptBadge}>Department of CS &amp; SE</div>

            <div style={s.inputWrapper}>
              <span style={s.inputIcon}>👥</span>
              <input
                style={s.joinInput}
                placeholder="Enter your team name…"
                value={teamName}
                onChange={e => { setTeamName(e.target.value); setJoinError(""); }}
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                maxLength={30}
                autoFocus
              />
            </div>
            {joinError && <p style={s.errorText}>{joinError}</p>}

            <button style={s.joinBtn} onClick={handleJoin}>
              <span>Join Quiz</span>
              <span style={{ marginLeft: 8 }}>→</span>
            </button>

            <div style={s.infoRow}>
              <span style={s.infoChip}>⏱ 45 min timer</span>
              <span style={s.infoChip}>🔄 Resume on refresh</span>
              <span style={s.infoChip}>🏆 Live scores</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════
  // END SCREEN
  // ══════════════════════════════════════════════════════════
  if (screen === "end") {
    const top10 = leaderboard.slice(0, 10);
    const myRank = leaderboard.findIndex(t => t.id === teamId) + 1;
    return (
      <>
        <style>{globalStyles}</style>
        <div style={s.endPage}>
          <div style={s.endCard}>
            <div style={s.trophyRing}>🏆</div>
            <h1 style={s.endTitle}>{Object.keys(correct).length === QUESTIONS.length ? "Congratulations!" : "Time's Up!"}</h1>
            <p style={s.endSub}>{Object.keys(correct).length === QUESTIONS.length ? "You have completed the entire challenge!" : "Final Leaderboard — Top 10 Teams"}</p>
            {myRank > 0 && (
              <div style={s.myRankBadge}>
                Your rank: <strong>#{myRank}</strong> &nbsp;·&nbsp; Score: <strong>{Object.keys(correct).length}/{QUESTIONS.length}</strong>
              </div>
            )}
            <div style={s.endList}>
              {top10.map((team, i) => (
                <div key={team.id} style={{
                  ...s.endRow,
                  background: i === 0 ? "linear-gradient(90deg,#fef9c3,#fef3e8)" : i === 1 ? "#f8fafc" : i === 2 ? "#fff7ed" : "#fff",
                  border: team.id === teamId ? "2px solid #6366f1" : "2px solid #e2e8f0",
                  transform: i === 0 ? "scale(1.03)" : "scale(1)"
                }}>
                  <span style={{ fontSize: 22, width: 36, textAlign: "center" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 14 }}>{i + 1}.</span>}
                  </span>
                  <span style={{ flex: 1, fontWeight: 600, color: "#1e293b", fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {team.name}
                    {team.id === teamId && <span style={{ color: "#6366f1", fontSize: 11, marginLeft: 6, fontWeight: 400 }}>(you)</span>}
                  </span>
                  <span style={{ fontWeight: 800, color: "#6366f1", fontSize: 18 }}>
                    {team.score || 0}<span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 400 }}>/{QUESTIONS.length}</span>
                  </span>
                </div>
              ))}
            </div>
            {leaderboard.length === 0 && <p style={{ color: "#94a3b8" }}>No teams found.</p>}
            {/* <button style={{ ...s.joinBtn, marginTop: 24, maxWidth: 240, margin: "24px auto 0" }}
              onClick={() => { saveLocal(null); localStorage.removeItem(LS_KEY); setScreen("join"); setTeamName(""); setTeamId(null); setCorrect({}); }}>
              Play Again
            </button> */}
          </div>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════
  // QUIZ SCREEN
  // ══════════════════════════════════════════════════════════
  return (
    <>
      <style>{globalStyles}</style>
      <div style={s.quizLayout}>

        {/* ── LEFT: Question Panel ── */}
        <div style={s.questionPanel}>

          {/* Header */}
          <div style={s.qHeader}>
            <div style={s.qNumPill}>
              <span style={s.qNumLabel}>Q</span>
              <span style={s.qNumVal}>{q?.id}</span>
              <span style={s.qTotal}>/ {QUESTIONS.length}</span>
            </div>
            <div style={{
              ...s.timer,
              color: isRed ? "#ef4444" : isOrange ? "#f97316" : "#16a34a",
              animation: isRed ? "pulse 1s infinite" : "none",
              background: isRed ? "#fee2e2" : isOrange ? "#fff7ed" : "#dcfce7",
              borderColor: isRed ? "#fca5a5" : isOrange ? "#fdba74" : "#86efac",
            }}>
              ⏱ {mins}:{secs}
            </div>
          </div>

          {/* Progress dots */}
          <div style={s.progressRow}>
            {QUESTIONS.map((qq, i) => (
              <div
                key={qq.id}
                onClick={() => setCurrent(i)}
                title={`Q${qq.id}`}
                style={{
                  ...s.dot,
                  background: correct[qq.id] ? "#16a34a" : i === current ? "#6366f1" : "#e2e8f0",
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                  boxShadow: i === current ? "0 0 0 3px #c7d2fe" : "none",
                }}
              />
            ))}
          </div>

          {/* Riddle */}
          <div style={s.riddleBox}>
            <div style={s.riddleHeader}>
              <span style={s.riddleIcon}>❓</span>
              <span style={s.riddleLabel}>Question {q?.id}</span>
            </div>
            <p style={s.riddleText}>{q?.riddle}</p>
          </div>

          {/* Hint */}
          <div style={s.hintBox}>
            <span style={s.hintLabel}>💡 Hint: </span>
            <span style={s.hintText}>{q?.hint}</span>
          </div>

          {/* Hangman Letter Boxes */}
          <div style={s.hangmanRow}>
            {q?.answer.split("").map((ch, i) => {
              if (ch === " ") {
                return <div key={i} style={s.hangmanSpace} />;
              }
              return (
                <input
                  key={i}
                  ref={el => letterRefs.current[i] = el}
                  maxLength={2}
                  value={solved ? ch : (letterInputs[i] || "")}
                  onChange={e => handleLetterChange(i, e.target.value)}
                  onKeyDown={e => handleLetterKeyDown(i, e)}
                  disabled={solved || quizLocked}
                  style={{
                    ...s.letterBox,
                    background: solved
                      ? "#dcfce7"
                      : feedback === "wrong"
                        ? "#fee2e2"
                        : letterInputs[i]
                          ? "#eef2ff"
                          : "#fff",
                    borderColor: solved
                      ? "#16a34a"
                      : feedback === "wrong"
                        ? "#ef4444"
                        : letterInputs[i]
                          ? "#6366f1"
                          : "#cbd5e1",
                    color: solved ? "#16a34a" : "#1e293b",
                    transform: feedback === "wrong" ? "scale(0.94)" : "scale(1)",
                  }}
                />
              );
            })}
          </div>

          {/* Feedback */}
          {feedback === "correct" && (
            <div style={s.feedbackGreen}>✅ Correct! Excellent work!</div>
          )}
          {feedback === "wrong" && (
            <div style={s.feedbackRed}>❌ Not quite — try again!</div>
          )}
          {solved && !feedback && (
            <div style={s.feedbackGreen}>✅ Already solved!</div>
          )}
          {quizLocked && (
            <div style={s.feedbackOrange}>⏰ Time is up! Quiz has ended.</div>
          )}

          {/* Navigation */}
          <div style={s.navRow}>
            <button style={s.navBtn}
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}>
              ← Prev
            </button>
            <div style={s.solvedPill}>
              <span style={s.solvedNum}>{Object.keys(correct).length}</span>
              <span style={s.solvedDen}>/{QUESTIONS.length} solved</span>
            </div>
            <button style={s.navBtn}
              onClick={() => setCurrent(Math.min(QUESTIONS.length - 1, current + 1))}
              disabled={current === QUESTIONS.length - 1}>
              Next →
            </button>
          </div>
        </div>

        {/* ── RIGHT: Leaderboard ── */}
        <div style={s.sidebar}>
          <div style={s.sidebarHeader}>
            <span>🏆</span>
            <span style={s.lbTitle}>Live Leaderboard</span>
          </div>

          {leaderboard.length === 0 && (
            <p style={{ color: "#94a3b8", fontSize: 13, padding: "8px 4px" }}>Waiting for teams…</p>
          )}
          {leaderboard.map((team, i) => (
            <div key={team.id} style={{
              ...s.lbRow,
              background: team.id === teamId ? "#ede9fe" : i % 2 === 0 ? "#f8fafc" : "#fff",
              borderLeft: team.id === teamId ? "3px solid #6366f1" : "3px solid transparent",
            }}>
              <span style={{
                fontSize: i < 3 ? 18 : 13,
                width: 28,
                color: i === 0 ? "#d97706" : i === 1 ? "#64748b" : i === 2 ? "#b45309" : "#94a3b8",
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
              </span>
              <span style={s.lbName}>{team.name}</span>
              <span style={s.lbScore}>{team.score || 0}</span>
            </div>
          ))}

          <div style={s.myScore}>
            <div style={s.myScoreRow}>
              <span>👥 Team</span>
              <span style={{ color: "#6366f1", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 110 }}>{teamName}</span>
            </div>
            <div style={s.myScoreRow}>
              <span>✅ Score</span>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>{Object.keys(correct).length}/{QUESTIONS.length}</span>
            </div>
            <div style={s.myScoreRow}>
              <span>⏱ Time</span>
              <span style={{ color: isRed ? "#ef4444" : "#334155", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{mins}:{secs}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  * { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  input { -webkit-user-select: text; user-select: text; }
  body { background: #f1f5f9; font-family: 'DM Sans', sans-serif; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.55; } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes popIn { 0% { transform:scale(0.85); opacity:0; } 60% { transform:scale(1.04); } 100% { transform:scale(1); opacity:1; } }
  input:focus { outline: none; }
  button:hover:not(:disabled) { opacity: 0.85; transition: opacity 0.15s; }
  button:disabled { opacity: 0.35; cursor: not-allowed; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
`;

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(140deg, #ddd6fe 0%, #e0f2fe 50%, #dcfce7 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 20,
  },
  loadingCard: {
    background: "#fff", borderRadius: 20, padding: "52px 44px", textAlign: "center",
    boxShadow: "0 12px 48px rgba(99,102,241,0.13)", animation: "popIn 0.35s ease", minWidth: 280,
  },
  spinner: {
    width: 44, height: 44, border: "4px solid #e0e7ff", borderTopColor: "#6366f1",
    borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px",
  },
  loadingText: { color: "#1e293b", fontWeight: 700, fontSize: 16, marginBottom: 6 },
  loadingSubText: { color: "#94a3b8", fontSize: 13 },
  joinCard: {
    background: "#fff", borderRadius: 24, padding: "28px 36px 24px", width: "100%", maxWidth: 440,
    textAlign: "center", boxShadow: "0 12px 48px rgba(99,102,241,0.13)", animation: "popIn 0.4s ease", display: "flex",
    flexDirection: "column",
  },
  snakeBadge: { fontSize: 48, marginBottom: 0, display: "block", filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.25))" },
  joinTitle: {
    color: "#64135cff",
    fontSize: 54,
    fontWeight: 900,
    letterSpacing: "-1.5px",
    marginBottom: 0,
    lineHeight: "1",
    textTransform: "uppercase",
    // gradient lines hataao — ye teeno remove karo:
    // background: "linear-gradient(...)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
  },
  joinChallenge: {
    color: "#475569",       // Standard dark slate text
    fontSize: 11,          // Medium text size
    fontWeight: 700,
    letterSpacing: "5px",   // Spaced out effect
    marginTop: 6,
    marginBottom: 10,
    textTransform: "uppercase"
  },
  joinSub: { color: "#64748b", fontSize: 13, marginBottom: 10 },
  deptBadge: {
    display: "inline-block", background: "linear-gradient(90deg,#ede9fe,#e0e7ff)",
    color: "#6366f1", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 20, marginBottom: 16, border: "1px solid #c7d2fe",
  },
  inputWrapper: { position: "relative", marginBottom: 12 },
  inputIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" },
  joinInput: {
    width: "100%", padding: "13px 16px 13px 42px", background: "#f8fafc", border: "1.5px solid #e2e8f0",
    borderRadius: 12, color: "#1e293b", fontSize: 15, fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s",
  },
  errorText: { color: "#ef4444", fontSize: 12, marginBottom: 8, textAlign: "left" },
  joinBtn: {
    width: "100%", padding: "13px", background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
  },
  infoRow: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" },
  infoChip: { background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#64748b", fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20 },
  quizLayout: { display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "'DM Sans', sans-serif" },
  questionPanel: { flex: 1, padding: "28px 36px", overflowY: "auto", maxWidth: "calc(100% - 284px)" },
  sidebar: {
    width: 272, background: "#fff", borderLeft: "1px solid #e2e8f0", padding: 20, overflowY: "auto",
    position: "sticky", top: 0, height: "100vh", boxShadow: "-2px 0 16px rgba(0,0,0,0.05)",
  },
  qHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  qNumPill: { display: "flex", alignItems: "baseline", gap: 4, background: "#eef2ff", padding: "6px 16px", borderRadius: 20, border: "1.5px solid #c7d2fe" },
  qNumLabel: { color: "#6366f1", fontWeight: 600, fontSize: 13 },
  qNumVal: { color: "#312e81", fontWeight: 800, fontSize: 18 },
  qTotal: { color: "#94a3b8", fontWeight: 400, fontSize: 13 },
  timer: { fontSize: 20, fontWeight: 800, fontFamily: "'DM Mono', monospace", padding: "6px 16px", borderRadius: 20, border: "1.5px solid", transition: "color 0.5s, background 0.5s, border-color 0.5s" },
  progressRow: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 22 },
  dot: { width: 15, height: 15, borderRadius: 4, cursor: "pointer", transition: "background 0.2s, transform 0.15s, box-shadow 0.15s" },
  riddleBox: { background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "18px 22px", marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  riddleHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  riddleIcon: { fontSize: 18 },
  riddleLabel: { color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" },
  riddleText: { color: "#334155", fontSize: 15, lineHeight: 1.8 },
  hintBox: { background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 16px", marginBottom: 24 },
  hintLabel: { color: "#d97706", fontWeight: 700, fontSize: 13 },
  hintText: { color: "#78716c", fontSize: 13 },
  hangmanRow: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20, alignItems: "center" },
  letterBox: { width: 40, height: 48, border: "2px solid #cbd5e1", borderRadius: 10, textAlign: "center", fontSize: 17, fontWeight: 700, fontFamily: "'DM Mono', monospace", cursor: "text", transition: "all 0.15s", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" },
  hangmanSpace: { width: 16 },
  feedbackGreen: { padding: "11px 18px", background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, color: "#16a34a", fontSize: 14, fontWeight: 600, marginBottom: 12, animation: "fadeIn 0.2s ease" },
  feedbackRed: { padding: "11px 18px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, color: "#dc2626", fontSize: 14, fontWeight: 600, marginBottom: 12, animation: "fadeIn 0.2s ease" },
  feedbackOrange: { padding: "11px 18px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, color: "#ea580c", fontSize: 14, fontWeight: 600, marginBottom: 12 },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  navBtn: { padding: "10px 22px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, color: "#475569", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  solvedPill: { background: "#eef2ff", border: "1.5px solid #c7d2fe", padding: "6px 16px", borderRadius: 20, display: "flex", alignItems: "baseline", gap: 4 },
  solvedNum: { color: "#6366f1", fontWeight: 800, fontSize: 16 },
  solvedDen: { color: "#94a3b8", fontSize: 12 },
  sidebarHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14, borderBottom: "1.5px solid #f1f5f9", paddingBottom: 12 },
  lbTitle: { color: "#1e293b", fontSize: 15, fontWeight: 800 },
  lbRow: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 4, transition: "background 0.2s" },
  lbName: { flex: 1, color: "#334155", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  lbScore: { color: "#6366f1", fontWeight: 800, fontSize: 15 },
  myScore: { marginTop: 18, padding: "14px", background: "#f8fafc", borderRadius: 12, fontSize: 12, color: "#64748b", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 8 },
  myScoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  endPage: { minHeight: "100vh", background: "linear-gradient(140deg, #ddd6fe 0%, #e0f2fe 50%, #dcfce7 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  endCard: { background: "#fff", borderRadius: 24, padding: "44px 40px", width: "100%", maxWidth: 520, textAlign: "center", boxShadow: "0 12px 48px rgba(99,102,241,0.13)", animation: "popIn 0.5s ease" },
  trophyRing: { fontSize: 64, marginBottom: 10, display: "block", filter: "drop-shadow(0 6px 16px rgba(217,119,6,0.3))" },
  endTitle: { fontSize: 30, fontWeight: 800, color: "#1e293b", marginBottom: 6 },
  endSub: { color: "#64748b", fontSize: 14, marginBottom: 12 },
  myRankBadge: { display: "inline-block", background: "#eef2ff", color: "#6366f1", fontSize: 13, fontWeight: 600, padding: "6px 18px", borderRadius: 20, border: "1.5px solid #c7d2fe", marginBottom: 20 },
  endList: { display: "flex", flexDirection: "column", gap: 10 },
  endRow: { display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderRadius: 14, transition: "transform 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
};