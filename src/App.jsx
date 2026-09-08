import { useState } from "react";
import jsPDF from "jspdf";

function App() {
  const studentName = "Team Titans";
  const [completed, setCompleted] = useState([]);const [verificationId, setVerificationId] = useState("");
const [verified, setVerified] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const skills = [
    {
      id: 1,
      title: "Prompt Engineering",
      level: "🟢 Beginner",
      icon: "🤖",
      question: "Improve this prompt: Tell me about Artificial Intelligence.",
    },
    {
      id: 2,
      title: "Python Basics",
       level: "🟡 Intermediate",
      icon: "🐍",
      question: "Write Python code to print Hello World.",
    },
    {
      id: 3,
      title: "Data Visualization",
      level: "🔴 Advanced",
      icon: "📊",
      question: "Name one chart used to compare different categories.",
    },
  ];

  const startChallenge = (skill) => {
    setSelectedSkill(skill);
    setAnswer("");
    setSubmitted(false);
  };

  const submitChallenge = () => {
    if (answer.trim() === "") {
      alert("Please enter an answer.");
      return;
    }

    if (!completed.includes(selectedSkill.id)) {
      setCompleted([...completed, selectedSkill.id]);
    }

    setSubmitted(true);
  };

  const xp = completed.length * 50;
  const streak = completed.length > 0 ? 1 : 0;
  const badge =
  completed.length === 0
    ? "No badge yet"
    : completed.length === 1
    ? "🥉 First Step"
    : completed.length === 2
    ? "🥈 Skill Builder"
    : "🥇 Micro-Skill Master";
  const progress = (completed.length / skills.length) * 100;

  return (
    <div style={styles.page}>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1>🚀 SkillBridge</h1>
          <p>Learn • Practice • Prove • Get Hired 🚀</p>
        </div>

        <div style={styles.xp}>
          ⭐ {xp} XP
        </div>
      </header>

      <main style={styles.container}>

        {/* Welcome */}
        <section style={styles.welcome}>
          <h2>Turn 5 Minutes a Day Into Real Skills 🎯</h2>
          <p>
          Complete practical challenges, earn XP and badges, and build a verifiable skill portfolio.
          </p>
        </section>

        {/* Progress */}
        <section style={styles.progressCard}>
          <h2>📊 Your Progress</h2>
          <p>🔥 Daily Streak: {streak} Day</p>

          <p>
            {completed.length} / {skills.length} challenges completed
          </p>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.progress,
                width: `${progress}%`,
              }}
            />
          </div>

          <p>⭐ Total XP: {xp}</p>
        </section>

        {/* Skills */}
        <h2>🎯 Choose a Micro-Skill</h2>

        <div style={styles.cards}>

          {skills.map((skill) => (
            <div style={styles.card} key={skill.id}>

              <div style={styles.icon}>
                {skill.icon}
              </div>

              <h3>{skill.title}</h3>

              <p>⏱ 5-minute interactive challenge</p>
              <p>{skill.level}</p>

              <button
                style={styles.button}
                onClick={() => startChallenge(skill)}
              >
                Start Challenge →
              </button>

            </div>
          ))}

        </div>

        {/* Challenge */}
        {selectedSkill && (
          <section style={styles.challenge}>

            <button
              style={styles.close}
              onClick={() => setSelectedSkill(null)}
            >
              ✕
            </button>

            <div style={styles.bigIcon}>
              {selectedSkill.icon}
            </div>

            <h2>{selectedSkill.title}</h2>

            <p style={styles.label}>
              5-MINUTE CHALLENGE
            </p>

            <div style={styles.question}>
              <strong>Your Challenge:</strong>
              <p>{selectedSkill.question}</p>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={styles.textarea}
            />

            <button
              style={styles.submit}
              onClick={submitChallenge}
            >
              Submit Answer 🚀
            </button>

            {submitted && (
              <div style={styles.result}>
                <h2>🎉 Challenge Completed!</h2>

                <p>⭐ You earned 50 XP</p>

                <div style={styles.badge}>
                  🏆 Micro-Skill Badge Unlocked
                </div>
              </div>
            )}

          </section>
        )}

        {/* Badges */}
        <section style={styles.badges}>
          <h2>🏆 Your Badges</h2>
          <h2>📄 My Skill Portfolio</h2>
          <div style={styles.certificate}>
  <h2>🏆 Micro-Skill Achievement</h2>
  <button
  onClick={() => {
  const doc = new jsPDF();

doc.setFontSize(24);
doc.text(studentName, 105, 40, { align: "center" });

doc.setFontSize(20);
doc.text("MICRO-SKILL ACHIEVEMENT", 105, 60, { align: "center" });

doc.setFontSize(16);
doc.text("Certificate of Completion", 105, 80, { align: "center" });

doc.setFontSize(14);
doc.text(`Skill: ${selectedSkill ? selectedSkill.title : "Prompt Engineering"}`, 30, 110);
doc.text(
  `Status: ${completed.length > 0 ? "Completed" : "Not Completed"}`,
  30,
  120
);
doc.text(`XP Earned: ${xp}`, 30, 140);
doc.text(`Verification ID: ${verificationId || "TT-PE-2026-001"}`, 30, 160);

doc.text(
  "Congratulations on completing the challenge!",
  30,
  165
);

doc.save("Team-Titans-Certificate.pdf");
}}
  style={styles.submit}
>
  📥 Download Certificate
</button>
  <h3>Team Titans</h3>
  <p>Skill: Prompt Engineering</p>
  <p>Status: ✅ Completed</p>
  <p>⭐ XP Earned: 50</p>
</div>
          <div style={styles.portfolioCard}>
  <h3>🎓 {studentName}'s Skill Portfolio</h3>

  <p>
  🤖 Prompt Engineering —{" "}
  {completed.includes(1) ? "✅ Completed" : "⏳ Not completed"}
</p>
  <p>
  🐍 Python Basics —{" "}
  {completed.includes(2) ? "✅ Completed" : "⏳ Not completed"}
</p>
 <p>
  📊 Data Visualization —{" "}
  {completed.includes(3) ? "✅ Completed" : "⏳ Not completed"}
</p>

  <h3>⭐ Total XP: {xp}</h3>

  <h3>🏆 Badge: {badge}</h3>
</div>
    <button
  onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    alert("✅ Portfolio link copied successfully!");
  }}
  style={styles.button}
>
  🔗 Share My Portfolio
</button>
          <p>{badge}</p>

          <div style={styles.badge}>
  🏆 {badge}
</div>
        </section>

      </main>

      <footer style={styles.footer}>
        <section style={styles.verify}>
  <h2>🔎 Verify Certificate</h2>
  <p>Enter a Verification ID to check a certificate.</p>

  <input
  value={verificationId}
  onChange={(e) => setVerificationId(e.target.value)}
  placeholder="Example: TT-PE-2026-001"
  style={styles.input}
/>

 <button
  style={styles.button}
  onClick={() => {
    if (verificationId === "TT-PE-2026-001") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }}
>
  Verify Certificate
</button>
{verified && (
  <div>
    <p>✅ Certificate Verified!</p>
    <p>🎓 Certificate ID: TT-PE-2026-001</p>
    <p>👤 Name: Lavanya</p>
    <p>💡 Skill: Prompt Engineering</p>
    <p>📅 Completion Year: 2026</p>
  </div>
)}
{verificationId && !verified && (
  <div>
    <p>❌ Certificate Not Found</p>
    <p>Please check the Verification ID and try again.</p>
  </div>
)}
</section>
        SkillBridge © 2026
      </footer>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
  },

  header: {
    background: "#4f46e5",
    color: "white",
    padding: "25px 8%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  xp: {
    background: "white",
    color: "#4f46e5",
    padding: "12px 18px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  container: {
    width: "85%",
    maxWidth: "1100px",
    margin: "30px auto",
  },

  welcome: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "25px",
  },

  progressCard: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  progressBackground: {
    height: "15px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    background: "#4f46e5",
    transition: "0.4s",
  },

  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    width: "260px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  icon: {
    fontSize: "40px",
  },

  bigIcon: {
    fontSize: "50px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  },

  challenge: {
    position: "relative",
    background: "white",
    marginTop: "35px",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  close: {
    position: "absolute",
    right: "20px",
    top: "20px",
    border: "none",
    background: "#eee",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },

  label: {
    color: "#4f46e5",
    fontWeight: "bold",
  },

  question: {
    background: "#f4f7fb",
    padding: "20px",
    borderRadius: "15px",
    margin: "20px 0",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  submit: {
    marginTop: "15px",
    padding: "13px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  result: {
    marginTop: "25px",
    padding: "25px",
    background: "#ecfdf5",
    borderRadius: "15px",
    textAlign: "center",
  },

  badge: {
    display: "inline-block",
    padding: "15px 20px",
    background: "#fff3cd",
    borderRadius: "15px",
    fontWeight: "bold",
  },

  badges: {
    background: "white",
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
  },

  footer: {
    marginTop: "50px",
    padding: "25px",
    textAlign: "center",
    background: "#111827",
    color: "white",
  },
};

export default App;