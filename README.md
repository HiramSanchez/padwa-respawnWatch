# **Respawn Watch**

[![React](https://img.shields.io/badge/React-18-skyblue)]()
 &emsp;
[![Vite](https://img.shields.io/badge/Vite-5.0.12-gold)]()  

## 📁 **Description**
Respawn Watch is a lightweight, local-first tracking tool for MMORPG farming.  
It helps you keep track of mob respawn windows (min / max), prioritize targets, and reduce mental load while playing.

No backend. No database server. Just React, local data, and real-time timers.


### Purpose

Many MMORPG mobs (MVPs, MiniBosses, rares) respawn within a **time window**, not an exact time. Respawn Watch allows you to:

- Track **minimum and maximum respawn times**
- Know when a mob is **possibly up** vs **guaranteed up**
- Focus only on the mobs you are farming today

## 📂 **Table of Contents**
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Screens](#screens)  
- [Project Structure](#project-structure)
- [Contact](#contact)

## **Tech Stack**

- **React**
- **Vite**
- **JavaScript (ES6+)**

## **Features**

### 🧠 Smart Respawn Logic
Each spawn has:
- **Min Time respawn** → *Possible spawn* (yellow)
- **Max Time respawn** → *Confirmed spawn* (green)

Statuses:
- **Cooldown** → normal card
- **Possible** → yellow border
- **Ready** → green border

Timers are recalculated automatically even after restarting the app.

### 🗃️ Fake Database (Local JSON)
- All mobs live in a local `catalog.json`. Easy to edit and extend over time

### 💾 Persistent State
- Kill times and UI settings are stored in `localStorage`, so closing and reopening the app keeps all progress intact

### 🎮 Compact Mode (Farm Mode)
- Toggle compact mode for intensive farming sessions

### ⚙️ Settings Tab (Mob-Level Control)
- Quickly Enable / disable only what you are farming today

## **Screens**

<img src="https://github.com/HiramSanchez/pacws-filesManager/blob/main/src/assets/ss/sspadwa01.png" width=400>

<img src="https://github.com/HiramSanchez/pacws-filesManager/blob/main/src/assets/ss/sspadwa02.png" width=400>

<img src="https://github.com/HiramSanchez/pacws-filesManager/blob/main/src/assets/ss/sspadwa03.png" width=400>

## **Project Structure**

```text
respawn-watch/
├─ public/
│  ├─ data/
│  │  └─ catalog.json       # Fake DB
│  └─ mobs/                 # Mob GIFs or IMG
│
├─ src/
│  ├─ components/
│  │  ├─ MobCard.jsx
│  │  ├─ Tabs.jsx
│  │  └─ TopBar.jsx
│  │
│  ├─ pages/
│  │  ├─ TrackerPage.jsx    # MVP / MiniBoss tracker
│  │  └─ ManagePage.jsx     # Enable / disable mobs
│  │
│  ├─ lib/
│  │  ├─ time.js            # Respawn calculations
│  │  ├─ spawnKey.js        # mobId__mapName keys
│  │  └─ storage.js         # localStorage persistence
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
│
├─ vite.config.js
└─ package.json
```
## **Contact**
For any questions or suggestions, feel free to contact me at:  
hiramsanchez.dev@gmail.com  