export const CATEGORIES = [
  { id: 'push', name: 'Push', icon: '↑', color: '#cbea64' },
  { id: 'pull', name: 'Pull', icon: '↥', color: '#a4b9ff' },
  { id: 'legs', name: 'Legs', icon: '◢', color: '#f2b772' },
  { id: 'core', name: 'Core', icon: '◇', color: '#d6a8f2' },
  { id: 'balance', name: 'Balance', icon: '⊹', color: '#8cdbc9' },
  { id: 'straight', name: 'Levers & planche', icon: '↔', color: '#ef9ba9' },
  { id: 'mobility', name: 'Mobility', icon: '≈', color: '#9dceff' },
];

export const DIFFICULTIES = ['Foundation', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
export const EQUIPMENT = ['Floor', 'Wall', 'Bench', 'Bar', 'Low bar', 'Parallel bars',
  'Rings', 'Parallettes', 'Band', 'Vertical pole', 'Anchor', 'Weight'];

const hybrid = 'https://www.hybridcalisthenics.com/';
const cali = 'https://calisthenics.com/exercise/';
const guides = {
  push: ['Hybrid Calisthenics', hybrid + 'pushups'],
  pull: ['Hybrid Calisthenics', hybrid + 'pullups'],
  squat: ['Hybrid Calisthenics', hybrid + 'squats'],
  raise: ['Hybrid Calisthenics', hybrid + 'legraises'],
  bridge: ['Hybrid Calisthenics', hybrid + 'bridges'],
  rotation: ['Hybrid Calisthenics', hybrid + 'twists'],
  row: ['Reddit Bodyweight Fitness', 'https://www.reddit.com/r/bodyweightfitness/wiki/exercises/row/'],
  dip: ['Reddit Bodyweight Fitness', 'https://www.reddit.com/r/bodyweightfitness/wiki/exercises/dip/'],
  archerRow: ['CALISTHENICS', cali + 'australian-pull-up/'],
  ringDip: ['CALISTHENICS', cali + 'ring-dips/'],
  barSupport: ['CALISTHENICS', cali + 'parallel-bar-support-hold/'],
  scap: ['CALISTHENICS', cali + 'scapula-push-ups/'],
  pike: ['CALISTHENICS', cali + 'pike-push-up/'],
  handstand: ['GMB Fitness', 'https://gmb.io/handstand/'],
  press: ['GMB Fitness', 'https://gmb.io/press-handstand/'],
  pistol: ['GMB Fitness', 'https://gmb.io/pistol/'],
  legs: ['GMB Fitness', 'https://gmb.io/bodyweight-leg-exercises/'],
  calf: ['CALISTHENICS', 'https://calisthenics.com/primary-muscle/leg/'],
  nordic: ['E3 Rehab', 'https://e3rehab.com/how-to-perform-nordic-hamstring-curls/'],
  reverseNordic: ['CALISTHENICS', cali + 'reverse-nordic-curl/'],
  sissy: ['CALISTHENICS', cali + 'sissy-squat/'],
  hollow: ['CALISTHENICS', cali + 'hollow-body-hold/'],
  sidePlank: ['CALISTHENICS', cali + 'copenhagen-plank/'],
  wiper: ['CALISTHENICS', cali + 'hanging-windshield-wipers/'],
  lSit: ['GMB Fitness', 'https://gmb.io/l-sit/'],
  vSit: ['CALISTHENICS', cali + 'v-sit/'],
  compression: ['CALISTHENICS', cali + 'seated-double-leg-pike-lifts/'],
  barMuscle: ['CALISTHENICS', 'https://calisthenics.com/how-to-do-a-muscle-up/'],
  ringMuscle: ['CALISTHENICS', cali + 'ring-muscle-up/'],
  ringTransition: ['CALISTHENICS', cali + 'ring-muscle-up-transition/'],
  falseGrip: ['CALISTHENICS', cali + 'ring-false-grip-hang/'],
  archerPull: ['CALISTHENICS', cali + 'band-archer-pull-up/'],
  oneArmHang: ['CALISTHENICS', cali + 'one-arm-dead-hang/'],
  topHold: ['CALISTHENICS', cali + 'pull-up-top-hold/'],
  front: ['CALISTHENICS', cali + 'front-lever/'],
  back: ['CALISTHENICS', cali + 'back-lever/'],
  skinCat: ['CALISTHENICS', cali + 'skin-the-cat/'],
  planche: ['Calisthenics DK', 'https://calisthenics.dk/en/guides/planche-progression'],
  frog: ['Calisthenics Association', 'https://calisthenicsassociation.org/lessons/planche-lean-and-frog-stand'],
  flag: ['CALISTHENICS', 'https://calisthenics.com/how-to-do-human-flag-progressions/'],
  shoulder: ['GMB Fitness', 'https://gmb.io/shoulder-mobility/'],
  wrist: ['GMB Fitness', 'https://gmb.io/wp-content/uploads/2025/02/GMB-Wrist-Strengthening-Cheatsheet.pdf'],
  cross: ['CALISTHENICS', cali + 'iron-cross/'],
  degree90: ['CALISTHENICS', cali + '90-degree-push-up/'],
  deficitPush: ["CALISTHENICS", "https://calisthenics.com/exercise/deficit-push-up/"],
  archerPush: ["CALISTHENICS", "https://calisthenics.com/exercise/archer-push-up/"],
  oneArmPush: ["CALISTHENICS", "https://calisthenics.com/exercise/one-arm-push-up/"],
  clapPush: ["CALISTHENICS", "https://calisthenics.com/exercise/clapping-push-ups/"],
  lDip: ["CALISTHENICS", "https://calisthenics.com/exercise/l-sit-on-dip-bars/"],
  impossibleDip: ["CALISTHENICS", "https://calisthenics.com/exercise/impossible-dip/"],
  wallDeficit: ["CALISTHENICS", "https://calisthenics.com/exercise/deficit-back-to-wall-handstand-push-up/"],
  deepHspu: ["CALISTHENICS", "https://calisthenics.com/exercise/deep-deficit-freestanding-handstand-push-up/"],
  highPull: ["CALISTHENICS", "https://calisthenics.com/exercise/high-pull-up/"],
  oneRingRow: ["CALISTHENICS", "https://calisthenics.com/exercise/one-arm-ring-row/"],
  oneArmPull: ["CALISTHENICS", "https://calisthenics.com/exercise/one-arm-pull-up/"],
  oneArmChin: ["YouTube", "https://www.youtube.com/watch?v=Nj1NvN7Te_s"],
  barMuscleDirect: ["CALISTHENICS", "https://calisthenics.com/exercise/bar-muscle-up/"],
  negativeMuscle: ["CALISTHENICS", "https://calisthenics.com/exercise/negative-bar-muscle-up/"],
  dragonSquat: ["Maximum Potential Calisthenics", "https://www.mpcalisthenics.com/tutorial/dragon-pistol-squat-how-to-unlock-one-of-the-most-difficult-bodyweight-squats"],
  calfStep: ["NHS Wales", "https://abuhb.nhs.wales/files/patient-information-leaflets1/foot-care-podiatry/calf-strengthening-guide-piu1441-pdf/"],
  ringFallout: ["Movement As Medicine", "https://movement-as-medicine.com/ring-fallout-anti-extension-progression/"],
  hangingLeg: ["CALISTHENICS", "https://calisthenics.com/exercise/hanging-leg-raises/"],
  toes: ["CALISTHENICS", "https://calisthenics.com/exercise/toes-to-bar/"],
  lHang: ["CALISTHENICS", "https://calisthenics.com/exercise/l-hang/"],
  dragon: ["CALISTHENICS", "https://calisthenics.com/exercise/dragon-flag/"],
  middleSupport: ["CALISTHENICS", "https://calisthenics.com/exercise/middle-split-hold/"],
  manna: ["CALISTHENICS", "https://calisthenics.com/exercise/manna/"],
  handWalk: ["CALISTHENICS", "https://calisthenics.com/exercise/handstand-walk/"],
  oneArmHandstand: ["GMB Fitness", "https://gmb.io/oahs/"],
  stalder: ["Skillwell", "https://goskillwell.com/gymnastics/stalder-press/"],
  elbow: ["CALISTHENICS", "https://calisthenics.com/exercise/elbow-lever/"],
  oneElbow: ["CALISTHENICS", "https://calisthenics.com/exercise/one-arm-elbow-lever/"],
  tuckFrontRaise: ["CALISTHENICS", "https://calisthenics.com/exercise/tuck-front-lever-raises/"],
  halfFront: ["CALISTHENICS", "https://calisthenics.com/exercise/half-lay-front-lever/"],
  oneArmFront: ["CALISTHENICS", "https://calisthenics.com/exercise/one-arm-front-lever/"],
  hefesto: ["YouTube", "https://www.youtube.com/watch?v=PBNRlmBpZyE"],
  halfPlanche: ["CALISTHENICS", "https://calisthenics.com/exercise/half-lay-planche/"],
  verticalFlag: ["CALISTHENICS", "https://calisthenics.com/exercise/vertical-human-flag/"],
  flagPull: ["CALISTHENICS", "https://calisthenics.com/exercise/human-flag-pull-up/"],
  fullBridge: ["GMB Fitness", "https://gmb.io/bridge/"],
  bridgeKick: ["MGA Gymnastics", "https://www.youtube.com/watch?v=hde3jd_8yb8"],
  splits: ["GMB Fitness", "https://gmb.io/splits/"],
  pancake: ["Calisteniapp", "https://calisteniapp.com/exercises/pancake_stretch_on_the_floor/EX339"],
  pullover: ["CALISTHENICS", "https://calisthenics.com/exercise/bar-pullover/"],
  maltese: ["GymDaze", "https://gym-daze.com/exercises/maltese"],
  victorian: ["CALISTHENICS", "https://calisthenics.com/exercise/ring-victorian-hold/"],
};

const tracks = [];
const skills = [];

function addTrack(id, category, name, defaultGuide, rows) {
  tracks.push({ id, category, name });
  // id | title | difficulty 1–5 | target r(eps)/s(econds) | equipment
  // | A+B/C prerequisites | description | cue | mistake | guide override | flags
  for (const line of rows.trim().split('\n')) {
    const [skillId, title, tier, goal, gear, leadsFrom, description, cues, mistakes,
      guide = defaultGuide, flags = ''] = line.split('|').map(field => field.trim());
    const [source, url] = guides[guide || defaultGuide];
    skills.push({
      id: skillId, name: title, track: id, category, tier: Number(tier),
      target: Number(goal.slice(0, -1)), metric: goal.endsWith('s') ? 'seconds' : 'reps',
      gear: gear.split(',').map(item => item.trim()),
      prereqs: leadsFrom ? leadsFrom.split('/').map(path => path.split('+')) : [],
      description, cues, mistakes, source, url,
      each: flags.includes('each'), weighted: flags.includes('weighted'),
      assisted: flags.includes('assisted'),
    });
  }
}

addTrack('pushups', 'push', 'Push-up progression', 'push', `
wall-push|Wall push-up|1|15r|Wall||Use a wall to practice the push-up with minimal bodyweight.|Keep your feet planted and lower your chest toward your hands.|Letting the hips reach the wall before the chest.
high-incline|High incline push-up|1|12r|Bench|wall-push|Press from a stable counter or high support.|Move shoulders and hips together as you lower.|Using a support that can slide.
low-incline|Low incline push-up|2|12r|Bench|high-incline|Use a lower support to increase the load through your hands.|Finish each rep with a long line from head to heels.|Shortening the range as the surface gets lower.
knee-push|Knee push-up|2|12r|Floor|wall-push|Press from the floor with knees down to shorten the lever.|Keep a straight line from shoulders to knees.|Folding at the hips instead of bending at the elbows.
negative-push|Negative push-up|2|5r|Floor|low-incline/knee-push|Lower slowly from a full plank and reset with knees down.|Make the descent even all the way to the floor.|Dropping the last part of the rep.
push-up|Standard push-up|2|12r|Floor|low-incline/negative-push|Lower from a high plank and press back to straight arms.|Aim your elbows diagonally back and bring your chest between your hands.|Counting head dips as full reps.
close-push|Close-grip push-up|3|10r|Floor|push-up|Move your hands inside normal push-up width for more triceps demand.|Let your elbows travel alongside your ribs.|Forcing your wrists to touch.
decline-push|Decline push-up|3|10r|Bench|push-up|Elevate your feet to shift more weight to your hands.|Keep the pelvis and ribs stacked as you lower.|Piking the hips to shorten the lever.
ring-push|Ring push-up|3|10r|Rings|push-up+ring-support|Press between low rings while keeping the straps controlled.|Set the rings higher if you need a lighter angle.|Letting the rings flare away at the bottom.
weighted-push|Weighted push-up|4|5r|Floor,Weight|decline-push|Add secure external load to a strict push-up.|Keep the load centered and log the weight separately.|Using loose plates that can slide.||weighted
archer-push|Archer push-up|4|6r|Floor|push-up+close-push|Shift your chest toward one hand as the opposite elbow straightens.|Keep pressure through both hands and match range side to side.|Twisting the chest away from the working hand.||each
assisted-oapush|Elevated one-arm push-up|4|5r|Bench|archer-push|Use a stable elevated hand support to build toward a floor one-arm rep.|Set a wide base and resist turning the hips.|Progressing to a lower surface at the cost of control.||each
one-arm-push|One-arm push-up|5|5r|Floor|assisted-oapush|Press from the floor on one hand without help from the free arm.|Brace your free side and keep a predictable shoulder path.|Rolling the entire torso open to get off the floor.||each
power-push|Explosive push-up|3|6r|Floor|push-up|Press fast enough for both hands to briefly leave the ground.|Land softly with elbows ready to bend.|Chasing height before you can control the landing.
clap-push|Clap push-up|4|5r|Floor|power-push|Clap between the takeoff and landing of an explosive push-up.|Keep the clap close and replace your hands early.|Reaching for a late clap at the expense of the landing.
diamond-push|Diamond push-up|3|12r|Floor|close-push|Use a narrow hand position that increases demand on elbow extension.|Choose a hand angle that lets your elbows track back comfortably.|Forcing your thumbs to touch if the position pinches your wrists.
deficit-push|Parallette deficit push-up|4|10r|Parallettes|decline-push|Lower your chest below your hands on stable handles.|Increase depth in small steps while keeping the shoulders controlled.|Dropping below your controllable range.|deficitPush
typewriter-push|Typewriter push-up|4|6r|Floor|archer-push|Shift from side to side near the bottom of a wide push-up.|Keep your hips level and count a full shift toward each side.|Rising up in the middle to make the shift easier.|archerPush|each
ring-archer-push|Archer ring push-up|4|6r|Rings|ring-push+archer-push|Press with one arm as the opposite ring travels outward for assistance.|Start with the rings a little higher and match the reach to each side.|Letting the reaching shoulder drop abruptly.|archerPush|each
one-arm-push-negative|One-arm push-up negative|4|5r|Floor|assisted-oapush|Descend on one arm, then reset with both hands.|Use a consistent foot width and a deliberate lowering speed.|Twisting the torso as the working elbow bends.|oneArmPush|each
one-arm-deficit-push|Deficit one-arm push-up|5|4r|Parallettes|one-arm-push+deficit-push|Use a stable low handle for a longer one-arm pressing range.|Choose a broad support stance and progress depth gradually.|Letting the handle tip under side loading.|oneArmPush|each
weighted-ring-push|Weighted ring push-up|5|6r|Rings,Weight|weighted-push+ring-push|Add secure external load to controlled ring push-ups.|Keep both rings and your torso level as the load increases.|Using loose external load that can shift.|deficitPush|weighted
double-clap-push|Double-clap push-up|5|3r|Floor|clap-push|Make two quick front claps during an explosive push-up.|Keep both claps compact and give yourself room to land softly.|Chasing the second clap after losing landing position.|clapPush
`);

addTrack('dips', 'push', 'Dips & support', 'dip', `
bar-support|Parallel-bar support|1|25s|Parallel bars||Hold yourself over parallel bars with straight arms.|Press the bars down and keep your legs quiet.|Resting with shoulders jammed up near the ears.|barSupport
feet-dip|Foot-assisted dip|2|10r|Parallel bars|bar-support|Use foot contact to lighten the dip.|Let your arms control the descent and add only the leg pressure you need.|Jumping through the sticking point.||assisted
negative-dip|Dip negative|2|5r|Parallel bars|bar-support|Lower from the top of a dip, then step back up.|Choose a pain-free depth you can hold briefly.|Dropping quickly into the deepest position.
bar-dip|Parallel-bar dip|3|10r|Parallel bars|feet-dip/negative-dip|Lower between parallel bars and press back to support.|Keep the elbows tracking back and choose a repeatable depth.|Bouncing out of the bottom.
weighted-dip|Weighted dip|4|5r|Parallel bars,Weight|bar-dip|Add weight while using the same controlled dip range.|Keep the belt load still and log the added weight.|Letting momentum from the load start each rep.||weighted
straight-dip|Straight-bar dip|3|8r|Bar|bar-dip|Dip over one bar as you would above a bar muscle-up.|Lean slightly forward and keep the bar close.|Letting the body drift behind the bar.|barMuscle
ring-support|Ring support|2|20s|Rings|bar-support|Hold locked elbows in support on low rings.|Keep rings close to the hips and make small corrections.|Pinning the straps hard against the arms.|ringDip
rto-support|Rings turned-out support|3|20s|Rings|ring-support|Rotate the rings outward while holding the support.|Turn gradually and keep the elbows straight.|Turning the hands while the elbows buckle.|ringDip
ring-neg-dip|Ring dip negative|3|5r|Rings|ring-support+bar-dip|Lower slowly on rings before stepping back into support.|Keep the rings near the ribs throughout the descent.|Separating the rings as depth increases.|ringDip
ring-dip|Ring dip|4|6r|Rings|ring-neg-dip|Perform a full dip on freely moving rings.|Press to a still support at the top of each rep.|Using a leg swing to buy stability.|ringDip
rto-dip|Rings turned-out dip|5|5r|Rings|ring-dip+rto-support|Keep a deliberate outward ring turn through a challenging dip.|Use a small turn and build range only where the rings stay steady.|Forcing a large turn under load.|ringDip
pause-bar-dip|Paused parallel-bar dip|4|8r|Parallel bars|bar-dip|Pause briefly at a repeatable depth before pressing up.|Stay active through the shoulders in the pause.|Relaxing into the bottom and bouncing back up.
lsit-bar-dip|L-sit dip|4|6r|Parallel bars|bar-dip+l-sit|Hold your legs forward at hip height while doing dips.|Use shorter sets to keep the elbows and legs steady.|Dropping your legs to get out of the bottom.|lDip
russian-dip|Russian dip|5|5r|Parallel bars|pause-bar-dip+straight-dip|Roll back onto your forearms from the bottom of a dip, then press back into support.|Learn the transition slowly on stable parallel bars.|Dropping onto the forearms with speed.|impossibleDip
impossible-dip|Impossible dip|5|3r|Parallel bars|russian-dip|Lower the forearms toward the bars and press back up while limiting shoulder travel.|Work with assistance and own the range you choose.|Falling into the bottom or forcing the complete range.|impossibleDip
paused-ring-dip|Paused ring dip|4|6r|Rings|ring-dip|Pause low in a ring dip before a controlled press to support.|Keep the rings close during the pause.|Using a kick to restart the press.|ringDip
weighted-ring-dip|Weighted ring dip|5|5r|Rings,Weight|paused-ring-dip+weighted-dip|Add secure load to strict ring dips with consistent depth.|Use a small load increase and finish in a still support.|Cutting depth or letting the load swing.|ringDip|weighted
ring-archer-dip|Archer ring dip|5|4r|Rings|rto-dip+paused-ring-dip|Bias one arm while the other reaches outward on a ring.|Scale the reach before using a deeper dip.|Straightening the reaching arm farther than you can control.|ringDip|each
`);

addTrack('overhead', 'push', 'Overhead pressing', 'pike', `
incline-pike|Incline pike push-up|2|8r|Bench|high-incline|Press from a pike with hands on a stable raised surface.|Bring your head forward of your hands as your elbows bend.|Turning it into a horizontal incline push-up.
pike-push|Pike push-up|3|8r|Floor|incline-pike/decline-push|Press overhead with feet on the floor and hips high.|Land your head position ahead of your hands to form a tripod shape.|Dropping hips until the movement resembles a regular push-up.
elevated-pike|Feet-elevated pike push-up|3|8r|Bench|pike-push|Put your feet on a box to bias more weight over your hands.|Bring shoulders forward and keep hips above them.|Moving the head straight down between the wrists.
wall-hspu-negative|Wall handstand push-up negative|4|3r|Wall|elevated-pike+wall-hs|Lower from a wall handstand within a range you can control.|Use a soft depth marker and maintain active shoulders.|Transferring bodyweight onto the head.|handstand
wall-hspu|Wall handstand push-up|4|5r|Wall|wall-hspu-negative|Press from a controlled bent-arm position back to a wall handstand.|Keep a slight forward head travel and finish with shoulders lifted.|Using a hip kick to drive the press.|handstand
deficit-hspu|Wall deficit handstand push-up|5|3r|Wall,Parallettes|wall-hspu|Raise your hands on stable parallettes to increase pressing range.|Increase the deficit gradually and keep your shoulders active.|Dropping into a range you cannot press out of.|handstand
free-hspu|Freestanding handstand push-up|5|3r|Floor|wall-hspu+free-hs|Lower and press back to a freestanding handstand.|Counterbalance with controlled shoulder travel as you lower.|Changing shape suddenly near the bottom.|handstand
ninety-push|90-degree push-up|5|1r|Parallettes|free-hspu+bent-planche|Lower from a handstand toward a horizontal bent-arm hold and press back.|Practice the shift and reverse press as separate pieces first.|Descending faster than you can brake.|degree90
deficit-pike|Deficit elevated pike push-up|4|8r|Bench,Parallettes|elevated-pike|Use low handles to extend the range of an elevated pike press.|Keep the hips above your shoulders and descend evenly.|Letting the head descend before bracing your shoulders.
pause-wall-hspu|Paused wall handstand push-up|4|5r|Wall|wall-hspu|Pause near the bottom of a strict wall-supported rep.|Hold tension through the arms and keep the head light.|Resting bodyweight on your head.|wallDeficit
strict-floor-hspu-tempo|Tempo freestanding handstand push-up|5|3r|Floor|free-hspu|Lower slowly, pause, then press back to a balanced handstand.|Use a consistent depth and keep the descent under control.|Adding a leg kick to start the ascent.|deepHspu
free-deficit-hspu|Freestanding parallette handstand push-up|5|3r|Parallettes|free-hspu+deficit-hspu+para-hs|Press through a longer range while balancing over low parallettes.|Learn the balance on stable low equipment before increasing the deficit.|Chasing depth after losing your line.|deepHspu
deep-free-hspu|Deep-deficit freestanding handstand push-up|5|3r|Parallettes|free-deficit-hspu+strict-floor-hspu-tempo|Press from a deep, controlled bottom position back to a handstand.|Build depth gradually and use clear space to step out.|Bouncing from the bottom to get through the sticking point.|deepHspu
ninety-negative|90-degree push-up negative|5|3r|Parallettes|free-hspu+bent-planche|Lower from handstand to a controlled bent-arm planche, then step down.|Move your shoulders forward as your legs lower.|Losing pressing tension before your body reaches horizontal.|degree90
`);

addTrack('pullups', 'pull', 'Pull-up progression', 'pull', `
dead-hang|Dead hang|1|25s|Bar||Hang from a bar to practice grip and overhead tolerance.|Use full hands around the bar and keep the swing small.|Staying up after grip is about to slip.
active-hang|Active hang|1|20s|Bar|dead-hang|Hold a hang with the shoulder blades gently drawn down.|Keep elbows straight and make a small shoulder movement.|Turning it into a bent-elbow hold.
scap-pull|Scapular pull-up|2|8r|Bar|active-hang|Move between a relaxed and active hang without bending your elbows.|Pause at the active position and control the return.|Using a full-body swing for the lift.
foot-pull|Foot-assisted pull-up|2|8r|Low bar|active-hang|Use your feet for partial support during a pull-up.|Control the bottom and add just enough foot pressure to repeat the rep.|Pushing up entirely through the legs.||assisted
band-pull|Band-assisted pull-up|2|8r|Bar,Band|active-hang|Use a resistance band to reduce effective load.|Record the band consistently and lower to straight arms.|Using the rebound from the band to jump upward.||assisted
neg-pull|Negative pull-up|2|5r|Bar|scap-pull|Start above the bar and lower under control.|Try to make the bottom half as deliberate as the top.|Dropping through the final third.
top-pull|Pull-up top hold|2|12s|Bar|neg-pull/foot-pull|Hold your chin above the bar without kicking.|Keep the elbows pulling toward your sides.|Craning the head over the bar.|topHold
chin-up|Chin-up|3|8r|Bar|band-pull/foot-pull/neg-pull+top-pull|Pull with your palms facing you through a full controlled range.|Finish with upper chest rising rather than chin reaching.|Letting the shoulders roll forward at the top.
pull-up|Strict pull-up|3|8r|Bar|chin-up/scap-pull+neg-pull/band-pull|Pull from a hang with palms facing away, then lower to straight arms.|Keep the ribs down and start each rep from a quiet hang.|Kicking or shortening the descent.
neutral-pull|Neutral-grip pull-up|3|8r|Bar|pull-up/chin-up|Pull using parallel handles with palms facing each other.|Keep the elbows below the hands as you climb.|Shrugging early and losing the shoulder path.
chest-pull|Chest-to-bar pull-up|4|6r|Bar|pull-up|Pull high enough to bring upper chest toward the bar.|Drive elbows down and slightly back without a large swing.|Reaching the bar by flaring ribs and throwing the head back.
high-pull|Explosive high pull-up|4|5r|Bar|chest-pull|Accelerate the pull to raise the bar reference toward the lower chest.|Start each rep from stillness and focus on a fast upper-body pull.|Using a big kip to avoid building height.|barMuscle
weighted-pull|Weighted pull-up|4|5r|Bar,Weight|pull-up|Add external load to a standard strict pull-up.|Keep movement quality the same and record the added load.|Adding weight before both endpoints are controlled.||weighted
ring-pull|Ring pull-up|3|8r|Rings|pull-up/chin-up|Pull on rings while allowing a comfortable hand rotation.|Keep the rings moving together and finish evenly.|Pulling one hand noticeably higher than the other.
towel-hang|Towel hang|3|20s|Bar|dead-hang|Hang from towels draped securely over a bar to challenge grip.|Check the towels cannot slip and keep feet near the floor.|Grinding until the towel falls from your fingers.|oneArmHang
wide-pull|Wide-grip pull-up|3|8r|Bar|pull-up|Use a comfortable wider grip for strict pull-ups.|Choose a width that preserves smooth shoulder movement.|Gripping so wide that elbow travel and range are lost.
lsit-pull|L-sit pull-up|4|6r|Bar|pull-up+lh-bar|Pull while holding the legs forward in an L position.|Hold the leg line steady from the start of each rep.|Dropping the legs or kipping to clear the bar.|lHang
weighted-chin|Weighted chin-up|4|5r|Bar,Weight|chin-up+weighted-pull|Add load to strict supinated-grip chin-ups.|Control the start from straight arms and lower smoothly.|Kicking as the load starts to swing.|pull|weighted
weighted-neutral-pull|Weighted neutral-grip pull-up|4|5r|Bar,Weight|neutral-pull+weighted-pull|Perform loaded pull-ups with the palms facing each other.|Keep your ribs stacked and finish with both sides even.|Pulling around one handle to gain height.|pull|weighted
paused-weighted-pull|Paused weighted pull-up|5|4r|Bar,Weight|weighted-pull+top-pull|Pause above the bar for a consistent count on loaded reps.|Choose a load that lets your chin clear without neck reach.|Losing the pause as the load grows.|topHold|weighted
waist-high-pull|Waist-high explosive pull-up|5|3r|Bar|high-pull+bar-muscleup|Pull as high as you can from a quiet hang, aiming toward waist height.|Use full resets and keep the path consistent between attempts.|Using a large swing to create height.|highPull
high-ring-pull|High ring pull-up|4|6r|Rings|ring-pull+chest-pull|Pull the rings low toward the chest rather than stopping at chin height.|Keep the rings close and pull both hands evenly.|Bending at the hips to swing past the end of the pull.|ringMuscle
`);

addTrack('rows', 'pull', 'Rows & ring pulls', 'row', `
high-row|High bodyweight row|1|12r|Low bar||Pull your chest toward a high bar with feet on the ground.|Set an angle you can control through full range.|Pushing off with the hips at the start.
bent-row|Bent-knee inverted row|2|12r|Low bar|high-row|Row from a lower bar with knees bent and feet flat.|Keep a predictable shoulder-to-knee line.|Letting the pelvis drop as you pull.
straight-row|Straight-leg inverted row|2|10r|Low bar|bent-row|Row with legs straight and heels grounded.|Pull the bar toward your lower chest.|Getting height by lifting your chin.
elevated-row|Feet-elevated row|3|10r|Low bar,Bench|straight-row|Raise your feet to make the row more horizontal.|Keep heels and the bar support stable.|Hyperextending the back to reach the bar.
ring-row|Ring row|2|12r|Rings|high-row|Pull your body toward low adjustable rings.|Let the shoulder blades glide and keep both straps even.|Beginning each rep with a hip thrust.|archerRow
archer-row|Archer ring row|3|8r|Rings|ring-row+straight-row|Row mostly with one arm as the other reaches out for help.|Keep both hips facing the ceiling.|Over-rotating toward the working hand.|archerRow|each
one-arm-row|One-arm ring row|4|6r|Rings|archer-row|Row with one ring while resisting body rotation.|Begin with a more upright angle and pull that ring toward the ribs.|Swinging the free arm to finish.|archerRow|each
elevated-ring-row|Feet-elevated ring row|4|10r|Rings,Bench|ring-row+elevated-row|Make a nearly horizontal row with your feet supported on a stable bench.|Keep the rings level and move your shoulders freely.|Pushing your hips upward to get more height.|archerRow
loaded-ring-row|Weighted ring row|4|8r|Rings,Weight|elevated-ring-row|Add secure load to the ring row at a consistent angle.|Log both the load and the foot height for comparison.|Moving your feet closer to make a heavier set possible.|archerRow|weighted
paused-one-ring-row|Paused one-arm ring row|4|6r|Rings|one-arm-row|Pause with the ring close to your ribs on each rep.|Resist twisting and keep your feet planted.|Rotating your chest into the pause.|oneRingRow|each
elevated-one-ring-row|Feet-elevated one-arm ring row|5|5r|Rings,Bench|paused-one-ring-row+elevated-ring-row|Row on one ring with your heels elevated and your trunk horizontal.|Reduce the bench height if your hips start to rotate.|Winding up the torso before each pull.|oneRingRow|each
tuck-lever-row|Tuck front lever row|4|6r|Bar|elevated-row+tuck-front|Row from a tucked front lever while keeping your hips up.|Use a tight tuck and pull the bar toward your lower ribs.|Letting your hips drop before the pull.|front
advanced-tuck-lever-row|Advanced tuck front lever row|5|5r|Bar|tuck-lever-row+adv-front|Row with your hips farther open in an advanced tuck lever.|Keep the tuck angle steady through the entire rep.|Re-tucking the hips as the elbows bend.|front
`);

addTrack('unilateral-pull', 'pull', 'One-arm pulling', 'archerPull', `
one-hang|One-arm hang|3|15s|Bar|active-hang|Practice controlled hanging from one hand.|Use a low bar or foot support while building time.|Dropping suddenly into the hanging shoulder.|oneArmHang|each
uneven-pull|Uneven pull-up|3|6r|Bar|pull-up|Place the assisting hand on a lower strap or towel.|Keep both shoulders engaged and reduce help gradually.|Shifting load too abruptly to one side.||each,assisted
band-archer|Band-assisted archer pull-up|3|6r|Bar,Band|pull-up|Use a band while shifting the pull toward one hand.|Keep the extended arm active and record assistance.|Bending both elbows the same amount.||each,assisted
archer-pull|Archer pull-up|4|5r|Bar|band-archer/uneven-pull|Pull toward one hand while the other acts as a light guide.|Move across the bar with control and descend evenly.|Turning it into a regular wide-grip pull-up.||each
band-one-pull|Band-assisted one-arm pull-up|4|4r|Bar,Band|archer-pull+one-hang|Use the free hand on a band to scale a one-arm pull.|Record the setup so assistance can be compared honestly.|Pulling harder with the assisting hand as you tire.||each,assisted
negative-one-pull|One-arm pull-up negative|5|3r|Bar|band-one-pull|Lower on one arm from a two-arm assisted top entry.|Maintain a steady descent and use a band if the bottom speeds up.|Dropping through the bottom with a straight arm.||each
one-arm-pull|One-arm pull-up|5|3r|Bar|negative-one-pull/weighted-pull+archer-pull+one-hang|Pull from a controlled single-arm hang without assistance.|Allow natural torso rotation but keep the reps deliberate.|Starting each rep with a kick or half-range bend.||each
one-pull-top|One-arm top hold|4|8s|Bar|band-one-pull+top-pull|Hold one-arm pulling position near the top with assistance as needed.|Set the grip before taking weight off the other hand.|Letting the shoulder drop abruptly out of the hold.|oneArmPull|each,assisted
one-pull-lockoff|One-arm 90-degree lock-off|5|8s|Bar|one-pull-top+negative-one-pull|Hold the elbow near a right angle on one arm.|Lower into the position slowly and keep the shoulder active.|Falling through the hold instead of controlling the entry.|oneArmPull|each
one-arm-chin|Strict one-arm chin-up|5|3r|Bar|one-arm-pull/one-pull-lockoff+band-one-pull|Pull from straight arm to bar height with a supinated grip.|Let the torso turn naturally without using a leg kick.|Starting each rep with a jump or a bent elbow.|oneArmChin|each
one-ring-pull|One-arm ring pull-up|5|3r|Rings|one-arm-pull+ring-pull|Perform a strict one-arm pull-up on a freely rotating ring.|Let the ring rotate naturally as you pull.|Fighting the rotation with a sudden wrist twist.|oneArmPull|each
one-arm-pull-tempo|Tempo one-arm pull-up|5|3r|Bar|one-arm-pull+one-pull-lockoff|Use a deliberate ascent and slow lowering on each one-arm rep.|Use fewer reps to preserve the start, top, and controlled descent.|Dropping through the bottom once your elbow opens.|oneArmPull|each
weighted-one-arm-pull|Weighted one-arm pull-up|5|2r|Bar,Weight|one-arm-pull-tempo|Add a small, secured load to strict single-arm pulls.|Keep your load still and use full resets between reps.|Adding weight while shortening the initial hang.|oneArmPull|each,weighted
`);

addTrack('muscleups', 'pull', 'Muscle-ups', 'barMuscle', `
bar-transition|Low-bar muscle-up transition|3|8r|Low bar|straight-dip+pull-up|Practice moving your chest up and over a low bar with foot support.|Turn both wrists over at the same time.|Throwing one elbow over the bar before the other.||assisted
band-bar-muscle|Band-assisted bar muscle-up|4|5r|Bar,Band|bar-transition+high-pull|Use a band to rehearse a clean pull, turnover, and dip.|Practice a close bar path and symmetrical turnover.|Letting the band launch you straight into the transition.||assisted
bar-muscleup|Strict bar muscle-up|5|3r|Bar|band-bar-muscle/high-pull+straight-dip|Pull high, roll over the bar, and finish in tall support.|Keep the bar close as you transfer from pull to press.|Using a one-elbow turnover to rescue the rep.
false-grip|Ring false-grip hold|3|20s|Rings|active-hang|Hold the ring across the base of your palm with the wrist above it.|Start with feet assisting until the grip is secure.|Letting the ring slide into your fingers.|falseGrip
false-pull|False-grip ring pull-up|4|5r|Rings|false-grip+ring-pull|Pull the rings to your chest while keeping a false grip.|Pull the rings down and close to your torso.|Losing your grip halfway through the pull.|ringMuscle
ring-transition|Low-ring muscle-up transition|3|8r|Rings|false-grip+ring-support|Practice rolling from a ring pull into the bottom of a ring dip with feet down.|Brush the rings past your chest as shoulders travel forward.|Pushing the rings out to the sides.|ringTransition|assisted
ring-muscleup|Strict ring muscle-up|5|3r|Rings|ring-transition+false-pull+ring-dip|Join a false-grip pull, turnover, and ring dip in one rep.|Make the transition tight and controlled through both arms.|Kicking and separating the rings on the turnover.|ringMuscle
negative-bar-muscle|Negative bar muscle-up|4|5r|Bar|bar-transition+straight-dip|Lower from above the bar through the turnover into the hang.|Use stable access to the top and make both elbows pass together.|Dropping especially quickly through the turnover.|negativeMuscle
pause-bar-muscle|Paused strict bar muscle-up|5|3r|Bar|bar-muscleup+negative-bar-muscle|Pause briefly after the turnover before you finish the dip.|Keep the bar close and settle both elbows during the pause.|Sliding back below the bar to generate momentum.|barMuscleDirect
weighted-bar-muscle|Weighted bar muscle-up|5|3r|Bar,Weight|pause-bar-muscle|Add secure load to strict bar muscle-ups.|Keep a high pull and an even two-arm turnover.|Using an asymmetric turnover under added load.|barMuscleDirect|weighted
negative-ring-muscle|Negative ring muscle-up|4|5r|Rings|ring-transition+ring-dip|Lower from ring support back through the transition to a hang.|Keep the rings close to your torso as your elbows travel down.|Allowing the rings to separate through the transition.|ringTransition
slow-ring-muscle|Slow strict ring muscle-up|5|3r|Rings|ring-muscleup+negative-ring-muscle|Move through the pull, transition, and dip at a deliberate pace.|Keep the false grip and control both the ascent and descent.|Rushing the sticking point with a small kick.|ringMuscle
lsit-ring-muscle|L-sit ring muscle-up|5|3r|Rings|slow-ring-muscle+ring-l-sit|Perform a ring muscle-up with the legs held forward in an L.|Keep the rings close and your legs quiet through the turnover.|Dropping or kicking your legs to get above the rings.|ringMuscle
weighted-ring-muscle|Weighted ring muscle-up|5|3r|Rings,Weight|slow-ring-muscle+weighted-ring-dip|Add a small secure load to a strict ring muscle-up.|Choose a load that preserves a smooth transition on both arms.|Fighting a swinging load with your legs.|ringMuscle|weighted
`);

addTrack('squats', 'legs', 'Squats & single-leg strength', 'squat', `
chair-squat|Sit-to-stand squat|1|15r|Bench||Stand up from a stable chair and sit back under control.|Keep full foot contact and touch the seat gently.|Rocking forward to create momentum.
supported-squat|Supported squat|1|12r|Floor|chair-squat|Hold a sturdy support for balance while squatting.|Use light hands and let knees travel with your toes.|Hanging from your arms instead of using your legs.||assisted
body-squat|Bodyweight squat|2|15r|Floor|chair-squat/supported-squat|Squat to a depth you can control and stand tall.|Keep a steady tripod of pressure under each foot.|Bouncing at the bottom or letting heels lift.
pause-squat|Paused squat|2|10r|Floor|body-squat|Pause at a controlled squat depth before standing.|Maintain leg tension through the pause.|Relaxing and shifting sharply before the ascent.
split-squat|Split squat|2|10r|Floor|body-squat|Lower and rise with one foot ahead of the other.|Keep the front foot rooted and descend between your feet.|Pushing hard off the back foot.||each
reverse-lunge|Reverse lunge|2|10r|Floor|split-squat|Step back into a lunge and return to standing.|Lower under control before driving through the front foot.|Taking such a short step that balance is lost.||each
rear-split|Rear-foot-elevated split squat|3|10r|Bench|split-squat|Perform a split squat with your rear foot on a low bench.|Set front-foot distance so the working leg can move smoothly.|Pushing upward through the elevated rear leg.||each
cossack|Cossack squat|3|8r|Floor|pause-squat|Shift into a deep lateral squat while the other leg extends.|Keep the loaded foot planted and use a roomy stance.|Forcing depth while the working arch collapses.|legs|each
box-pistol|Box pistol squat|3|8r|Bench|rear-split/pause-squat|Sit onto a box and stand on one leg with the other foot forward.|Choose a box height that lets you stand without rocking.|Dropping onto the box and bouncing back up.|pistol|each
supported-pistol|Supported pistol squat|3|8r|Floor|box-pistol|Use a stable hand support to move through a single-leg squat.|Keep the hand assist light and reach the free leg forward.|Pulling hard with the arms through the difficult range.|pistol|each,assisted
pistol|Pistol squat|4|6r|Floor|supported-pistol/box-pistol+compression|Squat on one leg with the other extended in front.|Keep the working heel grounded and descend at a steady pace.|Falling backward or pushing off the free foot.|pistol|each
shrimp-box|Box shrimp squat|3|8r|Bench|reverse-lunge|Squat on one leg while lowering the rear knee to a raised pad.|Reach the rear knee down slowly and keep the front foot loaded.|Landing heavily on the pad.|legs|each
shrimp|Shrimp squat|4|6r|Floor|shrimp-box|Use a trailing bent leg rather than a forward straight leg for a single-leg squat.|Keep the rear knee traveling toward a soft target.|Twisting the trunk to make room for the rear leg.|legs|each
weighted-pistol|Weighted pistol squat|5|5r|Floor,Weight|pistol|Add controlled load to a single-leg squat.|Record the load position as well as the weight.|Using a swinging counterweight to stand up.|pistol|each,weighted
jump-squat|Squat jump|3|6r|Floor|body-squat|Jump from a squat and absorb the landing with both legs.|Land quietly and reset between jumps.|Rushing the next takeoff before you regain balance.
sissy-squat|Sissy squat|4|8r|Floor|pause-squat+reverse-nordic|Bend the knees as your torso leans back, using support if needed.|Limit range to a smooth, controlled return.|Dropping to end range and bouncing.|sissy
skater-squat|Skater squat|3|8r|Floor|reverse-lunge|Squat on one leg with the free knee reaching back toward a pad.|Use a stable front foot and a controlled touch.|Resting the rear foot on the floor during the ascent.|legs|each
deficit-shrimp|Deficit shrimp squat|5|5r|Bench|shrimp|Stand on a stable low step so the rear knee can travel a little lower.|Increase the step height in small increments.|Dropping the rear knee to get extra depth.|legs|each
paused-pistol|Paused pistol squat|4|6r|Floor|pistol|Pause low in a single-leg squat before standing.|Keep the heel planted and maintain tension in the pause.|Relaxing into the bottom and bouncing out.|pistol|each
supported-dragon-squat|Supported dragon pistol squat|4|5r|Floor|pistol+cossack|Use hand support while practicing the crossing free leg of a dragon pistol.|Move into the cross slowly and only use a depth you can reverse.|Forcing rotation through a planted knee.|dragonSquat|each,assisted
dragon-squat|Dragon pistol squat|5|5r|Floor|supported-dragon-squat+paused-pistol|Squat on one leg as the free leg crosses behind the planted leg.|Keep the loaded foot steady and practice a controlled ascent.|Pulling the free leg through by twisting sharply.|dragonSquat|each
jump-pistol|Pistol squat jump|5|4r|Floor|paused-pistol+jump-squat|Rise from a controlled pistol into a small single-leg jump.|Land gently with space to reset before the next rep.|Chasing jump height before you own the landing.|pistol|each
pause-weighted-pistol|Paused weighted pistol squat|5|4r|Floor,Weight|weighted-pistol+paused-pistol|Add a pause to a loaded pistol squat at consistent depth.|Hold the load steady and keep the working heel down.|Using the load as a swinging counterweight.|pistol|each,weighted
`);

addTrack('posterior', 'legs', 'Hamstrings, glutes & calves', 'bridge', `
glute-bridge|Glute bridge|1|15r|Floor||Raise your hips from a supine bent-knee position.|Push through the feet while keeping your ribs down.|Arching the lower back to gain height.
one-glute|Single-leg glute bridge|2|10r|Floor|glute-bridge|Lift your hips using one planted foot.|Keep your pelvis level as the other leg floats.|Rotating toward the leg on the floor.||each
long-bridge|Long-lever bridge|2|12r|Floor|glute-bridge|Move your feet farther away to put more demand on the hamstrings.|Push heels down as you lift your hips.|Bending knees back in when the hold gets hard.
ham-slider|Sliding hamstring curl|3|10r|Floor|long-bridge|Slide your heels out and back while your hips are raised.|Use smooth sliders and control the extension phase.|Dropping hips as the heels slide away.|nordic
hip-hinge|Single-leg hip hinge|2|10r|Floor|one-glute|Hinge from one hip while reaching your free leg behind you.|Keep hips facing the floor and a soft working knee.|Opening the rear-leg hip to reach farther.|legs|each
partial-nordic|Partial Nordic curl|3|6r|Anchor|ham-slider|Lower from kneeling with heels anchored through a short range.|Use an anchor that cannot lift and keep hips aligned with knees.|Hinging at the hips to make it easier.|nordic
assisted-nordic|Assisted Nordic curl|3|6r|Anchor,Band|partial-nordic|Use a band or hand support to practice a longer Nordic curl.|Control the reach and record how you assisted.|Dropping fast into your hands.|nordic|assisted
negative-nordic|Nordic curl negative|4|5r|Anchor|partial-nordic/assisted-nordic|Lower slowly through your longest repeatable Nordic range.|Catch yourself with your hands and use them to reset.|Counting the fall after you lose control.|nordic
nordic|Full Nordic curl|5|5r|Anchor|negative-nordic|Lower and return from a Nordic curl without pushing off the floor.|Keep a long line from knees to shoulders and scale the range as needed.|Folding at your waist to start the return.|nordic
reverse-nordic|Reverse Nordic curl|3|8r|Floor|pause-squat|Lean back from tall kneeling and return using your quads.|Keep hips extended and start with a short range.|Sitting back on the heels as the torso lowers.|reverseNordic
calf-raise|Standing calf raise|1|20r|Floor||Lift both heels and lower them smoothly.|Move through the big toe as well as the outer foot.|Bouncing instead of controlling the bottom.|calf
one-calf|Single-leg calf raise|2|15r|Floor|calf-raise|Rise onto the ball of one foot and lower with control.|Use a fingertip for balance if helpful.|Letting the ankle roll out at the top.|calf|each
single-slider-curl|Single-leg sliding hamstring curl|4|8r|Floor|ham-slider+one-glute|Slide one heel while the opposite leg stays lifted.|Keep the pelvis level and limit range to what you can pull back.|Losing hip height as the leg straightens.|nordic|each
single-thrust|Single-leg hip thrust|4|10r|Bench|one-glute+hip-hinge|Raise and lower your hips from a bench using one planted leg.|Set the bench to stay still and keep the ribs over the pelvis.|Extending the low back instead of moving at the hip.|bridge|each
one-nordic-assisted|Assisted single-leg Nordic negative|5|4r|Anchor,Band|nordic+single-slider-curl|Bias one hamstring in a Nordic descent with a steady assist.|Use a stable anchor and ample assistance to start.|Removing help before you can control the last part.|nordic|each,assisted
weighted-nordic|Weighted Nordic curl|5|4r|Anchor,Weight|nordic|Add secure load to a full, controlled Nordic curl.|Use small increases so you can reverse the descent.|Picking a heavier load by shortening your range.|nordic|weighted
deficit-calf|Deficit single-leg calf raise|3|15r|Bench|one-calf|Use a stable step edge for a longer single-leg calf raise.|Hold a fixed support and control the descent below the step.|Dropping the heel quickly to rebound.|calfStep|each
weighted-calf|Weighted single-leg calf raise|4|12r|Bench,Weight|deficit-calf|Carry a secure load for controlled single-leg raises from a step.|Keep your grip on a fixed balance support if needed.|Letting the ankle roll as you reach the top.|calfStep|each,weighted
`);

addTrack('trunk', 'core', 'Hollow body & bracing', 'hollow', `
dead-bug|Dead bug|1|8r|Floor||Reach opposite arm and leg away from a supine brace.|Keep your trunk still as the limbs move.|Choosing a reach that causes the low back to lift.||each
tuck-hollow|Tuck hollow hold|1|20s|Floor|dead-bug|Hold a curled trunk with both knees bent.|Keep your lower back in gentle contact with the floor.|Pulling the head up with neck tension.
one-hollow|Single-leg hollow hold|2|20s|Floor|tuck-hollow|Extend one leg while holding a hollow position.|Set the leg angle where your lower back stays down.|Extending farther after your ribs flare.||each
hollow|Hollow body hold|3|30s|Floor|one-hollow|Hold both legs straight and shoulders slightly elevated.|Shorten the arm or leg reach when you lose back contact.|Holding a low leg angle by arching your back.
hollow-rock|Hollow rock|3|12r|Floor|hollow|Rock in a hollow shape while holding the same body curve.|Use a small controlled rocking motion.|Pumping your legs to create momentum.
forearm-plank|Forearm plank|1|30s|Floor||Hold a straight body supported by elbows and toes.|Press your forearms down and keep ribs over pelvis.|Letting hips sag or rise as you fatigue.
long-plank|Long-lever plank|3|25s|Floor|forearm-plank|Move elbows ahead of shoulders to lengthen the plank lever.|Move the elbows forward a little at a time.|Progressing leverage while losing a neutral trunk.
side-plank-knee|Knee side plank|1|20s|Floor||Support yourself sideways with the bottom knee bent.|Place your elbow under your shoulder and lift the waist.|Rolling the chest toward the floor.|sidePlank|each
side-plank|Side plank|2|25s|Floor|side-plank-knee|Hold a straight lateral line from shoulder to ankle.|Stack your ribs over your pelvis and press the floor away.|Letting the waist sink between shoulder and feet.|sidePlank|each
copenhagen|Copenhagen plank|4|20s|Bench|side-plank|Support your top leg on a stable bench for a lateral hold.|Start with the top knee supported before moving to the ankle.|Raising the bottom leg at the cost of a sagging trunk.|sidePlank|each
rkc-plank|Hardstyle forearm plank|3|20s|Floor|forearm-plank|Create active full-body tension in a short forearm plank.|Draw the elbows toward your toes without moving either end.|Holding your breath until the whole brace collapses.|hollow
body-saw|Plank body saw|4|10r|Floor|long-plank+rkc-plank|Move your plank body back and forward through a short range.|Maintain the rib and pelvis position as the shoulders travel.|Letting the lower back sag at the far end.|ringFallout
ring-fallout|Ring rollout|4|8r|Rings|body-saw+ring-row|Reach the rings forward from a leaning brace and return without bending at the hips.|Choose a body angle where the ribs stay down the whole time.|Letting the rings pull you into a back arch.|ringFallout
long-ring-fallout|Long-lever ring rollout|5|6r|Rings|ring-fallout+hollow|Use lower rings and a longer reach for a harder rollout.|Make the change in leverage small and keep a controlled return.|Lowering the rings until you cannot recover without piking.|ringFallout
star-side-plank|Star side plank|4|20s|Floor|side-plank|Raise the top leg during a straight-leg side plank.|Press the grounded forearm down and keep the pelvis level.|Rolling backward to lift the foot.|sidePlank|each
dynamic-copenhagen|Copenhagen plank leg lift|5|8r|Bench|copenhagen+star-side-plank|Hold the top leg on a stable bench and lift the bottom leg under control.|Keep the supporting hip high while the bottom leg moves.|Bending at the waist or turning the chest down.|sidePlank|each
`);

addTrack('raises', 'core', 'Leg raises & rotation', 'raise', `
floor-knee-raise|Lying knee raise|1|12r|Floor||Draw bent knees toward your torso without swinging.|Curl the pelvis slightly and lower slowly.|Using a big lower-back arch between reps.
floor-leg-raise|Lying straight-leg raise|2|12r|Floor|floor-knee-raise+tuck-hollow|Raise straight legs from a supine brace.|Stop lowering when your pelvis starts to tip forward.|Trying to touch heels down after losing control.
hang-knee|Hanging knee raise|2|10r|Bar|floor-knee-raise+active-hang|Lift knees from a quiet hang.|Tip the pelvis back at the top and pause your swing.|Throwing knees upward with momentum.
hang-leg|Hanging straight-leg raise|3|10r|Bar|hang-knee/floor-leg-raise+active-hang|Raise straight legs toward horizontal from a quiet hang.|Focus on controlled pelvis movement at the top.|Kicking the legs ahead of your trunk.
toes-bar|Strict toes-to-bar|4|6r|Bar|hang-leg|Raise your feet to the bar using compression and a slight backward lean.|Lower smoothly to a still hang between reps.|Swinging behind the bar to start the next rep.
tuck-wiper|Bent-knee hanging wiper|4|6r|Bar|hang-knee+hollow|Rotate bent knees side to side from a controlled high hang.|Keep the swing slow and match range on both sides.|Twisting quickly and losing the shoulder position.|wiper|each
full-wiper|Straight-leg windshield wiper|5|5r|Bar|tuck-wiper+toes-bar|Sweep straight legs side to side while holding a high hanging position.|Reduce range if your shoulders or hips start to drop.|Hurling the legs through the center.|wiper|each
lh-bar|Hanging L-sit|4|20s|Bar|hang-leg+l-sit|Hang with both straight legs held at about hip height.|Start from a quiet hang and keep the ribs from flaring.|Swinging the legs into position and calling it a hold.|lHang
paused-hang-leg|Paused hanging straight-leg raise|4|8r|Bar|hang-leg|Pause the legs at horizontal before lowering them steadily.|Keep your pelvis tucked at the top of the rep.|Losing the pause as the legs begin to swing.|hangingLeg
toes-bar-pause|Paused strict toes-to-bar|5|5r|Bar|toes-bar+paused-hang-leg|Pause at or near bar contact, then return to a quiet hang.|Use controlled compression at the top and keep arms active.|Letting the feet rebound off the bar.|toes
loaded-hang-leg|Weighted hanging leg raise|5|6r|Bar,Weight|paused-hang-leg+lh-bar|Use light secured ankle weights for controlled leg raises.|Maintain the same stop height and avoid momentum.|Holding a loose object between your feet.|hangingLeg|weighted
pause-wiper|Paused straight-leg windshield wiper|5|5r|Bar|full-wiper+lh-bar|Pause near the endpoint of each strict hanging rotation.|Choose an angle you can stop under control on both sides.|Allowing your legs to pull the shoulders into a swing.|wiper|each
`);

addTrack('sits', 'core', 'L-sit, V-sit & compression', 'lSit', `
seated-support|Seated support press|1|15s|Parallettes||Press down on handles beside your hips with your feet grounded.|Lock elbows and lift your hips a little.|Shrugging shoulders and leaning hard backward.
tuck-sit|Tuck L-sit|2|15s|Parallettes|seated-support|Lift both feet while holding bent knees close.|Press strongly down and keep elbows straight.|Letting shoulders rise as hips fall.
one-l-sit|One-leg L-sit|3|12s|Parallettes|tuck-sit|Straighten one leg during a supported L-sit.|Keep the straight leg level and swap sides cleanly.|Leaning to one side to lift the extended leg.||each
l-sit|L-sit|3|20s|Parallettes|one-l-sit+compression/tuck-sit+seated-double|Hold both straight legs at or near horizontal in support.|Press down through straight elbows and lift your toes.|Bending knees to maintain time.
floor-l-sit|Floor L-sit|4|15s|Floor|l-sit|Perform an L-sit with hands on the floor for less clearance.|Use active shoulder depression and strong compression.|Letting heels brush the floor for support.
ring-l-sit|Ring L-sit|4|15s|Rings|l-sit+ring-support|Hold an L-sit while supporting yourself on rings.|Keep rings by your hips and stop the straps from swinging.|Pulling the rings behind you to create leverage.
compression|Seated single-leg pike lift|2|10r|Floor|floor-knee-raise|Lift one straight leg off the floor while sitting in a pike.|Place hands near the thighs and move them forward as control improves.|Leaning backward to lift the leg.|compression|each
seated-double|Seated double-leg pike lift|3|8r|Floor|compression|Lift both straight legs while seated without rocking backward.|Keep knees long and use a pulse-free lift and lower.|Starting the lift with a backward shoulder swing.|compression
straddle-lift|Seated straddle compression lift|3|8r|Floor|compression|Lift straight legs from a seated straddle.|Press your hands down and keep the effort small and controlled.|Bending knees or bouncing heels off the floor.|press
advanced-l-sit|High L-sit|4|15s|Parallettes|l-sit+seated-double|Lift your feet above horizontal in a supported L-sit.|Keep the shoulders firmly pressing down as the legs rise.|Trading straight elbows for leg height.|vSit
v-sit|V-sit|5|10s|Parallettes|advanced-l-sit|Support yourself with straight arms and both legs raised past a high L.|Build height in small increments with straight legs.|Rounding sharply or bending knees to claim extra height.|vSit
lsit-v-transition|L-sit to V-sit|5|5r|Parallettes|v-sit+advanced-l-sit|Raise straight legs from L-sit into a V and return deliberately.|Keep the elbows long and move from compression.|Swinging the legs or leaning suddenly backward.|vSit
floor-v-sit|Floor V-sit|5|12s|Floor|floor-l-sit+v-sit|Hold a V-sit with your hands flat beside your hips.|Use active shoulder depression and steady leg height.|Lifting the heels with bent elbows.|vSit
ring-v-sit|Ring V-sit|5|10s|Rings|ring-l-sit+v-sit|Hold a V-sit while keeping both rings controlled beneath the hips.|Enter from a quiet L-sit before raising your legs.|Letting the rings swing outward to get your feet up.|vSit
middle-split-support|Middle split support hold|4|15s|Parallettes|straddle-lift+l-sit|Lift into a supported straddle with your hands between your legs.|Press down through both handles and keep the knees long.|Bouncing the heels off the floor to enter.|middleSupport
tuck-manna|Tuck manna lean|5|10s|Parallettes|v-sit+middle-split-support|Practice leaning back into manna support with the knees tucked.|Keep your descent and return controlled before straightening your legs.|Letting the shoulders collapse behind the hands.|manna
full-manna|Manna|5|8s|Floor|tuck-manna+floor-v-sit|Balance in deep shoulder extension with the hips lifted and the legs held high.|Build from shorter assisted holds and use small changes in leverage.|Forcing a deeper shoulder position to reach the shape.|manna
`);

addTrack('handstands', 'balance', 'Handstand balance', 'handstand', `
wrist-rock|Quadruped wrist rock|1|12r|Floor||Rock gently forward and back over your palms to warm up loaded wrists.|Spread your fingers and make each rock gradual.|Forcing an extreme wrist angle under sudden load.|wrist
scap-push|Scapular push-up|1|12r|Floor||Glide shoulder blades together and apart without bending your elbows.|Reach the floor away at the top of the rep.|Doing a small elbow bend instead.|scap
box-hs|Box pike handstand hold|2|20s|Bench|wrist-rock+scap-push|Place feet on a box and stack the hips over the upper body as far as you can.|Press tall through your shoulders and look between your hands.|Driving forward past a position you can exit.
wall-walk|Partial wall walk|2|5r|Wall|box-hs|Walk feet up a wall and hands a short distance in, then reverse.|Keep the return within the same controlled range.|Walking too close to the wall before you have an exit.
wall-hs|Chest-to-wall handstand|3|30s|Wall|wall-walk/box-hs+long-plank|Hold a wall-assisted handstand with your chest toward the wall.|Press tall and lightly contact the wall with your toes.|Using a big arch to rest on the wall.
back-wall-hs|Back-to-wall handstand|3|25s|Wall|box-hs|Practice a wall-supported handstand entered with a controlled kick-up.|Keep a light heel touch and leave room for a safe down-step.|Kicking the wall hard to catch balance.
wall-float|Wall handstand toe pull|3|5r|Wall|wall-hs/back-wall-hs|Peel your feet off the wall briefly with fingertip balance.|Use tiny fingertip pressure changes to float.|Pushing off the wall with a kick.
kick-hs|Freestanding kick-up practice|3|8r|Floor|wall-float|Practice reaching a balanced vertical position on a light kick-up.|Use an open area and rehearse a controlled cartwheel exit.|Throwing both legs up harder after an overshoot.
free-hs|Freestanding handstand|4|20s|Floor|wall-float+kick-hs|Balance vertically on both hands with no wall support.|Press tall and use fingertips for small corrections.|Arching or walking every time you drift.
straight-hs|Straight-line handstand|4|35s|Floor|free-hs|Hold a quiet freestanding handstand with a stacked body line.|Align ankles, hips, and shoulders over the wrists.|Chasing hold time after losing the line.
para-hs|Parallette handstand|4|20s|Parallettes|free-hs|Balance vertically while gripping low stable parallettes.|Use firm palm pressure and feel the front and back of each handle.|Using handles that can tip during an exit.
hs-shift|Handstand weight shift|4|8r|Floor|free-hs|Shift your balance slowly between supporting hands.|Keep the loaded shoulder lifted as the other hand becomes light.|Making an abrupt transfer with a bent elbow.||each
one-hs|One-arm handstand|5|5s|Floor|straight-hs+hs-shift|Briefly balance over one palm from a controlled weight shift.|Practice fingertip assistance before fully releasing the free hand.|Dropping the loaded shoulder when the second hand leaves.||each
straddle-handstand|Straddle handstand|4|25s|Floor|free-hs|Hold a freestanding handstand with your legs evenly apart.|Open the legs slowly while keeping your hips over your hands.|Splitting the legs to compensate for a falling torso.|handstand
tuck-to-straight-hs|Tuck-to-straight handstand|5|5r|Floor|tuck-balance+straight-hs|Alternate between tuck and straight shapes while staying on your hands.|Move your knees and hips slowly enough to rebalance.|Changing shapes with a fast kick.|handstand
handstand-walk|Handstand walk|5|10r|Floor|free-hs+hs-shift|Walk on your hands and count each deliberate hand placement.|Use short steps and choose a clear place to exit.|Trying to catch a fall with a long reaching step.|handWalk
handstand-pirouette|Handstand half turn|5|3r|Floor|handstand-walk+straddle-handstand|Turn 180 degrees by repositioning your hands while inverted.|Practice short, deliberate transfers and use space around you.|Spinning the legs before loading the working hand.|handWalk|each
one-arm-hs-assisted|Fingertip-assisted one-arm handstand|5|12s|Floor|straddle-handstand+hs-shift|Balance mainly on one palm with light fingertip help from the other hand.|Stack over the loaded wrist and gradually lighten the assistance.|Lifting the helper hand before your weight is supported.|oneArmHandstand|each,assisted
one-hs-straddle|Straddle one-arm handstand|5|8s|Floor|one-hs/one-arm-hs-assisted+straight-hs|Hold a one-arm balance with your legs in a controlled straddle.|Stay tall through the supporting shoulder and alternate sides.|Dropping the hip on the side of the released hand.|oneArmHandstand|each
one-hs-legs-together|Legs-together one-arm handstand|5|5s|Floor|one-hs-straddle|Hold a one-arm balance after bringing your legs together.|Close the straddle in stages while keeping a steady supporting arm.|Snapping the legs shut before the balance settles.|oneArmHandstand|each
`);

addTrack('press', 'balance', 'Crow & press to handstand', 'press', `
crow-shift|Crow weight shift|1|8r|Floor|wrist-rock|Lean forward with knees against upper arms and toes still down.|Look slightly ahead and let pressure move toward the fingertips.|Throwing the hips up before the hands are loaded.|frog
crow|Crow stand|2|20s|Floor|crow-shift|Hold a bent-arm balance with knees supported on your upper arms.|Use a soft clear space in front and load each palm evenly.|Looking back toward your feet and toppling forward.|frog
tuck-balance|Tuck handstand hold|4|15s|Floor|free-hs+crow|Balance with knees tucked and hips above shoulders.|Change the shape slowly while keeping hands still.|Pulling knees down faster than the shoulders adjust.
press-negative|Straddle press negative|4|3r|Floor|wall-hs+straddle-lift|Lower from handstand through a straddle with straight elbows.|Keep feet low only as long as the shoulders can support the shift.|Falling into the final part of the descent.
box-press|Elevated straddle press|4|4r|Bench|press-negative|Use a low stable platform to shorten the initial press range.|Lean before lifting the feet and keep the movement slow.|Jumping off the box to get over the sticking point.
straddle-press|Straddle press to handstand|5|3r|Floor|box-press+free-hs|Press from a floor straddle into a handstand without a jump.|Lift the hips first and keep elbows long.|Bending the elbows or jumping the legs up.
pike-press|Pike press to handstand|5|3r|Floor|straddle-press+seated-double|Press to handstand with the legs together.|Build time in deep pike compression and keep shoulders active.|Using a hip kick to start the lift.
tuck-press|Tuck press to handstand|5|3r|Floor|press-negative+tuck-balance|Press from a compressed tuck without jumping into the handstand.|Lift your hips before unfolding the knees.|Kicking the feet instead of shifting over the hands.
press-to-straddle-stand|Handstand to seated straddle|5|4r|Floor|straddle-press+middle-split-support|Lower a handstand toward a controlled seated straddle with straight arms.|Make the last part of the descent as deliberate as the first.|Dropping onto your seat after your legs clear.
stalder-press|Stalder press to handstand|5|3r|Floor|press-to-straddle-stand+straddle-lift|Press from a seated straddle through support into a handstand.|Keep the legs compressed as the hips rise past your shoulders.|Bending the elbows to pull the legs off the floor.|stalder
l-sit-press|L-sit press to handstand|5|3r|Parallettes|pike-press+floor-l-sit|Press from a supported L-sit to handstand with joined legs.|Use a smooth compression as your feet pass under you.|Swinging the legs to generate the first part of the press.
straight-arm-press-cycle|Pike press and controlled return|5|3r|Floor|pike-press+l-sit-press|Press into a handstand from a pike and lower back through the same line.|Keep the elbows straight and lightly return your feet to the floor.|Dropping to the floor instead of reversing the press.
`);

addTrack('front-levers', 'straight', 'Front lever', 'front', `
lever-scap|Straight-arm lever pulls|2|10r|Bar|scap-pull+hollow|Practice a small straight-arm pull from a hang.|Keep elbows straight and move your shoulders with the lats.|Bending arms to make the range bigger.
tuck-front|Tuck front lever|3|15s|Bar|lever-scap|Hold your hips level with shoulders and knees tucked.|Keep your arms long and pull the bar toward your hips.|Letting hips sink below the shoulders.
adv-front|Advanced tuck front lever|4|12s|Bar|tuck-front|Open the hip angle while keeping the knees bent.|Extend only as far as you can keep your back line level.|Calling it advanced tuck while folding tightly at the hips.
one-front|One-leg front lever|4|10s|Bar|adv-front|Extend one leg in line with your torso and tuck the other.|Keep hips square and alternate your extended leg.|Rotating to the tucked side for extra leverage.||each
straddle-front|Straddle front lever|5|10s|Bar|adv-front+straddle-lift/one-front|Hold a horizontal front lever with legs apart.|Keep both legs level with the torso and use a controllable width.|Letting hips pike so the feet appear higher.
band-front|Band-assisted front lever|4|12s|Bar,Band|adv-front|Use a band at the hips to rehearse a straight body line.|Use consistent band placement to make progress comparisons meaningful.|Moving the band down the legs to make the hold easier.||assisted
front|Full front lever|5|10s|Bar|straddle-front/band-front+one-front|Hold your whole body straight and horizontal beneath a bar.|Keep straight elbows and make the rib-to-hip line steady.|Counting a hold with hips visibly dropping.
front-raise|Front lever raise|5|5r|Bar|front|Raise a straight body into horizontal front lever and lower slowly.|Use the shoulders and trunk together without swinging.|Starting with a knee throw.
front-row|Front lever row|5|3r|Bar|front+elevated-row|Row while maintaining a nearly horizontal front lever.|Scale to tuck form if the body line changes during the pull.|Pulling after letting the hips fall.
tuck-front-raise|Tuck front lever raise|4|6r|Bar|tuck-front+lever-scap|Lift into a front lever position with knees tucked and elbows straight.|Raise from a still hang and keep the tuck angle consistent.|Starting with a knee kick to gain height.|tuckFrontRaise
half-front|Half-lay front lever|5|12s|Bar|adv-front+one-front|Keep the hips extended while bending your knees so your legs form a shorter lever.|Maintain a flat line from shoulders through the thighs.|Tucking at the hips as the weight shifts.|halfFront
ring-front|Full front lever on rings|5|10s|Rings|front+ring-pull|Hold a straight front lever with your hands on rings.|Keep the rings level and prevent the straps from twisting quickly.|Bending the elbows to hold your feet higher.|front
front-touch-row|Front lever touch row|5|3r|Bar|front-row+advanced-tuck-lever-row|Row in a front lever until the bar reaches low on the torso.|Keep the hips level through the last inches of the row.|Raising the knees to bring the bar closer.|front
front-inverted-raise|Front lever to inverted hang|5|4r|Bar|front-raise+front|Raise from a front lever toward an inverted hang and lower under control.|Use straight arms and match the body shape on the return.|Bending elbows and kicking past horizontal.|front
one-arm-front-assist|Assisted one-arm front lever|5|8s|Bar,Band|ring-front+one-pull-lockoff|Bias one arm in a front lever with stable assistance.|Use a manageable assist and keep your shoulders squared.|Rotating to the working arm to gain hold time.|oneArmFront|each,assisted
one-arm-front|One-arm front lever|5|5s|Bar|one-arm-front-assist+front-touch-row|Hold the front lever line under a single supporting arm.|Use a controlled entry and build time on both sides.|Starting the hold from a large swing.|oneArmFront|each
`);

addTrack('back-levers', 'straight', 'Back lever & ring rotation', 'back', `
skin-cat|Skin the cat|3|5r|Rings|active-hang+tuck-hollow|Rotate through a tucked inverted hang and return under control.|Set rings low enough to put your feet down and keep the range comfortable.|Dropping uncontrolled into shoulder extension.|skinCat
german-hang|German hang|3|15s|Rings|skin-cat|Practice a supported hang with arms behind the body.|Start with foot support and progress shoulder extension gradually.|Forcing depth through shoulder discomfort.|skinCat
tuck-back|Tuck back lever|3|15s|Rings|skin-cat+german-hang|Hold face-down horizontal with knees tucked.|Enter slowly from an inverted hang and keep elbows long.|Unfolding before shoulders can hold the short lever.
adv-back|Advanced tuck back lever|4|12s|Rings|tuck-back|Open the hips from tuck without straightening knees fully.|Keep shoulders and hips nearly level.|Arching sharply to get the hips higher.
one-back|One-leg back lever|4|10s|Rings|adv-back|Extend one leg while keeping the other leg tucked.|Match both sides and avoid twisting at the hips.|Rotating toward the straight-leg side.||each
straddle-back|Straddle back lever|5|10s|Rings|adv-back/one-back|Extend both legs apart and hold the face-down line.|Keep elbows straight and the legs in line with the torso.|Using a wide straddle to hide a deep hip bend.
back|Full back lever|5|10s|Rings|straddle-back/one-back+adv-back|Hold a straight horizontal position facing down from rings.|Build shorter, controlled holds before adding time.|Rushing into a locked-arm hold with a fast drop.
band-full-back|Band-assisted full back lever|4|12s|Rings,Band|adv-back|Practice the straight body line with a repeatable band setup.|Reduce assistance in small steps after controlling the entry.|Moving the band between sets to change the lever.|back|assisted
back-lever-negative|Back lever negative|4|5r|Rings|straddle-back/band-full-back|Lower from inverted hang toward a controlled back lever line.|Scale from tuck or straddle before using a straight body.|Dropping through horizontal as your shoulders load.|back
bar-back|Full back lever on bar|5|10s|Bar|back+back-lever-negative|Hold a straight back lever on a fixed bar.|Use a comfortable grip and ease into the shoulder angle.|Rotating into the hold with momentum.|back
back-lever-raise|Back lever raise to inverted hang|5|4r|Rings|back+back-lever-negative|Raise the straight back lever to an inverted hang without bending your elbows.|Make the move slowly and lower to a stable horizontal line.|Tucking the knees to start the ascent.|back
hefesto-negative|Hefesto negative|5|3r|Low bar|bar-back+straight-dip|Lower from reverse bar support toward a behind-the-body hang.|Practice a short range on a low setup with help as needed.|Dropping into shoulder extension before you can brake.|hefesto
hefesto|Hefesto|5|3r|Bar|hefesto-negative+back-lever-raise|Pull from a behind-the-body hang into reverse bar support.|Build a smooth bent-arm pull from a coached or assisted setup.|Jumping into full end range to get momentum.|hefesto
`);

addTrack('planches', 'straight', 'Planche', 'planche', `
planche-lean|Planche lean|2|20s|Floor|wrist-rock+scap-push|Lean forward from a straight-arm plank with toes down.|Push the floor away and shift shoulders past wrists gradually.|Bending elbows to lean farther.
pseudo-push|Pseudo-planche push-up|3|8r|Floor|planche-lean+push-up|Do push-ups with hands nearer the hips and shoulders forward.|Maintain a deliberate forward lean at the top.|Rocking back on every press.
tuck-planche|Tuck planche|4|12s|Parallettes|planche-lean+crow|Hold both feet off the floor with knees tucked under straight arms.|Keep shoulder blades spread and hips near shoulder height.|Resting knees on the arms as in crow.
adv-planche|Advanced tuck planche|4|12s|Parallettes|tuck-planche|Open the tuck to a longer body position while maintaining straight elbows.|Shift forward a little as your hips extend.|Losing shoulder protraction as you increase leverage.
one-planche|One-leg planche|5|8s|Parallettes|adv-planche|Extend one leg behind a tuck planche.|Keep your hips facing the floor and alternate sides.|Opening one hip upward instead of extending the leg.||each
straddle-planche|Straddle planche|5|8s|Parallettes|one-planche/adv-planche+straddle-lift|Hold a horizontal planche with straight legs spread.|Keep active shoulders and level hips as legs extend.|Lifting the legs while letting your chest fall.
full-planche|Full planche|5|8s|Parallettes|straddle-planche|Balance horizontally on straight arms with feet together.|Make small shoulder shifts and keep elbows fully controlled.|Widening the legs or arching to save the hold.
bent-planche|Bent-arm planche|4|10s|Parallettes|pseudo-push+tuck-planche|Hold a horizontal body line with bent arms and forward shoulders.|Start in a tuck before lengthening the lever.|Resting the torso on your elbows.
planche-push|Planche push-up|5|3r|Parallettes|full-planche+bent-planche|Lower and press while holding a horizontal planche line.|Use a strict tuck variation if you lose the line during the press.|Dropping the legs to create a normal push-up.
half-planche|Half-lay planche|5|10s|Parallettes|adv-planche+one-planche|Hold a planche with the thighs long and the knees bent.|Extend the hips gradually while keeping shoulders active.|Piking the hips as the knees come together.|halfPlanche
band-full-planche|Band-assisted full planche|4|12s|Parallettes,Band|adv-planche|Rehearse a straight body planche with steady support from a band.|Record a consistent attachment and keep the elbows long.|Changing the band position to hide loss of control.|planche|assisted
ring-tuck-planche|Ring tuck planche|5|10s|Rings|tuck-planche+rto-support|Hold a short-lever planche on low rings with the knees tucked.|Keep the rings steady and slightly turned out as tolerated.|Letting the straps flare once the feet lift.|planche
ring-straddle-planche|Ring straddle planche|5|8s|Rings|ring-tuck-planche+straddle-planche|Hold a horizontal straddle planche on rings.|Work from low rings with a controllable grip and slow entry.|Increasing the leg reach while the rings drift outward.|planche
ring-full-planche|Full ring planche|5|5s|Rings|ring-straddle-planche+full-planche|Hold a straight, feet-together planche in ring support.|Keep the shoulder blades active as you bring your legs together.|Letting the ring position change to buy extra hold time.|planche
planche-to-handstand|Planche press to handstand|5|3r|Parallettes|full-planche+straddle-press|Press from planche to a controlled handstand with straight elbows.|Practice the shoulder shift and control both ends before linking them.|Bending the elbows or kicking the legs through.|planche
handstand-planche-negative|Handstand to planche negative|5|3r|Parallettes|planche-to-handstand+half-planche|Lower from a stacked handstand to horizontal under straight-arm control.|Shift the shoulders forward gradually as your legs descend.|Dropping fast before the shoulders can take the load.|planche
`);

addTrack('flags', 'straight', 'Human flag', 'flag', `
flag-plank|Flag plank|2|20s|Vertical pole|side-plank|Keep feet supported while practicing opposite hand forces on a pole.|Pull with the top arm and press with the bottom arm.|Hanging only from the upper hand.||each
low-flag|Low diagonal flag|3|12s|Vertical pole|flag-plank|Lift into a diagonal flag below horizontal.|Make the bottom elbow firm before you take weight off the floor.|Jumping into the hold without a controlled shoulder position.||each
tuck-flag|Tuck human flag|4|10s|Vertical pole|low-flag|Hold near horizontal with knees pulled toward your torso.|Stack both shoulders and stay facing forward.|Rolling chest down as your legs lift.||each
one-flag|One-leg human flag|4|8s|Vertical pole|tuck-flag|Extend one leg from a tuck flag to increase leverage.|Control how the hips open and compare both directions.|Letting your top shoulder rotate as the leg extends.||each
straddle-flag|Straddle human flag|5|8s|Vertical pole|one-flag/tuck-flag+straddle-lift|Hold a flag with legs spread to shorten effective leverage.|Keep the torso level and make the split deliberate.|Hiking one hip to hold the legs up.||each
full-flag|Full human flag|5|8s|Vertical pole|straddle-flag|Hold your body horizontal to the side of a stable pole.|Pair a strong lower-arm push with an upper-arm pull.|Starting the hold from a large kick.||each
vertical-flag|Vertical human flag|4|12s|Vertical pole|low-flag|Use opposing hand pressure to hold your legs high along the pole.|Use a smooth entry and keep the lower arm active.|Kicking high before the shoulders are set.|verticalFlag|each
straddle-flag-negative|Straddle human flag negative|4|5r|Vertical pole|straddle-flag+vertical-flag|Lower from a high flag toward horizontal with the legs in straddle.|Break the movement into ranges you can control.|Falling through horizontal without braking.|flag|each
flag-raise|Strict human flag raise|5|4r|Vertical pole|full-flag+straddle-flag-negative|Raise a straight body from a low flag to horizontal and return slowly.|Build both pushing and pulling pressure before lifting.|Starting with a large swing or jumping the feet up.|flag|each
pause-flag-raise|Paused human flag raise|5|3r|Vertical pole|flag-raise|Pause at horizontal on each controlled flag raise.|Keep the hips square and briefly stop the legs at the top.|Skipping the pause to use momentum on the return.|flag|each
human-flag-pull-up|Human flag pull-up|5|3r|Vertical pole|flag-raise|Use the upper-arm pull and lower-arm push to move through a controlled flag rep.|Start in a short lever before extending both legs.|Letting the lower shoulder buckle during the pull.|flagPull|each
`);

addTrack('ring-strength', 'straight', 'Straight-arm ring strength', 'cross', `
ring-scap|Straight-arm ring shrug|2|10r|Rings|ring-support|In ring support, move the shoulder girdle without bending your arms.|Make the range small and hold the rings close.|Using an elbow bend to lift the shoulders.|ringDip
ring-cross-foot|Foot-assisted cross pull|4|8r|Rings|rto-support+ring-scap|Use low rings and grounded feet to rehearse outward arm load.|Keep most weight supported by your feet as needed.|Going wide before you can stay steady.||assisted
ring-cross-band|Band-assisted iron cross|5|8s|Rings,Band|ring-cross-foot|Use substantial assistance to hold the straight-arm cross position.|Choose a repeatable, heavily assisted setup and build time gradually.|Removing assistance before shoulder position is stable.||assisted
cross|Iron cross|5|5s|Rings|ring-cross-band|Hold a ring cross with arms extending horizontally to each side.|Treat this as a specialist ring skill and build from coached assistance.|Attempting the unsupported hold after only support holds.
ring-inverted-hang|Inverted ring hang|3|20s|Rings|skin-cat+ring-support|Hold a quiet vertical upside-down hang on low rings.|Use a tucked entry and leave room to put your feet down.|Rushing the kick-up and setting the straps swinging.|skinCat
straight-ring-invert|Straight-body ring raise to inverted hang|4|5r|Rings|ring-inverted-hang+lever-scap|Raise toward an inverted hang with elbows straight and feet together.|Keep the rise slow and begin from a stable low setup.|Using a long kick or suddenly bending both arms.|front
cross-negative|Assisted iron cross negative|5|4r|Rings,Band|ring-cross-band+rto-support|Lower from ring support toward a cross with ample assistance.|Choose a range you can stop and reverse comfortably.|Spreading the rings too rapidly under load.|cross|assisted
cross-pull-out|Assisted iron cross pull-out|5|4r|Rings,Band|cross-negative|Press down on the rings from an assisted cross and return to support.|Keep your elbows straight and assistance consistent.|Bending the elbows to skip the weakest part of the press.|cross|assisted
cross-press-out|Iron cross press to support|5|3r|Rings|cross+cross-pull-out|Return from a steady cross to tall support with straight arms.|Start from a controllable cross and keep rings moving evenly.|Using bent elbows or a leg kick to stand up.|cross
`);

addTrack('mobility', 'mobility', 'Mobility & preparation', 'shoulder', `
wrist-circles|Wrist circles|1|10r|Floor||Make slow wrist circles before loaded hand work.|Move through a comfortable range with relaxed fingers.|Forcing the wrist into a pinchy endpoint.|wrist|each
palm-lift|Quadruped palm lift|2|12r|Floor|wrist-rock|Raise your palms slightly while your fingers stay on the floor.|Keep the movement controlled and use little bodyweight.|Bouncing onto the fingers from stiff wrists.|wrist
wall-slide|Wall shoulder slide|1|12r|Wall||Slide arms upward on a wall while maintaining a quiet trunk.|Keep your ribs down as you reach overhead.|Arching your back for extra reach.
bench-overhead|Bench overhead reach|1|25s|Bench|wall-slide|Reach arms overhead with forearms on a bench and hips back.|Breathe into the stretch while keeping the range comfortable.|Forcing your chest down after the ribs flare.
thoracic-turn|Seated thoracic rotation|1|8r|Floor||Rotate the upper trunk slowly while staying tall.|Turn through your rib cage and match each side.|Using your hands to crank the twist.|rotation|each
knee-ankle|Knee-to-wall ankle rock|1|12r|Wall||Drive one knee gently forward while holding your heel down.|Track the knee over your middle toes.|Lifting your heel to reach farther.|pistol|each
deep-squat|Supported deep squat hold|1|30s|Floor|supported-squat|Sit into a deep bodyweight squat with light balance support.|Use a comfortable stance and breathe steadily.|Forcing the ankles to support a depth you cannot control.|squat
pike-fold|Seated pike reach|1|25s|Floor||Fold forward gently from seated with legs together.|Tip forward from the hips and stay in a comfortable range.|Bouncing down to gain extra reach.|press
straddle-fold|Seated straddle reach|2|25s|Floor|pike-fold|Hinge forward from a comfortable seated straddle.|Keep knees and toes pointing up as you tip your pelvis.|Forcing a wider straddle while turning the knees in.|press
short-bridge|Short bridge hold|1|25s|Floor|glute-bridge|Hold hips elevated with the shoulders supported on the floor.|Keep weight on the feet and upper back.|Pushing through the neck.|bridge
full-bridge|Full bridge hold|4|20s|Floor|short-bridge+bench-overhead+wrist-rock|Press into an arched bridge on hands and feet when shoulder and wrist range allow.|Move in and out slowly and stop at a controllable height.|Forcing the arms straight while the spine takes all the bend.|bridge
seated-pike-pulse|Active seated pike lift and reach|3|10r|Floor|pike-fold+compression|Alternate a steady forward reach with a short active leg lift.|Make the movement small enough to keep the knees straight.|Bouncing forward instead of moving from the hip.|press
elevated-bridge|Feet-elevated bridge|3|25s|Bench|short-bridge+bench-overhead|Use a sturdy low box to raise the feet in a bridge progression.|Open through the shoulders while keeping pressure through both palms.|Using a bench that shifts as you press.|fullBridge
bridge-shoulder-shift|Full bridge shoulder shift|4|8r|Floor|full-bridge|Rock a small distance toward the hands from a controlled bridge.|Move the shoulders gradually while keeping palms fully grounded.|Driving into more range by bending the elbows.|fullBridge
bridge-single-leg|Single-leg bridge hold|5|10s|Floor|bridge-shoulder-shift|Lift one foot from a stable full bridge for a brief hold.|Keep the planted foot and both palms loaded without twisting.|Throwing the lifted leg back to stay up.|fullBridge|each
bridge-kickover|Bridge kickover|5|3r|Floor|bridge-single-leg+wall-hs|Transfer from a bridge through a brief inverted split and step down.|Use a coached setup, a controlled lift, and clear landing space.|Throwing a leg to compensate for a weak shoulder shift.|bridgeKick|each
`);

addTrack('dragonflags', 'core', 'Dragon flag', 'dragon', `
dragon-knee-negative|Tuck dragon flag negative|3|6r|Bench|hollow+floor-leg-raise|Lower from a supported raised trunk with both knees tucked.|Brace through your shoulders on a stable bench and keep pressure off the neck.|Uncurling the lower back to reach farther.
dragon-tuck|Tuck dragon flag|4|8r|Bench|dragon-knee-negative|Raise and lower your trunk with knees bent in a short dragon flag lever.|Maintain a quiet pelvis and controlled return.|Swinging the knees upward to start.
dragon-one|One-leg dragon flag|4|6r|Bench|dragon-tuck|Extend one leg during controlled dragon flag reps.|Match the range on both sides and keep the shoulders supported.|Rotating your hips toward the tucked leg.||each
dragon-straddle|Straddle dragon flag|5|5r|Bench|dragon-one|Perform dragon flag reps with the legs apart to shorten the lever.|Keep both legs level and avoid opening the hips midway down.|Turning the pause into a deep lower-back arch.
dragon-full|Full dragon flag|5|5r|Bench|dragon-straddle/dragon-one+hollow-rock|Raise and lower a straight body line using a stable support behind the head.|Control the bottom and let the shoulder blades carry the load.|Bearing weight directly on your neck or bouncing the heels.
dragon-pause|Paused dragon flag|5|5r|Bench|dragon-full|Pause low in a strict dragon flag before returning to the top.|Use a comfortable stopping point where your trunk stays braced.|Choosing a depth you can only leave by bending at the hips.
dragon-hold|Low dragon flag hold|5|12s|Bench|dragon-pause|Isometrically hold a straight dragon flag just above your controllable bottom.|End the hold when your line changes.|Letting the feet drop into a relaxed back arch.
`);

addTrack('elbow-levers', 'balance', 'Elbow lever balance', 'elbow', `
elbow-lean|Foot-supported elbow lever lean|2|20s|Floor|wrist-rock|Learn to balance with your elbows against your torso while your toes stay supported.|Start with an easy forward shift and use a soft mat nearby.|Throwing your head and shoulders forward abruptly.
tuck-elbow|Tuck elbow lever|3|20s|Floor|elbow-lean+crow|Balance with both elbows supporting your torso and your knees tucked.|Lift your feet gradually and keep your gaze a little forward.|Letting the elbows slide apart.
straddle-elbow|Straddle elbow lever|3|15s|Floor|tuck-elbow|Balance horizontally with your feet spread and elbows braced under your torso.|Extend from the hips while keeping pressure even on both hands.|Dropping your head sharply as the legs extend.
full-elbow|Straight-body elbow lever|4|20s|Floor|straddle-elbow|Bring the legs together in a horizontal elbow lever.|Move the legs in slowly and use small hand-pressure adjustments.|Arching hard to keep your feet off the floor.
one-elbow-supported|Fingertip-assisted one-arm elbow lever|4|15s|Floor|full-elbow|Shift most of the hold to one elbow with fingertips assisting.|Keep the free hand close enough to catch a balance change.|Lifting the assisting hand before the working wrist is loaded.|oneElbow|each,assisted
one-elbow|One-arm elbow lever|5|10s|Floor|one-elbow-supported|Balance horizontally on a single arm braced against the torso.|Set a steady shoulder angle and alternate your supporting arm.|Leaning forward too fast while the free hand releases.|oneElbow|each
`);

addTrack('bar-transitions', 'pull', 'Bar transitions', 'pullover', `
low-bar-tuck-roll|Foot-assisted low-bar pullover|3|8r|Low bar|active-hang+hang-knee|Practice a pullover to support with a low bar and foot contact at the start.|Use a stable low setup and keep your torso close to the bar.|Pushing off the floor before securing both hands.||assisted
tuck-bar-pullover|Tuck bar pullover|4|6r|Bar|low-bar-tuck-roll+pull-up|Pull and rotate around a bar into support with knees tucked.|Guide the hips closely around the bar and finish upright.|Kicking into the bar and losing your grip.
straight-bar-pullover|Straight-leg bar pullover|4|5r|Bar|tuck-bar-pullover+toes-bar|Pull the hips over the bar with straight legs under control.|Pause once the hips contact the bar and transfer smoothly into support.|Using a big swing to make the turn.
slow-bar-pullover|Slow strict bar pullover|5|4r|Bar|straight-bar-pullover+chest-pull|Perform the full bar pullover slowly from a still hang.|Keep the path smooth through the point where the hips pass the bar.|Speeding up and pushing away from the bar during the turnover.
pullover-negative|Bar pullover negative|4|5r|Bar|tuck-bar-pullover+straight-dip|Reverse the pullover from support back to a quiet hang.|Keep both hands wrapped and control the hips as you tip forward.|Dropping to the hang and loading the shoulders suddenly.
pullover-cycle|Strict pullover and reverse|5|4r|Bar|slow-bar-pullover+pullover-negative|Link a strict pullover with a controlled return to a still hang.|Match the ascent and descent ranges and reset before each cycle.|Using the reverse to swing into the next rep.
`);

addTrack('splits', 'mobility', 'Splits & pancake', 'splits', `
half-front-split|Kneeling half front split|2|30s|Floor|pike-fold|Straighten the front leg from half kneeling and hinge gently forward.|Keep the front knee long and the hips facing forward.|Forcing the head to the knee by rounding the back.||each
supported-front-split|Supported front split|3|25s|Floor|half-front-split|Use support under your hands or hips as you lower toward a front split.|Maintain square hips and wear footwear that lets you stop the slide.|Sliding deeper than your hands can safely control.||each
front-split|Front split hold|4|25s|Floor|supported-front-split|Hold a controllable front split with both legs extended.|Stay square and move out of the range slowly.|Twisting the back leg out to reach the floor.||each
supported-middle-split|Supported middle split|3|25s|Floor|cossack+straddle-fold|Open into a wide straddle with controlled support from your hands.|Choose a foot angle where you can hold the shape and breathe.|Letting the feet slide apart faster than you can control.
middle-split|Middle split hold|4|25s|Floor|supported-middle-split|Hold your level of middle split while controlling the position of the hips.|Use a smooth entry and keep both sides evenly loaded.|Pushing abruptly deeper after reaching a steady range.
pancake-hold|Straddle pancake hold|4|30s|Floor|straddle-fold+seated-double|Hinge the pelvis forward into a controlled low straddle fold.|Keep your knees long and lengthen through the spine as you lower.|Only rounding the upper back to reach lower.|pancake
pancake-lift|Active pancake lifts|4|8r|Floor|pancake-hold+straddle-lift|Lift from a low straddle hinge using active hips and trunk control.|Use a small range and avoid pushing off the floor.|Bouncing your torso from the bottom.|pancake
`);

addTrack('elite-rings', 'straight', 'Maltese & Victorian', 'maltese', `
maltese-foot-lean|Foot-supported Maltese lean|4|15s|Rings|ring-tuck-planche+ring-cross-foot|Practice the wide straight-arm angle on low rings with your feet supporting most of the load.|Keep the support height and body angle consistent.|Going wide before the shoulders can hold the position.||assisted
maltese-band|Band-assisted ring Maltese|5|10s|Rings,Band|maltese-foot-lean+cross-negative|Use repeatable assistance to practice a face-down horizontal Maltese shape.|Start high enough over the support to keep the load manageable.|Taking away assistance as the arms begin to bend.||assisted
full-maltese|Full ring Maltese|5|6s|Rings|maltese-band+ring-full-planche+cross|Hold the Maltese's low horizontal line with straight arms in ring support.|A coached low-ring setup helps you leave the position under control.|Attempting the full hold straight from a wide, unstable drop.
victorian-tuck|Tuck Victorian preparation|5|10s|Rings|cross-pull-out+ring-front|Use a short lever and assistance to practice a face-up Victorian hold.|Keep your feet near the floor and work in controlled ranges.|Putting full weight into a new shoulder angle abruptly.|victorian|assisted
victorian-straddle|Assisted straddle Victorian|5|8s|Rings,Band|victorian-tuck+front-touch-row|Hold a face-up horizontal shape on rings with legs spread and steady assistance.|Increase leverage only while the grip and elbow angle stay controlled.|Opening the legs wider while dropping the hips.|victorian|assisted
victorian|Ring Victorian hold|5|5s|Rings|victorian-straddle+full-maltese|Hold a straight face-up horizontal position on rings.|Practice the skill with a coach and build from supported versions.|Lowering into the hold without a controlled exit.|victorian
`);

export const TRACKS = tracks;
export const CATALOG = skills;
export const STARTER_ROUTINES = [
  { id: 'starter-foundations', name: 'Foundations', entries: [
    { skillId: 'high-incline', sets: 3 }, { skillId: 'high-row', sets: 3 },
    { skillId: 'chair-squat', sets: 3 }, { skillId: 'dead-bug', sets: 2 },
  ] },
  { id: 'starter-pull-core', name: 'Pull & core', entries: [
    { skillId: 'active-hang', sets: 2 }, { skillId: 'band-pull', sets: 3 },
    { skillId: 'hang-knee', sets: 3 }, { skillId: 'tuck-hollow', sets: 2 },
  ] },
  { id: 'starter-balance', name: 'Handstand practice', entries: [
    { skillId: 'wrist-rock', sets: 2 }, { skillId: 'scap-push', sets: 2 },
    { skillId: 'box-hs', sets: 3 }, { skillId: 'wall-hs', sets: 3 },
  ] },
];
