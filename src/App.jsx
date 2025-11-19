import "./App.css"; // <-- add this
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as XLSX from "xlsx";

// CONSTANTS
const TEAMS = [
  "Team1",
  "Team2",
  "Team3",
  "Team4",
  "Team5",
  "Team6",
  "Team7",
  "Team8",
  "Team9",
];
const GROUPS = ["Group A", "Group B", "Group C"];

// Utility Functions
const getFromStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Wheel Component
// const SpinWheel = ({ items, onSpin, spinning, selectedItem }) => {
//   const [rotation, setRotation] = useState(0);

//   const handleSpin = () => {
//     if (spinning || items.length === 0) return;

//     const spins = 5;
//     const randomDegree = Math.floor(Math.random() * 360);
//     const totalRotation = spins * 360 + randomDegree;

//     setRotation(rotation + totalRotation);

//     setTimeout(() => {
//       const segmentAngle = 360 / items.length;
//       const normalizedRotation = totalRotation % 360;
//       const selectedIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % items.length;
//       onSpin(items[selectedIndex]);
//     }, 3000);
//   };

//   const segmentAngle = 360 / items.length;

//   return (
//     <div className="flex flex-col items-center gap-6">
//       <div className="relative">
//         <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
//         <div
//           className="relative w-80 h-80 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
//           style={{
//             transform: `rotate(${rotation}deg)`,
//             transition: spinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
//           }}
//         >
//           {items.map((item, index) => {
//             const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500'];
//             return (
//               <div
//                 key={index}
//                 className={`absolute w-full h-full ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-lg`}
//                 style={{
//                   transform: `rotate(${index * segmentAngle}deg)`,
//                   clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`
//                 }}
//               >
//                 <span style={{ transform: `rotate(${segmentAngle / 2}deg)` }}>{item}</span>
//               </div>
//             );
//           })}
//         </div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-yellow-400 drop-shadow-lg z-10"></div>
//       </div>

//       <button
//         onClick={handleSpin}
//         disabled={spinning || items.length === 0}
//         className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-2xl rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//       >
//         {spinning ? '🎰 SPINNING...' : '🎯 SPIN WHEEL'}
//       </button>

//       {selectedItem && (
//         <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
//           Selected: {selectedItem}
//         </div>
//       )}
//     </div>
//   );
// };

// const SpinWheel = ({ items, onSpin }) => {
//   const [rotation, setRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const spinWheel = () => {
//     if (isSpinning || items.length === 0) return;

//     setIsSpinning(true);

//     const spins = 6; // number of full spins
//     const randomAngle = Math.floor(Math.random() * 360);

//     const finalRotation = rotation + spins * 360 + randomAngle;

//     setRotation(finalRotation);

//     const segmentAngle = 360 / items.length;

//     setTimeout(() => {
//       const normalized = finalRotation % 360;
//       const winningIndex =
//         Math.floor((360 - normalized) / segmentAngle) % items.length;

//       const selected = items[winningIndex];
//       setSelectedItem(selected);
//       onSpin && onSpin(selected);
//       setIsSpinning(false);
//     }, 3500);
//   };

//   // Build gradient for wheel colors
//   const buildWheelGradient = () => {
//     const segmentAngle = 360 / items.length;
//     return items
//       .map((item, i) => {
//         const start = i * segmentAngle;
//         const end = start + segmentAngle;
//         const color = [
//           "#f44336", "#3f51b5", "#4caf50", "#ff9800", "#9c27b0", "#e91e63",
//           "#03a9f4", "#009688", "#ff5722"
//         ][i % 9];
//         return `${color} ${start}deg ${end}deg`;
//       })
//       .join(", ");
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 py-10">

//       {/* WHEEL WRAPPER */}
//       <div className="relative flex items-center justify-center">

//         {/* Glow behind wheel */}
//         <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>

//         {/* WHEEL */}
//         <div
//           className="relative w-80 h-80 rounded-full border-8 border-yellow-400 shadow-2xl flex items-center justify-center"
//           style={{
//             background: `conic-gradient(${buildWheelGradient()})`,
//             transform: `rotate(${rotation}deg)`,
//             transition: isSpinning
//               ? "transform 3.5s cubic-bezier(.17,.67,.24,1.02)"
//               : "none",
//           }}
//         >
//           {/* Wheel Labels */}
//           {items.map((item, i) => {
//             const angle = (360 / items.length) * i + (360 / items.length) / 2;
//             return (
//               <div
//                 key={i}
//                 className="absolute left-1/2 top-1/2 origin-left text-white font-bold"
//                 style={{
//                   transform: `rotate(${angle}deg) translateX(110px) rotate(-${angle}deg)`,
//                 }}
//               >
//                 {item}
//               </div>
//             );
//           })}
//         </div>

//         {/* POINTER */}
//         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0
//                        border-l-[18px] border-l-transparent
//                        border-r-[18px] border-r-transparent
//                        border-b-[40px] border-b-yellow-400
//                        drop-shadow-xl z-20"></div>
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={spinWheel}
//         disabled={isSpinning}
//         className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white
//                    font-bold text-2xl rounded-full shadow-lg hover:shadow-2xl
//                    transform hover:scale-110 transition-all
//                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//       >
//         {isSpinning ? "🎰 Spinning..." : "🎯 Spin Wheel"}
//       </button>

//       {/* SELECTED RESULT */}
//       {selectedItem && (
//         <div className="text-3xl font-bold bg-clip-text text-transparent
//                         bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
//           Selected: {selectedItem}
//         </div>
//       )}
//     </div>
//   );
// };

/**
 * 3D Spin Wheel (labels rotate with wheel and remain readable)
 *
 * Props:
 * - items: string[]
 * - onSpin: (winner) => void
 *
 * Usage: <SpinWheel items={['A','B','C','D']} onSpin={winner => console.log(winner)} />
 */
const SpinWheel = ({ items = [], onSpin }) => {
  const [rotation, setRotation] = useState(0); // absolute rotation in degrees
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const wheelRef = useRef(null);

  const segmentAngle = 360 / Math.max(items.length, 1);
  const wheelSize = 420; // px (use same for CSS sizing below)
  const radius = wheelSize / 2;

  // Helper: build conic-gradient colors for segments
  const buildGradient = () => {
    const palette = [
      "#ff4d6d",
      "#4c7cff",
      "#20c997",
      "#ffb020",
      "#9b5cff",
      "#ff5ec7",
      "#00bcd4",
      "#7bed9f",
      "#ff7a45",
    ];
    return items
      .map((_, i) => {
        const start = i * segmentAngle;
        const end = start + segmentAngle;
        const color = palette[i % palette.length];
        return `${color} ${start}deg ${end}deg`;
      })
      .join(", ");
  };

  const handleSpin = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);
    setWinner(null);

    // control number of full spins and randomness
    const fullSpins = 6 + Math.floor(Math.random() * 3); // 6..8 full turns
    const randomOffset = Math.floor(Math.random() * 360); // 0..359
    const target = rotation + fullSpins * 360 + randomOffset;

    // start rotation
    setRotation(target);

    // duration should match CSS transition (ms)
    const durationMs = 3800;

    setTimeout(() => {
      // Determine winner by final normalized rotation
      const normalized = target % 360; // 0..359
      // pointer is at top (0deg). We compute which segment sits under pointer.
      // segment start angles increase clockwise; we need the index whose range contains (360 - normalized)
      const pointerDeg = (360 - normalized + 360) % 360;
      const index = Math.floor(pointerDeg / segmentAngle) % items.length;

      setWinner(items[index]);
      onSpin && onSpin(items[index]);
      setIsSpinning(false);
    }, durationMs + 40); // small buffer to ensure transition ended
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Outer glow */}
      <div
        style={{
          position: "relative",
          width: `${wheelSize}px`,
          height: `${wheelSize}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-22px",
            borderRadius: "9999px",
            background:
              "linear-gradient(90deg, rgba(124,58,237,0.18), rgba(236,72,153,0.14), rgba(59,130,246,0.18))",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        {/* Pointer (top) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-10px",
            transform: "translateX(-50%) rotate(180deg)",
            zIndex: 40,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "40px solid #f6c84c",
              boxShadow: "0 8px 18px rgba(0,0,0,0.45)",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Wheel frame */}
        <div
          ref={wheelRef}
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
            borderRadius: "9999px",
            border: "12px solid rgba(246,200,76,0.95)",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 10,
            boxShadow:
              "0 30px 60px rgba(0,0,0,0.55), inset 0 10px 30px rgba(0,0,0,0.35)",
            // rotating the whole wheel (including labels)
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 3.8s cubic-bezier(.17,.67,.24,1.02)"
              : "transform 300ms ease",
            // glossy overlays:
            background: `conic-gradient(${buildGradient()})`,
            overflow: "visible",
          }}
        >
          {/* radial glossy highlight (overlay) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 28% 25%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 20%, rgba(0,0,0,0) 40%)",
              mixBlendMode: "screen",
              zIndex: 25,
            }}
          />

          {/* inner shadow to give depth */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              boxShadow: "inset 0 12px 30px rgba(0,0,0,0.45)",
              zIndex: 24,
            }}
          />

          {/* center hub */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: "88px",
              height: "88px",
              borderRadius: "9999px",
              background:
                "linear-gradient(135deg, rgba(255,241,118,1), rgba(255,200,60,1))",
              border: "4px solid rgba(255,245,200,0.95)",
              boxShadow:
                "inset 0 6px 14px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.45)",
              zIndex: 30,
            }}
          />

          {/* Labels - these are inside the rotating element so they rotate with it */}
          {items.map((label, i) => {
            // midpoint angle (deg) of the slice (0deg at top; increases clockwise)
            const mid = i * segmentAngle + segmentAngle / 2;

            // Convert degrees to CSS transform: first rotate to slice angle,
            // then translate along negative Y to push the label outward from center.
            // We render the label text rotated so that it reads outward:
            // If the label would be upside-down (angle between 90..270), flip by 180deg.
            const shouldFlip = mid > 90 && mid < 270;

            // distance from center to text. Tune multiplier to place text inside slice.
            const distance = radius * 0.66;

            return (
              <div
                key={i}
                role="listitem"
                aria-label={`slice-${i}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "160px",
                  height: "34px",
                  marginLeft: "-80px", // center horizontally (half width)
                  marginTop: "-17px", // center vertically (half height)
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                  zIndex: 28,
                  pointerEvents: "none",
                  // transform order: rotate slice -> translate outward -> optionally rotate text to face outward
                  transform: `rotate(${mid}deg) translate(0, -${distance}px) rotate(${
                    shouldFlip ? 180 : 0
                  }deg)`,
                  transformOrigin: "center center",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    letterSpacing: "0.6px",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    // subtle bevel text effect
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.08), 0 3px 10px rgba(0,0,0,0.45)",
                    padding: "0 6px",
                    maxWidth: "100%",
                    textAlign: "center",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || items.length === 0}
        style={{
          padding: "14px 36px",
          borderRadius: "9999px",
          fontSize: "18px",
          fontWeight: 800,
          color: "white",
          background: "linear-gradient(90deg,#6b21a8,#ec4899)",
          boxShadow: "0 12px 40px rgba(99,102,241,0.25)",
          transform: isSpinning ? "scale(1)" : "translateZ(0)",
          cursor: isSpinning ? "not-allowed" : "pointer",
          opacity: isSpinning ? 0.6 : 1,
        }}
      >
        {isSpinning ? "🎰 Spinning..." : "🎯 SPIN"}
      </button>

      {/* Winner */}
      {winner && (
        <div
          style={{
            marginTop: 12,
            fontSize: 22,
            fontWeight: 900,
            background: "linear-gradient(90deg,#7c3aed,#ec4899)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Winner: {winner}
        </div>
      )}
    </div>
  );
};

// Team Assignment Page
const TeamPage = () => {
  const [users, setUsers] = useState(getFromStorage("users", []));
  const [assignments, setAssignments] = useState(
    getFromStorage("assignments", {})
  );
  const [availableTeams, setAvailableTeams] = useState(
    getFromStorage("availableTeams", TEAMS)
  );
  const [spinning, setSpinning] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showUserSelect, setShowUserSelect] = useState(false);

  useEffect(() => {
    saveToStorage("users", users);
    saveToStorage("assignments", assignments);
    saveToStorage("availableTeams", availableTeams);
  }, [users, assignments, availableTeams]);

  const unassignedUsers = users.filter((user) => !assignments[user]);

  const handleSpin = (team) => {
    setSpinning(true);
    setSelectedTeam(team);

    setSpinning(false);
    setShowUserSelect(true);
  };

  const handleUserSelect = (user) => {
    const newAssignments = { ...assignments, [user]: selectedTeam };
    setAssignments(newAssignments);

    const newAvailableTeams = availableTeams.filter((t) => t !== selectedTeam);

    if (newAvailableTeams.length === 0) {
      setAvailableTeams(TEAMS);
    } else {
      setAvailableTeams(newAvailableTeams);
    }

    setSelectedTeam(null);
    setShowUserSelect(false);

    updateExcel(user, selectedTeam);
  };

  const updateExcel = (user, team) => {
    // This would update the Excel file
    console.log(`Assigning ${user} to ${team}`);
  };

  const teamAssignments = TEAMS.reduce((acc, team) => {
    acc[team] = Object.entries(assignments)
      .filter(([_, t]) => t === team)
      .map(([user]) => user);
    return acc;
  }, {});

  const progress = Object.keys(assignments).length;
  const total = users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
          🎮 Crest Volleyball Tournament
        </h1>
        <div className="text-2xl font-bold">
          Progress: {progress}/{total}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full">
        <div className="grid grid-cols-2 gap-2 space-y-4">
          {TEAMS.slice(0, Math.ceil(TEAMS.length / 2)).map((team) => (
            <div
              key={team}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-4 border border-purple-500"
            >
              <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                {team}
              </h3>
              <div className="text-2xl text-gray-300">
                {teamAssignments[team].length > 0 ? (
                  teamAssignments[team].map((user) => (
                    <div key={user}>• {user}</div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">No members yet</div>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Members: {teamAssignments[team].length}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center">
          <SpinWheel
            items={availableTeams}
            onSpin={handleSpin}
            spinning={spinning}
            selectedItem={selectedTeam}
          />

          {showUserSelect && unassignedUsers.length > 0 && (
            <div className="mt-6 max-h-48 overflow-y-auto bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-lg p-4 w-80">
              <h3 className="text-lg font-bold mb-2 text-center text-yellow-400">
                Select User
              </h3>
              <div className="space-y-2">
                {unassignedUsers.map((user) => (
                  <button
                    key={user}
                    onClick={() => handleUserSelect(user)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    {user}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 space-y-4">
          {TEAMS.slice(Math.ceil(TEAMS.length / 2)).map((team) => (
            <div
              key={team}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-4 border border-purple-500"
            >
              <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                {team}
              </h3>
              <div className="text-2xl text-gray-300">
                {teamAssignments[team].length > 0 ? (
                  teamAssignments[team].map((user) => (
                    <div key={user}>• {user}</div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">No members yet</div>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Members: {teamAssignments[team].length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Group Assignment Page
const GroupPage = () => {
  const [availableTeams, setAvailableTeams] = useState(
    getFromStorage("groupAvailableTeams", TEAMS)
  );
  const [groupAssignments, setGroupAssignments] = useState(
    getFromStorage("groupAssignments", {})
  );
  const [currentGroupIndex, setCurrentGroupIndex] = useState(
    getFromStorage("currentGroupIndex", 0)
  );
  const [spinning, setSpinning] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    saveToStorage("groupAvailableTeams", availableTeams);
    saveToStorage("groupAssignments", groupAssignments);
    saveToStorage("currentGroupIndex", currentGroupIndex);
  }, [availableTeams, groupAssignments, currentGroupIndex]);

  const handleSpin = (team) => {
    setSpinning(true);
    setSelectedTeam(team);

    setSpinning(false);

    const currentGroup = GROUPS[currentGroupIndex];
    const newGroupAssignments = {
      ...groupAssignments,
      [currentGroup]: [...(groupAssignments[currentGroup] || []), team],
    };
    setGroupAssignments(newGroupAssignments);

    const newAvailableTeams = availableTeams.filter((t) => t !== team);
    setAvailableTeams(newAvailableTeams);

    const nextGroupIndex = (currentGroupIndex + 1) % GROUPS.length;
    setCurrentGroupIndex(nextGroupIndex);

    setSelectedTeam(null);
  };

  const currentGroup = GROUPS[currentGroupIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
        🎯 Group Assignment
      </h1>

      <div className="grid w-full grid-cols-3 gap-8 h-[calc(100vh-150px)]">
        <div className="flex flex-col justify-center space-y-4">
          {GROUPS.slice(0, Math.ceil(GROUPS.length / 2)).map((group) => (
            <div
              key={group}
              className={`bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border-2 ${
                currentGroup === group
                  ? "border-yellow-400 animate-pulse"
                  : "border-blue-500"
              }`}
            >
              <h3 className="text-2xl font-bold mb-3 text-green-400">
                {group}
              </h3>
              <div className="space-y-1">
                {(groupAssignments[group] || []).map((team) => (
                  <div
                    key={team}
                    className="text-lg bg-blue-600 bg-opacity-30 rounded px-3 py-2"
                  >
                    🏆 {team}
                  </div>
                ))}
                {!groupAssignments[group]?.length && (
                  <div className="text-gray-500 italic">No teams yet</div>
                )}
              </div>
              <div className="text-2xl text-gray-400 mt-3">
                Teams: {(groupAssignments[group] || []).length}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center">
          {availableTeams.length > 0 && (
            <div className="mb-4 text-2xl font-bold text-yellow-400 animate-bounce">
              Next: {currentGroup}
            </div>
          )}

          <SpinWheel
            items={availableTeams}
            onSpin={handleSpin}
            spinning={spinning}
            selectedItem={selectedTeam}
          />

          {availableTeams.length === 0 && (
            <div className="mt-6 text-3xl font-bold text-green-400 animate-pulse">
              ✅ All Teams Assigned!
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          {GROUPS.slice(Math.ceil(GROUPS.length / 2)).map((group) => (
            <div
              key={group}
              className={`bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 border-2 ${
                currentGroup === group
                  ? "border-yellow-400 animate-pulse"
                  : "border-blue-500"
              }`}
            >
              <h3 className="text-2xl font-bold mb-3 text-green-400">
                {group}
              </h3>
              <div className="space-y-1">
                {(groupAssignments[group] || []).map((team) => (
                  <div
                    key={team}
                    className="text-lg bg-blue-600 bg-opacity-30 rounded px-3 py-2"
                  >
                    🏆 {team}
                  </div>
                ))}
                {!groupAssignments[group]?.length && (
                  <div className="text-gray-500 italic">No teams yet</div>
                )}
              </div>
              <div className="text-2xl text-gray-400 mt-3">
                Teams: {(groupAssignments[group] || []).length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Home/Setup Page
const HomePage = () => {
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);
  const [users, setUsers] = useState(getFromStorage("users", []));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const userList = jsonData
        .slice(1)
        .map((row) => row[0])
        .filter(Boolean);
      setUsers(userList);
      saveToStorage("users", userList);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
    localStorage.clear();
    setUsers([]);
    setShowResetModal(false);
    window.location.reload();
  };

  const generateTestData = () => {
    const testUsers = Array.from({ length: 60 }, (_, i) => `User${i + 1}`);
    setUsers(testUsers);
    saveToStorage("users", testUsers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-600 to-purple-600 animate-pulse">
          🎰
        </h1>
        <p className="text-2xl text-gray-300">Team & Group Assignment System</p>
      </div>

      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border-2 border-purple-500 shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold mb-3 text-yellow-400">
              📊 Upload Excel File
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
            <p className="text-2xl text-gray-400 mt-2">
              Upload Excel with user names in column A
            </p>
          </div>

          <button
            onClick={generateTestData}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            🧪 Generate Test Data (60 Users)
          </button>

          {users.length > 0 && (
            <div className="text-center text-green-400 font-bold text-lg">
              ✅ {users.length} Users Loaded
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-6">
            <button
              onClick={() => navigate("/team")}
              disabled={users.length === 0}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👥 Crest Volleyball Tournament
            </button>
            <button
              onClick={() => navigate("/group")}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
            >
              🎯 Group Assignment
            </button>
          </div>

          <button
            onClick={() => setShowResetModal(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105"
          >
            🔄 Reset All Data
          </button>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md border-2 border-red-500 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-red-400">
              ⚠️ Confirm Reset
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to reset all data? This will clear all
              assignments and cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App
export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 border-b border-purple-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600"
          >
            🎰
          </Link>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              Home
            </Link>
            <Link
              to="/team"
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              Teams
            </Link>
            <Link
              to="/group"
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              Groups
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/group" element={<GroupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
