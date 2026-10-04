# Adiseelan ❤ Sathyavani — Wedding Invitation

A cinematic Tamil wedding invitation website. Plain HTML + CSS + JavaScript
(GSAP + ScrollTrigger from a CDN), no build step, made for GitHub Pages.

```
wedding/
├── index.html          ← page structure + WhatsApp preview tags
├── style.css           ← all the styling and animations
├── script.js           ← CONFIG (your details) at the very top + all behaviour
├── README.md
└── assets/
    ├── music.mp3            original veena + tanpura piece (Raga Mohanam), 1.2 MB, loops
    ├── og-image.jpg         1200×630 WhatsApp / social preview card
    ├── favicon.svg
    ├── apple-touch-icon.png
    ├── thoranam.svg         mango-leaf thoranam on the temple door
    ├── garland.svg          marigold + jasmine garland
    └── zari.svg             Kanchipuram-style temple border
```

The full page loads about **1.7 MB** (music 1.2 MB, fonts about 250 KB, GSAP about 115 KB, and the
site's own code about 170 KB). All the art (doors, kolams, lamps, garlands) is vector, so the page itself has
no photos.

---

## 1. Before you publish: things to fill in

Open `script.js`. Everything a guest reads is in the `CONFIG` object at the top.

| What | Where in `CONFIG` | Why |
|---|---|---|
| **Your WhatsApp number** | `blessings.whatsappNumber` | With country code, digits only, e.g. `'919876543210'`. If you leave it empty, WhatsApp asks the guest to choose a contact. |
| **Temple map pin** | `wedding.mapsUrl` | Right now this link searches Google Maps for "Vallathamman Kovil, Anumanthai". Open the temple in Google Maps, tap **Share → Copy link**, and paste that link here so the pin is exact. |
| Tamil spelling of names | `groom.nameTa`, `bride.nameTa` | Set to ஆதிசீலன் / சத்யவாணி. Please check them with your family. |
| Parents' names (optional) | `groom.parents`, `bride.parents` (+ `…Ta`) | Empty values stay hidden. |
| Tamil calendar date (optional) | `tamilDate` | e.g. the Tamil month/day line from your patrikai. |
| Story text, secret message, WhatsApp message | `story`, `secret`, `blessings.message` | You can write `{groom}`, `{bride}` or `{date}` in any of these and the page fills it in. |

The reception's **Get Directions** button already uses your Plus Code (RQHM+27C → 11.827563, 79.783141).
It opens Google Maps straight into directions.

### Preview it on your Mac
Double-click `index.html`, or run a local server:
```bash
cd ~/Downloads/wedding        # wherever you unzipped it
python3 -m http.server 8000   # then open http://localhost:8000
```
In Chrome, press ⌥⌘I and turn on the phone toolbar to see it at phone size (try 360 px wide).

**Check the countdown states without waiting until February.** Add `?now=` to the address:
- `index.html?now=2027-02-11T07:29:50+05:30` shows the last 10 seconds, then "Today is the day!" with confetti
- `index.html?now=2027-02-12T10:00:00+05:30` shows the "after the wedding" message

---

## 2. Publish on GitHub Pages

The steps below assume your **`adiseelan`** account and a repository named **`wedding`**, which gives
**https://adiseelan.github.io/wedding/**.
If you use a different account or repository name, see step 4.

### Option A: in the browser (no terminal)
1. Sign in at github.com as **adiseelan** and click **+ → New repository**.
2. Name it `wedding`, choose **Public**, and click **Create repository**. Leave the README box unticked.
3. On the empty repo page, click **uploading an existing file**.
4. Open the unzipped folder in Finder. Select **index.html, style.css, script.js, README.md and the
   `assets` folder**, and drag them all into the browser together. The `assets/` files must keep their folder.
5. Click **Commit changes**.

### Option B: from the terminal
```bash
cd ~/Downloads/wedding
git init
git add .
git commit -m "Wedding invitation ✨"
git branch -M main
git remote add origin https://adiseelan@github.com/adiseelan/wedding.git
git push -u origin main
```
> Putting `adiseelan@` in the remote URL makes macOS Keychain use the **adiseelan** login and not
> the qrservice one. If it asks for a password, paste a **Personal Access Token**
> (GitHub → Settings → Developer settings → Tokens). GitHub no longer accepts your account password here.

### Turn on Pages (both options)
1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
4. Wait 1–2 minutes and refresh. The live address appears at the top: `https://adiseelan.github.io/wedding/`

### Updating later
- Browser: open a file on GitHub, click the ✏️ pencil, edit, then **Commit changes**.
- Terminal: `git add . && git commit -m "update" && git push`

Each change goes live in about a minute.

---

## 3. The WhatsApp preview card

WhatsApp builds the preview from the `og:` tags in `index.html` and does not run JavaScript, so those tags
are written directly in the HTML.

- **If your address is not `https://adiseelan.github.io/wedding/`**, update the `og:url` and `og:image`
  lines in `index.html` and `siteUrl` in `script.js`. WhatsApp needs the full https address of the image.
- To test, send the link to yourself on WhatsApp. If an old preview without the image appears, WhatsApp
  has cached it. Send the link with `?v=2` on the end (for example `https://adiseelan.github.io/wedding/?v=2`)
  to force a fresh preview.
- The preview image is a **JPEG on purpose**. WhatsApp and Facebook don't reliably show WebP preview images.
  The page itself has no raster images, so there was nothing to convert to WebP.

---

## 4. Optional changes

**Use your own music:** replace `assets/music.mp3` and keep the same name. Use a recording you have the right
to use, such as a royalty-free nadaswaram piece or one recorded by family. Keep it under 1.5 MB:
```bash
ffmpeg -i your-song.mp3 -t 100 -b:a 96k -ac 2 assets/music.mp3
```

**Tamil heading font:** headings use *Noto Serif Tamil*, which reads as more ceremonial. Buttons and body
text use *Catamaran*. To use Catamaran or Mukta Malar for headings too, change `--f-ta-display` at the top
of `style.css`, and add the font to the Google Fonts link in `index.html` if it isn't already there.

**Colours:** the palette variables are at the top of `style.css` (`--maroon-*`, `--gold-*`, `--leaf-*`).

**Move the hidden lamp:** it sits on the 2nd card of "Our Story". Change `Math.min(1, …)` in `buildStory()`
inside `script.js` to `0`, `2` or `3` to put it on another card.

---

## 5. What's built in

1. **Temple gate.** Carved wooden doors with brass studs, a mango-leaf thoranam, kuthuvilakku lamps and a
   doorstep kolam. Tapping **திறக்க தொடவும் · Tap to Open** starts the music, swings the doors open in 3D
   and floods the screen with golden light.
2. **Kolam.** A real *sikku* kolam: **two unbroken lines** woven around 100 pulli dots, one jasmine-white
   and one gold, for the two of you. The dots appear first, both lines draw themselves stroke by stroke,
   then your names appear with a gold shimmer.
3. **Falling petals.** Rose petals, jasmine flowers and buds drawn on a light canvas. They pause when the
   tab is hidden to save battery.
4. **Our Story.** A GSAP ScrollTrigger timeline. The gold line fills as you scroll and each card slides in.
5. **Countdown.** A brass lamp and four clay diyas with flickering CSS flames. At zero it shows
   *இன்றே அந்த நன்னாள்! · Today is the day!* with confetti. Through the wedding day the message follows
   the schedule, and after the day it shows *Happily married!*
6. **Event cards.** Tap to flip in 3D and see the time, venue and **Get Directions**.
7. **Hidden diya.** A small golden lamp hides on one of the story cards. Tapping it sets off fireworks and
   opens your secret message. Hint chips say "Find the hidden lamp ✨".
8. **Blessings.** A WhatsApp button with a pre-filled Tamil + English message.
9. **Footer.** **Add to Calendar** offers a phone calendar file (.ics with both events and reminders 1 day
   and 2 hours before) or Google Calendar links. A floating music on/off button sits in the corner.

**Reliability**
- Mobile-first and tested at 320, 360 and 412 px wide with no sideways scrolling.
- If the guest's phone has **Reduce Motion** switched on, the page uses calm fades in place of the
  big animations.
- If the GSAP CDN fails, the page uses a built-in scroll animation instead.
- If `script.js` fails, tapping the gate still opens the invitation.
- If JavaScript is off, the gate is skipped and the invitation shows directly.
- No localStorage, no backend, no tracking.
