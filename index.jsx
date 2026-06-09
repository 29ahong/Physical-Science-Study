import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "motion", label: "Motion" },
  { id: "forces", label: "Forces" },
  { id: "workenergy", label: "Work & Energy" },
  { id: "electricity", label: "Electricity" },
  { id: "circuits", label: "Circuits" },
  { id: "waves", label: "Waves & Light" },
  { id: "matter", label: "Matter & Atoms" },
  { id: "periodic", label: "Periodic Table" },
  { id: "bonds", label: "Bonding" },
  { id: "reactions", label: "Reactions" },
  { id: "quiz", label: "Practice Quiz" },
];

const quizQuestions = [
  { q: "A runner goes from 6 m/s to 10 m/s in 4 seconds. What is the acceleration?", opts: ["0.5 m/s²", "1 m/s²", "4 m/s²", "2.5 m/s²"], ans: 1, exp: "a = (10−6)/4 = 4/4 = 1 m/s²" },
  { q: "Which is a VECTOR quantity?", opts: ["Speed", "Distance", "Mass", "Velocity"], ans: 3, exp: "Velocity has both magnitude and direction — that makes it a vector." },
  { q: "A 750 kg car has a net force of 900 N. What is its acceleration?", opts: ["1.2 m/s²", "0.83 m/s²", "8.3 m/s²", "120 m/s²"], ans: 0, exp: "F = ma → a = F/m = 900/750 = 1.2 m/s²" },
  { q: "In a series circuit with RT = 1000 Ω and VT = 10 V, what is total current?", opts: ["10 A", "100 A", "0.01 A", "0.1 A"], ans: 2, exp: "I = V/R = 10/1000 = 0.01 A. Current is the same everywhere in series." },
  { q: "In a parallel circuit, which quantity is equal across all branches?", opts: ["Current", "Resistance", "Voltage", "Power"], ans: 2, exp: "In parallel: V₁ = V₂ = V₃ = VT. Voltage is always equal across branches." },
  { q: "A 74 kg skydiver falls at 52 m/s. What is the kinetic energy?", opts: ["3848 J", "100,048 J", "7696 J", "200,096 J"], ans: 1, exp: "KE = ½mv² = 0.5 × 74 × 52² = 0.5 × 74 × 2704 ≈ 100,048 J" },
  { q: "What is the molar mass of Cl₂?", opts: ["35.5 g/mol", "17.5 g/mol", "71 g/mol", "53 g/mol"], ans: 2, exp: "Cl atomic mass = 35.5. Cl₂ = 2 × 35.5 = 71 g/mol" },
  { q: "Iron(III) Oxide has the formula:", opts: ["FeO", "Fe₂O", "FeO₃", "Fe₂O₃"], ans: 3, exp: "Fe³⁺ and O²⁻ — crisscross charges → Fe₂O₃. Check: 2(+3) + 3(−2) = 0 ✓" },
  { q: "Which is a chemical change?", opts: ["Ice melting", "Salt dissolving", "Rust forming on iron", "Glass breaking"], ans: 2, exp: "Rust = iron + oxygen forming a new substance. The others are physical changes." },
  { q: "In Rutherford's gold foil experiment, alpha particles that bounced back struck:", opts: ["Electrons", "The electron cloud", "The nucleus", "Empty space"], ans: 2, exp: "The rare particles that bounced back hit the tiny, dense nucleus in the center." },
  { q: "Which wave type has compressions and rarefactions?", opts: ["Transverse", "Electromagnetic", "Longitudinal", "Standing"], ans: 2, exp: "Longitudinal waves vibrate parallel to travel direction. Sound is longitudinal." },
  { q: "Efficiency formula for a machine:", opts: ["IMA/AMA × 100%", "Work output / Work input × 100%", "Input force / Output force × 100%", "Output distance / Input distance × 100%"], ans: 1, exp: "Efficiency = (Work output / Work input) × 100%. Always < 100% due to friction." },
];

function Tag({ children, color }) {
  const colors = {
    phys: { bg: "#EBF4FF", text: "#1E6FCC" },
    chem: { bg: "#E6F7EF", text: "#0E6E47" },
    warn: { bg: "#FFF8E6", text: "#8A5C00" },
    info: { bg: "#EBF4FF", text: "#1E6FCC" },
    success: { bg: "#E6F7EF", text: "#0E6E47" },
  };
  const c = colors[color] || colors.info;
  return (
    <span style={{ background: c.bg, color: c.text, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, marginRight: 4, display: "inline-block", marginBottom: 2 }}>
      {children}
    </span>
  );
}

function InfoBox({ children, type = "info" }) {
  const styles = {
    info: { bg: "#EBF4FF", border: "#90C2F5", text: "#1E5FA0" },
    warn: { bg: "#FFF8E6", border: "#F5CC6E", text: "#7A4F00" },
    success: { bg: "#E6F7EF", border: "#5FCC9A", text: "#0A5C38" },
    danger: { bg: "#FEF0F0", border: "#F5ABAB", text: "#8B1A1A" },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 14px", margin: "8px 0", fontSize: 13, color: s.text, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function Formula({ children, block = false }) {
  const style = {
    fontFamily: "monospace", background: "#F3F4F6", padding: block ? "8px 12px" : "2px 8px",
    borderRadius: 6, fontSize: 13, display: block ? "block" : "inline-block",
    margin: block ? "8px 0" : "2px", color: "#1a1a1a",
  };
  return <span style={style}>{children}</span>;
}

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ background: "#F3F4F6", padding: "7px 10px", textAlign: "left", fontWeight: 600, border: "1px solid #E5E7EB" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "6px 10px", border: "1px solid #E5E7EB", color: "#374151" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10, color: "#111" }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: "#374151" }}>{children}</div>
    </div>
  );
}

function OverviewPage() {
  const formulas = [
    ["Speed", "v = d/t"], ["Acceleration", "a = Δv/t"], ["Newton's 2nd", "F = ma"],
    ["Weight", "W = mg"], ["Momentum", "p = mv"], ["Work", "W = Fd"],
    ["Power", "P = W/t"], ["KE", "KE = ½mv²"], ["PE (gravity)", "PE = mgh"],
    ["Ohm's law", "V = IR"], ["Elec. power", "P = IV"], ["Wave speed", "v = fλ"],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <Card title="Physics topics">
          <p><Tag color="phys">Ch 2</Tag> Motion — speed, velocity, acceleration</p>
          <p><Tag color="phys">Ch 3</Tag> Forces — Newton's laws, friction, momentum</p>
          <p><Tag color="phys">Ch 4</Tag> Work, power, machines, energy</p>
          <p><Tag color="phys">Ch 6</Tag> Electricity — Ohm's law, circuits</p>
          <p><Tag color="phys">Ch 9-12</Tag> Waves, sound, light</p>
        </Card>
        <Card title="Chemistry topics">
          <p><Tag color="chem">Ch 15</Tag> Matter — mixtures, changes</p>
          <p><Tag color="chem">Ch 16/17</Tag> Atomic structure, isotopes</p>
          <p><Tag color="chem">Ch 16/17</Tag> Periodic table — trends, groups</p>
          <p><Tag color="chem">Ch 18</Tag> Chemical bonds & formulas</p>
          <p><Tag color="chem">Ch 19</Tag> Reactions — balancing, types</p>
        </Card>
      </div>
      <Card title="Master formula sheet">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {formulas.map(([label, f]) => (
            <div key={label} style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px", textAlign: "center", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "#111" }}>{f}</div>
            </div>
          ))}
        </div>
      </Card>
      <InfoBox type="warn">
        <strong>2-day study plan:</strong> Day 1 → Physics (Motion → Forces → Work/Energy → Electricity → Circuits → Waves). Day 2 → Chemistry (Matter → Atoms → Periodic Table → Bonding → Reactions) + Quiz. Don't forget Bio!
      </InfoBox>
    </div>
  );
}

function MotionPage() {
  return (
    <div>
      <Card title="Reference frames, distance vs. displacement">
        <p>Motion looks different depending on your <strong>frame of reference</strong>. A person on a train and one on a platform see the same ball move differently.</p>
        <p style={{ marginTop: 8 }}><strong>Distance</strong> = total path traveled (scalar — no direction). <strong>Displacement</strong> = straight-line distance from start to end, with direction (vector).</p>
        <InfoBox>Walk 3 km east then 3 km west: Distance = 6 km. Displacement = 0 km (back at start).</InfoBox>
      </Card>
      <Card title="Speed vs. velocity">
        <p><strong>Speed</strong> = how fast (scalar). <Formula>v = d/t</Formula> — units: m/s or km/h.</p>
        <p style={{ marginTop: 6 }}><strong>Velocity</strong> = speed + direction (vector). "60 mph north" = velocity. "60 mph" = speed.</p>
        <p style={{ marginTop: 6 }}>A car's speedometer shows <strong>instantaneous speed</strong>. Average speed = total distance ÷ total time.</p>
        <p style={{ marginTop: 6 }}><strong>On a distance-time graph:</strong> straight line = constant speed · curved line = accelerating · steeper slope = faster.</p>
        <p style={{ marginTop: 6 }}>Adding two velocities = <strong>vector addition</strong>. The result = the <strong>resultant vector</strong>.</p>
      </Card>
      <Card title="Acceleration">
        <p>Acceleration = any change in velocity — speeding up, slowing down, or changing direction.</p>
        <Formula block>a = (v_final − v_initial) / t</Formula>
        <p>Units: m/s². Free-fall: <strong>9.8 m/s²</strong> downward. An object in a circle accelerates because its direction keeps changing.</p>
        <InfoBox type="warn">Deceleration is still acceleration — it's just negative.</InfoBox>
        <InfoBox type="success">Practice: 6 m/s → 10 m/s in 4 s. a = (10−6)/4 = <strong>1 m/s²</strong></InfoBox>
      </Card>
      <Card title="Projectile motion">
        <p>A thrown object follows a curved path. Gravity pulls it down while horizontal velocity stays constant. A javelin's path is an example.</p>
      </Card>
    </div>
  );
}

function ForcesPage() {
  return (
    <div>
      <Card title="What is a force?">
        <p>A force is a push or pull — a vector with magnitude and direction. The <strong>net force</strong> = sum of all forces. If net force = 0, forces are <strong>balanced</strong> and the object doesn't accelerate.</p>
      </Card>
      <Card title="Newton's 3 Laws — most tested material">
        <p><strong>1st Law (Inertia):</strong> An object at rest stays at rest; moving stays moving — unless net force acts on it. <strong>Inertia</strong> = resistance to change. This is why you lurch forward in a crash — your body keeps moving when the car stops.</p>
        <p style={{ marginTop: 8 }}><strong>2nd Law:</strong> <Formula>F = ma</Formula> — more force = more acceleration; more mass = less acceleration for same force.</p>
        <p style={{ marginTop: 8 }}><strong>3rd Law (Action-Reaction):</strong> Every action has an equal and opposite reaction. Push a wall → wall pushes back equally.</p>
        <InfoBox type="success">Practice: 0.20 kg plane at 12 m/s². F = 0.20 × 12 = <strong>2.4 N</strong></InfoBox>
      </Card>
      <Card title="Friction & gravity">
        <p><strong>Friction</strong> opposes motion between surfaces. <strong>Static friction</strong> (object still) is greater than <strong>sliding friction</strong> (already moving) — harder to start than to keep sliding.</p>
        <p style={{ marginTop: 6 }}><strong>Weight</strong> = force of gravity. <Formula>W = mg</Formula> where g = 9.8 m/s².</p>
        <p style={{ marginTop: 6 }}>Falling object: gravity (down) + air resistance (up). When balanced → <strong>terminal velocity</strong>, net force = 0.</p>
        <InfoBox type="success">Practice: Baby 4.2 kg. W = 4.2 × 9.8 = <strong>41.2 N</strong></InfoBox>
      </Card>
      <Card title="Momentum">
        <Formula block>p = mv   (momentum = mass × velocity)</Formula>
        <p>Units: kg·m/s. Momentum is a vector. In a closed system, total momentum is <strong>conserved</strong> — what one loses, the other gains.</p>
        <InfoBox type="success">Practice: 32 kg canoe at 2.5 m/s. p = 32 × 2.5 = <strong>80 kg·m/s</strong></InfoBox>
      </Card>
    </div>
  );
}

function WorkEnergyPage() {
  return (
    <div>
      <Card title="Work & power">
        <p><Formula>W = F × d</Formula> — Work only happens when force moves an object in the direction of force. Force perpendicular to motion = no work.</p>
        <p style={{ marginTop: 6 }}><Formula>P = W/t</Formula> — Power = how fast work is done. Units: watts (W). 1 W = 1 J/s. Horsepower is also a unit of power.</p>
        <InfoBox type="success">Worker pushes 220 N over 10 m: W = 220 × 10 = <strong>2200 J</strong></InfoBox>
        <InfoBox type="success">Girl lifts 100 N, 2 m in 0.5 s: P = (100×2)/0.5 = <strong>400 W</strong></InfoBox>
      </Card>
      <Card title="Simple machines">
        <p>A machine changes a force. Efficiency is always less than 100% due to friction.</p>
        <Formula block>IMA = input distance / output distance</Formula>
        <Formula block>AMA = output force / input force</Formula>
        <Formula block>Efficiency = (Work output / Work input) × 100%</Formula>
        <InfoBox type="success">IMA: Input 6 m, output 0.5 m → IMA = 6/0.5 = <strong>12</strong></InfoBox>
        <InfoBox type="success">AMA: 30 N out / 16 N in = <strong>1.9</strong></InfoBox>
        <InfoBox type="success">Efficiency: 32 J / (12 × 0.3) = 32/3.6 = <strong>89%</strong></InfoBox>
        <Table
          headers={["Lever class", "What's in the middle", "Example"]}
          rows={[
            ["1st class", "Fulcrum", "Seesaw, crowbar"],
            ["2nd class", "Resistance (load)", "Wheelbarrow, bottle opener"],
            ["3rd class", "Effort force", "Tweezers, baseball bat — IMA always < 1"],
          ]}
        />
        <p style={{ marginTop: 6 }}>A screw = inclined plane wrapped around a cylinder.</p>
      </Card>
      <Card title="Kinetic & potential energy">
        <Formula block>KE = ½mv²</Formula>
        <Formula block>PE = mgh</Formula>
        <p><strong>Mechanical energy</strong> = KE + PE. Elastic PE = energy stored in a stretched/compressed object.</p>
        <p style={{ marginTop: 6 }}><strong>Conservation of energy:</strong> energy can't be created or destroyed, only converted. Pendulum: max KE at bottom, max PE at top, KE = 0 at both extreme ends (A and E).</p>
        <InfoBox type="success">KE: 74 kg at 52 m/s → KE = ½(74)(2704) = <strong>100,048 J</strong></InfoBox>
        <InfoBox type="success">Dog jumps 1.1 m: KE = mgh = 7.7 × 9.8 × 1.1 = <strong>83 J</strong></InfoBox>
      </Card>
    </div>
  );
}

function ElectricityPage() {
  return (
    <div>
      <Card title="Static electricity & charges">
        <p>Two types of charge: positive and negative. Like charges repel; opposite charges attract. Electric force is directly proportional to charge and inversely proportional to distance squared.</p>
        <p style={{ marginTop: 8 }}><strong>3 ways to charge:</strong> friction (rubbing transfers electrons), conduction (direct contact), induction (nearby charge rearranges electrons without touching).</p>
        <p style={{ marginTop: 8 }}><strong>Static discharge</strong> = charge suddenly flows (lightning, doorknob shock). <strong>Grounding</strong> = transferring excess charge to Earth.</p>
      </Card>
      <Card title="Current, voltage, resistance — Ohm's law">
        <Table
          headers={["Quantity", "Symbol", "Unit", "What it means"]}
          rows={[
            ["Current", "I", "Ampere (A)", "Flow of electric charge"],
            ["Voltage", "V", "Volt (V)", "Pressure pushing current; potential difference"],
            ["Resistance", "R", "Ohm (Ω)", "Opposition to current flow"],
            ["Power", "P", "Watt (W)", "Rate of energy use"],
          ]}
        />
        <Formula block>Ohm's Law:  V = I × R</Formula>
        <Formula block>Power:  P = I × V</Formula>
        <p>Conductors (copper, metals) = low resistance. Insulators (wood, rubber, plastic) = high resistance. A <strong>superconductor</strong> has near-zero resistance when cooled.</p>
        <InfoBox>A complete, closed path for current = a <strong>circuit</strong>. Current only flows in a closed circuit. Conventional current flows in the direction positive charges would move.</InfoBox>
      </Card>
    </div>
  );
}

function CircuitsPage() {
  return (
    <div>
      <Card title="Series circuit rules">
        <p>One path only. If one component breaks, the whole circuit stops.</p>
        <Table
          headers={["Property", "Rule", "Example (R1=100Ω, R2=500Ω, R3=400Ω, VT=10V)"]}
          rows={[
            ["Current", "Same everywhere: IT = I1 = I2 = I3", "IT = V/RT = 10/1000 = 0.01 A"],
            ["Voltage", "Splits: V1+V2+V3 = VT", "V1=1V, V2=5V, V3=4V"],
            ["Resistance", "Adds: RT = R1+R2+R3", "RT = 100+500+400 = 1000 Ω"],
            ["Power", "P = IV per resistor", "P1=0.01W, P2=0.05W, PT=0.1W"],
          ]}
        />
      </Card>
      <Card title="Parallel circuit rules">
        <p>Multiple paths. If one branch breaks, others keep working.</p>
        <Table
          headers={["Property", "Rule", "Example (R1=90Ω, R2=45Ω, R3=180Ω, VT=9V)"]}
          rows={[
            ["Voltage", "Same everywhere: VT = V1 = V2 = V3", "Each branch = 9V"],
            ["Current", "Splits: IT = I1+I2+I3", "I1=0.1A, I2=0.2A, I3=0.05A, IT=0.35A"],
            ["Resistance", "1/RT = 1/R1+1/R2+1/R3", "RT ≈ 26 Ω"],
            ["Power", "P = IV per branch", "P1=0.9W, P2=1.8W, PT=3.2W"],
          ]}
        />
        <InfoBox type="warn">In parallel, RT is always LESS than the smallest resistor. More paths = less total resistance.</InfoBox>
      </Card>
      <Card title="Step-by-step circuit problem strategy">
        <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, color: "#374151" }}>
          <li>Identify: series or parallel?</li>
          <li>Find RT (add for series; use 1/RT formula for parallel)</li>
          <li>Find total current: I = V/RT</li>
          <li>Use rules to find each component's V and I</li>
          <li>Find power: P = IV for each component</li>
        </ol>
        <InfoBox>Parallel RT tip: find common denominator. 1/90 + 1/45 + 1/180 = 2/180 + 4/180 + 1/180 = 7/180 → RT = 180/7 ≈ 25.7 Ω</InfoBox>
      </Card>
    </div>
  );
}

function WavesPage() {
  return (
    <div>
      <Card title="Wave properties">
        <p>Waves transfer energy, not matter. All waves have amplitude, wavelength, and frequency.</p>
        <Table
          headers={["Property", "Definition", "Units"]}
          rows={[
            ["Amplitude", "Greatest displacement from rest — more amplitude = more energy", "meters"],
            ["Wavelength (λ)", "Distance from crest to crest (or trough to trough)", "meters"],
            ["Frequency (f)", "Number of waves per second", "hertz (Hz)"],
            ["Wave speed (v)", "v = fλ", "m/s"],
          ]}
        />
        <Table
          headers={["Type", "Vibration direction", "Has", "Example"]}
          rows={[
            ["Transverse", "Perpendicular to travel", "Crests & troughs", "Rope wave, light"],
            ["Longitudinal", "Parallel to travel", "Compressions & rarefactions", "Sound"],
          ]}
        />
        <InfoBox type="success">Practice: f = 9.4×10⁹ Hz, v = 3×10⁸ m/s → λ = v/f = <strong>0.032 m</strong></InfoBox>
      </Card>
      <Card title="Reflection, refraction & interference">
        <p><strong>Reflection:</strong> wave bounces off surface. Angle of incidence = angle of reflection (both measured from the normal — a line perpendicular to the surface).</p>
        <p style={{ marginTop: 6 }}><strong>Refraction:</strong> wave bends entering a new medium at an angle (one end changes speed first). Light slows down leaving a vacuum. Mirages = light refracting through hot air layers.</p>
        <p style={{ marginTop: 6 }}><strong>Constructive interference:</strong> waves combine → bigger wave (crests align).</p>
        <p style={{ marginTop: 6 }}><strong>Standing waves:</strong> appear stationary. Nodes = zero displacement points. Resonance = standing waves between piano strings and soundboard.</p>
        <p style={{ marginTop: 6 }}><strong>Doppler effect:</strong> perceived change in pitch/frequency when source or observer is moving (the train whistle example).</p>
      </Card>
      <Card title="Sound">
        <p>Sound = longitudinal wave. Loudness measured in <strong>decibels</strong>. Pitch = frequency. The number of half-wavelengths that fit in a guitar string determines pitch. Outer ear collects and focuses sound.</p>
      </Card>
      <Card title="Light & the electromagnetic spectrum">
        <p>Light = transverse wave. EM waves travel through a vacuum at <strong>3.00 × 10⁸ m/s</strong>.</p>
        <p style={{ marginTop: 6 }}>EM spectrum (low → high frequency): radio → microwave → <strong>infrared</strong> → <strong>visible light</strong> → ultraviolet → X-ray → <strong>gamma rays</strong> (shortest wavelength).</p>
        <Table
          headers={["Material", "What it does to light"]}
          rows={[
            ["Transparent", "Transmits almost all light"],
            ["Translucent", "Scatters some light (milk, fog)"],
            ["Opaque", "Blocks light"],
          ]}
        />
        <p>White light through prism → splits into colors because each color travels at a different speed (different frequency). Combining primary pigments equally = black. Mixing complementary light colors = white.</p>
        <p style={{ marginTop: 6 }}>Plane mirror → virtual image (appears behind mirror). Curved/concave mirror can make real images (projectable on screen). Higher index of refraction → more likely total internal reflection (fiber optics).</p>
      </Card>
    </div>
  );
}

function MatterPage() {
  return (
    <div>
      <Card title="Classification of matter">
        <Table
          headers={["Type", "Key feature", "Examples"]}
          rows={[
            ["Element", "Only one type of atom", "Gold, oxygen, carbon"],
            ["Compound", "Fixed ratio of 2+ elements", "H₂O, NaCl, CO₂"],
            ["Homogeneous mixture", "Same throughout (solution)", "Saltwater, air, lemonade"],
            ["Heterogeneous mixture", "Parts visibly different", "Salad, granite, trail mix"],
            ["Suspension", "Scatters light; particles settle", "Muddy water, OJ with pulp"],
            ["Colloid", "Scatters light; particles don't settle", "Milk, fog, gelatin"],
          ]}
        />
      </Card>
      <Card title="Physical vs. chemical properties & changes">
        <p><strong>Physical properties:</strong> observed without changing the substance. Examples: malleability, conductivity, solubility, viscosity, boiling/melting point, density.</p>
        <p style={{ marginTop: 6 }}><strong>Chemical properties:</strong> only seen when substance becomes something different. Examples: reactivity, flammability.</p>
        <p style={{ marginTop: 8 }}><strong>Physical change:</strong> shape/size changes, composition stays same. (Ice melting, glass breaking.)</p>
        <p style={{ marginTop: 6 }}><strong>Chemical change:</strong> new substances form. Signs: color change, gas produced, precipitate forms, heat/light released. Rust, cake rising (CO₂ gas), burning are all chemical changes.</p>
        <InfoBox>A <strong>precipitate</strong> is a solid that forms and separates from a liquid. Distillation separates dissolved particles from liquid. Density can test purity.</InfoBox>
      </Card>
      <Card title="Atomic structure">
        <Table
          headers={["Particle", "Charge", "Location", "Mass"]}
          rows={[
            ["Proton", "+1", "Nucleus", "~1 amu"],
            ["Neutron", "0", "Nucleus", "~1 amu"],
            ["Electron", "−1", "Orbitals (outside nucleus)", "~0 (negligible)"],
          ]}
        />
        <p><strong>Atomic number</strong> = protons (defines the element). <strong>Mass number</strong> = protons + neutrons. <strong>Isotopes</strong> = same element, different neutron count. Atomic mass = weighted average of all isotopes. 1 amu = 1/12 the mass of carbon-12.</p>
      </Card>
      <Card title="History of atomic models">
        <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, color: "#374151" }}>
          <li><strong>Democritus:</strong> Proposed indivisible atoms (no experiment)</li>
          <li><strong>Dalton:</strong> All atoms of one element = same mass; combine in fixed ratios</li>
          <li><strong>Thomson:</strong> Discovered electron (−) → "plum pudding" model</li>
          <li><strong>Rutherford:</strong> Gold foil experiment → tiny dense nucleus, mostly empty space</li>
          <li><strong>Bohr:</strong> Electrons in fixed orbits/energy levels; jump levels when gaining/losing energy</li>
          <li><strong>Cloud model:</strong> Electrons in orbitals (probability regions). Ground state = lowest energy. Excited state = electron bumped up.</li>
        </ol>
      </Card>
    </div>
  );
}

function PeriodicPage() {
  return (
    <div>
      <Card title="Organization">
        <p>Mendeleev organized by increasing atomic mass → periodic law discovered. Modern table organized by <strong>atomic number</strong>.</p>
        <p style={{ marginTop: 6 }}>Horizontal rows = <strong>periods</strong>. Vertical columns = <strong>groups</strong>. Same group = same number of valence electrons. Left to right across a period: elements become less metallic, more nonmetallic.</p>
        <p style={{ marginTop: 6 }}>In electron dot diagrams, each dot = one valence electron.</p>
      </Card>
      <Card title="Metals, nonmetals, metalloids">
        <Table
          headers={["Category", "Properties", "Table location"]}
          rows={[
            ["Metals", "Shiny, conduct heat/electricity, malleable, ductile", "Left side"],
            ["Nonmetals", "Poor conductors, brittle when solid", "Right side"],
            ["Metalloids", "Properties of both", "Staircase border"],
          ]}
        />
        <p>Dull metal in air = more reactive. Transition metals have stronger metallic bonds than alkali metals. More valence electrons = stronger metallic bonds. Among K, Li, Fe — iron has strongest bonds.</p>
      </Card>
      <Card title="Key groups">
        <Table
          headers={["Group", "Name", "Key facts"]}
          rows={[
            ["1A", "Alkali metals", "1 valence e⁻; most reactive metals; react violently with water"],
            ["2A", "Alkaline earth metals", "2 valence e⁻; less reactive than alkali metals"],
            ["7A", "Halogens", "7 valence e⁻; most reactive nonmetals"],
            ["8A", "Noble gases", "Full shells; almost no reactivity; 'neon lights' can be any noble gas"],
            ["5A", "Nitrogen group", "Fertilizers contain N and P from this group"],
          ]}
        />
        <InfoBox type="warn">Alkali metals are more reactive than alkaline earth metals in same period. Two most reactive groups overall = alkali metals + halogens. Reactive elements found in nature only as compounds.</InfoBox>
        <p>Hydrogen is in Group 1A (1 valence electron) but is NOT a metal.</p>
      </Card>
    </div>
  );
}

function BondsPage() {
  return (
    <div>
      <Card title="Types of bonds">
        <Table
          headers={["Bond", "How it works", "Between"]}
          rows={[
            ["Ionic", "Electron transferred. Cation (+) and anion (−) attract. Forms crystal lattice. Sum of all charges = 0.", "Metal + nonmetal"],
            ["Covalent", "Electrons shared. Single (−), double (=), or triple (≡) bonds.", "Two nonmetals"],
            ["Polar covalent", "Electrons shared unequally. Polarity depends on atom types AND shape of molecule.", "Nonmetals (different electronegativities)"],
            ["Metallic", "Sea of delocalized electrons around metal ions. Stronger with more valence e⁻.", "Metal + metal"],
          ]}
        />
        <p>A <strong>polyatomic ion</strong> = group of covalently bonded atoms carrying a charge (e.g., SO₄²⁻, CO₃²⁻, PO₄³⁻, OH⁻, NH₄⁺).</p>
      </Card>
      <Card title="Writing formulas — the crisscross method">
        <p>For ionic compounds: use each ion's charge as the other's subscript. Then simplify if possible.</p>
        <InfoBox>Fe³⁺ + O²⁻ → Fe₂O₃. Check: 2(+3) + 3(−2) = 0 ✓</InfoBox>
        <InfoBox>Al³⁺ + CO₃²⁻ → Al₂(CO₃)₃. Check: 2(+3) + 3(−2) = 0 ✓</InfoBox>
        <p style={{ marginTop: 8 }}><strong>Covalent naming prefixes:</strong> mono=1, di=2, tri=3, tetra=4, penta=5.</p>
        <InfoBox>SO₂ = sulfur dioxide · N₂O₅ = dinitrogen pentoxide · PCl₃ = phosphorus trichloride</InfoBox>
        <p style={{ marginTop: 8 }}><strong>Ionic naming:</strong> cation name first (Roman numerals for transition metals), then anion (−ide for simple, keep name for polyatomic).</p>
        <InfoBox>FeCl₃ = iron(III) chloride · NaOH = sodium hydroxide · CaSO₄ = calcium sulfate · CrO₃ = chromium(VI) oxide</InfoBox>
      </Card>
      <Card title="Polyatomic ions to memorize">
        <Table
          headers={["Ion name", "Formula", "Charge"]}
          rows={[
            ["Sulfate", "SO₄", "2−"],
            ["Carbonate", "CO₃", "2−"],
            ["Phosphate", "PO₄", "3−"],
            ["Hydroxide", "OH", "1−"],
            ["Ammonium", "NH₄", "1+"],
            ["Nitrate", "NO₃", "1−"],
          ]}
        />
      </Card>
    </div>
  );
}

function ReactionsPage() {
  return (
    <div>
      <Card title="Balancing equations — the rules">
        <p><strong>Law of conservation of mass:</strong> atoms can't appear or disappear. Both sides must have equal numbers of each element.</p>
        <p style={{ marginTop: 6 }}><strong>Subscripts</strong> = atoms in a molecule (never change them). <strong>Coefficients</strong> = numbers in front (these you change to balance).</p>
        <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, color: "#374151", marginTop: 8 }}>
          <li>Write the unbalanced equation with correct formulas</li>
          <li>Count atoms of each element on both sides</li>
          <li>Add coefficients — start with the most complex molecule</li>
          <li>Never change subscripts</li>
          <li>Check that all elements are balanced</li>
        </ol>
        <InfoBox type="success">Na₃PO₄ + HCl → NaCl + H₃PO₄ → balanced coefficients: <strong>(1, 3, 3, 1)</strong></InfoBox>
        <InfoBox type="success">Fe + HC₂H₃O₂ → Fe(C₂H₃O₂)₃ + H₂ → balanced: <strong>(2, 6, 2, 3)</strong></InfoBox>
      </Card>
      <Card title="Types of reactions">
        <Table
          headers={["Type", "General form", "Example", "Clue word"]}
          rows={[
            ["Synthesis", "A + B → AB", "Zn + Br₂ → ZnBr₂", "forms / combines"],
            ["Decomposition", "AB → A + B", "H₂O → H₂ + O₂", "breaks down"],
            ["Single replacement", "A + BC → AC + B", "Ba + K₂SO₄ → BaSO₄ + 2K", "replaces"],
            ["Double replacement", "AB + CD → AD + CB", "CuSO₄ + 2AlPO₄ → Al₂(SO₄)₃ + Cu₃(PO₄)₂", "exchange / precipitate"],
            ["Combustion", "fuel + O₂ → CO₂ + H₂O", "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O", "burns / oxygen always present"],
          ]}
        />
        <InfoBox>Nonmetal single replacement: A + BC → C + BA (nonmetal replaces other nonmetal). Double replacement always produces 2 products. Combustion always involves oxygen.</InfoBox>
      </Card>
      <Card title="Mole calculations">
        <p><strong>Molar mass</strong> = sum of atomic masses in g/mol. Molar mass of Cl₂ = 2 × 35.5 = 71 g/mol.</p>
        <p style={{ marginTop: 6 }}><strong>Moles</strong> = mass (g) ÷ molar mass. Example: 186 g HBr ÷ 81 g/mol = <strong>2.3 mol</strong>.</p>
        <p style={{ marginTop: 6 }}><strong>Stoichiometry (mole ratios):</strong> Use coefficients as ratios. 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O. If 6 mol butane burn: 6 × (8/2) = <strong>24 mol CO₂</strong>.</p>
        <p style={{ marginTop: 6 }}><strong>Conservation of mass check:</strong> 44g propane burned → 132g CO₂ + 72g H₂O = 204g total products. Mass of O₂ used = 204 − 44 = <strong>160 g</strong>.</p>
      </Card>
    </div>
  );
}

function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qi, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qi]: val }));
  };

  const score = submitted ? quizQuestions.filter((q, i) => answers[i] === q.ans).length : 0;

  return (
    <div>
      {quizQuestions.map((q, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: "#111" }}>{i + 1}. {q.q}</div>
          <div>
            {q.opts.map((opt, j) => {
              let bg = "#fff", border = "1px solid #E5E7EB", color = "#374151";
              if (submitted) {
                if (j === q.ans) { bg = "#E6F7EF"; border = "1px solid #5FCC9A"; color = "#0A5C38"; }
                else if (answers[i] === j && j !== q.ans) { bg = "#FEF0F0"; border = "1px solid #F5ABAB"; color = "#8B1A1A"; }
              } else if (answers[i] === j) {
                bg = "#EBF4FF"; border = "1px solid #90C2F5"; color = "#1E5FA0";
              }
              return (
                <div key={j} onClick={() => handleSelect(i, j)}
                  style={{ padding: "8px 12px", borderRadius: 8, margin: "4px 0", cursor: submitted ? "default" : "pointer", background: bg, border, color, fontSize: 13, transition: "all .15s" }}>
                  <input type="radio" checked={answers[i] === j} onChange={() => {}} style={{ marginRight: 8 }} /> {opt}
                </div>
              );
            })}
          </div>
          {submitted && (
            <div style={{ marginTop: 8, fontSize: 13, padding: "8px 12px", borderRadius: 8, background: answers[i] === q.ans ? "#E6F7EF" : "#FEF0F0", color: answers[i] === q.ans ? "#0A5C38" : "#8B1A1A" }}>
              {answers[i] === q.ans ? "✓ Correct! " : "✗ Incorrect. "}{q.exp}
            </div>
          )}
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        {!submitted ? (
          <button onClick={() => setSubmitted(true)}
            style={{ padding: "10px 24px", background: "#1E6FCC", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Check answers
          </button>
        ) : (
          <button onClick={() => { setAnswers({}); setSubmitted(false); }}
            style={{ padding: "10px 24px", background: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Reset quiz
          </button>
        )}
      </div>
      {submitted && (
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: score >= 10 ? "#E6F7EF" : score >= 7 ? "#FFF8E6" : "#FEF0F0", color: score >= 10 ? "#0A5C38" : score >= 7 ? "#7A4F00" : "#8B1A1A", fontSize: 15, fontWeight: 600 }}>
          Score: {score} / {quizQuestions.length} ({Math.round(score / quizQuestions.length * 100)}%)
          {score >= 10 ? " — Great work! You're ready. 💪" : score >= 7 ? " — Good! Review the topics you missed." : " — Go back through each section and try again!"}
        </div>
      )}
    </div>
  );
}

const pageMap = {
  overview: <OverviewPage />,
  motion: <MotionPage />,
  forces: <ForcesPage />,
  workenergy: <WorkEnergyPage />,
  electricity: <ElectricityPage />,
  circuits: <CircuitsPage />,
  waves: <WavesPage />,
  matter: <MatterPage />,
  periodic: <PeriodicPage />,
  bonds: <BondsPage />,
  reactions: <ReactionsPage />,
  quiz: <QuizPage />,
};

export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", display: "flex", height: "100vh", background: "#F9FAFB" }}>
      <div style={{ width: 180, minWidth: 180, background: "#fff", borderRight: "1px solid #E5E7EB", padding: "16px 0", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "0 16px 12px", borderBottom: "1px solid #E5E7EB", marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.4 }}>Physical Science</div>
          <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Final exam study guide</div>
        </div>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", background: active === s.id ? "#EBF4FF" : "transparent", color: active === s.id ? "#1E5FA0" : "#374151", border: "none", cursor: "pointer", fontSize: 13, fontWeight: active === s.id ? 600 : 400, borderLeft: active === s.id ? "3px solid #1E6FCC" : "3px solid transparent" }}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "#111" }}>
            {sections.find(s => s.id === active)?.label}
          </h2>
          {pageMap[active]}
        </div>
      </div>
    </div>
  );
}
