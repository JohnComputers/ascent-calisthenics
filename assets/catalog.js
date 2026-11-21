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
`);

addTrack('rows', 'pull', 'Rows & ring pulls', 'row', `
high-row|High bodyweight row|1|12r|Low bar||Pull your chest toward a high bar with feet on the ground.|Set an angle you can control through full range.|Pushing off with the hips at the start.
bent-row|Bent-knee inverted row|2|12r|Low bar|high-row|Row from a lower bar with knees bent and feet flat.|Keep a predictable shoulder-to-knee line.|Letting the pelvis drop as you pull.
straight-row|Straight-leg inverted row|2|10r|Low bar|bent-row|Row with legs straight and heels grounded.|Pull the bar toward your lower chest.|Getting height by lifting your chin.
elevated-row|Feet-elevated row|3|10r|Low bar,Bench|straight-row|Raise your feet to make the row more horizontal.|Keep heels and the bar support stable.|Hyperextending the back to reach the bar.
ring-row|Ring row|2|12r|Rings|high-row|Pull your body toward low adjustable rings.|Let the shoulder blades glide and keep both straps even.|Beginning each rep with a hip thrust.|archerRow
archer-row|Archer ring row|3|8r|Rings|ring-row+straight-row|Row mostly with one arm as the other reaches out for help.|Keep both hips facing the ceiling.|Over-rotating toward the working hand.|archerRow|each
one-arm-row|One-arm ring row|4|6r|Rings|archer-row|Row with one ring while resisting body rotation.|Begin with a more upright angle and pull that ring toward the ribs.|Swinging the free arm to finish.|archerRow|each
`);

addTrack('unilateral-pull', 'pull', 'One-arm pulling', 'archerPull', `
one-hang|One-arm hang|3|15s|Bar|active-hang|Practice controlled hanging from one hand.|Use a low bar or foot support while building time.|Dropping suddenly into the hanging shoulder.|oneArmHang|each
uneven-pull|Uneven pull-up|3|6r|Bar|pull-up|Place the assisting hand on a lower strap or towel.|Keep both shoulders engaged and reduce help gradually.|Shifting load too abruptly to one side.||each,assisted
band-archer|Band-assisted archer pull-up|3|6r|Bar,Band|pull-up|Use a band while shifting the pull toward one hand.|Keep the extended arm active and record assistance.|Bending both elbows the same amount.||each,assisted
archer-pull|Archer pull-up|4|5r|Bar|band-archer/uneven-pull|Pull toward one hand while the other acts as a light guide.|Move across the bar with control and descend evenly.|Turning it into a regular wide-grip pull-up.||each
band-one-pull|Band-assisted one-arm pull-up|4|4r|Bar,Band|archer-pull+one-hang|Use the free hand on a band to scale a one-arm pull.|Record the setup so assistance can be compared honestly.|Pulling harder with the assisting hand as you tire.||each,assisted
negative-one-pull|One-arm pull-up negative|5|3r|Bar|band-one-pull|Lower on one arm from a two-arm assisted top entry.|Maintain a steady descent and use a band if the bottom speeds up.|Dropping through the bottom with a straight arm.||each
one-arm-pull|One-arm pull-up|5|3r|Bar|negative-one-pull/weighted-pull+archer-pull+one-hang|Pull from a controlled single-arm hang without assistance.|Allow natural torso rotation but keep the reps deliberate.|Starting each rep with a kick or half-range bend.||each
`);

addTrack('muscleups', 'pull', 'Muscle-ups', 'barMuscle', `
bar-transition|Low-bar muscle-up transition|3|8r|Low bar|straight-dip+pull-up|Practice moving your chest up and over a low bar with foot support.|Turn both wrists over at the same time.|Throwing one elbow over the bar before the other.||assisted
band-bar-muscle|Band-assisted bar muscle-up|4|5r|Bar,Band|bar-transition+high-pull|Use a band to rehearse a clean pull, turnover, and dip.|Practice a close bar path and symmetrical turnover.|Letting the band launch you straight into the transition.||assisted
bar-muscleup|Strict bar muscle-up|5|3r|Bar|band-bar-muscle/high-pull+straight-dip|Pull high, roll over the bar, and finish in tall support.|Keep the bar close as you transfer from pull to press.|Using a one-elbow turnover to rescue the rep.
false-grip|Ring false-grip hold|3|20s|Rings|active-hang|Hold the ring across the base of your palm with the wrist above it.|Start with feet assisting until the grip is secure.|Letting the ring slide into your fingers.|falseGrip
false-pull|False-grip ring pull-up|4|5r|Rings|false-grip+ring-pull|Pull the rings to your chest while keeping a false grip.|Pull the rings down and close to your torso.|Losing your grip halfway through the pull.|ringMuscle
ring-transition|Low-ring muscle-up transition|3|8r|Rings|false-grip+ring-support|Practice rolling from a ring pull into the bottom of a ring dip with feet down.|Brush the rings past your chest as shoulders travel forward.|Pushing the rings out to the sides.|ringTransition|assisted
ring-muscleup|Strict ring muscle-up|5|3r|Rings|ring-transition+false-pull+ring-dip|Join a false-grip pull, turnover, and ring dip in one rep.|Make the transition tight and controlled through both arms.|Kicking and separating the rings on the turnover.|ringMuscle
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
`);

addTrack('raises', 'core', 'Leg raises & rotation', 'raise', `
floor-knee-raise|Lying knee raise|1|12r|Floor||Draw bent knees toward your torso without swinging.|Curl the pelvis slightly and lower slowly.|Using a big lower-back arch between reps.
floor-leg-raise|Lying straight-leg raise|2|12r|Floor|floor-knee-raise+tuck-hollow|Raise straight legs from a supine brace.|Stop lowering when your pelvis starts to tip forward.|Trying to touch heels down after losing control.
hang-knee|Hanging knee raise|2|10r|Bar|floor-knee-raise+active-hang|Lift knees from a quiet hang.|Tip the pelvis back at the top and pause your swing.|Throwing knees upward with momentum.
hang-leg|Hanging straight-leg raise|3|10r|Bar|hang-knee/floor-leg-raise+active-hang|Raise straight legs toward horizontal from a quiet hang.|Focus on controlled pelvis movement at the top.|Kicking the legs ahead of your trunk.
toes-bar|Strict toes-to-bar|4|6r|Bar|hang-leg|Raise your feet to the bar using compression and a slight backward lean.|Lower smoothly to a still hang between reps.|Swinging behind the bar to start the next rep.
tuck-wiper|Bent-knee hanging wiper|4|6r|Bar|hang-knee+hollow|Rotate bent knees side to side from a controlled high hang.|Keep the swing slow and match range on both sides.|Twisting quickly and losing the shoulder position.|wiper|each
full-wiper|Straight-leg windshield wiper|5|5r|Bar|tuck-wiper+toes-bar|Sweep straight legs side to side while holding a high hanging position.|Reduce range if your shoulders or hips start to drop.|Hurling the legs through the center.|wiper|each
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
`);

addTrack('press', 'balance', 'Crow & press to handstand', 'press', `
crow-shift|Crow weight shift|1|8r|Floor|wrist-rock|Lean forward with knees against upper arms and toes still down.|Look slightly ahead and let pressure move toward the fingertips.|Throwing the hips up before the hands are loaded.|frog
crow|Crow stand|2|20s|Floor|crow-shift|Hold a bent-arm balance with knees supported on your upper arms.|Use a soft clear space in front and load each palm evenly.|Looking back toward your feet and toppling forward.|frog
tuck-balance|Tuck handstand hold|4|15s|Floor|free-hs+crow|Balance with knees tucked and hips above shoulders.|Change the shape slowly while keeping hands still.|Pulling knees down faster than the shoulders adjust.
press-negative|Straddle press negative|4|3r|Floor|wall-hs+straddle-lift|Lower from handstand through a straddle with straight elbows.|Keep feet low only as long as the shoulders can support the shift.|Falling into the final part of the descent.
box-press|Elevated straddle press|4|4r|Bench|press-negative|Use a low stable platform to shorten the initial press range.|Lean before lifting the feet and keep the movement slow.|Jumping off the box to get over the sticking point.
straddle-press|Straddle press to handstand|5|3r|Floor|box-press+free-hs|Press from a floor straddle into a handstand without a jump.|Lift the hips first and keep elbows long.|Bending the elbows or jumping the legs up.
pike-press|Pike press to handstand|5|3r|Floor|straddle-press+seated-double|Press to handstand with the legs together.|Build time in deep pike compression and keep shoulders active.|Using a hip kick to start the lift.
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
`);

addTrack('back-levers', 'straight', 'Back lever & ring rotation', 'back', `
skin-cat|Skin the cat|3|5r|Rings|active-hang+tuck-hollow|Rotate through a tucked inverted hang and return under control.|Set rings low enough to put your feet down and keep the range comfortable.|Dropping uncontrolled into shoulder extension.|skinCat
german-hang|German hang|3|15s|Rings|skin-cat|Practice a supported hang with arms behind the body.|Start with foot support and progress shoulder extension gradually.|Forcing depth through shoulder discomfort.|skinCat
tuck-back|Tuck back lever|3|15s|Rings|skin-cat+german-hang|Hold face-down horizontal with knees tucked.|Enter slowly from an inverted hang and keep elbows long.|Unfolding before shoulders can hold the short lever.
adv-back|Advanced tuck back lever|4|12s|Rings|tuck-back|Open the hips from tuck without straightening knees fully.|Keep shoulders and hips nearly level.|Arching sharply to get the hips higher.
one-back|One-leg back lever|4|10s|Rings|adv-back|Extend one leg while keeping the other leg tucked.|Match both sides and avoid twisting at the hips.|Rotating toward the straight-leg side.||each
straddle-back|Straddle back lever|5|10s|Rings|adv-back/one-back|Extend both legs apart and hold the face-down line.|Keep elbows straight and the legs in line with the torso.|Using a wide straddle to hide a deep hip bend.
back|Full back lever|5|10s|Rings|straddle-back/one-back+adv-back|Hold a straight horizontal position facing down from rings.|Build shorter, controlled holds before adding time.|Rushing into a locked-arm hold with a fast drop.
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
`);

addTrack('flags', 'straight', 'Human flag', 'flag', `
flag-plank|Flag plank|2|20s|Vertical pole|side-plank|Keep feet supported while practicing opposite hand forces on a pole.|Pull with the top arm and press with the bottom arm.|Hanging only from the upper hand.||each
low-flag|Low diagonal flag|3|12s|Vertical pole|flag-plank|Lift into a diagonal flag below horizontal.|Make the bottom elbow firm before you take weight off the floor.|Jumping into the hold without a controlled shoulder position.||each
tuck-flag|Tuck human flag|4|10s|Vertical pole|low-flag|Hold near horizontal with knees pulled toward your torso.|Stack both shoulders and stay facing forward.|Rolling chest down as your legs lift.||each
one-flag|One-leg human flag|4|8s|Vertical pole|tuck-flag|Extend one leg from a tuck flag to increase leverage.|Control how the hips open and compare both directions.|Letting your top shoulder rotate as the leg extends.||each
straddle-flag|Straddle human flag|5|8s|Vertical pole|one-flag/tuck-flag+straddle-lift|Hold a flag with legs spread to shorten effective leverage.|Keep the torso level and make the split deliberate.|Hiking one hip to hold the legs up.||each
full-flag|Full human flag|5|8s|Vertical pole|straddle-flag|Hold your body horizontal to the side of a stable pole.|Pair a strong lower-arm push with an upper-arm pull.|Starting the hold from a large kick.||each
`);

addTrack('ring-strength', 'straight', 'Straight-arm ring strength', 'cross', `
ring-scap|Straight-arm ring shrug|2|10r|Rings|ring-support|In ring support, move the shoulder girdle without bending your arms.|Make the range small and hold the rings close.|Using an elbow bend to lift the shoulders.|ringDip
ring-cross-foot|Foot-assisted cross pull|4|8r|Rings|rto-support+ring-scap|Use low rings and grounded feet to rehearse outward arm load.|Keep most weight supported by your feet as needed.|Going wide before you can stay steady.||assisted
ring-cross-band|Band-assisted iron cross|5|8s|Rings,Band|ring-cross-foot|Use substantial assistance to hold the straight-arm cross position.|Choose a repeatable, heavily assisted setup and build time gradually.|Removing assistance before shoulder position is stable.||assisted
cross|Iron cross|5|5s|Rings|ring-cross-band|Hold a ring cross with arms extending horizontally to each side.|Treat this as a specialist ring skill and build from coached assistance.|Attempting the unsupported hold after only support holds.
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
