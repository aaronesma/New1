# Masquerade Calls

Browser voice calls with a live voice changer. Open the page, turn on the microphone, pick a voice, and call someone by their 6-digit code. Both people need the page open; it does not dial regular phone numbers.

## Voices
- **Pitch:** Normal, Low (−3 semitones), Deep (−6), Giant (−10), High (+5), Chipmunk (+10)
- **People:** Woman, Girl, Man, Boy, Kid, Old timer
- **Characters:** Robot, Cyborg, Alien, Monster, Villain, Ghost, Wobble, Underwater, Announcer, Batman, Narrator, Brute
- **Effects:** Radio, Old phone, Megaphone, Cave, Stadium, Fan
- **Custom pitch** slider (−12 to +12 semitones)

Voices can be switched during a call. People voices have a **Tune** panel (pitch, voice shape, breathiness, brightness); settings are saved on the device.

## Put it online (free, GitHub Pages)
1. On GitHub, open this repo → **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch with `index.html`, folder `/ (root)`, and **Save**.
3. After a minute or two the page is live at `https://<your-username>.github.io/<repo>/`.

The site must be served over HTTPS (GitHub Pages is) for the microphone to work.

## Install on iPhone
1. Open the GitHub Pages link in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. Open **Masquerade** from your Home Screen. It runs full screen like a normal app. Allow the microphone the first time.

Android: open the link in Chrome and tap **Install app** (or menu → Add to Home screen).

## How it works
- Audio: Web Audio API. A small AudioWorklet does real-time granular pitch shifting; Woman, Girl, Man and Boy use a second worklet, a phase vocoder that shifts pitch and formants (voice shape) separately so they sound natural rather than sped up. Other voices combine ring modulation (robot), filters, distortion, tremolo, vibrato and feedback echo. A limiter on the output prevents clipping.
- Calls: WebRTC peer-to-peer audio, connected through the free public PeerJS server.

## Limits
- Calls go directly between the two devices. Some mobile-data networks block direct connections; WiFi on both ends works best.
- The free public PeerJS server has no uptime guarantee.
- Use headphones to avoid echo.
- iPhone pauses web apps in the background, so keep the app open during a call.
