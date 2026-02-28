export const wheels = {
  archetype: {
    label: "Character Archetype",
    options: [
      "Caregiver",
      "Rebel",
      "Outsider",
      "Dreamer",
      "Protector",
      "Explorer",
      "Skeptic",
      "Achiever",
      "Survivor",
      "Idealist"
    ],
    next: "persona"
  },

  persona: {
    label: "Public Persona",
    options: [
      "Respected professional",
      "Charming social figure",
      "Invisible background presence",
      "Local troublemaker",
      "Community hero",
      "Rising star",
      "Social outsider",
      "Trusted confidant",
      "Person everyone underestimates",
      "Known disappointment"
    ],
    next: "trait"
  },

  trait: {
    label: "Core Trait",
    options: [
      "Impulsive",
      "Secretive",
      "Overly honest",
      "Approval-seeking",
      "Stubborn",
      "Curious",
      "Distrustful",
      "Self-sacrificing",
      "Overly cautious",
      "Emotionally guarded"
    ],
    next: "hiddenTruth"
  },

  hiddenTruth: {
    label: "Hidden Truth",
    options: [
      "Lied about their past",
      "Responsible for a past tragedy",
      "Not who they claim to be",
      "Protecting someone secretly",
      "Working toward a hidden agenda",
      "Owes a dangerous debt",
      "Knows a devastating secret",
      "Fears they are fundamentally broken",
      "Living under a false identity",
      "Secretly sabotaging themselves"
    ],
    next: "conflict"
  },

  conflict: {
    label: "Internal Conflict",
    options: [
      "Wants love vs fears vulnerability",
      "Wants freedom vs fears failure",
      "Wants truth vs fears consequences",
      "Wants control vs fears responsibility",
      "Wants belonging vs fears rejection",
      "Wants revenge vs fears becoming cruel",
      "Wants stability vs fears stagnation",
      "Wants recognition vs fears exposure"
    ],
    next: "pressure"
  },

  pressure: {
    label: "External Pressure",
    options: [
      "Family expectations",
      "Financial collapse",
      "Rival appears",
      "Hidden secret exposed",
      "Time running out",
      "Forced partnership",
      "Authority surveillance",
      "Impending disaster",
      "Unwanted leadership role",
      "Moral ultimatum"
    ],
    next: "relationship"
  },

  relationship: {
    label: "Key Relationship",
    options: [
      "Mentor they resent",
      "Rival who mirrors them",
      "Friend hiding something",
      "Love interest with opposing goals",
      "Dependent sibling",
      "Former ally turned enemy",
      "Parent they cannot forgive",
      "Student who challenges them",
      "Partner losing faith in them",
      "Stranger who understands them too well"
    ],
    next: "moralBoundary"
  },

  moralBoundary: {
    label: "Moral Boundary",
    options: [
      "Will never lie",
      "Refuses to kill",
      "Protects family at any cost",
      "Truth above kindness",
      "Loyalty above justice",
      "Ends justify the means",
      "Never abandons responsibility",
      "Will sacrifice self but not others",
      "Avoids violence at all costs",
      "Believes rules exist for a reason"
    ],
    next: "storyDirection"
  },

  storyDirection: {
    label: "Story Direction",
    options: [
      "Must betray a belief",
      "Forced to choose between loyalties",
      "Learns their goal is wrong",
      "Becomes what they feared",
      "Sacrifices success for connection",
      "Discovers the enemy is themselves",
      "Must trust someone they hate",
      "Gives up power to gain freedom",
      "Breaks their own moral rule",
      "Redefines what success means"
    ],
    next: "quirk"
  },

  quirk: {
    label: "Signature Habit",
    options: [
      "Observes exits in every room",
      "Writes everything down",
      "Avoids eye contact",
      "Uses humor in tense moments",
      "Collects meaningless objects",
      "Overprepares obsessively",
      "Talks to themselves quietly",
      "Fixes things that aren't broken",
      "Keeps emotional distance through jokes",
      "Never finishes what they start"
    ],
    next: null
  }
};